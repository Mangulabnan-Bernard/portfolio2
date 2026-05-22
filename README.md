# Bernard C. Mangulabnan — Portfolio

A modern, responsive portfolio website built with Next.js 16, React 19, and Tailwind CSS v4.

## Features

- **Dark Theme Design**: Custom dark teal color scheme with subtle grid background
- **Typing Animation**: Dynamic role typing effect in the hero section
- **Scroll Reveal**: Smooth fade-in animations as you scroll through sections
- **Responsive Layout**: Fully responsive design for mobile, tablet, and desktop
- **Modern Stack**: Built with the latest Next.js App Router and Tailwind CSS v4

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **UI Library**: React 19
- **Styling**: Tailwind CSS v4
- **Fonts**: Sora (Sans), JetBrains Mono (Mono)
- **Language**: TypeScript

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure (Component-Based / LEGO Bricks)

This app follows React and Next.js component architecture:

1. **Small bricks** — reusable UI pieces in `components/` and `components/ui/`
2. **Section bricks** — one job per file (`Nav`, `Hero`, `About`, …) using PascalCase names
3. **Page assembly** — `app/page.tsx` imports and stacks components (no giant single file)

```
portfolio/
├── app/
│   ├── globals.css          # Global styles and Tailwind
│   ├── layout.tsx           # Root layout, fonts, metadata
│   └── page.tsx             # Stacks section components (Home)
├── components/              # Section components (one job each)
│   ├── Nav.tsx
│   ├── Hero.tsx             # Client: typing animation
│   ├── About.tsx
│   ├── Experience.tsx
│   ├── Skills.tsx
│   ├── Projects.tsx         # Maps project data → ProjectCard
│   ├── Contact.tsx          # Contact info layout
│   ├── ContactForm.tsx      # Client: mailto form only
│   ├── Footer.tsx
│   ├── RevealSection.tsx    # Scroll reveal wrapper
│   └── ui/                  # Reusable UI bricks
│       ├── Section.tsx
│       ├── SectionHeader.tsx
│       ├── SectionDivider.tsx
│       ├── ProjectCard.tsx
│       └── ContactItem.tsx
├── hooks/
│   └── useScrollReveal.ts
├── lib/
│   ├── site.ts              # URLs (GitHub, LinkedIn, live sites)
│   └── projects.ts          # Project content (data only)
└── public/
    └── bernardpng.png
```

**Why this matters:** change the navbar once in `Nav.tsx` and it updates everywhere. Add a project by editing `lib/projects.ts`, not duplicating card markup. Fix contact form bugs in `ContactForm.tsx` without touching the rest of the page.

## Customization

### Profile Image

Add your photo as `public/bernardpng.png` (PNG with transparent background works best).

### Content

Update the content in each component file to personalize your portfolio:

- **Hero**: Update name, roles, and description
- **About**: Update bio, education, and highlights
- **Experience**: Update work history
- **Skills**: Update technical skills
- **Projects**: Update portfolio projects
- **Contact**: Update contact information

### Colors

The custom color theme is defined in `app/globals.css`. Modify the CSS variables to change the color scheme:

```css
--color-bg: #090e0c;
--color-teal: #00e5a0;
--color-text: #d4f0e3;
```

## Building for Production

```bash
npm run build
npm start
```

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
