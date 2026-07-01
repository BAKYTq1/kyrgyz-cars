import { useState, useRef, useEffect } from "react";
import { useI18n } from "../../shared/i18n/I18nProvider";

const tabIcons = ["🚗", "🏍️", "🚜", "···"];

/**
 * Кастомный dropdown вместо нативного <select>.
 * Нативный <select> рисует список опций средствами браузера/ОС —
 * это значит, что hover на пунктах списка нельзя стилизовать через CSS
 * (в Chrome/Windows он всегда системный синий). Этот компонент полностью
 * на div/button, поэтому hover, фон, цвета — всё под нашим контролем.
 */
function CustomSelect({
  value,
  options,
  onChange,
  className = "",
  widthClass = "flex-1",
  buttonClass = "",
}: {
  value: string;
  options: string[];
  onChange: (value: string) => void;
  className?: string;
  widthClass?: string;
  buttonClass?: string;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={rootRef} className={`relative ${widthClass} ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`w-full flex items-center justify-between gap-2 px-4 py-3 text-sm outline-none text-purple-600 bg-purple-50 hover:bg-purple-100 cursor-pointer font-medium transition-colors ${buttonClass}`}
      >
        <span className="truncate">{value}</span>
        <svg
          className={`w-3.5 h-3.5 shrink-0 text-purple-400 transition-transform ${open ? "rotate-180" : ""}`}
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
        <div className="absolute z-50 mt-1 w-full max-h-64 overflow-y-auto bg-white border border-purple-100 rounded-lg shadow-lg py-1">
          {options.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
              className={`w-full text-left px-4 py-2.5 text-sm font-medium transition-colors ${
                opt === value
                  ? "bg-purple-100 text-purple-700"
                  : "text-gray-700 hover:bg-purple-50 hover:text-purple-600"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function SearchBlock() {
  const { t, tl } = useI18n();
  const [activeTab, setActiveTab] = useState(0);
  const [archive, setArchive] = useState(false);
  const [copart, setCopart] = useState(true);
  const [iaai, setIaai] = useState(true);

  const tabs = tl("search.tabs");

  const makesOptions = [
    t("search.allMakes"),
    "BMW",
    "Mercedes",
    "Toyota",
    "Ford",
    "Audi",
    "Honda",
    "Chevrolet",
  ];
  const modelsOptions = [t("search.allModels")];
  const generationsOptions = [t("search.allGenerations")];
  const yearOptions = Array.from({ length: 30 }, (_, i) => String(2024 - i));

  const [make, setMake] = useState(makesOptions[0]);
  const [model, setModel] = useState(modelsOptions[0]);
  const [generation, setGeneration] = useState(generationsOptions[0]);
  const [yearFrom, setYearFrom] = useState(t("search.from"));
  const [yearTo, setYearTo] = useState(t("search.to"));

  return (
    <div className="bg-gray-100 px-4 pb-8">
      <div className="max-w-5xl mx-auto">
        <div
          className="bg-white rounded-2xl shadow-xl"
          style={{ marginTop: "-60px", position: "relative", zIndex: 10 }}
        >
          {/* Табы */}
          <div className="flex items-center border-b border-gray-100 px-4 overflow-x-auto scrollbar-hide rounded-t-2xl">
            {tabs.map((label, i) => (
              <button
                key={i}
                onClick={() => setActiveTab(i)}
                className={`flex items-center gap-2 px-3 py-4 text-sm font-medium transition border-b-2 whitespace-nowrap ${
                  activeTab === i
                    ? "border-purple-500 text-purple-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                <span>{tabIcons[i]}</span>
                {label}
              </button>
            ))}
          </div>

          <div className="px-4 py-3 flex flex-col gap-3">
            {/* Поиск + Архив */}
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-400 flex-1">
                {t("search.vinPlaceholder")}
              </span>
              <div className="flex items-center gap-2 text-sm text-gray-500 shrink-0">
                <button
                  onClick={() => setArchive(!archive)}
                  className={`w-11 h-6 rounded-full relative transition-colors shrink-0 ${archive ? "bg-purple-600" : "bg-gray-200"}`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all shadow ${archive ? "left-5" : "left-0.5"}`}
                  />
                </button>
                <span>{t("search.archive")}</span>
              </div>
            </div>

            {/* Десктоп: одна строка */}
            <div className="hidden md:flex items-center border border-gray-200 rounded-lg divide-x divide-gray-200 focus-within:border-purple-500 focus-within:ring-1 focus-within:ring-purple-500 transition-all">
              <CustomSelect
                value={make}
                options={makesOptions}
                onChange={setMake}
                buttonClass="rounded-l-lg"
              />
              <CustomSelect
                value={model}
                options={modelsOptions}
                onChange={setModel}
              />
              <CustomSelect
                value={generation}
                options={generationsOptions}
                onChange={setGeneration}
              />
              <CustomSelect
                value={yearFrom}
                options={[t("search.from"), ...yearOptions]}
                onChange={setYearFrom}
                widthClass="w-28 shrink-0"
              />
              <CustomSelect
                value={yearTo}
                options={[t("search.to"), ...yearOptions]}
                onChange={setYearTo}
                widthClass="w-28 shrink-0"
                buttonClass="rounded-r-lg"
              />
            </div>

            {/* Мобилка селекты */}
            <div className="flex flex-col gap-2 md:hidden">
              <CustomSelect
                value={make}
                options={makesOptions}
                onChange={setMake}
                widthClass="w-full"
              />
              <CustomSelect
                value={model}
                options={modelsOptions}
                onChange={setModel}
                widthClass="w-full"
              />
              <CustomSelect
                value={generation}
                options={generationsOptions}
                onChange={setGeneration}
                widthClass="w-full"
              />
              <div className="flex gap-2">
                <CustomSelect
                  value={yearFrom}
                  options={[t("search.from"), ...yearOptions]}
                  onChange={setYearFrom}
                  widthClass="flex-1"
                />
                <CustomSelect
                  value={yearTo}
                  options={[t("search.to"), ...yearOptions]}
                  onChange={setYearTo}
                  widthClass="flex-1"
                />
              </div>
            </div>

            {/* VIN поиск — десктоп */}
            <div className="hidden md:flex items-center border border-gray-200 rounded-lg overflow-hidden focus-within:border-purple-500 focus-within:ring-1 focus-within:ring-purple-500 transition-all">
              <input
                type="text"
                placeholder={t("search.vinPlaceholder")}
                className="flex-1 px-4 py-3 text-sm outline-none text-gray-700"
              />
              <svg
                className="w-5 h-5 text-purple-600 mr-3 shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
                />
              </svg>
            </div>

            {/* VIN поиск — мобилка */}
            <div className="md:hidden">
              <p className="text-xs text-gray-400 text-center mb-2">или</p>
              <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden focus-within:border-purple-500 focus-within:ring-1 focus-within:ring-purple-500 transition-all">
                <input
                  type="text"
                  placeholder={t("search.vinPlaceholder")}
                  className="flex-1 px-4 py-3 text-sm outline-none text-gray-700"
                />
                <svg
                  className="w-5 h-5 text-purple-600 mr-3 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
                  />
                </svg>
              </div>
            </div>

            {/* Copart / IAAI / Кнопка */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <div className="flex items-center justify-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <button
                    onClick={() => setCopart(!copart)}
                    className={`w-11 h-6 rounded-full relative transition-colors shrink-0 ${copart ? "bg-purple-600" : "bg-gray-200"}`}
                  >
                    <div
                      className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all shadow ${copart ? "left-5" : "left-0.5"}`}
                    />
                  </button>
                  <span className="text-sm font-medium text-purple-600">
                    {t("search.copart")}
                  </span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <button
                    onClick={() => setIaai(!iaai)}
                    className={`w-11 h-6 rounded-full relative transition-colors shrink-0 ${iaai ? "bg-red-500" : "bg-gray-200"}`}
                  >
                    <div
                      className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all shadow ${iaai ? "left-5" : "left-0.5"}`}
                    />
                  </button>
                  <span className="text-sm font-medium text-red-500">
                    {t("search.iaai")}
                  </span>
                </label>
              </div>
              <button className="w-full sm:w-auto sm:ml-auto bg-purple-600 hover:bg-purple-700 text-white px-8 py-2.5 rounded-lg text-sm font-semibold transition">
                {t("search.showLots")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
