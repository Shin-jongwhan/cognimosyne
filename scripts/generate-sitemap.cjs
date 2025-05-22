const fs = require("fs");
const path = require("path");

const baseUrl = "https://www.cognimosyne.com";
const pagesDir = path.join(__dirname, "../src/pages");
const outputPath = path.join(__dirname, "../public/sitemap.xml");

function getRoutesFromFiles(dir) {
  const files = fs.readdirSync(dir);
  return files
    .filter(file => file.endsWith(".tsx"))
    .map(file => {
      const name = path.basename(file, ".tsx");
      return name === "Home" || name === "index"
        ? "/"
        : "/" + name.toLowerCase();
    });
}

const routes = getRoutesFromFiles(pagesDir);
const today = new Date().toISOString().split("T")[0];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    route => `  <url>
    <loc>${baseUrl}${route}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

fs.writeFileSync(outputPath, sitemap, "utf-8");
console.log("✅ sitemap.xml generated at /public/sitemap.xml");
