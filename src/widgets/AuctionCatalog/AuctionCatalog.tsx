import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../lib/store'
import { fetchLots } from '../../lib/lot/lotSlice'
import type { Car, LotListParams } from '../../lib/lot/lotSlice' 
import { useI18n } from '../../shared/i18n/I18nProvider'
import FilterSidebar from './FilterSidebar'
import CatalogTabs from './CatalogTabs'
import CarCard from './CarCard'
import styles from './AuctionCatalog.module.scss'

export default function AuctionCatalog() {
  const dispatch = useAppDispatch()
  const { list, loading } = useAppSelector(state => state.lots)
  const [searchParams, setSearchParams] = useSearchParams()
  const [activeTab, setActiveTab] = useState<string>('all')
  const { t } = useI18n()
  
  // Лимит отображаемых карточек за раз
  const [visibleCount, setVisibleCount] = useState<number>(30)

  useEffect(() => {
    const params: LotListParams = {
      status: '1',
      search: searchParams.get('search') || undefined,
      search_status: searchParams.get('search_status') || undefined,
      loss_type: searchParams.get('loss_type') || undefined,
      location: searchParams.get('location') || undefined,
      seller: searchParams.get('seller') || undefined,
    }
    
    dispatch(fetchLots(params))
    // Сбрасываем лимит до 30 при изменении фильтров, чтобы не прыгал скролл
    setVisibleCount(30)
  }, [dispatch, searchParams])

  // Фильтруем лоты по табам (клиентская часть)
  const filteredLots = (list as Car[]).filter((car) => {
    if (activeTab === 'all') return true
    if (activeTab === 'open') return car.status === 1
    if (activeTab === 'buy-now') return !!car.buy_now_price
    return true
  })

  // Срезаем массив: берем только первые N элементов (например, 30, 60, 90...)
  const carsToRender = filteredLots.slice(0, visibleCount)

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 30)
  }

  return (
    <section className={styles.catalogWrapper}>
      <div className={styles.container}>
        
        <aside className={styles.sidebarColumn}>
          <FilterSidebar />
        </aside>

        <main className={styles.contentColumn}>
          <CatalogTabs activeTab={activeTab} setActiveTab={setActiveTab} />
          
          {loading ? (
            <div className={styles.loaderWrapper}>
              <div className={styles.spinner} />
            </div>
          ) : (
            <>
              <div className={styles.cardsGrid}>
                {carsToRender.length > 0 ? (
                  carsToRender.map((car) => (
                    <CarCard key={car.id} car={car} />
                  ))
                ) : (
                  <div className={styles.emptyState}>{t('catalog.emptyState')}</div>
                )}
              </div>

              {/* Кнопка показывается только если отфильтрованных лотов больше, чем мы вывели на экран */}
              {filteredLots.length > visibleCount && (
                <div className={styles.loadMoreWrapper}>
                  <button className={styles.loadMoreBtn} onClick={handleLoadMore}>
                    {t('catalog.loadMore')}
                  </button>
                </div>
              )}
            </>
          )}
        </main>

      </div>
    </section>
  )
}