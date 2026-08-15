import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://wpdev.com"),
  title: {
    default: "WPDEV — WordPress Websites That Drive Results",
    template: "%s | WPDEV",
  },
  description:
    "Professional WordPress development, customization, maintenance, SEO, performance, and security services.",
  keywords: [
    "WordPress development",
    "WordPress maintenance",
    "WordPress SEO",
    "WooCommerce development",
    "WordPress speed optimization",
  ],
  openGraph: {
    title: "WPDEV — WordPress Websites That Drive Results",
    description:
      "Fast, secure, SEO-friendly WordPress websites built for your business.",
    url: "https://wpdev.com",
    siteName: "WPDEV",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "WPDEV — WordPress Websites That Drive Results",
    description:
      "Fast, secure, SEO-friendly WordPress websites built for your business.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.variable}>{children}</body>
    </html>
  );
}
