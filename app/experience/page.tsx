import Experience from '@/components/Experience';

export const metadata = {
  title: 'Experience — Bernard C. Mangulabnan',
  description: 'See Bernard Mangulabnan’s work history, freelance experience, and real-world project contributions.',
};

export default function ExperiencePage() {
  return (
    <main className="relative z-10 pt-[60px]">
      <Experience />
    </main>
  );
}
