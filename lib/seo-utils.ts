import type { Metadata } from "next";

interface ProductSEOData {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  availability: string;
  brand: string;
  sku: string;
}

export function generateProductMetadata(product: ProductSEOData): Metadata {
  const title = `${product.name} - Fresh Handcrafted Cake | SweetDelights`;
  const description = `Order ${product.name} online. ${product.description} ✓ Same-day delivery ✓ Fresh ingredients ✓ Premium quality. Starting at ₹${product.price}. Order now!`;

  return {
    title,
    description,
    keywords: `${product.name}, ${product.category} cake, cake delivery, fresh cakes, handcrafted cakes, ${product.brand}, online cake order`,
    openGraph: {
      title,
      description,
      images: [
        {
          url: product.image,
          width: 800,
          height: 800,
          alt: product.name,
        },
      ],
      type: "website", // Changed from "product" to "website"
      siteName: "SweetDelights",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [product.image],
    },
    alternates: {
      canonical: `/product/${product.id}`,
    },
  };
}

export function generateProductSchema(product: ProductSEOData) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: [product.image],
    sku: product.sku,
    brand: {
      "@type": "Brand",
      name: product.brand,
    },
    category: product.category,
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "INR",
      availability: `https://schema.org/${product.availability}`,
      seller: {
        "@type": "Organization",
        name: product.brand,
      },
      priceValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviews,
      bestRating: 5,
      worstRating: 1,
    },
    review: [
      {
        "@type": "Review",
        reviewRating: {
          "@type": "Rating",
          ratingValue: 5,
          bestRating: 5,
        },
        author: {
          "@type": "Person",
          name: "Verified Customer",
        },
        reviewBody: "Absolutely delicious cake! Fresh ingredients and beautiful presentation.",
      },
    ],
  };
}

export function generateBreadcrumbSchema(breadcrumbs: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: `https://sweetdelights.com${crumb.url}`,
    })),
  };
}

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "SweetDelights",
    url: "https://sweetdelights.com",
    logo: "https://sweetdelights.com/logo.png",
    description: "Premium cake delivery service with fresh, handcrafted cakes and same-day delivery",
    address: {
      "@type": "PostalAddress",
      streetAddress: "123 Baker Street",
      addressLocality: "Mumbai",
      addressRegion: "Maharashtra",
      postalCode: "400001",
      addressCountry: "IN",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+91-9876543210",
      contactType: "customer service",
      availableLanguage: ["English", "Hindi"],
    },
    sameAs: [
      "https://facebook.com/sweetdelights",
      "https://instagram.com/sweetdelights",
      "https://twitter.com/sweetdelights",
    ],
  };
}