import { ImageResponse } from 'next/og';

// Next.js auto-wires this as og:image and twitter:image for the whole site.
export const alt = 'Bernard C. Mangulabnan — Full Stack Web and Mobile Developer';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          background: '#090e0c',
          backgroundImage:
            'radial-gradient(ellipse 80% 60% at 70% -10%, rgba(0,229,160,0.18), transparent 60%)',
          color: '#d4f0e3',
          fontFamily: 'monospace',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            fontSize: 26,
            letterSpacing: 4,
            color: '#00e5a0',
            textTransform: 'uppercase',
            marginBottom: 28,
          }}
        >
          <div style={{ width: 12, height: 12, borderRadius: 9999, background: '#00e5a0' }} />
          Available for new projects
        </div>
        <div style={{ display: 'flex', fontSize: 78, fontWeight: 700, lineHeight: 1.05 }}>
          Bernard C.&nbsp;<span style={{ color: '#00e5a0' }}>Mangulabnan</span>
        </div>
        <div style={{ display: 'flex', fontSize: 34, color: '#8ab8a0', marginTop: 24 }}>
          Full Stack Web and Mobile Developer — Next.js · React · TypeScript
        </div>
        <div
          style={{
            display: 'flex',
            marginTop: 'auto',
            fontSize: 24,
            color: '#4d7a62',
            letterSpacing: 2,
          }}
        >
          {'<BCM/>'}
        </div>
      </div>
    ),
    { ...size }
  );
}
