"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Github, Star, GitFork, Folder, RefreshCw, Clock } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import { GitHubData, RepoWithTree } from "@/lib/github";

interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  stars: number;
  language: string | null;
  lastUpdated: string;
  tree: { path: string; type: string }[];
  featured?: boolean;
}

const languageColors: Record<string, string> = {
  Python: "#3572A5",
  Haskell: "#5e5086",
  Idris: "#b30000",
  Rust: "#dea584",
  Go: "#00ADD8",
  OCaml: "#3be133",
  Lua: "#000080",
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  MDX: "#fcb32c",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Shell: "#89e051",
};

// Default projects fallback
const defaultProjects: Project[] = [
  {
    id: "text2sql",
    title: "text2sql",
    description: "Natural language to SQL query converter.",
    longDescription: "A tool that converts natural language queries into SQL statements using LLMs.",
    tags: ["Python", "NLP", "SQL"],
    githubUrl: "https://github.com/bour278/text2sql",
    stars: 1,
    language: "Python",
    lastUpdated: new Date().toISOString(),
    tree: [],
    featured: true,
  },
  {
    id: "bourbaki",
    title: "bourbaki",
    description: "Notes about random Math and CS topics.",
    longDescription: "A collection of notes and explorations covering various topics in mathematics and computer science.",
    tags: ["TypeScript", "Math", "CS"],
    githubUrl: "https://github.com/bour278/bourbaki",
    stars: 0,
    language: "TypeScript",
    lastUpdated: new Date().toISOString(),
    tree: [],
    featured: true,
  },
  {
    id: "preptide",
    title: "preptide",
    description: "SWE, Math, Data Science notes for problem solving.",
    longDescription: "Comprehensive notes and resources for software engineering interviews.",
    tags: ["MDX", "Notes", "Interview Prep"],
    githubUrl: "https://github.com/bour278/preptide",
    stars: 0,
    language: "MDX",
    lastUpdated: new Date().toISOString(),
    tree: [],
    featured: true,
  },
];

