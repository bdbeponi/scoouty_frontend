// app/sitemap-filters.xml/route.js

export const dynamic = "force-dynamic";
export const revalidate = 0;

import { NextResponse } from "next/server";

const baseUrl = "https://meragadi.com";

function escapeXml(unsafe) {
  return unsafe
    .replace(/[<>&'"]/g, (c) => {
      switch (c) {
        case "<": return "&lt;";
        case ">": return "&gt;";
        case "&": return "&amp;";
        case "'": return "&apos;";
        case '"': return "&quot;";
      }
    });
}

export async function GET() {
  try {
    const today = new Date().toISOString();

    const res = await fetch(
      "https://backend.meragadi.com/api/v1/sitemap-filter-urls",
      { cache: "no-store" }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch filter URLs");
    }

    const response = await res.json();

    let urls = [];

    if (response?.success && Array.isArray(response?.data?.urls)) {
      urls = response.data.urls
        .filter((item) => item.url)
        .map((item) => ({
          loc: item.url.replace("http://localhost:3000", baseUrl),
          lastmod: item.updatedAt || item.createdAt || today,
        }));
    }

    // fallback URL
    if (urls.length === 0) {
      urls.push({
        loc: `${baseUrl}/search`,
        lastmod: today,
      });
    }

    const xmlUrls = urls
      .map(
        (u) => `
  <url>
    <loc>${escapeXml(u.loc)}</loc>
    <lastmod>${new Date(u.lastmod).toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority></priority>
  </url>`
      )
      .join("");

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap-style.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${xmlUrls}
</urlset>`;

    return new NextResponse(xml, {
      headers: { "Content-Type": "application/xml" },
    });
  } catch (error) {
    console.error("Filter Sitemap Error:", error);
    return new NextResponse("Error generating filter sitemap", { status: 500 });
  }
}