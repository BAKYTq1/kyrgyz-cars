import { Link } from 'react-router-dom'

export interface Lot {
  id: number
  title: string
  image: string
  auction: 'Copart' | 'IAAI'
  status: string
  timer: string
  currentBid: string
  buyNow?: string
}

export default function LotCard({ lot }: { lot: Lot }) {
  return (
    <Link
      to={`/lot/${lot.id}`}
      className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition border border-gray-100 group block"
    >
      {/* Фото */}
      <div className="relative">
        <img
          src={lot.image}
          alt={lot.title}
          className="w-full h-40 object-cover group-hover:scale-105 transition duration-300"
        />
        <div className="absolute top-2 left-2">
          <span className={`text-xs font-bold px-2 py-0.5 rounded text-white ${
            lot.auction === 'Copart' ? 'bg-blue-600' : 'bg-red-500'
          }`}>
            {lot.auction}
          </span>
        </div>
      </div>

      {/* Инфо */}
      <div className="p-3">
        <p className="text-sm font-semibold text-gray-900 mb-1 truncate">{lot.title}</p>

        <div className="flex items-center gap-1 mb-2">
          <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
            {lot.status}
          </span>
        </div>

        <div className="text-xs text-gray-500 mb-2">⏱ {lot.timer}</div>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-400">Текущая ставка:</p>
            <p className="text-sm font-bold text-gray-900">{lot.currentBid}</p>
          </div>
          {lot.buyNow && (
            <div className="text-right">
              <p className="text-xs text-gray-400">Купить сейчас:</p>
              <p className="text-sm font-bold text-blue-600">{lot.buyNow}</p>
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}