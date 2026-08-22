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
  imageAlt: string;
  href: string;
  featured?: boolean;
};

const unsplash = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fm=jpg&fit=crop&w=1400&h=880&q=85`;

const WOO_DEV = "/services/setup/woocommerce-development";

export const wooPlugins: WooPlugin[] = [
  {
    name: "QuoteLane Pro",
    category: "Sales & B2B",
    description: "Product Enquiry Forms",
    features: ["Product enquiry forms", "WhatsApp quick replies"],
    price: "$79",
    image: unsplash("1434030216411-0b793f4b4173"),
    imageAlt: "Customer filling out a product enquiry form on paper",
    href: WOO_DEV,
    featured: true,
  },
  {
    name: "TierPrice Matrix",
    category: "Sales & B2B",
    description: "Role & User Pricing",
    features: ["Role and user pricing", "Tiered bulk discounts"],
    price: "$99",
    image: unsplash("1554224154-26032ffc0d07"),
    imageAlt: "Calculator and notes for role-based and tiered store pricing",
    href: WOO_DEV,
    featured: true,
  },
  {
    name: "CatalogGlow",
    category: "Catalog",
    description: "Wholesale Catalogs",
    features: ["Role-based pricing", "Catalog access controls"],
    price: "$69",
    image: unsplash("1441986300917-64674bd600d8"),
    imageAlt: "Wholesale clothing catalog displays in a showroom",
    href: WOO_DEV,
    featured: true,
  },
  {
    name: "BundleForge",
    category: "Sales & B2B",
    description: "Mix-and-Match Bundles",
    features: ["Mix-and-match builder", "Fixed or dynamic pricing"],
    price: "$89",
    image: unsplash("1549465220-1a8b9238cd48"),
    imageAlt: "Gift box representing a mix-and-match product bundle",
    href: WOO_DEV,
    featured: true,
  },
  {
    name: "RelateLane",
    category: "Catalog",
    description: "Smarter Related Products",
    features: ["Rule-based related products", "Manual merchandising lists"],
    price: "$59",
    image: unsplash("1562157873-818bc0726f68"),
    imageAlt: "Folded shirts merchandised together as related products",
    href: WOO_DEV,
    featured: true,
  },
  {
    name: "KitLane",
    category: "Catalog",
    description: "Inventory-Honest Kits",
    features: ["Parent kit products", "Component stock deduction"],
    price: "$79",
    image: unsplash("1513885535751-8b9238bd345a"),
    imageAlt: "Wrapped product kits ready to sell as parent kit items",
    href: WOO_DEV,
    featured: true,
  },
  {
    name: "UrgencyKit Pack",
    category: "Conversion",
    description: "Conversion Helpers",
    features: ["Countdown timers", "Discount prompts"],
    price: "$69",
    image: unsplash("1607082349566-187342175e2f"),
    imageAlt: "SALE tags and discount prompts used to create purchase urgency",
    href: WOO_DEV,
    featured: true,
  },
  {
    name: "StickyLane ATC",
    category: "Conversion",
    description: "Sticky Add to Cart",
    features: ["Sticky ATC bar", "Variant summary"],
    price: "$49",
    image: unsplash("1563013544-824ae1b704d3"),
    imageAlt: "Shopper completing a purchase with a card at a laptop checkout",
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
    image: unsplash("1586528116311-ad8dd3c8310d"),
    imageAlt: "Warehouse inventory aisles used for low-stock threshold alerts",
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
    image: unsplash("1578575437130-527eed3abbec"),
    imageAlt: "Container shipments moving stock between warehouse locations",
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
    image: unsplash("1454165804606-c3d57bc86b40"),
    imageAlt: "Laptop and planning notes for weekly restock digests",
    href: "/products/restockpulse",
  },
  {
    name: "Subscrivo",
    category: "Subscriptions",
    description: "Subscription Billing",
    overview: "Recurring WooCommerce billing without clutter",
    features: ["Flexible intervals", "Trials and fees"],
    price: "$129",
    image: unsplash("1554224155-6726b3ff858f"),
    imageAlt: "Invoices and billing paperwork for recurring subscription charges",
    href: "/products/subscripto",
  },
  {
    name: "CycleFlex",
    category: "Subscriptions",
    description: "Pause & Skip Controls",
    overview: "Pause, skip, and resume without opening a support ticket",
    features: ["Pause and resume", "Skip next delivery"],
    price: "$79",
    image: unsplash("1506784983877-45594efa4cbe"),
    imageAlt: "Calendar used to pause or skip the next subscription delivery",
    href: "/products/cycle-flex",
  },
  {
    name: "TierAccess",
    category: "Subscriptions",
    description: "Membership Tier Access",
    overview: "Map membership tiers to catalog and content after purchase",
    features: ["Membership tiers", "Product and content gates"],
    price: "$99",
    image: unsplash("1589758438368-0ad531db3366"),
    imageAlt: "Membership cards representing different catalog and content access tiers",
    href: "/products/tier-access",
  },
  {
    name: "Prooflane Reviews",
    category: "Social Proof",
    description: "Post-Purchase Reviews",
    overview: "Collect product feedback buyers trust",
    features: ["Automated review requests", "Photo uploads"],
    price: "$49",
    image: unsplash("1633613286991-611fe299c4be"),
    imageAlt: "Five-star rating representing post-purchase product reviews",
    href: "/products/review-boost",
  },
  {
    name: "LaneCheckout",
    category: "Checkout",
    description: "One-Page Checkout",
    overview: "Fewer steps between cart and paid order",
    features: ["One-page checkout", "Address helpers"],
    price: "$89",
    image: "/services/hire-woocommerce-developers.jpg",
    imageAlt: "One-page point-of-sale checkout totaling an order",
    href: "/products/checkout-flow",
  },
  {
    name: "SealStrip",
    category: "Checkout",
    description: "Trust Seal Strip",
    overview: "Place guarantee and shipping trust cues where decisions happen",
    features: ["Product and cart seal strips", "Custom seal icons and copy"],
    price: "$39",
    image: unsplash("1614064641938-3bbee52942c7"),
    imageAlt: "Padlock representing checkout trust seals and purchase guarantees",
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
