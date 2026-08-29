"use client";

import Image from "next/image";
import { MouseEvent, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ChevronDown,
  CircleGauge,
  Code2,
  Compass,
  Headphones,
  Layers3,
  LockKeyhole,
  MonitorSmartphone,
  Palette,
  PenTool,
  ShieldCheck,
  Sparkles,
  Users,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { CheckMark } from "@/components/check-mark";
import { QuoteLink } from "@/components/quote-link";
import { Marquee } from "@/components/ui/marquee";
import { insightHref, insights } from "@/data/insights";

const process = [
  { icon: Compass, number: "01", title: "Discovery", text: "We understand your business, audience, and goals." },
  { icon: PenTool, number: "02", title: "Strategy", text: "We create the website structure and project roadmap." },
  { icon: Layers3, number: "03", title: "Design", text: "We design a modern, conversion-focused experience." },
  { icon: Code2, number: "04", title: "Development", text: "We build the website with clean, scalable code." },
  { icon: CircleGauge, number: "05", title: "Testing", text: "We test performance, functionality, and responsiveness." },
  { icon: Sparkles, number: "06", title: "Launch & Support", text: "We launch your website and provide ongoing support." },
];

const pricing = [
  { name: "Starter", audience: "For Small Businesses", features: ["5-page website", "Responsive design", "Contact form", "Basic SEO setup", "Social media integration", "Security setup"] },
  { name: "Business", audience: "For Growing Businesses", featured: true, features: ["Up to 10 pages", "Custom design", "Advanced forms", "SEO optimization", "Performance optimization", "Analytics", "Security"] },
  { name: "E-commerce", audience: "For Online Stores", features: ["WooCommerce", "Product setup", "Payment integration", "Shopping cart", "Checkout", "Order management", "Responsive design"] },
];

const faqs = [
  ["How long does a WordPress project take?", "Most marketing websites take 4–8 weeks. Complex WooCommerce or integration projects may take 8–14 weeks. You receive a clear milestone plan before work begins."],
  ["Can you improve an existing WordPress website?", "Yes. We can redesign, optimize, secure, migrate, or extend an existing site without forcing a full rebuild when it is not necessary."],
  ["Do you provide hosting and ongoing maintenance?", "We help select and configure reliable managed hosting, then offer monthly care plans covering updates, backups, uptime, security, and priority support."],
  ["Will the website be easy for our team to edit?", "Yes. We build reusable blocks and provide a short handoff session so your team can update pages and content without touching code."],
  ["Is SEO included?", "Every project includes technical SEO foundations, semantic structure, metadata, sitemap configuration, performance work, and analytics readiness."],
];

const trustBrands = [
  {
    name: "Envato",
    wordmark: "envato",
    icon: (
      <svg viewBox="0 0 20 24" aria-hidden="true">
        <path d="M10 1.05C8.25 7.45 2.1 9.7 2.1 16.35a7.9 7.9 0 0015.8 0C17.9 9.7 11.75 7.45 10 1.05z" />
      </svg>
    ),
  },
  {
    name: "Cloudways",
    wordmark: "Cloudways",
    icon: (
      <svg viewBox="0 0 28 20" aria-hidden="true">
        <path d="M1.2 5.4h7.6M1.2 10h5.4M1.2 14.6h7.6" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
        <path d="M13.2 16.4h10.6a4.15 4.15 0 00.35-8.28 5.55 5.55 0 00-10.7-1.05 3.95 3.95 0 00-.25 9.33z" />
      </svg>
    ),
  },
  {
    name: "GoDaddy",
    wordmark: "GoDaddy",
    className: "trust-logo--godaddy",
    icon: (
      <svg viewBox="0 0 22 22" aria-hidden="true">
        <path d="M11 20S4.2 15.4 4.2 10.2A4.4 4.4 0 0111 6.4a4.4 4.4 0 016.8 3.8C17.8 15.4 11 20 11 20z" />
      </svg>
    ),
  },
  {
    name: "HubSpot",
    wordmark: "HubSpot",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="3.15" />
        <circle cx="12" cy="4.15" r="2.2" />
        <circle cx="18.75" cy="15.95" r="2.2" />
        <circle cx="5.25" cy="15.95" r="2.2" />
        <path d="M12 6.3v2.55M16.85 14.85l-2.2-1.28M7.15 14.85l2.2-1.28" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: "ThemeForest",
    wordmark: "themeforest",
    icon: (
      <svg viewBox="0 0 22 22" aria-hidden="true">
        <path fillRule="evenodd" d="M5 1.6h12A3.4 3.4 0 0120.4 5v12a3.4 3.4 0 01-3.4 3.4H5A3.4 3.4 0 011.6 17V5A3.4 3.4 0 015 1.6zm6 2.7c-1.15 3.6-5.1 4.95-5.1 8.7a5.1 5.1 0 1010.2 0c0-3.75-3.95-5.1-5.1-8.7z" />
      </svg>
    ),
  },
  {
    name: "Elementor",
    wordmark: "elementor",
    className: "trust-logo--elementor",
    icon: (
      <svg viewBox="0 0 22 22" aria-hidden="true">
        <path fillRule="evenodd" d="M4.2 1.6h13.6A2.6 2.6 0 0120.4 4.2v13.6a2.6 2.6 0 01-2.6 2.6H4.2a2.6 2.6 0 01-2.6-2.6V4.2A2.6 2.6 0 014.2 1.6zm2.7 3.9h8.2v2H6.9v-2zm0 4.3h5.4v2H6.9v-2zm0 4.3h8.2v2H6.9v-2z" />
      </svg>
    ),
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
};

const pricingGridMotion = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.08 } },
};

