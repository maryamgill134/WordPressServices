import type { Metadata } from "next";
import { PortfolioPage } from "@/components/portfolio-page";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Explore our recent WordPress, WooCommerce, UI/UX, and custom development projects, created to deliver modern digital experiences and real business value.",
};

export default function PortfolioRoute() {
  return <PortfolioPage />;
}
