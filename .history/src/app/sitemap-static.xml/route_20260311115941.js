// app/sitemap-static.xml/route.js

export const dynamic = "force-dynamic";
export const revalidate = 0;

import { NextResponse } from "next/server";

const baseUrl = "https://scootylelo.com";

export async function GET() {
  try {
    const today = new Date().toISOString();

    const staticPages = [
      { path: "/", priority: "1.0", changefreq: "daily" },
      { path: "/news", priority: "0.9", changefreq: "hourly" },
      { path: "/cars", priority: "0.9", changefreq: "hourly" },
      { path: "/bikes", priority: "0.9", changefreq: "hourly" },
      { path: "/scooties", priority: "0.9", changefreq: "hourly" },
      { path: "/cycles", priority: "0.9", changefreq: "hourly" },
      { path: "/compare", priority: "0.9", changefreq: "hourly" },
      { path: "/about-us", priority: "0.7", changefreq: "monthly" },
      { path: "/contact-us", priority: "0.7", changefreq: "monthly" },
      { path: "/privacy-policy", priority: "0.5", changefreq: "yearly" },
      { path: "/terms-conditions", priority: "0.5", changefreq: "yearly" },
      { path: "/disclaimer", priority: "0.5", changefreq: "yearly" },
    ];

    const urls = staticPages
      .map(
        (page) => `
  <url>
    <loc>${baseUrl}${page.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
      )
      .join("");

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
    console.error("Static Sitemap Error:", error);

    return new NextResponse("Error generating sitemap", {
      status: 500,
    });
  }
}