'use client';

import { FormEvent } from 'react';

const EMAIL = 'mangulabnan.bernard321@gmail.com';

export default function ContactForm() {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get('name') ?? '').trim();
    const email = String(data.get('email') ?? '').trim();
    const projectType = String(data.get('projectType') ?? '').trim();
    const message = String(data.get('message') ?? '').trim();

    const subject = encodeURIComponent(`Portfolio inquiry${name ? ` from ${name}` : ''}`);
    const body = encodeURIComponent(
      [
        name && `Name: ${name}`,
        email && `Email: ${email}`,
        projectType && `Project type: ${projectType}`,
        '',
        message || '(No message provided)',
      ]
        .filter(Boolean)
        .join('\n')
    );

    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
  };

  return (
    <form
      className="contact-form-wrapper bg-surface border border-border rounded-[14px] p-7"
      onSubmit={handleSubmit}
    >
      <div className="form-group mb-5">
        <label htmlFor="contact-name" className="font-mono text-[10px] tracking-[0.12em] text-muted uppercase block mb-1.5">
          Your Name
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          required
          placeholder="John Doe"
          className="w-full bg-bg border border-border rounded-[8px] px-3.5 py-2.5 font-sans text-[13px] text-text outline-none transition-colors focus:border-teal-3"
        />
      </div>
      <div className="form-group mb-5">
        <label htmlFor="contact-email" className="font-mono text-[10px] tracking-[0.12em] text-muted uppercase block mb-1.5">
          Email Address
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          required
          placeholder="john@example.com"
          className="w-full bg-bg border border-border rounded-[8px] px-3.5 py-2.5 font-sans text-[13px] text-text outline-none transition-colors focus:border-teal-3"
        />
      </div>
      <div className="form-group mb-5">
        <label htmlFor="contact-project-type" className="font-mono text-[10px] tracking-[0.12em] text-muted uppercase block mb-1.5">
          Project Type
        </label>
        <input
          id="contact-project-type"
          name="projectType"
          type="text"
          placeholder="Web App, Landing Page, etc."
          className="w-full bg-bg border border-border rounded-[8px] px-3.5 py-2.5 font-sans text-[13px] text-text outline-none transition-colors focus:border-teal-3"
        />
      </div>
      <div className="form-group mb-5">
        <label htmlFor="contact-message" className="font-mono text-[10px] tracking-[0.12em] text-muted uppercase block mb-1.5">
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          placeholder="Tell me about your project..."
          className="w-full bg-bg border border-border rounded-[8px] px-3.5 py-2.5 font-sans text-[13px] text-text outline-none transition-colors focus:border-teal-3 resize-vertical min-h-[100px]"
        />
      </div>
      <button
        type="submit"
        className="form-submit font-mono text-[12px] tracking-[0.1em] px-7 py-3 bg-teal text-bg-2 border-none rounded-[8px] cursor-pointer font-bold w-full transition-colors hover:bg-teal-hover"
      >
        Send via Email →
      </button>
      <p className="font-mono text-[10px] text-muted mt-3 text-center">
        Opens your email app with a pre-filled message
      </p>
    </form>
  );
}
