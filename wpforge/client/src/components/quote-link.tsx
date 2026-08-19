"use client";

import { type AnchorHTMLAttributes, type MouseEvent, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";

export const QUOTE_SECTION_ID = "start-your-project";

export function scrollToQuoteForm() {
  const el = document.getElementById(QUOTE_SECTION_ID);
  if (!el) return false;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
  return true;
}

export function QuoteLink({
  className,
  children,
  onClick,
  ...props
}: {
  className?: string;
  children: ReactNode;
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "onClick">) {
  const pathname = usePathname();
  const router = useRouter();
  const href = `/#${QUOTE_SECTION_ID}`;

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    onClick?.(event);
    if (event.defaultPrevented) return;
    event.preventDefault();

    if (pathname === "/") {
      scrollToQuoteForm();
      history.replaceState(null, "", href);
      return;
    }

    router.push(href);
  }

  return (
    <a className={className} href={href} onClick={handleClick} {...props}>
      {children}
    </a>
  );
}
