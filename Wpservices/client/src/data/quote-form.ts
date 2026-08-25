export const quoteBuildingOptions = [
  { id: "wordpress-website", label: "WordPress Website", text: "A marketing or business website built on WordPress." },
  { id: "woocommerce-store", label: "WooCommerce Store", text: "An online store with products, cart, and checkout." },
  { id: "custom-development", label: "Custom WordPress Development", text: "Bespoke features, blocks, or workflows." },
  { id: "website-redesign", label: "Website Redesign", text: "A modern refresh of an existing WordPress site." },
  { id: "landing-page", label: "Landing Page", text: "A focused page designed to convert visitors." },
  { id: "wordpress-plugin", label: "WordPress Plugin", text: "A custom plugin for a specific business need." },
  { id: "learndash-website", label: "LearnDash Website", text: "A course or membership experience on LearnDash." },
  { id: "website-migration", label: "Website Migration", text: "Move to WordPress without losing content or SEO." },
  { id: "website-maintenance", label: "Website Maintenance", text: "Updates, backups, and ongoing site care." },
  { id: "other", label: "Other", text: "Something else. Tell us in the project details." },
] as const;

export const quoteSizeOptions = [
  "Small Project",
  "Medium Project",
  "Large Project",
  "Not Sure",
] as const;

export const quoteNeedOptions = [
  "UI/UX Design",
  "WordPress Development",
  "WooCommerce Development",
  "Custom Plugin Development",
  "Elementor Development",
  "API Integration",
  "Website Redesign",
  "Speed Optimization",
  "SEO-Friendly Development",
  "Website Maintenance",
  "Other",
] as const;

export const quoteBudgetOptions = [
  "Under $500",
  "$500 – $1,500",
  "$1,500 – $3,000",
  "$3,000 – $5,000",
  "$5,000+",
  "Not Sure",
] as const;

export const quoteTimelineOptions = [
  "ASAP",
  "Within 2–4 weeks",
  "1–2 months",
  "2–3 months",
  "Flexible",
] as const;

export const quoteProcessSteps = [
  {
    number: "01",
    title: "Tell us about your project",
    text: "Share your requirements and goals.",
  },
  {
    number: "02",
    title: "We review your request",
    text: "Our team reviews your project details.",
  },
  {
    number: "03",
    title: "Get a tailored response",
    text: "We'll recommend the right solution for your needs.",
  },
  {
    number: "04",
    title: "Start your project",
    text: "Once everything is aligned, we can get started.",
  },
] as const;

export const quoteTrustPoints = [
  "Clear scope and transparent pricing",
  "No obligation or aggressive follow-up",
  "Reply within one business day",
] as const;

export const QUOTE_PAGE_HREF = "/get-a-free-quote";
