'use client';

import { FormEvent, useState } from 'react';

type Status = 'idle' | 'sending' | 'success' | 'error';

export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setStatus('sending');
    setErrorMsg('');
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: String(data.get('name') ?? '').trim(),
          email: String(data.get('email') ?? '').trim(),
          message: String(data.get('message') ?? '').trim(),
          company: String(data.get('company') ?? ''),
        }),
      });
      if (!response.ok) {
        const body = await response.json().catch(() => null);
        throw new Error(body?.error ?? 'Something went wrong. Please try again.');
      }
      setStatus('success');
      form.reset();
    } catch (error) {
      setStatus('error');
      setErrorMsg(error instanceof Error ? error.message : 'Something went wrong.');
    }
  };

  const sending = status === 'sending';
  return (
    <form className="portfolio-form" onSubmit={handleSubmit}>
      <div className="portfolio-form-grid">
        <div className="portfolio-field"><label htmlFor="contact-name">Your name</label><input id="contact-name" name="name" type="text" required autoComplete="name" placeholder="John Doe"/></div>
        <div className="portfolio-field"><label htmlFor="contact-email">Email address</label><input id="contact-email" name="email" type="email" required autoComplete="email" placeholder="john@example.com"/></div>
      </div>
      <div className="sr-only" aria-hidden="true"><label htmlFor="contact-company">Company (leave blank)</label><input id="contact-company" name="company" type="text" tabIndex={-1} autoComplete="off"/></div>
      <div className="portfolio-field"><label htmlFor="contact-message">Message</label><textarea id="contact-message" name="message" required placeholder="Tell me about your project..."/></div>
      <button type="submit" disabled={sending} className="button button-dark">{sending ? 'Sending…' : 'Send message'} <span aria-hidden="true">↗</span></button>
      {status === 'success' && <p className="form-status is-success" role="status">Thanks! Your message has been sent. I&apos;ll get back to you soon.</p>}
      {status === 'error' && <p className="form-status is-error" role="alert">{errorMsg}</p>}
      {status === 'idle' && <p className="form-status">Your message is sent straight to my inbox.</p>}
    </form>
  );
}
