'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

type System = {
  id: string; number: string; eyebrow: string; title: string; summary: string; tools: string;
  lead: string; description: string; blocks: { title: string; body: string; tools: string[] }[];
};

const SYSTEMS: System[] = [
  {
    id: 'interface', number: '01', eyebrow: 'INTERFACE', title: 'Web experiences.', summary: 'Responsive interfaces, component systems, and accessible interaction across devices.', tools: 'REACT / NEXT.JS / TYPESCRIPT / UI SYSTEMS', lead: 'Interfaces that make complex products clear, responsive, and comfortable to use.', description: 'I work from the user journey outward: what someone needs to understand, what action comes next, and how the interface should respond on every screen size.',
    blocks: [
      { title: 'React & Next.js', body: 'Reusable components keep repeated patterns consistent while routes connect the interface to its data.', tools: ['React', 'Next.js', 'Component structure'] },
      { title: 'Responsive interaction', body: 'Layouts, navigation, forms, and content hierarchy are considered across desktop and mobile.', tools: ['Responsive design', 'Accessibility', 'UI systems'] },
      { title: 'Typed, maintainable UI', body: 'TypeScript and reusable styles make the visual system easier to understand and extend.', tools: ['TypeScript', 'Tailwind CSS', 'Design consistency'] },
    ],
  },
  {
    id: 'mobile', number: '02', eyebrow: 'DEVICE', title: 'Mobile products.', summary: 'Flutter screens, Dart logic, Android delivery, and the flows people use on the go.', tools: 'FLUTTER / DART / ANDROID / RIVERPOD', lead: 'Useful experiences built around the phone in someone’s hand.', description: 'Mobile design needs more than a smaller layout. I think through touch, navigation, device-sized content, and the practical tasks a person wants to finish quickly.',
    blocks: [
      { title: 'Flutter interfaces', body: 'Reusable widgets turn multi-step tasks into approachable mobile flows.', tools: ['Flutter', 'Reusable widgets', 'Adaptive layouts'] },
      { title: 'Dart, state & routes', body: 'Dart carries application logic while Riverpod and GoRouter keep state and navigation organized.', tools: ['Dart', 'Riverpod', 'GoRouter'] },
      { title: 'Android-ready delivery', body: 'Touch targets, image selection, and screen-size behavior are checked for handheld use.', tools: ['Android', 'APK builds', 'Cross-platform UI'] },
    ],
  },
  {
    id: 'data', number: '03', eyebrow: 'ENGINE', title: 'Data & logic.', summary: 'Data models, authentication, and application workflows behind useful products.', tools: 'PRISMA / MYSQL / POSTGRESQL / AUTH', lead: 'The structures that let a useful interface do reliable work.', description: 'Behind each screen is a model of what the product knows and what it should allow people to do. I connect front ends to data, authentication, and workflows.',
    blocks: [
      { title: 'Models & persistence', body: 'Prisma connects application models to MySQL and PostgreSQL where records need to persist.', tools: ['Prisma', 'MySQL', 'PostgreSQL'] },
      { title: 'Accounts & access', body: 'Projects include JWT-cookie authentication, bcrypt password hashing, and Auth.js account flows.', tools: ['JWT', 'bcrypt', 'Auth.js'] },
      { title: 'Product workflows', body: 'Input validation, server logic, updates, and useful feedback are treated as one complete path.', tools: ['API integration', 'Validation', 'System workflows'] },
    ],
  },
  {
    id: 'workflow', number: '04', eyebrow: 'DELIVERY', title: 'AI & workflow.', summary: 'LLMs in the development process, applied machine learning, and a careful path to release.', tools: 'LLMS / TENSORFLOW / GIT / DEPLOYMENT', lead: 'A practical process for learning, building, checking, and shipping.', description: 'I use AI-assisted tools during development while keeping human review and testing in the loop. That differs from Smart Grow’s applied TensorFlow feature.',
    blocks: [
      { title: 'AI-assisted development', body: 'ChatGPT, Claude, Cursor, and Windsurf help explore approaches, debug, and draft explanations.', tools: ['ChatGPT', 'Claude', 'Cursor', 'Windsurf'] },
      { title: 'Verify the output', body: 'Generated suggestions are reviewed against the product requirements and tested before use.', tools: ['Code review', 'Testing', 'Documentation'] },
      { title: 'Applied ML & delivery', body: 'TensorFlow supports crop-photo evaluation while Git and deployment tools keep releases traceable.', tools: ['TensorFlow', 'Git', 'GitHub', 'Deployment'] },
    ],
  },
];

