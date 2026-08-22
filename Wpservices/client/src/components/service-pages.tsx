"use client";

import { useState, type MouseEvent } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import type { ServiceCategory, ServiceItem } from "@/data/services";
import { getPillarForCategory } from "@/data/services";
import { CheckMark } from "@/components/check-mark";
import { serviceIconMap } from "@/components/service-icons";
import { categoryCrumbLabel, InnerPageHero } from "@/components/inner-page-hero";

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
                  <Link href={`/services/${category.slug}/${service.slug}`}>Explore Service</Link>
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

export function ServiceDetailPage({ category, service }: { category: ServiceCategory; service: ServiceItem }) {
  const reduceMotion = useReducedMotion();
  const reveal = reduceMotion ? { initial: false as const } : fadeUp;
  const [openFaq, setOpenFaq] = useState(0);
  const crumbLabel = categoryCrumbLabel(category.title);

  return (
    <div className={`svc-page ${category.slug === "automate" ? "svc-page--automate" : ""}`}>
      <InnerPageHero
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: crumbLabel, href: `/services/${category.slug}` },
          { label: service.title },
        ]}
        label={category.label}
        title={service.title}
        description={service.overview}
      />

      <section className="section">
        <div className="container svc-split">
          <motion.div {...reveal}>
            <span className="eyebrow">OVERVIEW</span>
            <h2>How we approach {service.title.toLowerCase()}.</h2>
            <p>{service.short} {service.benefit}</p>
          </motion.div>
          <motion.ul className="svc-points" {...reveal}>
            {service.problems.slice(0, 3).map((problem) => (
              <li key={problem}><CheckMark /><span>{problem}</span></li>
            ))}
          </motion.ul>
        </div>
      </section>

      <section className="section svc-alt">
        <div className="container">
          <motion.div className="section-heading" {...reveal}>
            <span>PROBLEMS WE SOLVE</span>
            <h2>Typical reasons teams come to us</h2>
          </motion.div>
          <div className="svc-problem-grid">
            {service.problems.map((problem) => (
              <article key={problem}>{problem}</article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <motion.div className="section-heading" {...reveal}>
            <span>INCLUDED</span>
            <h2>What this engagement covers</h2>
          </motion.div>
          <ul className="svc-included">
            {service.included.map((item) => (
              <li key={item}><CheckMark /><span>{item}</span></li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section svc-process">
        <div className="container">
          <motion.div className="section-heading" {...reveal}>
            <span>PROCESS</span>
            <h2>How the work typically runs</h2>
          </motion.div>
          <ProcessTimeline steps={category.process} />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <motion.div className="section-heading" {...reveal}>
            <span>BENEFITS</span>
            <h2>What you should feel after the work</h2>
          </motion.div>
          <div className="svc-why-grid">
            {service.benefits.map((item, index) => (
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

      <section className="section svc-stack">
        <div className="container">
          <motion.div className="section-heading" {...reveal}>
            <span>TECHNOLOGIES</span>
            <h2>Relevant expertise</h2>
          </motion.div>
          <TechList items={category.technologies} />
        </div>
      </section>

      <section className="faq section">
        <div className="container faq-layout">
          <div>
            <span className="eyebrow">FAQ</span>
            <h2>Questions we hear first</h2>
            <p>Still have a question? Tell us about the project and a WordPress specialist will respond within one business day.</p>
            <a className="button" href="/contact">Ask a Question</a>
          </div>
          <div className="faq-list">
            {service.faqs.map((faq, index) => (
              <article className={openFaq === index ? "open" : ""} key={faq.q}>
                <button type="button" onClick={() => setOpenFaq(openFaq === index ? -1 : index)}>
                  {faq.q}
                  <ChevronDown />
                </button>
                <div className="faq-answer">
                  <div><p>{faq.a}</p></div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
