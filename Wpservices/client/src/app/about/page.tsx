import type { Metadata } from "next";
import { AboutPage } from "@/components/about-page";

export const metadata: Metadata = {
  title: "About Us",
  description: "WPServices is a WordPress development and digital agency focused on high-performing, scalable, and conversion-focused digital experiences.",
};

export default function AboutRoute() {
  return <AboutPage />;
}
