import { useState } from 'react'
// @ts-ignore - react-simple-maps has no type declarations
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps'
import { FaAnchor, FaHome, FaTruck, FaMapMarkerAlt } from 'react-icons/fa'

const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json'

const homeDeliveryCountries: Record<string, { flag: string; delivery: string; time: string }> = {
  'Kyrgyzstan': { flag: '🇰🇬', delivery: 'Доставка на дом', time: '45–60 дней' },
  'Kazakhstan': { flag: '🇰🇿', delivery: 'Доставка на дом', time: '50–65 дней' },
  'Russia': { flag: '🇷🇺', delivery: 'Доставка на дом', time: '60–75 дней' },
  'Uzbekistan': { flag: '🇺🇿', delivery: 'Доставка на дом', time: '45–60 дней' },
  'Tajikistan': { flag: '🇹🇯', delivery: 'Доставка на дом', time: '50–65 дней' },
  'Turkmenistan': { flag: '🇹🇲', delivery: 'Доставка на дом', time: '50–65 дней' },
  'Azerbaijan': { flag: '🇦🇿', delivery: 'Доставка на дом', time: '45–60 дней' },
  'Georgia': { flag: '🇬🇪', delivery: 'Доставка на дом', time: '45–60 дней' },
  'Armenia': { flag: '🇦🇲', delivery: 'Доставка на дом', time: '45–60 дней' },
}

const pickupCountries: Record<string, { flag: string; delivery: string; time: string }> = {
  'Mongolia': { flag: '🇲🇳', delivery: 'Самовывоз', time: '60–75 дней' },
  'Belarus': { flag: '🇧🇾', delivery: 'Самовывоз', time: '55–70 дней' },
  'Ukraine': { flag: '🇺🇦', delivery: 'Самовывоз', time: '55–70 дней' },
  'Moldova': { flag: '🇲🇩', delivery: 'Самовывоз', time: '55–70 дней' },
}

const markers = [
  { name: 'Бишкек, KG', coordinates: [74.5, 42.8] as [number, number] },
  { name: 'Алматы, KZ', coordinates: [76.9, 43.2] as [number, number] },
  { name: 'Ташкент, UZ', coordinates: [69.2, 41.3] as [number, number] },
  { name: 'Тбилиси, GE', coordinates: [44.8, 41.7] as [number, number] },
]

const countriesList = [
  { flag: '🇰🇬', name: 'Кыргызстан' },
  { flag: '🇰🇿', name: 'Казахстан' },
  { flag: '🇷🇺', name: 'Россия' },
  { flag: '🇺🇿', name: 'Узбекистан' },
  { flag: '🇹🇯', name: 'Таджикистан' },
  { flag: '🇹🇲', name: 'Туркменистан' },
  { flag: '🇦🇿', name: 'Азербайджан' },
  { flag: '🇬🇪', name: 'Грузия' },
  { flag: '🇦🇲', name: 'Армения' },
]

const pickupLocations = [
  { icon: <FaAnchor />, name: 'Бишкек, KG' },
  { icon: <FaAnchor />, name: 'Алматы, KZ' },
  { icon: <FaAnchor />, name: 'Ташкент, UZ' },
  { icon: <FaAnchor />, name: 'Тбилиси, GE' },
  { icon: <FaHome />, name: 'Москва, RU', note: '(дополнительная плата)' },
]

