// src/app/news/[slug]/page.jsx

import { baseUriBackend } from "@/redux/url/url";
import SingleNews from "./SingleNews";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;

  if (!slug) {
    return {
      title: "News Article",
      description: "Read the latest news articles",
    };
  }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_PROD_URL}api/v1/get-blog-by-slug/${slug}`,
      { cache: "no-store" },
    );

    if (!res.ok) throw new Error("Failed to fetch blog");

    const { data: blog } = await res.json();

    if (!blog) {
      return {
        title: "Blog Not Found",
        description: "The requested news article does not exist",
      };
    }

    const title = blog.metaTitle || blog.title;
    const description = blog.metaDescription || blog.shortDescription;

    const ogImage = blog.image
      ? `${baseUriBackend}${blog.image}`
      : "/default-og.jpg";

    return {
      title,
      description,
      keywords: [
        blog.title,
        blog.category,
        ...(blog.tags || []),
        "Bangladesh",
        "News",
      ].filter(Boolean),
      openGraph: {
        title,
        description,
        url: `/news/${slug}`,
        siteName: "Meragadi",
        images: [
          {
            url: ogImage,
            width: 1200,
            height: 630,
            alt: blog.title,
          },
        ],
        type: "article",
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [ogImage],
      },
      alternates: {
        canonical: `/news/${slug}`,
      },
    };
  } catch (error) {
    return {
      title: "News Article",
      description: "Read the latest news articles",
    };
  }
}

export default function Page() {
  return <SingleNews />;
}
