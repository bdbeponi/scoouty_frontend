// app/lib/sitemap-helper.js
export const baseUrl = "https://meragadi.com";

// ডাটা ফেচ করার জন্য হেল্পার (রিট্রাই সহ)
export async function fetchWithRetry(url, retries = 3, timeout = 10000) {
  for (let i = 0; i < retries; i++) {
    try {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), timeout);

      const res = await fetch(url, {
        signal: controller.signal,
        next: { revalidate: 86400 }, // 24 ঘন্টা ক্যাশ
        headers: {
          'Content-Type': 'application/json',
        },
      });

      clearTimeout(timer);
      
      if (res.ok) {
        return res;
      } else {
        console.log(`Attempt ${i + 1} failed with status ${res.status}`);
      }
    } catch (err) {
      console.log(`Attempt ${i + 1} failed:`, err.message);
      if (i === retries - 1) throw err;
    }
  }
}

// XML জেনারেট করার জন্য হেল্পার
export function generateSitemap(urls, includeImages = false) {
  const imageNamespace = includeImages 
    ? ' xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"' 
    : '';
  
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"${imageNamespace}>
${urls.map(url => `
  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    ${url.changefreq ? `<changefreq>${url.changefreq}</changefreq>` : ''}
    ${url.priority ? `<priority>${url.priority}</priority>` : ''}
    ${url.image ? `
    <image:image>
      <image:loc>${url.image}</image:loc>
      <image:title>${url.imageTitle || ''}</image:title>
    </image:image>` : ''}
  </url>`).join('')}
</urlset>`;
  
  return xml;
}

// ক্যাশ হেডার সহ রেসপন্স রিটার্ন
export function returnSitemap(xml) {
  return new Response(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate',
      'X-Content-Type-Options': 'nosniff',
    },
  });
}