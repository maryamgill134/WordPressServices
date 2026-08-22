"use client";

import Image from "next/image";
import { CheckMark } from "@/components/check-mark";
import type { WooPlugin } from "@/data/plugins";
import { InnerPageHero } from "@/components/inner-page-hero";

export function PluginProductPage({ plugin }: { plugin: WooPlugin }) {
  const summary = plugin.overview ?? plugin.description;

  return (
    <div className="svc-page">
      <InnerPageHero
        crumbs={[
          { label: "Home", href: "/" },
          { label: "WooCommerce Plugins", href: "/products" },
          { label: plugin.name },
        ]}
        label={plugin.badge ?? plugin.category}
        title={plugin.name}
        description={summary}
      />

      <section className="section svc-grid-section">
        <div className="container">
          <div className="svc-split">
            <div>
              <span className="eyebrow">OVERVIEW</span>
              <h2>{plugin.description}</h2>
              <p>{summary}</p>
              <ul className="svc-points">
                {plugin.features.map((feature) => (
                  <li key={feature}><CheckMark size="compact" /><span>{feature}</span></li>
                ))}
              </ul>
            </div>
            <article className="svc-card plugin-product-buy">
              <div className="plugin-product-visual">
                <Image src={plugin.image} alt={plugin.name} fill sizes="(max-width: 780px) 92vw, 420px" />
              </div>
              <small>WooCommerce Extension</small>
              <strong>{plugin.price}</strong>
              <p>Licensed for a single WooCommerce store, with setup guidance from our team.</p>
              <a className="button" href="/contact">Get {plugin.name}</a>
            </article>
          </div>
        </div>
      </section>
    </div>
  );
}
