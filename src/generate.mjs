import { readdirSync, readFileSync, writeFileSync, mkdirSync, rmSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { site } from "./config.mjs";
import { renderArticle, renderIndex } from "./templates.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const articlesDir = join(root, "content", "articles");
const distDir = join(root, "dist");

function loadArticles() {
  return readdirSync(articlesDir)
    .filter((f) => f.endsWith(".json"))
    .map((f) => JSON.parse(readFileSync(join(articlesDir, f), "utf8")));
}

function loadTools() {
  const { tools } = JSON.parse(readFileSync(join(root, "data", "tools.json"), "utf8"));
  return Object.fromEntries(tools.map((t) => [t.slug, t]));
}

function writeFile(path, content) {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, content, "utf8");
}

function build() {
  rmSync(distDir, { recursive: true, force: true });
  const articles = loadArticles();
  const tools = loadTools();

  for (const article of articles) {
    writeFile(join(distDir, article.slug, "index.html"), renderArticle(article, tools));
  }
  writeFile(join(distDir, "index.html"), renderIndex(articles));

  const urls = [
    `${site.baseUrl}/`,
    ...articles.map((a) => `${site.baseUrl}/${a.slug}/`),
  ];
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${u}</loc></url>`).join("\n")}
</urlset>`;
  writeFile(join(distDir, "sitemap.xml"), sitemap);
  writeFile(join(distDir, "robots.txt"), `User-agent: *\nAllow: /\nSitemap: ${site.baseUrl}/sitemap.xml\n`);

  console.log(`Built ${articles.length} articles -> ${distDir}`);
}

build();
