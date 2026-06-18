import { ImageResponse } from 'next/og';
import { PROJECTS, getProjectBySlug, projectSlug } from '@/lib/projects';

export const alt = 'Project case study — Bernard C. Mangulabnan';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// Pre-render one share card per project at build time.
export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: projectSlug(p) }));
}

export default async function ProjectOgImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  const accent = project?.accent ?? '#00e5a0';
  const title = project?.title ?? 'Project';
  const badge = project?.badge ?? 'Case Study';
  const tech = project?.tech.slice(0, 5).join('  ·  ') ?? '';

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
          background: '#070a0f',
          backgroundImage: `radial-gradient(ellipse 80% 60% at 75% -10%, ${accent}33, transparent 60%)`,
          color: '#d8e6f5',
          fontFamily: 'monospace',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignSelf: 'flex-start',
            alignItems: 'center',
            gap: 12,
            fontSize: 24,
            letterSpacing: 4,
            color: accent,
            textTransform: 'uppercase',
            padding: '8px 20px',
            borderRadius: 9999,
            border: `1px solid ${accent}66`,
            background: `${accent}1f`,
            marginBottom: 36,
          }}
        >
          {badge}
        </div>
        <div style={{ display: 'flex', fontSize: 68, fontWeight: 700, lineHeight: 1.1, maxWidth: 1000 }}>
          {title}
        </div>
        {tech && (
          <div style={{ display: 'flex', fontSize: 28, color: '#92a8c2', marginTop: 28 }}>
            {tech}
          </div>
        )}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 'auto',
            fontSize: 24,
            color: '#56738f',
            letterSpacing: 2,
          }}
        >
          <span>Bernard C. Mangulabnan</span>
          <span style={{ color: accent }}>{'<BCM/>'}</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
