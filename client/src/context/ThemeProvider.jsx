import { useEffect, useState } from 'react';
import { ThemeContext, themes } from './themeConfig';

export default function ThemeProvider({ children }) {
  const [currentTheme, setCurrentTheme] = useState('citizen');

  useEffect(() => {
    const theme = themes[currentTheme];
    const root = document.documentElement;

    // Apply CSS variables dynamically
    root.style.setProperty('--color-primary', theme.primary);
    root.style.setProperty('--color-primary-soft', theme.primarySoft);
    root.style.setProperty('--color-primary-mist', theme.primaryMist);
    root.style.setProperty('--color-primary-glow', theme.primaryGlow);
    root.style.setProperty('--color-accent', theme.accent);
    root.style.setProperty('--color-background', theme.background);
    root.style.setProperty('--color-glass', theme.glass);
    root.style.setProperty('--color-glass-soft', theme.glassSoft);
    root.style.setProperty('--color-glass-ultra', theme.glassUltra);
    root.style.setProperty('--color-text', theme.text);
    root.style.setProperty('--color-text-soft', theme.textSoft);
    root.style.setProperty('--color-text-muted', theme.textMuted);
  }, [currentTheme]);

  const switchTheme = (themeName) => {
    if (themes[themeName]) {
      setCurrentTheme(themeName);
    }
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, switchTheme, theme: themes[currentTheme] }}>
      {children}
    </ThemeContext.Provider>
  );
}
