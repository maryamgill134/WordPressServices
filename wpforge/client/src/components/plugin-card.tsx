"use client";

import { type MouseEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { Check } from "lucide-react";
import type { WooPlugin } from "@/data/plugins";

function pointerGlow(reduceMotion: boolean | null) {
  if (reduceMotion) return {};
  return {
    onMouseMove: (event: MouseEvent<HTMLElement>) => {
      const el = event.currentTarget;
      const rect = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${event.clientX - rect.left}px`);
      el.style.setProperty("--my", `${event.clientY - rect.top}px`);
    },
  };
}

export function PluginCard({ plugin, reduceMotion }: { plugin: WooPlugin; reduceMotion: boolean | null }) {
  return (
    <Link className="plugin-card glow-card" href={plugin.href} {...pointerGlow(reduceMotion)}>
      <div className="plugin-card-image">
        <Image src={plugin.image} alt={`${plugin.name} WooCommerce extension`} fill sizes="(max-width: 540px) 100vw, (max-width: 1100px) 50vw, 25vw" />
      </div>
      <div className="plugin-card-body">
        <span>{plugin.badge ?? plugin.category}</span>
        <h3>{plugin.name}</h3>
        <p>{plugin.description}</p>
        <ul>
          {plugin.features.map((feature) => (
            <li key={feature}><span className="plugin-check"><Check /></span>{feature}</li>
          ))}
        </ul>
        <div className="plugin-card-meta">
          <small>WooCommerce Extension</small>
          <strong>{plugin.price}</strong>
        </div>
        <em className="plugin-card-cta">View Details</em>
      </div>
    </Link>
  );
}
