import type { Metadata } from "next";
import { Instrument_Serif, Inter, Plus_Jakarta_Sans } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600", "700", "800"],
});

const instrument = Instrument_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://wpservices.com"),
  title: {
    default: "WPServices — WordPress Websites That Drive Results",
    template: "%s | WPServices",
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
    title: "WPServices — WordPress Websites That Drive Results",
    description:
      "Fast, secure, SEO-friendly WordPress websites built for your business.",
    url: "https://wpservices.com",
    siteName: "WPServices",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "WPServices — WordPress Websites That Drive Results",
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
    <html lang="en" className={`scroll-smooth ${inter.variable} ${plusJakarta.variable} ${instrument.variable}`}>
      <body>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
