import "server-only";

export type GitHubRepo = {
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  fork: boolean;
  pushed_at: string;
};

export type GitHubData = {
  user: { public_repos: number; html_url: string; name: string | null };
  /** Most recently pushed repositories you own (forks excluded). */
  repos: GitHubRepo[];
  /** Share of code by language across your own repositories, by bytes. */
  languages: { name: string; percent: number }[];
};

const REVALIDATE = 60 * 60; // 1 hour

async function getJSON<T>(url: string): Promise<T | null> {
  try {
    const headers: Record<string, string> = { Accept: "application/vnd.github+json" };
    if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    const res = await fetch(url, { headers, next: { revalidate: REVALIDATE } });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

/**
 * Live GitHub data for the activity section. Returns null when no username is
 * configured or the API is unreachable, so the UI never shows invented numbers.
 */
export async function getGitHubData(username: string, repoLimit = 3): Promise<GitHubData | null> {
  if (!username) return null;

  const base = `https://api.github.com/users/${username}`;
  const [user, repos] = await Promise.all([
    getJSON<GitHubData["user"]>(base),
    getJSON<GitHubRepo[]>(`${base}/repos?per_page=100&sort=pushed`),
  ]);
  if (!user || !repos) return null;

  // The "<username>/<username>" repo only holds the profile README.
  const isProfileReadme = (r: GitHubRepo) => r.name.toLowerCase() === username.toLowerCase();
  const own = repos.filter((r) => !r.fork && !isProfileReadme(r));

  // Bytes per language across own repositories — the same measure GitHub uses.
  const perRepo = await Promise.all(
    own.map((r) => getJSON<Record<string, number>>(`https://api.github.com/repos/${username}/${r.name}/languages`)),
  );
  const bytes = new Map<string, number>();
  for (const langs of perRepo) for (const [lang, n] of Object.entries(langs ?? {})) bytes.set(lang, (bytes.get(lang) ?? 0) + n);
  const total = [...bytes.values()].reduce((a, b) => a + b, 0);

  return {
    user: { ...user, public_repos: repos.filter((r) => !isProfileReadme(r)).length },
    repos: own.slice(0, repoLimit),
    languages: total
      ? [...bytes.entries()]
          .map(([name, n]) => ({ name, percent: (n / total) * 100 }))
          .sort((a, b) => b.percent - a.percent)
          .slice(0, 4)
      : [],
  };
}
