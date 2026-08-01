import { site } from "./config.mjs";

const baseStyles = `
  :root {
    color-scheme: light dark;
    --bg: #ffffff;
    --fg: #16181d;
    --muted: #62687a;
    --border: #e3e5ea;
    --surface: #f6f7f9;
    --accent: #4338ca;
    --accent-fg: #ffffff;
    --code-bg: #f3f3f7;
    --shadow: 0 1px 2px rgba(20,20,30,.04), 0 8px 24px rgba(20,20,30,.05);
  }
  @media (prefers-color-scheme: dark) {
    :root {
      --bg: #0c0d11;
      --fg: #e7e8ec;
      --muted: #9296a3;
      --border: #24262e;
      --surface: #15161c;
      --accent: #8b85f5;
      --accent-fg: #0c0d11;
      --code-bg: #17181f;
      --shadow: 0 1px 2px rgba(0,0,0,.3), 0 8px 24px rgba(0,0,0,.35);
    }
  }
  * { box-sizing: border-box; }
  body {
    font: 16px/1.65 -apple-system, "Segoe UI", Roboto, sans-serif;
    max-width: 760px; margin: 0 auto; padding: 0 1.25rem 4rem;
    background: var(--bg); color: var(--fg);
  }
  a { color: var(--accent); }
  header { display: flex; align-items: center; gap: .75rem; padding: 1.75rem 0; border-bottom: 1px solid var(--border); margin-bottom: 2rem; }
  header a.brand { display: flex; align-items: center; gap: .75rem; text-decoration: none; color: inherit; }
  .logo-mark {
    width: 2rem; height: 2rem; border-radius: 8px; flex: none;
    background: linear-gradient(135deg, var(--accent), #9089f0);
    display: flex; align-items: center; justify-content: center;
    color: #fff; font-weight: 700; font-size: .95rem;
  }
  header h1 { font-size: 1.15rem; margin: 0; letter-spacing: -.01em; }
  header p { margin: .1rem 0 0; color: var(--muted); font-size: .85rem; }
  main h1 { font-size: 1.85rem; margin-bottom: .3rem; letter-spacing: -.015em; line-height: 1.25; }
  main h2 { font-size: 1.25rem; margin-top: 2.25rem; letter-spacing: -.01em; }
  .meta { color: var(--muted); font-size: .85rem; margin-bottom: 2rem; }
  p { color: var(--fg); }
  ul, ol { padding-left: 1.25rem; }
  li { margin: .3rem 0; }
  pre {
    background: var(--code-bg); border: 1px solid var(--border);
    padding: .9rem 1rem; overflow-x: auto; border-radius: 8px; font-size: .85rem;
  }
  code {
    background: var(--code-bg); border: 1px solid var(--border);
    padding: .1rem .35rem; border-radius: 4px; font-size: .85em;
    font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  }
  pre code { background: none; border: none; padding: 0; }
  table {
    border-collapse: separate; border-spacing: 0; width: 100%; margin: 1.25rem 0;
    border: 1px solid var(--border); border-radius: 8px; overflow: hidden; font-size: .9rem;
  }
  th, td { padding: .55rem .75rem; text-align: left; border-bottom: 1px solid var(--border); }
  th { background: var(--surface); font-weight: 600; }
  tr:last-child td { border-bottom: none; }
  tbody tr:nth-child(even) { background: var(--surface); }
  .article-list { list-style: none; padding: 0; display: flex; flex-direction: column; gap: .75rem; }
  .article-list li {
    border: 1px solid var(--border); border-radius: 10px; padding: 1rem 1.15rem;
    transition: box-shadow .15s ease, border-color .15s ease;
  }
  .article-list li:hover { box-shadow: var(--shadow); border-color: color-mix(in srgb, var(--accent) 35%, var(--border)); }
  .article-list a { text-decoration: none; font-weight: 600; color: var(--fg); }
  .article-list a:hover { color: var(--accent); }
  .article-list p { margin: .35rem 0 0; color: var(--muted); font-size: .9rem; }
  .badge {
    display: inline-block; font-size: .7rem; font-weight: 600; letter-spacing: .02em;
    text-transform: uppercase; padding: .15rem .5rem; border-radius: 999px;
    background: var(--surface); color: var(--muted); border: 1px solid var(--border);
    margin-bottom: .5rem;
  }
  .ad-slot {
    margin: 2.5rem 0; padding: 1rem; border: 1px dashed var(--border);
    text-align: center; font-size: .8rem; color: var(--muted); border-radius: 8px;
  }
  .tool-links { display: flex; gap: .75rem; flex-wrap: wrap; margin: 2.5rem 0; }
  .tool-links a {
    background: var(--accent); color: var(--accent-fg); border-radius: 999px;
    padding: .55rem 1.15rem; text-decoration: none; font-size: .9rem; font-weight: 600;
    transition: opacity .15s ease;
  }
  .tool-links a:hover { opacity: .85; }
  footer { margin-top: 3.5rem; padding-top: 1.25rem; border-top: 1px solid var(--border); font-size: .8rem; color: var(--muted); }
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
  <a href="/" class="brand">
    <span class="logo-mark">${site.name.charAt(0)}</span>
    <span><h1>${site.name}</h1><p>${site.tagline}</p></span>
  </a>
</header>
<main>
${body}
</main>
<div class="ad-slot">[ ad slot — enable once AdSense is approved ]</div>
<footer>&copy; ${new Date().getFullYear()} ${site.name}</footer>
</body>
</html>`;
}

function renderToolLinks(article, tools) {
  if (!article.tools?.length) return "";
  const links = article.tools
    .map((slug) => tools[slug])
    .filter(Boolean)
    .map((tool) => {
      const isAffiliate = Boolean(tool.affiliateUrl);
      const href = tool.affiliateUrl || tool.homepage;
      const rel = isAffiliate ? "sponsored noopener" : "noopener";
      return `<a href="${href}" rel="${rel}" target="_blank">Visit ${tool.name} &rarr;</a>`;
    })
    .join("\n");
  return links ? `<div class="tool-links">\n${links}\n</div>` : "";
}

export function renderArticle(article, tools = {}) {
  const canonical = `${site.baseUrl}/${article.slug}/`;
  const body = `
<h1>${article.title}</h1>
<p class="meta">Updated ${article.publishDate}</p>
${article.bodyHtml}
${renderToolLinks(article, tools)}
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
    .map((a) => {
      const badge = a.tools?.length ? "Integration Guide" : "Reference";
      return `<li><span class="badge">${badge}</span><br><a href="/${a.slug}/">${a.title}</a><p>${a.description}</p></li>`;
    })
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
