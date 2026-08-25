import { z } from "zod";
import {
  quoteBudgetOptions,
  quoteBuildingOptions,
  quoteNeedOptions,
  quoteSizeOptions,
  quoteTimelineOptions,
} from "@/data/quote-form";

function optionalWebAddress(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return true;
  if (/\s/.test(trimmed)) return false;
  try {
    const url = new URL(/^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`);
    return url.hostname.includes(".");
  } catch {
    return false;
  }
}

const buildingLabels = quoteBuildingOptions.map((item) => item.label) as [string, ...string[]];
const sizeLabels = [...quoteSizeOptions] as [string, ...string[]];
const needLabels = [...quoteNeedOptions] as [string, ...string[]];
const budgetLabels = [...quoteBudgetOptions] as [string, ...string[]];
const timelineLabels = [...quoteTimelineOptions] as [string, ...string[]];


export const leadSchema = z.object({
  name: z.string().trim().min(2, "Enter your full name.").max(120),
  email: z.string().trim().email("Enter a valid email address.").max(254),
  phone: z
    .string()
    .trim()
    .max(20)
    .refine((value) => value === "" || /^\+[1-9]\d{6,15}$/.test(value), "Please enter a valid WhatsApp number.")
    .optional()
    .or(z.literal("")),
  company: z.string().trim().max(160).optional().or(z.literal("")),
  service: z.string().trim().min(2, "Select a service.").max(120),
  budget: z.string().trim().min(1, "Select an estimated budget.").max(80),
  message: z.string().trim().min(20, "Tell us a little more about your project.").max(5000),
  consent: z.literal(true, {
    error: "Consent is required.",
  }),
  website: z.string().max(200).optional(),
  startedAt: z.number().int().positive(),
});

export type LeadInput = z.infer<typeof leadSchema>;

export const contactLeadSchema = leadSchema.extend({
  budget: z.string().trim().min(1, "Select a project budget."),
});

export const quoteLeadSchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name.").max(120),
  email: z.string().trim().email("Please enter a valid email address.").max(254),
  phone: z
    .string()
    .trim()
    .max(20)
    .refine((value) => value === "" || /^\+[1-9]\d{6,15}$/.test(value), "Please enter a valid WhatsApp number.")
    .optional()
    .or(z.literal("")),
  company: z.string().trim().max(160).optional().or(z.literal("")),
  building: z.array(z.enum(buildingLabels)).min(1, "Select what you are building."),
  projectSize: z
    .string()
    .trim()
    .min(1, "Select a project size.")
    .refine((value) => (sizeLabels as readonly string[]).includes(value), "Select a project size."),
  needs: z.array(z.enum(needLabels)).min(1, "Select what you need."),
  budget: z
    .string()
    .trim()
    .min(1, "Select a budget range.")
    .refine((value) => (budgetLabels as readonly string[]).includes(value), "Select a budget range."),
  timeline: z
    .string()
    .trim()
    .min(1, "Select a project timeline.")
    .refine((value) => (timelineLabels as readonly string[]).includes(value), "Select a project timeline."),
  websiteUrl: z
    .string()
    .trim()
    .max(300)
    .refine(optionalWebAddress, "Enter a valid website URL.")
    .optional()
    .or(z.literal("")),
  referenceUrl: z
    .string()
    .trim()
    .max(300)
    .refine(optionalWebAddress, "Enter a valid reference URL.")
    .optional()
    .or(z.literal("")),
  message: z.string().trim().min(20, "Tell us a little more about your project.").max(5000),
  consent: z.literal(true, {
    error: "Consent is required.",
  }),
  website: z.string().max(200).optional(),
  startedAt: z.number().int().positive(),
});

export type QuoteLeadInput = z.infer<typeof quoteLeadSchema>;

export function formatQuoteMessage(data: QuoteLeadInput) {
  const lines = [
    `What they're building: ${data.building.join(", ")}`,
    `Project size: ${data.projectSize}`,
    `What they need: ${data.needs.join(", ")}`,
    `Budget: ${data.budget}`,
    `Timeline: ${data.timeline}`,
  ];
  if (data.websiteUrl) lines.push(`Website: ${data.websiteUrl}`);
  if (data.referenceUrl) lines.push(`Reference: ${data.referenceUrl}`);
  lines.push("", "Project details:", data.message);
  return lines.join("\n");
}

export function toStoredLeadFromQuote(data: QuoteLeadInput): LeadInput {
  return {
    name: data.name,
    email: data.email,
    phone: data.phone ?? "",
    company: data.company ?? "",
    service: data.building.join(" · ").slice(0, 120),
    budget: data.budget,
    message: formatQuoteMessage(data),
    consent: data.consent,
    website: data.website,
    startedAt: data.startedAt,
  };
}
