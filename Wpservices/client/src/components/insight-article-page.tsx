import Image from "next/image";
import Link from "next/link";
import { InnerPageHero } from "@/components/inner-page-hero";
import {
  formatInsightDate,
  getRelatedInsights,
  insightHref,
  type Insight,
} from "@/data/insights";

export function InsightArticlePage({ article }: { article: Insight }) {
  const related = getRelatedInsights(article.slug);

  return (
    <div className="article-page">
      <article>
        <InnerPageHero
          crumbs={[
            { label: "Home", href: "/" },
            { label: "Insights", href: "/#insights" },
            { label: article.title },
          ]}
          label={article.category}
          title={article.title}
          description={article.excerpt}
          primary={false}
          secondary={false}
        />

        <div className="article-header-meta">
          <div className="container">
            <p>
              <span>Published</span>
              <time dateTime={article.publishedAt}>{formatInsightDate(article.publishedAt)}</time>
            </p>
            <p>
              <span>Author</span>
              <strong>{article.author}</strong>
              {article.authorRole ? <em>{article.authorRole}</em> : null}
            </p>
          </div>
        </div>

        <section className="article-feature" aria-label="Featured image">
          <div className="container">
            <figure className="article-feature-frame">
              <Image
                src={article.image}
                alt={article.imageAlt}
                fill
                priority
                sizes="(max-width: 780px) 100vw, 960px"
              />
            </figure>
          </div>
        </section>

        <div className="article-body">
          <div className="container">
            {article.sections.map((section, index) => (
              <section className="article-section" key={section.heading}>
                <h2>{section.heading}</h2>
                {section.paragraphs?.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {section.items && section.items.length > 0 && (
                  <ul>
                    {section.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
                {index === 0 && article.quote ? (
                  <blockquote className="article-callout">
                    <p>{article.quote}</p>
                  </blockquote>
                ) : null}
              </section>
            ))}
          </div>
        </div>
      </article>

      <section className="article-related section" aria-labelledby="related-articles-heading">
        <div className="container">
          <div className="section-heading section-heading--left">
            <span className="eyebrow">INSIGHTS</span>
            <h2 id="related-articles-heading">Related articles</h2>
            <p>More practical WordPress advice from the same series.</p>
          </div>
          <div className="article-related-grid">
            {related.map((item) => (
              <article className="insight-card glow-card" key={item.slug}>
                <div className="insight-image">
                  <Image src={item.image} alt={item.imageAlt} fill sizes="(max-width: 780px) 100vw, 40vw" />
                </div>
                <div>
                  <span>{item.category}</span>
                  <h3>{item.title}</h3>
                  <p>{item.excerpt}</p>
                  <Link className="insight-read" href={insightHref(item.slug)} aria-label={`Read article: ${item.title}`}>
                    Read article
                  </Link>
                </div>
              </article>
            ))}
          </div>
          <div className="article-related-actions">
            <Link className="button button--ghost" href="/#insights">Back to Insights</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
