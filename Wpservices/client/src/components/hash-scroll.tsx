"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { QUOTE_SECTION_ID, scrollToQuoteForm } from "@/components/quote-link";

export function HashScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/contact" || pathname.startsWith("/contact/")) return;
    if (window.location.hash !== `#${QUOTE_SECTION_ID}`) return;
    const timer = window.setTimeout(() => {
      scrollToQuoteForm();
    }, 40);
    return () => window.clearTimeout(timer);
  }, [pathname]);

  return null;
}
