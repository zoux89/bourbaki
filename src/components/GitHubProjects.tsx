"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Github, Star, GitFork, ExternalLink, RefreshCw } from "lucide-react";
import { GitHubData } from "@/lib/github";

interface Project {
  name: string;
  description: string;
  stars?: number;
  forks?: number;
  language?: string;
  url: string;
}

const languageColors: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572A5",
  Rust: "#dea584",
  Go: "#00ADD8",
  Haskell: "#5e5086",
  MDX: "#fcb32c",
};

export default function GitHubProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await fetch("/api/github");
        if (!res.ok) throw new Error("Failed to fetch");

        const data: GitHubData = await res.json();
        if (data.repos && data.repos.length > 0) {
          const projectList = data.repos.map((repo) => ({
            name: repo.name,
            description: repo.description || "No description",
            stars: repo.stars,
            language: repo.language || undefined,
            url: repo.url,
          }));
          setProjects(projectList);
        }
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  return (
    <div className="bg-[var(--nb-bg-card)] border-3 border-[var(--nb-border)] p-5 shadow-[4px_4px_0_0_var(--nb-border)] h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-[var(--nb-text)] font-bold text-lg flex items-center gap-2">
            <Github className="w-5 h-5" />
            GitHub Projects
            {loading && <RefreshCw className="w-3 h-3 animate-spin text-[var(--nb-text-muted)]" />}
          </h3>
          <p className="text-[var(--nb-text-muted)] text-sm">My open source work</p>
        </div>
      </div>

      <div className="flex-1 space-y-3 overflow-auto">
        {error && (
          <p className="text-sm text-[var(--nb-text-muted)]">
            GitHub projects are temporarily unavailable.
          </p>
        )}
        {projects.map((project, index) => (
          <a
            key={index}
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block border-2 border-[var(--nb-border)] p-3 hover:bg-[var(--nb-primary)] hover:text-white transition-colors group"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-sm truncate group-hover:text-white text-[var(--nb-text)]">
                  {project.name}
                </div>
                <div className="text-xs text-[var(--nb-text-muted)] group-hover:text-white/70 truncate">
                  {project.description}
                </div>
              </div>
              <ExternalLink className="w-4 h-4 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="flex items-center gap-3 mt-2">
              {project.language && (
                <div className="flex items-center gap-1">
                  <span 
                    className="w-2 h-2 rounded-full" 
                    style={{ backgroundColor: languageColors[project.language] || "#888" }}
                  />
                  <span className="text-xs text-[var(--nb-text-muted)] group-hover:text-white/70">
                    {project.language}
                  </span>
                </div>
              )}
              {project.stars !== undefined && project.stars > 0 && (
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 text-[var(--nb-text-muted)] group-hover:text-white/70" />
                  <span className="text-xs text-[var(--nb-text-muted)] group-hover:text-white/70">
                    {project.stars}
                  </span>
                </div>
              )}
              {project.forks !== undefined && project.forks > 0 && (
                <div className="flex items-center gap-1">
                  <GitFork className="w-3 h-3 text-[var(--nb-text-muted)] group-hover:text-white/70" />
                  <span className="text-xs text-[var(--nb-text-muted)] group-hover:text-white/70">
                    {project.forks}
                  </span>
                </div>
              )}
            </div>
          </a>
        ))}
      </div>

      <Link 
        href="/projects"
        className="mt-4 w-full bg-[var(--nb-primary)] border-2 border-[var(--nb-border)] py-2 text-white font-semibold flex items-center justify-center gap-2 hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_0_var(--nb-border)] shadow-[4px_4px_0_0_var(--nb-border)] transition-all text-sm"
      >
        View all projects
      </Link>
    </div>
  );
}
