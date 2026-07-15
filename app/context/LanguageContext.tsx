"use client";

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react";
import en from "@/app/i18n/en";
import fa from "@/app/i18n/fa";
import type { TranslationKey } from "@/app/i18n/en";

type Locale = "en" | "fa";

const dictionaries = { en, fa } as const;

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: TranslationKey, params?: Record<string, string | number>) => string;
  dir: "ltr" | "rtl";
}

const LanguageContext = createContext<LanguageContextType | null>(null);

function getInitialLocale(): Locale {
  if (typeof window === "undefined") return "en";
  const saved = localStorage.getItem("neon-locale");
  if (saved === "en" || saved === "fa") return saved;
  return "en";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(getInitialLocale);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === "fa" ? "rtl" : "ltr";
  }, [locale]);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem("neon-locale", newLocale);
  }, []);

  const t = useCallback(
    (key: TranslationKey, params?: Record<string, string | number>): string => {
      let value = dictionaries[locale][key] || dictionaries.en[key] || key;

      if (params) {
        for (const [param, val] of Object.entries(params)) {
          if (param === "n" || param === "count") {
            const count = typeof val === "string" ? parseInt(val, 10) : val;
            const pluralKey = new RegExp(`\\{${param}, select, one \\{([^}]+)\\} other \\{([^}]+)\\}\\}`, "g");
            value = value.replace(pluralKey, (_match, one, other) => {
              return count === 1 ? one : other;
            });
          }
          value = value.replace(new RegExp(`\\{${param}\\}`, "g"), String(val));
        }
      }

      return value;
    },
    [locale]
  );

  const dir = locale === "fa" ? "rtl" : "ltr";

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t, dir }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
