"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Award,
  Blocks,
  Check,
  ChevronDown,
  CircleGauge,
  Code2,
  Compass,
  FileCode2,
  Gauge,
  Gem,
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
  ServerCog,
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
];

const projects = [
  { title: "E-Commerce Store", type: "Fashion & Retail", category: "E-commerce", image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=900&q=85", tags: ["WooCommerce", "Performance"] },
  { title: "Business Website", type: "Consulting", category: "Business", image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=85", tags: ["WordPress", "Redesign"] },
  { title: "Corporate Website", type: "Technology", category: "Business", image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=900&q=85", tags: ["Custom Development", "SEO"] },
  { title: "Real Estate Website", type: "Real Estate", category: "Real Estate", image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=85", tags: ["Property Listing", "Custom Search"] },
  { title: "Healthcare Website", type: "Healthcare", category: "Business", image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=900&q=85", tags: ["Appointments", "Optimization"] },
  { title: "Restaurant Website", type: "Food & Beverage", category: "Redesign", image: "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=900&q=85", tags: ["Reservations", "Custom Design"] },
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
  { name: "Sarah Mitchell", role: "Marketing Director, Brightland", quote: "Professional, responsive, and highly skilled. WPDEV delivered exactly what we needed, ahead of schedule.", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=85" },
  { name: "David Lee", role: "Founder, ShopBlend", quote: "Our new WooCommerce store runs incredibly fast and is finally easy to manage. Sales improved from week one.", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=85" },
];

const pricing = [
  { name: "Starter", audience: "For Small Businesses", features: ["5-page website", "Responsive design", "Contact form", "Basic SEO setup", "Social media integration", "Security setup"] },
  { name: "Business", audience: "For Growing Businesses", featured: true, features: ["Up to 10 pages", "Custom design", "Advanced forms", "SEO optimization", "Performance optimization", "Analytics", "Security"] },
  { name: "E-commerce", audience: "For Online Stores", features: ["WooCommerce", "Product setup", "Payment integration", "Shopping cart", "Checkout", "Order management", "Responsive design"] },
];

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-70px" },
  transition: { duration: 0.55 },
};

function Logo({ light = false }: { light?: boolean }) {
  return (
    <a className={`logo ${light ? "logo--light" : ""}`} href="#home" aria-label="WPDEV home">
      <span><Code2 /></span>
      <strong>WPDEV</strong>
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
    <div className="device-stage" aria-hidden="true">
      <div className="device-glow" />
      <div className="laptop">
        <div className="laptop-screen">
          <div className="preview-nav"><Logo /><small>Home&nbsp;&nbsp; Services&nbsp;&nbsp; Portfolio&nbsp;&nbsp; Contact</small></div>
          <div className="preview-hero">
            <span>WORDPRESS EXPERTS</span>
            <strong>We Create<br />Digital Experiences<br />That Drive Results.</strong>
            <i />
          </div>
        </div>
        <div className="laptop-base" />
      </div>
      <div className="phone"><div><span>WP</span><strong>Better websites.<br />Better business.</strong><i /><i /></div></div>
      <div className="score-card"><span>PageSpeed</span><strong>98</strong><small>Performance</small></div>
      <div className="growth-card"><span>↗</span><strong>+46%</strong><small>More conversions</small></div>
    </div>
  );
}

export function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const filteredProjects = useMemo(
    () => filter === "All" ? projects : projects.filter((project) => project.category === filter),
    [filter],
  );

  const nav = ["Home", "Services", "Portfolio", "Process", "About", "Blog", "Contact"];

  return (
    <main id="home">
      <header className={`header ${scrolled ? "header--scrolled" : ""}`}>
        <div className="container nav-shell">
          <Logo light />
          <nav className={`nav ${menuOpen ? "nav--open" : ""}`} aria-label="Primary navigation">
            {nav.map((item) => (
              <a key={item} href={item === "Blog" ? "#insights" : `#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)}>
                {item}
                {item === "Services" && <ChevronDown />}
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
        <div className="hero-grid-bg" />
        <div className="hero-orb hero-orb--one" />
        <div className="hero-orb hero-orb--two" />
        <div className="container hero-layout">
          <motion.div className="hero-copy" initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .7 }}>
            <span className="eyebrow">PROFESSIONAL WORDPRESS SERVICES</span>
            <h1>WordPress Websites<br />That Turn Visitors Into<br /><em>Customers</em></h1>
            <p>We design and develop fast, secure, responsive, and conversion-focused WordPress websites that help businesses build credibility and grow online.</p>
            <div className="hero-actions">
              <a className="button" href="#contact">Get a Free Quote <ArrowRight /></a>
              <a className="button button--ghost" href="#portfolio">View Our Work <ArrowRight /></a>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 35 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .8, delay: .1 }}>
            <SitePreview />
          </motion.div>
        </div>
        <div className="container trust-row">
          <span>TRUSTED BY 150+ BUSINESSES WORLDWIDE</span>
          <div><b>● envato</b><b>◈ WooCommerce</b><b>◉ elementor</b><b>▣ WP Engine</b><b>◎ GoDaddy</b></div>
        </div>
      </section>

      <section className="metrics" aria-label="Company performance">
        <div className="container metrics-grid">
          {[
            { icon: MonitorSmartphone, value: "150+", label: "Websites Delivered" },
            { icon: Award, value: "8+ Years", label: "Development Experience" },
            { icon: Gauge, value: "98%", label: "Client Satisfaction" },
            { icon: Headphones, value: "24/7", label: "Technical Support" },
          ].map((metric) => (
            <motion.div key={metric.label} {...fadeUp}>
              <span><metric.icon /></span><p><strong>{metric.value}</strong><small>{metric.label}</small></p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="services section" id="services">
        <div className="container">
          <Heading label="SERVICES" title="Everything You Need to Build a Better Website" text="From custom WordPress development to ongoing maintenance, we provide everything you need to create, launch, and grow your online presence." />
          <div className="service-grid">
            {services.map((service, index) => (
              <motion.article key={service.title} className="service-card" {...fadeUp} transition={{ duration: .45, delay: index * .035 }}>
                <span className={`service-icon service-icon--${service.color}`}><service.icon /></span>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
                <a href="#contact">Learn More <ArrowRight /></a>
              </motion.article>
            ))}
          </div>
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
                    <a href="#contact">View Case Study <ArrowRight /></a>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

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
          <Heading light label="WHY WPDEV" title="Built With Strategy. Developed With Precision." text="We combine creativity, technology, and strategy to deliver WordPress websites that drive real business results." />
          <div className="why-grid">
            {[
              { icon: Zap, title: "Performance First", text: "Fast-loading websites optimized for a better user experience." },
              { icon: MonitorSmartphone, title: "Fully Responsive", text: "Websites that look great on desktop, tablet, and mobile." },
              { icon: LockKeyhole, title: "Secure & Reliable", text: "Security-focused development with reliable maintenance." },
              { icon: ServerCog, title: "Custom Design", text: "Unique experiences designed around your business." },
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

      <section className="pricing section">
        <div className="container">
          <Heading label="PRICING" title="Flexible Pricing for Every Business" />
          <div className="pricing-grid">
            {pricing.map((plan) => (
              <motion.article key={plan.name} className={plan.featured ? "featured" : ""} {...fadeUp}>
                {plan.featured && <span className="popular">Most Popular</span>}
                <h3>{plan.name}</h3><small>{plan.audience}</small><strong>Custom<br />Quote</strong>
                <ul>{plan.features.map((feature) => <li key={feature}><Check />{feature}</li>)}</ul>
                <a className="button" href="#contact">Get Started</a>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="cta" id="contact">
        <div className="container cta-inner">
          <div><span>LET&apos;S BUILD SOMETHING GREAT</span><h2>Ready to Build a Better<br />WordPress Website?</h2><p>Tell us about your project and we&apos;ll help you turn your idea into a fast, professional, conversion-focused website.</p></div>
          <div className="cta-actions"><a className="button" href="mailto:hello@wpdev.com">Get a Free Quote</a><a className="button button--light" href="mailto:hello@wpdev.com">Schedule a Consultation</a></div>
          <div className="cta-art"><i /><i /><i /></div>
        </div>
      </section>

      <section className="newsletter" id="insights">
        <div className="container newsletter-inner">
          <div><span>Stay Updated with WordPress Tips</span><p>Join our newsletter and get the latest tips, guides, and WordPress insights.</p></div>
          <form onSubmit={(event) => event.preventDefault()}><input type="email" required aria-label="Email address" placeholder="Enter your email address" /><button type="submit">Subscribe <Send /></button></form>
        </div>
      </section>

      <footer>
        <div className="container footer-grid">
          <div className="footer-brand"><Logo /><p>Professional WordPress websites that help businesses grow online.</p><div><a href="#" aria-label="Facebook">f</a><a href="#" aria-label="LinkedIn">in</a><a href="#" aria-label="Instagram">◎</a><a href="#" aria-label="YouTube">▶</a></div></div>
          <div><h3>Services</h3><a href="#services">WordPress Development</a><a href="#services">WooCommerce</a><a href="#services">Custom Development</a><a href="#services">Maintenance</a></div>
          <div><h3>Company</h3><a href="#about">About Us</a><a href="#portfolio">Portfolio</a><a href="#process">Process</a><a href="#contact">Contact</a></div>
          <div><h3>Resources</h3><a href="#insights">WordPress Guide</a><a href="#insights">Blog</a><a href="#">Case Studies</a><a href="#">Documentation</a></div>
          <div><h3>Contact</h3><p>hello@wpdev.com</p><p>+1 (555) 123-4567</p><p>New York, NY 10001</p><a className="chat-link" href="mailto:hello@wpdev.com"><Mail /> Message us</a></div>
        </div>
        <div className="container footer-bottom"><span>© {new Date().getFullYear()} WPDEV. All Rights Reserved.</span><div><a href="#">Privacy Policy</a><a href="#">Terms & Conditions</a></div></div>
      </footer>
    </main>
  );
}
