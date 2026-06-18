import { Link } from 'react-router-dom'
import type { Car } from '../../lib/lot/lotSlice'
import { useI18n } from '../../shared/i18n/I18nProvider'
import {
  FaVideo, FaTachometerAlt, FaCog, FaRoad,
  FaMapMarkerAlt, FaUser, FaFileAlt, FaWrench,
  FaHeart, FaCalendarAlt, FaExternalLinkAlt
} from 'react-icons/fa'
import styles from './CarCard.module.scss'

interface CarCardProps {
  car: Car
}

export default function CarCard({ car }: CarCardProps) {
  const { t } = useI18n()

  const carImage = car.img?.img_1 || car.img?.img_2 || 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=600&auto=format&fit=crop'

  const auction: 'Copart' | 'IAAI' = car.lot?.startsWith('1-') ? 'Copart' : 'IAAI'

  const getTransmission = (type: number): string => {
    if (type === 1) return t('card.transmissions.auto')
    if (type === 2) return t('card.transmissions.manual')
    return t('card.transmissions.default')
  }

  const getDriveType = (type: number): string => {
    switch (type) {
      case 1: return 'FWD'
      case 2: return 'RWD'
      case 3: return 'AWD'
      default: return t('card.driveDefault')
    }
  }

  return (
    <Link to={`/lot/${car.id}`} className={styles.card}>

      {/* Левая часть: Изображение */}
      <div className={styles.imageSection}>
        <img src={carImage} alt={car.name} className={styles.carImg} />
        <div className={styles.badgesOverlay}>
          {car.has_video && (
            <span className={styles.videoBadge}>
              <FaVideo className="inline mr-1" />
              {t('card.video')}
            </span>
          )}
          <span className={styles.sourceBadge}>CarDeals</span>
        </div>
      </div>

      {/* Центральная часть: Технические данные */}
      <div className={styles.infoSection}>
        <div className={styles.cardHeader}>
          <h2 className={styles.title}>{car.name_long || car.name}</h2>
          <div className={styles.metaRow}>
            <span>{t('card.vin')}: <strong className={styles.boldText}>{car.vin || '—'}</strong></span>
            <span className={styles.divider}>|</span>
            <span>{t('card.lot')}: <strong className={styles.lightText}>{car.lot || '—'}</strong></span>
          </div>
        </div>

        {/* Теги характеристик */}
        <div className={styles.specsRow}>
          <span className={styles.specBadge}>
            <FaRoad className="inline mr-1 text-gray-400" />
            {getDriveType(car.specs?.drive_type)}
          </span>
          <span className={styles.specBadge}>
            <FaCog className="inline mr-1 text-gray-400" />
            {car.specs?.engine_rendered || car.specs?.fuel_type || '—'}
          </span>
          <span className={styles.specBadge}>
            <FaCog className="inline mr-1 text-gray-400" />
            {getTransmission(car.specs?.transmission)}
          </span>
        </div>

        {/* Сетка спецификаций */}
        <div className={styles.detailsGrid}>
          <div className={styles.detailItem}>
            <span className={styles.label}>
              <FaTachometerAlt className="inline mr-1 text-gray-400" />
              {t('card.odometer')}:
            </span>
            <span className={styles.value}>
              {car.odometer ? `${car.odometer.toLocaleString()} ${t('card.miles')}` : '—'}
            </span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.label}>
              <FaUser className="inline mr-1 text-gray-400" />
              {t('card.seller')}:
            </span>
            <span className={styles.value}>{car.seller || '—'}</span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.label}>
              <FaFileAlt className="inline mr-1 text-gray-400" />
              {t('card.document')}:
            </span>
            <span className={styles.value}>{car.sale_document || 'Salvage'}</span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.label}>
              <FaMapMarkerAlt className="inline mr-1 text-gray-400" />
              {t('card.location')}:
            </span>
            <span className={styles.value}>{car.location || '—'}</span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.label}>
              <FaWrench className="inline mr-1 text-gray-400" />
              {t('card.damage')}:
            </span>
            <span className={styles.value}>{car.primary_damage || '—'}</span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.label}>
              <FaCog className="inline mr-1 text-gray-400" />
              {t('card.engineStatus')}:
            </span>
            <span className={styles.statusText} style={{ color: car.start_code_color || '#10b981' }}>
              {car.start_code || t('card.runAndDriveDefault')}
            </span>
          </div>
        </div>
      </div>

      {/* Правая часть: Блок аукциона */}
      <div className={styles.bidSection}>
        <div className={styles.bidHeader}>
          <span className={`${styles.auctionBadge} ${auction === 'Copart' ? styles.copart : styles.iaai}`}>
            {auction}
          </span>
          <button
            className={styles.favoriteBtn}
            onClick={e => e.preventDefault()}
          >
            <FaHeart />
          </button>
        </div>

        <div className={styles.pricingBlock}>
          <div className={styles.priceRow}>
            <span className={styles.priceLabel}>{t('card.estValue')}:</span>
            <span className={styles.priceValue}>
              ${car.estimated_min?.toLocaleString()} — ${car.estimated_max?.toLocaleString()}
            </span>
          </div>

          {car.time_left_formatted && (
            <div className={styles.dateRow}>
              <FaCalendarAlt className={styles.iconCalendar} />
              <span className={styles.timeText}>{car.time_left_formatted}</span>
            </div>
          )}
        </div>

        <div className={styles.currentBidBlock}>
          <span className={styles.bidLabel}>{t('card.currentBid')}:</span>
          <span className={styles.bidValue}>
            {car.prebid_price || (car.final_bid_formatted ? `$${car.final_bid_formatted}` : '$0')}
          </span>
        </div>

        <button
          className={styles.actionButton}
          onClick={e => e.preventDefault()}
        >
          <FaExternalLinkAlt className="inline mr-2" />
          {t('card.viewAuction')}
        </button>
      </div>
    </Link>
  )
}