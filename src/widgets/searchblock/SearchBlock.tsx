import { useState } from 'react'

const tabs = [
  { label: 'Автомобиль', icon: '🚗' },
  { label: 'Мотоцикл', icon: '🏍️' },
  { label: 'ATV', icon: '🚜' },
  { label: 'Ещё', icon: '···' },
]

export default function SearchBlock() {
  const [activeTab, setActiveTab] = useState(0)
  const [archive, setArchive] = useState(false)
  const [copart, setCopart] = useState(true)
  const [iaai, setIaai] = useState(true)

  return (
    <div className="bg-gray-100 px-4 pb-8">
      <div className="max-w-5xl mx-auto">
        <div
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
          style={{ marginTop: '-60px', position: 'relative', zIndex: 10 }}
        >
          {/* Табы */}
          <div className="flex items-center border-b border-gray-100 px-4">
            {tabs.map((t, i) => (
              <button
                key={i}
                onClick={() => setActiveTab(i)}
                className={`flex items-center gap-2 px-4 py-4 text-sm font-medium transition border-b-2 ${
                  activeTab === i
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <span>{t.icon}</span>
                {t.label}
              </button>
            ))}
            <div className="ml-auto flex items-center gap-2 text-sm text-gray-500 pr-2">
              <span>Архив</span>
              <button
                onClick={() => setArchive(!archive)}
                className={`w-11 h-6 rounded-full relative transition-colors ${archive ? 'bg-blue-500' : 'bg-gray-200'}`}
              >
                <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all shadow ${archive ? 'left-5' : 'left-0.5'}`} />
              </button>
            </div>
          </div>

          {/* Строка 1: Марка / Модель / VIN */}
          <div className="flex items-center border-b border-gray-100">
            <select className="flex-1 px-4 py-3 text-sm outline-none text-gray-700 bg-transparent border-r border-gray-100">
              <option>Все марки</option>
              <option>BMW</option>
              <option>Mercedes</option>
              <option>Toyota</option>
              <option>Ford</option>
              <option>Audi</option>
              <option>Honda</option>
              <option>Chevrolet</option>
            </select>
            <select className="flex-1 px-4 py-3 text-sm outline-none text-gray-700 bg-transparent border-r border-gray-100">
              <option>Все модели</option>
            </select>
            <span className="px-3 text-gray-400 text-sm shrink-0">или</span>
            <div className="flex-1 flex items-center border-l border-gray-100">
              <input
                type="text"
                placeholder="Поиск по VIN или номеру лота"
                className="w-full px-4 py-3 text-sm outline-none text-gray-700 bg-transparent"
              />
              <svg className="w-5 h-5 text-blue-500 mr-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
              </svg>
            </div>
          </div>

          {/* Строка 2: Поколение / С / До / Copart / IAAI / Кнопка */}
          <div className="flex items-center gap-3 px-4 py-3 flex-wrap">
            <select className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none text-gray-700 min-w-[150px]">
              <option>Все поколения</option>
            </select>
            <select className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none text-gray-700 w-24">
              <option>С</option>
              {Array.from({ length: 30 }, (_, i) => 2024 - i).map(y => (
                <option key={y}>{y}</option>
              ))}
            </select>
            <select className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none text-gray-700 w-24">
              <option>До</option>
              {Array.from({ length: 30 }, (_, i) => 2024 - i).map(y => (
                <option key={y}>{y}</option>
              ))}
            </select>

            <div className="flex items-center gap-4 ml-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <button
                  onClick={() => setCopart(!copart)}
                  className={`w-11 h-6 rounded-full relative transition-colors ${copart ? 'bg-blue-500' : 'bg-gray-200'}`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all shadow ${copart ? 'left-5' : 'left-0.5'}`} />
                </button>
                <span className="text-sm font-medium text-blue-600">Copart</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <button
                  onClick={() => setIaai(!iaai)}
                  className={`w-11 h-6 rounded-full relative transition-colors ${iaai ? 'bg-red-500' : 'bg-gray-200'}`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all shadow ${iaai ? 'left-5' : 'left-0.5'}`} />
                </button>
                <span className="text-sm font-medium text-red-500">IAAI</span>
              </label>
            </div>

            <button className="ml-auto bg-blue-500 hover:bg-blue-600 text-white px-8 py-2.5 rounded-lg text-sm font-semibold transition">
              Показать 122 648 машин
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}