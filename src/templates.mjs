import { site } from "./config.mjs";

const baseStyles = `
  :root { color-scheme: light dark; }
  body { font: 16px/1.6 -apple-system, Segoe UI, Roboto, sans-serif; max-width: 760px; margin: 0 auto; padding: 0 1.25rem 3rem; }
  header { padding: 1.5rem 0 1rem; border-bottom: 1px solid #8883; margin-bottom: 1.5rem; }
  header a { text-decoration: none; color: inherit; }
  header h1 { font-size: 1.25rem; margin: 0; }
  header p { margin: .25rem 0 0; opacity: .7; font-size: .9rem; }
  main h1 { font-size: 1.75rem; margin-bottom: .25rem; }
  .meta { opacity: .6; font-size: .85rem; margin-bottom: 1.5rem; }
  pre { background: #8881; padding: .75rem 1rem; overflow-x: auto; border-radius: 6px; }
  code { background: #8881; padding: .1rem .3rem; border-radius: 4px; font-size: .9em; }
  pre code { background: none; padding: 0; }
  table { border-collapse: collapse; width: 100%; margin: 1rem 0; }
  th, td { border: 1px solid #8884; padding: .4rem .6rem; text-align: left; font-size: .95rem; }
  .article-list { list-style: none; padding: 0; }
  .article-list li { padding: .75rem 0; border-bottom: 1px solid #8882; }
  .article-list a { text-decoration: none; font-weight: 600; }
  .article-list p { margin: .25rem 0 0; opacity: .75; font-size: .9rem; }
  .ad-slot { margin: 2rem 0; padding: 1rem; border: 1px dashed #8886; text-align: center; font-size: .8rem; opacity: .5; }
  footer { margin-top: 3rem; padding-top: 1rem; border-top: 1px solid #8883; font-size: .8rem; opacity: .6; }
`;

function layout({ title, description, canonical, body }) {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<meta name="description" content="${description}">
<link rel="canonical" href="${canonical}">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${description}">
<meta property="og:type" content="website">
<style>${baseStyles}</style>
</head>
<body>
<header>
  <a href="/"><h1>${site.name}</h1><p>${site.tagline}</p></a>
</header>
<main>
${body}
</main>
<div class="ad-slot">[ ad slot — enable once AdSense is approved ]</div>
<footer>&copy; ${new Date().getFullYear()} ${site.name}</footer>
</body>
</html>`;
}

export function renderArticle(article) {
  const canonical = `${site.baseUrl}/${article.slug}/`;
  const body = `
<h1>${article.title}</h1>
<p class="meta">Updated ${article.publishDate}</p>
${article.bodyHtml}
`;
  return layout({
    title: `${article.title} | ${site.name}`,
    description: article.description,
    canonical,
    body,
  });
}

export function renderIndex(articles) {
  const items = articles
    .slice()
    .sort((a, b) => (a.publishDate < b.publishDate ? 1 : -1))
    .map(
      (a) => `<li><a href="/${a.slug}/">${a.title}</a><p>${a.description}</p></li>`
    )
    .join("\n");
  const body = `
<h1>Latest reference pages</h1>
<ul class="article-list">
${items}
</ul>
`;
  return layout({
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    canonical: `${site.baseUrl}/`,
    body,
  });
}
