"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import { servicePillars } from "@/data/services";
import { Logo } from "@/components/logo";
import { QuoteLink } from "@/components/quote-link";

const nav = ["Home", "Services", "Portfolio", "About", "Blog", "Contact"];
const navTarget = (item: string) => (item === "Blog" ? "insights" : item.toLowerCase());

export function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const onServices = pathname.startsWith("/services");
  const onContact = pathname === "/contact";
  const root = isHome ? "" : "/";
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesMenuOpen, setServicesMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const servicesMenuRef = useRef<HTMLDivElement>(null);
  const servicesCloseTimer = useRef<number | null>(null);

  function isDesktopNav() {
    return window.innerWidth > 780;
  }

  function clearServicesCloseTimer() {
    if (servicesCloseTimer.current) {
      window.clearTimeout(servicesCloseTimer.current);
      servicesCloseTimer.current = null;
    }
  }

  function openServicesMenu() {
    clearServicesCloseTimer();
    setServicesMenuOpen(true);
  }

  function closeServicesMenu() {
    clearServicesCloseTimer();
    setServicesMenuOpen(false);
  }

  function onServicesPointerEnter() {
    if (isDesktopNav()) openServicesMenu();
  }

  function onServicesPointerLeave() {
    if (!isDesktopNav()) return;
    servicesCloseTimer.current = window.setTimeout(() => {
      setServicesMenuOpen(false);
      servicesCloseTimer.current = null;
    }, 120);
  }

  function onServicesTriggerClick() {
    if (isDesktopNav()) {
      openServicesMenu();
      return;
    }
    setServicesMenuOpen((open) => !open);
  }

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 16);
      if (!isHome) return;
      const sections = ["home", "portfolio", "insights"];
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
      if (servicesMenuRef.current && !servicesMenuRef.current.contains(event.target as Node)) closeServicesMenu();
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeServicesMenu();
    };
    document.addEventListener("pointerdown", closeOnOutsideClick);
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutsideClick);
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  useEffect(() => () => clearServicesCloseTimer(), []);

  useEffect(() => {
    setMenuOpen(false);
    closeServicesMenu();
  }, [pathname]);

  function closeMenus() {
    setMenuOpen(false);
    closeServicesMenu();
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
                className={`nav-services ${servicesMenuOpen ? "nav-services--open" : ""}`}
                ref={servicesMenuRef}
                key={item}
                onPointerEnter={onServicesPointerEnter}
                onPointerLeave={onServicesPointerLeave}
              >
                <button
                  type="button"
                  className={`nav-service-trigger ${onServices ? "nav-link--active" : ""}`}
                  aria-expanded={servicesMenuOpen}
                  aria-controls="services-mega-menu"
                  aria-haspopup="true"
                  onClick={onServicesTriggerClick}
                >
                  Services
                  <ChevronDown aria-hidden="true" />
                </button>
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
            ) : item === "Contact" ? (
              <Link
                key={item}
                href="/contact"
                className={onContact ? "nav-link--active" : undefined}
                aria-current={onContact ? "page" : undefined}
                onClick={closeMenus}
              >
                Contact
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
          <QuoteLink className="button button--small header-cta" onClick={closeMenus}>Get a Free Quote</QuoteLink>
          <button className="menu-button" type="button" aria-label="Toggle navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>
    </>
  );
}
