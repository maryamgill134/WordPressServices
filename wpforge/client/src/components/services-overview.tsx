"use client";

import { useMemo, useState, type MouseEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { servicePillars, type ServicePillar } from "@/data/services";
import { getServiceCardImage } from "@/data/service-images";
import { QuoteLink } from "@/components/quote-link";

const fadeUp = {
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
};

const catalogFilters = [
  { id: "all" as const, label: "All Services" },
  { id: "build" as const, label: "Build — Creation & Foundation" },
  { id: "manage" as const, label: "Manage — Maintenance & Operations" },
  { id: "enhance" as const, label: "Enhance — Growth & Optimization" },
];

type CatalogFilter = (typeof catalogFilters)[number]["id"];

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

function pillarHeading(pillar: ServicePillar) {
  return `${pillar.kicker} — ${pillar.title.toUpperCase()}`;
}

export function ServicesDirectory() {
  const reduceMotion = useReducedMotion();
  const reveal = reduceMotion ? { initial: false as const } : fadeUp;
  const [filter, setFilter] = useState<CatalogFilter>("all");

  const visiblePillars = useMemo(
    () => (filter === "all" ? servicePillars : servicePillars.filter((pillar) => pillar.slug === filter)),
    [filter],
  );

  function selectFilter(id: CatalogFilter) {
    setFilter(id);
    const catalog = document.getElementById("service-catalog");
    if (!catalog) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    catalog.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  }

  return (
    <div className="svc-page svc-dir svc-catalog">
      <section className="svc-dir-hero">
        <div className="container">
          <p className="svc-crumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <span>Services</span>
          </p>
          <span className="eyebrow">SERVICES</span>
          <h1>WordPress Services</h1>
          <p>From WordPress development and WooCommerce solutions to optimization, maintenance, and custom development, we provide complete solutions to build, improve, and grow your website.</p>
          <div className="hero-actions">
            <QuoteLink className="button">Get Started <ArrowRight /></QuoteLink>
            <Link className="button button--ghost" href="/contact">
              Contact Us <ArrowRight />
            </Link>
          </div>
        </div>
      </section>

      <div className="svc-catalog-nav" id="service-catalog">
        <div className="container">
          <div className="filters" role="toolbar" aria-label="Filter services by category">
            {catalogFilters.map((item) => (
              <button
                className={filter === item.id ? "active" : ""}
                type="button"
                key={item.id}
                aria-pressed={filter === item.id}
                onClick={() => selectFilter(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {visiblePillars.map((pillar) => (
        <section className="svc-dir-group" id={pillar.slug} key={pillar.slug}>
          <div className="container">
            <motion.div className="svc-dir-intro" {...reveal}>
              <span className="svc-pillar-kicker">{pillar.kicker}</span>
              <h2>{pillarHeading(pillar)}</h2>
              <p>{pillar.description}</p>
            </motion.div>

            {pillar.categories.map((category) => (
              <div className="svc-catalog-group" key={category.slug}>
                <h3 className="svc-catalog-kicker">{category.label}</h3>
                <div className="svc-catalog-grid">
                  {category.services.map((service, index) => (
                      <motion.article
                        className="svc-catalog-card glow-card"
                        key={service.slug}
                        {...reveal}
                        {...pointerGlow(reduceMotion)}
                        whileHover={reduceMotion ? undefined : { y: -6, transition: { duration: 0.22 } }}
                        transition={reduceMotion ? { duration: 0 } : { ...fadeUp.transition, delay: index * 0.04 }}
                      >
                        <div className="svc-catalog-media">
                          <Image
                            src={getServiceCardImage(service.slug)}
                            alt={service.title}
                            fill
                            sizes="(max-width: 540px) 100vw, (max-width: 1100px) 50vw, 33vw"
                          />
                        </div>
                        {service.isNew && <b className="svc-new">NEW</b>}
                        <div className="svc-catalog-copy">
                          <h4>{service.title}</h4>
                          <p>{service.short}</p>
                          <Link href={`/services/${category.slug}/${service.slug}`}>
                            Learn More <ArrowRight />
                          </Link>
                        </div>
                      </motion.article>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}

      <section className="cta-band">
        <div className="container cta-band-inner">
          <div>
            <span className="eyebrow">START YOUR PROJECT</span>
            <h2>Ready to Transform Your Website?</h2>
            <p>Let&apos;s build, optimize, and grow your business with powerful WordPress solutions.</p>
          </div>
          <div className="cta-band-actions">
            <QuoteLink className="button">Get a Free Consultation <ArrowRight /></QuoteLink>
          </div>
        </div>
      </section>
    </div>
  );
}
