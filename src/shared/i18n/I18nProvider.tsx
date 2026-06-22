import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import ru from "../../locales/ru.json";
import en from "../../locales/en.json";
import kg from "../../locales/kg.json";
import { localeLabels, type Locale } from "./locales";

const STORAGE_KEY = "bidcars-locale";
const locales: Locale[] = ["ru", "en", "kg"];
const translations = { ru, en, kg } as const;

type TranslationTree = typeof ru;
type TranslationParams = Record<string, string | number>;

type I18nContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (path: string, params?: TranslationParams) => string;
  tl: (path: string) => readonly string[];
};

const I18nContext = createContext<I18nContextValue | null>(null);

function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

function getValue(dictionary: TranslationTree, path: string): unknown {
  return path.split(".").reduce<unknown>((current, key) => {
    if (!current || typeof current !== "object") {
      return undefined;
    }

    return (current as Record<string, unknown>)[key];
  }, dictionary);
}

function interpolate(template: string, params?: TranslationParams): string {
  if (!params) return template;
  return template.replace(/\{(\w+)\}/g, (match, key) => {
    const value = params[key];
    return value !== undefined ? String(value) : match;
  });
}

function resolveLocale(): Locale {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored && isLocale(stored)) {
    return stored;
  }

  const browserLocale = navigator.language.slice(0, 2);
  return isLocale(browserLocale) ? browserLocale : "ru";
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => resolveLocale());

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, locale);
    document.documentElement.lang = locale;
  }, [locale]);

  const value = useMemo<I18nContextValue>(() => {
    const dictionary = translations[locale];
    const fallback = translations.ru;

    return {
      locale,
      setLocale: setLocaleState,
      t: (path, params) => {
        const value = getValue(dictionary, path) ?? getValue(fallback, path);
        const text = typeof value === "string" ? value : path;
        return interpolate(text, params);
      },
      tl: (path) => {
        const value = getValue(dictionary, path) ?? getValue(fallback, path);
        return Array.isArray(value) ? value : [];
      },
    };
  }, [locale]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);

  if (!context) {
    throw new Error("useI18n must be used inside I18nProvider");
  }

  return context;
}

export { localeLabels };
