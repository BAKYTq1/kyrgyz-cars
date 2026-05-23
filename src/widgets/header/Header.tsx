import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="bg-white text-gray-800 shadow-sm">

      {/* Основной хедер */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-4">

        {/* Логотип */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white text-lg font-bold">B</span>
          </div>
          <span className="text-xl font-bold text-gray-900 tracking-wide">BIDCARS</span>
        </Link>

        {/* Поиск */}
        <div className="hidden md:flex flex-1 max-w-2xl border border-gray-300 rounded-lg overflow-hidden">
          <select className="px-3 py-2 text-sm bg-gray-50 border-r border-gray-300 outline-none text-gray-700">
            <option>Текущие</option>
            <option>Архив</option>
          </select>
          <input
            type="text"
            placeholder="Поиск по марке, модели, номеру предложения или VIN..."
            className="flex-1 px-4 py-2 text-sm outline-none text-gray-800"
          />
          <button className="px-4 bg-white hover:bg-gray-50 transition border-l border-gray-300">
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
            </svg>
          </button>
        </div>

        {/* Кнопки */}
        <div className="hidden md:flex items-center gap-2 shrink-0 ml-auto">
          <Link to="/login" className="flex items-center gap-2 text-sm px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition text-gray-700">
            Войти
          </Link>
          <Link to="/register" className="flex items-center gap-2 text-sm px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition">
            Зарегистрироваться
          </Link>
        </div>

        {/* Бургер */}
        <button className="md:hidden text-2xl ml-auto" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Навигация второй строки */}
      <div className="border-t border-gray-200 hidden md:block">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex items-center gap-1 text-sm text-gray-600">
            <Link to="/catalog" className="px-3 py-3 hover:text-blue-600 transition">Поиск и ставки</Link>
            <Link to="/delivery" className="px-3 py-3 hover:text-blue-600 transition">Сроки доставки</Link>
            <Link to="/how-it-works" className="px-3 py-3 hover:text-blue-600 transition">Как это работает</Link>
            <Link to="/help" className="px-3 py-3 hover:text-blue-600 transition">Помощь</Link>
            <Link to="/about" className="px-3 py-3 hover:text-blue-600 transition">О нас</Link>
            <Link to="/contacts" className="px-3 py-3 hover:text-blue-600 transition">Контакты</Link>
            <div className="ml-auto text-xs text-gray-400">
              Пн-Пт 10:00–22:00 CET
            </div>
          </nav>
        </div>
      </div>

      {/* Мобильное меню */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 px-4 py-4 flex flex-col gap-3 text-sm">
          <input type="text" placeholder="Поиск..." className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none" />
          <Link to="/catalog" onClick={() => setMenuOpen(false)} className="py-2 text-gray-700 hover:text-blue-600">Каталог</Link>
          <Link to="/how-it-works" onClick={() => setMenuOpen(false)} className="py-2 text-gray-700 hover:text-blue-600">Как это работает</Link>
          <div className="flex gap-2 pt-2">
            <Link to="/login" className="flex-1 text-center border border-gray-300 rounded-lg py-2">Войти</Link>
            <Link to="/register" className="flex-1 text-center bg-blue-600 rounded-lg py-2 text-white">Зарегистрироваться</Link>
          </div>
        </div>
      )}
    </header>
  )
}