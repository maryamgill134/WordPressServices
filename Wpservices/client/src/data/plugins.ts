export const pluginCategories = [
  "All",
  "Sales & B2B",
  "Catalog",
  "Conversion",
  "Ops",
  "Checkout",
  "Subscriptions",
  "Social Proof",
] as const;

export type PluginCategory = (typeof pluginCategories)[number];

export type WooPlugin = {
  name: string;
  category: Exclude<PluginCategory, "All">;
  badge?: string;
  description: string;
  overview?: string;
  features: string[];
  price: string;
  image: string;
  href: string;
  featured?: boolean;
};

const WOO_DEV = "/services/setup/woocommerce-development";

export const wooPlugins: WooPlugin[] = [
  {
    name: "QuoteLane Pro",
    category: "Sales & B2B",
    description: "Product Enquiry Forms",
    features: ["Product enquiry forms", "WhatsApp quick replies"],
    price: "$79",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1400&q=85",
    href: WOO_DEV,
    featured: true,
  },
  {
    name: "TierPrice Matrix",
    category: "Sales & B2B",
    description: "Role & User Pricing",
    features: ["Role and user pricing", "Tiered bulk discounts"],
    price: "$99",
    image: "https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=1400&q=85",
    href: WOO_DEV,
    featured: true,
  },
  {
    name: "CatalogGlow",
    category: "Catalog",
    description: "Wholesale Catalogs",
    features: ["Role-based pricing", "Catalog access controls"],
    price: "$69",
    image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&w=1400&q=85",
    href: WOO_DEV,
    featured: true,
  },
  {
    name: "BundleForge",
    category: "Sales & B2B",
    description: "Mix-and-Match Bundles",
    features: ["Mix-and-match builder", "Fixed or dynamic pricing"],
    price: "$89",
    image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=1400&q=85",
    href: WOO_DEV,
    featured: true,
  },
  {
    name: "RelateLane",
    category: "Catalog",
    description: "Smarter Related Products",
    features: ["Rule-based related products", "Manual merchandising lists"],
    price: "$59",
    image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=1400&q=85",
    href: WOO_DEV,
    featured: true,
  },
  {
    name: "KitLane",
    category: "Catalog",
    description: "Inventory-Honest Kits",
    features: ["Parent kit products", "Component stock deduction"],
    price: "$79",
    image: "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&w=1400&q=85",
    href: WOO_DEV,
    featured: true,
  },
  {
    name: "UrgencyKit Pack",
    category: "Conversion",
    description: "Conversion Helpers",
    features: ["Countdown timers", "Discount prompts"],
    price: "$69",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1400&q=85",
    href: WOO_DEV,
    featured: true,
  },
  {
    name: "StickyLane ATC",
    category: "Conversion",
    description: "Sticky Add to Cart",
    features: ["Sticky ATC bar", "Variant summary"],
    price: "$49",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1400&q=85",
    href: WOO_DEV,
    featured: true,
  },
  {
    name: "StockdenPro",
    category: "Ops",
    badge: "Inventory",
    description: "Inventory Threshold Alerts",
    overview: "Catch low stock before it becomes a stockout",
    features: ["Low stock email alerts", "Slack notifications"],
    price: "$59",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1400&q=85",
    href: "/products/stockdenpro",
  },
  {
    name: "StockMap",
    category: "Ops",
    badge: "Ops & Inventory",
    description: "Multi-Location Stock View",
    overview: "See where WooCommerce stock actually sits across locations",
    features: ["Location stock fields", "Admin location views"],
    price: "$89",
    image: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1400&q=85",
    href: "/products/stockmap",
  },
  {
    name: "RestockPulse",
    category: "Ops",
    badge: "Ops & Inventory",
    description: "Restock Planning Digests",
    overview: "Weekly restock digests before campaigns force panic buys",
    features: ["Weekly restock digests", "Campaign prep lists"],
    price: "$65",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=85",
    href: "/products/restockpulse",
  },
  {
    name: "Subscrivo",
    category: "Subscriptions",
    description: "Subscription Billing",
    overview: "Recurring WooCommerce billing without clutter",
    features: ["Flexible intervals", "Trials and fees"],
    price: "$129",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1400&q=85",
    href: "/products/subscripto",
  },
  {
    name: "CycleFlex",
    category: "Subscriptions",
    description: "Pause & Skip Controls",
    overview: "Pause, skip, and resume without opening a support ticket",
    features: ["Pause and resume", "Skip next delivery"],
    price: "$79",
    image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=1400&q=85",
    href: "/products/cycle-flex",
  },
  {
    name: "TierAccess",
    category: "Subscriptions",
    description: "Membership Tier Access",
    overview: "Map membership tiers to catalog and content after purchase",
    features: ["Membership tiers", "Product and content gates"],
    price: "$99",
    image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1400&q=85",
    href: "/products/tier-access",
  },
  {
    name: "Prooflane Reviews",
    category: "Social Proof",
    description: "Post-Purchase Reviews",
    overview: "Collect product feedback buyers trust",
    features: ["Automated review requests", "Photo uploads"],
    price: "$49",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1400&q=85",
    href: "/products/review-boost",
  },
  {
    name: "LaneCheckout",
    category: "Checkout",
    description: "One-Page Checkout",
    overview: "Fewer steps between cart and paid order",
    features: ["One-page checkout", "Address helpers"],
    price: "$89",
    image: "https://images.unsplash.com/photo-1556742111-a301076d9d18?auto=format&fit=crop&w=1400&q=85",
    href: "/products/checkout-flow",
  },
  {
    name: "SealStrip",
    category: "Checkout",
    description: "Trust Seal Strip",
    overview: "Place guarantee and shipping trust cues where decisions happen",
    features: ["Product and cart seal strips", "Custom seal icons and copy"],
    price: "$39",
    image: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&w=1400&q=85",
    href: "/products/seal-strip",
  },
];

export const HOME_PLUGIN_LIMIT = 8;

export function getHomePlugins() {
  return wooPlugins.filter((plugin) => plugin.featured).slice(0, HOME_PLUGIN_LIMIT);
}

export function getProductPlugins() {
  return wooPlugins.filter((plugin) => plugin.href.startsWith("/products/"));
}

export function getPluginBySlug(slug: string) {
  return wooPlugins.find((plugin) => plugin.href === `/products/${slug}`) ?? null;
}
