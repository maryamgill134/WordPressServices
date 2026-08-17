"use client";

import Image from "next/image";
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
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

function Logo({ light = false, detailed = false, onClick }: { light?: boolean; detailed?: boolean; onClick?: () => void }) {
  return (
    <a className={`logo ${light ? "logo--light" : ""} ${detailed ? "logo--detailed" : ""}`} href="#home" aria-label="WPServices home" onClick={onClick}>
      <span>{detailed ? <b>W</b> : <Code2 />}</span>
      <span className="logo-copy"><strong>WPServices</strong>{detailed && <small>WordPress Solutions</small>}</span>
    </a>
  );
}

function Heading({ label, title, text, light = false }: { label: string; title: string; text?: string; light?: boolean }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div className={`section-heading ${light ? "section-heading--light" : ""}`} {...(reduceMotion ? { initial: false } : fadeUp)}>
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
  const [activeProcess, setActiveProcess] = useState(0);
  const [activeSection, setActiveSection] = useState("home");
  const [servicesMenuOpen, setServicesMenuOpen] = useState(false);
  const [caseStudy, setCaseStudy] = useState<(typeof projects)[number] | null>(null);
  const [article, setArticle] = useState<(typeof insights)[number] | null>(null);
  const servicesMenuRef = useRef<HTMLDivElement>(null);
  const caseStudyCloseRef = useRef<HTMLButtonElement>(null);
  const articleCloseRef = useRef<HTMLButtonElement>(null);
  const reduceMotion = useReducedMotion();
  const reveal = reduceMotion ? { initial: false as const } : fadeUp;

  useEffect(() => {
    const sections = ["home", "about", "portfolio", "insights", "contact"];
    const onScroll = () => {
      setScrolled(window.scrollY > 16);
      let current = "home";
      for (const id of sections) {
        const section = document.getElementById(id);
        if (section && section.getBoundingClientRect().top <= 120) current = id;
      }
      setActiveSection(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 780) setMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen || caseStudy || article ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen, caseStudy, article]);

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
    if (!article) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setArticle(null);
    };
    window.addEventListener("keydown", closeOnEscape);
    articleCloseRef.current?.focus();
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [article]);

  useEffect(() => {
    if (!caseStudy) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setCaseStudy(null);
    };
    window.addEventListener("keydown", closeOnEscape);
    caseStudyCloseRef.current?.focus();
    return () => window.removeEventListener("keydown", closeOnEscape);
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
  const navTarget = (item: string) => item === "Blog" ? "insights" : item.toLowerCase();

  return (
    <main>
      <a className="skip-link" href="#home">Skip to content</a>
      <header className={`header ${scrolled ? "header--scrolled" : ""}`}>
        <div className="container nav-shell">
          <Logo detailed onClick={() => { setMenuOpen(false); setServicesMenuOpen(false); }} />
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
              <a
                key={item}
                href={`#${navTarget(item)}`}
                className={activeSection === navTarget(item) ? "nav-link--active" : undefined}
                aria-current={activeSection === navTarget(item) ? "page" : undefined}
                onClick={() => {
                  setMenuOpen(false);
                  setServicesMenuOpen(false);
                }}
              >
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

      <section className="hero" id="home">
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
      </section>

      <section className="why section" id="about">
        <div className="container">
          <Heading label="ABOUT" title="Built With Strategy. Developed With Precision." text="We combine creativity, technology, and strategy to deliver WordPress websites that drive real business results." />
          <div className="why-grid">
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
                {...reveal}
                transition={reduceMotion ? { duration: 0 } : { ...fadeUp.transition, delay: index * 0.06 }}
              >
                <span><item.icon /></span><h3>{item.title}</h3><p>{item.text}</p>
              </motion.article>
            ))}
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

      <section className="portfolio section" id="portfolio">
        <div className="container">
          <Heading label="PORTFOLIO" title="Our Recent Work" />
          <div className="filters">
            {["All", "Business", "E-commerce", "Healthcare", "Real Estate", "Redesign"].map((item) => (
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
                  key={project.title}
                  className="project-card"
                  initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
                  transition={{ duration: reduceMotion ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
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
              <motion.article
                key={step.number}
                {...reveal}
                transition={reduceMotion ? { duration: 0 } : { ...fadeUp.transition, delay: index * 0.06 }}
                className={activeProcess === index ? "is-active" : ""}
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
          <div className="testimonial-grid">
            {testimonials.map((review, index) => (
              <motion.figure
                key={review.name}
                {...reveal}
                transition={reduceMotion ? { duration: 0 } : { ...fadeUp.transition, delay: index * 0.07 }}
              >
                <div className="review-head"><Image src={review.avatar} alt={review.name} width={52} height={52} /><div><strong>{review.name}</strong><small>{review.role}</small></div></div>
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
            initial={reduceMotion ? false : "hidden"}
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
                whileHover={reduceMotion ? undefined : { y: -6, transition: { duration: 0.22 } }}
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
              <motion.article
                key={article.title}
                {...reveal}
                transition={reduceMotion ? { duration: 0 } : { ...fadeUp.transition, delay: index * 0.06 }}
              >
                <div className="insight-image"><Image src={article.image} alt={article.title} fill sizes="(max-width: 760px) 100vw, 33vw" /></div>
                <div>
                  <span>{article.category}</span>
                  <h3>{article.title}</h3>
                  <p>{article.text}</p>
                  <button type="button" onClick={() => setArticle(article)} aria-label={`Read article: ${article.title}`}>
                    Read article <ArrowRight />
                  </button>
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
            <a className="button" href="#contact" onClick={() => setArticle(null)}>Talk to a WordPress specialist <ArrowRight /></a>
          </article>
        </div>
      )}

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
          <motion.div className="lead-copy" {...reveal}>
            <span className="eyebrow">START YOUR PROJECT</span>
            <h2>Let&apos;s Build a WordPress Website That Grows Your Business</h2>
            <p>Share your goals, challenges, and ideal timeline. We&apos;ll reply with practical next steps—not a generic sales pitch.</p>
            <ul>
              <li><span className="lead-check"><Check /></span> Response within one business day</li>
              <li><span className="lead-check"><Check /></span> Clear scope and transparent pricing</li>
              <li><span className="lead-check"><Check /></span> No obligation or aggressive follow-up</li>
            </ul>
            <div className="lead-trust">
              <div><strong>150+</strong><span>websites launched</span></div>
              <div><strong>98%</strong><span>client satisfaction</span></div>
            </div>
          </motion.div>
          <motion.form className="lead-form" onSubmit={submitLead} {...reveal}>
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
          <form onSubmit={(event) => event.preventDefault()}>
            <label className="newsletter-field">
              <span className="sr-only">Email address</span>
              <input type="email" required autoComplete="email" placeholder="Enter your email address" />
            </label>
            <button type="submit">Subscribe <Send /></button>
          </form>
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
