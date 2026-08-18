import { Mail } from "lucide-react";
import { Logo } from "@/components/logo";

export function SiteFooter() {
  return (
    <footer>
      <div className="container footer-inner">
        <div className="footer-top">
          <div className="footer-brand">
            <Logo />
            <p>WPServices is a WordPress development studio focused on custom themes, WooCommerce, plugins, migrations, and ongoing care for teams that need reliable delivery.</p>
            <p className="footer-note">Remote-first delivery across multiple time zones.</p>
            <a className="footer-email" href="mailto:info@technologiallc.com"><Mail aria-hidden="true" /> info@technologiallc.com</a>
            <div className="footer-social">
              <a href="#" aria-label="Facebook">f</a>
              <a href="#" aria-label="LinkedIn">in</a>
              <a href="#" aria-label="Instagram">◎</a>
              <a href="#" aria-label="YouTube">▶</a>
            </div>
          </div>
          <div className="footer-links">
            <div>
              <h3>Our Services</h3>
              <a href="/services/setup">Website Development</a>
              <a href="/services/redesign">Website Revamp</a>
              <a href="/services/speed">Performance Optimization</a>
              <a href="/services/maintain">Maintenance &amp; Care</a>
              <a href="/services/automate">AI Automations</a>
              <a href="/services/seo">WordPress SEO</a>
            </div>
            <div>
              <h3>Studio</h3>
              <a href="/#contact">Hire Us</a>
              <a href="/about">About Us</a>
              <a href="/#portfolio">Portfolio</a>
              <a href="/#process">Our Process</a>
              <a href="/#pricing">Pricing</a>
              <a href="/#faq">FAQs</a>
            </div>
            <div>
              <h3>Resources</h3>
              <a href="/#insights">Blog</a>
              <a href="/#portfolio">Case Studies</a>
              <a href="/services">All Services</a>
              <a href="/#contact">WooCommerce Plugins</a>
              <a href="/services/retainers">Retainers</a>
            </div>
          </div>
        </div>
        <div className="footer-offices">
          <article>
            <span>UAE</span>
            <p>Sahara Health Care City, Regus 524, Dubai</p>
            <a href="tel:+971585847929">00971585847929</a>
          </article>
          <article>
            <span>Pakistan</span>
            <p>Gujranwala, Punjab</p>
            <a href="tel:+923042336926">03042336926</a>
          </article>
          <article>
            <span>USA</span>
            <p>New York, NY 10001</p>
            <a href="tel:+15551234567">+1 (555) 123-4567</a>
          </article>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} WPServices. All Rights Reserved.</span>
          <div><a href="#">Privacy Policy</a><a href="#">Terms & Conditions</a></div>
        </div>
      </div>
    </footer>
  );
}
