"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { CheckMark } from "@/components/check-mark";
import { PhoneField } from "@/components/phone-field";
import { QUOTE_SECTION_ID } from "@/components/quote-link";

const fadeUp = {
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
};

const benefits = [
  "Responsive architecture",
  "Clear scope and transparent pricing",
  "No obligation or aggressive follow-up",
];

const serviceOptions = [
  "Custom Websites",
  "WordPress Setup",
  "WooCommerce Setup",
  "LearnDash Setup",
  "WooCommerce Development",
  "LearnDash Development",
  "WordPress Customization",
  "WooCommerce Customization",
  "LearnDash Customization",
  "Plugin Development",
  "Migrate to WordPress",
  "Migrate to WooCommerce",
  "Migrate to LearnDash",
  "WordPress Maintenance",
  "Website Management",
  "Hire WordPress Developers",
  "Hire WooCommerce Developers",
  "Hire LearnDash Developers",
  "WordPress Re-design",
  "Landing Page Redesign",
  "WordPress Speed Optimization",
  "WooCommerce Speed Optimization",
  "WordPress API Development",
  "WordPress AI Automation",
  "WordPress SEO Services",
];

const budgetOptions = [
  "Not sure yet",
  "$2,500–$5,000",
  "$5,000–$10,000",
  "$10,000–$20,000",
  "$20,000+",
];

function CountUp({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (reduceMotion) {
      node.textContent = `${value}${suffix}`;
      return;
    }

    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min(1, (now - start) / 1400);
          const eased = 1 - (1 - progress) ** 3;
          node.textContent = `${Math.round(value * eased)}${suffix}`;
          if (progress < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value, suffix, reduceMotion]);

  return <span ref={ref}>0{suffix}</span>;
}

export function StartYourProject() {
  const reduceMotion = useReducedMotion();
  const reveal = reduceMotion ? { initial: false as const } : fadeUp;
  const [phoneValid, setPhoneValid] = useState(true);
  const [leadStatus, setLeadStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [leadMessage, setLeadMessage] = useState("");
  const [startedAt, setStartedAt] = useState(() => Date.now());

  async function submitLead(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!phoneValid) return;
    const form = event.currentTarget;
    const formData = new FormData(form);
    setLeadStatus("loading");
    setLeadMessage("");

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          phone: formData.get("phone"),
          company: formData.get("company"),
          service: formData.get("service"),
          budget: formData.get("budget"),
          message: formData.get("message"),
          consent: formData.get("consent") === "on",
          website: formData.get("website"),
          startedAt,
        }),
      });
      const result = (await response.json()) as { message?: string };
      if (!response.ok) throw new Error(result.message ?? "Unable to submit your request.");

      form.reset();
      setStartedAt(Date.now());
      setLeadStatus("success");
      setLeadMessage(result.message ?? "Thanks! We’ll be in touch shortly.");
    } catch (error) {
      setLeadStatus("error");
      setLeadMessage(error instanceof Error ? error.message : "Please try again.");
    }
  }

  return (
    <section className="lead-section section" id={QUOTE_SECTION_ID}>
      <div className="container lead-layout">
        <motion.div className="lead-copy" {...reveal}>
          <span className="eyebrow">START YOUR PROJECT</span>
          <h2>Let&apos;s Build a WordPress Website That Grows Your Business</h2>
          <p>Share your goals, challenges, and ideal timeline. We&apos;ll reply with practical next steps—not a generic sales pitch.</p>
          <ul>
            {benefits.map((item) => (
              <li key={item}>
                <CheckMark tone="on-dark" />
                {item}
              </li>
            ))}
          </ul>
          <div className="lead-trust">
            <div><strong><CountUp value={150} suffix="+" /></strong><span>websites launched</span></div>
            <div><strong><CountUp value={98} suffix="%" /></strong><span>client satisfaction</span></div>
          </div>
        </motion.div>
        <motion.form className="lead-form" onSubmit={submitLead} {...reveal}>
          <div className="lead-form-row">
            <label>
              <span className="lead-field-label">Full name</span>
              <input name="name" required minLength={2} autoComplete="name" placeholder="Alex Morgan" />
            </label>
            <label>
              <span className="lead-field-label">Work email</span>
              <input name="email" required type="email" autoComplete="email" placeholder="alex@company.com" />
            </label>
          </div>
          <div className="lead-form-row">
            <div className="lead-phone">
              <span className="lead-field-label">WhatsApp number</span>
              <PhoneField resetKey={startedAt} onValidityChange={setPhoneValid} />
            </div>
            <label>
              <span className="lead-field-label">Company</span>
              <input name="company" autoComplete="organization" placeholder="Company name" />
            </label>
          </div>
          <div className="lead-form-row">
            <label>
              <span className="lead-field-label">Service</span>
              <select name="service" required defaultValue="">
                <option value="" disabled>Select a service</option>
                {serviceOptions.map((service) => <option key={service} value={service}>{service}</option>)}
              </select>
            </label>
            <label>
              <span className="lead-field-label">Estimated budget</span>
              <select name="budget" required defaultValue="Not sure yet">
                {budgetOptions.map((budget) => <option key={budget} value={budget}>{budget}</option>)}
              </select>
            </label>
          </div>
          <label className="lead-field--area">
            <span className="lead-field-label">Project details</span>
            <textarea name="message" required minLength={20} rows={5} placeholder="Website" />
          </label>
          <div className="honeypot" aria-hidden="true">
            <label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
          </div>
          <label className="consent">
            <input name="consent" type="checkbox" required />
            <span>I agree that WPServices may use these details to respond to my inquiry.</span>
          </label>
          <button className="button lead-submit" type="submit" disabled={leadStatus === "loading"}>
            {leadStatus === "loading" ? "Sending request..." : "Request a Free Consultation"}
          </button>
          {leadMessage && <p className={`lead-message lead-message--${leadStatus}`} role="status">{leadMessage}</p>}
        </motion.form>
      </div>
    </section>
  );
}

export { StartYourProject as ConsultationCTA };
