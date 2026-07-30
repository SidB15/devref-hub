# DevRef Hub — automated content site

Programmatic reference content for developers (cron syntax, regex, HTTP codes, git, etc.). Fully
scriptable end to end: content lives as data (`content/articles/*.json`), `src/generate.mjs` renders
it to static HTML in `dist/`, and new articles get added by pulling the next entry off
`data/topics.json`'s `queue` and writing a new article JSON file — a task a scheduled agent run can do
on its own with no human involvement.

## Content types

- **Reference/cheat-sheet articles** — `data/topics.json` tracks published vs. queued topics.
- **Integration guides** ("Connect X to Y") — `data/integration-queue.json` tracks published vs. queued pairs, `data/tools.json` is the tool registry. Same generator, same JSON article format in `content/articles/`; each guide should cover a native option (if one exists), Zapier/Make, and a raw API/webhook approach. Verify actual integration capabilities before writing — don't assume a native integration exists.

## Build locally

```
npm run build   # writes dist/
```

## One-time human setup (I cannot do this part — needs a real account)

1. **GitHub repo**: create an empty repo and push this folder to it (I can do the `git init`/commit/push
   once you've created the empty repo and given me the remote URL — creating the GitHub account/repo
   itself needs you, since it requires GitHub login).
2. **Hosting**: connect the repo to [Vercel](https://vercel.com) or [Netlify](https://netlify.com) (free
   tier). Build command: `npm run build`. Output directory: `dist`. Both auto-deploy on every push — so
   once this is connected, scheduled commits go live with no further action.
3. **Domain (optional, do later)**: the site works fine on the free `*.vercel.app` / `*.netlify.app`
   subdomain to start. Only spend part of the $10 budget on a custom domain once there's early traffic —
   no point paying for a domain before the content/niche is validated.
4. **Monetization (do once there's some traffic/content history)**:
   - [Google AdSense](https://adsense.google.com) — needs a live site with real content and manual review;
     can take days to weeks for approval. Update `src/config.mjs`'s `baseUrl` to the real domain before
     applying, and swap the `.ad-slot` div in `src/templates.mjs` for the real AdSense snippet once approved.
   - Affiliate programs (optional, later) — pick ones relevant to a dev-tools audience if this niche gets traction.

## After setup

Once steps 1-2 are done, new content can be generated and published on a schedule with zero manual
steps: pull next topic from `data/topics.json`, write the article JSON, run `npm run build`, commit,
push. Vercel/Netlify picks up the push and redeploys automatically.

## Kill rule

If there are still 0 real visitors (outside of your own testing) after 30 days of scheduled publishing,
treat the niche/idea as not working — stop spending build cycles on new articles here and log why in
`../state/STATUS.md` before trying a different angle.
