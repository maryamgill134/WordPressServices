"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { QuoteLink } from "@/components/quote-link";
import { CheckMark } from "@/components/check-mark";
import { maintainAudience, maintainCompare } from "@/data/maintain-page";
import type { ServiceItem } from "@/data/services";

const fadeUp = {
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
};

export function MaintenanceDetailExtras({ faqs }: { faqs: ServiceItem["faqs"] }) {
  const reduceMotion = useReducedMotion();
  const reveal = reduceMotion ? { initial: false as const } : fadeUp;
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <>
      <section className="section svc-highlights">
        <div className="container">
          <motion.div className="section-heading" {...reveal}>
            <span>WHO IT&apos;S FOR</span>
            <h2>Built for teams that cannot afford surprise downtime</h2>
          </motion.div>
          <div className="svc-highlight-grid">
            {maintainAudience.map((item) => (
              <article key={item}><CheckMark /><strong>{item}</strong></article>
            ))}
          </div>
        </div>
      </section>

      <section className="section svc-alt">
        <div className="container">
          <motion.div className="section-heading" {...reveal}>
            <span>BEFORE VS AFTER</span>
            <h2>The difference a care plan makes</h2>
            <p>A neglected WordPress site accumulates risk. A maintained site stays current, recoverable, and ready for customers.</p>
          </motion.div>
          <div className="svc-problem-grid">
            <motion.article {...reveal}>
              <h3>Poorly maintained</h3>
              <ul className="svc-points">
                {maintainCompare.before.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </motion.article>
            <motion.article {...reveal} transition={reduceMotion ? { duration: 0 } : { ...fadeUp.transition, delay: 0.08 }}>
              <h3>Professionally maintained</h3>
              <ul className="svc-points">
                {maintainCompare.after.map((item) => (
                  <li key={item}>
                    <CheckMark />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.article>
          </div>
        </div>
      </section>

      <section className="faq section" id="maintenance-faq">
        <div className="container faq-layout">
          <div>
            <span className="eyebrow">FAQ</span>
            <h2>Questions teams ask before they start care</h2>
            <p>Clear answers on scope, recovery, backups, and response — before you start a care plan.</p>
            <QuoteLink className="button">Get a Quote</QuoteLink>
          </div>
          <div className="faq-list">
            {faqs.slice(0, 4).map((item, index) => (
              <article className={openFaq === index ? "open" : ""} key={item.q}>
                <button
                  type="button"
                  onClick={() => setOpenFaq((current) => (current === index ? -1 : index))}
                  aria-expanded={openFaq === index}
                  aria-controls={`maintenance-faq-answer-${index}`}
                >
                  {item.q}
                  <ChevronDown aria-hidden="true" />
                </button>
                <div
                  className="faq-answer"
                  id={`maintenance-faq-answer-${index}`}
                  aria-hidden={openFaq !== index}
                >
                  <div><p>{item.a}</p></div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
