// app/sitemap.xml/route.js
import { NextResponse } from 'next/server';
import { baseUrl, returnSitemap } from '../lib/sitemap-helper';

export const revalidate = 86400; // 24 ঘন্টা

export async function GET() {
  try {
    const today = new Date().toISOString();

    // সাইটম্যাপ লিস্ট (আপনার যতগুলো সাইটম্যাপ থাকবে সব)
    const sitemaps = [
      {
        loc: `${baseUrl}/sitemap-static.xml`,
        lastmod: today
      },
      {
        loc: `${baseUrl}/sitemap-news.xml`,
        lastmod: today
      },
      {
        loc: `${baseUrl}/sitemap-vehicle.xml`,
        lastmod: today
      },
      {
        loc: `${baseUrl}/sitemap-brands.xml`,
        lastmod: today
      },
      {
        loc: `${baseUrl}/sitemap-images.xml`,
        lastmod: today
      },
      {
        loc: `${baseUrl}/sitemap-authors.xml`,
        lastmod: today
      },
      {
        loc: `${baseUrl}/sitemap-filters.xml`,
        lastmod: today
      }

    ];

    // Sitemap Index XML জেনারেট
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemaps.map(s => `
  <sitemap>
    <loc>${s.loc}</loc>
    <lastmod>${s.lastmod}</lastmod>
  </sitemap>`).join('')}
</sitemapindex>`;

    return new NextResponse(xml, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate',
      },
    });

  } catch (error) {
    console.error('Sitemap Index Error:', error);

    // এরর হলে মিনিমাম সাইটম্যাপ
    const fallbackXml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${baseUrl}/sitemap-static.xml</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </sitemap>
</sitemapindex>`;

    return new NextResponse(fallbackXml, {
      status: 200,
      headers: { 'Content-Type': 'application/xml' },
    });
  }
}