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
  const [searchParams] = useSearchParams()
  const [activeTab, setActiveTab] = useState<string>('all')
  const [filtersOpen, setFiltersOpen] = useState(false)
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

  useEffect(() => {
    if (!filtersOpen) return

    const previousOverflow = document.body.style.overflow
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setFiltersOpen(false)
    }

    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', closeOnEscape)

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', closeOnEscape)
    }
  }, [filtersOpen])

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
          <div className={styles.mobileToolbar}>
            <button
              type="button"
              className={styles.mobileToolButton}
              onClick={() => setFiltersOpen(true)}
              aria-expanded={filtersOpen}
              aria-controls="mobile-catalog-filters"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M4 6h16M7 12h10M10 18h4" />
              </svg>
              <span>{t('filters.title')}</span>
            </button>
            <button type="button" className={styles.mobileToolButton}>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M4 7h10M4 12h7M4 17h4M17 6v12m0 0-3-3m3 3 3-3" />
              </svg>
              <span>{t('filters.sortBy')}</span>
            </button>
          </div>

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

      {filtersOpen && (
        <div
          className={styles.filtersOverlay}
          role="presentation"
          onMouseDown={() => setFiltersOpen(false)}
        >
          <div
            id="mobile-catalog-filters"
            className={styles.filtersDrawer}
            role="dialog"
            aria-modal="true"
            aria-label={t('filters.title')}
            onMouseDown={(event) => event.stopPropagation()}
          >
            <FilterSidebar onClose={() => setFiltersOpen(false)} />
          </div>
        </div>
      )}
    </section>
  )
}
