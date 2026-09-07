"use client";

import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialDark = saved ? saved === "dark" : prefersDark;
    setIsDark(initialDark);
    document.documentElement.setAttribute("data-theme", initialDark ? "dark" : "light");
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme ? "dark" : "light");
    localStorage.setItem("theme", newTheme ? "dark" : "light");
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

