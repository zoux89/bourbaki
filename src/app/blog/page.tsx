"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Calendar, Clock, Tag } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

interface Post {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content?: string;
  date: string;
  readTime: string;
  tags: string[];
  featured?: boolean;
}

const posts: Post[] = [
  {
    id: 1,
    slug: "ternary-logic",
    title: "Universality in Ternary Logic",
    excerpt: "Optimal radix economy and the enumeration of universal gates in 3-valued logic systems.",
    date: "Dec 2025",
    readTime: "12 min read",
    tags: ["Logic", "Computer Science"],
    featured: true,
  },
  {
    id: 2,
    slug: "category-theory",
    title: "Notes on Category Theory",
    excerpt: "A formal summary of categories, functors, natural transformations, and related concepts.",
    date: "Sep 2025",
    readTime: "6 min read",
    tags: ["Category Theory", "Abstract Algebra", "Math"],
    featured: false,
  },
  {
    id: 3,
    slug: "dnf-learning-chebyshev",
    title: "Polynomial Approximation of DNF Formulae",
    excerpt: "Investigating low-degree approximations of boolean functions using Chebyshev polynomials and learning theory.",
    date: "Dec 2024",
    readTime: "10 min read",
    tags: ["Learning Theory", "Approximation", "Math"],
    featured: false,
  },
];

export default function BlogPage() {
  const [mounted, setMounted] = useState(false);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const allTags = Array.from(new Set(posts.flatMap((p) => p.tags)));
  const filteredPosts = selectedTag
    ? posts.filter((p) => p.tags.includes(selectedTag))
    : posts;
  const featuredPost = posts.find((p) => p.featured);

  return (
    <div className="min-h-screen bg-[var(--nb-bg)] transition-colors duration-300">
      {/* Header */}
      <header className="border-b-3 border-[var(--nb-border)] bg-[var(--nb-bg-card)] sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="w-10 h-10 border-2 border-[var(--nb-border)] flex items-center justify-center hover:bg-[var(--nb-primary)] hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-xl font-bold text-[var(--nb-text)]">Blog</h1>
              <p className="text-sm text-[var(--nb-text-muted)]">Thoughts & explorations</p>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Featured Post */}
        {featuredPost && !selectedTag && (
          <section className="mb-12 animate-slide-in">
            <Link href={`/blog/${featuredPost.slug}`}>
              <div className="bg-[var(--nb-primary)] border-3 border-[var(--nb-border)] shadow-[6px_6px_0_0_var(--nb-border)] p-8 hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0_0_var(--nb-border)] transition-all cursor-pointer">
                <div className="flex items-center gap-2 mb-4 text-white/80 text-sm">
                  <span className="px-2 py-0.5 bg-white/20 font-semibold">FEATURED</span>
                  <span>·</span>
                  <Calendar className="w-4 h-4" />
                  <span>{featuredPost.date}</span>
                  <span>·</span>
                  <Clock className="w-4 h-4" />
                  <span>{featuredPost.readTime}</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">{featuredPost.title}</h2>
                <p className="text-white/90 text-lg mb-6">{featuredPost.excerpt}</p>
                <div className="flex items-center gap-2">
                  <span className="text-white font-semibold">Read article</span>
                  <ArrowRight className="w-5 h-5 text-white" />
                </div>
              </div>
            </Link>
          </section>
        )}

        {/* Tags Filter */}
        <section className="mb-8 animate-slide-in" style={{ animationDelay: "0.1s" }}>
          <div className="flex items-center gap-2 flex-wrap">
            <Tag className="w-4 h-4 text-[var(--nb-text-muted)]" />
            <button
              onClick={() => setSelectedTag(null)}
              className={`px-3 py-1 text-sm font-semibold border-2 border-[var(--nb-border)] transition-all ${
                !selectedTag
                  ? "bg-[var(--nb-primary)] text-white"
                  : "text-[var(--nb-text)] hover:bg-[var(--nb-primary)] hover:text-white"
              }`}
            >
              All
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                className={`px-3 py-1 text-sm font-semibold border-2 border-[var(--nb-border)] transition-all ${
                  selectedTag === tag
                    ? "bg-[var(--nb-primary)] text-white"
                    : "text-[var(--nb-text)] hover:bg-[var(--nb-primary)] hover:text-white"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </section>

        {/* Posts List */}
        <section className="space-y-6">
          {filteredPosts.map((post, index) => (
            <Link key={post.id} href={`/blog/${post.slug}`}>
              <article
                className="bg-[var(--nb-bg-card)] border-3 border-[var(--nb-border)] shadow-[4px_4px_0_0_var(--nb-border)] p-6 hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_0_var(--nb-border)] transition-all cursor-pointer group animate-slide-in mb-6"
                style={{ animationDelay: `${(index + 2) * 0.1}s` }}
              >
                <div className="flex items-center gap-3 mb-3 text-sm text-[var(--nb-text-muted)]">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{post.date}</span>
                  </div>
                  <span>·</span>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-[var(--nb-text)] mb-2 group-hover:text-[var(--nb-primary)] transition-colors">
                  {post.title}
                </h3>
                <p className="text-[var(--nb-text-muted)] mb-4">{post.excerpt}</p>

                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 text-xs font-semibold bg-[var(--nb-primary)] text-white"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <ArrowRight className="w-5 h-5 text-[var(--nb-text-muted)] group-hover:text-[var(--nb-primary)] group-hover:translate-x-1 transition-all" />
                </div>
              </article>
            </Link>
          ))}
        </section>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-[var(--nb-text-muted)]">No posts found with tag &quot;{selectedTag}&quot;</p>
            <button
              onClick={() => setSelectedTag(null)}
              className="mt-4 px-4 py-2 bg-[var(--nb-primary)] text-white font-semibold border-2 border-[var(--nb-border)]"
            >
              Clear filter
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

