'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

type System = {
  id: string; number: string; eyebrow: string; title: string; summary: string; tools: string;
  lead: string; description: string; blocks: { title: string; body: string; tools: string[] }[];
};

const SYSTEMS: System[] = [
  {
    id: 'interface', number: '01', eyebrow: 'WEB', title: 'Web development.', summary: 'Responsive websites and web apps built with reusable components.', tools: 'REACT / NEXT.JS / TYPESCRIPT / UI SYSTEMS', lead: 'I build responsive websites and web apps with React, Next.js, and TypeScript.', description: 'I start with what the user needs to do, then build the pages and components to support it on desktop and mobile.',
    blocks: [
      { title: 'React & Next.js', body: 'I use reusable components to keep pages consistent and connect the interface to its data.', tools: ['React', 'Next.js', 'Component structure'] },
      { title: 'Responsive design', body: 'I check layouts, navigation, forms, and content on desktop and mobile.', tools: ['Responsive design', 'Accessibility', 'UI systems'] },
      { title: 'Maintainable UI', body: 'I use TypeScript and reusable styles to keep the code easier to understand and update.', tools: ['TypeScript', 'Tailwind CSS', 'Design consistency'] },
    ],
  },
  {
    id: 'mobile', number: '02', eyebrow: 'MOBILE', title: 'Mobile development.', summary: 'Cross-platform apps built with Flutter, Dart, and mobile-friendly controls.', tools: 'FLUTTER / DART / ANDROID / RIVERPOD', lead: 'I build cross-platform mobile apps with Flutter and Dart.', description: 'I design for touch, simple navigation, readable content, and tasks that should be quick to complete on a phone.',
    blocks: [
      { title: 'Flutter interfaces', body: 'I use reusable widgets to build consistent screens and multi-step flows.', tools: ['Flutter', 'Reusable widgets', 'Adaptive layouts'] },
      { title: 'State & navigation', body: 'I use Dart, Riverpod, and GoRouter to manage app logic, state, and navigation.', tools: ['Dart', 'Riverpod', 'GoRouter'] },
      { title: 'Android delivery', body: 'I check touch targets, images, and layouts before creating Android builds.', tools: ['Android', 'APK builds', 'Cross-platform UI'] },
    ],
  },
  {
    id: 'data', number: '03', eyebrow: 'BACK END', title: 'Backend & databases.', summary: 'Databases, authentication, APIs, and server logic for full-stack applications.', tools: 'PRISMA / MYSQL / POSTGRESQL / AUTH', lead: 'I connect interfaces to databases, authentication, and server logic.', description: 'I plan how data is stored, what each user can do, and how the front end communicates with the server.',
    blocks: [
      { title: 'Data storage', body: 'I use Prisma with MySQL or PostgreSQL to store and manage application data.', tools: ['Prisma', 'MySQL', 'PostgreSQL'] },
      { title: 'Accounts & access', body: 'My projects use JWT cookies, bcrypt password hashing, and Auth.js for account access.', tools: ['JWT', 'bcrypt', 'Auth.js'] },
      { title: 'Server workflows', body: 'I connect validation, server logic, database updates, and user feedback.', tools: ['API integration', 'Validation', 'System workflows'] },
    ],
  },
  {
    id: 'workflow', number: '04', eyebrow: 'WORKFLOW', title: 'Workflow & machine learning.', summary: 'AI tools, testing, Git, deployment, and applied machine learning.', tools: 'LLMS / TENSORFLOW / GIT / DEPLOYMENT', lead: 'I use AI tools, testing, Git, and deployment tools during development.', description: 'I review and test AI-generated suggestions before using them. Smart Grow uses TensorFlow as an app feature, which is different from using AI tools during development.',
    blocks: [
      { title: 'AI development tools', body: 'I use ChatGPT, Claude, Cursor, and Windsurf to explore solutions, debug code, and draft documentation.', tools: ['ChatGPT', 'Claude', 'Cursor', 'Windsurf'] },
      { title: 'Review & testing', body: 'I compare generated suggestions with the project requirements and test them before use.', tools: ['Code review', 'Testing', 'Documentation'] },
      { title: 'Machine learning & delivery', body: 'Smart Grow uses TensorFlow for crop-photo evaluation. I use Git and deployment tools to track releases.', tools: ['TensorFlow', 'Git', 'GitHub', 'Deployment'] },
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
        <div className="detail-topbar"><button className="detail-back" type="button" onClick={close}>← ALL SKILLS</button><span className="detail-count">SKILL AREA {selected.number} / 04</span><button className="detail-close" type="button" onClick={close}>CLOSE ×</button></div>
        <div className="system-detail-hero"><div><p className="eyebrow">{selected.number} / {selected.eyebrow}</p><h1>{selected.title}</h1><p>{selected.lead}</p></div><div className="detail-orbit" aria-hidden="true"></div></div>
        <div className="system-detail-body">
          <div className="system-story"><div><p className="eyebrow">SKILL AREA / {selected.number}</p><h2>How I use these tools.</h2></div><p>{selected.description}</p></div>
          <div className="system-explainer-grid">{selected.blocks.map((block, index) => <article className="system-explainer" key={block.title}><span className="system-explainer-number">{String(index + 1).padStart(2, '0')} / 03</span><h3>{block.title}</h3><p>{block.body}</p><div className="system-explainer-tools">{block.tools.map((tool) => <span key={tool}>{tool}</span>)}</div></article>)}</div>
          <section className="system-method" aria-label="Working method"><div className="system-method-intro"><p className="eyebrow">MY PROCESS</p><h2>How I build projects.</h2></div><div className="system-method-list"><div className="system-method-step"><span>01 / PLAN</span><div><h3>Plan the main task</h3><p>Identify what the user needs to do, the page structure, and important states.</p></div></div><div className="system-method-step"><span>02 / BUILD</span><div><h3>Build reusable parts</h3><p>Create consistent components for navigation, cards, forms, and feedback.</p></div></div><div className="system-method-step"><span>03 / TEST</span><div><h3>Test the project</h3><p>Check screen sizes, interactions, readability, and error states.</p></div></div></div></section>
          <section className="system-toolkit" aria-label="Toolkit"><div><p className="eyebrow">TOOLS / {selected.eyebrow}</p><h2>Tools I use.</h2></div><div className="tag-row">{selected.tools.split(' / ').map((tool) => <span key={tool}>{tool}</span>)}</div></section>
          <section className="page-next"><p className="eyebrow">RELATED PROJECTS</p><h2>See these skills<br/><em>in my projects.</em></h2><Link className="button button-dark" href="/work">View projects <span aria-hidden="true">↗</span></Link></section>
        </div>
      </div></section>
    );
  }

  return (
    <>
      <section className="page-intro shell reveal"><p className="eyebrow"><span className="eyebrow-line"></span> 03 / SKILLS <span className="intro-side">WEB / MOBILE / BACK END / ML</span></p><h1>Skills and<br/><em>tools.</em></h1><div className="intro-bottom"><p>The main tools I use for web, mobile, backend, and machine-learning projects.</p><span>04 / SKILL AREAS</span></div></section>
      <section className="section systems-section shell" aria-labelledby="system-index-title"><div className="section-head reveal"><div><p className="eyebrow">SKILL AREAS</p><h2 id="system-index-title">What I<br/><em>work with.</em></h2></div><p>Open a section to see the tools I use and how I use them.</p></div><div className="system-card-grid">
        {SYSTEMS.map((system) => <button className="system-card tilt-card reveal" type="button" key={system.id} onClick={() => open(system)}><span className="system-card-top"><span>{system.number} / {system.eyebrow}</span><b aria-hidden="true">↗</b></span><span className="system-card-orb" aria-hidden="true"></span><strong>{system.title}</strong><span className="system-card-summary">{system.summary}</span><small>{system.tools}</small></button>)}
      </div></section>
      <section className="page-next shell"><p className="eyebrow">RELATED PROJECTS</p><h2>See these skills<br/><em>in my projects.</em></h2><Link className="button button-dark" href="/work">View projects <span aria-hidden="true">↗</span></Link></section>
    </>
  );
}
