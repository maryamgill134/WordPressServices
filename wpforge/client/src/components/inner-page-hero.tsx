"use client";

import Link from "next/link";
import { QuoteLink } from "@/components/quote-link";

export type InnerHeroCrumb = {
  label: string;
  href?: string;
};

type InnerHeroButton = {
  label?: string;
  href?: string;
};

export function categoryCrumbLabel(title: string) {
  return title.replace(/\s+Services$/i, "").trim();
}

export function InnerPageHero({
  crumbs,
  label,
  title,
  description,
  primary,
  secondary,
}: {
  crumbs: InnerHeroCrumb[];
  label: string;
  title: string;
  description: string;
  primary?: InnerHeroButton | false;
  secondary?: InnerHeroButton | false;
}) {
  const primaryLabel = primary && primary.label ? primary.label : "Get Started";
  const secondaryLabel = secondary && secondary.label ? secondary.label : "Contact Us";
  const secondaryHref = secondary && secondary.href ? secondary.href : "/contact";

  return (
    <section className="inner-hero">
      <div className="container">
        <nav className="inner-hero-crumb" aria-label="Breadcrumb">
          <ol>
            {crumbs.map((crumb, index) => {
              const isLast = index === crumbs.length - 1;
              return (
                <li key={`${crumb.label}-${index}`}>
                  {index > 0 && <span className="inner-hero-crumb-sep" aria-hidden="true">/</span>}
                  {crumb.href && !isLast ? (
                    <Link href={crumb.href}>{crumb.label}</Link>
                  ) : (
                    <span aria-current={isLast ? "page" : undefined}>{crumb.label}</span>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>

        <p className="inner-hero-label">{label}</p>
        <h1>{title}</h1>
        <p className="inner-hero-copy">{description}</p>

        {(primary !== false || secondary !== false) && (
          <div className="inner-hero-actions">
            {primary !== false && (
              primary?.href ? (
                <Link className="button" href={primary.href}>{primaryLabel}</Link>
              ) : (
                <QuoteLink className="button">{primaryLabel}</QuoteLink>
              )
            )}
            {secondary !== false && (
              <Link className="button button--ghost" href={secondaryHref}>{secondaryLabel}</Link>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
