"use client";

import Link from "next/link";
import { type MouseEvent, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  BadgeCheck,
  Blocks,
  BookOpen,
  Bot,
  Code2,
  FileText,
  Gauge,
  Globe2,
  LayoutTemplate,
  Palette,
  RefreshCw,
  Rocket,
  Search,
  Shield,
  ShoppingCart,
  Smartphone,
  Sparkles,
  Users,
  Waypoints,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import type { ServiceCategory, ServiceItem } from "@/data/services";
import {
  featureTextFor,
  getServiceTechnologies,
  heroHeadlineFor,
  overviewHeadingFor,
  processFor,
  uniqueBenefitIcons,
  uniqueFeatureIcons,
  type DetailIcon,
} from "@/data/service-detail";
import { getServiceDetailImage } from "@/data/service-images";
import { categoryCrumbLabel } from "@/components/inner-page-hero";
import { QuoteLink } from "@/components/quote-link";
import { ServiceMedia } from "@/components/service-detail-media";
import { ServiceTechMark } from "@/components/service-tech-marks";
import { ServiceUiMock } from "@/components/service-ui-mock";

const ease = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.55, ease },
};

const detailIcons: Record<DetailIcon, LucideIcon> = {
  code: Code2,
  gauge: Gauge,
  shield: Shield,
  devices: Smartphone,
  search: Search,
  waypoints: Waypoints,
  bot: Bot,
  palette: Palette,
  wrench: Wrench,
  cart: ShoppingCart,
  book: BookOpen,
  badge: BadgeCheck,
  file: FileText,
  layout: LayoutTemplate,
  users: Users,
  blocks: Blocks,
  sparkles: Sparkles,
  refresh: RefreshCw,
  globe: Globe2,
};

const processIcons: Record<"search" | "file" | "code" | "sparkles", LucideIcon> = {
  search: Search,
  file: FileText,
  code: Code2,
  sparkles: Rocket,
};

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

