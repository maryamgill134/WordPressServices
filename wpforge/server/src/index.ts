import "dotenv/config";
import cors from "cors";
import express, { type NextFunction, type Request, type Response } from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import { z } from "zod";
import { createContactStore } from "./contact-store.js";

const app = express();
const port = Number(process.env.PORT || 5000);
const allowedOrigins = (process.env.CLIENT_ORIGIN || "http://localhost:3000")
  .split(",")
  .map((origin) => origin.trim());
const store = createContactStore();

app.disable("x-powered-by");
app.set("trust proxy", 1);
app.use(helmet());
app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error("Origin not allowed by CORS"));
    },
    methods: ["GET", "POST"],
  }),
);
app.use(express.json({ limit: "32kb" }));

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 8,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: { message: "Too many requests. Please wait a few minutes and try again." },
});

const contactSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(254).transform((value) => value.toLowerCase()),
  service: z.string().trim().max(120).optional(),
  message: z.string().trim().min(10).max(5000),
  website: z.string().max(0).optional(),
});

app.get("/api/health", (_request, response) => {
  response.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.post("/api/contact", contactLimiter, async (request, response, next) => {
  try {
    const parsed = contactSchema.safeParse(request.body);
    if (!parsed.success) {
      response.status(400).json({
        message: "Please check your details and try again.",
        errors: parsed.error.flatten().fieldErrors,
      });
      return;
    }

    const { website: _honeypot, ...contact } = parsed.data;
    await store.create(contact);
    response.status(201).json({
      message: "Thanks! We’ll be in touch within one business day.",
    });
  } catch (error) {
    next(error);
  }
});

app.use((_request, response) => {
  response.status(404).json({ message: "Not found" });
});

app.use((error: Error, _request: Request, response: Response, _next: NextFunction) => {
  console.error(error);
  response.status(500).json({
    message: "We couldn’t save your message. Please email hello@wpforge.dev.",
  });
});

async function start() {
  await store.initialize();
  app.listen(port, () => {
    console.log(`WPForge API listening on http://localhost:${port}`);
  });
}

start().catch((error) => {
  console.error("Failed to start API", error);
  process.exit(1);
});
