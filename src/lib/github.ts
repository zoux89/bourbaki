// GitHub API integration - fetches repos and file trees

export interface GitHubRepo {
  name: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  html_url: string;
  homepage: string | null;
  topics: string[];
  pushed_at: string;
  default_branch: string;
}

export interface TreeItem {
  path: string;
  type: "blob" | "tree";
  sha: string;
}

export interface RepoWithTree {
  name: string;
  description: string | null;
  language: string | null;
  stars: number;
  url: string;
  homepage: string | null;
  topics: string[];
  lastUpdated: string;
  tree: TreeItem[];
}

export interface GitHubData {
  repos: RepoWithTree[];
  fetchedAt: string;
  username: string;
}

const GITHUB_API = "https://api.github.com";

// Pinned repositories to display (owner/repo format)
export const PINNED_REPOS: { owner: string; repo: string }[] = [
  { owner: "bour278", repo: "ternary" },
  { owner: "Kalshit", repo: "data-hub" },
];

async function githubFetch<T>(endpoint: string, token?: string): Promise<T> {
  const headers: HeadersInit = {
    Accept: "application/vnd.github.v3+json",
    "User-Agent": "bourbaki-site",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${GITHUB_API}${endpoint}`, { headers });

  if (!res.ok) {
    throw new Error(`GitHub API error: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

export async function fetchUserRepos(
  username: string,
  token?: string
): Promise<GitHubRepo[]> {
  // Fetch public repos, sorted by recently pushed
  const repos = await githubFetch<GitHubRepo[]>(
    `/users/${username}/repos?sort=pushed&per_page=30&type=owner`,
    token
  );

  // Filter out forks and archived repos if needed
  return repos.filter((repo) => !repo.name.startsWith("."));
}

// Fetch a specific repo by owner and name
export async function fetchRepo(
  owner: string,
  repo: string,
  token?: string
): Promise<GitHubRepo> {
  return githubFetch<GitHubRepo>(`/repos/${owner}/${repo}`, token);
}

// Fetch multiple specific repos (for pinned repos)
export async function fetchPinnedRepos(
  token?: string
): Promise<GitHubRepo[]> {
  const repos = await Promise.all(
    PINNED_REPOS.map(async ({ owner, repo }) => {
      try {
        return await fetchRepo(owner, repo, token);
      } catch (error) {
        console.error(`Failed to fetch ${owner}/${repo}:`, error);
        return null;
      }
    })
  );

  return repos.filter((repo): repo is GitHubRepo => repo !== null);
}

export async function fetchRepoTree(
  owner: string,
  repo: string,
  branch: string,
  token?: string
): Promise<TreeItem[]> {
  try {
    // Get the tree recursively but only first level for performance
    const data = await githubFetch<{ tree: TreeItem[] }>(
      `/repos/${owner}/${repo}/git/trees/${branch}`,
      token
    );

    return data.tree.slice(0, 20); // Limit items for terminal display
  } catch {
    // If tree fetch fails, return empty array
    return [];
  }
}

export async function fetchGitHubData(
  username: string,
  token?: string
): Promise<GitHubData> {
  // Fetch pinned repos instead of all user repos
  const repos = await fetchPinnedRepos(token);

  // Fetch trees for each repo (in parallel)
  const reposWithTrees = await Promise.all(
    repos.map(async (repo): Promise<RepoWithTree> => {
      // Extract owner from html_url (e.g., https://github.com/owner/repo)
      const urlParts = repo.html_url.split("/");
      const owner = urlParts[urlParts.length - 2];

      const tree = await fetchRepoTree(
        owner,
        repo.name,
        repo.default_branch,
        token
      );

      return {
        name: repo.name,
        description: repo.description,
        language: repo.language,
        stars: repo.stargazers_count,
        url: repo.html_url,
        homepage: repo.homepage,
        topics: repo.topics || [],
        lastUpdated: repo.pushed_at,
        tree,
      };
    })
  );

  return {
    repos: reposWithTrees,
    fetchedAt: new Date().toISOString(),
    username,
  };
}

// Convert GitHub tree to terminal-friendly file system structure
export function buildFileSystem(repos: RepoWithTree[]): Record<string, unknown> {
  const projects: Record<string, string[]> = {};

  for (const repo of repos) {
    // Convert tree items to file/folder names
    const items = repo.tree.map((item) => {
      if (item.type === "tree") {
        return `${item.path}/`;
      }
      return item.path;
    });

    // Always include README.md if not present
    if (!items.some((i) => i.toLowerCase().includes("readme"))) {
      items.unshift("README.md");
    }

    projects[repo.name] = items.slice(0, 10); // Limit display items
  }

  return {
    "~": {
      projects,
      documents: ["resume.pdf", "notes.md"],
      ".config": ["nvim/", "tmux.conf", "zshrc"],
    },
  };
}

