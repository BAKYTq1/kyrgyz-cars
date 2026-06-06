import { Link } from 'react-router-dom'
import { useI18n } from '../../shared/i18n/I18nProvider'

export default function HeroSection() {
  const { t, tl } = useI18n()
  const tags = tl('hero.tags')
  const title = tl('hero.title')

  return (
    <section
      className="relative text-white py-20 px-4"
      style={{
        minHeight: '480px',
        background:
          'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url("https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1600") center/cover no-repeat',
      }}
    >
      <div
        className="absolute inset-0 flex items-center justify-end pr-16 overflow-hidden pointer-events-none"
        aria-hidden
      >
        <span
          className="font-black tracking-widest select-none"
          style={{ color: 'rgba(255,255,255,0.07)', fontSize: '220px', lineHeight: 1 }}
        >
          {t('hero.background')}
        </span>
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="flex gap-6 mb-10 text-sm text-gray-300 flex-wrap">
          {tags.map((item, index) => (
            <span key={index} className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-400 inline-block" />
              {item}
            </span>
          ))}
        </div>

        <h1 className="text-5xl md:text-7xl font-black uppercase leading-none mb-4">
          {title[0]}
          <br />
          {title[1]}
          <br />
          {title[2]}
        </h1>
        <p className="text-gray-300 text-lg mb-8">{t('hero.subtitle')}</p>

        <div className="flex gap-4 flex-wrap">
          <Link
            to="/catalog"
            className="px-8 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg font-semibold transition text-white text-base"
          >
            {t('hero.start')}
          </Link>
          <Link
            to="/how-it-works"
            className="px-8 py-3 border border-white/40 hover:border-white rounded-lg font-semibold transition text-white text-base"
          >
            {t('hero.howItWorks')}
          </Link>
        </div>
      </div>
    </section>
  )
}
