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
};

export const PROJECTS: Project[] = [
  {
    featured: true,
    badge: 'Thesis Project · AI/ML',
    title: 'SmartGrow — AI Crop Health System',
    description:
      'A Flutter mobile app that uses dual AI (TensorFlow Lite offline + Gemini AI cloud) to detect diseases in Tomato, Red Onion, and Garlic crops from photos. Gives farmers actionable advice and tracks crop health over 7 days. Evaluated with Accuracy, Precision, Recall, and F1-Score; app quality tested against ISO/IEC 25010.',
    tech: ['Flutter', 'TensorFlow Lite', 'Gemini AI', 'Firebase', 'Dart', 'ISO/IEC 25010'],
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
    links: [{ type: 'soon', label: 'GitHub coming soon' }],
  },
  {
    badge: 'Web Platform',
    title: 'Tourist Spots Platform',
    description:
      'A discovery site for local tourist spots with details, photos, and booking info. Built with Next.js and Drizzle ORM, using UploadThing for image hosting and deployed on Vercel.',
    tech: ['Next.js', 'Drizzle ORM', 'UploadThing', 'Tailwind CSS', 'Vercel'],
    links: [
      { type: 'live', href: PROJECT_URLS.touristspots },
      { type: 'github', href: GITHUB_REPOS.touristspots },
    ],
  },
  {
    badge: 'Fintech · Mobile',
    title: 'CIMB Bank Mobile Application',
    description:
      'Contributed to a mobile banking app by building features for money transfers, account management, and secure login. Improved UI/UX across different device sizes.',
    tech: ['React Native', 'Mobile Banking', 'Security', 'Fintech'],
    links: [{ type: 'soon', label: 'Case study coming soon' }],
  },
  {
    badge: 'Gov · Web App',
    title: 'Barangay Incident & Complaint Report System',
    description:
      'Replaced paper logbooks with a web system for barangay staff to manage incident reports digitally. Built with PHP, session-based auth, and tested on XAMPP.',
    tech: ['PHP', 'MySQL', 'Bootstrap', 'XAMPP'],
    links: [
      { type: 'live', href: PROJECT_URLS.bicrs },
      { type: 'github', href: GITHUB_REPOS.pos },
    ],
  },
];
