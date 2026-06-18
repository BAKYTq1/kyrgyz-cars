import { useState } from "react";

const PER_PAGE_OPTIONS = [10, 25, 50];

export function Shipping() {
  const [perPageOpen, setPerPageOpen] = useState(false);
  const [selectedPerPage, setSelectedPerPage] = useState(10);

  return (
    <div
      className="bg-slate-50 rounded-xl p-3 sm:p-6 min-h-screen"
      onClick={() => setPerPageOpen(false)}
    >
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-xl px-4 sm:px-5 py-3 sm:py-4 flex items-center justify-between mb-4 sm:mb-5">
        <h1 className="text-base sm:text-lg font-medium text-slate-900">
          Доставка <span className="text-slate-400 font-normal">(0)</span>
        </h1>

        {/* Per page */}
        <div className="relative" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={() => setPerPageOpen((o) => !o)}
            className="flex items-center gap-1.5 border border-slate-300 rounded-lg px-3 sm:px-4 py-1.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
          >
            <span className="hidden xs:inline">
              {selectedPerPage} На страницу
            </span>
            <span className="xs:hidden">{selectedPerPage}</span>
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
                    selectedPerPage === opt ? "text-blue-500" : "text-slate-800"
                  }`}
                >
                  {opt} На страницу
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Empty state */}
      <div className="bg-white border border-slate-200 rounded-xl py-10 sm:py-12 px-4 sm:px-6 text-center w-full max-w-lg mx-auto">
        <div className="w-16 h-16 sm:w-[90px] sm:h-[90px] bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-5 sm:mb-6">
          <svg
            className="w-8 h-8 sm:w-12 sm:h-12"
            viewBox="0 0 48 48"
            fill="none"
          >
            <rect
              x="4"
              y="18"
              width="28"
              height="18"
              rx="2"
              stroke="#3b82f6"
              strokeWidth="2"
            />
            <path
              d="M32 24h6l4 6v6h-10V24Z"
              stroke="#3b82f6"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <circle cx="13" cy="38" r="3" stroke="#3b82f6" strokeWidth="2" />
            <circle cx="35" cy="38" r="3" stroke="#3b82f6" strokeWidth="2" />
            <path
              d="M8 24h12M8 28h8"
              stroke="#3b82f6"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <div className="text-sm sm:text-base text-blue-500 font-medium mb-3 sm:mb-4">
          Записей о транспортировке пока нет
        </div>
        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-sm mx-auto">
          Вкладка „Транспорт" представляет собой комплексную систему, которая
          позволяет отслеживать статус транспортировки вашего автомобиля. Вы
          можете увидеть, был ли автомобиль оплачен, забран из аукционного дома,
          доставлен на терминал, загружен в контейнер и выгружен в Европе. Она
          также предоставляет номер контейнера, тип перевозчика и, при
          необходимости, название судна, а также систему отслеживания,
          позволяющую наблюдать за местоположением судна на карте.
        </p>
      </div>
    </div>
  );
}
