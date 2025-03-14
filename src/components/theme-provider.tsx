"use client";

import React, { ReactNode, useEffect, useState } from "react";

interface ThemeProviderProps {
  children: ReactNode;
  attribute?: string;
  defaultTheme?: "light" | "dark";
  enableSystem?: boolean;
  disableTransitionOnChange?: boolean;
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  attribute = "data-theme",
  defaultTheme = "light",
  enableSystem = true,
  disableTransitionOnChange = false,
}) => {
  const [theme, setTheme] = useState(defaultTheme);

  useEffect(() => {
    if (enableSystem) {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      setTheme(systemTheme);
    } else {
      setTheme(defaultTheme);
    }
  }, [defaultTheme, enableSystem]);

  useEffect(() => {
    const body = document.body;
    body.setAttribute(attribute, theme);
    if (!disableTransitionOnChange) {
      body.style.transition = "background-color 0.3s ease, color 0.3s ease";
    }
  }, [theme, attribute, disableTransitionOnChange]);

  return <>{children}</>;
};

export { ThemeProvider };
