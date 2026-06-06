import { Link } from 'react-router-dom'
import { FaChevronRight } from 'react-icons/fa'
import LotCard from '../../entities/lot/LotCard'
import type { Lot } from '../../entities/lot/LotCard'

interface Category {
  title: string
  count: number
  lots: Lot[]
}

const categories: Category[] = [
  {
    title: 'Американские классические автомобили',
    count: 465,
    lots: [
      {
        id: 1,
        title: '1966 Ford Mustang',
        image: 'https://images.unsplash.com/photo-1567808291548-fc3ee04dbcf0?w=300&h=200&fit=crop',
        auction: 'Copart',
        status: 'Открытый аукцион',
        timer: '1д 2ч 1м 30с',
        currentBid: '$1,600',
        buyNow: '$28,000',
      },
      {
        id: 2,
        title: '1981 Mercedes-Benz 280',
        image: 'https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=300&h=200&fit=crop',
        auction: 'IAAI',
        status: 'Открытый аукцион',
        timer: '8д 4ч 21м 50с',
        currentBid: '$25',
        buyNow: '$48,500',
      },
      {
        id: 3,
        title: '1929 Mercedes-Benz Gazelle',
        image: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=300&h=200&fit=crop',
        auction: 'Copart',
        status: 'Открытый аукцион',
        timer: '3д 2ч 21м 50с',
        currentBid: '$3,350',
        buyNow: '$28,700',
      },
      {
        id: 4,
        title: '1989 Toyota Land Cruiser',
        image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=300&h=200&fit=crop',
        auction: 'IAAI',
        status: 'Открытый аукцион',
        timer: '0д 0ч 31м 50с',
        currentBid: '$9,500',
      },
      {
        id: 5,
        title: '1989 Mercedes-Benz 560',
        image: 'https://images.unsplash.com/photo-1563720360172-67b8f3dce741?w=300&h=200&fit=crop',
        auction: 'Copart',
        status: 'Открытый аукцион',
        timer: '0д 0ч 21м 50с',
        currentBid: '$1,700',
        buyNow: '$15,000',
      },
    ],
  },
  {
    title: 'Мотоцикл Harley-Davidson',
    count: 237,
    lots: [
      {
        id: 6,
        title: '2024 Harley-Davidson FLTRX',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop',
        auction: 'IAAI',
        status: 'Открытый аукцион',
        timer: '1д 5ч 1м 50с',
        currentBid: '$6,600',
      },
      {
        id: 7,
        title: '2024 Harley-Davidson FLHTK',
        image: 'https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=300&h=200&fit=crop',
        auction: 'Copart',
        status: 'Открытый аукцион',
        timer: '1д 4ч 4м 80с',
        currentBid: '$2,900',
      },
      {
        id: 8,
        title: '2025 Harley-Davidson FLHX',
        image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=300&h=200&fit=crop',
        auction: 'IAAI',
        status: 'Открытый аукцион',
        timer: '0д 3ч 2м 50с',
        currentBid: '$8,600',
      },
      {
        id: 9,
        title: '2020 Harley-Davidson FLHX',
        image: 'https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?w=300&h=200&fit=crop',
        auction: 'IAAI',
        status: 'Открытый аукцион',
        timer: '5д 6ч 2м 80с',
        currentBid: '$1,400',
      },
      {
        id: 10,
        title: '2024 Harley-Davidson FLHX',
        image: 'https://images.unsplash.com/photo-1504215680853-026ed2a45def?w=300&h=200&fit=crop',
        auction: 'IAAI',
        status: 'Открытый аукцион',
        timer: '6д 3ч 2м 80с',
        currentBid: '$2,050',
      },
    ],
  },
  {
    title: 'Суперкары',
    count: 0,
    lots: [
      {
        id: 11,
        title: '2006 Ferrari F430',
        image: 'https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=300&h=200&fit=crop',
        auction: 'IAAI',
        status: 'Открытый аукцион',
        timer: '0д 63ч 12м 50с',
        currentBid: '$66,000',
        buyNow: '$134,000',
      },
      {
        id: 12,
        title: '2025 Mclaren 755S',
        image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=300&h=200&fit=crop',
        auction: 'IAAI',
        status: 'Открытый аукцион',
        timer: '4д 0ч 55м 80с',
        currentBid: '$25',
      },
      {
        id: 13,
        title: '2019 Lamborghini Urus',
        image: 'https://images.unsplash.com/photo-1621135802920-133df287f89c?w=300&h=200&fit=crop',
        auction: 'Copart',
        status: 'Открытый аукцион',
        timer: '4д 1ч 21м 50с',
        currentBid: '$34,000',
        buyNow: '$75,000',
      },
      {
        id: 14,
        title: '2023 Mclaren GT',
        image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=300&h=200&fit=crop',
        auction: 'IAAI',
        status: 'Открытый аукцион',
        timer: '5д 4ч 21м 50с',
        currentBid: '$25',
        buyNow: '$75,000',
      },
      {
        id: 15,
        title: '2024 Ferrari SF',
        image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=300&h=200&fit=crop',
        auction: 'Copart',
        status: 'Открытый аукцион',
        timer: '3д 6ч 11м 50с',
        currentBid: '$30,500',
      },
    ],
  },
]

export default function FeaturedLots() {
  return (
    <section className="bg-white py-10 px-4">
      <div className="max-w-7xl mx-auto space-y-10">
        {categories.map((cat, i) => (
          <div key={i}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-gray-900">{cat.title}</h2>
                {cat.count > 0 && (
                  <span className="text-xs bg-blue-100 text-blue-600 font-semibold px-2 py-0.5 rounded-full">
                    {cat.count}
                  </span>
                )}
              </div>
              <Link
                to="/catalog"
                className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 font-medium bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition"
              >
                Смотреть все <FaChevronRight className="text-xs" />
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
              {cat.lots.map(lot => (
                <LotCard key={lot.id} lot={lot} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}