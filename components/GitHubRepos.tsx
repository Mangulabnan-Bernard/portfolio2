import { Suspense } from 'react';
import GitHubReposContent from '@/components/GitHubReposContent';

export default function GitHubRepos() {
  return (
    <Suspense fallback={<div className="github-activity-section section shell" aria-hidden="true"><div className="github-repo-grid"><div className="github-repo-card github-repo-loading" /><div className="github-repo-card github-repo-loading" /><div className="github-repo-card github-repo-loading" /></div></div>}>
      <GitHubReposContent />
    </Suspense>
  );
}
