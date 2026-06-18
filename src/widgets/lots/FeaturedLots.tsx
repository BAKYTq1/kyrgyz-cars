import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaChevronRight } from 'react-icons/fa'
import { useAppDispatch, useAppSelector } from '../../lib/store'
import { fetchLots } from '../../lib/lot/lotSlice'
import LotCard from '../../entities/lot/LotCard'

export default function FeaturedLots() {
  const dispatch = useAppDispatch()
  const { list, loading, total } = useAppSelector(state => state.lots)

  useEffect(() => {
    dispatch(fetchLots({ status: '1' }))
  }, [dispatch])

  if (loading) {
    return (
      <section className="bg-white py-10 px-4">
        <div className="max-w-7xl mx-auto flex justify-center py-10">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      </section>
    )
  }

  return (
    <section className="bg-white py-10 px-4">
      <div className="max-w-7xl mx-auto space-y-10">

        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-gray-900">Активные лоты</h2>
              {total > 0 && (
                <span className="text-xs bg-blue-100 text-blue-600 font-semibold px-2 py-0.5 rounded-full">
                  {total}
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
            {list.slice(0, 5).map(car => (
              <LotCard key={car.id} car={car} />
            ))}
          </div>
        </div>

        {list.length > 5 && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-900">Ещё лоты</h2>
              <Link
                to="/catalog"
                className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 font-medium bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition"
              >
                Смотреть все <FaChevronRight className="text-xs" />
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
              {list.slice(5, 10).map(car => (
                <LotCard key={car.id} car={car} />
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  )
}