"use client";

import type { ReactNode } from "react";
import {
  Activity,
  BadgeCheck,
  Bell,
  BookOpen,
  Check,
  CreditCard,
  Database,
  Gauge,
  HardDrive,
  Mail,
  Plug,
  RefreshCw,
  Search,
  Shield,
  ShoppingCart,
  SlidersHorizontal,
  Workflow,
  Zap,
} from "lucide-react";
import { getServiceVisual, type UiFrame, type UiMockKind } from "@/data/service-ui-mock";

function Shell({
  frame,
  label,
  ratio,
  children,
}: {
  frame: UiFrame;
  label: string;
  ratio: "landscape" | "square";
  children: ReactNode;
}) {
  return (
    <div className={`svc-detail-media svc-ui svc-ui--${ratio}`}>
      <div className="svc-detail-chrome">
        <span className="svc-detail-dots" aria-hidden="true"><i /><i /><i /></span>
        <span className="svc-detail-url">{label}</span>
      </div>
      {frame === "dashboard" ? (
        <div className="svc-detail-dash-body">
          <aside className="svc-detail-dash-rail" aria-hidden="true"><i /><i /><i /><i /></aside>
          <div className="svc-ui-canvas">{children}</div>
        </div>
      ) : frame === "editor" ? (
        <div className="svc-detail-editor-body">
          <aside className="svc-detail-editor-rail" aria-hidden="true"><i /><i /><i /><i /><i /></aside>
          <div className="svc-ui-canvas">{children}</div>
        </div>
      ) : (
        <div className="svc-ui-canvas">{children}</div>
      )}
    </div>
  );
}

