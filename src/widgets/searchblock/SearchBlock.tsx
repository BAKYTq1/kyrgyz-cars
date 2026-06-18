import { useState } from 'react'
import { useI18n } from '../../shared/i18n/I18nProvider'

const tabIcons = ['🚗', '🏍️', '🚜', '···']

export default function SearchBlock() {
  const { t, tl } = useI18n()
  const [activeTab, setActiveTab] = useState(0)
  const [archive, setArchive] = useState(false)
  const [copart, setCopart] = useState(true)
  const [iaai, setIaai] = useState(true)

  const tabs = tl('search.tabs')

  return (
    <div className="bg-gray-100 px-4 pb-8">
      <div className="max-w-5xl mx-auto">
        <div
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
          style={{ marginTop: '-60px', position: 'relative', zIndex: 10 }}
        >
          {/* Табы */}
          <div className="flex items-center border-b border-gray-100 px-4 overflow-x-auto scrollbar-hide">
            {tabs.map((label, i) => (
              <button
                key={i}
                onClick={() => setActiveTab(i)}
                className={`flex items-center gap-2 px-3 py-4 text-sm font-medium transition border-b-2 whitespace-nowrap ${
                  activeTab === i
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
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
              <span className="text-sm text-gray-400 flex-1">{t('search.vinPlaceholder')}</span>
              <div className="flex items-center gap-2 text-sm text-gray-500 shrink-0">
                <button
                  onClick={() => setArchive(!archive)}
                  className={`w-11 h-6 rounded-full relative transition-colors shrink-0 ${archive ? 'bg-blue-500' : 'bg-gray-200'}`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all shadow ${archive ? 'left-5' : 'left-0.5'}`} />
                </button>
                <span>{t('search.archive')}</span>
              </div>
            </div>

            {/* Десктоп: одна строка | Мобилка: вертикально */}
            <div className="hidden md:flex items-center border border-gray-200 rounded-lg overflow-hidden">
              <select className="flex-1 px-4 py-3 text-sm outline-none text-gray-700 bg-transparent border-r border-gray-200">
                <option>{t('search.allMakes')}</option>
                <option>BMW</option>
                <option>Mercedes</option>
                <option>Toyota</option>
                <option>Ford</option>
                <option>Audi</option>
                <option>Honda</option>
                <option>Chevrolet</option>
              </select>
              <select className="flex-1 px-4 py-3 text-sm outline-none text-gray-700 bg-transparent border-r border-gray-200">
                <option>{t('search.allModels')}</option>
              </select>
              <select className="flex-1 px-4 py-3 text-sm outline-none text-gray-700 bg-transparent border-r border-gray-200">
                <option>{t('search.allGenerations')}</option>
              </select>
              <select className="px-4 py-3 text-sm outline-none text-gray-700 bg-transparent border-r border-gray-200 w-28">
                <option>{t('search.from')}</option>
                {Array.from({ length: 30 }, (_, i) => 2024 - i).map(y => <option key={y}>{y}</option>)}
              </select>
              <select className="px-4 py-3 text-sm outline-none text-gray-700 bg-transparent w-28">
                <option>{t('search.to')}</option>
                {Array.from({ length: 30 }, (_, i) => 2024 - i).map(y => <option key={y}>{y}</option>)}
              </select>
            </div>

            {/* Мобилка селекты */}
            <div className="flex flex-col gap-2 md:hidden">
              <select className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none text-gray-700">
                <option>{t('search.allMakes')}</option>
                <option>BMW</option>
                <option>Mercedes</option>
                <option>Toyota</option>
                <option>Ford</option>
                <option>Audi</option>
                <option>Honda</option>
                <option>Chevrolet</option>
              </select>
              <select className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none text-gray-700">
                <option>{t('search.allModels')}</option>
              </select>
              <select className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none text-gray-700">
                <option>{t('search.allGenerations')}</option>
              </select>
              <div className="flex gap-2">
                <select className="flex-1 border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none text-gray-700">
                  <option>{t('search.from')}</option>
                  {Array.from({ length: 30 }, (_, i) => 2024 - i).map(y => <option key={y}>{y}</option>)}
                </select>
                <select className="flex-1 border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none text-gray-700">
                  <option>{t('search.to')}</option>
                  {Array.from({ length: 30 }, (_, i) => 2024 - i).map(y => <option key={y}>{y}</option>)}
                </select>
              </div>
            </div>

            {/* VIN поиск — десктоп */}
            <div className="hidden md:flex items-center border border-gray-200 rounded-lg overflow-hidden">
              <input
                type="text"
                placeholder={t('search.vinPlaceholder')}
                className="flex-1 px-4 py-3 text-sm outline-none text-gray-700"
              />
              <svg className="w-5 h-5 text-blue-500 mr-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
              </svg>
            </div>

            {/* VIN поиск — мобилка */}
            <div className="md:hidden">
              <p className="text-xs text-gray-400 text-center mb-2">или</p>
              <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                <input
                  type="text"
                  placeholder={t('search.vinPlaceholder')}
                  className="flex-1 px-4 py-3 text-sm outline-none text-gray-700"
                />
                <svg className="w-5 h-5 text-blue-500 mr-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
                </svg>
              </div>
            </div>

            {/* Copart / IAAI / Кнопка */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <div className="flex items-center justify-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <button
                    onClick={() => setCopart(!copart)}
                    className={`w-11 h-6 rounded-full relative transition-colors shrink-0 ${copart ? 'bg-blue-500' : 'bg-gray-200'}`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all shadow ${copart ? 'left-5' : 'left-0.5'}`} />
                  </button>
                  <span className="text-sm font-medium text-blue-600">{t('search.copart')}</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <button
                    onClick={() => setIaai(!iaai)}
                    className={`w-11 h-6 rounded-full relative transition-colors shrink-0 ${iaai ? 'bg-red-500' : 'bg-gray-200'}`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all shadow ${iaai ? 'left-5' : 'left-0.5'}`} />
                  </button>
                  <span className="text-sm font-medium text-red-500">{t('search.iaai')}</span>
                </label>
              </div>
              <button className="w-full sm:w-auto sm:ml-auto bg-blue-500 hover:bg-blue-600 text-white px-8 py-2.5 rounded-lg text-sm font-semibold transition">
                {t('search.showLots')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}