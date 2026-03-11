// app/sitemap-authors.xml/route.js

export const dynamic = "force-dynamic";
export const revalidate = 0;

import { NextResponse } from "next/server";

const baseUrl = "https://scootylelo.com";

export async function GET() {
  try {
    const today = new Date().toISOString();

    const authorsRes = await fetch(
      "https://backend.scootylelo.com/api/v1/get-all-author",
      {
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!authorsRes.ok) {
      throw new Error(`HTTP error! status: ${authorsRes.status}`);
    }

    const response = await authorsRes.json();

    let urls = "";

    if (response?.success && Array.isArray(response?.data)) {
      urls = response.data
        .map((author) => {
          const authorSlug = generateSlug(
            author.fullName || author.email || author._id
          );

          return `
  <url>
    <loc>${baseUrl}/author/${authorSlug}</loc>
    <lastmod>${author.updatedAt || author.createdAt || today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.5</priority>  // Added default priority value
  </url>`;
        })
        .join("");
    }

    // fallback
    if (!urls) {
      urls = `
  <url>
    <loc>${baseUrl}/authors</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>  // Higher priority for main authors page
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
      },
    });
  } catch (error) {
    console.error("Author sitemap error:", error);
    return new NextResponse("Error generating author sitemap", {
      status: 500,
    });
  }
}

// Slug generator
function generateSlug(text) {
  if (!text) return "unknown-author";

  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")        // Fixed: replaced "" with "-"
    .replace(/&/g, "-and-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}