function repoToProject(repo: RepoWithTree, featured: boolean = false): Project {
  return {
    id: repo.name,
    title: repo.name,
    description: repo.description || "No description",
    longDescription: repo.description || undefined,
    tags: repo.topics.length > 0 ? repo.topics.slice(0, 4) : [repo.language || "Code"],
    githubUrl: repo.url,
    liveUrl: repo.homepage || undefined,
    stars: repo.stars,
    language: repo.language,
    lastUpdated: repo.lastUpdated,
    tree: repo.tree,
    featured,
  };
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "today";
  if (diffDays === 1) return "yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default function ProjectsPage() {
  const [mounted, setMounted] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [projects, setProjects] = useState<Project[]>(defaultProjects);
  const [loading, setLoading] = useState(true);
  const [lastFetched, setLastFetched] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await fetch("/api/github");
      if (!res.ok) throw new Error("Failed to fetch");

      const data: GitHubData = await res.json();
      if (data.repos && data.repos.length > 0) {
        // Mark first 3 as featured
        const projectList = data.repos.map((repo, i) => repoToProject(repo, i < 3));
        setProjects(projectList);
        setLastFetched(data.fetchedAt);
      }
    } catch (err) {
      console.error("Error fetching projects:", err);
      // Keep default projects
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      const res = await fetch("/api/github", { method: "POST" });
      if (res.ok) {
        const data = await res.json();
        if (data.data?.repos) {
          const projectList = data.data.repos.map((repo: RepoWithTree, i: number) => 
            repoToProject(repo, i < 3)
          );
          setProjects(projectList);
          setLastFetched(data.data.fetchedAt);
        }
      }
    } catch (err) {
      console.error("Error refreshing:", err);
    } finally {
      setRefreshing(false);
    }
  };

  if (!mounted) return null;

  const featuredProjects = projects.filter((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);

  return (
    <div className="min-h-screen bg-[var(--nb-bg)] transition-colors duration-300">
      {/* Header */}
      <header className="border-b-3 border-[var(--nb-border)] bg-[var(--nb-bg-card)] sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="w-10 h-10 border-2 border-[var(--nb-border)] flex items-center justify-center hover:bg-[var(--nb-primary)] hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-xl font-bold text-[var(--nb-text)]">Projects</h1>
              <p className="text-sm text-[var(--nb-text-muted)]">
                {loading ? "Loading from GitHub..." : `${projects.length} repositories`}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="p-2 border-2 border-[var(--nb-border)] hover:bg-[var(--nb-primary)] hover:text-white transition-colors disabled:opacity-50"
              title="Refresh from GitHub"
            >
              <RefreshCw className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`} />
            </button>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Sync Status */}
        {lastFetched && (
          <div className="mb-6 flex items-center gap-2 text-sm text-[var(--nb-text-muted)]">
            <Clock className="w-4 h-4" />
            Last synced: {formatDate(lastFetched)}
          </div>
        )}

        {/* Featured Projects */}
        <section className="mb-12">
          <h2 className="text-lg font-bold text-[var(--nb-text)] mb-6 flex items-center gap-2">
            <Star className="w-5 h-5 text-[var(--nb-primary)]" />
            Featured
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map((project, index) => (
              <div
                key={project.id}
                className="bg-[var(--nb-bg-card)] border-3 border-[var(--nb-border)] shadow-[4px_4px_0_0_var(--nb-border)] p-6 flex flex-col h-full hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_0_var(--nb-border)] transition-all cursor-pointer animate-slide-in"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => setSelectedProject(project)}
              >
                <div className="flex items-start justify-between mb-3">
                  <Folder className="w-6 h-6 text-[var(--nb-primary)]" />
                  <div className="flex items-center gap-2">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="hover:text-[var(--nb-primary)] transition-colors"
                      >
                        <ExternalLink className="w-4 h-4 text-[var(--nb-text-muted)]" />
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="hover:text-[var(--nb-primary)] transition-colors"
                      >
                        <Github className="w-4 h-4 text-[var(--nb-text-muted)]" />
                      </a>
                    )}
                  </div>
                </div>

                <h3 className="text-[var(--nb-text)] font-bold text-lg mb-2">{project.title}</h3>
                <p className="text-[var(--nb-text-muted)] text-sm flex-grow mb-4">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.slice(0, 3).map((tag, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 text-xs font-semibold border-2 border-[var(--nb-border)] text-[var(--nb-text)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-4 text-sm text-[var(--nb-text-muted)]">
                  {project.language && (
                    <div className="flex items-center gap-1">
                      <span
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: languageColors[project.language] || "#888" }}
                      />
                      {project.language}
                    </div>
                  )}
                  {project.stars > 0 && (
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4" />
                      {project.stars}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Other Projects */}
        {otherProjects.length > 0 && (
          <section>
            <h2 className="text-lg font-bold text-[var(--nb-text)] mb-6 flex items-center gap-2">
              <Folder className="w-5 h-5 text-[var(--nb-text-muted)]" />
              Other Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {otherProjects.map((project, index) => (
                <div
                  key={project.id}
                  className="bg-[var(--nb-bg-card)] border-3 border-[var(--nb-border)] shadow-[4px_4px_0_0_var(--nb-border)] p-4 flex items-center gap-4 hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_0_var(--nb-border)] transition-all cursor-pointer animate-slide-in"
                  style={{ animationDelay: `${(featuredProjects.length + index) * 0.1}s` }}
                  onClick={() => setSelectedProject(project)}
                >
                  <Folder className="w-5 h-5 text-[var(--nb-primary)] flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[var(--nb-text)] font-semibold truncate">{project.title}</h3>
                    <p className="text-[var(--nb-text-muted)] text-sm truncate">{project.description}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {project.language && (
                      <span
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: languageColors[project.language] || "#888" }}
                      />
                    )}
                    {project.stars > 0 && (
                      <span className="text-sm text-[var(--nb-text-muted)] flex items-center gap-1">
                        <Star className="w-3 h-3" />
                        {project.stars}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Project Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="bg-[var(--nb-bg-card)] border-3 border-[var(--nb-border)] shadow-[8px_8px_0_0_var(--nb-border)] max-w-lg w-full p-6 animate-slide-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-xl font-bold text-[var(--nb-text)]">{selectedProject.title}</h2>
                {selectedProject.language && (
                  <div className="flex items-center gap-2 mt-1 text-sm text-[var(--nb-text-muted)]">
                    <span
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: languageColors[selectedProject.language] || "#888" }}
                    />
                    {selectedProject.language}
                    <span className="mx-1">·</span>
                    <Clock className="w-3 h-3" />
                    Updated {formatDate(selectedProject.lastUpdated)}
                  </div>
                )}
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="text-[var(--nb-text-muted)] hover:text-[var(--nb-text)]"
              >
                ✕
              </button>
            </div>

            <p className="text-[var(--nb-text-muted)] mb-4">
              {selectedProject.longDescription || selectedProject.description}
            </p>

            {/* File Tree Preview */}
            {selectedProject.tree.length > 0 && (
              <div className="bg-[var(--nb-bg)] border-2 border-[var(--nb-border)] p-3 mb-4 font-mono text-sm">
                <div className="text-[var(--nb-text-muted)] mb-2">Files:</div>
                {selectedProject.tree.slice(0, 6).map((item, i) => (
                  <div key={i} className="text-[var(--nb-text)]">
                    {item.type === "tree" ? "📁" : "📄"} {item.path}
                  </div>
                ))}
                {selectedProject.tree.length > 6 && (
                  <div className="text-[var(--nb-text-muted)]">
                    ... and {selectedProject.tree.length - 6} more
                  </div>
                )}
              </div>
            )}

            <div className="flex flex-wrap gap-2 mb-6">
              {selectedProject.tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-3 py-1 text-sm font-semibold bg-[var(--nb-primary)] text-white border-2 border-[var(--nb-border)]"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex gap-3">
              {selectedProject.liveUrl && (
                <a
                  href={selectedProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-[var(--nb-primary)] border-2 border-[var(--nb-border)] py-2 text-white font-semibold flex items-center justify-center gap-2 hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_0_var(--nb-border)] shadow-[4px_4px_0_0_var(--nb-border)] transition-all"
                >
                  <ExternalLink className="w-4 h-4" />
                  Live Demo
                </a>
              )}
              {selectedProject.githubUrl && (
                <a
                  href={selectedProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 border-2 border-[var(--nb-border)] py-2 text-[var(--nb-text)] font-semibold flex items-center justify-center gap-2 hover:bg-[var(--nb-primary)] hover:text-white hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_0_var(--nb-border)] shadow-[4px_4px_0_0_var(--nb-border)] transition-all"
                >
                  <Github className="w-4 h-4" />
                  Source Code
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
