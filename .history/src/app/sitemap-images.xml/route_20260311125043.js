// app/sitemap-images.xml/route.js

export const dynamic = "force-dynamic";
export const revalidate = 0;

import { NextResponse } from "next/server";

const baseUrl = "https://meragadi.com";

export async function GET() {
  try {
    const today = new Date().toISOString();

    const imagesRes = await fetch(
      "http://localhost:3000//api/v1/sitemap/images/simple",
      {
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!imagesRes.ok) {
      throw new Error(`HTTP error! status: ${imagesRes.status}`);
    }

    const response = await imagesRes.json();

    let urls = "";

    // Extract image URLs from response
    let imageUrls = [];
    if (response?.data?.imageUrls && Array.isArray(response.data.imageUrls)) {
      imageUrls = response.data.imageUrls;
    } else if (Array.isArray(response)) {
      imageUrls = response;
    }

    if (imageUrls.length > 0) {
      const seen = new Set(); // To avoid duplicates

      urls = imageUrls
        .filter(imageUrl => imageUrl && typeof imageUrl === 'string')
        .map((imageUrl) => {
          // Determine the page URL based on image path
          let pageUrl = baseUrl;

          if (imageUrl.includes("/product/")) {
            const match = imageUrl.match(/\/product\/([^\/]+)/);
            if (match && match[1]) {
              pageUrl = `${baseUrl}/product/${match[1]}`;
            }
          }

          const key = `${pageUrl}-${imageUrl}`;
          if (seen.has(key)) return null; // Skip duplicates
          seen.add(key);

          return `
  <url>
    <loc>${pageUrl}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
    <image:image>
      <image:loc>${imageUrl}</image:loc>
    </image:image>
  </url>`;
        })
        .filter(Boolean) // Remove null entries from duplicates
        .join("");
    }

    // fallback if no images
    if (!urls) {
      urls = `
  <url>
    <loc>${baseUrl}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
    <image:image>
      <image:loc>${baseUrl}/placeholder-image.jpg</image:loc>
    </image:image>
  </url>`;
    }

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap-image-style.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls}
</urlset>`;

    return new NextResponse(xml, {
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "public, s-maxage=86400, stale-while-revalidate",
      },
    });
  } catch (error) {
    console.error("Images Sitemap Error:", error);

    return new NextResponse("Error generating image sitemap", {
      status: 500,
    });
  }
}