export function ServiceDetailPage({
  category,
  service,
  children,
}: {
  category: ServiceCategory;
  service: ServiceItem;
  children?: ReactNode;
}) {
  const reduceMotion = useReducedMotion();
  const reveal = reduceMotion ? { initial: false as const } : fadeUp;
  const crumbLabel = categoryCrumbLabel(category.title);
  const categoryCrumb = crumbLabel === service.title ? category.label : crumbLabel;
  const overviewMedia = getServiceDetailImage(service.slug, "overview");
  const benefitsMedia = getServiceDetailImage(service.slug, "benefits");
  const features = service.included.slice(0, 6);
  const featureIcons = uniqueFeatureIcons(features);
  const benefits = service.benefits.slice(0, 4);
  const benefitIcons = uniqueBenefitIcons(benefits);
  const technologies = getServiceTechnologies(category, service);
  const process = processFor(service);

  return (
    <div className={`svc-page svc-detail-page ${category.slug === "automate" ? "svc-page--automate" : ""}`}>
      <section className="svc-detail-hero">
        <div className="container">
          <nav className="inner-hero-crumb" aria-label="Breadcrumb">
            <ol>
              <li><Link href="/">Home</Link><span className="inner-hero-crumb-sep" aria-hidden="true">/</span></li>
              <li><Link href="/services">Services</Link><span className="inner-hero-crumb-sep" aria-hidden="true">/</span></li>
              <li><Link href={`/services/${category.slug}`}>{categoryCrumb}</Link><span className="inner-hero-crumb-sep" aria-hidden="true">/</span></li>
              <li><span aria-current="page">{service.title}</span></li>
            </ol>
          </nav>

          <div className="svc-detail-hero-inner">
            <motion.div
              className="svc-detail-hero-copy"
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease }}
            >
              <p className="inner-hero-label">{category.label}</p>
              <h1>{heroHeadlineFor(service)}</h1>
              <p className="inner-hero-copy">{service.short}</p>
              <div className="inner-hero-actions">
                <QuoteLink className="button">Get Started</QuoteLink>
                <Link className="button button--ghost" href="/portfolio">View Our Work</Link>
              </div>
            </motion.div>

            <motion.div
              className="svc-detail-hero-visual"
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.08, ease }}
            >
              <ServiceUiMock slug={service.slug} categorySlug={category.slug} slot="hero" />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="section svc-detail-overview">
        <div className="container">
          <div className="svc-detail-overview-split">
            <motion.div className="svc-detail-overview-copy" {...reveal}>
              <span className="eyebrow">OVERVIEW</span>
              <h2>{overviewHeadingFor(service)}</h2>
              <p>{service.overview}</p>
            </motion.div>
            <motion.div className="svc-detail-overview-visual" {...reveal}>
              <ServiceMedia
                src={overviewMedia.src}
                alt={overviewMedia.alt}
                slug={service.slug}
                categorySlug={category.slug}
                frame="photo"
                ratio="square"
                sizes="(max-width: 780px) 100vw, 48vw"
              />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="section svc-detail-deliver">
        <div className="container">
          <motion.div className="section-heading" {...reveal}>
            <span>FEATURES</span>
            <h2>What We Deliver</h2>
          </motion.div>
          <div className="svc-detail-features" data-count={features.length}>
            {features.map((item, index) => {
              const Icon = detailIcons[featureIcons[index] ?? "sparkles"];
              return (
                <motion.article
                  className="svc-detail-feature glow-card"
                  key={item}
                  {...reveal}
                  {...pointerGlow(reduceMotion)}
                  whileHover={reduceMotion ? undefined : { y: -6, transition: { duration: 0.22 } }}
                  transition={reduceMotion ? { duration: 0 } : { ...fadeUp.transition, delay: index * 0.05 }}
                >
                  <span><Icon aria-hidden="true" /></span>
                  <h3>{item}</h3>
                  <p>{featureTextFor(item)}</p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section svc-detail-benefits">
        <div className="container">
          <div className="svc-detail-benefits-layout">
            <motion.div className="svc-detail-benefits-visual" {...reveal}>
              <ServiceMedia
                src={benefitsMedia.src}
                alt={benefitsMedia.alt}
                slug={service.slug}
                categorySlug={category.slug}
                frame="photo"
                ratio="portrait"
                sizes="(max-width: 780px) 100vw, 44vw"
              />
            </motion.div>
            <div className="svc-detail-benefits-copy">
              <motion.div className="svc-detail-benefits-heading" {...reveal}>
                <span className="eyebrow">BENEFITS</span>
                <h2>Business Impact</h2>
              </motion.div>
              <div className="svc-detail-benefit-list">
                {benefits.map((item, index) => {
                  const Icon = detailIcons[benefitIcons[index] ?? "sparkles"];
                  return (
                    <motion.article
                      className="svc-detail-benefit"
                      key={item.title}
                      {...reveal}
                      transition={reduceMotion ? { duration: 0 } : { ...fadeUp.transition, delay: index * 0.06 }}
                    >
                      <span><Icon aria-hidden="true" /></span>
                      <div>
                        <h3>{item.title}</h3>
                        <p>{item.text}</p>
                      </div>
                    </motion.article>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section svc-detail-process">
        <div className="container">
          <motion.div className="section-heading" {...reveal}>
            <span>PROCESS</span>
            <h2>Our Process</h2>
          </motion.div>
          <ol className="svc-detail-steps">
            {process.map((step, index) => {
              const Icon = processIcons[step.icon];
              return (
                <motion.li
                  key={step.n}
                  {...reveal}
                  transition={reduceMotion ? { duration: 0 } : { ...fadeUp.transition, delay: index * 0.07 }}
                >
                  <b aria-hidden="true">
                    <Icon />
                    <em>{step.n}</em>
                  </b>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </motion.li>
              );
            })}
          </ol>
        </div>
      </section>

      {technologies.length > 0 && (
        <section className="section svc-detail-stack">
          <div className="container">
            <motion.div className="section-heading" {...reveal}>
              <span>TOOLS</span>
              <h2>Technologies we work with</h2>
            </motion.div>
            <ul className="svc-detail-tech">
              {technologies.map((item) => (
                <li key={item}>
                  <ServiceTechMark name={item} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {children}
    </div>
  );
}
