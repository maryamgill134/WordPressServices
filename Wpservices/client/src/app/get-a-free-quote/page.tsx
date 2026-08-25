import type { Metadata } from "next";
import { QuotePage } from "@/components/quote-page";

export const metadata: Metadata = {
  title: "Get a Free Quote",
  description: "Tell us about your WordPress project, goals, and requirements. We’ll review your information and get back to you with the right solution.",
};

export default function GetAFreeQuoteRoute() {
  return <QuotePage />;
}
