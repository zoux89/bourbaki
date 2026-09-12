"use client";

import Link from "next/link";
import { Lightbulb, ArrowRight } from "lucide-react";

interface Writing {
  title: string;
  excerpt: string;
  date: string;
  slug: string;
  tags?: string[];
  sources?: string[];
}

interface WritingsListProps {
  writings?: Writing[];
}

const defaultWritings: Writing[] = [
  {
    title: "Distributional Parameters in Proper Junta Learning",
    date: "Aug 2026",
    slug: "distributional-parameters-junta-learning",
    tags: ["Learning Theory", "Parameterized Complexity"],
    excerpt: "",
  },
  {
    title: "Universality in Ternary Logic",
    date: "Dec 2025",
    slug: "ternary-logic",
    tags: ["Logic", "Computer Science"],
    excerpt: "",
  },
  {
    title: "Notes on Category Theory",
    date: "Sep 2025",
    slug: "category-theory",
    tags: ["Category Theory", "Abstract Algebra"],
    excerpt: "",
  },
  {
    title: "Polynomial Approximation of DNF Formulae",
    date: "Dec 2024",
    slug: "dnf-learning-chebyshev",
    tags: ["Learning Theory", "Approximation"],
    excerpt: "",
  },
];

export default function WritingsList({ writings = defaultWritings }: WritingsListProps) {
  return (
    <div className="bg-[var(--nb-bg-card)] border-3 border-[var(--nb-border)] p-5 shadow-[4px_4px_0_0_var(--nb-border)] h-full flex flex-col">
      <div className="mb-4">
        <h3 className="text-[var(--nb-text)] font-bold text-lg flex items-center gap-2">
          <Lightbulb className="w-5 h-5" />
          Scribblings
        </h3>
        <p className="text-[var(--nb-text-muted)] text-sm">Half-baked ideas & explorations</p>
      </div>

      <div className="flex-1 space-y-4 overflow-auto">
        {writings.map((writing, index) => (
          <a
            key={index}
            href={`/blog/${writing.slug}`}
            className="block border-2 border-[var(--nb-border)] p-3 hover:bg-[var(--nb-primary)] hover:border-[var(--nb-primary)] transition-colors group"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-sm text-[var(--nb-text)] group-hover:text-white">
                  {writing.title}
                </div>
                <div className="flex items-center gap-2 mt-2 flex-wrap">
                  {writing.tags?.map((tag, i) => (
                    <span
                      key={i}
                      className="text-xs px-1.5 py-0.5 bg-[var(--nb-primary)] text-white group-hover:bg-white group-hover:text-[var(--nb-primary)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <ArrowRight className="w-4 h-4 flex-shrink-0 text-[var(--nb-text-muted)] group-hover:text-white opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </a>
        ))}
      </div>

      <Link 
        href="/blog"
        className="mt-4 w-full bg-[var(--nb-primary)] border-2 border-[var(--nb-border)] py-2 text-white font-semibold flex items-center justify-center gap-2 hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_0_var(--nb-border)] shadow-[4px_4px_0_0_var(--nb-border)] transition-all text-sm"
      >
        View all scribblings
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}

