// app/sitemap-brands.xml/route.js

export const dynamic = "force-dynamic";
export const revalidate = 0;

import { NextResponse } from "next/server";

const baseUrl = "https://meragadi.com";

export async function GET() {
  try {
    const today = new Date().toISOString();

    const res = await fetch(
      "https://backend.meragadi.com/api/v1/get-all-sitemap-brands",
      {
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const response = await res.json();

    let urls = "";

    if (Array.isArray(response?.data?.brands)) {
      urls = response.data.brands
        .filter((brand) => brand.slug)
        .map(
          (brand) => `
  <url>
    <loc>${baseUrl}/brand/${brand.slug}</loc>
    <lastmod>${brand.lastmod || brand.updatedAt || brand.createdAt || today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.6</priority>
  </url>`
        )
        .join("");
    }

    // fallback
    if (!urls) {
      urls = `
  <url>
    <loc>${baseUrl}/brands</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
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
    console.error("Brand Sitemap Error:", error);

    return new NextResponse("Error generating sitemap", {
      status: 500,
    });
  }
}