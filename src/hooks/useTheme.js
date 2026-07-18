import { useEffect, useState } from 'react';
import { resolveInitialTheme, THEME_STORAGE_KEY } from '../utils/theme';

export function useTheme() {
  const [theme, setTheme] = useState(() =>
    resolveInitialTheme(
      localStorage.getItem(THEME_STORAGE_KEY),
      window.matchMedia('(prefers-color-scheme: light)').matches
    )
  );

  useEffect(() => {
    document.documentElement.classList.toggle('light', theme === 'light');
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  const toggleTheme = () => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));

  return { theme, toggleTheme };
}
