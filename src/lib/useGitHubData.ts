"use client";

import { useState, useEffect } from "react";
import { GitHubData, RepoWithTree, buildFileSystem } from "./github";

interface UseGitHubDataReturn {
  repos: RepoWithTree[];
  fileSystem: Record<string, unknown>;
  loading: boolean;
  error: string | null;
}

// Default fallback data when API isn't available
// Empty default - will be populated from GitHub API
const defaultRepos: RepoWithTree[] = [];

const defaultFileSystem = buildFileSystem(defaultRepos);

export function useGitHubData(): UseGitHubDataReturn {
  const [repos, setRepos] = useState<RepoWithTree[]>(defaultRepos);
  const [fileSystem, setFileSystem] = useState<Record<string, unknown>>(defaultFileSystem);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/github");
        if (!res.ok) throw new Error("Failed to fetch");

        const data: GitHubData = await res.json();
        if (data.repos && data.repos.length > 0) {
          setRepos(data.repos);
          setFileSystem(buildFileSystem(data.repos));
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
        // Keep default data on error
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return { repos, fileSystem, loading, error };
}

// Helper to get file system for terminal
export function getTerminalFileSystem(repos: RepoWithTree[]): Record<string, unknown> {
  return buildFileSystem(repos);
}

