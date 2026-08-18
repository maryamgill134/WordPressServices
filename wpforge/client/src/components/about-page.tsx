"use client";

import { type MouseEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Bot,
  Check,
  FileCode2,
  Gauge,
  GraduationCap,
  Palette,
  ShoppingCart,
} from "lucide-react";

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

const story = [
  "Build new WordPress websites",
  "Redesign outdated websites",
  "Customize WordPress solutions",
  "Develop WooCommerce stores",
  "Build LearnDash platforms",
  "Improve website performance",
  "Automate workflows",
  "Maintain and scale websites",
];

const expertise = [
  { icon: FileCode2, title: "WordPress Development", text: "Custom, scalable WordPress websites." },
  { icon: ShoppingCart, title: "WooCommerce", text: "High-performing eCommerce experiences." },
  { icon: GraduationCap, title: "LearnDash", text: "Powerful online learning platforms." },
  { icon: Palette, title: "UI/UX Design", text: "Modern, intuitive, conversion-focused interfaces." },
  { icon: Gauge, title: "Performance", text: "Fast, optimized, high-performing websites." },
  { icon: Bot, title: "Automation", text: "Smart integrations and AI-powered workflows." },
];

const reasons = [
  { title: "Expert WordPress Knowledge", text: "Deep expertise across WordPress, WooCommerce, and LearnDash." },
  { title: "Business-Focused Solutions", text: "We design and develop with business goals and conversions in mind." },
  { title: "Performance First", text: "Fast, secure, scalable, and optimized digital experiences." },
  { title: "Long-Term Partnership", text: "We don't just launch websites — we help businesses maintain and grow them." },
];

const approach = [
  { n: "01", title: "Discover", text: "Understand the business, users, goals, and challenges." },
  { n: "02", title: "Strategize", text: "Define the right structure, technology, and experience." },
  { n: "03", title: "Design", text: "Create intuitive and visually engaging digital experiences." },
  { n: "04", title: "Develop", text: "Build clean, scalable, high-performing WordPress solutions." },
  { n: "05", title: "Optimize", text: "Test, improve, launch, and continuously optimize." },
];

const technologies = ["WordPress", "WooCommerce", "LearnDash", "Elementor", "PHP", "JavaScript", "REST API", "AI Automation"];

const values = [
  { title: "Quality", text: "We focus on thoughtful design, clean development, and reliable results." },
  { title: "Innovation", text: "We continuously explore better technologies and smarter solutions." },
  { title: "Transparency", text: "Clear communication and honest collaboration at every stage." },
  { title: "Growth", text: "Every website should be built to evolve with the business." },
];

export function AboutPage() {
  const reduceMotion = useReducedMotion();
  const reveal = reduceMotion ? { initial: false as const } : fadeUp;

  return (
    <div className="svc-page about-page">
      <section className="about-hero">
        <div className="about-hero-bg" aria-hidden="true">
          <span className="hero-grid" />
          <span className="hero-orb hero-orb--one" />
          <span className="hero-orb hero-orb--two" />
        </div>
        <div className="container about-hero-inner">
          <div className="about-hero-copy">
            <span className="eyebrow">ABOUT US</span>
            <h1>We Build WordPress Experiences That <em>Move Businesses Forward.</em></h1>
            <p>We are a WordPress development and digital agency focused on creating high-performing, scalable, and conversion-focused digital experiences.</p>
            <div className="hero-actions">
              <a className="button" href="/#contact">Start a Project <ArrowRight /></a>
              <Link className="button button--ghost" href="/services">Explore Our Services <ArrowRight /></Link>
            </div>
          </div>
          <figure className="about-hero-visual">
            <Image
              src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1400&q=85"
              alt="WordPress development workspace"
              fill
              sizes="(max-width: 780px) 100vw, 44vw"
              priority
            />
          </figure>
        </div>
      </section>

      <section className="section about-story">
        <div className="container about-story-grid">
          <motion.div {...reveal}>
            <span className="eyebrow">WHO WE ARE</span>
            <h2>Built for Better Digital Experiences.</h2>
          </motion.div>
          <motion.div {...reveal}>
            <p>We work with businesses that need WordPress to do more than look finished. That means new sites, careful redesigns, custom builds, commerce, learning platforms, performance, automation, and the care that keeps everything moving after launch.</p>
            <ul className="svc-points about-story-points">
              {story.map((item) => <li key={item}><Check />{item}</li>)}
            </ul>
          </motion.div>
        </div>
      </section>

      <section className="section about-expertise">
        <div className="container">
          <motion.div className="section-heading" {...reveal}>
            <span>OUR EXPERTISE</span>
            <h2>A complete WordPress practice.</h2>
          </motion.div>
          <div className="svc-grid">
            {expertise.map((item, index) => (
              <motion.article
                className="svc-card glow-card"
                key={item.title}
                {...reveal}
                {...pointerGlow(reduceMotion)}
                whileHover={reduceMotion ? undefined : { y: -5, transition: { duration: 0.22 } }}
                transition={reduceMotion ? { duration: 0 } : { ...fadeUp.transition, delay: index * 0.05 }}
              >
                <span className="svc-card-icon"><item.icon /></span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="section svc-why">
        <div className="container">
          <motion.div className="section-heading" {...reveal}>
            <span>WHY CHOOSE US</span>
            <h2>What working with us actually feels like.</h2>
          </motion.div>
          <div className="svc-why-grid">
            {reasons.map((item, index) => (
              <motion.article
                className="why-card glow-card"
                key={item.title}
                {...reveal}
                {...pointerGlow(reduceMotion)}
                transition={reduceMotion ? { duration: 0 } : { ...fadeUp.transition, delay: index * 0.05 }}
              >
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
            <span>OUR APPROACH</span>
            <h2>A clear path from brief to better.</h2>
          </motion.div>
          <ol className="svc-timeline about-timeline">
            {approach.map((step, index) => (
              <motion.li
                key={step.n}
                {...reveal}
                transition={reduceMotion ? { duration: 0 } : { ...fadeUp.transition, delay: index * 0.06 }}
              >
                <b>{step.n}</b>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section svc-stack">
        <div className="container">
          <motion.div className="section-heading" {...reveal}>
            <span>TECHNOLOGY & EXPERTISE</span>
            <h2>The stack we work in every day.</h2>
            <p>Tools chosen for WordPress delivery — not a generic logo wall.</p>
          </motion.div>
          <ul className="svc-tech">
            {technologies.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <motion.div className="section-heading" {...reveal}>
            <span>OUR VALUES</span>
            <h2>How we show up on every project.</h2>
          </motion.div>
          <div className="svc-why-grid">
            {values.map((item, index) => (
              <motion.article
                className="why-card glow-card"
                key={item.title}
                {...reveal}
                {...pointerGlow(reduceMotion)}
                transition={reduceMotion ? { duration: 0 } : { ...fadeUp.transition, delay: index * 0.05 }}
              >
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

      <section className="cta-band">
        <div className="container cta-band-inner">
          <div>
            <span className="eyebrow">START YOUR PROJECT</span>
            <h2>Let&apos;s Build Something Better Together.</h2>
            <p>Have a WordPress project, redesign, or digital challenge in mind? Let&apos;s turn your ideas into a high-performing digital experience.</p>
          </div>
          <div className="cta-band-actions">
            <a className="button" href="/#contact">Start Your Project <ArrowRight /></a>
            <Link className="button button--ghost" href="/services">View Services <ArrowRight /></Link>
          </div>
        </div>
      </section>
    </div>
  );
}
