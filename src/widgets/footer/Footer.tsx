import { Link } from 'react-router-dom'
import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa'
import { useI18n } from '../../shared/i18n/I18nProvider'
import logo from '../../assets/footerlogo.png'

export default function Footer() {
  const { t } = useI18n()

  return (
    <footer style={{ backgroundColor: '#1a1a2e' }} className="text-gray-400 mt-auto">

      {/* Основной блок */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-8">

          {/* Лого + соцсети */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <img src={logo} alt="Logo" className="w-15 h-16" />
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
              {t('footer.address')}<br />
              {t('footer.tax')}
            </p>
          </div>

          {/* Компания */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-4">{t('footer.sections.company')}</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/blog" className="hover:text-white transition">{t('footer.links.blog')}</Link></li>
              <li><Link to="/about" className="hover:text-white transition">{t('footer.links.about')}</Link></li>
              <li><Link to="/press" className="hover:text-white transition">{t('footer.links.press')}</Link></li>
              <li><Link to="/contacts" className="hover:text-white transition">{t('footer.links.contacts')}</Link></li>
            </ul>
          </div>

          {/* Поддержка */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-4">{t('footer.sections.support')}</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/help" className="hover:text-white transition">{t('footer.links.faq')}</Link></li>
              <li><Link to="/how-it-works?phase=1" className="hover:text-white transition">{t('footer.links.beforeBuy')}</Link></li>
              <li><Link to="/how-it-works?phase=2" className="hover:text-white transition">{t('footer.links.afterBuy')}</Link></li>
              <li><Link to="/delivery" className="hover:text-white transition">{t('footer.links.delivery')}</Link></li>
              {/* <li><Link to="/docs" className="hover:text-white transition">{t('footer.links.docs')}</Link></li> */}
              {/* <li><Link to="/calculator" className="hover:text-white transition">{t('footer.links.calculator')}</Link></li> */}
            </ul>
          </div>

          {/* Ключевые слова */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-4">{t('footer.sections.keywords')}</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/catalog?auction=iaai" className="hover:text-white transition">IAAI</Link></li>
              <li><Link to="/catalog?auction=copart" className="hover:text-white transition">Copart</Link></li>
              <li><Link to="/catalog?auction=bidfax" className="hover:text-white transition">Bidfax</Link></li>
              <li><Link to="/catalog?auction=Cardeals" className="hover:text-white transition">Cardeals</Link></li>
              {/* <li><Link to="/catalog?auction=importusa" className="hover:text-white transition">Import USA</Link></li> */}
            </ul>
          </div>

          {/* Аукционы */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-4">{t('footer.sections.auctions')}</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/catalog" className="hover:text-white transition">{t('footer.links.allAuctions')}</Link></li>
              <li><Link to="/catalog?status=open" className="hover:text-white transition text-gray-500">{t('footer.links.statusOpen')}</Link></li>
              <li><Link to="/catalog?status=process" className="hover:text-white transition text-gray-500">{t('footer.links.statusProcess')}</Link></li>
              <li><Link to="/catalog?status=finished" className="hover:text-white transition text-gray-500">{t('footer.links.statusFinished')}</Link></li>
              <li><Link to="/catalog?status=buynow" className="hover:text-white transition text-gray-500">{t('footer.links.statusBuyNow')}</Link></li>
              <li><Link to="/archive" className="hover:text-white transition mt-2 block">{t('footer.links.archive')}</Link></li>
            </ul>
          </div>

          {/* Аккаунт */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-4">{t('footer.sections.account')}</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/login" className="hover:text-white transition">{t('common.login')}</Link></li>
              <li><Link to="/register" className="hover:text-white transition">{t('common.register')}</Link></li>
              <li><Link to="/forgot-password" className="hover:text-white transition">{t('footer.links.forgotPassword')}</Link></li>
            </ul>
          </div>

        </div>
      </div>

      {/* Нижняя строка */}
      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-wrap items-center justify-between gap-3 text-xs text-gray-500">
          <div className="flex gap-4">
            <Link to="/rules" className="hover:text-white transition">{t('footer.links.rules')}</Link>
            <Link to="/privacy" className="hover:text-white transition">{t('footer.links.privacy')}</Link>
          </div>
          <span>© 2026 BidCars. {t('footer.copyright')}</span>
          <div className="flex items-center gap-3">
            <span className="cursor-pointer hover:text-white">{t('footer.timezone')}</span>
            <span className="cursor-pointer hover:text-white">{t('footer.currentLanguage')}</span>
          </div>
        </div>
      </div>

    </footer>
  )
}