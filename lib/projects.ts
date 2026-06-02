import { GITHUB_REPOS, PROJECT_URLS } from '@/lib/site';

export type ProjectLink =
  | { type: 'live'; href: string; label?: string }
  | { type: 'github'; href: string }
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
};

export const PROJECTS: Project[] = [
  {
    featured: true,
    badge: 'Thesis Project · AI/ML',
    title: 'Smart Grow – AI Crop Health Monitor',
    description:
      'A Flutter mobile app that diagnoses Tomato, Red Onion, and Garlic crops with machine learning from photos. Tracks health over 7 days and gives actionable guidance for growers. Evaluated using Accuracy, Precision, Recall, and F1-Score, with app quality assessed against ISO/IEC 25010.',
    tech: ['Flutter', 'Machine Learning', 'TensorFlow Lite', 'Dart', 'AI', 'ISO/IEC 25010'],
    accent: '#22c55e',
    images: [
      '/projects/smartgrow-1.png',
      '/projects/smartgrow-2.png',
      '/projects/smartgrow-3.png',
      '/projects/smartgrow-4.png',
      '/projects/smartgrow-5.png',
      '/projects/smartgrow-6.png',
      '/projects/smartgrow-7.png',
    ],
    links: [
      { type: 'soon', label: 'Demo coming soon' },
      { type: 'github', href: GITHUB_REPOS.atmGo },
    ],
  },
  {
    badge: 'Web Platform · AI',
    title: 'RentHuman — AI + Human Task Platform',
    description:
      'A Next.js + React + Tailwind marketing and app shell for a hire-humans-for-AI-tasks platform: browse agents, post and browse bounties, dashboards, API docs, and role-based access. Built to shape product UX and flows ahead of wiring up production database, auth, payments, and API.',
    tech: ['Next.js', 'React', 'Tailwind CSS', 'TypeScript', 'Vercel'],
    accent: '#8b5cf6',
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
    tech: ['Next.js', 'React', 'Tailwind CSS', 'Node.js'],
    accent: '#3b82f6',
    links: [{ type: 'soon', label: 'GitHub coming soon' }],
  },
  {
    badge: 'Web Platform',
    title: 'Tourist Spots Platform',
    description:
      'A discovery site that showcases tourist spots around Pampanga with details and photos. Built with Next.js and Drizzle ORM, using UploadThing for image hosting and deployed on Vercel.',
    tech: ['Next.js', 'Drizzle ORM', 'UploadThing', 'Tailwind CSS', 'Vercel'],
    accent: '#f59e0b',
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
    tech: ['Flutter', 'Dart', 'Mobile Banking', 'UI/UX'],
    accent: '#06b6d4',
    links: [{ type: 'soon', label: 'Case study coming soon' }],
  },
  {
    badge: 'Gov · Web App',
    title: 'Barangay Incident & Complaint Report System',
    description:
      'Replaced paper logbooks with a web system for barangay staff to manage incident reports digitally. Built with PHP, session-based auth, and tested on XAMPP.',
    tech: ['PHP', 'MySQL', 'Bootstrap', 'XAMPP'],
    accent: '#ef4444',
    links: [
      { type: 'live', href: PROJECT_URLS.bicrs },
      { type: 'github', href: GITHUB_REPOS.pos },
    ],
  },
];
