"use client";

import { usePathname } from "next/navigation";
import { StartYourProject } from "@/components/consultation-cta";
import { NewsletterStrip } from "@/components/newsletter-strip";

export function PageEndMatter() {
  const pathname = usePathname();
  const isContactPage = pathname === "/contact" || pathname.startsWith("/contact/");

  return (
    <>
      {!isContactPage && <StartYourProject />}
      <NewsletterStrip />
    </>
  );
}
