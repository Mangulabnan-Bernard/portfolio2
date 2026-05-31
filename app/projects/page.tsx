import Projects from '@/components/Projects';

export const metadata = {
  title: 'Projects — Bernard C. Mangulabnan',
  description: 'Browse Bernard Mangulabnan’s project portfolio, including web platforms, mobile apps, and AI solutions.',
};

export default function ProjectsPage() {
  return (
    <main className="relative z-10 pt-[60px]">
      <Projects />
    </main>
  );
}
