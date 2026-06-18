# Bernard C. Mangulabnan — Portfolio

A modern, responsive developer portfolio built with **Next.js 16 (App Router)**, **React 19**, and **Tailwind CSS v4**. Multi-page, themeable, installable as a PWA, and wired up with a working contact form and privacy-friendly analytics.

🔗 **Live:** [bernardmangulabnan.com](https://www.bernardmangulabnan.com)

## Features

- **Multi-page App Router** — dedicated routes for Home, About, Experience, Skills, Projects, and Contact, with a shared dock navigation.
- **Animated hero** — typing role animation, a live "code editor" card, and a faux terminal.
- **Project case studies** — each project has its own page at `/projects/[slug]` with a tech-stack sidebar, screenshot gallery, prev/next navigation, and an auto-generated branded social (OG) share card.
- **Projects explorer** — filter by web/mobile and switch between five layouts (explorer, compact, spotlight, list, story).
- **Recent GitHub activity** — the home page pulls your latest public repos from the GitHub API (cached hourly).
- **Scroll affordances** — a reading-progress bar and a back-to-top button, plus scroll-reveal animations.
- **Multiple themes** — blue (default), green, and orange palettes driven by CSS variables and a `data-theme` switch, with no flash of the wrong theme on load.
- **Working contact form** — sends email via [Resend](https://resend.com) through an API route, with a honeypot field and in-memory rate limiting.
- **Installable PWA** — web app manifest and a service worker.
- **Privacy-friendly analytics** — [PostHog](https://posthog.com) page views, plus a password-gated `/insights` dashboard.
- **SEO** — per-page metadata, Open Graph images, `sitemap.xml`, and `robots.txt`.

## Tech Stack

- **Framework:** Next.js 16 (App Router, Turbopack)
- **UI:** React 19
- **Styling:** Tailwind CSS v4
- **Language:** TypeScript 5
- **Fonts:** Sora (sans), JetBrains Mono (mono)
- **Email:** Resend
- **Analytics:** PostHog
- **Hosting:** Vercel

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the dev server (Turbopack). |
| `npm run build` | Production build. |
| `npm start` | Serve the production build. |
| `npm run lint` | Run ESLint. |

## Environment Variables

Create a `.env.local` file. Everything below is optional in development — the
site degrades gracefully when a service isn't configured (e.g. the contact form
reports that email isn't set up, and the GitHub section simply hides itself).

```bash
# Canonical site URL (used for metadata). Defaults to the production URL.
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Contact form (Resend)
RESEND_API_KEY=re_xxx
CONTACT_FROM_EMAIL="Portfolio <onboarding@resend.dev>"

# Recent GitHub activity — optional; raises the unauthenticated rate limit.
GITHUB_TOKEN=ghp_xxx

# Analytics (PostHog) — client
NEXT_PUBLIC_POSTHOG_KEY=phc_xxx
NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com

# /insights dashboard — server
POSTHOG_PROJECT_ID=xxx
POSTHOG_PERSONAL_API_KEY=phx_xxx
POSTHOG_API_HOST=https://us.posthog.com
INSIGHTS_PASSWORD=your-dashboard-password
```

## Project Structure (Component-Based / LEGO Bricks)

Small, single-purpose components compose into section components, which pages
stack together — so a change in one brick updates everywhere it's used.

```
portfolio/
├── app/
│   ├── globals.css            # Tailwind + theme palettes (CSS variables)
│   ├── layout.tsx             # Root layout: fonts, metadata, nav, footer, providers
│   ├── page.tsx               # Home — stacks the section components
│   ├── about|experience|skills|projects|contact/  # Page routes
│   ├── projects/[slug]/       # Per-project case study + OG image
│   ├── insights/              # Password-gated analytics dashboard
│   ├── api/                   # Route handlers (contact, insights)
│   ├── opengraph-image.tsx    # Site-wide social card
│   ├── sitemap.ts • robots.ts # SEO
├── components/                # Section + shared components (one job each)
│   ├── Hero • About • Experience • Skills • Projects • Contact • Footer • Nav
│   ├── ScrollProgress • ThemeSwitcher • Pwa • PostHogProvider
│   ├── GithubActivity • ContactForm • RevealSection
│   └── ui/                    # Reusable UI bricks (cards, covers, galleries, …)
├── hooks/
│   └── useScrollReveal.ts     # IntersectionObserver-based reveal
├── lib/
│   ├── site.ts                # URLs (site, GitHub, LinkedIn, project links)
│   └── projects.ts            # Project content + slug helpers (data only)
└── public/                    # Images, manifest, service worker, CV, APK
```

## Customization

- **Projects:** edit `lib/projects.ts` — add an entry and a case-study page,
  sitemap URL, and OG card are generated automatically.
- **Links / handles:** edit `lib/site.ts`.
- **Content:** edit the matching section component in `components/`.
- **Colors / themes:** edit the CSS variables under each `[data-theme]` block in
  `app/globals.css`.

## Deploy

Deploys cleanly to [Vercel](https://vercel.com/new). Add the environment
variables above in the project settings, then push to deploy.

```bash
npm run build
npm start   # to preview the production build locally
```
