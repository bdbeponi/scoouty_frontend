

export const dynamic = "force-dynamic";
export const revalidate = 0;

import { NextResponse } from "next/server";


const baseUrl = "https://scootylelo.com";

export async function GET() {
  try {
    const today = new Date().toISOString();

    const vehiclesRes = await fetch(
      "http://localhost:8006/api/v1/get-all-sitemap-products",
      { 
        cache: "no-store",
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );

    if (!vehiclesRes.ok) {
      throw new Error(`HTTP error! status: ${vehiclesRes.status}`);
    }

    const response = await vehiclesRes.json();

    let urls = "";

    if (response?.success && Array.isArray(response?.data?.products)) {
      urls = response.data.products
        .filter((v) => v.slug)
        .map(
          (vehicle) => `
  <url>
    <loc>${baseUrl}/${vehicle.slug}</loc>
    <lastmod>${vehicle.updated_at || vehicle.lastmod || today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>`
        )
        .join("");
    }

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap-style.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

    return new NextResponse(xml, {
      headers: {
        "Content-Type": "application/xml",
      },
    });
  } catch (error) {
    console.error("Sitemap generation error:", error);
    return new NextResponse("Error generating sitemap", { status: 500 });
  }
}