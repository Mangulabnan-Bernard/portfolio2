import About from '@/components/About';
import Contact from '@/components/Contact';
import Experience from '@/components/Experience';
import Hero from '@/components/Hero';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import SectionDivider from '@/components/ui/SectionDivider';

/**
 * Home page — summary version of each main section.
 */
export default function Home() {
  return (
    <main className="relative z-10 pt-[60px]">
      <Hero />
      <SectionDivider />
      <About summary />
      <SectionDivider />
      <Experience summary />
      <SectionDivider />
      <Skills summary />
      <SectionDivider />
      <Projects summary />
      <SectionDivider />
      <Contact summary />
    </main>
  );
}
