"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import type { PortfolioProject } from "@/data/portfolio";
import { QuoteLink } from "@/components/quote-link";

export function PortfolioProjectPage({ project }: { project: PortfolioProject }) {
  return (
    <div className="svc-page portfolio-project-page">
      <section className="svc-hero">
        <div className="svc-hero-bg" aria-hidden="true" />
        <div className="container svc-hero-inner">
          <div className="svc-hero-copy">
            <p className="svc-crumb">
              <Link href="/">Home</Link>
              <span>/</span>
              <Link href="/portfolio">Portfolio</Link>
              <span>/</span>
              <span>{project.title}</span>
            </p>
            <span className="eyebrow">{project.category}</span>
            <h1>{project.title}</h1>
            <p>{project.theme}</p>
            <div className="hero-actions">
              <QuoteLink className="button">
                Start a Similar Project <ArrowRight />
              </QuoteLink>
              <Link className="button button--ghost" href="/portfolio">
                All projects <ArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="portfolio-preview">
        <div className="container">
          <div className="portfolio-preview-frame">
            <Image
              src={project.image}
              alt={`${project.title} preview`}
              fill
              sizes="(max-width: 780px) 100vw, 1120px"
              priority
            />
          </div>
        </div>
      </section>

      <section className="section svc-grid-section">
        <div className="container">
          <div className="svc-split">
            <div>
              <span className="eyebrow">OVERVIEW</span>
              <h2>{project.type}</h2>
              <p>{project.theme}</p>
              <div className="portfolio-detail-block">
                <h3>Business objective</h3>
                <p>{project.study}</p>
              </div>
              <div className="portfolio-detail-block">
                <h3>Challenges</h3>
                <p>{project.challenge}</p>
              </div>
              <div className="portfolio-detail-block">
                <h3>Solution</h3>
                <p>{project.approach}</p>
              </div>
              <div className="portfolio-detail-block">
                <h3>Design and development approach</h3>
                <p>{project.theme}</p>
              </div>
              <div className="portfolio-detail-block">
                <h3>Results</h3>
                <p>{project.outcome}</p>
              </div>
            </div>
            <article className="svc-card">
              <small>{project.category}</small>
              <h3>Technologies</h3>
              <ul className="svc-points">
                {project.tags.map((tag) => (
                  <li key={tag}><span className="pricing-check"><Check /></span>{tag}</li>
                ))}
              </ul>
              <h3>Key features</h3>
              <ul className="svc-points">
                {project.features.map((feature) => (
                  <li key={feature}><span className="pricing-check"><Check /></span>{feature}</li>
                ))}
              </ul>
              <QuoteLink className="button">
                Start a Similar Project <ArrowRight />
              </QuoteLink>
            </article>
          </div>
        </div>
      </section>

      <section className="cta-band">
        <div className="container cta-band-inner">
          <div>
            <span className="eyebrow">START A SIMILAR PROJECT</span>
            <h2>Ready for a WordPress site that looks this considered?</h2>
            <p>Tell us about your goals and we&apos;ll reply with a practical next step.</p>
          </div>
          <div className="cta-band-actions">
            <QuoteLink className="button">Get a Free Quote <ArrowRight /></QuoteLink>
            <Link className="button button--ghost" href="/contact">
              Contact Us <ArrowRight />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
