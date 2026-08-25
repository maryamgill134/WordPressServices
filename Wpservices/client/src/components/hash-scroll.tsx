"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { QUOTE_SECTION_ID } from "@/components/quote-link";
import { QUOTE_PAGE_HREF } from "@/data/quote-form";

function scrollToHashTarget(id: string) {
  const el = document.getElementById(id);
  if (!el) return false;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
  return true;
}

export function HashScroll() {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const hash = window.location.hash.replace(/^#/, "");
    if (!hash) return;
    if (hash === QUOTE_SECTION_ID) {
      router.replace(QUOTE_PAGE_HREF);
      return;
    }

    const timer = window.setTimeout(() => {
      scrollToHashTarget(hash);
    }, 80);
    return () => window.clearTimeout(timer);
  }, [pathname, router]);

  return null;
}
