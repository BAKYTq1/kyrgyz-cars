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

export function Won() {
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
      <div className="bg-white border border-slate-200 rounded-xl px-4 sm:px-5 py-3 sm:py-4 flex items-center justify-between mb-4 sm:mb-5 gap-2">
        <h1 className="text-base sm:text-lg font-medium text-slate-900 shrink-0">
          Выигранные ставки{" "}
          <span className="text-slate-400 font-normal">(0)</span>
        </h1>

        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Per page */}
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => {
                setPerPageOpen((o) => !o);
                setSortOpen(false);
              }}
              className="flex items-center gap-1.5 border rounded-lg px-2.5 sm:px-4 py-1.5 text-sm text-slate-700 bg-white cursor-pointer hover:bg-slate-50 transition-colors"
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
                        ? "text-blue-500"
                        : "text-slate-800"
                    }`}
                  >
                    {opt} На страницу
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Sort button */}
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => {
                setSortOpen((o) => !o);
                setPerPageOpen(false);
              }}
              className="flex items-center justify-center gap-1.5 border-2 border-blue-500 rounded-lg w-8 h-8 sm:w-auto sm:h-auto sm:px-3.5 sm:py-1.5 text-sm text-blue-500 bg-blue-50 font-medium cursor-pointer hover:bg-blue-100 transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M2 4h12M4 8h8M6 12h4"
                  stroke="#3b82f6"
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
                      selectedSort === opt ? "text-blue-500" : "text-slate-800"
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

      {/* Empty state */}
      <div className="bg-white border border-slate-200 rounded-xl py-10 sm:py-12 px-4 sm:px-6 text-center w-full max-w-lg mx-auto">
        <div className="w-16 h-16 sm:w-[90px] sm:h-[90px] bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-5 sm:mb-6">
          <svg
            className="w-8 h-8 sm:w-11 sm:h-11"
            viewBox="0 0 44 44"
            fill="none"
          >
            <path
              d="M22 8L26 16L35 17.5L28.5 24L30 33L22 29L14 33L15.5 24L9 17.5L18 16L22 8Z"
              stroke="#3b82f6"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <path
              d="M18 22L21 25L26 19"
              stroke="#3b82f6"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div className="text-sm sm:text-base text-blue-500 font-medium mb-3 sm:mb-3.5">
          Выигранных ставок пока нет
        </div>
        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-sm mx-auto">
          Вкладка „Выигранные автомобили" показывает автомобили, на которых ваша
          ставка была самой высокой во время аукциона. После выигрыша автомобиля
          вы получите инструкции по переводу средств по электронной почте в
          течение нескольких часов.
        </p>
      </div>
    </div>
  );
}
