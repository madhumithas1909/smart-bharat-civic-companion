import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { Language } from '../types';
import { t as translate, type TranslationKey } from '../utils/i18n';

interface AppContextType {
  darkMode: boolean;
  toggleDarkMode: () => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [darkMode, setDarkMode] = useState(() => {
    const stored = localStorage.getItem('sb-dark-mode');
    if (stored !== null) return stored === 'true';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const [language, setLanguageState] = useState<Language>(() => {
    return (localStorage.getItem('sb-language') as Language) || 'en';
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('sb-dark-mode', String(darkMode));
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem('sb-language', language);
  }, [language]);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);
  const setLanguage = (lang: Language) => setLanguageState(lang);
  const t = (key: TranslationKey) => translate(language, key);

  return (
    <AppContext.Provider value={{ darkMode, toggleDarkMode, language, setLanguage, t }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
