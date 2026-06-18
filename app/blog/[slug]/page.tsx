import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { POSTS, formatDate, getPostBySlug } from '@/lib/posts';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: 'Post not found — Bernard C. Mangulabnan' };

  const title = `${post.title} — Bernard C. Mangulabnan`;
  return {
    title,
    description: post.excerpt,
    openGraph: { title, description: post.excerpt, type: 'article' },
  };
}

export default async function BlogPost({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post || post.draft) notFound();

  return (
    <main className="relative z-10 pt-[60px]">
      <article className="mx-auto max-w-[720px] px-8 py-16 md:py-20">
        <Link
          href="/blog"
          className="mb-10 inline-flex items-center gap-2 font-mono text-[12px] tracking-[0.08em] text-text-2 no-underline transition-colors hover:text-teal"
        >
          <span aria-hidden="true">←</span> Back to Blog
        </Link>

        <div className="mb-4 flex items-center gap-3 font-mono text-[11px] tracking-[0.08em] text-muted">
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

        <h1 className="mb-8 font-mono text-[clamp(1.8rem,4vw,2.6rem)] font-bold leading-[1.15] text-text">
          {post.title}
        </h1>

        <div className="flex flex-col gap-5">
          {post.content.map((paragraph, i) => (
            <p key={i} className="text-[1.02rem] leading-[1.9] text-text-2">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="mt-14 border-t border-border pt-8">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-[8px] border border-teal-3 px-6 py-3 font-mono text-[12px] tracking-[0.1em] text-teal no-underline transition-all hover:border-teal hover:bg-teal/8"
          >
            Get in touch
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </article>
    </main>
  );
}
