# Canada Mortgages

Next.js site for Canada Mortgages, exported as static HTML and hosted on GitHub Pages.

Live site: https://l4liam2.github.io/Canada_morgages/

## Stack

- [Next.js](https://nextjs.org) 16 (App Router) with static export (`output: "export"`)
- React 19, TypeScript, Tailwind CSS 4
- Deployed by GitHub Actions to GitHub Pages on every push to `main`

## Local development

    npm install
    npm run dev

Because the site is published under the `/Canada_morgages/` path, the dev server serves it at
http://localhost:3000/Canada_morgages/ (the bare `/` route shows a 404).

To produce the same static build the workflow deploys:

    npm run build

The output lands in `out/`. Preview it with any static server, for example:

    npx serve out

## Project layout

- `src/app/` — routes, layouts, and global styles (App Router)
- `public/` — static files copied verbatim into the build (`public/images/...` is served at `/Canada_morgages/images/...`)
- `next.config.ts` — static export, `basePath`, trailing slashes, unoptimized images
- `.github/workflows/deploy.yml` — build and deploy pipeline

## Deploying

Push to `main`. The workflow installs dependencies, runs `next build`, and publishes `out/` to GitHub Pages.
Progress and the deployment URL are visible under the repository's Actions tab.

## Things to know about `basePath`

- `next/link` and `next/router` add the `/Canada_morgages` prefix automatically.
- `next/image` does **not**: write `src="/Canada_morgages/images/photo.jpg"`, not `src="/images/photo.jpg"`.
- Plain `<img>` tags and CSS `url()` references also need the prefix.

## Static export limits

Features that need a server are unavailable: API routes, server actions, middleware/proxy,
redirects and rewrites in `next.config.ts`, and the default `next/image` optimizer.
See the Next.js static export guide for the full list.

## Custom domain

To serve the site from your own domain:

1. Remove the `basePath` line from `next.config.ts` and drop the `/Canada_morgages` prefix from any image paths.
2. Add a `public/CNAME` file containing the domain, for example `www.example.ca`.
3. Point DNS at GitHub Pages: a `CNAME` record to `l4liam2.github.io` for a subdomain, or GitHub's A/AAAA records for an apex domain.
4. In the repository settings under Pages, set the custom domain and enable "Enforce HTTPS".
