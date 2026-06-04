import { GITHUB_REPOS, PROJECT_URLS } from '@/lib/site';

export type ProjectLink =
  | { type: 'live'; href: string; label?: string }
  | { type: 'github'; href: string }
  | { type: 'download'; href: string; label?: string }
  | { type: 'soon'; label: string };

export type Project = {
  badge: string;
  title: string;
  description: string;
  tech: string[];
  links: ProjectLink[];
  featured?: boolean;
  /** Per-project accent (hex) used for the cover gradient and badge. */
  accent?: string;
  /** Optional custom cover image (e.g. '/projects/smartgrow.png'). Falls back
   *  to a live screenshot or a gradient cover when omitted. */
  image?: string;
  /** Optional gallery of (mobile) screenshots shown in a phone-frame carousel. */
  images?: string[];
  /** Primary category used by the projects filter. */
  category: 'web' | 'mobile';
};

export const PROJECTS: Project[] = [
  {
    featured: true,
    badge: 'Thesis Project · AI/ML',
    title: 'Smart Grow – AI Crop Health Monitor',
    description:
      'A Flutter mobile app that diagnoses Tomato, Red Onion, and Garlic crops with machine learning from photos. Tracks health over 7 days and gives actionable guidance for growers. Evaluated using Accuracy, Precision, Recall, and F1-Score, with app quality assessed against ISO/IEC 25010.',
    tech: ['Flutter', 'Dart', 'Android & iOS', 'Machine Learning', 'TensorFlow'],
    accent: '#22c55e',
    category: 'mobile',
    image: '/projects/smartgrow1.png',
    images: [
      '/projects/smartgrow1.png',
      '/projects/smartgrow2.png',
      '/projects/smartgrow3.png',
      '/projects/smartgrow4.png',
      '/projects/smartgrow5.png',
      '/projects/smartgrow6.png',
      '/projects/smartgrow7.png',
    ],
    links: [
      { type: 'soon', label: 'Demo coming soon' },
      { type: 'soon', label: 'GitHub coming soon' },
    ],
  },
  {
    badge: 'Prototype · Mobile App',
    title: 'Anong Ulam Today? — Filipino Recipe Helper',
    description:
      'A Flutter prototype for mobile and web that helps users choose ulam, browse recipes, manage fridge ingredients, and add new dishes. It includes timed greetings, random recipe discovery, ingredient chips, and recipe details with step-by-step cooking instructions.',
    tech: ['Flutter', 'Dart', 'Riverpod', 'GoRouter', 'Mobile', 'Web'],
    accent: '#fb7185',
    category: 'mobile',
    image: '/projects/ulam1.png',
    images: [
      '/projects/ulam1.png',
      '/projects/ulam2.png',
      '/projects/ulam3.png',
      '/projects/ulam4.png',
      '/projects/ulam5.png',
      '/projects/ulam6.png',
    ],
    links: [
      { type: 'download', href: '/anong-ulam-today.apk', label: '↓ Download APK' },
      { type: 'github', href: GITHUB_REPOS.anongUlam },
    ],
  },
  {
    badge: 'EdTech · Web App',
    title: 'DevPath.hub — Guided Learning Platform',
    description:
      'A guided, interactive platform to learn a full tech stack from absolute scratch — every command explained, a built-in error solver, an "Explain Like I\'m 5" mode, project-based tracks, and progress saved to your account. Built as a Next.js full-stack app with Prisma, PostgreSQL, and Auth.js.',
    tech: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Prisma ORM', 'PostgreSQL', 'Auth.js', 'anime.js', 'Vercel'],
    accent: '#6366f1',
    category: 'web',
    links: [
      { type: 'live', href: PROJECT_URLS.devpath },
      { type: 'github', href: GITHUB_REPOS.devpath },
    ],
  },
  {
    badge: 'Web Platform · AI',
    title: 'RentAHuman — AI + Human Task Platform',
    description:
      'A Next.js + React + Tailwind marketing and app shell for a hire-humans-for-AI-tasks platform: browse agents, post and browse bounties, dashboards, API docs, and role-based access. Built to shape product UX and flows ahead of wiring up production database, auth, payments, and API.',
    tech: ['Next.js', 'React', 'Tailwind CSS', 'TypeScript', 'Vercel'],
    accent: '#8b5cf6',
    category: 'web',
    links: [
      { type: 'live', href: PROJECT_URLS.rentahuman },
      { type: 'github', href: GITHUB_REPOS.rentahumanWeb },
    ],
  },
  {
    badge: 'Web Platform',
    title: 'All4Home — Home Services Platform',
    description:
      'A marketplace where users can browse, book, and pay for home services (cleaning, electrical, grooming, and more). Providers can list their services; customers book easily from any device.',
    tech: ['Next.js', 'Tailwind CSS'],
    accent: '#3b82f6',
    category: 'web',
    links: [
      { type: 'live', href: PROJECT_URLS.all4home },
      { type: 'github', href: GITHUB_REPOS.all4home },
    ],
  },
  {
    badge: 'Web Platform',
    title: 'Tourist Spots Platform',
    description:
      'A discovery site that showcases tourist spots around Pampanga with details and photos. Built with Next.js and Prisma ORM, using UploadThing for image hosting and deployed on Vercel.',
    tech: ['Next.js', 'Prisma ORM', 'UploadThing', 'Tailwind CSS', 'Vercel'],
    accent: '#f59e0b',
    category: 'web',
    links: [
      { type: 'live', href: PROJECT_URLS.touristspots },
      { type: 'github', href: GITHUB_REPOS.touristspots },
    ],
  },
  {
    badge: 'Fintech · Mobile',
    title: 'ATM Go – Mobile Banking App',
    description:
      'A mobile banking app built with Flutter and Dart. Provides money transfers, account management, secure login, and a clean cross-device UI.',
    tech: ['Flutter', 'Dart', 'Android & iOS'],
    accent: '#06b6d4',
    category: 'mobile',
    links: [
      { type: 'github', href: GITHUB_REPOS.atmGo },
    ],
  },
  {
    badge: 'Gov · Web App',
    title: 'Barangay Incident & Complaint Report System',
    description:
      'A Next.js 16 full-stack app (App Router, TypeScript) that replaces paper logbooks with a digital workflow for barangay staff to file and manage incident reports. Tailwind UI, Prisma + MySQL data layer, and JWT-cookie + bcrypt auth — the backend folded into Next.js route handlers, so it runs as one app instead of two.',
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Prisma ORM', 'MySQL', 'JWT Auth'],
    accent: '#ef4444',
    category: 'web',
    links: [
      { type: 'live', href: PROJECT_URLS.barangay },
      { type: 'github', href: GITHUB_REPOS.barangay },
    ],
  },
];
