import About from '@/components/About';
import Contact from '@/components/Contact';
import Experience from '@/components/Experience';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import Nav from '@/components/Nav';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import SectionDivider from '@/components/ui/SectionDivider';

/**
 * Home page — stacks section components (LEGO bricks).
 * Each piece lives in components/ with PascalCase names and one job.
 */
export default function Home() {
  return (
    <main className="relative z-10 pt-[60px]">
      <Nav />
      <Hero />
      <SectionDivider />
      <About />
      <SectionDivider />
      <Experience />
      <SectionDivider />
      <Skills />
      <SectionDivider />
      <Projects />
      <SectionDivider />
      <Contact />
      <Footer />
    </main>
  );
}
