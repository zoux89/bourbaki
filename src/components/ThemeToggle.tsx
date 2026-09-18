"use client";

import { useSyncExternalStore } from "react";
import { Sun, Moon } from "lucide-react";

type Theme = "dark" | "light";

// The root layout sets data-theme on <html> before first paint, so the
// attribute is the source of truth; this component only reads and toggles it.
function subscribe(callback: () => void) {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  return () => observer.disconnect();
}

function getSnapshot(): Theme {
  return document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
}

function getServerSnapshot(): Theme {
  return "dark";
}

export default function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const isDark = theme === "dark";

  const toggleTheme = () => {
    const next: Theme = isDark ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  };

  return (
    <button
      onClick={toggleTheme}
      className="w-12 h-12 border-3 border-[var(--nb-border)] bg-[var(--nb-bg-card)] flex items-center justify-center hover:bg-[var(--nb-primary)] transition-all shadow-[4px_4px_0_0_var(--nb-border)] hover:shadow-[2px_2px_0_0_var(--nb-border)] hover:translate-x-0.5 hover:translate-y-0.5"
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? (
        <Sun className="w-5 h-5 text-[var(--nb-text)]" />
      ) : (
        <Moon className="w-5 h-5 text-[var(--nb-text)]" />
      )}
    </button>
  );
}
