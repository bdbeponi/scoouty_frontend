// app/sitemap-news.xml/route.js

export const dynamic = "force-dynamic";
export const revalidate = 0;

import { NextResponse } from "next/server";

const baseUrl = "https://meragadi.com";

export async function GET() {
  try {
    const today = new Date().toISOString();

    const blogsRes = await fetch(
      "https://backend.scootylelo.com/api/v1/get-all-sitemap-blogs",
      {
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!blogsRes.ok) {
      throw new Error(`HTTP error! status: ${blogsRes.status}`);
    }

    const response = await blogsRes.json();

    let urls = "";

    if (response?.success && Array.isArray(response?.data?.blogs)) {
      urls = response.data.blogs
        .filter((blog) => blog.slug && blog.is_active === true)
        .map(
          (blog) => `
  <url>
    <loc>${baseUrl}/news/${blog.slug}</loc>
    <lastmod>${
      blog.lastmod ||
      blog.updatedAt ||
      blog.createdAt ||
      today
    }</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.7</priority>
  </url>`
        )
        .join("");
    }

    // fallback
    if (!urls) {
      urls = `
  <url>
    <loc>${baseUrl}/news</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>`;
    }

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap-style.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

    return new NextResponse(xml, {
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "no-cache, no-store, must-revalidate",
      },
    });
  } catch (error) {
    console.error("News Sitemap Error:", error);

    return new NextResponse("Error generating sitemap", {
      status: 500,
    });
  }
}