export default function SystemsExplorer() {
  const [selected, setSelected] = useState<System | null>(null);

  useEffect(() => {
    const sync = () => setSelected(SYSTEMS.find((item) => item.id === location.hash.slice(1)) ?? null);
    sync();
    window.addEventListener('popstate', sync);
    return () => window.removeEventListener('popstate', sync);
  }, []);

  const open = (system: System) => {
    history.pushState(null, '', `#${system.id}`);
    setSelected(system);
    window.scrollTo({ top: 0, behavior: 'auto' });
  };
  const close = () => {
    history.pushState(null, '', location.pathname);
    setSelected(null);
  };

  if (selected) {
    return (
      <section className="detail-view" aria-live="polite"><div className="shell">
        <div className="detail-topbar"><button className="detail-back" type="button" onClick={close}>← ALL SYSTEMS</button><span className="detail-count">CAPABILITY {selected.number} / 04</span><button className="detail-close" type="button" onClick={close}>CLOSE ×</button></div>
        <div className="system-detail-hero"><div><p className="eyebrow">{selected.number} / {selected.eyebrow}</p><h1>{selected.title}</h1><p>{selected.lead}</p></div><div className="detail-orbit" aria-hidden="true"></div></div>
        <div className="system-detail-body">
          <div className="system-story"><div><p className="eyebrow">THE PRACTICE / {selected.number}</p><h2>Where the tools fit.</h2></div><p>{selected.description}</p></div>
          <div className="system-explainer-grid">{selected.blocks.map((block, index) => <article className="system-explainer" key={block.title}><span className="system-explainer-number">{String(index + 1).padStart(2, '0')} / 03</span><h3>{block.title}</h3><p>{block.body}</p><div className="system-explainer-tools">{block.tools.map((tool) => <span key={tool}>{tool}</span>)}</div></article>)}</div>
          <section className="system-method" aria-label="Working method"><div className="system-method-intro"><p className="eyebrow">HOW I WORK</p><h2>A careful loop.</h2></div><div className="system-method-list"><div className="system-method-step"><span>01 / FRAME</span><div><h3>Map the important journey</h3><p>Identify the primary task, page hierarchy, and key states.</p></div></div><div className="system-method-step"><span>02 / BUILD</span><div><h3>Create reusable patterns</h3><p>Turn navigation, cards, forms, and feedback into consistent components.</p></div></div><div className="system-method-step"><span>03 / VERIFY</span><div><h3>Test the experience</h3><p>Check widths, interaction states, readability, and failure paths.</p></div></div></div></section>
          <section className="system-toolkit" aria-label="Toolkit"><div><p className="eyebrow">TOOLKIT / {selected.eyebrow}</p><h2>Tools in the mix.</h2></div><div className="tag-row">{selected.tools.split(' / ').map((tool) => <span key={tool}>{tool}</span>)}</div></section>
          <section className="page-next"><p className="eyebrow">PROOF IN THE WORK</p><h2>Systems become<br/><em>real products.</em></h2><Link className="button button-dark" href="/work">Explore the work <span aria-hidden="true">↗</span></Link></section>
        </div>
      </div></section>
    );
  }

  return (
    <>
      <section className="page-intro shell reveal"><p className="eyebrow"><span className="eyebrow-line"></span> 03 / CAPABILITIES <span className="intro-side">PRACTICE / PROCESS / TOOLSET</span></p><h1>How ideas<br/><em>take shape.</em></h1><div className="intro-bottom"><p>Four connected areas, grounded in the products they make possible. Explore each one in depth.</p><span>04 / CAPABILITIES</span></div></section>
      <section className="section systems-section shell" aria-labelledby="system-index-title"><div className="section-head reveal"><div><p className="eyebrow">THE PRACTICE</p><h2 id="system-index-title">One connected<br/><em>practice.</em></h2></div><p>A good product is more than its interface. These areas work together from concept to delivery.</p></div><div className="system-card-grid">
        {SYSTEMS.map((system) => <button className="system-card tilt-card reveal" type="button" key={system.id} onClick={() => open(system)}><span className="system-card-top"><span>{system.number} / {system.eyebrow}</span><b aria-hidden="true">↗</b></span><span className="system-card-orb" aria-hidden="true"></span><strong>{system.title}</strong><span className="system-card-summary">{system.summary}</span><small>{system.tools}</small></button>)}
      </div></section>
      <section className="page-next shell"><p className="eyebrow">SEE IT IN PRACTICE</p><h2>Systems become<br/><em>real products.</em></h2><Link className="button button-dark" href="/work">Explore the work <span aria-hidden="true">↗</span></Link></section>
    </>
  );
}
