"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div style={{ width: '40px', height: '40px' }} />;
  }

  const isDark = theme === 'dark';

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        backgroundColor: 'var(--bg-light)',
        border: '1px solid var(--border)',
        cursor: 'pointer',
        color: 'var(--text-main)',
        transition: 'all 0.2s ease'
      }}
      title={isDark ? "Passer au mode clair" : "Passer au mode sombre"}
      onMouseOver={(e) => { e.currentTarget.style.backgroundColor = 'var(--border)'; }}
      onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'var(--bg-light)'; }}
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