const pricingCardMotion = {
  hidden: { opacity: 0, y: 34, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  },
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

function Heading({ label, title, text, light = false, align = "center" }: { label: string; title: string; text?: string; light?: boolean; align?: "center" | "left" }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div className={`section-heading ${light ? "section-heading--light" : ""} ${align === "left" ? "section-heading--left" : ""}`} {...(reduceMotion ? { initial: false } : fadeUp)}>
      <span>{label}</span>
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </motion.div>
  );
}

function SitePreview() {
  return (
    <div className="hero-visual" role="img" aria-label="Premium WordPress website in a browser window">
      <div className="hero-visual-glow" aria-hidden="true" />
      <div className="hero-browser">
        <div className="hero-browser-bar" aria-hidden="true">
          <span className="hero-browser-dots"><i /><i /><i /></span>
          <span className="hero-browser-url">northstudio.com</span>
        </div>
        <div className="hero-browser-page">
          <div className="preview-nav">
            <b>NORTH STUDIO</b>
            <span>Work &nbsp; Services &nbsp; Studio</span>
            <i>Get Started</i>
          </div>
          <div className="preview-stage">
            <Image
              src="/hero-preview.jpg"
              alt=""
              fill
              sizes="(max-width: 780px) 92vw, 55vw"
              priority
            />
            <div className="preview-copy">
              <small>WORDPRESS EXPERIENCE</small>
              <strong>A website built to convert.</strong>
              <em>View Our Work</em>
            </div>
          </div>
          <div className="preview-strip" aria-hidden="true">
            <span>Strategy</span>
            <span>Design</span>
            <span>Launch</span>
          </div>
        </div>
      </div>
      <div className="hero-phone" aria-hidden="true">
        <span className="hero-phone-notch" />
        <div className="hero-phone-screen">
          <Image
            src="/hero-preview.jpg"
            alt=""
            fill
            sizes="140px"
          />
        </div>
      </div>
    </div>
  );
}

