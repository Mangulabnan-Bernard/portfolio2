import type { Metadata } from 'next';
import Link from 'next/link';
import RevealSection from '@/components/RevealSection';
import Section from '@/components/ui/Section';
import SectionHeader from '@/components/ui/SectionHeader';
import { formatDate, getPublishedPosts } from '@/lib/posts';

export const metadata: Metadata = {
  title: 'Blog — Bernard C. Mangulabnan',
  description:
    'Short notes from Bernard Mangulabnan on web and mobile development, the tools he uses, and what he is currently learning.',
};

export default function BlogPage() {
  const posts = getPublishedPosts();

  return (
    <main className="relative z-10 pt-[60px]">
      <Section id="blog">
        <SectionHeader label="Writing" title="Notes & Updates_" />
        <RevealSection>
          {posts.length === 0 ? (
            <p className="text-text-2 text-[0.95rem]">No posts yet — check back soon.</p>
          ) : (
            <div className="flex flex-col gap-4">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group block rounded-[14px] border border-border bg-surface/40 p-6 no-underline transition-all hover:-translate-y-0.5 hover:border-teal-3"
                >
                  <div className="mb-2 flex items-center gap-3 font-mono text-[11px] tracking-[0.08em] text-muted">
                    <time dateTime={post.date}>{formatDate(post.date)}</time>
                    <span className="h-1 w-1 rounded-full bg-border" />
                    <span className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <span key={tag} className="text-teal-3">
                          #{tag}
                        </span>
                      ))}
                    </span>
                  </div>
                  <h2 className="mb-2 font-mono text-[1.2rem] font-bold text-text transition-colors group-hover:text-teal">
                    {post.title}
                  </h2>
                  <p className="text-[0.92rem] leading-[1.75] text-text-2">{post.excerpt}</p>
                  <span className="mt-4 inline-flex items-center gap-1 font-mono text-[12px] text-teal">
                    Read more
                    <span className="transition-transform group-hover:translate-x-1" aria-hidden="true">
                      →
                    </span>
                  </span>
                </Link>
              ))}
            </div>
          )}
        </RevealSection>
      </Section>
    </main>
  );
}