export default function DeliveryMap() {
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null)
  const [activeCountry, setActiveCountry] = useState<string | null>('Kyrgyzstan')
  const [tooltip, setTooltip] = useState<{ x: number; y: number; name: string } | null>(null)

  const getColor = (name: string) => {
    if (name === activeCountry) return '#2563eb'
    if (name === hoveredCountry) return '#60a5fa'
    if (homeDeliveryCountries[name]) return '#bbf7d0'
    if (pickupCountries[name]) return '#bfdbfe'
    return '#e2e8f0'
  }

  const activeInfo = activeCountry
    ? homeDeliveryCountries[activeCountry] || pickupCountries[activeCountry]
    : null

  return (
    <section className="py-12 px-4" style={{ backgroundColor: '#f8fafc' }}>
      <div className="max-w-7xl mx-auto">

        <h2 className="text-2xl font-bold text-gray-900 mb-8">
          Варианты доставки и получения
        </h2>

        <div className="flex flex-col md:flex-row gap-6">

          {/* Левая панель */}
          <div className="md:w-64 shrink-0 flex flex-col gap-4">

            {/* Инфо выбранной страны */}
            {activeCountry && activeInfo && (
              <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">{activeInfo.flag}</span>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{activeCountry}</p>
                    <p className="text-xs text-gray-500">{activeInfo.delivery}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-600 bg-blue-50 rounded-lg px-3 py-2">
                  <FaTruck className="text-blue-500" />
                  <span>Срок доставки: <strong>{activeInfo.time}</strong></span>
                </div>
              </div>
            )}

            {/* Страны доставки */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                Доставка на дом
              </p>
              <ul className="space-y-2">
                {countriesList.map((c, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                    <span className="w-2 h-2 rounded-full bg-green-400 shrink-0" />
                    <span>{c.flag}</span>
                    {c.name}
                  </li>
                ))}
              </ul>
            </div>

            {/* Самовывоз */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                Самовывоз из локаций
              </p>
              <ul className="space-y-2">
                {pickupLocations.map((loc, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="text-blue-500 text-xs">{loc.icon}</span>
                    <span>{loc.name}</span>
                    {loc.note && <span className="text-gray-400 text-xs">{loc.note}</span>}
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Карта */}
          <div className="flex-1 relative">
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">

              {/* Tooltip */}
              {tooltip && (
                <div
                  className="absolute z-20 bg-gray-900 text-white text-xs px-3 py-2 rounded-lg pointer-events-none shadow-lg"
                  style={{ left: tooltip.x + 10, top: tooltip.y - 10 }}
                >
                  <div className="flex items-center gap-1">
                    <FaMapMarkerAlt className="text-blue-400" />
                    {tooltip.name}
                  </div>
                  {(homeDeliveryCountries[tooltip.name] || pickupCountries[tooltip.name]) && (
                    <div className="text-gray-300 mt-0.5">
                      {(homeDeliveryCountries[tooltip.name] || pickupCountries[tooltip.name])?.delivery}
                    </div>
                  )}
                </div>
              )}

              <ComposableMap
                projection="geoMercator"
                projectionConfig={{ center: [65, 45], scale: 350 }}
                style={{ width: '100%', height: '660px' }}
              >
                <Geographies geography={GEO_URL}>
                  {({ geographies }: { geographies: any[] }) =>
                    geographies.map((geo: any) => {
                      const name = geo.properties.name
                      return (
                        <Geography
                          key={geo.rsmKey}
                          geography={geo}
                          fill={getColor(name)}
                          stroke="#fff"
                          strokeWidth={0.5}
                          style={{
                            default: { outline: 'none' },
                            hover: { outline: 'none', cursor: homeDeliveryCountries[name] || pickupCountries[name] ? 'pointer' : 'default' },
                            pressed: { outline: 'none' },
                          }}
                          onMouseEnter={(e: React.MouseEvent<SVGPathElement>) => {
                            setHoveredCountry(name)
                            setTooltip({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY, name })
                          }}
                          onMouseMove={(e: React.MouseEvent<SVGPathElement>) => {
                            setTooltip({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY, name })
                          }}
                          onMouseLeave={() => {
                            setHoveredCountry(null)
                            setTooltip(null)
                          }}
                          onClick={() => {
                            if (homeDeliveryCountries[name] || pickupCountries[name]) {
                              setActiveCountry(name)
                            }
                          }}
                        />
                      )
                    })
                  }
                </Geographies>

                {/* Маркеры городов */}
                {markers.map((m, i) => (
                  <Marker key={i} coordinates={m.coordinates}>
                    <circle r={4} fill="#2563eb" stroke="#fff" strokeWidth={1.5} />
                    <text
                      textAnchor="middle"
                      y={-8}
                      style={{ fontSize: '8px', fill: '#1e3a5f', fontWeight: 600 }}
                    >
                      {m.name}
                    </text>
                  </Marker>
                ))}
              </ComposableMap>
            </div>

            {/* Легенда */}
            <div className="flex gap-4 mt-3 text-xs text-gray-500 flex-wrap">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-green-200 inline-block" />
                Доставка на дом
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-blue-200 inline-block" />
                Самовывоз
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-blue-600 inline-block" />
                Выбранная страна
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}