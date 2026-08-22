import { z } from "zod";

export const NEWSLETTER_MESSAGES = {
  empty: "Please enter your email address.",
  invalid: "Please enter a valid email address.",
  created: "You’re subscribed successfully!",
  exists: "You’re already subscribed!",
  failed: "Something went wrong. Please try again.",
} as const;

export const newsletterSchema = z.object({
  email: z
    .string({ error: NEWSLETTER_MESSAGES.invalid })
    .trim()
    .min(1, NEWSLETTER_MESSAGES.empty)
    .max(254, NEWSLETTER_MESSAGES.invalid)
    .email(NEWSLETTER_MESSAGES.invalid)
    .transform((value) => value.toLowerCase()),
});

export function normalizeNewsletterEmail(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export function validateNewsletterEmail(value: unknown) {
  const email = normalizeNewsletterEmail(value);
  if (!email) {
    return { success: false as const, message: NEWSLETTER_MESSAGES.empty };
  }

  const parsed = newsletterSchema.safeParse({ email });
  if (!parsed.success) {
    return { success: false as const, message: NEWSLETTER_MESSAGES.invalid };
  }

  return { success: true as const, email: parsed.data.email };
}
