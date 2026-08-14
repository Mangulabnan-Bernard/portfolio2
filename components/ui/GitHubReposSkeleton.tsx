import Section from '@/components/ui/Section';
import SectionHeader from '@/components/ui/SectionHeader';

function RepoCardSkeleton() {
  return (
    <div
      className="flex flex-col rounded-[12px] border border-border bg-surface/40 p-5 animate-pulse"
      aria-hidden="true"
    >
      <div className="mb-3 flex items-center gap-2">
        <div className="h-4 w-4 rounded bg-dim" />
        <div className="h-3.5 w-32 rounded bg-dim" />
      </div>
      <div className="mb-4 flex flex-1 flex-col gap-2">
        <div className="h-3 w-full rounded bg-dim" />
        <div className="h-3 w-4/5 rounded bg-dim" />
      </div>
      <div className="flex items-center gap-4">
        <div className="h-2.5 w-16 rounded bg-dim" />
        <div className="ml-auto h-2.5 w-20 rounded bg-dim" />
      </div>
    </div>
  );
}

export default function GitHubReposSkeleton() {
  return (
    <Section id="github">
      <SectionHeader label="Open Source" title="Recent GitHub Activity_" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" aria-busy="true" aria-label="Loading GitHub repos">
        {Array.from({ length: 6 }).map((_, i) => (
          <RepoCardSkeleton key={i} />
        ))}
      </div>
      <div className="mt-8 flex justify-center">
        <div className="h-11 w-44 animate-pulse rounded-[8px] border border-border bg-surface/40" aria-hidden="true" />
      </div>
    </Section>
  );
}
