"use client";

import Image from "next/image";
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Blocks,
  Check,
  ChevronDown,
  CircleGauge,
  Code2,
  Compass,
  FileCode2,
  Gauge,
  Globe2,
  Headphones,
  Layers3,
  LockKeyhole,
  Mail,
  Menu,
  MonitorSmartphone,
  Palette,
  PenTool,
  Search,
  Send,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Users,
  Wrench,
  X,
  Zap,
} from "lucide-react";

const services = [
  { icon: FileCode2, title: "WordPress Development", text: "Custom WordPress websites designed around your business goals.", color: "blue" },
  { icon: ShoppingCart, title: "WooCommerce Development", text: "Powerful, scalable online stores built with WooCommerce.", color: "violet" },
  { icon: Blocks, title: "Custom WordPress Development", text: "Custom functionality, integrations, plugins, and features.", color: "cyan" },
  { icon: Palette, title: "WordPress Redesign", text: "Transform an outdated website into a modern digital experience.", color: "indigo" },
  { icon: Gauge, title: "Speed Optimization", text: "Improve performance, loading times, and Core Web Vitals.", color: "sky" },
  { icon: Wrench, title: "WordPress Maintenance", text: "Updates, backups, security monitoring, fixes, and ongoing support.", color: "purple" },
  { icon: ShieldCheck, title: "WordPress Security", text: "Protect your website against vulnerabilities, malware, and attacks.", color: "blue" },
  { icon: Search, title: "SEO-Friendly Development", text: "Build websites with clean structure and strong technical SEO.", color: "cyan" },
  { icon: Globe2, title: "WordPress Migration", text: "Move your website safely between hosts or platforms with zero downtime.", color: "sky" },
  { icon: Headphones, title: "Ongoing Support", text: "Reliable expert help, proactive improvements, and priority troubleshooting.", color: "purple" },
];

const serviceMenuColumns = [
  {
    title: "BUILD — CREATION & FOUNDATION",
    groups: [
      { label: "SETUP", items: ["Custom Websites", "WordPress Setup", "WooCommerce Setup", "LearnDash Setup", "WooCommerce Development", "LearnDash Development"] },
      { label: "CUSTOMIZE", items: ["WordPress Customization", "WooCommerce Customization", "LearnDash Customization", "Plugin Development"] },
      { label: "MIGRATE", items: ["Migrate to WordPress", "Migrate to WooCommerce", "Migrate to LearnDash"], newItems: ["Migrate to WordPress"] },
    ],
  },
  {
    title: "MANAGE — MAINTENANCE & OPERATIONS",
    groups: [
      { label: "MAINTAIN", items: ["WordPress Maintenance"] },
      { label: "RETAINERS", items: ["Website Management", "Hire WordPress Developers", "Hire WooCommerce Developers", "Hire LearnDash Developers"] },
    ],
  },
  {
    title: "ENHANCE — GROWTH & OPTIMIZATION",
    groups: [
      { label: "REDESIGN", items: ["WordPress Re-design", "Landing Page Redesign"], newItems: ["WordPress Re-design"] },
      { label: "SPEED", items: ["WordPress Speed Optimization", "WooCommerce Speed Optimization"] },
      { label: "INTEGRATE", items: ["WordPress API Development"] },
      { label: "AUTOMATE", items: ["WordPress AI Automation"], newItems: ["WordPress AI Automation"] },
      { label: "SEO", items: ["WordPress SEO Services"] },
    ],
  },
];

