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
              <a href="https://www.facebook.com/technologiallc/" target="_blank" rel="noopener noreferrer" aria-label="Visit Technology LLC on Facebook">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path fill="currentColor" d="M14.2 8.7h2.3l.4-2.8h-2.7V4.6c0-.8.2-1.3 1.4-1.3h1.4V.8A18.6 18.6 0 0 0 14.7.5C12.2.5 10.5 2 10.5 4.8v1.1H8.2v2.8h2.3V20h3.1V8.7h.6Z" />
                </svg>
              </a>
              <a href="https://www.linkedin.com/company/technologiallc/posts/?feedView=all" target="_blank" rel="noopener noreferrer" aria-label="Visit Technology LLC on LinkedIn">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path fill="currentColor" d="M5.7 8.6H8.8V21H5.7V8.6ZM7.25 3.4a1.85 1.85 0 1 1 0 3.7 1.85 1.85 0 0 1 0-3.7ZM10.7 8.6h3v1.7h.04c.42-.8 1.45-1.64 2.98-1.64 3.19 0 3.78 2.1 3.78 4.83V21h-3.1v-5.5c0-1.31-.02-3-1.83-3-1.83 0-2.11 1.43-2.11 2.9V21H10.7V8.6Z" />
                </svg>
              </a>
              <a href="https://www.instagram.com/technologiallc/" target="_blank" rel="noopener noreferrer" aria-label="Visit Technology LLC on Instagram">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path fill="currentColor" d="M12 7.2A4.8 4.8 0 1 0 12 16.8 4.8 4.8 0 0 0 12 7.2Zm0 7.92A3.12 3.12 0 1 1 12 8.88a3.12 3.12 0 0 1 0 6.24ZM17.54 6.9a1.12 1.12 0 1 1-2.24 0 1.12 1.12 0 0 1 2.24 0ZM12 4.5c-2.04 0-2.3.01-3.1.05-.79.04-1.33.16-1.8.35a3.64 3.64 0 0 0-1.32.86 3.64 3.64 0 0 0-.86 1.32c-.19.47-.31 1.01-.35 1.8-.04.8-.05 1.06-.05 3.1s.01 2.3.05 3.1c.04.79.16 1.33.35 1.8.19.5.45.9.86 1.32.42.41.82.67 1.32.86.47.19 1.01.31 1.8.35.8.04 1.06.05 3.1.05s2.3-.01 3.1-.05c.79-.04 1.33-.16 1.8-.35a3.64 3.64 0 0 0 1.32-.86 3.64 3.64 0 0 0 .86-1.32c.19-.47.31-1.01.35-1.8.04-.8.05-1.06.05-3.1s-.01-2.3-.05-3.1c-.04-.79-.16-1.33-.35-1.8a3.64 3.64 0 0 0-.86-1.32 3.64 3.64 0 0 0-1.32-.86c-.47-.19-1.01-.31-1.8-.35-.8-.04-1.06-.05-3.1-.05Zm0 1.35c2 0 2.24.01 3.03.04.73.03 1.12.15 1.39.26.35.14.6.3.86.56.26.26.42.51.56.86.1.27.23.66.26 1.39.03.79.04 1.02.04 3.03s-.01 2.24-.04 3.03c-.03.73-.16 1.12-.26 1.39a2.32 2.32 0 0 1-.56.86 2.32 2.32 0 0 1-.86.56c-.27.1-.66.23-1.39.26-.79.03-1.03.04-3.03.04s-2.24-.01-3.03-.04c-.73-.03-1.12-.16-1.39-.26a2.32 2.32 0 0 1-.86-.56 2.32 2.32 0 0 1-.56-.86c-.1-.27-.23-.66-.26-1.39-.03-.79-.04-1.03-.04-3.03s.01-2.24.04-3.03c.03-.73.16-1.12.26-1.39.14-.35.3-.6.56-.86.26-.26.51-.42.86-.56.27-.1.66-.23 1.39-.26.79-.03 1.03-.04 3.03-.04Z" />
                </svg>
              </a>
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
              <a href="https://zainsaeed.com/services/">Website Design Services</a>
            </div>
            <div>
              <h3>Studio</h3>
              <a href="/contact">Hire Us</a>
              <a href="/about">About Us</a>
              <a href="/portfolio">Portfolio</a>
              <a href="/#process">Our Process</a>
              <a href="/#pricing">Pricing</a>
              <a href="/#faq">FAQs</a>
            </div>
            <div>
              <h3>Resources</h3>
              <a href="/#insights">Blog</a>
              <a href="/portfolio">Case Studies</a>
              <a href="/services">All Services</a>
              <a href="/products">WooCommerce Plugins</a>
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
            <p>St. Petersburg, FL 33702</p>
            <a href="tel:+19042435044">+1 (904) 243-5044</a>
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
