import { Link } from 'react-router-dom'
import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#1a1a2e' }} className="text-gray-400 mt-auto">

      {/* Основной блок */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-8">

          {/* Лого + соцсети */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">B</span>
              </div>
              <span className="text-white font-bold text-lg tracking-wide">BIDCARS</span>
            </Link>

            <div className="flex flex-col gap-3 mb-6">
              <a href="#" className="flex items-center gap-2 text-sm hover:text-white transition">
                <FaFacebook className="w-4 h-4" /> Facebook
              </a>
              <a href="#" className="flex items-center gap-2 text-sm hover:text-white transition">
                <FaInstagram className="w-4 h-4" /> Instagram
              </a>
              <a href="#" className="flex items-center gap-2 text-sm hover:text-white transition">
                <FaLinkedin className="w-4 h-4" /> LinkedIn
              </a>
            </div>

            <p className="text-xs text-gray-500 leading-relaxed">
              Бишкек, Кыргызстан<br />
              Налог №: 000-00-00-000
            </p>
          </div>

          {/* Компания */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-4">Компания</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/blog" className="hover:text-white transition">Blog</Link></li>
              <li><Link to="/about" className="hover:text-white transition">О компании</Link></li>
              <li><Link to="/press" className="hover:text-white transition">Для прессы</Link></li>
              <li><Link to="/contacts" className="hover:text-white transition">Свяжитесь с нами</Link></li>
            </ul>
          </div>

          {/* Поддержка */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-4">Поддержка</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/faq" className="hover:text-white transition">Часто задаваемые вопросы</Link></li>
              <li><Link to="/before-buy" className="hover:text-white transition">Перед покупкой</Link></li>
              <li><Link to="/after-buy" className="hover:text-white transition">После покупки</Link></li>
              <li><Link to="/delivery" className="hover:text-white transition">Сроки доставки</Link></li>
              <li><Link to="/docs" className="hover:text-white transition">Документы о продаже</Link></li>
              <li><Link to="/calculator" className="hover:text-white transition">Калькулятор транспортировки</Link></li>
            </ul>
          </div>

          {/* Ключевые слова */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-4">Ключевые слова</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/catalog?auction=iaai" className="hover:text-white transition">IAAI</Link></li>
              <li><Link to="/catalog?auction=copart" className="hover:text-white transition">Copart</Link></li>
              <li><Link to="/catalog?auction=bidfax" className="hover:text-white transition">Bidfax</Link></li>
              <li><Link to="/catalog?auction=bidcar" className="hover:text-white transition">Bidcar</Link></li>
              <li><Link to="/catalog?auction=importusa" className="hover:text-white transition">Import USA</Link></li>
            </ul>
          </div>

          {/* Аукционы */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-4">Аукционы</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/catalog" className="hover:text-white transition">Все аукционы</Link></li>
              <li><Link to="/catalog?status=open" className="hover:text-white transition text-gray-500">- Открытые</Link></li>
              <li><Link to="/catalog?status=process" className="hover:text-white transition text-gray-500">- В процессе</Link></li>
              <li><Link to="/catalog?status=finished" className="hover:text-white transition text-gray-500">- Завершённые сегодня</Link></li>
              <li><Link to="/catalog?status=buynow" className="hover:text-white transition text-gray-500">- Быстрая покупка</Link></li>
              <li><Link to="/archive" className="hover:text-white transition mt-2 block">Архив</Link></li>
            </ul>
          </div>

          {/* Аккаунт */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-4">Аккаунт</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/login" className="hover:text-white transition">Войти</Link></li>
              <li><Link to="/register" className="hover:text-white transition">Регистрация</Link></li>
              <li><Link to="/forgot-password" className="hover:text-white transition">Восстановление пароля</Link></li>
            </ul>
          </div>

        </div>
      </div>

      {/* Нижняя строка */}
      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-wrap items-center justify-between gap-3 text-xs text-gray-500">
          <div className="flex gap-4">
            <Link to="/rules" className="hover:text-white transition">Правила</Link>
            <Link to="/privacy" className="hover:text-white transition">Конфиденциальность и файлы cookie</Link>
          </div>
          <span>© 2026 BidCars. Все права защищены</span>
          <div className="flex items-center gap-3">
            <span className="cursor-pointer hover:text-white">(UTC+06:00) Бишкек</span>
            <span className="cursor-pointer hover:text-white">🇷🇺 Russian</span>
          </div>
        </div>
      </div>

    </footer>
  )
}