"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { portfolioFilters, portfolioProjects, type PortfolioFilter } from "@/data/portfolio";
import { InnerPageHero } from "@/components/inner-page-hero";

const fadeUp = {
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
};

export function PortfolioPage() {
  const reduceMotion = useReducedMotion();
  const reveal = reduceMotion ? { initial: false as const } : fadeUp;
  const [filter, setFilter] = useState<PortfolioFilter>("All");

  const filteredProjects = useMemo(
    () => filter === "All" ? portfolioProjects : portfolioProjects.filter((project) => project.filters.includes(filter)),
    [filter],
  );

  return (
    <div className="svc-page portfolio-page">
      <InnerPageHero
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Portfolio" },
        ]}
        label="Portfolio"
        title="We Build Digital Experiences That Perform."
        description="Explore our portfolio of high-performance WordPress, WooCommerce, and custom digital experiences designed to help businesses grow."
      />

      <section className="portfolio section" id="recent-work">
        <div className="container">
          <motion.div className="section-heading" {...reveal}>
            <span>PORTFOLIO</span>
            <h2>Our Recent Work</h2>
          </motion.div>
          <div className="filters" role="toolbar" aria-label="Filter projects by category">
            {portfolioFilters.map((item) => (
              <button
                className={filter === item ? "active" : ""}
                type="button"
                key={item}
                aria-pressed={filter === item}
                onClick={() => setFilter(item)}
              >
                {item}
              </button>
            ))}
          </div>
          <motion.div layout className="portfolio-grid">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <motion.article
                  layout
                  key={project.slug}
                  className="project-card"
                  initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
                  transition={{ duration: reduceMotion ? 0 : 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="project-image">
                    <Image src={project.image} alt={`${project.title} project`} fill sizes="(max-width: 720px) 100vw, 66vw" />
                  </div>
                  <span className="project-cat">{project.category}</span>
                  <div className="project-reveal">
                    <p>{project.type}</p>
                    <h3>{project.title}</h3>
                    <div className="project-extra">
                      <p className="project-summary">{project.theme}</p>
                      <ul>{project.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
                      <Link href={`/portfolio/${project.slug}`} aria-label={`View project: ${project.title}`}>
                        View Project
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
