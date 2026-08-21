"use client";

export function NewsletterStrip() {
  return (
    <section className="newsletter" id="newsletter">
      <div className="container newsletter-inner">
        <div>
          <span>Stay Updated with WordPress Tips</span>
          <p>Join our newsletter and get the latest tips, guides, and WordPress insights.</p>
        </div>
        <form onSubmit={(event) => event.preventDefault()}>
          <label className="newsletter-field">
            <span className="sr-only">Email address</span>
            <input type="email" required autoComplete="email" placeholder="Enter your email address" />
          </label>
          <button type="submit">Subscribe</button>
        </form>
      </div>
    </section>
  );
}
