import { useState } from "react";

const PER_PAGE_OPTIONS = [10, 25, 50];

const SORT_OPTIONS = [
  "Дата аукциона (1-9)",
  "Дата аукциона (9-1)",
  "Цена предварительной ставки (1-9)",
  "Цена предварительной ставки (9-1)",
  "Ваш максимум (1-9)",
  "Ваш максимум (9-1)",
];

type Tab = "list" | "archive";

export function Watchlist() {
  const [activeTab, setActiveTab] = useState<Tab>("list");
  const [perPageOpen, setPerPageOpen] = useState(false);
  const [selectedPerPage, setSelectedPerPage] = useState(10);
  const [sortOpen, setSortOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState(SORT_OPTIONS[0]);

  const closeAll = () => {
    setPerPageOpen(false);
    setSortOpen(false);
  };

  return (
    <div
      className="bg-slate-50 rounded-xl p-3 sm:p-6 min-h-screen"
      onClick={closeAll}
    >
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-xl mb-4 sm:mb-5">
        {/* Tabs + controls */}
        <div className="px-4 sm:px-5 flex items-center justify-between gap-2">
          {/* Tabs */}
          <div className="flex items-center overflow-x-auto">
            <button
              onClick={() => setActiveTab("list")}
              className={`relative py-3.5 sm:py-4 px-1 mr-5 sm:mr-6 text-sm font-medium transition-colors whitespace-nowrap ${
                activeTab === "list"
                  ? "text-slate-900"
                  : "text-slate-400 hover:text-slate-600"
              }`}
            >
              Список <span className="text-slate-400 font-normal">(0)</span>
              {activeTab === "list" && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600 rounded-full" />
              )}
            </button>
            <button
              onClick={() => setActiveTab("archive")}
              className={`relative py-3.5 sm:py-4 px-1 text-sm font-medium transition-colors whitespace-nowrap ${
                activeTab === "archive"
                  ? "text-slate-900"
                  : "text-slate-400 hover:text-slate-600"
              }`}
            >
              Архив
              {activeTab === "archive" && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600 rounded-full" />
              )}
            </button>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Per page */}
            <div className="relative" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => {
                  setPerPageOpen((o) => !o);
                  setSortOpen(false);
                }}
                className="flex items-center gap-1.5 border border-slate-300 rounded-lg px-2.5 sm:px-4 py-1.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
              >
                <span className="hidden sm:inline">
                  {selectedPerPage} На страницу
                </span>
                <span className="sm:hidden">{selectedPerPage}</span>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M4 5.5L7 3L10 5.5"
                    stroke="#94a3b8"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M4 8.5L7 11L10 8.5"
                    stroke="#94a3b8"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>

              {perPageOpen && (
                <div className="absolute top-[calc(100%+6px)] right-0 bg-white border border-slate-200 rounded-xl min-w-[160px] z-10 py-1.5 shadow-md">
                  <div className="text-xs text-slate-400 px-4 pt-2 pb-1.5">
                    Список вариантов
                  </div>
                  {PER_PAGE_OPTIONS.map((opt) => (
                    <div
                      key={opt}
                      onClick={() => {
                        setSelectedPerPage(opt);
                        setPerPageOpen(false);
                      }}
                      className={`px-4 py-2.5 text-sm cursor-pointer hover:bg-slate-50 transition-colors ${
                        selectedPerPage === opt
                          ? "text-purple-600" // Изменено на text-purple-600
                          : "text-slate-800"
                      }`}
                    >
                      {opt} На страницу
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Sort */}
            <div className="relative" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => {
                  setSortOpen((o) => !o);
                  setPerPageOpen(false);
                }}
                className="flex items-center gap-1.5 border-2 border-purple-500 rounded-lg px-2.5 sm:px-3.5 py-1.5 text-sm text-purple-600 bg-purple-50 font-medium hover:bg-purple-100 transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M2 4h12M4 8h8M6 12h4"
                    stroke="#9333ea" // Изменено на фиолетовый stroke
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
                <span className="hidden sm:inline">Sort</span>
              </button>

              {sortOpen && (
                <div className="absolute top-[calc(100%+6px)] right-0 bg-white border border-slate-200 rounded-xl min-w-[220px] z-10 py-1.5 shadow-md">
                  <div className="text-xs text-slate-400 px-4 pt-2 pb-1.5">
                    Сортировать по
                  </div>
                  {SORT_OPTIONS.map((opt) => (
                    <div
                      key={opt}
                      onClick={() => {
                        setSelectedSort(opt);
                        setSortOpen(false);
                      }}
                      className={`px-4 py-2.5 text-sm cursor-pointer hover:bg-slate-50 transition-colors ${
                        selectedSort === opt
                          ? "text-purple-600" // Изменено на text-purple-600
                          : "text-slate-800"
                      }`}
                    >
                      {opt}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Empty state */}
      <div className="bg-white border border-slate-200 rounded-xl py-10 sm:py-12 px-4 sm:px-6 text-center w-full max-w-lg mx-auto">
        <div className="w-16 h-16 sm:w-[90px] sm:h-[90px] bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-5 sm:mb-6">
          {" "}
          {/* Изменено на bg-purple-100 */}
          <svg
            className="w-8 h-8 sm:w-[46px] sm:h-[46px]"
            viewBox="0 0 46 46"
            fill="none"
          >
            <rect
              x="8"
              y="10"
              width="26"
              height="26"
              rx="4"
              stroke="#9333ea" // Изменено на фиолетовый stroke
              strokeWidth="2"
            />
            <path d="M8 18h26" stroke="#9333ea" strokeWidth="2" />{" "}
            {/* Изменено на фиолетовый stroke */}
            <path
              d="M16 8v4M26 8v4"
              stroke="#9333ea" // Изменено на фиолетовый stroke
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M23 28c0-2.5 4-4 4-6.5a4 4 0 00-8 0c0 2.5 4 4 4 6.5z"
              stroke="#9333ea" // Изменено на фиолетовый stroke
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="23" cy="30" r="1" fill="#9333ea" />{" "}
            {/* Изменено на фиолетовый fill */}
          </svg>
        </div>
        <div className="text-sm sm:text-base text-purple-600 font-medium mb-3 sm:mb-4">
          {" "}
          {/* Изменено на text-purple-600 */}
          Записей в вашем списке наблюдения пока нет
        </div>
        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-sm mx-auto">
          Вкладка „Список наблюдения" позволяет добавлять записи в избранное,
          проверять финальные ставки, достигнутые на аукционе, и анализировать
          рыночные тенденции. Используйте эту функцию для мониторинга
          интересующих автомобилей, сравнения цен и принятия обоснованных
          решений о ставках. Будьте впереди конкурентов, отслеживая последние
          результаты аукционов и динамику рынка.
        </p>
      </div>
    </div>
  );
}
