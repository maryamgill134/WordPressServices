import type { Metadata } from "next";
import { ServicesDirectory } from "@/components/services-overview";

export const metadata: Metadata = {
  title: "WordPress Services",
  description: "From WordPress development and WooCommerce solutions to optimization, maintenance, and custom development, we provide complete solutions to build, improve, and grow your website.",
};

export default function ServicesIndexPage() {
  return <ServicesDirectory />;
}
