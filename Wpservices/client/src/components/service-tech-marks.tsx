import type { ReactNode } from "react";

type TechMarkProps = {
  name: string;
};

function Mark({ children, label }: { children: ReactNode; label: string }) {
  return (
    <span className="svc-detail-tech-mark" aria-hidden="true" title={label}>
      {children}
    </span>
  );
}

export function ServiceTechMark({ name }: TechMarkProps) {
  const key = name.toLowerCase();

  if (key.includes("wordpress")) {
    return (
      <Mark label="WordPress">
        <svg viewBox="0 0 32 32" fill="none">
          <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="1.75" />
          <path d="M9.2 22.4 16 9.8l6.8 12.6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12.2 16.8h7.6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
        </svg>
      </Mark>
    );
  }

  if (key.includes("woocommerce")) {
    return (
      <Mark label="WooCommerce">
        <svg viewBox="0 0 32 32" fill="none">
          <rect x="6" y="9" width="20" height="15" rx="3" stroke="currentColor" strokeWidth="1.75" />
          <path d="M10 9V8.2A6 6 0 0 1 22 8.2V9" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
          <circle cx="12.5" cy="20.5" r="1.2" fill="currentColor" />
          <circle cx="19.5" cy="20.5" r="1.2" fill="currentColor" />
        </svg>
      </Mark>
    );
  }

  if (key.includes("elementor")) {
    return (
      <Mark label="Elementor">
        <svg viewBox="0 0 32 32" fill="none">
          <rect x="7" y="7" width="18" height="18" rx="4" stroke="currentColor" strokeWidth="1.75" />
          <path d="M12 12h8M12 16h8M12 20h5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
        </svg>
      </Mark>
    );
  }

  if (key.includes("learndash")) {
    return (
      <Mark label="LearnDash">
        <svg viewBox="0 0 32 32" fill="none">
          <path d="M7 11.5 16 8l9 3.5v9.2c0 2.4-3.8 4.6-9 5.8-5.2-1.2-9-3.4-9-5.8V11.5Z" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round" />
          <path d="M16 12v11" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
        </svg>
      </Mark>
    );
  }

  if (key === "php") {
    return (
      <Mark label="PHP">
        <svg viewBox="0 0 32 32" fill="none">
          <rect x="4" y="10" width="24" height="12" rx="6" stroke="currentColor" strokeWidth="1.75" />
          <path d="M10 16h3.2M11.6 13.4v5.2M16.2 18.2V13.8h2.2a1.8 1.8 0 0 1 0 3.6h-2.2M22.2 13.8H25a1.6 1.6 0 0 1 0 3.2h-1.6V18.2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Mark>
    );
  }

  if (key.includes("javascript")) {
    return (
      <Mark label="JavaScript">
        <svg viewBox="0 0 32 32" fill="none">
          <rect x="7" y="7" width="18" height="18" rx="4" stroke="currentColor" strokeWidth="1.75" />
          <path d="M14 13.5v6.2c0 1.4-.7 2.1-2.1 2.1M18 15.2c.6-.6 1.5-.9 2.4-.8 1.2.1 2 .8 2 2 0 2.2-4.4 1.7-4.4 3.8 0 .8.7 1.4 2 1.4 1.1 0 1.9-.4 2.4-1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </Mark>
    );
  }

  if (key.includes("seo")) {
    return (
      <Mark label="SEO">
        <svg viewBox="0 0 32 32" fill="none">
          <circle cx="14" cy="14" r="6.5" stroke="currentColor" strokeWidth="1.75" />
          <path d="m18.8 18.8 5.4 5.4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
        </svg>
      </Mark>
    );
  }

  if (key.includes("ai") || key.includes("automat")) {
    return (
      <Mark label="AI Automation">
        <svg viewBox="0 0 32 32" fill="none">
          <rect x="9" y="11" width="14" height="12" rx="3" stroke="currentColor" strokeWidth="1.75" />
          <path d="M16 8v3M12.5 17h7M12.5 20h4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
          <circle cx="13.2" cy="8.2" r="1.1" fill="currentColor" />
          <circle cx="18.8" cy="8.2" r="1.1" fill="currentColor" />
        </svg>
      </Mark>
    );
  }

  if (key.includes("api") || key.includes("rest")) {
    return (
      <Mark label="API">
        <svg viewBox="0 0 32 32" fill="none">
          <path d="M9 16h14M12 12l-4 4 4 4M20 12l4 4-4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Mark>
    );
  }

  return (
    <Mark label={name}>
      <svg viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="10" stroke="currentColor" strokeWidth="1.75" />
        <path d="M16 11v10M11 16h10" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      </svg>
    </Mark>
  );
}
