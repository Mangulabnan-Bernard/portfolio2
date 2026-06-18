// Blog content lives here as data — add an entry and the index, the
// /blog/[slug] page, and the sitemap all pick it up automatically.
// `content` paragraphs are plain text; blank lines separate paragraphs.

export type Post = {
  slug: string;
  title: string;
  /** ISO date (YYYY-MM-DD). */
  date: string;
  excerpt: string;
  tags: string[];
  /** Body as an array of paragraphs (rendered in order). */
  content: string[];
  /** Hide from the index without deleting (drafts). */
  draft?: boolean;
};

export const POSTS: Post[] = [
  {
    slug: 'building-this-portfolio',
    title: 'How I built this portfolio',
    date: '2026-06-18',
    excerpt:
      'A quick look at the stack and decisions behind this site — Next.js App Router, a theme system driven by CSS variables, and a component-first structure.',
    tags: ['Next.js', 'React', 'Tailwind CSS'],
    content: [
      'This site is built with Next.js 16 (App Router), React 19, and Tailwind CSS v4. I wanted something fast, easy to extend, and genuinely mine — not a template I had to fight against.',
      'The whole theme system runs on CSS variables. Each palette (blue, green, orange) is just a block of variables, and a data-theme attribute on the html element swaps them all at once, so changing the look never means touching component code.',
      'Everything is built as small, single-purpose components that compose into sections, which pages stack together. Adding a project is a one-line edit to a data file — the card, the case-study page, the sitemap entry, and the social share card are all generated from it.',
      'This is the first post. I plan to use this space for short notes on what I am building and learning. Thanks for reading.',
    ],
  },
  {
    slug: 'what-im-learning-now',
    title: 'What I am focused on right now',
    date: '2026-06-12',
    excerpt:
      'A short "now" note — the tools and ideas I am spending the most time on at the moment.',
    tags: ['Now', 'Learning'],
    content: [
      'Right now I am going deeper on full-stack TypeScript: Next.js server components, data fetching patterns, and keeping the line between server and client code clean.',
      'On the mobile side I am continuing with Flutter, refining state management and shipping smoother UIs.',
      'I am also leaning into AI tooling as part of my everyday workflow — using it to move faster without losing the craft. Expect a few notes here on what works and what does not.',
    ],
  },
];

export function getPublishedPosts(): Post[] {
  return POSTS.filter((p) => !p.draft).sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): Post | undefined {
  return POSTS.find((p) => p.slug === slug);
}

export function formatDate(iso: string): string {
  // Deterministic across server/client — avoids hydration mismatches.
  const [y, m, d] = iso.split('-').map(Number);
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];
  return `${months[m - 1]} ${d}, ${y}`;
}
