import { GITHUB_URL, GITHUB_USERNAME } from '@/lib/site';

type Repo = {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  pushed_at: string;
  fork: boolean;
  archived: boolean;
};

const LANG_COLORS: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  Dart: '#00b4ab',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Python: '#3572A5',
  Java: '#b07219',
  'C++': '#f34b7d',
  Shell: '#89e051',
};

async function getRepos(): Promise<Repo[]> {
  const token = process.env.GITHUB_TOKEN;
  try {
    const res = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=pushed`,
      {
        headers: {
          Accept: 'application/vnd.github+json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        next: { revalidate: 3600 },
      }
    );
    if (!res.ok) return [];
    const data = (await res.json()) as Repo[];
    return data
      .filter((r) => !r.fork && !r.archived)
      .sort((a, b) => +new Date(b.pushed_at) - +new Date(a.pushed_at))
      .slice(0, 6);
  } catch {
    return [];
  }
}

function relativeTime(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const day = 86_400_000;
  const days = Math.floor(diff / day);
  if (days <= 0) return 'today';
  if (days === 1) return 'yesterday';
  if (days < 30) return `${days} days ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months} ${months === 1 ? 'month' : 'months'} ago`;
  const years = Math.floor(months / 12);
  return `${years} ${years === 1 ? 'year' : 'years'} ago`;
}

export default async function GitHubReposContent() {
  const repos = await getRepos();

  return (
    <section className="github-activity-section section shell" id="github" aria-labelledby="github-title">
      <div className="section-head reveal">
        <div><p className="eyebrow">04 / OPEN SOURCE</p><h2 id="github-title">Recent work,<br/><em>still moving.</em></h2></div>
        <p>Fresh public repositories and experiments, pulled directly from GitHub.</p>
      </div>
      {repos.length > 0 ? (
        <div className="github-repo-grid">
          {repos.map((repo) => {
            const color = (repo.language && LANG_COLORS[repo.language]) || 'var(--color-teal)';
            return (
              <a
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="github-repo-card reveal"
              >
                <div className="github-repo-title">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                    <path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8ZM5 12.25a.25.25 0 0 1 .25-.25h3.5a.25.25 0 0 1 .25.25v3.25a.25.25 0 0 1-.4.2l-1.45-1.087a.25.25 0 0 0-.3 0L5.4 15.7a.25.25 0 0 1-.4-.2Z" />
                  </svg>
                  <strong>{repo.name}</strong>
                </div>
                <p>{repo.description ?? 'An active public project in Bernard’s GitHub archive.'}</p>
                <div className="github-repo-meta">
                  {repo.language && (
                    <span>
                      <i style={{ backgroundColor: color }} />
                      {repo.language}
                    </span>
                  )}
                  {repo.stargazers_count > 0 && (
                    <span>★ {repo.stargazers_count}</span>
                  )}
                  <span>{relativeTime(repo.pushed_at)}</span>
                </div>
                <b aria-hidden="true">↗</b>
              </a>
            );
          })}
        </div>
      ) : (
        <p className="github-empty reveal">GitHub activity is temporarily unavailable, but the public archive is still one click away.</p>
      )}
      <div className="github-action reveal"><a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="button button-outline">View GitHub profile <span aria-hidden="true">↗</span></a></div>
    </section>
  );
}
