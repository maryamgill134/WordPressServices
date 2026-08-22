import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@/generated/prisma/client";
import { NEWSLETTER_MESSAGES, validateNewsletterEmail } from "@/lib/newsletter";
import { getPrisma } from "@/lib/prisma";

export const runtime = "nodejs";

function json(message: string, status: number) {
  return NextResponse.json({ message }, { status });
}

export async function POST(request: NextRequest) {
  try {
    const body: unknown = await request.json().catch(() => null);
    const email = body && typeof body === "object" && "email" in body ? (body as { email: unknown }).email : "";
    const parsed = validateNewsletterEmail(email);

    if (!parsed.success) {
      return json(parsed.message, 400);
    }

    const prisma = getPrisma();
    const existing = await prisma.newsletterSubscriber.findUnique({
      where: { email: parsed.email },
      select: { id: true },
    });

    if (existing) {
      return json(NEWSLETTER_MESSAGES.exists, 409);
    }

    try {
      await prisma.newsletterSubscriber.create({
        data: {
          email: parsed.email,
          source: "website",
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
        return json(NEWSLETTER_MESSAGES.exists, 409);
      }
      throw error;
    }

    return json(NEWSLETTER_MESSAGES.created, 201);
  } catch (error) {
    console.error("Newsletter subscription failed", error);
    return json(NEWSLETTER_MESSAGES.failed, 500);
  }
}
