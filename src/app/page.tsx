"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import CreativeCorner from "@/components/CreativeCorner";
import AutomataGrid from "@/components/AutomataGrid";
import GitHubProjects from "@/components/GitHubProjects";
import BooksCarousel from "@/components/BooksCarousel";
import TerminalWindow from "@/components/TerminalWindow";
import ReadingsList from "@/components/ReadingsList";
import WritingsList from "@/components/WritingsList";
import Snapshots from "@/components/Snapshots";
import { Terminal, Github, Mail } from "lucide-react";

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[var(--nb-bg)] p-4 md:p-6 lg:p-8 transition-colors duration-300">
      {/* Header */}
      <header className="max-w-7xl mx-auto mb-6">
        <div className="bg-[var(--nb-bg-card)] border-3 border-[var(--nb-border)] shadow-[4px_4px_0_0_var(--nb-border)] p-4 flex items-center justify-between transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[var(--nb-primary)] border-2 border-[var(--nb-border)] flex items-center justify-center">
              <Terminal className="w-5 h-5 text-white" />
            </div>
            <span className="text-[var(--nb-text)] font-bold text-xl">bourbaki.blog</span>
          </div>
          
          <div className="flex items-center gap-4">
            <nav className="hidden md:flex items-center gap-4">
              <Link href="/projects" className="text-[var(--nb-text)] hover:text-[var(--nb-primary)] transition-colors font-medium">Projects</Link>
              <Link href="/blog" className="text-[var(--nb-text)] hover:text-[var(--nb-primary)] transition-colors font-medium">Blog</Link>
              <Link href="/terminal" className="text-[var(--nb-text)] hover:text-[var(--nb-primary)] transition-colors font-medium">Terminal</Link>
            </nav>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Grid */}
      <main className="max-w-7xl mx-auto">
        {/* Row 1: Creative Corner | Automata | GitHub Projects | Books */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <div className="min-h-[280px] animate-slide-in" style={{ animationDelay: "0.1s" }}>
            <CreativeCorner />
          </div>
          <div className="min-h-[280px] animate-slide-in" style={{ animationDelay: "0.2s" }}>
            <AutomataGrid />
          </div>
          <div className="min-h-[280px] animate-slide-in" style={{ animationDelay: "0.3s" }}>
            <GitHubProjects />
          </div>
          <div className="min-h-[280px] animate-slide-in" style={{ animationDelay: "0.4s" }}>
            <BooksCarousel />
          </div>
        </div>

        {/* Row 2: Terminal | Readings | Writings | Snapshots */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <div id="terminal" className="min-h-[320px] animate-slide-in" style={{ animationDelay: "0.5s" }}>
            <TerminalWindow />
          </div>
          <div className="min-h-[320px] animate-slide-in" style={{ animationDelay: "0.6s" }}>
            <ReadingsList />
          </div>
          <div id="writings" className="min-h-[320px] animate-slide-in" style={{ animationDelay: "0.7s" }}>
            <WritingsList />
          </div>
          <div className="min-h-[320px] animate-slide-in" style={{ animationDelay: "0.8s" }}>
            <Snapshots />
          </div>
        </div>

        {/* Footer CTA */}
        <div className="animate-slide-in" style={{ animationDelay: "0.9s" }}>
          <div className="bg-[var(--nb-primary)] border-3 border-[var(--nb-border)] shadow-[4px_4px_0_0_var(--nb-border)] p-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-white mb-1">Let&apos;s connect</h2>
              <p className="text-white/80 text-sm">Always open to interesting conversations and collaborations</p>
            </div>
            <div className="flex items-center gap-3">
              <a
                href="mailto:hello@bourbaki.blog"
                className="w-12 h-12 bg-white border-2 border-[var(--nb-border)] flex items-center justify-center hover:bg-[var(--nb-bg)] hover:translate-x-0.5 hover:translate-y-0.5 shadow-[4px_4px_0_0_var(--nb-border)] hover:shadow-[2px_2px_0_0_var(--nb-border)] transition-all"
              >
                <Mail className="w-5 h-5 text-[var(--nb-primary)]" />
              </a>
              <a
                href="https://github.com/bour278"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-white border-2 border-[var(--nb-border)] flex items-center justify-center hover:bg-[var(--nb-bg)] hover:translate-x-0.5 hover:translate-y-0.5 shadow-[4px_4px_0_0_var(--nb-border)] hover:shadow-[2px_2px_0_0_var(--nb-border)] transition-all"
              >
                <Github className="w-5 h-5 text-[var(--nb-primary)]" />
              </a>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto mt-8">
        <div className="border-t-3 border-[var(--nb-border)] pt-6 pb-4 flex flex-col md:flex-row items-center justify-between gap-4 transition-colors">
          <p className="text-[var(--nb-text-muted)] text-sm">2026 bourbaki.blog - Built with curiosity</p>
          <div className="flex items-center gap-2 text-[var(--nb-text-muted)] text-sm">
            <span>Made with</span>
            <span className="text-[var(--nb-primary)] font-mono">Next.js</span>
            <span>+</span>
            <span className="text-[var(--nb-primary)] font-mono">Tailwind</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