function MockBody({ kind }: { kind: UiMockKind }) {
  switch (kind) {
    case "site-home":
      return (
        <div className="svc-ui-site">
          <div className="svc-ui-site-nav" aria-hidden="true"><b /><span /><span /><em /></div>
          <div className="svc-ui-site-hero">
            <strong>A clearer offer above the fold</strong>
            <p>Service pages structured to produce a next step.</p>
            <i>Get a quote</i>
          </div>
          <div className="svc-ui-site-cards" aria-hidden="true"><b /><b /><b /></div>
        </div>
      );
    case "site-inner":
      return (
        <div className="svc-ui-site">
          <div className="svc-ui-site-nav" aria-hidden="true"><b /><span /><span /><span /></div>
          <div className="svc-ui-inner">
            <div>
              <em>Services</em>
              <strong>The page visitors actually need</strong>
              <p>Clear hierarchy, proof, and a single conversion path.</p>
            </div>
            <aside aria-hidden="true"><i /><i /><i /></aside>
          </div>
        </div>
      );
    case "gutenberg":
      return (
        <div className="svc-ui-editor">
          <div className="svc-ui-editor-tools" aria-hidden="true"><i /><i /><i /><i /></div>
          <div className="svc-ui-editor-page">
            <b>Heading</b>
            <p /><p />
            <div className="svc-ui-editor-cols" aria-hidden="true"><span /><span /></div>
          </div>
        </div>
      );
    case "wp-setup":
      return (
        <div className="svc-ui-list">
          <div className="svc-ui-list-head">WordPress setup</div>
          <ul>
            <li><Check aria-hidden="true" /><span>Installation</span><em>Done</em></li>
            <li><SlidersHorizontal aria-hidden="true" /><span>Permalinks & environment</span><em>Done</em></li>
            <li><Shield aria-hidden="true" /><span>Security hardening</span><em>Done</em></li>
            <li><HardDrive aria-hidden="true" /><span>Backup configuration</span><em>Ready</em></li>
          </ul>
        </div>
      );
    case "wp-settings":
      return (
        <div className="svc-ui-form">
          <div className="svc-ui-list-head">Settings / General</div>
          <label>Site title<b>Your Business</b></label>
          <label>Tagline<b>Clear, usable WordPress</b></label>
          <label>Timezone<b>Site default</b></label>
          <label>Permalinks<b>/services/sample-page/</b></label>
        </div>
      );
    case "woo-admin":
      return (
        <div className="svc-ui-table">
          <div className="svc-ui-list-head">WooCommerce / Products</div>
          <div className="svc-ui-row"><span>Canvas Tote</span><b>$48</b><em>In stock</em></div>
          <div className="svc-ui-row"><span>Studio Tee</span><b>$36</b><em>In stock</em></div>
          <div className="svc-ui-row"><span>Field Cap</span><b>$24</b><em>Low stock</em></div>
        </div>
      );
    case "woo-shop":
      return (
        <div className="svc-ui-shop">
          <div className="svc-ui-site-nav" aria-hidden="true"><b>Shop</b><span /><ShoppingCart aria-hidden="true" /></div>
          <div className="svc-ui-products">
            <article><i /><strong>Canvas Tote</strong><span>$48</span></article>
            <article><i /><strong>Studio Tee</strong><span>$36</span></article>
            <article><i /><strong>Field Cap</strong><span>$24</span></article>
            <article><i /><strong>Work Tote</strong><span>$54</span></article>
          </div>
        </div>
      );
    case "woo-product":
      return (
        <div className="svc-ui-product">
          <div className="svc-ui-product-shot" aria-hidden="true" />
          <div>
            <em>Catalog</em>
            <strong>Studio Tee</strong>
            <p>$36 — size and color without extra friction.</p>
            <div className="svc-ui-swatches" aria-hidden="true"><i /><i /><i /></div>
            <b>Add to cart</b>
          </div>
        </div>
      );
    case "woo-checkout":
      return (
        <div className="svc-ui-checkout">
          <div className="svc-ui-list-head">Checkout</div>
          <label>Contact<b>you@company.com</b></label>
          <label>Shipping<b>Calculated at next step</b></label>
          <label>Payment<b>Card / wallet</b></label>
          <div className="svc-ui-total"><span>Order total</span><strong>$48</strong></div>
          <i>Place order</i>
        </div>
      );
    case "ld-builder":
      return (
        <div className="svc-ui-list">
          <div className="svc-ui-list-head">LearnDash / Course builder</div>
          <ul>
            <li><BookOpen aria-hidden="true" /><span>01 · Welcome</span><em>Lesson</em></li>
            <li><BookOpen aria-hidden="true" /><span>02 · Core module</span><em>Lesson</em></li>
            <li><BadgeCheck aria-hidden="true" /><span>Checkpoint</span><em>Quiz</em></li>
            <li><BookOpen aria-hidden="true" /><span>03 · Apply</span><em>Lesson</em></li>
          </ul>
        </div>
      );
    case "ld-player":
      return (
        <div className="svc-ui-player">
          <div className="svc-ui-player-top"><span>Lesson 2 of 8</span><em>62%</em></div>
          <div className="svc-ui-player-bar" aria-hidden="true"><i /></div>
          <strong>The learning path stays obvious</strong>
          <p>Next lesson, progress, and completion without extra navigation.</p>
          <b>Continue</b>
        </div>
      );
    case "ld-student":
      return (
        <div className="svc-ui-table">
          <div className="svc-ui-list-head">Student dashboard</div>
          <div className="svc-ui-row"><span>Foundation course</span><b>62%</b><em>In progress</em></div>
          <div className="svc-ui-row"><span>Workshop series</span><b>20%</b><em>Started</em></div>
          <div className="svc-ui-row"><span>Certificate path</span><b>0%</b><em>Locked</em></div>
        </div>
      );
    case "ld-enroll":
      return (
        <div className="svc-ui-enroll">
          <em>Course access</em>
          <strong>Enrol and start the first lesson</strong>
          <p>Roles, drip, and prerequisites configured before students arrive.</p>
          <div className="svc-ui-enroll-meta"><span>8 lessons</span><span>Certificate</span><span>Progress</span></div>
          <b>Start course</b>
        </div>
      );
    case "ld-course":
      return (
        <div className="svc-ui-site">
          <div className="svc-ui-site-nav" aria-hidden="true"><b>Academy</b><span /><span /></div>
          <div className="svc-ui-course">
            <div className="svc-ui-course-cover" aria-hidden="true" />
            <div>
              <em>Course</em>
              <strong>A branded first impression</strong>
              <p>Curriculum, proof, and enrolment on one template.</p>
              <b>Enrol now</b>
            </div>
          </div>
        </div>
      );
    case "plugin-settings":
      return (
        <div className="svc-ui-form">
          <div className="svc-ui-list-head">Custom plugin</div>
          <label>Feature toggle<b>Enabled</b></label>
          <label>Capabilities<b>Editor role</b></label>
          <label>Logging<b>Failures visible</b></label>
          <label>Updates<b>WordPress-safe</b></label>
        </div>
      );
    case "plugin-code":
      return (
        <div className="svc-ui-code" aria-hidden="true">
          <span>Plugin Name: Client Feature</span>
          <span>add_action( &apos;init&apos;, &apos;register_types&apos; );</span>
          <span>register_rest_route( &apos;client/v1&apos;, &apos;/sync&apos; );</span>
          <span>current_user_can( &apos;manage_options&apos; );</span>
        </div>
      );
    case "migrate-wp":
      return (
        <div className="svc-ui-flow">
          <span><Database aria-hidden="true" /> Source CMS</span>
          <i />
          <span><HardDrive aria-hidden="true" /> Backup</span>
          <i />
          <span className="is-live">WordPress</span>
        </div>
      );
    case "migrate-woo":
      return (
        <div className="svc-ui-flow">
          <span>Catalog</span>
          <i />
          <span>Customers</span>
          <i />
          <span className="is-live">WooCommerce</span>
        </div>
      );
    case "migrate-ld":
      return (
        <div className="svc-ui-flow">
          <span>Courses</span>
          <i />
          <span>Students</span>
          <i />
          <span className="is-live">LearnDash</span>
        </div>
      );
    case "ops-dash":
      return (
        <div className="svc-ui-kpis">
          <article><Activity aria-hidden="true" /><strong>Uptime watch</strong><p>Availability is monitored.</p></article>
          <article><RefreshCw aria-hidden="true" /><strong>Update cadence</strong><p>Core, plugins, themes.</p></article>
          <article><Shield aria-hidden="true" /><strong>Security checks</strong><p>Hardening stays in the plan.</p></article>
        </div>
      );
    case "content-queue":
      return (
        <div className="svc-ui-table">
          <div className="svc-ui-list-head">Pages / queued updates</div>
          <div className="svc-ui-row"><span>Home hero copy</span><b>QA</b><em>Today</em></div>
          <div className="svc-ui-row"><span>Services template</span><b>Edit</b><em>This week</em></div>
          <div className="svc-ui-row"><span>Landing page</span><b>Review</b><em>Queued</em></div>
        </div>
      );
    case "sprint-board":
      return (
        <div className="svc-ui-board">
          <div>
            <em>To do</em>
            <b /><b />
          </div>
          <div>
            <em>In progress</em>
            <b className="is-active" />
          </div>
          <div>
            <em>Review</em>
            <b />
          </div>
        </div>
      );
    case "landing":
      return (
        <div className="svc-ui-landing">
          <em>Campaign page</em>
          <strong>One offer. One action.</strong>
          <p>Proof sits next to the decision, not below the fold.</p>
          <div className="svc-ui-landing-cta"><i>Get the guide</i><span>No extra navigation</span></div>
        </div>
      );
    case "landing-form":
      return (
        <div className="svc-ui-form svc-ui-form--tight">
          <div className="svc-ui-list-head">Request the offer</div>
          <label>Name<b>Short field</b></label>
          <label>Email<b>Required</b></label>
          <label>Company<b>Optional</b></label>
          <i>Submit</i>
        </div>
      );
    case "speed":
      return (
        <div className="svc-ui-speed">
          <div className="svc-ui-speed-head"><Gauge aria-hidden="true" /><strong>Core Web Vitals</strong></div>
          <div className="svc-ui-meter"><span>LCP</span><i /><b>Largest paint</b></div>
          <div className="svc-ui-meter"><span>INP</span><i /><b>Interaction</b></div>
          <div className="svc-ui-meter"><span>CLS</span><i /><b>Layout shift</b></div>
        </div>
      );
    case "cache-panel":
      return (
        <div className="svc-ui-form">
          <div className="svc-ui-list-head">Cache & assets</div>
          <label>Page cache<b>Safe templates only</b></label>
          <label>Images<b>Sized and compressed</b></label>
          <label>Scripts<b>Reduced per template</b></label>
          <label>Database<b>Revisions cleaned</b></label>
        </div>
      );
    case "speed-shop":
      return (
        <div className="svc-ui-speed">
          <div className="svc-ui-speed-head"><Gauge aria-hidden="true" /><strong>Store templates</strong></div>
          <div className="svc-ui-meter"><span>Shop</span><i /><b>Archive</b></div>
          <div className="svc-ui-meter"><span>Product</span><i /><b>Media & apps</b></div>
          <div className="svc-ui-meter"><span>Checkout</span><i /><b>Uncached path</b></div>
        </div>
      );
    case "api":
      return (
        <div className="svc-ui-code svc-ui-code--api">
          <span>GET /wp-json/client/v1/leads</span>
          <span className="ok">200 OK · authenticated</span>
          <span>POST /wp-json/client/v1/orders</span>
          <span>retry · log · validate</span>
        </div>
      );
    case "integrate":
      return (
        <div className="svc-ui-map">
          <span><Plug aria-hidden="true" /> API</span>
          <span><Activity aria-hidden="true" /> CRM</span>
          <b>WordPress</b>
          <span><CreditCard aria-hidden="true" /> Payments</span>
          <span><Mail aria-hidden="true" /> Email</span>
          <span><Search aria-hidden="true" /> Analytics</span>
        </div>
      );
    case "workflow":
      return (
        <div className="svc-ui-flow">
          <span><Zap aria-hidden="true" /> Trigger</span>
          <i />
          <span><Workflow aria-hidden="true" /> Automate</span>
          <i />
          <span><BadgeCheck aria-hidden="true" /> Review</span>
          <i />
          <span><Bell aria-hidden="true" /> Notify</span>
        </div>
      );
    case "review-queue":
      return (
        <div className="svc-ui-table">
          <div className="svc-ui-list-head">Human review</div>
          <div className="svc-ui-row"><span>Lead routed to sales</span><b>Approved</b><em>Person</em></div>
          <div className="svc-ui-row"><span>Draft reply</span><b>Waiting</b><em>Person</em></div>
          <div className="svc-ui-row"><span>Internal summary</span><b>Logged</b><em>Safe</em></div>
        </div>
      );
    case "seo":
      return (
        <div className="svc-ui-table">
          <div className="svc-ui-list-head">Search structure</div>
          <div className="svc-ui-row"><span>Keywords</span><b>Intent</b><em>Mapped</em></div>
          <div className="svc-ui-row"><span>Technical SEO</span><b>Indexation</b><em>In progress</em></div>
          <div className="svc-ui-row"><span>Templates</span><b>On-page</b><em>Next</em></div>
        </div>
      );
    case "serp":
      return (
        <div className="svc-ui-serp">
          <span>search</span>
          <strong>WordPress services for your industry</strong>
          <em>yoursite.com › services</em>
          <p>A crawlable page with a clear title, unique copy, and a next step.</p>
        </div>
      );
    default:
      return null;
  }
}

export function ServiceUiMock({
  slug,
  categorySlug,
  slot,
}: {
  slug: string;
  categorySlug: string;
  slot: "hero" | "overview";
}) {
  const visual = getServiceVisual(slug, categorySlug);
  const kind = slot === "hero" ? visual.hero : visual.overview;
  const frame = slot === "hero" ? visual.heroFrame : visual.overviewFrame;
  const label = slot === "hero" ? visual.heroLabel : visual.overviewLabel;

  return (
    <Shell frame={frame} label={label} ratio={slot === "hero" ? "landscape" : "square"}>
      <MockBody kind={kind} />
    </Shell>
  );
}

export { getServiceVisual };
