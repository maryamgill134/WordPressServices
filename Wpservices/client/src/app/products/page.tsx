import type { Metadata } from "next";
import { ProductsCatalog } from "@/components/products-catalog";

export const metadata: Metadata = {
  title: "WooCommerce Plugins",
  description: "Browse WooCommerce extensions for sales, catalog, operations, checkout, subscriptions, and social proof — built for real stores.",
};

export default function ProductsPage() {
  return <ProductsCatalog />;
}
