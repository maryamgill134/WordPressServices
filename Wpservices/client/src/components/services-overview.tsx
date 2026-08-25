"use client";

import { useMemo, useState, type MouseEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { servicePillars, type ServicePillar, servicePageHref } from "@/data/services";
import { getServiceCardAlt, getServiceCardImage } from "@/data/service-images";
import { InnerPageHero } from "@/components/inner-page-hero";

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
      <InnerPageHero
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Services" },
        ]}
        label="Services"
        title="WordPress Services"
        description="From WordPress development and WooCommerce solutions to optimization, maintenance, and custom development, we provide complete solutions to build, improve, and grow your website."
      />

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
                            alt={getServiceCardAlt(service.slug, service.title)}
                            fill
                            sizes="(max-width: 540px) 100vw, (max-width: 1100px) 50vw, 33vw"
                            style={{ objectFit: "cover", objectPosition: "center" }}
                          />
                        </div>
                        {service.isNew && <b className="svc-new">NEW</b>}
                        <div className="svc-catalog-copy">
                          <h4>{service.title}</h4>
                          <p>{service.short}</p>
                          <Link href={servicePageHref(category.slug, service.slug)}>Learn More</Link>
                        </div>
                      </motion.article>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
