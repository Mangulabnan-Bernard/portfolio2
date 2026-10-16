'use client';

import { useState } from 'react';

const EMAIL = 'mangulabnan.bernard321@gmail.com';

export default function CopyEmail() {
  const [label, setLabel] = useState('COPY EMAIL');
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setLabel('COPIED');
      window.setTimeout(() => setLabel('COPY EMAIL'), 2200);
    } catch { setLabel('USE EMAIL LINK ABOVE'); }
  };
  return <button type="button" onClick={copy}>{label}</button>;
}
