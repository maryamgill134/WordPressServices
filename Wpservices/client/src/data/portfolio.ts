export const portfolioFilters = [
  "All",
  "WordPress",
  "WooCommerce",
  "UI/UX",
  "Custom Development",
  "Redesign",
] as const;

export type PortfolioFilter = (typeof portfolioFilters)[number];

export type PortfolioProject = {
  slug: string;
  title: string;
  type: string;
  category: string;
  filters: Exclude<PortfolioFilter, "All">[];
  image: string;
  tags: string[];
  keywords: string[];
  features: string[];
  challenge: string;
  theme: string;
  study: string;
  approach: string;
  outcome: string;
};

export const portfolioProjects: PortfolioProject[] = [
  {
    slug: "e-commerce-store",
    title: "E-Commerce Store",
    type: "Fashion & Retail",
    category: "E-commerce",
    filters: ["WooCommerce", "UI/UX"],
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1600&q=85",
    tags: ["WooCommerce", "Performance"],
    keywords: ["fashion WooCommerce theme", "minimal clothing store WordPress", "product-first ecommerce"],
    features: ["Product-first catalog", "Reusable product blocks", "Optimized imagery", "Shorter cart-to-checkout path"],
    challenge: "Shoppers needed a catalog that led with products, and the store owner needed a checkout they could manage without a developer.",
    theme: "A clean WooCommerce fashion theme with large product imagery and a short checkout path.",
    study: "We interviewed the store owner, mapped the buying journey, and compared competitor catalogs. Then we searched ThemeForest and WordPress.org using fashion-specific keywords to shortlist three product-first themes.",
    approach: "We customized the chosen theme for brand colors, built reusable product blocks, optimized images, and streamlined cart-to-checkout so shoppers could complete an order in fewer steps.",
    outcome: "The store launched with faster category pages, clearer product details, and a checkout flow the client can manage without a developer.",
  },
  {
    slug: "business-website",
    title: "Business Website",
    type: "Consulting",
    category: "Business",
    filters: ["WordPress", "Redesign"],
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1600&q=85",
    tags: ["WordPress", "Redesign"],
    keywords: ["consulting WordPress theme", "professional services agency", "clean corporate landing"],
    features: ["Offer-led homepage", "Editable service pages", "Lead-focused contact path"],
    challenge: "The previous site lost visitors before they understood the offer, so the homepage needed one clear message and an easy way to request a consultation.",
    theme: "A professional consulting theme with a strong hero, service cards, and a lead-focused contact path.",
    study: "We reviewed the old site’s bounce points, collected service keywords from sales calls, and searched WordPress themes for consulting and professional-services layouts that supported trust and lead capture.",
    approach: "We redesigned the homepage around one offer, rebuilt service pages as editable blocks, and connected the contact form to a clear follow-up process.",
    outcome: "The new site presents the firm’s expertise in seconds and makes it easy for prospects to request a consultation.",
  },
  {
    slug: "corporate-website",
    title: "Corporate Website",
    type: "Technology",
    category: "Business",
    filters: ["WordPress", "Custom Development"],
    image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1600&q=85",
    tags: ["Custom Development", "SEO"],
    keywords: ["tech company WordPress theme", "SaaS corporate website", "enterprise clean layout"],
    features: ["Structured service templates", "Case-study modules", "Schema-ready layouts", "Reusable marketing blocks"],
    challenge: "Marketing needed a faster corporate site with clearer positioning, and pages that the team could publish without breaking layout or SEO.",
    theme: "A modern technology theme with structured service sections, case-study modules, and technical SEO foundations.",
    study: "We audited existing content, listed search terms the sales team already used, and compared SaaS/corporate WordPress themes for clean typography, fast page templates, and schema-ready layouts.",
    approach: "We selected one theme as the visual base, then customized templates, added structured markup, and built reusable blocks so the marketing team could publish without breaking layout.",
    outcome: "The company now has a faster corporate site with clearer positioning and pages that are easier to rank and maintain.",
  },
  {
    slug: "real-estate-website",
    title: "Real Estate Website",
    type: "Real Estate",
    category: "Real Estate",
    filters: ["Custom Development", "UI/UX"],
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85",
    tags: ["Property Listing", "Custom Search"],
    keywords: ["real estate listing WordPress", "property search theme", "modern realtor website"],
    features: ["Property listing cards", "Custom search filters", "Listing-to-inquiry flow", "Simple agent updates"],
    challenge: "Buyers needed a faster way to filter homes, and agents needed to publish listings without waiting on a developer.",
    theme: "A listing-focused real estate theme with property cards, filters, and inquiry forms.",
    study: "We studied how buyers filter homes, collected neighborhood and property-type keywords, and searched WordPress themes built for listings, maps, and agent inquiry flows.",
    approach: "We customized the selected theme, added property search filters, connected listing details to inquiry forms, and kept the agent dashboard simple to update.",
    outcome: "Visitors can find relevant properties faster, and agents can publish new listings without waiting on a developer.",
  },
  {
    slug: "healthcare-website",
    title: "Healthcare Website",
    type: "Healthcare",
    category: "Healthcare",
    filters: ["WordPress", "UI/UX"],
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1600&q=85",
    tags: ["Appointments", "Optimization"],
    keywords: ["medical clinic WordPress theme", "appointment booking healthcare", "trust-focused medical site"],
    features: ["Clear service pages", "Doctor profiles", "Appointment prompts", "Performance-focused pages"],
    challenge: "Patients needed a calm, trustworthy clinic site that loaded quickly and made booking an appointment obvious.",
    theme: "A calm healthcare theme with clear service pages, doctor profiles, and appointment calls to action.",
    study: "We reviewed patient questions, mapped the appointment journey, and searched healthcare WordPress themes using clinic, booking, and trust-focused keywords to find a layout that felt professional and easy to use.",
    approach: "We customized the chosen theme, simplified service descriptions, added appointment prompts, and optimized page speed so patients could book without friction.",
    outcome: "The clinic site now feels trustworthy, loads quickly, and guides patients toward booking instead of calling around.",
  },
  {
    slug: "restaurant-website",
    title: "Restaurant Website",
    type: "Food & Beverage",
    category: "Redesign",
    filters: ["Redesign", "UI/UX"],
    image: "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1600&q=85",
    tags: ["Reservations", "Custom Design"],
    keywords: ["restaurant reservation WordPress", "food menu theme", "hospitality website redesign"],
    features: ["Scannable visual menu", "Reservation calls to action", "Mobile-first dining story", "Easy daily content updates"],
    challenge: "Guests dropped off on the old menu pages, and the restaurant needed a phone-friendly site they could update with daily specials.",
    theme: "A hospitality theme with a visual menu, reservation block, and mobile-first dining story.",
    study: "We reviewed the old menu pages, noted where guests dropped off, and searched WordPress themes with restaurant, reservation, and food-menu keywords to find a design that looked appetizing on phones.",
    approach: "We rebuilt the site on the selected theme, designed a scannable menu, added reservation calls to action, and kept content easy for the restaurant team to update daily.",
    outcome: "Guests can view the menu and request a table in one visit, and the restaurant can change specials without extra support.",
  },
];

export function getPortfolioProject(slug: string) {
  return portfolioProjects.find((project) => project.slug === slug) ?? null;
}
