export type InsightSection = {
  heading: string;
  paragraphs?: string[];
  items?: string[];
};

export type Insight = {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  image: string;
  imageAlt: string;
  publishedAt: string;
  author: string;
  authorRole?: string;
  quote?: string;
  sections: InsightSection[];
};

export const insights: Insight[] = [
  {
    slug: "how-to-make-wordpress-faster-without-breaking-your-site",
    category: "Performance",
    title: "How to Make WordPress Faster Without Breaking Your Site",
    excerpt: "A practical Core Web Vitals checklist for faster pages and stronger conversions.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=85",
    imageAlt: "Analytics dashboard showing website performance metrics",
    publishedAt: "2026-03-12",
    author: "WPServices",
    authorRole: "WordPress studio",
    quote: "Speed work should protect conversions, not just improve a lab score.",
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
    slug: "the-wordpress-security-checklist-every-business-needs",
    category: "Security",
    title: "The WordPress Security Checklist Every Business Needs",
    excerpt: "Reduce risk with sensible hardening, monitoring, backups, and access controls.",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=1600&q=85",
    imageAlt: "Padlock on a laptop representing website security",
    publishedAt: "2026-04-04",
    author: "WPServices",
    authorRole: "WordPress studio",
    quote: "Security is a process, not a one-time plugin install.",
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
    slug: "seven-ways-to-improve-your-stores-conversion-rate",
    category: "WooCommerce",
    title: "Seven Ways to Improve Your Store’s Conversion Rate",
    excerpt: "Remove buying friction and create a checkout experience customers trust.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1600&q=85",
    imageAlt: "Customer completing a purchase at a store checkout",
    publishedAt: "2026-05-18",
    author: "WPServices",
    authorRole: "WordPress studio",
    quote: "Conversion work is mostly about removing doubt.",
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

export function getInsight(slug: string) {
  return insights.find((article) => article.slug === slug);
}

export function getRelatedInsights(slug: string) {
  return insights.filter((article) => article.slug !== slug);
}

export function insightHref(slug: string) {
  return `/blog/${slug}`;
}

export function formatInsightDate(iso: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${iso}T12:00:00.000Z`));
}
