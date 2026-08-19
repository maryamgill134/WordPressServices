import type { Metadata } from "next";
import { ContactPage } from "@/components/contact-page";

export const metadata: Metadata = {
  title: "Contact",
  description: "Tell us about your theme, WooCommerce store, migration, or retainer needs. We typically reply within 1–2 business days.",
};

export default function ContactRoute() {
  return <ContactPage />;
}