const projects = [
  {
    title: "E-Commerce Store",
    type: "Fashion & Retail",
    category: "E-commerce",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=900&q=85",
    tags: ["WooCommerce", "Performance"],
    keywords: ["fashion WooCommerce theme", "minimal clothing store WordPress", "product-first ecommerce"],
    theme: "A clean WooCommerce fashion theme with large product imagery and a short checkout path.",
    study: "We interviewed the store owner, mapped the buying journey, and compared competitor catalogs. Then we searched ThemeForest and WordPress.org using fashion-specific keywords to shortlist three product-first themes.",
    approach: "We customized the chosen theme for brand colors, built reusable product blocks, optimized images, and streamlined cart-to-checkout so shoppers could complete an order in fewer steps.",
    outcome: "The store launched with faster category pages, clearer product details, and a checkout flow the client can manage without a developer.",
  },
  {
    title: "Business Website",
    type: "Consulting",
    category: "Business",
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=85",
    tags: ["WordPress", "Redesign"],
    keywords: ["consulting WordPress theme", "professional services agency", "clean corporate landing"],
    theme: "A professional consulting theme with a strong hero, service cards, and a lead-focused contact path.",
    study: "We reviewed the old site’s bounce points, collected service keywords from sales calls, and searched WordPress themes for consulting and professional-services layouts that supported trust and lead capture.",
    approach: "We redesigned the homepage around one offer, rebuilt service pages as editable blocks, and connected the contact form to a clear follow-up process.",
    outcome: "The new site presents the firm’s expertise in seconds and makes it easy for prospects to request a consultation.",
  },
  {
    title: "Corporate Website",
    type: "Technology",
    category: "Business",
    image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=900&q=85",
    tags: ["Custom Development", "SEO"],
    keywords: ["tech company WordPress theme", "SaaS corporate website", "enterprise clean layout"],
    theme: "A modern technology theme with structured service sections, case-study modules, and technical SEO foundations.",
    study: "We audited existing content, listed search terms the sales team already used, and compared SaaS/corporate WordPress themes for clean typography, fast page templates, and schema-ready layouts.",
    approach: "We selected one theme as the visual base, then customized templates, added structured markup, and built reusable blocks so the marketing team could publish without breaking layout.",
    outcome: "The company now has a faster corporate site with clearer positioning and pages that are easier to rank and maintain.",
  },
  {
    title: "Real Estate Website",
    type: "Real Estate",
    category: "Real Estate",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=85",
    tags: ["Property Listing", "Custom Search"],
    keywords: ["real estate listing WordPress", "property search theme", "modern realtor website"],
    theme: "A listing-focused real estate theme with property cards, filters, and inquiry forms.",
    study: "We studied how buyers filter homes, collected neighborhood and property-type keywords, and searched WordPress themes built for listings, maps, and agent inquiry flows.",
    approach: "We customized the selected theme, added property search filters, connected listing details to inquiry forms, and kept the agent dashboard simple to update.",
    outcome: "Visitors can find relevant properties faster, and agents can publish new listings without waiting on a developer.",
  },
  {
    title: "Healthcare Website",
    type: "Healthcare",
    category: "Healthcare",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=900&q=85",
    tags: ["Appointments", "Optimization"],
    keywords: ["medical clinic WordPress theme", "appointment booking healthcare", "trust-focused medical site"],
    theme: "A calm healthcare theme with clear service pages, doctor profiles, and appointment calls to action.",
    study: "We reviewed patient questions, mapped the appointment journey, and searched healthcare WordPress themes using clinic, booking, and trust-focused keywords to find a layout that felt professional and easy to use.",
    approach: "We customized the chosen theme, simplified service descriptions, added appointment prompts, and optimized page speed so patients could book without friction.",
    outcome: "The clinic site now feels trustworthy, loads quickly, and guides patients toward booking instead of calling around.",
  },
  {
    title: "Restaurant Website",
    type: "Food & Beverage",
    category: "Redesign",
    image: "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=900&q=85",
    tags: ["Reservations", "Custom Design"],
    keywords: ["restaurant reservation WordPress", "food menu theme", "hospitality website redesign"],
    theme: "A hospitality theme with a visual menu, reservation block, and mobile-first dining story.",
    study: "We reviewed the old menu pages, noted where guests dropped off, and searched WordPress themes with restaurant, reservation, and food-menu keywords to find a design that looked appetizing on phones.",
    approach: "We rebuilt the site on the selected theme, designed a scannable menu, added reservation calls to action, and kept content easy for the restaurant team to update daily.",
    outcome: "Guests can view the menu and request a table in one visit, and the restaurant can change specials without extra support.",
  },
];

