import { Suspense } from 'react';
import GitHubReposContent from '@/components/GitHubReposContent';
import GitHubReposSkeleton from '@/components/ui/GitHubReposSkeleton';

export default function GitHubRepos() {
  return (
    <Suspense fallback={<GitHubReposSkeleton />}>
      <GitHubReposContent />
    </Suspense>
  );
}
