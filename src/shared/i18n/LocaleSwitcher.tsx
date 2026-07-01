import { useState, useRef, useEffect } from "react";
import { localeLabels, type Locale } from "./locales";
import { useI18n } from "./I18nProvider";

const locales: Locale[] = ["ru", "en", "kg"];

export default function LocaleSwitcher() {
  const { locale, setLocale } = useI18n();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition text-gray-700"
      >
        <span className="font-medium">{localeLabels[locale]}</span>
        <svg
          className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 mt-1.5 w-36 bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden">
          {locales.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => {
                setLocale(item);
                setOpen(false);
              }}
              className={`w-full text-left px-3 py-2 text-sm transition hover:bg-gray-50 ${
                locale === item
                  ? "text-violet-600 font-medium bg-violet-50"
                  : "text-gray-700"
              }`}
            >
              {localeLabels[item]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
