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

    const payload = {
      name: String(data.get('name') ?? '').trim(),
      email: String(data.get('email') ?? '').trim(),
      message: String(data.get('message') ?? '').trim(),
    };

    setStatus('sending');
    setErrorMsg('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error ?? 'Something went wrong. Please try again.');
      }

      setStatus('success');
      form.reset();
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong.');
    }
  };

  const sending = status === 'sending';

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
        disabled={sending}
        className="form-submit font-mono text-[12px] tracking-[0.1em] px-7 py-3 bg-teal text-bg-2 border-none rounded-[8px] cursor-pointer font-bold w-full transition-colors hover:bg-teal-hover disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {sending ? 'Sending…' : 'Send Message →'}
      </button>

      {status === 'success' && (
        <p className="font-mono text-[10px] text-teal mt-3 text-center" role="status">
          Thanks! Your message has been sent. I&apos;ll get back to you soon.
        </p>
      )}
      {status === 'error' && (
        <p className="font-mono text-[10px] text-red-400 mt-3 text-center" role="alert">
          {errorMsg}
        </p>
      )}
      {status !== 'success' && status !== 'error' && (
        <p className="font-mono text-[10px] text-muted mt-3 text-center">
          Your message is sent straight to my inbox.
        </p>
      )}
    </form>
  );
}
