import { createHash } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { leadSchema, quoteLeadSchema, toStoredLeadFromQuote } from "@/lib/lead-validation";
import { getPrisma } from "@/lib/prisma";

export const runtime = "nodejs";

const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;
const requestLog = new Map<string, number[]>();

function hashIp(ip: string) {
  const salt = process.env.LEAD_HASH_SALT ?? "development-only-salt";
  return createHash("sha256").update(`${salt}:${ip}`).digest("hex");
}

function isRateLimited(key: string) {
  const now = Date.now();
  const recent = (requestLog.get(key) ?? []).filter(
    (timestamp) => now - timestamp < WINDOW_MS,
  );
  recent.push(now);
  requestLog.set(key, recent);
  return recent.length > MAX_REQUESTS;
}

export async function POST(request: NextRequest) {
  try {
    const contentLength = Number(request.headers.get("content-length") ?? 0);
    if (contentLength > 32_000) {
      return NextResponse.json({ message: "Request is too large." }, { status: 413 });
    }

    const body: unknown = await request.json();
    const isQuote = typeof body === "object" && body !== null && "building" in body;
    const parsed = isQuote ? quoteLeadSchema.safeParse(body) : leadSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          message: "Please review the highlighted fields.",
          errors: parsed.error.issues.map((issue) => ({
            field: issue.path.join("."),
            message: issue.message,
          })),
        },
        { status: 400 },
      );
    }

    const stored = "building" in parsed.data ? toStoredLeadFromQuote(parsed.data) : parsed.data;
    const { website, startedAt, ...lead } = stored;

    // Honeypot submissions receive a normal response so bots do not adapt.
    if (website) {
      return NextResponse.json({ message: "Thanks! We’ll be in touch shortly." });
    }

    if (Date.now() - startedAt < 1_500) {
      return NextResponse.json(
        { message: "Please wait a moment and submit again." },
        { status: 400 },
      );
    }

    const forwardedFor = request.headers.get("x-forwarded-for");
    const ip = forwardedFor?.split(",")[0]?.trim() || "unknown";
    const ipHash = hashIp(ip);

    if (isRateLimited(ipHash)) {
      return NextResponse.json(
        { message: "Too many requests. Please try again in ten minutes." },
        { status: 429 },
      );
    }

    await getPrisma().lead.create({
      data: {
        ...lead,
        email: lead.email.toLowerCase(),
        phone: lead.phone || null,
        company: lead.company || null,
        budget: lead.budget || null,
        source: isQuote ? "get-a-free-quote" : "website",
        ipHash,
        userAgent: request.headers.get("user-agent")?.slice(0, 500) || null,
      },
    });

    return NextResponse.json(
      { message: "Thanks! We’ll reply within one business day." },
      { status: 201 },
    );
  } catch (error) {
    console.error("Lead submission failed", error);
    return NextResponse.json(
      { message: "We couldn’t submit your request. Please email info@technologiallc.com." },
      { status: 500 },
    );
  }
}
