"use client";

import { ExternalLink, Github } from "lucide-react";

interface ProjectCardProps {
  title: string;
  description: string;
  tags?: string[];
  liveUrl?: string;
  githubUrl?: string;
}

export default function ProjectCard({
  title,
  description,
  tags = [],
  liveUrl,
  githubUrl,
}: ProjectCardProps) {
  return (
    <div className="bg-[#1a1a1a] border-3 border-white shadow-[4px_4px_0_0_#fff] p-5 flex flex-col h-full">
      <h3 className="text-white font-bold text-lg mb-2">{title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed mb-4 flex-grow">
        {description}
      </p>

      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-[#0066FF] text-white text-xs font-semibold border-2 border-white"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="flex gap-2">
        {liveUrl && (
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-[#0066FF] border-2 border-white py-2 text-white text-sm font-semibold flex items-center justify-center gap-2 hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_0_#fff] shadow-[4px_4px_0_0_#fff] transition-all"
          >
            <ExternalLink className="w-4 h-4" />
            Live
          </a>
        )}
        {githubUrl && (
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-transparent border-2 border-white py-2 text-white text-sm font-semibold flex items-center justify-center gap-2 hover:bg-[#0066FF] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_0_#fff] shadow-[4px_4px_0_0_#fff] transition-all"
          >
            <Github className="w-4 h-4" />
            Code
          </a>
        )}
      </div>
    </div>
  );
}

