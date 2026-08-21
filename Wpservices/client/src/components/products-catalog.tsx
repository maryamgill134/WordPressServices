"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { PluginCard } from "@/components/plugin-card";
import { pluginCategories, wooPlugins, type PluginCategory } from "@/data/plugins";
import { InnerPageHero } from "@/components/inner-page-hero";

export function ProductsCatalog() {
  const reduceMotion = useReducedMotion();
  const [filter, setFilter] = useState<PluginCategory>("All");
  const [query, setQuery] = useState("");

  const filteredPlugins = useMemo(() => {
    const term = query.trim().toLowerCase();
    return wooPlugins.filter((plugin) => {
      const matchesCategory = filter === "All" || plugin.category === filter;
      if (!matchesCategory) return false;
      if (!term) return true;
      return [plugin.name, plugin.description, plugin.overview, plugin.category, plugin.badge, ...plugin.features]
        .filter(Boolean)
        .some((value) => value!.toLowerCase().includes(term));
    });
  }, [filter, query]);

  return (
    <div className="svc-page products-page">
      <InnerPageHero
        crumbs={[
          { label: "Home", href: "/" },
          { label: "WooCommerce Plugins" },
        ]}
        label="WooCommerce Plugins"
        title="WooCommerce Plugins Built for Real Stores"
        description="Browse the full catalog of WooCommerce extensions for sales, catalog, operations, checkout, subscriptions, and social proof."
      />

      <section className="products-catalog">
        <div className="container">
          <div className="products-toolbar">
            <label className="products-search">
              <span className="sr-only">Search plugins</span>
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search plugins"
                autoComplete="off"
              />
            </label>
            <div className="filters">
              {pluginCategories.map((item) => (
                <button
                  className={filter === item ? "active" : ""}
                  type="button"
                  key={item}
                  aria-pressed={filter === item}
                  onClick={() => setFilter(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <motion.div layout className="plugins-grid">
            <AnimatePresence mode="popLayout">
              {filteredPlugins.map((plugin, index) => (
                <motion.article
                  layout
                  key={plugin.name}
                  initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
                  transition={{ duration: reduceMotion ? 0 : 0.4, delay: reduceMotion ? 0 : index * 0.03, ease: [0.22, 1, 0.36, 1] }}
                >
                  <PluginCard plugin={plugin} reduceMotion={reduceMotion} />
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredPlugins.length === 0 && (
            <p className="plugins-empty">No plugins match this search. Try another keyword or category.</p>
          )}
        </div>
      </section>
    </div>
  );
}
