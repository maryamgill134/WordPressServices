"use client";

import Image from "next/image";
import type { ServiceMediaFrame } from "@/data/service-detail";
import { browserUrlFor, chromeLabelFor } from "@/data/service-detail";

export function ServiceMedia({
  src,
  alt,
  slug,
  categorySlug: _categorySlug = "",
  frame,
  ratio = "landscape",
  sizes,
  priority = false,
  caption,
}: {
  src: string;
  alt: string;
  slug: string;
  categorySlug?: string;
  frame: ServiceMediaFrame;
  ratio?: "landscape" | "portrait" | "wide" | "square";
  sizes: string;
  priority?: boolean;
  caption?: string;
}) {
  const shot = (
    <div className={`svc-detail-shot svc-detail-shot--${ratio}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        style={{ objectFit: "cover", objectPosition: "center" }}
      />
    </div>
  );

  const media = (() => {
    if (frame === "photo") {
      return <div className="svc-detail-media svc-detail-photo">{shot}</div>;
    }

    if (frame === "dashboard") {
      return (
        <div className="svc-detail-media svc-detail-dash">
          <div className="svc-detail-chrome">
            <span className="svc-detail-dots" aria-hidden="true"><i /><i /><i /></span>
            <span className="svc-detail-url">{chromeLabelFor(slug, "dashboard")}</span>
          </div>
          <div className="svc-detail-dash-body">
            <aside className="svc-detail-dash-rail" aria-hidden="true">
              <i /><i /><i /><i />
            </aside>
            {shot}
          </div>
        </div>
      );
    }

    if (frame === "editor") {
      return (
        <div className="svc-detail-media svc-detail-editor">
          <div className="svc-detail-chrome">
            <span className="svc-detail-dots" aria-hidden="true"><i /><i /><i /></span>
            <span className="svc-detail-url">{chromeLabelFor(slug, "editor")}</span>
          </div>
          <div className="svc-detail-editor-body">
            <aside className="svc-detail-editor-rail" aria-hidden="true">
              <i /><i /><i /><i /><i />
            </aside>
            <div className="svc-detail-editor-main">
              <div className="svc-detail-editor-toolbar" aria-hidden="true">
                <span /><span /><span />
              </div>
              {shot}
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="svc-detail-media svc-detail-browser">
        <div className="svc-detail-chrome">
          <span className="svc-detail-dots" aria-hidden="true"><i /><i /><i /></span>
          <span className="svc-detail-url">{browserUrlFor(slug)}</span>
        </div>
        {shot}
      </div>
    );
  })();

  if (!caption) return media;

  return (
    <figure className="svc-detail-media-figure">
      {media}
      <figcaption>{caption}</figcaption>
    </figure>
  );
}
