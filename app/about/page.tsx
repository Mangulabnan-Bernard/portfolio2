import About from '@/components/About';

export const metadata = {
  title: 'About — Bernard C. Mangulabnan',
  description: 'Learn more about Bernard Mangulabnan, his background, skills, and interests in web development.',
};

export default function AboutPage() {
  return (
    <main className="relative z-10 pt-[60px]">
      <About />
    </main>
  );
}
