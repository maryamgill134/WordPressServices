"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import { servicePillars } from "@/data/services";
import { Logo } from "@/components/logo";

const nav = ["Home", "Services", "Portfolio", "About", "Blog", "Contact"];
const navTarget = (item: string) => (item === "Blog" ? "insights" : item.toLowerCase());

export function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const onServices = pathname.startsWith("/services");
  const root = isHome ? "" : "/";
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesMenuOpen, setServicesMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const servicesMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 16);
      if (!isHome) return;
      const sections = ["home", "portfolio", "insights", "contact"];
      let current = "home";
      for (const id of sections) {
        const section = document.getElementById(id);
        if (section && section.getBoundingClientRect().top <= 120) current = id;
      }
      setActiveSection(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 780) setMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [menuOpen]);

  useEffect(() => {
    const closeOnOutsideClick = (event: PointerEvent) => {
      if (servicesMenuRef.current && !servicesMenuRef.current.contains(event.target as Node)) setServicesMenuOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setServicesMenuOpen(false);
    };
    document.addEventListener("pointerdown", closeOnOutsideClick);
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutsideClick);
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setServicesMenuOpen(false);
  }, [pathname]);

  function closeMenus() {
    setMenuOpen(false);
    setServicesMenuOpen(false);
  }

  return (
    <>
      <a className="skip-link" href={isHome ? "#home" : "/#home"}>Skip to content</a>
      <header className={`header ${scrolled ? "header--scrolled" : ""}`}>
        <div className="container nav-shell">
          <Logo priority onClick={closeMenus} />
          <nav className={`nav ${menuOpen ? "nav--open" : ""}`} aria-label="Primary navigation">
            {nav.map((item) => item === "Services" ? (
              <div
                className="nav-services"
                ref={servicesMenuRef}
                key={item}
                onMouseEnter={() => { if (window.innerWidth > 780) setServicesMenuOpen(true); }}
                onMouseLeave={() => { if (window.innerWidth > 780) setServicesMenuOpen(false); }}
              >
                <div className="nav-service-pair">
                  <Link
                    href="/services"
                    className={`nav-service-trigger ${onServices ? "nav-link--active" : ""}`}
                    aria-current={onServices ? "page" : undefined}
                    onClick={closeMenus}
                  >
                    Services
                  </Link>
                  <button
                    className="nav-service-more"
                    type="button"
                    aria-label="Browse service categories"
                    aria-expanded={servicesMenuOpen}
                    aria-controls="services-mega-menu"
                    onClick={() => setServicesMenuOpen((open) => !open)}
                  >
                    <ChevronDown aria-hidden="true" />
                  </button>
                </div>
                <div
                  className={`service-mega-menu ${servicesMenuOpen ? "service-mega-menu--open" : ""}`}
                  id="services-mega-menu"
                  aria-hidden={!servicesMenuOpen}
                >
                  {servicePillars.map((pillar) => (
                    <div className="service-menu-column" key={pillar.slug}>
                      <h2>{pillar.kicker} — {pillar.title.toUpperCase()}</h2>
                      {pillar.categories.map((category) => (
                        <div className="service-menu-group" key={category.slug}>
                          <Link className="service-menu-cat" href={`/services/${category.slug}`} onClick={closeMenus}>
                            {category.label}
                            {category.isNew && <small>NEW</small>}
                          </Link>
                          {category.services.map((service) => (
                            <Link className="service-menu-item" href={`/services/${category.slug}/${service.slug}`} key={service.slug} onClick={closeMenus}>
                              {service.title}
                              {service.isNew && <small>NEW</small>}
                            </Link>
                          ))}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            ) : item === "About" ? (
              <Link
                key={item}
                href="/about"
                className={pathname === "/about" ? "nav-link--active" : undefined}
                aria-current={pathname === "/about" ? "page" : undefined}
                onClick={closeMenus}
              >
                About
              </Link>
            ) : item === "Home" ? (
              <Link
                key={item}
                href="/"
                className={isHome && activeSection === "home" ? "nav-link--active" : undefined}
                aria-current={isHome && activeSection === "home" ? "page" : undefined}
                onClick={closeMenus}
              >
                Home
              </Link>
            ) : (
              <a
                key={item}
                href={`${root}#${navTarget(item)}`}
                className={isHome && activeSection === navTarget(item) ? "nav-link--active" : undefined}
                aria-current={isHome && activeSection === navTarget(item) ? "page" : undefined}
                onClick={closeMenus}
              >
                {item}
              </a>
            ))}
          </nav>
          <a className="button button--small header-cta" href={`${root}#contact`}>Get a Free Quote</a>
          <button className="menu-button" type="button" aria-label="Toggle navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>
    </>
  );
}
