import RevealSection from '@/components/RevealSection';
import Section from '@/components/ui/Section';
import SectionHeader from '@/components/ui/SectionHeader';

export default function Skills() {
  return (
    <Section id="skills">
      <SectionHeader label="Technical Skills" title="My Stack_" />
      <RevealSection className="skills-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <div className="skill-category bg-surface border border-border rounded-[14px] p-6 transition-colors hover:border-teal-3 hover:-translate-y-0.5">
          <div className="skill-cat-header flex items-center gap-2 mb-4 pb-3 border-b border-border">
            <span className="skill-cat-icon text-[1.1rem]">🖥️</span>
            <span className="skill-cat-name font-mono text-[12px] font-semibold tracking-[0.1em] text-text uppercase">Front-End</span>
          </div>
          <div className="skill-pills flex flex-wrap gap-2">
            <span className="pill font-mono text-[10px] tracking-[0.05em] px-2 py-1 bg-teal/6 border border-teal/15 text-teal-2 rounded-[20px]">HTML5</span>
            <span className="pill font-mono text-[10px] tracking-[0.05em] px-2 py-1 bg-teal/6 border border-teal/15 text-teal-2 rounded-[20px]">CSS3</span>
            <span className="pill font-mono text-[10px] tracking-[0.05em] px-2 py-1 bg-teal/6 border border-teal/15 text-teal-2 rounded-[20px]">JavaScript ES6+</span>
            <span className="pill font-mono text-[10px] tracking-[0.05em] px-2 py-1 bg-teal/6 border border-teal/15 text-teal-2 rounded-[20px]">TypeScript</span>
            <span className="pill font-mono text-[10px] tracking-[0.05em] px-2 py-1 bg-teal/6 border border-teal/15 text-teal-2 rounded-[20px]">React.js</span>
            <span className="pill font-mono text-[10px] tracking-[0.05em] px-2 py-1 bg-teal/6 border border-teal/15 text-teal-2 rounded-[20px]">Next.js</span>
            <span className="pill font-mono text-[10px] tracking-[0.05em] px-2 py-1 bg-teal/6 border border-teal/15 text-teal-2 rounded-[20px]">Tailwind CSS</span>
            <span className="pill font-mono text-[10px] tracking-[0.05em] px-2 py-1 bg-teal/6 border border-teal/15 text-teal-2 rounded-[20px]">Responsive Design</span>
            <span className="pill font-mono text-[10px] tracking-[0.05em] px-2 py-1 bg-teal/6 border border-teal/15 text-teal-2 rounded-[20px]">PWA</span>
          </div>
        </div>

        <div className="skill-category bg-surface border border-border rounded-[14px] p-6 transition-colors hover:border-teal-3 hover:-translate-y-0.5">
          <div className="skill-cat-header flex items-center gap-2 mb-4 pb-3 border-b border-border">
            <span className="skill-cat-icon text-[1.1rem]">⚙️</span>
            <span className="skill-cat-name font-mono text-[12px] font-semibold tracking-[0.1em] text-text uppercase">Back-End & Database</span>
          </div>
          <div className="skill-pills flex flex-wrap gap-2">
            <span className="pill font-mono text-[10px] tracking-[0.05em] px-2 py-1 bg-teal/6 border border-teal/15 text-teal-2 rounded-[20px]">Node.js</span>
            <span className="pill font-mono text-[10px] tracking-[0.05em] px-2 py-1 bg-teal/6 border border-teal/15 text-teal-2 rounded-[20px]">Express.js</span>
            <span className="pill font-mono text-[10px] tracking-[0.05em] px-2 py-1 bg-teal/6 border border-teal/15 text-teal-2 rounded-[20px]">PostgreSQL</span>
            <span className="pill font-mono text-[10px] tracking-[0.05em] px-2 py-1 bg-teal/6 border border-teal/15 text-teal-2 rounded-[20px]">Drizzle ORM</span>
            <span className="pill font-mono text-[10px] tracking-[0.05em] px-2 py-1 bg-teal/6 border border-teal/15 text-teal-2 rounded-[20px]">MySQL</span>
            <span className="pill font-mono text-[10px] tracking-[0.05em] px-2 py-1 bg-teal/6 border border-teal/15 text-teal-2 rounded-[20px]">PHP</span>
            <span className="pill font-mono text-[10px] tracking-[0.05em] px-2 py-1 bg-teal/6 border border-teal/15 text-teal-2 rounded-[20px]">C++</span>
          </div>
        </div>

        <div className="skill-category bg-surface border border-border rounded-[14px] p-6 transition-colors hover:border-teal-3 hover:-translate-y-0.5">
          <div className="skill-cat-header flex items-center gap-2 mb-4 pb-3 border-b border-border">
            <span className="skill-cat-icon text-[1.1rem]">📱</span>
            <span className="skill-cat-name font-mono text-[12px] font-semibold tracking-[0.1em] text-text uppercase">Mobile</span>
          </div>
          <div className="skill-pills flex flex-wrap gap-2">
            <span className="pill font-mono text-[10px] tracking-[0.05em] px-2 py-1 bg-teal/6 border border-teal/15 text-teal-2 rounded-[20px]">Flutter</span>
            <span className="pill font-mono text-[10px] tracking-[0.05em] px-2 py-1 bg-teal/6 border border-teal/15 text-teal-2 rounded-[20px]">Dart</span>
            <span className="pill font-mono text-[10px] tracking-[0.05em] px-2 py-1 bg-teal/6 border border-teal/15 text-teal-2 rounded-[20px]">TensorFlow Lite</span>
            <span className="pill font-mono text-[10px] tracking-[0.05em] px-2 py-1 bg-teal/6 border border-teal/15 text-teal-2 rounded-[20px]">Firebase</span>
          </div>
        </div>

        <div className="skill-category bg-surface border border-border rounded-[14px] p-6 transition-colors hover:border-teal-3 hover:-translate-y-0.5">
          <div className="skill-cat-header flex items-center gap-2 mb-4 pb-3 border-b border-border">
            <span className="skill-cat-icon text-[1.1rem]">🤖</span>
            <span className="skill-cat-name font-mono text-[12px] font-semibold tracking-[0.1em] text-text uppercase">AI Tools</span>
          </div>
          <div className="skill-pills flex flex-wrap gap-2">
            <span className="pill font-mono text-[10px] tracking-[0.05em] px-2 py-1 bg-teal/6 border border-teal/15 text-teal-2 rounded-[20px]">Claude & Claude Code</span>
            <span className="pill font-mono text-[10px] tracking-[0.05em] px-2 py-1 bg-teal/6 border border-teal/15 text-teal-2 rounded-[20px]">ChatGPT</span>
            <span className="pill font-mono text-[10px] tracking-[0.05em] px-2 py-1 bg-teal/6 border border-teal/15 text-teal-2 rounded-[20px]">Cursor</span>
            <span className="pill font-mono text-[10px] tracking-[0.05em] px-2 py-1 bg-teal/6 border border-teal/15 text-teal-2 rounded-[20px]">Windsurf</span>
            <span className="pill font-mono text-[10px] tracking-[0.05em] px-2 py-1 bg-teal/6 border border-teal/15 text-teal-2 rounded-[20px]">Gemini AI</span>
            <span className="pill font-mono text-[10px] tracking-[0.05em] px-2 py-1 bg-teal/6 border border-teal/15 text-teal-2 rounded-[20px]">TensorFlow Lite</span>
          </div>
        </div>

        <div className="skill-category bg-surface border border-border rounded-[14px] p-6 transition-colors hover:border-teal-3 hover:-translate-y-0.5">
          <div className="skill-cat-header flex items-center gap-2 mb-4 pb-3 border-b border-border">
            <span className="skill-cat-icon text-[1.1rem]">☁️</span>
            <span className="skill-cat-name font-mono text-[12px] font-semibold tracking-[0.1em] text-text uppercase">Cloud & DevOps</span>
          </div>
          <div className="skill-pills flex flex-wrap gap-2">
            <span className="pill font-mono text-[10px] tracking-[0.05em] px-2 py-1 bg-teal/6 border border-teal/15 text-teal-2 rounded-[20px]">Vercel</span>
            <span className="pill font-mono text-[10px] tracking-[0.05em] px-2 py-1 bg-teal/6 border border-teal/15 text-teal-2 rounded-[20px]">AWS</span>
            <span className="pill font-mono text-[10px] tracking-[0.05em] px-2 py-1 bg-teal/6 border border-teal/15 text-teal-2 rounded-[20px]">Hostinger</span>
            <span className="pill font-mono text-[10px] tracking-[0.05em] px-2 py-1 bg-teal/6 border border-teal/15 text-teal-2 rounded-[20px]">Git</span>
            <span className="pill font-mono text-[10px] tracking-[0.05em] px-2 py-1 bg-teal/6 border border-teal/15 text-teal-2 rounded-[20px]">GitHub</span>
            <span className="pill font-mono text-[10px] tracking-[0.05em] px-2 py-1 bg-teal/6 border border-teal/15 text-teal-2 rounded-[20px]">CI/CD</span>
          </div>
        </div>

        <div className="skill-category bg-surface border border-border rounded-[14px] p-6 transition-colors hover:border-teal-3 hover:-translate-y-0.5">
          <div className="skill-cat-header flex items-center gap-2 mb-4 pb-3 border-b border-border">
            <span className="skill-cat-icon text-[1.1rem]">🛠️</span>
            <span className="skill-cat-name font-mono text-[12px] font-semibold tracking-[0.1em] text-text uppercase">Methodologies</span>
          </div>
          <div className="skill-pills flex flex-wrap gap-2">
            <span className="pill font-mono text-[10px] tracking-[0.05em] px-2 py-1 bg-teal/6 border border-teal/15 text-teal-2 rounded-[20px]">Agile / Scrum</span>
            <span className="pill font-mono text-[10px] tracking-[0.05em] px-2 py-1 bg-teal/6 border border-teal/15 text-teal-2 rounded-[20px]">REST APIs</span>
            <span className="pill font-mono text-[10px] tracking-[0.05em] px-2 py-1 bg-teal/6 border border-teal/15 text-teal-2 rounded-[20px]">Version Control</span>
            <span className="pill font-mono text-[10px] tracking-[0.05em] px-2 py-1 bg-teal/6 border border-teal/15 text-teal-2 rounded-[20px]">ISO/IEC 25010</span>
            <span className="pill font-mono text-[10px] tracking-[0.05em] px-2 py-1 bg-teal/6 border border-teal/15 text-teal-2 rounded-[20px]">SEO</span>
          </div>
        </div>
      </RevealSection>
    </Section>
  );
}
