"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, ExternalLink, FileText, BookOpen, Newspaper, ScrollText } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

interface Reading {
  id: string;
  title: string;
  author: string;
  source: string;
  type: "paper" | "blog" | "article" | "book";
  url: string;
  description?: string;
  date?: string;
  tags?: string[];
}

const typeConfig = {
  paper: { color: "bg-purple-500", icon: ScrollText, label: "Paper" },
  blog: { color: "bg-[var(--nb-primary)]", icon: BookOpen, label: "Blog Post" },
  article: { color: "bg-orange-500", icon: Newspaper, label: "Article" },
  book: { color: "bg-emerald-500", icon: FileText, label: "Book" },
};

const defaultReadings: Reading[] = [
  {
    id: "chatgpt-wolfram",
    title: "What Is ChatGPT Doing … and Why Does It Work?",
    author: "Stephen Wolfram",
    source: "writings.stephenwolfram.com",
    type: "blog",
    url: "https://writings.stephenwolfram.com/2023/02/what-is-chatgpt-doing-and-why-does-it-work/",
    description: "An in-depth exploration of ChatGPT's mechanisms and the reasons behind its effectiveness.",
    date: "2023",
    tags: ["LLMs", "AI", "ChatGPT"],
  },
  {
    id: "shredder",
    title: "Shredder",
    author: "F. Mireshghallah et al.",
    source: "ASPLOS 2020",
    type: "paper",
    url: "https://cseweb.ucsd.edu/~fmireshg/2020-asplos-shredder.pdf",
    description: "A paper on privacy-preserving computation and data shredding techniques.",
    date: "2020",
    tags: ["Privacy", "Systems", "Security"],
  },
  {
    id: "signature",
    title: "Signature",
    author: "Kuan-Yang",
    source: "Portfolio",
    type: "article",
    url: "https://math-kuanyang.github.io/portfolio/signature/",
    description: "Mathematical exploration of signature methods and their applications.",
    date: "Recent",
    tags: ["Mathematics", "Signature Methods"],
  },
  {
    id: "open-logic",
    title: "Open Logic Project",
    author: "Various Contributors",
    source: "Open Logic Project",
    type: "book",
    url: "https://builds.openlogicproject.org/open-logic-complete.pdf",
    description: "A complete open-source textbook covering logic, set theory, and mathematical foundations.",
    date: "Ongoing",
    tags: ["Logic", "Mathematics", "Set Theory"],
  },
  {
    id: "hyp",
    title: "Hyperbolic Geometry",
    author: "Y. N. Minsky",
    source: "UCLA Mathematics",
    type: "paper",
    url: "https://www.math.ucla.edu/~ynm/papers/hyp.pdf",
    description: "Notes on hyperbolic geometry and its applications.",
    date: "Recent",
    tags: ["Geometry", "Mathematics"],
  },
  {
    id: "cat-theory",
    title: "Category Theory",
    author: "B. Fontain",
    source: "Cornell Mathematics",
    type: "paper",
    url: "https://pi.math.cornell.edu/~bfontain/cattheory.pdf",
    description: "Introduction to category theory and its applications in mathematics.",
    date: "Recent",
    tags: ["Category Theory", "Mathematics"],
  },
  {
    id: "llms-gundersen",
    title: "Large Language Models",
    author: "Gregory Gundersen",
    source: "gregorygundersen.com",
    type: "blog",
    url: "https://gregorygundersen.com/blog/2025/10/01/large-language-models/",
    description: "An exploration of large language models, their architecture, and capabilities.",
    date: "2025",
    tags: ["LLMs", "Deep Learning", "AI"],
  },
  {
    id: "greeks",
    title: "Greeks",
    author: "Gregory Gundersen",
    source: "gregorygundersen.com",
    type: "blog",
    url: "https://gregorygundersen.com/blog/2023/10/08/greeks/",
    description: "Discussion of Greeks in mathematical finance and options pricing.",
    date: "2023",
    tags: ["Finance", "Mathematics", "Options"],
  },
  {
    id: "frankle",
    title: "The Lottery Ticket Hypothesis",
    author: "Jonathan Frankle, Michael Carbin",
    source: "MLR Proceedings",
    type: "paper",
    url: "https://proceedings.mlr.press/v119/frankle20a.html",
    description: "Finding sparse, trainable neural networks within dense networks.",
    date: "2020",
    tags: ["Neural Networks", "Pruning", "Deep Learning"],
  },
  {
    id: "arxiv-2510",
    title: "Recent Research Paper",
    author: "Various Authors",
    source: "arXiv",
    type: "paper",
    url: "https://arxiv.org/html/2510.14163v1",
    description: "A recent research paper from arXiv covering advanced topics.",
    date: "2025",
    tags: ["Research", "arXiv"],
  },
  {
    id: "neurips-2017",
    title: "NeurIPS 2017 Paper",
    author: "Various Authors",
    source: "NeurIPS 2017",
    type: "paper",
    url: "https://proceedings.neurips.cc/paper_files/paper/2017/file/dc6a7e655d7e5840e66733e9ee67cc69-Paper.pdf",
    description: "A research paper from the NeurIPS 2017 conference.",
    date: "2017",
    tags: ["NeurIPS", "Deep Learning"],
  },
  {
    id: "rtd",
    title: "Representation Topology Divergence",
    author: "Barannikov et al.",
    source: "arXiv",
    type: "paper",
    url: "https://arxiv.org/pdf/2201.00058",
    description: "A method for comparing neural network representations using topological methods.",
    date: "2022",
    tags: ["Topology", "Neural Networks", "Representation Learning"],
  },
];

