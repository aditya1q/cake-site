import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { allCakes } from "@/data/cakes";
import { generateProductMetadata, generateProductSchema, generateBreadcrumbSchema } from "@/lib/seo-utils";
import ProductPageClient from "./product-page-client";

interface Props {
  params: { id: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = allCakes.find((cake) => cake.id === Number.parseInt(params.id));

  if (!product) {
    return {
      title: "Product Not Found | KyraBakers",
      description: "The requested product could not be found.",
    };
  }

  return generateProductMetadata({
    id: product.id,
    name: product.name,
    description: product.description,
    price: product.price,
    originalPrice: product.originalPrice,
    image: product.image,
    category: product.category,
    rating: product.rating,
    reviews: product.reviews,
    availability: "InStock",
    brand: "KyraBakers",
    sku: `SD-${product.id.toString().padStart(4, "0")}`,
  });
}

export default function ProductPage({ params }: Props) {
  const product = allCakes.find((cake) => cake.id === Number.parseInt(params.id));

  if (!product) {
    notFound();
  }

  const productSchema = generateProductSchema({
    id: product.id,
    name: product.name,
    description: product.description,
    price: product.price,
    originalPrice: product.originalPrice,
    image: product.image,
    category: product.category,
    rating: product.rating,
    reviews: product.reviews,
    availability: "InStock",
    brand: "KyraBakers",
    sku: `SD-${product.id.toString().padStart(4, "0")}`,
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Cakes", url: "/category/all" },
    { name: product.category, url: `/category/${product.category.toLowerCase()}` },
    { name: product.name, url: `/product/${product.id}` },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <ProductPageClient product={product} />
    </>
  );
}