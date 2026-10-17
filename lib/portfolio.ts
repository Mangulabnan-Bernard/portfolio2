import { PROJECTS, projectSlug, type Project } from '@/lib/projects';

type Presentation = {
  number: string;
  short: string;
  categoryLabel: string;
  discipline: string;
  tint: string;
  preview?: string;
};

const PRESENTATION: Record<string, Presentation> = {
  'smart-grow-ai-crop-health-monitor': { number: '01', short: 'AI crop disease detection', categoryLabel: 'MOBILE / ML', discipline: 'Thesis project', tint: '#b5ed65' },
  'barangay-incident-complaint-report-system': { number: '02', short: 'Digital incident reporting for barangay staff', categoryLabel: 'WEB / CIVIC', discipline: 'Full-stack application', tint: '#92c9ef', preview: '/portfolio-v4/projects/site-barangay.png' },
  'devpath-hub-guided-learning-platform': { number: '03', short: 'Step-by-step tech learning platform', categoryLabel: 'WEB / LEARNING', discipline: 'Guided learning platform', tint: '#b6b7ff', preview: '/portfolio-v4/projects/site-devpath.png' },
  'anong-ulam-today-filipino-recipe-helper': { number: '04', short: 'Filipino recipe and ingredient helper', categoryLabel: 'MOBILE / FOOD', discipline: 'Flutter prototype', tint: '#ffac7e' },
  'rentahuman-ai-human-task-platform': { number: '05', short: 'Prototype for AI-to-human task handoff', categoryLabel: 'WEB / PROTOTYPE', discipline: 'Product experience prototype', tint: '#d6b2ff', preview: '/portfolio-v4/projects/site-rentahuman.png' },
  'all4home-home-services-platform': { number: '06', short: 'Booking platform for home services', categoryLabel: 'WEB / MARKETPLACE', discipline: 'Home services platform', tint: '#a4c4ff', preview: '/portfolio-v4/projects/site-all4home.png' },
  'tourist-spots-platform': { number: '07', short: 'Pampanga travel directory', categoryLabel: 'WEB / DISCOVERY', discipline: 'Local discovery platform', tint: '#edcf84', preview: '/portfolio-v4/projects/site-tourist.png' },
  'atm-go-mobile-banking-app': { number: '08', short: 'Flutter mobile banking app', categoryLabel: 'MOBILE / FINTECH', discipline: 'Mobile banking app', tint: '#90d9da', preview: '/portfolio-v4/projects/repo-atmgo-artwork.png' },
};

export type PortfolioProject = Project & Presentation & { slug: string; previewImage: string };

export const PORTFOLIO_PROJECTS: PortfolioProject[] = PROJECTS.map((project, index) => {
  const slug = projectSlug(project);
  const presentation = PRESENTATION[slug] ?? {
    number: String(index + 1).padStart(2, '0'), short: project.badge,
    categoryLabel: project.category.toUpperCase(), discipline: project.badge,
    tint: project.accent ?? '#b5ed65',
  };
  return { ...project, ...presentation, slug, previewImage: presentation.preview ?? project.images?.[0] ?? project.image ?? '/portfolio-v4/projects/repo-atmgo-artwork.png' };
});

export function getPortfolioProject(slug: string) {
  return PORTFOLIO_PROJECTS.find((project) => project.slug === slug);
}
