// src/app/(vehicle)/[slug]/page.jsx

import { baseUriBackend } from "@/redux/url/url";
import VehicleSlugComponents from "./VehicleSlugComponents";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;

  if (!slug) {
    return {
      title: "Vehicle Details | Explore Specifications & Features",
      description:
        "Browse detailed vehicle specifications, features, pricing, and reviews. Find your perfect vehicle with comprehensive information.",
    };
  }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_PROD_URL}api/v1/get-product-by-slug/${slug}`,
      { cache: "no-store" },
    );

    if (!res.ok) throw new Error("Failed to fetch vehicle");

    const { data: product } = await res.json();

    if (!product) {
      return {
        title: "Vehicle Not Found | Meragadi",
        description:
          "The requested vehicle details are not available. Browse our collection for similar vehicles.",
      };
    }

    // Enhanced title generation with fallback strategy
    const productName = product.productName_en || "";
    const brandName = product.brand?.name || "";
    const categoryName = product.category?.name || "";

    const title =
      product.metaTitle ||
      `${productName} | ${brandName} ${categoryName} - Specifications, Price & Features`;

    const description =
      product.metaDescription ||
      product.shortDescription_en ||
      `Explore the ${productName} from ${brandName}. Get detailed specifications, features, pricing, and more about this ${categoryName} in Bangladesh.`;

    const keywords = [
      productName,
      brandName,
      categoryName,
      ...(product.tags || []),
      "buy in india",
      "price in india",
      "price in india",
      "Meragadi",
      "mera",
      "gari",
      "Mera gadi",
      "features",
      "review",
      "for sale",
      "new arrival",
    ]
      .filter(Boolean)
      .join(", ");

    // Handle OG image generation with multiple fallbacks
    let ogImage;
    if (product.galleryImages?.length) {
      ogImage = `${baseUriBackend}${product.galleryImages[0]}`;
    } else if (product.variations?.[0]?.images?.[0]) {
      ogImage = `${baseUriBackend}${product.variations[0].images[0]}`;
    } else {
      ogImage = "/default-og.jpg";
    }

    // Additional metadata for better SEO
    const priceInfo = product.salePrice || product.regularPrice;

    return {
      title,
      description:
        description.length > 160
          ? description.substring(0, 157) + "..."
          : description,
      keywords,

      // Enhanced Open Graph
      openGraph: {
        title: title.length > 60 ? title.substring(0, 57) + "..." : title,
        description:
          description.length > 200
            ? description.substring(0, 197) + "..."
            : description,
        url: `/${slug}`,
        siteName: "Meragadi",
        images: [
          {
            url: ogImage,
            width: 1200,
            height: 630,
            alt: `${productName} - ${brandName} ${categoryName}`,
          },
        ],
        type: "website",
        locale: "en_BD",
        publishedTime: product.createdAt,
        modifiedTime: product.updatedAt,
      },

      // Enhanced Twitter Cards
      twitter: {
        card: "summary_large_image",
        title: title.length > 70 ? title.substring(0, 67) + "..." : title,
        description:
          description.length > 200
            ? description.substring(0, 197) + "..."
            : description,
        images: [ogImage],
        creator: "@scootylelo",
        site: "@scootylelo",
      },

      // Canonical URL
      alternates: {
        canonical: `/${slug}`,
      },

      // Additional metadata
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          "max-video-preview": -1,
          "max-image-preview": "large",
          "max-snippet": -1,
        },
      },

      // Structured data hint
      other: {
        "product:price": priceInfo || "Contact for price",
        "product:condition": "new",
        "product:availability": "in_stock",
        "product:category": categoryName,
        "product:brand": brandName,
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: `${slug.replace(/-/g, " ")} | Vehicle Details - Meragadi`,
      description: `Explore ${slug.replace(/-/g, " ")} specifications, features, and pricing. Find detailed information about this vehicle.`,
      robots: {
        index: false,
        follow: true,
      },
    };
  }
}

export default function Page() {
  return <VehicleSlugComponents />;
}
