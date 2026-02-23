/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://scootylelo.com",

  generateRobotsTxt: true,

  sitemapSize: 50000,          // বড় করে দাও
  generateIndexSitemap: false, // ⭐ এইটাই মূল সমাধান

  changefreq: "daily",
  priority: 0.7,

  exclude: ["/search", "/admin/*", "/dashboard/*"],
};