export function LandingPage() {
  const [openFaq, setOpenFaq] = useState(0);
  const [selectedPlan, setSelectedPlan] = useState("Business");
  const [activeProcess, setActiveProcess] = useState(0);
  const reduceMotion = useReducedMotion();
  const reveal = reduceMotion ? { initial: false as const } : fadeUp;

  return (
    <main>
      <section
        className="hero"
        id="home"
        onMouseMove={(event) => {
          if (reduceMotion) return;
          const rect = event.currentTarget.getBoundingClientRect();
          event.currentTarget.style.setProperty("--hero-x", ((event.clientX - rect.left) / rect.width).toFixed(4));
          event.currentTarget.style.setProperty("--hero-y", ((event.clientY - rect.top) / rect.height).toFixed(4));
        }}
      >
        <div className="hero-bg" aria-hidden="true">
          <span className="hero-grid" />
          <span className="hero-orb hero-orb--one" />
          <span className="hero-orb hero-orb--two" />
          <span className="hero-spot" />
        </div>
        <div className="container hero-layout">
          <div className="hero-copy">
            <span className="eyebrow">WORDPRESS DEVELOPMENT AGENCY</span>
            <h1><span>We Build WordPress</span><span>Websites That Help</span><em>Your Business Grow.</em></h1>
            <p>Fast, secure and high-performing WordPress websites designed to rank higher and convert better.</p>
            <div className="hero-actions">
              <QuoteLink className="button">Get a Free Quote</QuoteLink>
              <Link className="button button--ghost" href="/services">View Services</Link>
            </div>
            <div className="hero-trust">
              <div><b>150+</b><span>Websites Launched</span></div>
              <div><b>98%</b><span>Client Satisfaction</span></div>
              <div><b>4–8</b><span>Week Timeline</span></div>
            </div>
            <div className="hero-benefits">
              <div><Zap /><strong>Fast &amp; Optimized</strong></div>
              <div><ShieldCheck /><strong>Secure &amp; Reliable</strong></div>
              <div><Headphones /><strong>24/7 Support</strong></div>
            </div>
          </div>
          <div className="hero-preview">
            <SitePreview />
          </div>
        </div>
      </section>

      <section className="why section" id="about">
        <div className="container why-layout">
          <div className="why-copy">
            <Heading align="left" label="ABOUT" title="Built With Strategy. Developed With Precision." text="We combine creativity, technology, and strategy to deliver WordPress websites that drive real business results." />
            <div className="why-bento">
              {[
                { icon: Zap, title: "Performance First", text: "Fast-loading websites optimized for a better user experience." },
                { icon: MonitorSmartphone, title: "Fully Responsive", text: "Websites that look great on desktop, tablet, and mobile." },
                { icon: LockKeyhole, title: "Secure & Reliable", text: "Security-focused development with reliable maintenance." },
                { icon: Palette, title: "Custom Design", text: "Unique experiences designed around your business." },
                { icon: Users, title: "Scalable Development", text: "Websites built to grow with your business." },
                { icon: Headphones, title: "Long-Term Support", text: "We're available even after your website goes live." },
              ].map((item, index) => (
                <motion.article
                  key={item.title}
                  className="why-card glow-card"
                  {...reveal}
                  {...pointerGlow(reduceMotion)}
                  whileHover={reduceMotion ? undefined : { y: -5, transition: { duration: 0.22 } }}
                  transition={reduceMotion ? { duration: 0 } : { ...fadeUp.transition, delay: index * 0.05 }}
                >
                  <span><item.icon /></span>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
          <motion.aside className="why-visual" {...reveal} aria-label="WPServices studio">
            <Image
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1400&q=85"
              alt="WPServices team collaborating on a WordPress project"
              fill
              sizes="(max-width: 780px) 100vw, 42vw"
            />
            <div className="why-visual-shade" />
            <div className="why-visual-panel">
              <p>Remote-first delivery across multiple time zones.</p>
              <div className="why-visual-stats">
                <div><strong>150+</strong><span>Websites launched</span></div>
                <div><strong>98%</strong><span>Client satisfaction</span></div>
              </div>
            </div>
          </motion.aside>
        </div>
      </section>

      <section className="stats-strip" aria-label="Studio results">
        <div className="container">
          <div className="stats-grid">
            <article aria-label="150 plus websites launched"><strong><CountUp value={150} suffix="+" /></strong><span>Websites launched</span></article>
            <article aria-label="98 percent client satisfaction"><strong><CountUp value={98} suffix="%" /></strong><span>Client satisfaction</span></article>
            <article aria-label="Typical project timeline of 4 to 8 weeks"><strong>4–8</strong><span>Week typical timeline</span></article>
            <article aria-label="Three global offices"><strong>3</strong><span>Global offices</span></article>
          </div>
        </div>
      </section>

      <motion.section
        className="trust-bar"
        id="trusted"
        aria-label="Trusted by businesses worldwide"
        initial={reduceMotion ? false : { opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="trust-row">
          <p className="trust-label">TRUSTED BY BUSINESSES WORLDWIDE</p>
          <div className="trust-marquee">
            <Marquee
              pauseOnHover={!reduceMotion}
              repeat={reduceMotion ? 1 : 2}
              animate={!reduceMotion}
              className="p-0 [--duration:32s] [--gap:4.5rem]"
            >
              <ul className="trust-logos">
                {trustBrands.map((brand) => (
                  <li key={brand.name}>
                    <span className={`trust-logo ${brand.className ?? ""}`}>
                      {brand.icon}
                      {brand.wordmark}
                    </span>
                  </li>
                ))}
              </ul>
            </Marquee>
          </div>
        </div>
      </motion.section>

      <section className="wpdev-section" aria-labelledby="wpdev-heading">
        <div className="container wpdev-inner">
          <div className="wpdev-copy">
            <motion.h2
              id="wpdev-heading"
              initial={reduceMotion ? false : { opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              High-Performance
              <em>WordPress Development</em>
              Solutions
            </motion.h2>
            <motion.p
              initial={reduceMotion ? false : { opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, delay: reduceMotion ? 0 : 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              Experts at WPServices build fast, secure, and conversion-focused WordPress websites designed to help businesses grow.
            </motion.p>
            <motion.p
              initial={reduceMotion ? false : { opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, delay: reduceMotion ? 0 : 0.14, ease: [0.22, 1, 0.36, 1] }}
            >
              From small businesses to established enterprises, every site is optimized for performance, usability, SEO, responsiveness, and conversions—so the experience stays clear on every device.
            </motion.p>
            <motion.p
              className="wpdev-support"
              initial={reduceMotion ? false : { opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, delay: reduceMotion ? 0 : 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              Let&apos;s Build Something Great for You.
            </motion.p>
            <motion.div
              className="wpdev-cta"
              initial={reduceMotion ? false : { opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, delay: reduceMotion ? 0 : 0.26, ease: [0.22, 1, 0.36, 1] }}
            >
              <QuoteLink className="button">Get a Free Consultation</QuoteLink>
            </motion.div>
          </div>

          <motion.figure
            className="wpdev-stage"
            initial={reduceMotion ? false : { opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: reduceMotion ? 0 : 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="wpdev-frame">
              <Image
                className="wpdev-mockup"
                src="/wpdev-wordpress-dashboard.jpg"
                alt="WordPress performance dashboard on a laptop, showing a 98 PageSpeed score and Core Web Vitals"
                width={1536}
                height={1024}
                quality={90}
                sizes="(max-width: 780px) 92vw, (max-width: 1100px) 60vw, 1080px"
              />
            </div>
            <div className="wpdev-float wpdev-float--score" aria-hidden="true">
              <span className="wpdev-float-inner">
                <span className="wpdev-float-icon"><CircleGauge /></span>
                <span>
                  <b>98</b>
                  <small>Performance</small>
                </span>
              </span>
            </div>
            <div className="wpdev-float wpdev-float--speed" aria-hidden="true">
              <span className="wpdev-float-inner">
                <span className="wpdev-float-icon"><Zap /></span>
                <span>
                  <b>1.2s</b>
                  <small>Load time</small>
                </span>
              </span>
            </div>
            <div className="wpdev-float wpdev-float--wp" aria-hidden="true">
              <span className="wpdev-float-inner">
                <span className="wpdev-float-icon">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path fill="currentColor" d="M12 2a10 10 0 100 20A10 10 0 0012 2zm-1.1 16.7L7.4 8.6h2.1l2.1 6.7 1.6-4.4H11l.6-1.8h5.3l-3.9 10.6h-2.1zm7.7-1.2l-1.6-4.6 1.5-4.3h2.1l-2 8.9zM5.3 8.6l3.5 10.1A8.2 8.2 0 013.8 12c0-1.2.3-2.4.7-3.4h.8z" />
                  </svg>
                </span>
                <span>
                  <b>WordPress</b>
                  <small>Native build</small>
                </span>
              </span>
            </div>
            <div className="wpdev-float wpdev-float--mobile" aria-hidden="true">
              <span className="wpdev-float-inner">
                <span className="wpdev-float-icon"><MonitorSmartphone /></span>
                <span>
                  <b>Responsive</b>
                  <small>Every device</small>
                </span>
              </span>
            </div>
            <div className="wpdev-float wpdev-float--secure" aria-hidden="true">
              <span className="wpdev-float-inner">
                <span className="wpdev-float-icon"><ShieldCheck /></span>
                <span>
                  <b>Secure</b>
                  <small>SSL &amp; hardening</small>
                </span>
              </span>
            </div>
          </motion.figure>
        </div>
      </section>

      <section className="process section" id="process">
        <div className="process-dots" />
        <div className="container">
          <Heading light label="OUR PROCESS" title="From Idea to Launch" text="A simple, transparent process to bring your vision to life." />
          <div className="process-grid">
            {process.map((step, index) => (
              <motion.article
                key={step.number}
                className={`glow-card ${activeProcess === index ? "is-active" : ""}`}
                {...reveal}
                {...pointerGlow(reduceMotion)}
                whileHover={reduceMotion ? undefined : { y: -5, transition: { duration: 0.22 } }}
                transition={reduceMotion ? { duration: 0 } : { ...fadeUp.transition, delay: index * 0.06 }}
                role="button"
                tabIndex={0}
                aria-pressed={activeProcess === index}
                aria-label={`Select ${step.title} process step`}
                onClick={() => setActiveProcess(index)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    setActiveProcess(index);
                  }
                }}
              >
                <span className={activeProcess === index ? "active" : ""}><step.icon /></span>
                <b>{step.number}</b><h3>{step.title}</h3><p>{step.text}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="pricing section" id="pricing">
        <div className="container">
          <Heading label="PRICING" title="Flexible Pricing for Every Business" />
          <motion.div
            className="pricing-grid"
            variants={pricingGridMotion}
            initial={reduceMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true, amount: 0.18 }}
          >
            {pricing.map((plan) => {
              const isSelected = selectedPlan === plan.name;
              return (
              <motion.article
                key={plan.name}
                className={`glow-card ${isSelected ? "featured" : ""}`}
                variants={pricingCardMotion}
                {...pointerGlow(reduceMotion)}
                role="button"
                tabIndex={0}
                aria-pressed={isSelected}
                aria-label={`Select the ${plan.name} pricing plan`}
                onClick={() => setSelectedPlan(plan.name)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    setSelectedPlan(plan.name);
                  }
                }}
              >
                {isSelected && <span className="popular">{plan.featured ? "Most Popular" : "Selected Plan"}</span>}
                <div className="pricing-plan-heading">
                  <h3>{plan.name}</h3>
                  <small>{plan.audience}</small>
                </div>
                <strong>Custom <span>Quote</span></strong>
                <ul>{plan.features.map((feature) => <li key={feature}><CheckMark size="compact" />{feature}</li>)}</ul>
                <a className="button" href="/contact" aria-label={`Get started with the ${plan.name} plan`}>
                  Get Started</a>
              </motion.article>
              );
            })}
          </motion.div>
        </div>
      </section>

      <section className="cta-band">
        <div className="container cta-band-inner">
          <div>
            <span className="eyebrow">START YOUR PROJECT</span>
            <h2>Let&apos;s Build a WordPress Website That Grows Your Business</h2>
            <p>Share your goals, challenges, and ideal timeline. We&apos;ll reply with practical next steps—not a generic sales pitch.</p>
          </div>
          <div className="cta-band-actions">
            <QuoteLink className="button">Get a Free Quote</QuoteLink>
            <Link className="button button--ghost" href="/portfolio">View Our Work</Link>
          </div>
        </div>
      </section>

      <section className="insights section" id="insights">
        <div className="container">
          <Heading label="INSIGHTS" title="Practical WordPress Advice" text="Clear guidance to help you make smarter decisions about performance, security, SEO, and growth." />
          <div className="insights-stage">
            {insights.map((articleItem, index) => (
              <motion.article
                key={articleItem.slug}
                className={`insight-card glow-card ${index === 0 ? "insight-card--featured" : ""}`}
                {...reveal}
                {...pointerGlow(reduceMotion)}
                whileHover={reduceMotion ? undefined : { y: -6, transition: { duration: 0.22 } }}
                transition={reduceMotion ? { duration: 0 } : { ...fadeUp.transition, delay: index * 0.06 }}
              >
                <div className="insight-image"><Image src={articleItem.image} alt={articleItem.imageAlt} fill sizes="(max-width: 760px) 100vw, 50vw" /></div>
                <div>
                  <span>{articleItem.category}</span>
                  <h3>{articleItem.title}</h3>
                  <p>{articleItem.excerpt}</p>
                  <Link className="insight-read" href={insightHref(articleItem.slug)} aria-label={`Read article: ${articleItem.title}`}>
                    Read article
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="faq section" id="faq">
        <div className="container faq-layout">
          <div>
            <span className="eyebrow">COMMON QUESTIONS</span>
            <h2>Everything You Need to Know Before We Start</h2>
            <p>Still have a question? Tell us about your project and a WordPress specialist will respond within one business day.</p>
            <a className="button" href="/contact">Ask a Question</a>
          </div>
          <div className="faq-list">
            {faqs.map(([question, answer], index) => (
              <article className={openFaq === index ? "open" : ""} key={question}>
                <button
                  type="button"
                  onClick={() => setOpenFaq((current) => current === index ? -1 : index)}
                  aria-expanded={openFaq === index}
                  aria-controls={`faq-answer-${index}`}
                >
                  {question}<ChevronDown aria-hidden="true" />
                </button>
                <div
                  className="faq-answer"
                  id={`faq-answer-${index}`}
                  aria-hidden={openFaq !== index}
                >
                  <div><p>{answer}</p></div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
