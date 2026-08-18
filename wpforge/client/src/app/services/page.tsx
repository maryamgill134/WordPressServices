import type { Metadata } from "next";
import { ServicesDirectory } from "@/components/services-overview";

export const metadata: Metadata = {
  title: "WordPress Services",
  description: "From building and customizing WordPress websites to optimization, automation, and ongoing management — everything you need to build, grow, and maintain a high-performing digital presence.",
};

export default function ServicesIndexPage() {
  return <ServicesDirectory />;
}
