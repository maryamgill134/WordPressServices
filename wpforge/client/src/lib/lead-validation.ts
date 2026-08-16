import { z } from "zod";

export const leadSchema = z.object({
  name: z.string().trim().min(2, "Enter your full name.").max(120),
  email: z.string().trim().email("Enter a valid email address.").max(254),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  company: z.string().trim().max(160).optional().or(z.literal("")),
  service: z.string().trim().min(2, "Select a service.").max(120),
  budget: z.string().trim().max(80).optional().or(z.literal("")),
  message: z.string().trim().min(20, "Tell us a little more about your project.").max(5000),
  consent: z.literal(true, {
    error: "Consent is required.",
  }),
  website: z.string().max(200).optional(),
  startedAt: z.number().int().positive(),
});

export type LeadInput = z.infer<typeof leadSchema>;
