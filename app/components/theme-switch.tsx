"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";
import type { ThemeProviderProps } from "next-themes";
import anime from "animejs";

// Peredam Error React 19
if (typeof window !== "undefined") {
  const originalConsoleError = console.error;
  console.error = (...args: any[]) => {
    if (typeof args[0] === "string" && args[0].includes("Encountered a script tag while rendering React component")) return;
    originalConsoleError(...args);
  };
}

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}

export function ThemeSwitch() {
  const [mounted, setMounted] = React.useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-8 h-8 md:w-9 md:h-9 border-2 border-transparent"></div>;
  }

  const currentTheme = theme === "system" ? resolvedTheme : theme;

  // FUNGSI ANIMASI THEME SWITCHER
  const handleThemeToggle = () => {
    // 1. Ganti tema secara logikal
    setTheme(currentTheme === "dark" ? "light" : "dark");
    
    // 2. Mainkan animasi ikon memutar dan memantul
    anime({
      targets: '.theme-icon',
      rotate: [180, 0],
      scale: [0.5, 1.2, 1],
      duration: 600,
      easing: 'easeOutElastic(1, 0.6)'
    });
  };

  return (
    <button
      aria-label="Toggle Dark Mode"
      onClick={handleThemeToggle}
      className="p-1.5 md:p-2 bg-[var(--color-brutal-surface)] border-2 border-[var(--color-brutal-border)] text-[var(--color-brutal-text)] shadow-[var(--shadow-brutal)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all flex items-center justify-center cursor-pointer"
    >
      {currentTheme === "dark" ? (
        // Ikon Matahari (Light Mode)
        <svg className="theme-icon w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ) : (
        // Ikon Bulan (Dark Mode)
        <svg className="theme-icon w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      )}
    </button>
  );
}