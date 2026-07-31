"use client";

import React, { useEffect, useState } from "react";
import { ThemeProvider, useTheme } from "next-themes";

function AutoThemeSetter({ children }: { children: React.ReactNode }) {
  const { setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const updateTheme = () => {
      const hour = new Date().getHours();
      // Entre 18h et 6h du matin = Mode sombre
      if (hour >= 18 || hour < 6) {
        setTheme("dark");
      } else {
        setTheme("light");
      }
    };
    
    updateTheme();
    // Optionnel: vérifier toutes les minutes si l'heure a changé
    const interval = setInterval(updateTheme, 60000);
    return () => clearInterval(interval);
  }, [setTheme]);

  if (!mounted) return <>{children}</>;
  
  return <>{children}</>;
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <AutoThemeSetter>
        {children}
      </AutoThemeSetter>
    </ThemeProvider>
  );
}
