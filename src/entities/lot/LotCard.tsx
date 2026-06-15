import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useI18n } from '../../shared/i18n/I18nProvider'
import type { Car } from '../../lib/lot/lotSlice'


function ImageSlider({ img, auction }: { img: Car['img'], auction: 'Copart' | 'IAAI' }) {
  const images = [img.img_1, img.img_2, img.img_3, img.img_4, img.img_5].filter(Boolean) as string[]
  const [current, setCurrent] = useState(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const startTimer = () => {
    if (images.length <= 1) return
    timerRef.current = setInterval(() => {
      setCurrent(prev => (prev + 1) % images.length)
    }, 2500)
  }

  useEffect(() => {
    startTimer()
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [])

  const go = (dir: number, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (timerRef.current) clearInterval(timerRef.current)
    setCurrent(prev => (prev + dir + images.length) % images.length)
    startTimer()
  }

  if (images.length === 0) {
    return (
      <div className="w-full h-36 sm:h-40 bg-gray-100 flex items-center justify-center text-gray-400 text-xs">
        Нет фото
      </div>
    )
  }

  return (
    <div className="relative overflow-hidden">
      <div
        className="flex transition-transform duration-300 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {images.map((src, i) => (
          <img
            key={i}
            src={src}
            alt=""
            className="w-full h-36 sm:h-40 object-cover shrink-0"
            style={{ minWidth: '100%' }}
          />
        ))}
      </div>

      {images.length > 1 && (
        <>
          <button onClick={(e) => go(-1, e)} className="absolute left-1 top-1/2 -translate-y-1/2 w-6 h-6 bg-black/40 hover:bg-black/60 text-white rounded-full flex items-center justify-center text-lg leading-none transition">‹</button>
          <button onClick={(e) => go(1, e)} className="absolute right-1 top-1/2 -translate-y-1/2 w-6 h-6 bg-black/40 hover:bg-black/60 text-white rounded-full flex items-center justify-center text-lg leading-none transition">›</button>
          <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 flex gap-1">
            {images.map((_, i) => (
              <div key={i} className={`h-1 rounded-full transition-all duration-300 ${i === current ? 'w-4 bg-white' : 'w-1 bg-white/50'}`} />
            ))}
          </div>
        </>
      )}

      <div className="absolute top-2 left-2">
        <span className={`text-xs font-bold px-2 py-0.5 rounded text-white ${auction === 'Copart' ? 'bg-blue-600' : 'bg-red-500'}`}>
          {auction}
        </span>
      </div>
    </div>
  )
}

export default function LotCard({ car }: { car: Car }) {
  const { t } = useI18n()

  const auction: 'Copart' | 'IAAI' = car.lot.startsWith('1-') ? 'Copart' : 'IAAI'

  return (
    <Link
      to={`/lot/${car.id}`}
      className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition border border-gray-100 group block"
    >
      <ImageSlider img={car.img} auction={auction} />

      <div className="p-2.5">
        <p className="text-sm font-semibold text-gray-900 mb-1.5 line-clamp-2 leading-tight">
          {car.name}
        </p>

        <div className="mb-1.5">
          <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
            {t('lotCard.auctionOpen')}
          </span>
        </div>

        <div className="flex items-center gap-1 text-xs text-gray-500 mb-2">
          <svg className="w-3.5 h-3.5 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {car.location}
        </div>

        <div className="flex items-end justify-between gap-1">
          <div>
            <p className="text-xs text-gray-400">{t('lotCard.currentBid')}</p>
            <p className="text-sm font-bold text-gray-900">
              {car.final_bid_formatted ?? car.prebid_price}
            </p>
          </div>
          {car.estimated_max > 0 && (
            <div className="text-right">
              <p className="text-xs text-gray-400">{t('lotCard.buyNow')}</p>
              <p className="text-sm font-bold text-green-600">${car.estimated_max.toLocaleString()}</p>
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}