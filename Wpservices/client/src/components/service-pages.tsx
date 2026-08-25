"use client";

import { type MouseEvent } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import type { ServiceCategory } from "@/data/services";
import { getPillarForCategory, servicePageHref } from "@/data/services";
import { CheckMark } from "@/components/check-mark";
import { serviceIconMap } from "@/components/service-icons";
import { categoryCrumbLabel, InnerPageHero } from "@/components/inner-page-hero";

export { ServiceDetailPage } from "@/components/service-detail-page";

const fadeUp = {
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
};

function pointerGlow(reduceMotion: boolean | null) {
  if (reduceMotion) return {};
  return {
    onMouseMove: (event: MouseEvent<HTMLElement>) => {
      const el = event.currentTarget;
      const rect = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${event.clientX - rect.left}px`);
      el.style.setProperty("--my", `${event.clientY - rect.top}px`);
    },
  };
}

function TechList({ items }: { items: string[] }) {
  return (
    <ul className="svc-tech">
      {items.map((item) => <li key={item}>{item}</li>)}
    </ul>
  );
}

function ProcessTimeline({ steps }: { steps: ServiceCategory["process"] }) {
  return (
    <ol className="svc-timeline">
      {steps.map((step) => (
        <li key={step.n}>
          <b>{step.n}</b>
          <h3>{step.title}</h3>
          <p>{step.text}</p>
        </li>
      ))}
    </ol>
  );
}

export function CategoryPage({ category }: { category: ServiceCategory }) {
  const reduceMotion = useReducedMotion();
  const reveal = reduceMotion ? { initial: false as const } : fadeUp;
  const pillar = getPillarForCategory(category.slug);
  const extras = extraBlocks(category.slug);
  const crumbLabel = categoryCrumbLabel(category.title);

  return (
    <div className={`svc-page ${category.slug === "automate" ? "svc-page--automate" : ""}`}>
      <InnerPageHero
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: crumbLabel },
        ]}
        label={category.label}
        title={category.title}
        description={category.summary}
      />

      <section className="section svc-grid-section">
        <div className="container">
          <motion.div className="section-heading" {...reveal}>
            <span>OFFERINGS</span>
            <h2>Services in {category.label}</h2>
            <p>Each engagement can stand alone or combine with the rest of the {pillar?.kicker.toLowerCase() ?? "studio"} practice.</p>
          </motion.div>
          <div className={`svc-grid ${category.services.length === 1 ? "svc-grid--single" : ""}`}>
            {category.services.map((service, index) => {
              const ServiceIcon = serviceIconMap[service.icon];
              return (
                <motion.article
                  className="svc-card glow-card"
                  key={service.slug}
                  {...reveal}
                  {...pointerGlow(reduceMotion)}
                  whileHover={reduceMotion ? undefined : { y: -5, transition: { duration: 0.22 } }}
                  transition={reduceMotion ? { duration: 0 } : { ...fadeUp.transition, delay: index * 0.05 }}
                >
                  <span className="svc-card-icon"><ServiceIcon /></span>
                  {service.isNew && <b className="svc-new">NEW</b>}
                  <h3>{service.title}</h3>
                  <p>{service.short}</p>
                  <small>{service.benefit}</small>
                  <Link href={servicePageHref(category.slug, service.slug)}>Explore Service</Link>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {extras}

      <section className="section svc-why">
        <div className="container">
          <motion.div className="section-heading" {...reveal}>
            <span>WHY CHOOSE US</span>
            <h2>A specialist studio, not a generic vendor.</h2>
          </motion.div>
          <div className="svc-why-grid">
            {category.why.map((item, index) => (
              <motion.article className="why-card glow-card" key={item.title} {...reveal} {...pointerGlow(reduceMotion)} transition={reduceMotion ? { duration: 0 } : { ...fadeUp.transition, delay: index * 0.05 }}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="section svc-process">
        <div className="container">
          <motion.div className="section-heading" {...reveal}>
            <span>PROCESS</span>
            <h2>A simple path from brief to launch.</h2>
          </motion.div>
          <ProcessTimeline steps={category.process} />
        </div>
      </section>

      <section className="section svc-stack">
        <div className="container">
          <motion.div className="section-heading" {...reveal}>
            <span>EXPERTISE</span>
            <h2>Technologies we work with</h2>
          </motion.div>
          <TechList items={category.technologies} />
        </div>
      </section>
    </div>
  );
}

function extraBlocks(slug: string) {
  if (slug === "maintain") {
    const items = ["Security", "Updates", "Backups", "Monitoring", "Performance", "Technical Support"];
    return (
      <section className="section svc-highlights">
        <div className="container">
          <div className="section-heading">
            <span>ONGOING CARE</span>
            <h2>What maintenance actually covers</h2>
          </div>
          <div className="svc-highlight-grid">
            {items.map((item) => (
              <article key={item}><CheckMark /><strong>{item}</strong></article>
            ))}
          </div>
        </div>
      </section>
    );
  }
  if (slug === "retainers") {
    return (
      <section className="section svc-highlights">
        <div className="container svc-retainer-note">
          <span className="eyebrow">RETAINERS</span>
          <h2>Your dedicated WordPress development team, whenever you need it.</h2>
          <p>Reserved hours, people who already know the stack, and a monthly rhythm instead of restarting every request from zero.</p>
        </div>
      </section>
    );
  }
  if (slug === "speed") {
    const items = ["Faster loading", "Core Web Vitals", "Image optimization", "Code optimization", "Database optimization", "Cache strategy"];
    return (
      <section className="section svc-highlights">
        <div className="container">
          <div className="section-heading">
            <span>PERFORMANCE</span>
            <h2>What we measure and improve</h2>
          </div>
          <div className="svc-highlight-grid">
            {items.map((item) => (
              <article key={item}><CheckMark /><strong>{item}</strong></article>
            ))}
          </div>
        </div>
      </section>
    );
  }
  if (slug === "redesign") {
    const items = ["Modern UI", "UX improvements", "Conversion optimization", "Mobile responsiveness", "Visual modernization"];
    return (
      <section className="section svc-highlights">
        <div className="container">
          <div className="section-heading">
            <span>FOCUS</span>
            <h2>What a redesign is for</h2>
          </div>
          <div className="svc-highlight-grid">
            {items.map((item) => (
              <article key={item}><CheckMark /><strong>{item}</strong></article>
            ))}
          </div>
        </div>
      </section>
    );
  }
  if (slug === "seo") {
    const items = ["Technical SEO", "On-page optimization", "Performance", "Search visibility", "SEO-friendly architecture", "Growth strategy"];
    return (
      <section className="section svc-highlights">
        <div className="container">
          <div className="section-heading">
            <span>SEARCH</span>
            <h2>How we improve visibility</h2>
          </div>
          <div className="svc-highlight-grid">
            {items.map((item) => (
              <article key={item}><CheckMark /><strong>{item}</strong></article>
            ))}
          </div>
        </div>
      </section>
    );
  }
  if (slug === "automate") {
    const items = ["AI workflows", "Business automation", "Smart integrations", "Automated processes", "Productivity improvements"];
    return (
      <section className="section svc-highlights">
        <div className="container">
          <div className="section-heading">
            <span>AUTOMATION</span>
            <h2>Practical AI, under professional control</h2>
          </div>
          <div className="svc-highlight-grid">
            {items.map((item) => (
              <article key={item}><CheckMark /><strong>{item}</strong></article>
            ))}
          </div>
        </div>
      </section>
    );
  }
  return null;
}
