# Chad Denie, Mortgage Agent — website

Next.js 16 site for Chad Denie (Mortgage Agent Level 2, Mortgageville, Toronto), exported as
static HTML and hosted on GitHub Pages. Warm cream and terracotta design with a blog, mortgage
calculator, contact form, booking page, FAQ, and testimonials.

Live site: https://l4liam2.github.io/Canada_morgages/

## Stack

- [Next.js](https://nextjs.org) 16 (App Router) with static export (`output: "export"`)
- React 19, TypeScript, Tailwind CSS 4, `react-markdown` for blog posts
- Deployed by GitHub Actions to GitHub Pages on every push to `main`

## Local development

    npm install
    npm run dev

Because the site is published under the `/Canada_morgages/` path, the dev server serves it at
http://localhost:3000/Canada_morgages/ (the bare `/` route shows a 404).

To produce the same static build the workflow deploys:

    npm run build

The output lands in `out/`. `npm run lint` runs ESLint.

## Before launch: fill in the TODOs

Everything site-specific lives in one file: `src/config/site.ts`. Search it for `TODO`.

| Item | Where | Why |
| --- | --- | --- |
| Chad's FSRA agent licence number | `site.agentLicence` | Required on Ontario mortgage advertising |
| Mortgageville brokerage licence number | `site.brokerage.licence` | Same requirement |
| Direct phone / email (optional) | `site.contact` | Currently the Mortgageville office line and inbox |
| Calendly (or similar) link | `site.links.booking` | Activates the embedded calendar on `/book` |
| Formspree form ID | `site.formspreeId` | Makes the contact form email Chad. Free at formspree.io. Without it, the form falls back to opening the visitor's email client |
| Custom domain | `site.url` and `next.config.ts` | See "Custom domain" below |

**Testimonials** in `src/content/testimonials.ts` are sample placeholders written to show the
layout. Replace them with real, permission-granted client reviews before promoting the site.

## Editing content

- **Blog posts:** add a Markdown file to `content/blog/`. Copy an existing post for the front
  matter (`title`, `excerpt`, `date`, `category`, `featured`). The file name becomes the URL slug.
  Posts appear automatically, newest first.
- **Services:** `src/content/services.ts` (set `featured: true` to show on the home page).
- **FAQ:** `src/content/faq.ts`.
- **Process steps and stats:** `src/content/process.ts`.
- **Photos:** `public/images/` (portrait, small portrait, and square crop of the headshot).
- **Favicons:** built from `favicon/` (warm palette installed in `src/app/`; see `favicon/README.md`).

## Calculator assumptions

`src/components/MortgageCalculator.tsx` uses semi-annual compounding (the Canadian standard for
fixed-rate mortgages), default insurance tiers of 2.80% / 3.10% / 4.00% for loan-to-value bands
above 80%, the federal minimum down payment rules, and a stress-test floor of 5.25% or contract
rate plus 2%. These are constants at the top of the file. Update them if the rules change.

## Project layout

- `src/app/` — routes, layouts, global styles, sitemap, robots, manifest, icons
- `src/components/` — header, footer, cards, calculator, contact form, FAQ accordion, booking embed
- `src/config/site.ts` — all contact details, licence numbers, links, and navigation
- `src/content/` — services, FAQ, testimonials, process copy
- `src/lib/blog.ts` — Markdown loader for `content/blog/`; `src/lib/paths.ts` — base-path helper
- `content/blog/` — blog posts as Markdown
- `public/` — static files copied verbatim into the build
- `next.config.ts` — static export, `basePath`, trailing slashes, unoptimized images
- `.github/workflows/deploy.yml` — build and deploy pipeline

## Deploying

Push to `main`. The workflow installs dependencies, runs `next build`, and publishes `out/` to
GitHub Pages. Progress and the deployment URL are visible under the repository's Actions tab.

## Things to know about `basePath`

- `next/link` adds the `/Canada_morgages` prefix automatically.
- `next/image`, plain `<img>`, metadata images, and the web manifest do **not**. Wrap those paths in
  `assetPath()` from `src/lib/paths.ts`, which reads the base path from `next.config.ts`.

## Static export limits

Features that need a server are unavailable: API routes, server actions, middleware/proxy,
redirects and rewrites in `next.config.ts`, and the default `next/image` optimizer. The contact
form therefore posts to Formspree from the browser.

## Custom domain

To serve the site from your own domain:

1. Set `basePath` to `""` in `next.config.ts` and update `site.url` in `src/config/site.ts`.
2. Add a `public/CNAME` file containing the domain, for example `www.example.ca`.
3. Point DNS at GitHub Pages: a `CNAME` record to `l4liam2.github.io` for a subdomain, or GitHub's
   A/AAAA records for an apex domain.
4. In the repository settings under Pages, set the custom domain and enable "Enforce HTTPS".
