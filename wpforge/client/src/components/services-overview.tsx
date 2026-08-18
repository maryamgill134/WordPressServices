"use client";

import { type MouseEvent } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { servicePillars } from "@/data/services";
import { serviceIconMap } from "@/components/service-icons";

const fadeUp = {
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
};

const directoryCopy = {
  build: "Build powerful WordPress experiences from the ground up.",
  manage: "Keep your WordPress ecosystem secure, reliable, and continuously managed.",
  enhance: "Optimize, redesign, integrate, automate, and grow your digital presence.",
} as const;

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

export function ServicesDirectory() {
  const reduceMotion = useReducedMotion();
  const reveal = reduceMotion ? { initial: false as const } : fadeUp;

  return (
    <div className="svc-page svc-dir">
      <section className="svc-dir-hero">
        <div className="container">
          <span className="eyebrow">WHAT WE DO</span>
          <h1>WordPress Services Built to Perform</h1>
          <p>From building and customizing WordPress websites to optimization, automation, and ongoing management — everything you need to build, grow, and maintain a high-performing digital presence.</p>
        </div>
      </section>

      {servicePillars.map((pillar) => (
        <section className="svc-dir-group" key={pillar.slug}>
          <div className="container">
            <motion.div className="svc-dir-intro" {...reveal}>
              <span className="svc-pillar-kicker">{pillar.kicker} — {pillar.title.toUpperCase()}</span>
              <h2>{pillar.title}</h2>
              <p>{directoryCopy[pillar.slug]}</p>
            </motion.div>
            <div className={`svc-dir-grid svc-dir-grid--${pillar.categories.length}`}>
              {pillar.categories.map((category, index) => {
                const Icon = serviceIconMap[category.icon];
                return (
                  <motion.div
                    key={category.slug}
                    {...reveal}
                    {...pointerGlow(reduceMotion)}
                    transition={reduceMotion ? { duration: 0 } : { ...fadeUp.transition, delay: index * 0.05 }}
                  >
                    <Link className="svc-dir-card glow-card" href={`/services/${category.slug}`}>
                      <span className="svc-dir-card-icon"><Icon /></span>
                      <div>
                        <strong>
                          {category.label}
                          {category.isNew && <small>NEW</small>}
                        </strong>
                        <em>{category.services.length} {category.services.length === 1 ? "service" : "services"}</em>
                      </div>
                      <ArrowRight />
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
