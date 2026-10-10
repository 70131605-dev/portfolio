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

export type ContributionDay = { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 };

/** The year's contribution graph exactly as GitHub shows it publicly. */
export type ContributionCalendar = {
  year: number;
  total: number;
  /** Columns of 7 days, Sunday first; leading days before Jan 1 are null. */
  weeks: (ContributionDay | null)[][];
};

export type GitHubData = {
  user: { public_repos: number; html_url: string; name: string | null; login: string; avatar_url: string };
  /** Most recently pushed repositories you own (forks excluded). */
  repos: GitHubRepo[];
  /** Share of code by language across your own repositories, by bytes. */
  languages: { name: string; percent: number }[];
  calendar: ContributionCalendar | null;
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

  const calendar = await getContributionCalendar(username, new Date().getFullYear());

  return {
    calendar,
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

const LEVELS = { NONE: 0, FIRST_QUARTILE: 1, SECOND_QUARTILE: 2, THIRD_QUARTILE: 3, FOURTH_QUARTILE: 4 } as const;

/**
 * Contribution calendar for one year. Uses GitHub's GraphQL API when a token
 * is available (CI), otherwise a public mirror of the profile graph. Private
 * contributions are only counted if the user enabled that on their profile.
 */
async function getContributionCalendar(username: string, year: number): Promise<ContributionCalendar | null> {
  const token = process.env.GITHUB_TOKEN;
  if (token) {
    try {
      const query = `query($login:String!,$from:DateTime!,$to:DateTime!){user(login:$login){contributionsCollection(from:$from,to:$to){contributionCalendar{totalContributions weeks{contributionDays{date contributionCount contributionLevel}}}}}}`;
      const res = await fetch("https://api.github.com/graphql", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({ query, variables: { login: username, from: `${year}-01-01T00:00:00Z`, to: `${year}-12-31T23:59:59Z` } }),
        next: { revalidate: REVALIDATE },
      });
      const json = await res.json();
      const cal = json?.data?.user?.contributionsCollection?.contributionCalendar;
      if (cal) {
        const days: ContributionDay[] = cal.weeks.flatMap((w: { contributionDays: { date: string; contributionCount: number; contributionLevel: keyof typeof LEVELS }[] }) =>
          w.contributionDays.map((d) => ({ date: d.date, count: d.contributionCount, level: LEVELS[d.contributionLevel] ?? 0 })),
        );
        return { year, total: cal.totalContributions, weeks: toWeeks(days, year) };
      }
    } catch {
      /* fall through to the public mirror */
    }
  }
  const mirror = await getJSON<{ total: Record<string, number>; contributions: ContributionDay[] }>(
    `https://github-contributions-api.jogruber.de/v4/${username}?y=${year}`,
  );
  if (!mirror) return null;
  return { year, total: mirror.total[String(year)] ?? 0, weeks: toWeeks(mirror.contributions, year) };
}

/** Lays a year of days out in Sunday-first week columns, like GitHub's graph. */
function toWeeks(days: ContributionDay[], year: number): (ContributionDay | null)[][] {
  const inYear = days.filter((d) => d.date.startsWith(`${year}-`)).sort((a, b) => a.date.localeCompare(b.date));
  if (!inYear.length) return [];
  const lead = new Date(`${inYear[0].date}T00:00:00Z`).getUTCDay();
  const cells: (ContributionDay | null)[] = [...Array(lead).fill(null), ...inYear];
  const weeks: (ContributionDay | null)[][] = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));
  return weeks;
}
