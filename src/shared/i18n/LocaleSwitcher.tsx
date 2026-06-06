import { localeLabels, type Locale } from './locales'
import { useI18n } from './I18nProvider'

const locales: Locale[] = ['ru', 'en', 'kg']

export default function LocaleSwitcher() {
  const { locale, setLocale } = useI18n()

  return (
    <div className="flex items-center gap-1 rounded-lg border border-gray-200 p-1 bg-gray-50">
      {locales.map((item) => (
        <button
          key={item}
          type="button"
          onClick={() => setLocale(item)}
          className={`px-2 py-1 text-xs font-semibold rounded-md transition ${
            locale === item ? 'bg-blue-600 text-white' : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          {localeLabels[item]}
        </button>
      ))}
    </div>
  )
}