const process = [
  { icon: Compass, number: "01", title: "Discovery", text: "We understand your business, audience, and goals." },
  { icon: PenTool, number: "02", title: "Strategy", text: "We create the website structure and project roadmap." },
  { icon: Layers3, number: "03", title: "Design", text: "We design a modern, conversion-focused experience." },
  { icon: Code2, number: "04", title: "Development", text: "We build the website with clean, scalable code." },
  { icon: CircleGauge, number: "05", title: "Testing", text: "We test performance, functionality, and responsiveness." },
  { icon: Sparkles, number: "06", title: "Launch & Support", text: "We launch your website and provide ongoing support." },
];

const testimonials = [
  { name: "James Carter", role: "CEO, Northstar", quote: "The team completely transformed our website. The new design looks stunning and has increased our lead quality.", avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=120&q=85" },
  { name: "Sarah Mitchell", role: "Marketing Director, Brightland", quote: "Professional, responsive, and highly skilled. WPServices delivered exactly what we needed, ahead of schedule.", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=85" },
  { name: "David Lee", role: "Founder, ShopBlend", quote: "Our new WooCommerce store runs incredibly fast and is finally easy to manage. Sales improved from week one.", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=85" },
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
  },
  {
    category: "Security",
    title: "The WordPress Security Checklist Every Business Needs",
    text: "Reduce risk with sensible hardening, monitoring, backups, and access controls.",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=900&q=85",
  },
  {
    category: "WooCommerce",
    title: "Seven Ways to Improve Your Store’s Conversion Rate",
    text: "Remove buying friction and create a checkout experience customers trust.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=900&q=85",
  },
];

const faqs = [
  ["How long does a WordPress project take?", "Most marketing websites take 4–8 weeks. Complex WooCommerce or integration projects may take 8–14 weeks. You receive a clear milestone plan before work begins."],
  ["Can you improve an existing WordPress website?", "Yes. We can redesign, optimize, secure, migrate, or extend an existing site without forcing a full rebuild when it is not necessary."],
  ["Do you provide hosting and ongoing maintenance?", "We help select and configure reliable managed hosting, then offer monthly care plans covering updates, backups, uptime, security, and priority support."],
  ["Will the website be easy for our team to edit?", "Yes. We build reusable blocks and provide a short handoff session so your team can update pages and content without touching code."],
  ["Is SEO included?", "Every project includes technical SEO foundations, semantic structure, metadata, sitemap configuration, performance work, and analytics readiness."],
];

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-70px" },
  transition: { duration: 0.55 },
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

function Logo({ light = false, detailed = false }: { light?: boolean; detailed?: boolean }) {
  return (
    <a className={`logo ${light ? "logo--light" : ""} ${detailed ? "logo--detailed" : ""}`} href="#home" aria-label="WPServices home">
      <span>{detailed ? <b>W</b> : <Code2 />}</span>
      <span className="logo-copy"><strong>WPServices</strong>{detailed && <small>WordPress Solutions</small>}</span>
    </a>
  );
}

function Heading({ label, title, text, light = false }: { label: string; title: string; text?: string; light?: boolean }) {
  return (
    <motion.div className={`section-heading ${light ? "section-heading--light" : ""}`} {...fadeUp}>
      <span>{label}</span>
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </motion.div>
  );
}

function SitePreview() {
  return (
    <div className="hero-visual" role="img" aria-label="Premium WordPress website displayed on a laptop">
      <div className="hero-visual-shape" />
      <div className="hero-laptop">
        <div className="hero-laptop-screen">
          <div className="mock-nav">
            <strong>MODERN STUDIO</strong>
            <span>Home &nbsp; About &nbsp; Services &nbsp; Work &nbsp; Contact</span>
          </div>
          <div className="mock-site">
            <div className="mock-site-copy">
              <span>DIGITAL EXPERIENCES</span>
              <strong>We create digital<br />experiences that<br />drive real results.</strong>
              <i>View Our Work</i>
            </div>
            <div className="mock-site-image">
              <Image
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=85"
                alt=""
                fill
                sizes="(max-width: 780px) 88vw, 44vw"
              />
            </div>
          </div>
          <div className="mock-features">
            <span><b>Strategy</b><small>Smart strategy that brings clarity.</small></span>
            <span><b>Design</b><small>Clean design that converts.</small></span>
            <span><b>Development</b><small>Powerful development that performs.</small></span>
            <span><b>Support</b><small>Ongoing support you can count on.</small></span>
          </div>
        </div>
        <div className="hero-laptop-base" />
      </div>
    </div>
  );
}

export function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [filter, setFilter] = useState("All");
  const [openFaq, setOpenFaq] = useState(0);
  const [leadStatus, setLeadStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [leadMessage, setLeadMessage] = useState("");
  const [startedAt, setStartedAt] = useState(() => Date.now());
  const [selectedPlan, setSelectedPlan] = useState("Business");
  const [servicesMenuOpen, setServicesMenuOpen] = useState(false);
  const [caseStudy, setCaseStudy] = useState<(typeof projects)[number] | null>(null);
  const servicesMenuRef = useRef<HTMLDivElement>(null);
  const caseStudyCloseRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const closeOnOutsideClick = (event: PointerEvent) => {
      if (servicesMenuRef.current && !servicesMenuRef.current.contains(event.target as Node)) setServicesMenuOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setServicesMenuOpen(false);
    };
    document.addEventListener("pointerdown", closeOnOutsideClick);
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutsideClick);
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  useEffect(() => {
    if (!caseStudy) return;
    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setCaseStudy(null);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    caseStudyCloseRef.current?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [caseStudy]);

  const filteredProjects = useMemo(
    () => filter === "All" ? projects : projects.filter((project) => project.category === filter),
    [filter],
  );

  async function submitLead(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
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

  const nav = ["Home", "Services", "Portfolio", "About", "Blog", "Contact"];

  return (
    <main id="home">
      <header className={`header ${scrolled ? "header--scrolled" : ""}`}>
        <div className="container nav-shell">
          <Logo detailed />
          <nav className={`nav ${menuOpen ? "nav--open" : ""}`} aria-label="Primary navigation">
            {nav.map((item) => item === "Services" ? (
              <div className="nav-services" ref={servicesMenuRef} key={item}>
                <button
                  className="nav-service-trigger"
                  type="button"
                  aria-expanded={servicesMenuOpen}
                  aria-controls="services-mega-menu"
                  onClick={() => setServicesMenuOpen((open) => !open)}
                >
                  Services <ChevronDown aria-hidden="true" />
                </button>
                <div
                  className={`service-mega-menu ${servicesMenuOpen ? "service-mega-menu--open" : ""}`}
                  id="services-mega-menu"
                  aria-hidden={!servicesMenuOpen}
                >
                  {serviceMenuColumns.map((column) => (
                    <div className="service-menu-column" key={column.title}>
                      <h2>{column.title}</h2>
                      {column.groups.map((group) => (
                        <div className="service-menu-group" key={group.label}>
                          <h3>{group.label}</h3>
                          {group.items.map((service) => (
                            <a href="#contact" key={service} onClick={() => {
                              setServicesMenuOpen(false);
                              setMenuOpen(false);
                            }}>
                              {service}
                              {group.newItems?.includes(service) && <small>NEW</small>}
                            </a>
                          ))}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <a key={item} href={item === "Blog" ? "#insights" : `#${item.toLowerCase()}`} onClick={() => {
                setMenuOpen(false);
                setServicesMenuOpen(false);
              }}>
                {item}
              </a>
            ))}
          </nav>
          <a className="button button--small header-cta" href="#contact">Get a Free Quote</a>
          <button className="menu-button" type="button" aria-label="Toggle navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      <section className="hero">
        <div className="container hero-layout">
          <div className="hero-copy">
            <span className="eyebrow">WORDPRESS DEVELOPMENT AGENCY</span>
            <h1><span>We Build WordPress</span><span>Websites That Help</span><em>You Grow Your Business.</em></h1>
            <p>Fast, secure and high-performing WordPress websites designed to rank higher and convert better.</p>
            <div className="hero-actions">
              <a className="button" href="#contact">Get a Free Quote <ArrowRight /></a>
              <a className="button button--ghost" href="#portfolio">View Our Work <ArrowRight /></a>
            </div>
            <div className="hero-benefits">
              <div><Zap /><span><strong>Blazing Fast</strong><small>Speed Optimized</small></span></div>
              <div><ShieldCheck /><span><strong>Secure &amp; Reliable</strong><small>Built with Security</small></span></div>
              <div><Headphones /><span><strong>24/7 Support</strong><small>We&apos;re Here Anytime</small></span></div>
            </div>
          </div>
          <div className="hero-preview">
            <SitePreview />
          </div>
        </div>
        <div className="container trust-row">
          <span>TRUSTED BY BUSINESSES WORLDWIDE</span>
          <div><b>● envato</b><b>☁ Cloudways</b><b>◎ GoDaddy</b><b>HubSpot</b><b>◧ themeforest</b><b>◉ Elementor</b></div>
        </div>
      </section>

      <section className="portfolio section" id="portfolio">
        <div className="container">
          <Heading label="PORTFOLIO" title="Our Recent Work" />
          <div className="filters">
            {["All", "Business", "E-commerce", "Healthcare", "Real Estate", "Redesign"].map((item) => (
              <button className={filter === item ? "active" : ""} type="button" key={item} onClick={() => setFilter(item)}>{item}</button>
            ))}
          </div>
          <motion.div layout className="portfolio-grid">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <motion.article layout key={project.title} className="project-card" initial={{ opacity: 0, scale: .96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: .96 }}>
                  <div className="project-image"><Image src={project.image} alt={`${project.title} project`} fill sizes="(max-width: 720px) 100vw, 33vw" /></div>
                  <div className="project-content">
                    <h3>{project.title}</h3><p>{project.type}</p>
                    <ul>{project.tags.map((tag) => <li key={tag}><Check />{tag}</li>)}</ul>
                    <button type="button" onClick={() => setCaseStudy(project)} aria-label={`View case study for ${project.title}`}>
                      View Case Study <ArrowRight />
                    </button>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {caseStudy && (
        <div
          className="case-study-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setCaseStudy(null);
          }}
        >
          <section className="case-study-modal" role="dialog" aria-modal="true" aria-labelledby="case-study-title">
            <button ref={caseStudyCloseRef} className="case-study-close" type="button" onClick={() => setCaseStudy(null)} aria-label="Close case study">
              <X aria-hidden="true" />
            </button>
            <div className="case-study-image">
              <Image src={caseStudy.image} alt={`${caseStudy.title} case study`} fill sizes="(max-width: 720px) 92vw, 640px" />
            </div>
            <small>PORTFOLIO CASE STUDY</small>
            <h2 id="case-study-title">{caseStudy.title}</h2>
            <p className="case-study-type">{caseStudy.type}</p>
            <div className="case-study-keywords">
              <span>Theme search keywords</span>
              {caseStudy.keywords.map((keyword) => <b key={keyword}>{keyword}</b>)}
            </div>
            <div className="case-study-block">
              <h3>How we conducted the study</h3>
              <p>{caseStudy.study}</p>
            </div>
            <div className="case-study-block">
              <h3>How we handled the website</h3>
              <p>{caseStudy.approach}</p>
              <p>{caseStudy.theme}</p>
            </div>
            <div className="case-study-block">
              <h3>Result</h3>
              <p>{caseStudy.outcome}</p>
            </div>
            <a className="button" href="#contact" onClick={() => setCaseStudy(null)}>Start a Similar Project <ArrowRight /></a>
          </section>
        </div>
      )}

      <section className="process section" id="process">
        <div className="process-dots" />
        <div className="container">
          <Heading light label="OUR PROCESS" title="From Idea to Launch" text="A simple, transparent process to bring your vision to life." />
          <div className="process-grid">
            {process.map((step, index) => (
              <motion.article key={step.number} {...fadeUp} transition={{ delay: index * .06 }}>
                <span className={index === 0 ? "active" : ""}><step.icon /></span>
                <b>{step.number}</b><h3>{step.title}</h3><p>{step.text}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="why section" id="about">
        <div className="container">
          <Heading label="WHY WPSERVICES" title="Built With Strategy. Developed With Precision." text="We combine creativity, technology, and strategy to deliver WordPress websites that drive real business results." />
          <div className="why-grid">
            {[
              { icon: Zap, title: "Performance First", text: "Fast-loading websites optimized for a better user experience." },
              { icon: MonitorSmartphone, title: "Fully Responsive", text: "Websites that look great on desktop, tablet, and mobile." },
              { icon: LockKeyhole, title: "Secure & Reliable", text: "Security-focused development with reliable maintenance." },
              { icon: Palette, title: "Custom Design", text: "Unique experiences designed around your business." },
              { icon: Users, title: "Scalable Development", text: "Websites built to grow with your business." },
              { icon: Headphones, title: "Long-Term Support", text: "We're available even after your website goes live." },
            ].map((item) => (
              <motion.article key={item.title} {...fadeUp}>
                <span><item.icon /></span><h3>{item.title}</h3><p>{item.text}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="testimonials section">
        <div className="container">
          <Heading label="TESTIMONIALS" title="What Our Clients Say" />
          <div className="testimonial-grid">
            {testimonials.map((review, index) => (
              <motion.figure key={review.name} {...fadeUp} transition={{ delay: index * .07 }}>
                <div className="review-head"><Image src={review.avatar} alt="" width={52} height={52} /><div><strong>{review.name}</strong><small>{review.role}</small></div></div>
                <blockquote>&ldquo;{review.quote}&rdquo;</blockquote>
                <div className="stars">★★★★★</div>
              </motion.figure>
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
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.18 }}
          >
            {pricing.map((plan) => {
              const isSelected = selectedPlan === plan.name;
              return (
              <motion.article
                key={plan.name}
                className={isSelected ? "featured" : ""}
                variants={pricingCardMotion}
                layout
                whileHover={{ y: -8, transition: { duration: 0.22 } }}
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
                <ul>{plan.features.map((feature) => <li key={feature}><Check />{feature}</li>)}</ul>
                <a className="button" href="#contact" aria-label={`Get started with the ${plan.name} plan`}>
                  Get Started <ArrowRight aria-hidden="true" />
                </a>
              </motion.article>
              );
            })}
          </motion.div>
        </div>
      </section>

      <section className="insights section" id="insights">
        <div className="container">
          <Heading label="INSIGHTS" title="Practical WordPress Advice" text="Clear guidance to help you make smarter decisions about performance, security, SEO, and growth." />
          <div className="insights-grid">
            {insights.map((article, index) => (
              <motion.article key={article.title} {...fadeUp} transition={{ delay: index * .06 }}>
                <div className="insight-image"><Image src={article.image} alt="" fill sizes="(max-width: 760px) 100vw, 33vw" /></div>
                <div><span>{article.category}</span><h3>{article.title}</h3><p>{article.text}</p><a href="#contact">Read article <ArrowRight /></a></div>
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
            <a className="button" href="#contact">Ask a Question <ArrowRight /></a>
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

      <section className="lead-section section" id="contact">
        <div className="container lead-layout">
          <motion.div className="lead-copy" {...fadeUp}>
            <span className="eyebrow">START YOUR PROJECT</span>
            <h2>Let&apos;s Build a WordPress Website That Grows Your Business</h2>
            <p>Share your goals, challenges, and ideal timeline. We&apos;ll reply with practical next steps—not a generic sales pitch.</p>
            <ul>
              <li><Check /> Response within one business day</li>
              <li><Check /> Clear scope and transparent pricing</li>
              <li><Check /> No obligation or aggressive follow-up</li>
            </ul>
            <div className="lead-trust"><strong>150+</strong><span>websites launched</span><strong>98%</strong><span>client satisfaction</span></div>
          </motion.div>
          <motion.form className="lead-form" onSubmit={submitLead} {...fadeUp}>
            <div className="lead-form-row">
              <label>Full name<input name="name" required minLength={2} autoComplete="name" placeholder="Alex Morgan" /></label>
              <label>Work email<input name="email" required type="email" autoComplete="email" placeholder="alex@company.com" /></label>
            </div>
            <div className="lead-form-row">
              <label>Phone <small>Optional</small><input name="phone" type="tel" autoComplete="tel" placeholder="+1 555 123 4567" /></label>
              <label>Company <small>Optional</small><input name="company" autoComplete="organization" placeholder="Company name" /></label>
            </div>
            <div className="lead-form-row">
              <label>Service
                <select name="service" required defaultValue="">
                  <option value="" disabled>Select a service</option>
                  {services.map((service) => <option key={service.title} value={service.title}>{service.title}</option>)}
                </select>
              </label>
              <label>Estimated budget
                <select name="budget" defaultValue="">
                  <option value="">Not sure yet</option>
                  <option>$2,500–$5,000</option>
                  <option>$5,000–$10,000</option>
                  <option>$10,000–$20,000</option>
                  <option>$20,000+</option>
                </select>
              </label>
            </div>
            <label>Project details<textarea name="message" required minLength={20} rows={5} placeholder="What are you building, fixing, or improving?" /></label>
            <label className="honeypot" aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
            <label className="consent"><input name="consent" type="checkbox" required />I agree that WPServices may use these details to respond to my inquiry.</label>
            <button className="button lead-submit" type="submit" disabled={leadStatus === "loading"}>
              {leadStatus === "loading" ? "Sending request..." : "Request a Free Consultation"} <Send />
            </button>
            {leadMessage && <p className={`lead-message lead-message--${leadStatus}`} role="status">{leadMessage}</p>}
          </motion.form>
        </div>
      </section>

      <section className="newsletter" id="newsletter">
        <div className="container newsletter-inner">
          <div><span>Stay Updated with WordPress Tips</span><p>Join our newsletter and get the latest tips, guides, and WordPress insights.</p></div>
          <form onSubmit={(event) => event.preventDefault()}><input type="email" required aria-label="Email address" placeholder="Enter your email address" /><button type="submit">Subscribe <Send /></button></form>
        </div>
      </section>

      <footer>
        <div className="container footer-inner">
          <div className="footer-top">
            <div className="footer-brand">
              <Logo detailed />
              <p>WPServices is a WordPress development studio focused on custom themes, WooCommerce, plugins, migrations, and ongoing care for teams that need reliable delivery.</p>
              <p className="footer-note">Remote-first delivery across multiple time zones.</p>
              <a className="footer-email" href="mailto:info@technologiallc.com"><Mail aria-hidden="true" /> info@technologiallc.com</a>
              <div className="footer-social">
                <a href="#" aria-label="Facebook">f</a>
                <a href="#" aria-label="LinkedIn">in</a>
                <a href="#" aria-label="Instagram">◎</a>
                <a href="#" aria-label="YouTube">▶</a>
              </div>
            </div>
            <div className="footer-links">
              <div>
                <h3>Our Services</h3>
                <a href="#contact">Website Development</a>
                <a href="#contact">Website Revamp</a>
                <a href="#contact">Performance Optimization</a>
                <a href="#contact">Maintenance &amp; Care</a>
                <a href="#contact">AI Automations</a>
                <a href="#contact">Website Design Services</a>
              </div>
              <div>
                <h3>Studio</h3>
                <a href="#contact">Hire Us</a>
                <a href="#about">About Us</a>
                <a href="#portfolio">Portfolio</a>
                <a href="#process">Our Process</a>
                <a href="#pricing">Pricing</a>
                <a href="#faq">FAQs</a>
                <a href="#about">Industries</a>
              </div>
              <div>
                <h3>Resources</h3>
                <a href="#insights">Blog</a>
                <a href="#portfolio">Case Studies</a>
                <a href="#insights">Guidebooks</a>
                <a href="#insights">Tools</a>
                <a href="#contact">WooCommerce Plugins</a>
              </div>
            </div>
          </div>
          <div className="footer-offices">
            <article>
              <span>UAE</span>
              <p>Sahara Health Care City, Regus 524, Dubai</p>
              <a href="tel:+971585847929">00971585847929</a>
            </article>
            <article>
              <span>Pakistan</span>
              <p>Gujranwala, Punjab</p>
              <a href="tel:+923042336926">03042336926</a>
            </article>
            <article>
              <span>USA</span>
              <p>New York, NY 10001</p>
              <a href="tel:+15551234567">+1 (555) 123-4567</a>
            </article>
          </div>
          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} WPServices. All Rights Reserved.</span>
            <div><a href="#">Privacy Policy</a><a href="#">Terms & Conditions</a></div>
          </div>
        </div>
      </footer>
    </main>
  );
}
