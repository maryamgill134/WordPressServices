"use client";

import Image from "next/image";
import { MouseEvent, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleGauge,
  Code2,
  Compass,
  Headphones,
  Layers3,
  LockKeyhole,
  MonitorSmartphone,
  Palette,
  PenTool,
  Quote,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
  X,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { getHomePlugins } from "@/data/plugins";
import { PluginCard } from "@/components/plugin-card";
import { QuoteLink } from "@/components/quote-link";

const process = [
  { icon: Compass, number: "01", title: "Discovery", text: "We understand your business, audience, and goals." },
  { icon: PenTool, number: "02", title: "Strategy", text: "We create the website structure and project roadmap." },
  { icon: Layers3, number: "03", title: "Design", text: "We design a modern, conversion-focused experience." },
  { icon: Code2, number: "04", title: "Development", text: "We build the website with clean, scalable code." },
  { icon: CircleGauge, number: "05", title: "Testing", text: "We test performance, functionality, and responsiveness." },
  { icon: Sparkles, number: "06", title: "Launch & Support", text: "We launch your website and provide ongoing support." },
];

const testimonials = [
  { name: "James Carter", role: "CEO, Northstar", quote: "The team completely transformed our website. The new design looks stunning and has increased our lead quality.", avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=1600&q=85" },
  { name: "Sarah Mitchell", role: "Marketing Director, Brightland", quote: "Professional, responsive, and highly skilled. WPServices delivered exactly what we needed, ahead of schedule.", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1600&q=85" },
  { name: "David Lee", role: "Founder, ShopBlend", quote: "Our new WooCommerce store runs incredibly fast and is finally easy to manage. Sales improved from week one.", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1600&q=85" },
];

const pricing = [
  { name: "Starter", audience: "For Small Businesses", features: ["5-page website", "Responsive design", "Contact form", "Basic SEO setup", "Social media integration", "Security setup"] },
  { name: "Business", audience: "For Growing Businesses", featured: true, features: ["Up to 10 pages", "Custom design", "Advanced forms", "SEO optimization", "Performance optimization", "Analytics", "Security"] },
  { name: "E-commerce", audience: "For Online Stores", features: ["WooCommerce", "Product setup", "Payment integration", "Shopping cart", "Checkout", "Order management", "Responsive design"] },
];

const insights = [
  {
    category: "Performance",
    title: "How to Make WordPress Faster Without Breaking Your Site",
    text: "A practical Core Web Vitals checklist for faster pages and stronger conversions.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=85",
    sections: [
      {
        heading: "Start with what visitors actually feel",
        paragraphs: [
          "Speed work should protect conversions, not just improve a lab score. Measure Largest Contentful Paint, Interaction to Next Paint, and Cumulative Layout Shift on the pages that bring in leads or sales.",
          "Fix the homepage, key service pages, and checkout or contact templates first. Those pages decide whether someone stays long enough to take action.",
        ],
      },
      {
        heading: "A Core Web Vitals checklist that stays safe",
        paragraphs: ["Use this sequence so optimization does not break layout, forms, or WooCommerce:"],
        items: [
          "Compress and serve images in WebP or AVIF, with correct width and height attributes.",
          "Remove unused plugins, then delay non-critical JavaScript instead of stripping scripts the theme still needs.",
          "Cache HTML for anonymous visitors and keep cart, account, and form pages excluded.",
          "Preload only the hero font and the main image. Extra preloads can slow first paint.",
          "Test forms, menus, and checkout after every change, not only PageSpeed scores.",
        ],
      },
      {
        heading: "Keep the site maintainable",
        paragraphs: [
          "Document what you changed and why. A faster site that nobody can update safely is not a win. Re-test after plugin and theme updates so performance gains do not quietly disappear.",
        ],
      },
    ],
  },
  {
    category: "Security",
    title: "The WordPress Security Checklist Every Business Needs",
    text: "Reduce risk with sensible hardening, monitoring, backups, and access controls.",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=900&q=85",
    sections: [
      {
        heading: "Lock down access before you add more tools",
        paragraphs: [
          "Most WordPress incidents start with weak logins, leftover admin accounts, or outdated plugins. Hardening is useful only if the basics are already in place.",
        ],
        items: [
          "Use unique admin usernames, strong passwords, and two-factor authentication.",
          "Limit login attempts and hide unused author archives.",
          "Give each teammate the lowest role they need. Do not share one administrator login.",
          "Remove inactive users, demo accounts, and plugins that are no longer in use.",
        ],
      },
      {
        heading: "Backups, updates, and monitoring",
        paragraphs: [
          "A clean backup is the difference between a short recovery and a lost week. Keep automated offsite backups, then confirm you can restore them.",
          "Apply core, theme, and plugin updates on a schedule. Pair that with malware scanning and uptime alerts so you notice problems before customers do.",
        ],
      },
      {
        heading: "Sensible hardening",
        paragraphs: [
          "Disable file editing in wp-admin, keep XML-RPC restricted unless you need it, and serve the site over HTTPS everywhere. Security is a process, not a one-time plugin install.",
        ],
      },
    ],
  },
  {
    category: "WooCommerce",
    title: "Seven Ways to Improve Your Store’s Conversion Rate",
    text: "Remove buying friction and create a checkout experience customers trust.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=900&q=85",
    sections: [
      {
        heading: "Make the path to purchase obvious",
        paragraphs: [
          "Shoppers abandon stores when they cannot find shipping costs, product details, or a simple next step. Conversion work is mostly about removing doubt.",
        ],
      },
      {
        heading: "Seven changes that usually move the needle",
        paragraphs: [],
        items: [
          "Show price, stock, and delivery expectations on the product page, not only at checkout.",
          "Use clear product photos and short benefit-led descriptions above the fold.",
          "Keep the cart visible and make “Add to cart” the strongest action on the page.",
          "Offer guest checkout so first-time buyers are not forced to create an account.",
          "Cut extra form fields. Ask only for what you need to fulfill the order.",
          "Display trust signals near payment: secure checkout, return policy, and real support.",
          "Test the mobile checkout on a real phone. Most drop-off happens there.",
        ],
      },
      {
        heading: "Measure, then refine",
        paragraphs: [
          "Watch add-to-cart rate, checkout start rate, and completed orders after each change. Improve one friction point at a time so you know what actually helped.",
        ],
      },
    ],
  },
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
  const [article, setArticle] = useState<(typeof insights)[number] | null>(null);
  const [activeReview, setActiveReview] = useState(0);
  const articleCloseRef = useRef<HTMLButtonElement>(null);
  const reduceMotion = useReducedMotion();
  const reveal = reduceMotion ? { initial: false as const } : fadeUp;

  useEffect(() => {
    document.body.style.overflow = article ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [article]);

  useEffect(() => {
    if (!article) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setArticle(null);
    };
    window.addEventListener("keydown", closeOnEscape);
    articleCloseRef.current?.focus();
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [article]);

  const homePlugins = getHomePlugins();

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
            <div className="trust-track">
              {[0, 1].map((copy) => (
                <ul className="trust-logos" key={copy} aria-hidden={copy === 1}>
                  {trustBrands.map((brand) => (
                    <li key={`${copy}-${brand.name}`}>
                      <span className={`trust-logo ${brand.className ?? ""}`}>
                        {brand.icon}
                        {brand.wordmark}
                      </span>
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      <section className="plugins section" id="plugins">
        <div className="container">
          <Heading
            label="WOOCOMMERCE PLUGINS"
            title="WooCommerce Plugins Built for Real Stores"
            text="Powerful WooCommerce extensions designed to simplify operations, improve conversions, and help online stores grow."
          />
          <motion.div layout className="plugins-grid">
            {homePlugins.map((plugin, index) => (
              <motion.article
                key={plugin.name}
                initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: reduceMotion ? 0 : 0.4, delay: reduceMotion ? 0 : index * 0.04, ease: [0.22, 1, 0.36, 1] }}
              >
                <PluginCard plugin={plugin} reduceMotion={reduceMotion} />
              </motion.article>
            ))}
          </motion.div>
          <motion.div className="plugins-more" {...reveal}>
            <Link className="button" href="/products">View All Plugins</Link>
          </motion.div>
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

      <section className="testimonials section">
        <div className="container">
          <Heading label="TESTIMONIALS" title="What Our Clients Say" />
          <motion.div className="testimonial-board" {...reveal}>
            <div className="testimonial-portrait">
              {testimonials.map((review, index) => (
                <div
                  key={review.name}
                  className={`testimonial-portrait-frame ${index === activeReview ? "is-active" : ""}`}
                  aria-hidden={index !== activeReview}
                >
                  <Image src={review.avatar} alt={review.name} fill sizes="(max-width: 780px) 100vw, 38vw" />
                </div>
              ))}
            </div>
            <figure className="testimonial-quote">
              <Quote className="quote-mark" aria-hidden="true" />
              <div className="stars" aria-label="5 out of 5 stars">{Array.from({ length: 5 }).map((_, star) => <Star key={star} fill="currentColor" />)}</div>
              <blockquote key={testimonials[activeReview].name} className="testimonial-copy">
                &ldquo;{testimonials[activeReview].quote}&rdquo;
              </blockquote>
              <figcaption>
                <strong>{testimonials[activeReview].name}</strong>
                <small>{testimonials[activeReview].role}</small>
              </figcaption>
              <div className="testimonial-controls">
                <button type="button" aria-label="Previous testimonial" onClick={() => setActiveReview((current) => (current - 1 + testimonials.length) % testimonials.length)}>
                  <ChevronLeft />
                </button>
                <div className="testimonial-dots" role="tablist" aria-label="Choose a testimonial">
                  {testimonials.map((review, index) => (
                    <button
                      type="button"
                      key={review.name}
                      className={index === activeReview ? "is-active" : ""}
                      aria-label={`Show review from ${review.name}`}
                      aria-pressed={index === activeReview}
                      onClick={() => setActiveReview(index)}
                    />
                  ))}
                </div>
                <button type="button" aria-label="Next testimonial" onClick={() => setActiveReview((current) => (current + 1) % testimonials.length)}>
                  <ChevronRight />
                </button>
              </div>
              <div className="testimonial-people">
                {testimonials.map((review, index) => (
                  <button
                    type="button"
                    key={review.name}
                    className={index === activeReview ? "is-active" : ""}
                    aria-label={`Show review from ${review.name}`}
                    aria-pressed={index === activeReview}
                    onClick={() => setActiveReview(index)}
                  >
                    <Image src={review.avatar} alt="" width={48} height={48} />
                    <span>{review.name.split(" ")[0]}</span>
                  </button>
                ))}
              </div>
            </figure>
          </motion.div>
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
                <ul>{plan.features.map((feature) => <li key={feature}><span className="pricing-check"><Check /></span>{feature}</li>)}</ul>
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
                key={articleItem.title}
                className={`insight-card glow-card ${index === 0 ? "insight-card--featured" : ""}`}
                {...reveal}
                {...pointerGlow(reduceMotion)}
                whileHover={reduceMotion ? undefined : { y: -6, transition: { duration: 0.22 } }}
                transition={reduceMotion ? { duration: 0 } : { ...fadeUp.transition, delay: index * 0.06 }}
              >
                <div className="insight-image"><Image src={articleItem.image} alt={articleItem.title} fill sizes="(max-width: 760px) 100vw, 50vw" /></div>
                <div>
                  <span>{articleItem.category}</span>
                  <h3>{articleItem.title}</h3>
                  <p>{articleItem.text}</p>
                  <button type="button" onClick={() => setArticle(articleItem)} aria-label={`Read article: ${articleItem.title}`}>
                    Read article</button>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {article && (
        <div
          className="case-study-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setArticle(null);
          }}
        >
          <article className="case-study-modal article-modal" role="dialog" aria-modal="true" aria-labelledby="article-title">
            <button ref={articleCloseRef} className="case-study-close" type="button" onClick={() => setArticle(null)} aria-label="Close article">
              <X aria-hidden="true" />
            </button>
            <div className="case-study-image">
              <Image src={article.image} alt="" fill sizes="(max-width: 760px) 92vw, 720px" />
            </div>
            <small>{article.category}</small>
            <h2 id="article-title">{article.title}</h2>
            <p className="case-study-type">{article.text}</p>
            {article.sections.map((section) => (
              <div className="case-study-block" key={section.heading}>
                <h3>{section.heading}</h3>
                {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                {section.items && (
                  <ul className="article-points">
                    {section.items.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                )}
              </div>
            ))}
            <a className="button" href="/contact" onClick={() => setArticle(null)}>Talk to a WordPress specialist</a>
          </article>
        </div>
      )}

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
