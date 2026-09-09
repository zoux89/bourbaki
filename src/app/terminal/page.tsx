"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { Terminal, ArrowLeft } from "lucide-react";
import { useGitHubData } from "@/lib/useGitHubData";

interface FileSystemNode {
  [key: string]: string[] | FileSystemNode;
}

const asciiArt = `
    __                     __          __   _
   / /_  ____  __  _______/ /_  ____ _/ /__(_)
  / __ \\/ __ \\/ / / / ___/ __ \\/ __ \`/ //_/ /
 / /_/ / /_/ / /_/ / /  / /_/ / /_/ / ,< / /
/_.___/\\____/\\__,_/_/  /_.___/\\__,_/_/|_/_/

  Welcome to my terminal. Type 'help' to get started.
`;

export default function TerminalPage() {
  const { repos, fileSystem, loading } = useGitHubData();
  const [history, setHistory] = useState<string[]>([asciiArt]);
  const [currentPath, setCurrentPath] = useState("~");
  const [input, setInput] = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

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

    if (cmd.trim()) {
      setCommandHistory((prev) => [...prev, cmd]);
      setHistoryIndex(-1);
    }

    switch (command) {
      case "help":
        output = [
          "",
          "+-----------------------------------------------------+",
          "|                  AVAILABLE COMMANDS                  |",
          "+-----------------------------------------------------+",
          "|  ls              - list directory contents           |",
          "|  cd <dir>        - change directory                  |",
          "|  pwd             - print working directory           |",
          "|  cat <file>      - display file contents             |",
          "|  clear           - clear terminal screen             |",
          "|  whoami          - display user info                 |",
          "|  neofetch        - display system info               |",
          "|  projects        - list all projects                 |",
          "|  blog            - list blog posts                   |",
          "|  social          - display social links              |",
          "|  exit            - return to main site               |",
          "+-----------------------------------------------------+",
          "",
        ];
        break;

      case "ls": {
        const lsPath = args[0] ? (args[0].startsWith("~") ? args[0] : `${currentPath}/${args[0]}`) : currentPath;
        const dir = getDirectory(lsPath);
        if (dir && typeof dir === "object" && !Array.isArray(dir)) {
          const items = Object.keys(dir);
          const formatted = items.map((item) => {
            const isDir = typeof dir[item] === "object" && !Array.isArray(dir[item]);
            return isDir ? `${item}/` : item;
          });
          output = [formatted.join("  ")];
        } else if (Array.isArray(dir)) {
          output = [dir.join("  ")];
        } else {
          output = [`ls: cannot access '${args[0] || lsPath}': No such file or directory`];
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
        } else if (args[0] === "-") {
          output = ["cd: OLDPWD not set"];
        } else {
          const newPath = args[0].startsWith("~") ? args[0] : currentPath === "~" ? `~/${args[0]}` : `${currentPath}/${args[0]}`;
          const dir = getDirectory(newPath);
          if (dir && typeof dir === "object" && !Array.isArray(dir)) {
            setCurrentPath(newPath);
          } else {
            output = [`cd: ${args[0]}: No such file or directory`];
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
        output = [
          "",
          "  Name:     Bourbaki",
          "  Role:     CS, Logic, and Games",
          "  Location: The Internet",
          "  Focus:    Building elegant solutions to complex problems",
          "",
          "  Currently exploring: AI/ML, Type Theory, Distributed Systems",
          "",
        ];
        break;

      case "neofetch":
        output = [
          "",
          "        +------------------+",
          "        |  .----------.    |    bourbaki@web",
          "        | |   ==  ==   |   |    -------------",
          "        | |            |   |    OS: Browser",
          "        | |    \\__/    |   |    Host: bourbaki.blog",
          "        |  '----------'    |    Kernel: Next.js 15",
          "        |   [________]     |    Shell: custom-sh",
          "        |    |      |      |    Theme: Neobrutalism",
          "        +------------------+    Terminal: xterm-256",
          "",
        ];
        break;

      case "projects":
        if (loading) {
          output = ["", "  Loading projects from GitHub...", ""];
        } else {
          output = [
            "",
            "  +-- Featured Projects ----------------------------------+",
            "  |                                                       |",
            ...repos.slice(0, 6).flatMap((repo) => [
              `  |  > ${repo.name.padEnd(18)} ${(repo.language || "Code").padEnd(10)} ${repo.stars > 0 ? `* ${repo.stars}` : ""}`.padEnd(56) + "|",
              `  |    ${(repo.description || "").slice(0, 45).padEnd(45)}    |`,
              "  |                                                       |",
            ]),
            "  +---------------------------------------------------------+",
            "",
            "  Type 'cd ~/projects/<name>' to explore a project",
            "",
          ];
        }
        break;

      case "blog":
        output = [
          "",
          "  +-- Recent Blog Posts ------------------------------------+",
          "  |                                                         |",
          "  |  [*] Building Neural Networks from First Principles     |",
          "  |      Dec 1, 2024 - 15 min read                          |",
          "  |                                                         |",
          "  |  [*] Why I Switched to Neovim                           |",
          "  |      Nov 15, 2024 - 8 min read                          |",
          "  |                                                         |",
          "  |  [*] Category Theory for the Working Programmer         |",
          "  |      Oct 28, 2024 - 12 min read                         |",
          "  |                                                         |",
          "  +---------------------------------------------------------+",
          "",
          "  Visit /blog to read all posts",
          "",
        ];
        break;

      case "social":
        output = [
          "",
          "  +-- Connect ----------------------------------------------+",
          "  |                                                         |",
          "  |  GitHub    ->  github.com/bour278                       |",
          "  |  Email     ->  hello@bourbaki.blog                      |",
          "  |                                                         |",
          "  +---------------------------------------------------------+",
          "",
        ];
        break;

      case "cat":
        if (!args[0]) {
          output = ["cat: missing operand"];
        } else if (args[0] === "README.md") {
          // Find current project from path
          const pathParts = currentPath.split("/");
          const projectName = pathParts[pathParts.length - 1];
          const repo = repos.find((r) => r.name === projectName);
          if (repo) {
            output = [
              "",
              `  # ${repo.name}`,
              "",
              `  ${repo.description || "No description set"}`,
              "",
              `  Language: ${repo.language || "Unknown"}`,
              `  Stars: ${repo.stars}`,
              `  URL: ${repo.url}`,
              repo.topics.length > 0 ? `  Topics: ${repo.topics.join(", ")}` : "",
              "",
            ].filter(Boolean);
          } else {
            output = [
              "",
              "  # Project README",
              "",
              "  Welcome to this project!",
              "  ",
              "  ## Getting Started",
              "  ",
              "  Check out the source code on GitHub.",
              "  Feel free to open issues or contribute!",
              "",
            ];
          }
        } else if (args[0].endsWith(".md")) {
          output = [
            "",
            "  # " + args[0].replace(".md", ""),
            "",
            "  This is a markdown file.",
            "  Visit the blog to read the full content.",
            "",
          ];
        } else {
          output = [`cat: ${args[0]}: Permission denied (try visiting GitHub)`];
        }
        break;

      case "exit":
        window.location.href = "/";
        return;

      case "sudo":
        output = ["Nice try! But you're not root here 😏"];
        break;

      case "vim":
      case "nvim":
      case "nano":
        output = ["Editor not available. But I do use Neovim btw 😎"];
        break;

      case "":
        break;

      default:
        output = [`command not found: ${command}. Type 'help' for available commands.`];
    }

    setHistory((prev) => [...prev, `${currentPath} $ ${cmd}`, ...output]);
  }, [currentPath, getDirectory, loading, repos]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleCommand(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex < commandHistory.length - 1 ? historyIndex + 1 : historyIndex;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex] || "");
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex] || "");
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput("");
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      // Simple tab completion for directories
      const dir = getDirectory(currentPath);
      if (dir && typeof dir === "object" && !Array.isArray(dir)) {
        const matches = Object.keys(dir).filter((key) => key.startsWith(input.split(" ").pop() || ""));
        if (matches.length === 1) {
          const inputParts = input.split(" ");
          inputParts[inputParts.length - 1] = matches[0];
          setInput(inputParts.join(" "));
        }
      }
    } else if (e.key === "l" && e.ctrlKey) {
      e.preventDefault();
      setHistory([]);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col">
      {/* Header */}
      <header className="border-b-3 border-white bg-[#1a1a1a] px-4 py-3 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="w-8 h-8 border-2 border-white flex items-center justify-center hover:bg-[#0066FF] transition-colors text-white"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div className="flex items-center gap-2">
            <Terminal className="w-5 h-5 text-[#22c55e]" />
            <span className="text-white font-mono font-semibold">bourbaki@web:~</span>
            {loading && <span className="text-white/50 text-xs">(syncing with GitHub...)</span>}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#22c55e]" />
          <div className="w-3 h-3 rounded-full bg-[#f59e0b]" />
          <div className="w-3 h-3 rounded-full bg-[#ef4444]" />
        </div>
      </header>

      {/* Terminal Content */}
      <div
        ref={terminalRef}
        className="flex-1 p-4 md:p-6 font-mono text-sm md:text-base overflow-auto cursor-text"
        onClick={() => inputRef.current?.focus()}
      >
        {history.map((line, i) => (
          <div key={i} className="text-[#22c55e] whitespace-pre-wrap leading-relaxed">
            {line}
          </div>
        ))}
        <div className="flex items-center text-[#22c55e]">
          <span className="text-[#0066FF] font-semibold">{currentPath}</span>
          <span className="mx-2 text-white">$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent outline-none text-[#22c55e] caret-[#22c55e]"
            spellCheck={false}
            autoComplete="off"
            autoFocus
          />
          <span className="w-2.5 h-5 bg-[#22c55e] animate-pulse" />
        </div>
      </div>

      {/* Footer hint */}
      <footer className="border-t border-white/20 px-4 py-2 text-center flex-shrink-0">
        <span className="text-white/50 text-xs font-mono">
          Type &apos;help&apos; for commands · &apos;exit&apos; to return · ↑↓ for history · Tab for autocomplete
        </span>
      </footer>
    </div>
  );
}
