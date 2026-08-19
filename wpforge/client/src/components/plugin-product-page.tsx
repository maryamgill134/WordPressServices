"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import type { WooPlugin } from "@/data/plugins";

export function PluginProductPage({ plugin }: { plugin: WooPlugin }) {
  const summary = plugin.overview ?? plugin.description;

  return (
    <div className="svc-page">
      <section className="svc-hero">
        <div className="svc-hero-bg" aria-hidden="true" />
        <div className="container svc-hero-inner">
          <div className="svc-hero-copy">
            <p className="svc-crumb">
              <Link href="/">Home</Link>
              <span>/</span>
              <Link href="/products">WooCommerce Plugins</Link>
              <span>/</span>
              <span>{plugin.name}</span>
            </p>
            <span className="eyebrow">{plugin.badge ?? plugin.category}</span>
            <h1>{plugin.name}</h1>
            <p>{summary}</p>
            <div className="hero-actions">
              <a className="button" href="/contact">
                Request this extension <ArrowRight />
              </a>
              <Link className="button button--ghost" href="/products">
                All plugins <ArrowRight />
              </Link>
            </div>
          </div>
          <div className="svc-hero-visual">
            <div className="plugin-product-visual">
              <Image src={plugin.image} alt={plugin.name} fill sizes="(max-width: 780px) 92vw, 420px" />
            </div>
          </div>
        </div>
      </section>

      <section className="section svc-grid-section">
        <div className="container">
          <div className="svc-split">
            <div>
              <span className="eyebrow">OVERVIEW</span>
              <h2>{plugin.description}</h2>
              <p>{summary}</p>
              <ul className="svc-points">
                {plugin.features.map((feature) => (
                  <li key={feature}><span className="pricing-check"><Check /></span>{feature}</li>
                ))}
              </ul>
            </div>
            <article className="svc-card plugin-product-buy">
              <small>WooCommerce Extension</small>
              <strong>{plugin.price}</strong>
              <p>Licensed for a single WooCommerce store, with setup guidance from our team.</p>
              <a className="button" href="/contact">
                Get {plugin.name} <ArrowRight />
              </a>
            </article>
          </div>
        </div>
      </section>
    </div>
  );
}
