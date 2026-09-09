"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { Terminal, Minus, X, Maximize2 } from "lucide-react";
import { useGitHubData } from "@/lib/useGitHubData";

interface FileSystemNode {
  [key: string]: string[] | FileSystemNode;
}

export default function TerminalWindow() {
  const { repos, fileSystem, loading } = useGitHubData();
  const [history, setHistory] = useState<string[]>([
    "Welcome to bourbaki's shell",
    "Type 'help' for available commands",
    "",
  ]);
  const [currentPath, setCurrentPath] = useState("~");
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const getDirectory = useCallback((path: string): string[] | FileSystemNode | null => {
    const parts = path.split("/").filter(Boolean);
    let current: string[] | FileSystemNode = fileSystem as FileSystemNode;
    
    for (const part of parts) {
      if (typeof current === "object" && !Array.isArray(current) && part in current) {
        current = current[part] as string[] | FileSystemNode;
      } else {
        return null;
      }
    }
    return current;
  }, [fileSystem]);

  const handleCommand = useCallback((cmd: string) => {
    const parts = cmd.trim().split(" ");
    const command = parts[0].toLowerCase();
    const args = parts.slice(1);

    let output: string[] = [];

    switch (command) {
      case "help":
        output = [
          "Available commands:",
          "  ls       - list directory contents",
          "  cd       - change directory",
          "  pwd      - print working directory",
          "  clear    - clear terminal",
          "  whoami   - display user info",
          "  cat      - display file contents",
          "  projects - list featured projects",
          "  readings - list papers and articles",
        ];
        break;

      case "projects":
        if (loading) {
          output = ["Loading projects from GitHub..."];
        } else {
          output = ["", ...repos.slice(0, 6).map((repo) => {
            const lang = (repo.language || "Code").padEnd(10);
            return `→ ${repo.name.padEnd(14)} ${lang} ${repo.description?.slice(0, 30) || ""}`;
          }), "", "cd ~/projects/<name> to explore", ""];
        }
        break;

      case "readings":
        output = [
          "",
          "→ Reversible Model Merging    Alipour et al.",
          "→ SVCCA: NN Representations   NeurIPS 2017",
          "→ Hyperarithmetical Sets      Moschovakis",
          "→ Signature Methods Trading   Kuan-Yang",
          "",
          "Visit /readings for more",
          "",
        ];
        break;

      case "ls": {
        const dir = getDirectory(currentPath);
        if (dir && typeof dir === "object" && !Array.isArray(dir)) {
          output = [Object.keys(dir).join("  ")];
        } else if (Array.isArray(dir)) {
          output = [dir.join("  ")];
        } else {
          output = ["ls: cannot access: No such directory"];
        }
        break;
      }

      case "cd":
        if (!args[0] || args[0] === "~") {
          setCurrentPath("~");
        } else if (args[0] === "..") {
          const pathParts = currentPath.split("/").filter(Boolean);
          if (pathParts.length > 1) {
            pathParts.pop();
            setCurrentPath(pathParts.join("/"));
          } else {
            setCurrentPath("~");
          }
        } else {
          const newPath = currentPath === "~" ? `~/${args[0]}` : `${currentPath}/${args[0]}`;
          const dir = getDirectory(newPath);
          if (dir && typeof dir === "object") {
            setCurrentPath(newPath);
          } else {
            output = [`cd: ${args[0]}: No such directory`];
          }
        }
        break;

      case "pwd":
        output = [currentPath.replace("~", "/home/bourbaki")];
        break;

      case "clear":
        setHistory([]);
        return;

      case "whoami":
        output = ["bourbaki - CS, Logic, and Games"];
        break;

      case "cat":
        if (!args[0]) {
          output = ["cat: missing operand"];
        } else if (args[0] === "README.md") {
          // Find current project
          const pathParts = currentPath.split("/");
          const projectName = pathParts[pathParts.length - 1];
          const repo = repos.find((r) => r.name === projectName);
          if (repo) {
            output = [
              `# ${repo.name}`,
              "",
              repo.description || "No description",
              "",
              `Language: ${repo.language || "Unknown"}`,
              `Stars: ${repo.stars}`,
              `URL: ${repo.url}`,
            ];
          } else {
            output = ["# Project", "", "No description available.", "Check out the source on GitHub!"];
          }
        } else {
          output = [`cat: ${args[0]}: Permission denied (try visiting GitHub)`];
        }
        break;

      case "":
        break;

      default:
        output = [`command not found: ${command}`];
    }

    setHistory((prev) => [...prev, `${currentPath} $ ${cmd}`, ...output]);
  }, [currentPath, getDirectory, loading, repos]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleCommand(input);
      setInput("");
    }
  };

  return (
    <div className="border-3 border-[var(--nb-border)] shadow-[4px_4px_0_0_var(--nb-border)] h-full flex flex-col overflow-hidden">
      {/* Title bar */}
      <div className="bg-[var(--nb-bg-card)] border-b-3 border-[var(--nb-border)] px-3 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-[var(--nb-text)]" />
          <span className="text-sm font-semibold text-[var(--nb-text)]">terminal</span>
          {loading && <span className="text-xs text-[var(--nb-text-muted)]">(syncing...)</span>}
        </div>
        <div className="flex items-center gap-1">
          <button className="w-4 h-4 flex items-center justify-center hover:bg-[var(--nb-text)]/10">
            <Minus className="w-3 h-3 text-[var(--nb-text-muted)]" />
          </button>
          <Link href="/terminal" className="w-4 h-4 flex items-center justify-center hover:bg-[var(--nb-primary)]/20">
            <Maximize2 className="w-2.5 h-2.5 text-[var(--nb-text-muted)]" />
          </Link>
          <button className="w-4 h-4 flex items-center justify-center hover:bg-red-500/20">
            <X className="w-3 h-3 text-[var(--nb-text-muted)]" />
          </button>
        </div>
      </div>

      {/* Terminal content */}
      <div 
        ref={terminalRef}
        className="flex-1 bg-[#0a0a0a] p-4 font-mono text-sm overflow-auto cursor-text"
        onClick={() => inputRef.current?.focus()}
      >
        {history.map((line, i) => (
          <div key={i} className="text-[#22c55e] whitespace-pre-wrap">
            {line}
          </div>
        ))}
        <div className="flex items-center text-[#22c55e]">
          <span className="text-[#0066FF]">{currentPath}</span>
          <span className="mx-1">$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent outline-none text-[#22c55e] caret-[#22c55e]"
            spellCheck={false}
            autoComplete="off"
          />
          <span className="w-2 h-4 bg-[#22c55e] terminal-cursor" />
        </div>
      </div>
    </div>
  );
}
