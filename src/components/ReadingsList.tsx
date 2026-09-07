"use client";

import Link from "next/link";
import { FileText, ExternalLink } from "lucide-react";

interface Reading {
  title: string;
  source: string;
  type: "paper" | "blog" | "article";
  url: string;
  date?: string;
}

interface ReadingsListProps {
  readings?: Reading[];
}

const typeColors = {
  paper: "bg-purple-500",
  blog: "bg-[var(--nb-primary)]",
  article: "bg-orange-500",
};

const defaultReadings: Reading[] = [
  { title: "What Is ChatGPT Doing … and Why Does It Work?", source: "Stephen Wolfram", type: "blog", url: "https://writings.stephenwolfram.com/2023/02/what-is-chatgpt-doing-and-why-does-it-work/", date: "2023" },
  { title: "Large Language Models", source: "Gregory Gundersen", type: "blog", url: "https://gregorygundersen.com/blog/2025/10/01/large-language-models/", date: "2025" },
  { title: "Greeks", source: "Gregory Gundersen", type: "blog", url: "https://gregorygundersen.com/blog/2023/10/08/greeks/", date: "2023" },
  { title: "The Lottery Ticket Hypothesis", source: "Frankle & Carbin", type: "paper", url: "https://proceedings.mlr.press/v119/frankle20a.html", date: "2020" },
  { title: "Representation Topology Divergence", source: "Barannikov et al.", type: "paper", url: "https://arxiv.org/pdf/2201.00058", date: "2022" },
  { title: "Shredder", source: "F. Mireshghallah et al.", type: "paper", url: "https://cseweb.ucsd.edu/~fmireshg/2020-asplos-shredder.pdf", date: "2020" },
  { title: "Category Theory", source: "B. Fontain", type: "paper", url: "https://pi.math.cornell.edu/~bfontain/cattheory.pdf", date: "Recent" },
];

export default function ReadingsList({ readings = defaultReadings }: ReadingsListProps) {
  return (
    <div className="bg-[var(--nb-bg-card)] border-3 border-[var(--nb-border)] p-5 shadow-[4px_4px_0_0_var(--nb-border)] h-full flex flex-col">
      <div className="mb-4">
        <h3 className="text-[var(--nb-text)] font-bold text-lg flex items-center gap-2">
          <FileText className="w-5 h-5" />
          Readings
        </h3>
        <p className="text-[var(--nb-text-muted)] text-sm">Papers, blogs, and articles</p>
      </div>

      <div className="flex-1 space-y-3 overflow-auto">
        {readings.map((reading, index) => (
          <a
            key={index}
            href={reading.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-3 group"
          >
            <div className={`w-2 h-2 mt-2 ${typeColors[reading.type]} flex-shrink-0`} />
            <div className="flex-1 min-w-0">
              <div className="text-[var(--nb-text)] text-sm font-medium group-hover:text-[var(--nb-primary)] transition-colors flex items-center gap-1">
                <span className="truncate">{reading.title}</span>
                <ExternalLink className="w-3 h-3 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="text-[var(--nb-text-muted)] text-xs">
                {reading.source} · {reading.date}
              </div>
            </div>
          </a>
        ))}
      </div>

      <Link 
        href="/readings"
        className="mt-4 w-full border-2 border-[var(--nb-border)] py-2 text-[var(--nb-text)] font-semibold hover:bg-[var(--nb-primary)] hover:text-white hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_0_var(--nb-border)] shadow-[4px_4px_0_0_var(--nb-border)] transition-all text-sm text-center block"
      >
        View reading list
      </Link>
    </div>
  );
}

