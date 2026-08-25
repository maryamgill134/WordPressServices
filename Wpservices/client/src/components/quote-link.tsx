"use client";

import Link from "next/link";
import { type AnchorHTMLAttributes, type MouseEvent, type ReactNode } from "react";
import { QUOTE_PAGE_HREF } from "@/data/quote-form";

export const QUOTE_PAGE_PATH = QUOTE_PAGE_HREF;
export const QUOTE_SECTION_ID = "start-your-project";

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
  return (
    <Link className={className} href={QUOTE_PAGE_HREF} onClick={onClick} {...props}>
      {children}
    </Link>
  );
}
