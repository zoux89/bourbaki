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
const GITHUB_GRAPHQL_API = `${GITHUB_API}/graphql`;

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

const PINNED_REPOS_QUERY = `
  query PinnedRepositories($username: String!) {
    user(login: $username) {
      pinnedItems(first: 6, types: REPOSITORY) {
        nodes {
          ... on Repository {
            name
            description
            url
            homepageUrl
            stargazerCount
            pushedAt
            defaultBranchRef {
              name
            }
            owner {
              login
            }
            primaryLanguage {
              name
            }
            repositoryTopics(first: 10) {
              nodes {
                topic {
                  name
                }
              }
            }
          }
        }
      }
    }
  }
`;

interface GraphQLPinnedRepo {
  name: string;
  description: string | null;
  url: string;
  homepageUrl: string | null;
  stargazerCount: number;
  pushedAt: string;
  defaultBranchRef: { name: string } | null;
  owner: { login: string };
  primaryLanguage: { name: string } | null;
  repositoryTopics: {
    nodes: Array<{ topic: { name: string } } | null>;
  };
}

interface PinnedReposResponse {
  data?: {
    user: {
      pinnedItems: {
        nodes: Array<GraphQLPinnedRepo | null>;
      };
    } | null;
  };
  errors?: Array<{ message: string }>;
}

async function githubGraphQLFetch<T>(
  query: string,
  variables: Record<string, string>,
  token: string
): Promise<T> {
  const res = await fetch(GITHUB_GRAPHQL_API, {
    method: "POST",
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "User-Agent": "bourbaki-site",
      "X-GitHub-Api-Version": "2022-11-28",
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!res.ok) {
    throw new Error(`GitHub GraphQL API error: ${res.status}`);
  }

  return res.json() as Promise<T>;
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

// GitHub's REST API does not expose profile pins; GraphQL does.
export async function fetchPinnedRepos(
  username: string,
  token?: string
): Promise<GitHubRepo[]> {
  if (!token) {
    throw new Error("GITHUB_TOKEN is required to fetch pinned repositories");
  }

  const response = await githubGraphQLFetch<PinnedReposResponse>(
    PINNED_REPOS_QUERY,
    { username },
    token
  );

  if (response.errors?.length) {
    throw new Error(`GitHub GraphQL request failed: ${response.errors[0].message}`);
  }

  if (!response.data?.user) {
    throw new Error(`GitHub user "${username}" was not found`);
  }

  return response.data.user.pinnedItems.nodes
    .filter((repo): repo is GraphQLPinnedRepo => repo !== null)
    .map((repo) => ({
      name: repo.name,
      description: repo.description,
      language: repo.primaryLanguage?.name ?? null,
      stargazers_count: repo.stargazerCount,
      html_url: repo.url,
      homepage: repo.homepageUrl,
      topics: repo.repositoryTopics.nodes
        .filter((node): node is { topic: { name: string } } => node !== null)
        .map((node) => node.topic.name),
      pushed_at: repo.pushedAt,
      default_branch: repo.defaultBranchRef?.name ?? "main",
    }));
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
  // Fetch pinned repos from user's GitHub profile
  const repos = await fetchPinnedRepos(username, token);

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

