'use client';

import { useState, useEffect } from 'react';
import { Toggle, GooeyFilter } from '@/components/ui/liquid-toggle.jsx';

export default function CinematicThemeSwitcher({ theme = 'dark', onThemeChange }) {
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(theme === 'dark');

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setIsDark(theme === 'dark');
  }, [theme]);

  if (!mounted) {
    return <div className="h-8 w-[52px] bg-gray-200/20 rounded-full animate-pulse" />;
  }

  return (
    <div className="relative inline-flex items-center">
      <GooeyFilter />
      <Toggle
        checked={isDark}
        onCheckedChange={(checked) => {
          const newTheme = checked ? 'dark' : 'light';
          localStorage.setItem('theme', newTheme);
          if (onThemeChange) {
            onThemeChange(newTheme);
          }
        }}
        // Custom branding variables matching your exact forest-green portfolio color palette
        className="[--c-active:#C8FF5C] [--c-default:#3b522a] [--c-default-dark:#273b18] [--c-active-inner:#040d00] transition-transform duration-300 hover:scale-105"
      />
    </div>
  );
}
