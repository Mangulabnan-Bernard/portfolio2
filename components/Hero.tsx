'use client';

import { useEffect, useRef, useState } from 'react';

const ROLES = [
  'Full Stack Web Developer_',
  'Mobile App Developer_',
  'AI-Augmented Engineer_',
  'Next.js · React · TypeScript_',
] as const;

export default function Hero() {
  const [typedText, setTypedText] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const pauseRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const currentRole = ROLES[roleIndex];

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (charIndex < currentRole.length) {
          setTypedText(currentRole.slice(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        } else {
          pauseRef.current = setTimeout(() => setIsDeleting(true), 1800);
        }
      } else if (charIndex > 0) {
        setTypedText(currentRole.slice(0, charIndex - 1));
        setCharIndex(charIndex - 1);
      } else {
        setIsDeleting(false);
        setRoleIndex((roleIndex + 1) % ROLES.length);
      }
    }, isDeleting ? 28 : 55);

    return () => {
      clearTimeout(timeout);
      if (pauseRef.current) {
        clearTimeout(pauseRef.current);
        pauseRef.current = null;
      }
    };
  }, [charIndex, isDeleting, roleIndex]);

  return (
    <section id="hero" className="min-h-screen flex flex-col justify-center py-32 px-8 max-w-[1080px] mx-auto md:flex-row md:items-center md:gap-12">
      <div className="hero-content flex-1 min-w-0">
        <div className="hero-kicker font-mono text-[12px] tracking-[0.25em] text-teal uppercase mb-6 flex items-center gap-2">
          <div className="dot w-[7px] h-[7px] rounded-full bg-teal animate-pulse"></div>
          Available for new projects
        </div>
        <h1 className="font-mono text-[clamp(2.6rem,6vw,4.5rem)] font-bold leading-[1.05] text-text mb-4">
          Bernard C.<br />
          <span className="text-teal">Mangulabnan</span>
        </h1>
        <div className="hero-role font-mono text-[clamp(1rem,2.5vw,1.3rem)] text-text-2 mb-8 font-light min-h-[1.8rem]">
          {typedText}
          <span className="cursor inline-block w-[2px] h-1em bg-teal vertical-align-middle animate-blink ml-[2px]"></span>
        </div>
        <p className="hero-desc max-w-[580px] text-text-2 text-[1rem] leading-[1.8] mb-10">
          I build websites and web apps that are fast, intuitive, and polished. Experienced in modern full-stack development with a passion for clean code and great user experiences.
        </p>
        <div className="hero-actions flex gap-4 flex-wrap mb-16">
          <a href="#projects" className="btn-primary font-mono text-[12px] tracking-[0.1em] px-7 py-3 bg-teal text-bg border-none rounded-[8px] cursor-pointer no-underline font-bold transition-all hover:bg-teal-hover hover:-translate-y-0.5 inline-block">
            View Projects
          </a>
          <a href="#contact" className="btn-outline font-mono text-[12px] tracking-[0.1em] px-7 py-3 bg-transparent text-teal border border-teal-3 rounded-[8px] cursor-pointer no-underline font-normal transition-all hover:bg-teal/8 hover:border-teal inline-block">
            Get In Touch
          </a>
        </div>
        <div className="hero-stats flex gap-10 pt-10 border-t border-border flex-wrap">
          <div className="stat-item">
            <div className="stat-num font-mono text-[1.8rem] font-bold text-teal leading-none">1+</div>
            <div className="stat-label text-[12px] text-muted mt-1">Years Experience</div>
          </div>
          <div className="stat-item">
            <div className="stat-num font-mono text-[1.8rem] font-bold text-teal leading-none">5+</div>
            <div className="stat-label text-[12px] text-muted mt-1">Projects Shipped</div>
          </div>
          <div className="stat-item">
            <div className="stat-num font-mono text-[1.8rem] font-bold text-teal leading-none">25+</div>
            <div className="stat-label text-[12px] text-muted mt-1">Technologies</div>
          </div>
          <div className="stat-item">
            <div className="stat-num font-mono text-[1.8rem] font-bold text-teal leading-none">1</div>
            <div className="stat-label text-[12px] text-muted mt-1">AI/ML App</div>
          </div>
        </div>
      </div>
      <div className="hero-photo flex-shrink-0 w-full max-w-[320px] md:max-w-[480px] relative z-10 flex items-end justify-center mx-auto md:mx-0 order-[-1] md:order-none">
        <div className="hero-photo-clip relative w-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/bernardpng.png"
            alt="Bernard C. Mangulabnan"
            width={896}
            height={1195}
            decoding="async"
            className="w-full h-auto block hero-image-shadow animate-float"
          />
        </div>
        <div className="hero-photo-glow absolute bottom-[-30px] left-1/2 -translate-x-1/2 w-[180px] h-[40px] hero-glow-gradient rounded-full animate-float blur-[8px]"></div>
      </div>
    </section>
  );
}