export default function ReadingsPage() {
  const [mounted, setMounted] = useState(false);
  const [selectedReading, setSelectedReading] = useState<Reading | null>(null);
  const [filter, setFilter] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const filteredReadings = filter
    ? defaultReadings.filter((r) => r.type === filter)
    : defaultReadings;

  const types = ["paper", "blog", "article", "book"] as const;

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
              <h1 className="text-xl font-bold text-[var(--nb-text)]">Reading List</h1>
              <p className="text-sm text-[var(--nb-text-muted)]">
                Papers, blogs, articles & books
              </p>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setFilter(null)}
            className={`px-4 py-2 border-2 border-[var(--nb-border)] font-semibold text-sm transition-all ${
              filter === null
                ? "bg-[var(--nb-primary)] text-white shadow-[2px_2px_0_0_var(--nb-border)]"
                : "bg-[var(--nb-bg-card)] text-[var(--nb-text)] hover:translate-x-0.5 hover:translate-y-0.5"
            }`}
          >
            All ({defaultReadings.length})
          </button>
          {types.map((type) => {
            const config = typeConfig[type];
            const count = defaultReadings.filter((r) => r.type === type).length;
            if (count === 0) return null;
            return (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`px-4 py-2 border-2 border-[var(--nb-border)] font-semibold text-sm transition-all flex items-center gap-2 ${
                  filter === type
                    ? "bg-[var(--nb-primary)] text-white shadow-[2px_2px_0_0_var(--nb-border)]"
                    : "bg-[var(--nb-bg-card)] text-[var(--nb-text)] hover:translate-x-0.5 hover:translate-y-0.5"
                }`}
              >
                <span className={`w-2 h-2 ${config.color}`} />
                {config.label}s ({count})
              </button>
            );
          })}
        </div>

        {/* Readings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReadings.map((reading, index) => {
            const config = typeConfig[reading.type];
            const Icon = config.icon;
            return (
              <div
                key={reading.id}
                className="bg-[var(--nb-bg-card)] border-3 border-[var(--nb-border)] shadow-[4px_4px_0_0_var(--nb-border)] p-5 flex flex-col h-full hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_0_var(--nb-border)] transition-all cursor-pointer animate-slide-in"
                style={{ animationDelay: `${index * 0.05}s` }}
                onClick={() => setSelectedReading(reading)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className={`w-10 h-10 ${config.color} border-2 border-[var(--nb-border)] flex items-center justify-center`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xs text-[var(--nb-text-muted)] font-mono">{reading.date}</span>
                </div>

                <h3 className="text-[var(--nb-text)] font-bold text-base mb-1 line-clamp-2">
                  {reading.title}
                </h3>
                <p className="text-[var(--nb-primary)] text-sm font-medium mb-2">
                  {reading.author}
                </p>
                <p className="text-[var(--nb-text-muted)] text-sm flex-grow mb-3 line-clamp-3">
                  {reading.description}
                </p>

                <div className="flex items-center justify-between mt-auto">
                  <span className="text-xs text-[var(--nb-text-muted)]">{reading.source}</span>
                  <ExternalLink className="w-4 h-4 text-[var(--nb-text-muted)]" />
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* Reading Modal */}
      {selectedReading && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedReading(null)}
        >
          <div
            className="bg-[var(--nb-bg-card)] border-3 border-[var(--nb-border)] shadow-[8px_8px_0_0_var(--nb-border)] max-w-lg w-full p-6 animate-slide-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 ${typeConfig[selectedReading.type].color} border-2 border-[var(--nb-border)] flex items-center justify-center`}>
                  {(() => {
                    const Icon = typeConfig[selectedReading.type].icon;
                    return <Icon className="w-6 h-6 text-white" />;
                  })()}
                </div>
                <div>
                  <span className="text-xs font-semibold text-[var(--nb-text-muted)] uppercase tracking-wider">
                    {typeConfig[selectedReading.type].label}
                  </span>
                  <p className="text-xs text-[var(--nb-text-muted)]">{selectedReading.date}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedReading(null)}
                className="text-[var(--nb-text-muted)] hover:text-[var(--nb-text)] text-xl"
              >
                ✕
              </button>
            </div>

            <h2 className="text-xl font-bold text-[var(--nb-text)] mb-2">
              {selectedReading.title}
            </h2>
            
            <p className="text-[var(--nb-primary)] font-semibold mb-1">
              {selectedReading.author}
            </p>
            <p className="text-sm text-[var(--nb-text-muted)] mb-4">
              Published in {selectedReading.source}
            </p>

            <p className="text-[var(--nb-text-muted)] mb-4">
              {selectedReading.description}
            </p>

            {selectedReading.tags && selectedReading.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedReading.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 text-sm font-semibold bg-[var(--nb-bg)] text-[var(--nb-text)] border-2 border-[var(--nb-border)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <a
              href={selectedReading.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-[var(--nb-primary)] border-2 border-[var(--nb-border)] py-3 text-white font-semibold flex items-center justify-center gap-2 hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_0_var(--nb-border)] shadow-[4px_4px_0_0_var(--nb-border)] transition-all"
            >
              <ExternalLink className="w-4 h-4" />
              Read Now
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

