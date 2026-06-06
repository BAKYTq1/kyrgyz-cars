import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { FaCar, FaGavel, FaClock, FaMapMarkerAlt, FaFileAlt, FaShieldAlt } from 'react-icons/fa'

const lot = {
  id: 1,
  title: '2019 Lamborghini Urus',
  images: [
    'https://images.unsplash.com/photo-1621135802920-133df287f89c?w=800&h=500&fit=crop',
    'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&h=500&fit=crop',
    'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&h=500&fit=crop',
    'https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=800&h=500&fit=crop',
  ],
  auction: 'Copart',
  status: 'Открытый аукцион',
  timer: '4д 1ч 21м 50с',
  currentBid: '$34,000',
  buyNow: '$75,000',
  lotNumber: '45678901',
  vin: 'ZPBUA1ZL4KLA09456',
  year: 2019,
  make: 'Lamborghini',
  model: 'Urus',
  odometer: '12,450 mi',
  color: 'Оранжевый',
  engine: '4.0L V8 Twin Turbo',
  transmission: 'Автомат',
  drive: 'AWD',
  fuel: 'Бензин',
  bodyStyle: 'SUV',
  damage: 'Передняя часть',
  secondaryDamage: 'Нет',
  location: 'Los Angeles, CA',
  saleDate: '03.06.2026',
  highlights: ['Чистый титул', 'Ключи есть', 'Airbag не сработали'],
}

const bids = [
  { user: 'User***45', amount: '$34,000', time: '2 мин назад' },
  { user: 'User***12', amount: '$33,000', time: '15 мин назад' },
  { user: 'User***78', amount: '$30,000', time: '1 ч назад' },
  { user: 'User***33', amount: '$27,500', time: '3 ч назад' },
]

export default function LotDetailPage() {
  const { id } = useParams()
  const [activeImage, setActiveImage] = useState(0)
  const [bidAmount, setBidAmount] = useState('')

  return (
    <div className="bg-gray-50 min-h-screen py-6 ">
      <div className="max-w-[1240px] mx-auto">

        {/* Заголовок */}
        <div className="mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
            <span>Главная</span>
            <span>/</span>
            <span>Каталог</span>
            <span>/</span>
            <span className="text-gray-900">{lot.title}</span>
          </div>
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h1 className="text-2xl font-black text-gray-900">{lot.title}</h1>
            <div className="flex items-center gap-2">
              <span className={`text-sm font-bold px-3 py-1 rounded-lg text-white ${lot.auction === 'Copart' ? 'bg-blue-600' : 'bg-red-500'}`}>
                {lot.auction}
              </span>
              <span className="text-sm bg-green-100 text-green-700 px-3 py-1 rounded-lg font-medium">
                {lot.status}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Левая колонка — фото + инфо */}
          <div className="lg:col-span-2 space-y-4">

            {/* Фото */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
              <img
                src={lot.images[activeImage]}
                alt={lot.title}
                className="w-full h-80 object-cover"
              />
              <div className="flex gap-2 p-3 overflow-x-auto">
                {lot.images.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt=""
                    onClick={() => setActiveImage(i)}
                    className={`w-20 h-14 object-cover rounded-lg cursor-pointer shrink-0 border-2 transition ${
                      activeImage === i ? 'border-blue-500' : 'border-transparent'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Характеристики */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <h2 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
                <FaCar className="text-blue-500" /> Характеристики
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {[
                  { label: 'Год', value: lot.year },
                  { label: 'Марка', value: lot.make },
                  { label: 'Модель', value: lot.model },
                  { label: 'Пробег', value: lot.odometer },
                  { label: 'Цвет', value: lot.color },
                  { label: 'Двигатель', value: lot.engine },
                  { label: 'КПП', value: lot.transmission },
                  { label: 'Привод', value: lot.drive },
                  { label: 'Топливо', value: lot.fuel },
                  { label: 'Кузов', value: lot.bodyStyle },
                  { label: 'Повреждения', value: lot.damage },
                  { label: 'Доп. повреждения', value: lot.secondaryDamage },
                ].map((item, i) => (
                  <div key={i} className="bg-gray-50 rounded-xl p-3">
                    <p className="text-xs text-gray-400 mb-0.5">{item.label}</p>
                    <p className="text-sm font-semibold text-gray-800">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* VIN + Лот */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <h2 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
                <FaFileAlt className="text-blue-500" /> Документы
              </h2>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-50 rounded-xl p-3">
                  <p className="text-xs text-gray-400 mb-0.5">Номер лота</p>
                  <p className="text-sm font-semibold text-gray-800">{lot.lotNumber}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-3">
                  <p className="text-xs text-gray-400 mb-0.5">VIN</p>
                  <p className="text-sm font-semibold text-gray-800 font-mono">{lot.vin}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                {lot.highlights.map((h, i) => (
                  <span key={i} className="flex items-center gap-1 text-xs bg-green-50 text-green-700 px-3 py-1 rounded-full border border-green-200">
                    <FaShieldAlt className="text-xs" /> {h}
                  </span>
                ))}
              </div>
            </div>

            {/* История ставок */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <h2 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
                <FaGavel className="text-blue-500" /> История ставок
              </h2>
              <div className="space-y-2">
                {bids.map((bid, i) => (
                  <div key={i} className={`flex items-center justify-between px-4 py-3 rounded-xl ${i === 0 ? 'bg-blue-50 border border-blue-100' : 'bg-gray-50'}`}>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600">
                        {bid.user[0]}
                      </div>
                      <span className="text-sm text-gray-700">{bid.user}</span>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-gray-900">{bid.amount}</p>
                      <p className="text-xs text-gray-400">{bid.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Правая колонка — ставка */}
          <div className="space-y-4">

            {/* Таймер + ставка */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 sticky top-4">

              {/* Таймер */}
              <div className="flex items-center gap-2 text-orange-500 mb-4">
                <FaClock />
                <span className="text-sm font-semibold">До конца аукциона: {lot.timer}</span>
              </div>

              {/* Текущая ставка */}
              <div className="mb-4">
                <p className="text-xs text-gray-400 mb-1">Текущая ставка</p>
                <p className="text-3xl font-black text-gray-900">{lot.currentBid}</p>
              </div>

              {/* Купить сейчас */}
              {lot.buyNow && (
                <div className="mb-4 p-3 bg-blue-50 rounded-xl border border-blue-100">
                  <p className="text-xs text-gray-500 mb-1">Купить сейчас</p>
                  <p className="text-xl font-black text-blue-600">{lot.buyNow}</p>
                </div>
              )}

              {/* Форма ставки */}
              <div className="mb-3">
                <label className="text-xs text-gray-500 mb-1 block">Ваша ставка (мин. $35,000)</label>
                <input
                  type="number"
                  value={bidAmount}
                  onChange={e => setBidAmount(e.target.value)}
                  placeholder="$35,000"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-500 transition"
                />
              </div>

              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition mb-2">
                Поставить ставку
              </button>

              {lot.buyNow && (
                <button className="w-full border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-bold py-3 rounded-xl transition">
                  Купить сейчас за {lot.buyNow}
                </button>
              )}

              {/* Локация */}
              <div className="flex items-center gap-2 text-xs text-gray-500 mt-4 pt-4 border-t border-gray-100">
                <FaMapMarkerAlt className="text-blue-500" />
                <span>{lot.location}</span>
                <span className="ml-auto">📅 {lot.saleDate}</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}