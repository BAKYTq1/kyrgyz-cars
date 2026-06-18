import { useState } from 'react'
import { useI18n } from '../../shared/i18n/I18nProvider'
import styles from './FilterSidebar.module.scss'

export default function FilterSidebar() {
  const { t } = useI18n()
  const [activeBrand, setActiveBrand] = useState<string>('')
  const [engineStatus, setEngineStatus] = useState<string>('all')

  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarHeader}>
        <span className={styles.sidebarTitle}>{t('filters.title')}</span>
        <button className={styles.clearAllBtn}>{t('filters.clearAll')}</button>
      </div>

      {/* Блок 1: Поиск Марки */}
      <div className={styles.filterBlock}>
        <h4 className={styles.blockTitle}>{t('filters.brand')}</h4>
        <input 
          type="text" 
          placeholder={t('filters.brandPlaceholder')} 
          className={styles.searchInput} 
        />
        <div className={styles.scrollList}>
          {['Acura', 'Audi', 'BMW', 'Chevrolet', 'Ford', 'Honda', 'Hyundai', 'Kia', 'Lexus', 'Mercedes-Benz', 'Toyota', 'Volkswagen'].map(brand => (
            <button 
              key={brand} 
              className={`${styles.listItem} ${activeBrand === brand ? styles.activeItem : ''}`}
              onClick={() => setActiveBrand(brand === activeBrand ? '' : brand)}
            >
              {brand}
              {activeBrand === brand && <span className={styles.checkIcon}>✓</span>}
            </button>
          ))}
        </div>
      </div>

      <hr className={styles.divider} />

      {/* Блок 2: Диапазон Года выпуска */}
      <div className={styles.filterBlock}>
        <h4 className={styles.blockTitle}>{t('filters.year')}</h4>
        <div className={styles.rangeGroup}>
          <input type="number" placeholder={t('filters.rangeFrom')} className={styles.rangeInput} />
          <span className={styles.rangeDash}>—</span>
          <input type="number" placeholder={t('filters.rangeTo')} className={styles.rangeInput} />
        </div>
      </div>

      <hr className={styles.divider} />

      {/* Блок 3: Статус двигателя */}
      <div className={styles.filterBlock}>
        <h4 className={styles.blockTitle}>{t('filters.engineStatus')}</h4>
        <div className={styles.statusGroup}>
          <button 
            className={`${styles.statusButton} ${engineStatus === 'all' ? styles.activeStatus : ''}`}
            onClick={() => setEngineStatus('all')}
          >
            {t('filters.engineStatuses.all')}
          </button>
          <button 
            className={`${styles.statusButton} ${engineStatus === 'run' ? styles.activeStatus : ''}`}
            onClick={() => setEngineStatus('run')}
          >
            <span className={styles.dotGreen} /> {t('filters.engineStatuses.run')}
          </button>
          <button 
            className={`${styles.statusButton} ${engineStatus === 'stat' ? styles.activeStatus : ''}`}
            onClick={() => setEngineStatus('stat')}
          >
            <span className={styles.dotOrange} /> {t('filters.engineStatuses.stat')}
          </button>
        </div>
      </div>

      <hr className={styles.divider} />

      {/* Блок 4: Тип повреждения */}
      <div className={styles.filterBlock}>
        <h4 className={styles.blockTitle}>{t('filters.primaryDamage')}</h4>
        <select className={styles.selectInput}>
          <option value="">{t('filters.damages.any')}</option>
          <option value="1">{t('filters.damages.front')}</option>
          <option value="2">{t('filters.damages.rear')}</option>
          <option value="3">{t('filters.damages.side')}</option>
          <option value="4">{t('filters.damages.hail')}</option>
          <option value="5">{t('filters.damages.flood')}</option>
        </select>
      </div>

      <hr className={styles.divider} />

      {/* Блок 5: Коробка передач */}
      <div className={styles.filterBlock}>
        <h4 className={styles.blockTitle}>{t('filters.transmission')}</h4>
        <div className={styles.checkboxGroup}>
          <label className={styles.checkboxLabel}>
            <input type="checkbox" className={styles.checkbox} />
            <span>{t('filters.transmissions.auto')}</span>
          </label>
          <label className={styles.checkboxLabel}>
            <input type="checkbox" className={styles.checkbox} />
            <span>{t('filters.transmissions.manual')}</span>
          </label>
        </div>
      </div>

      <hr className={styles.divider} />

      {/* Блок 6: Аукцион */}
      <div className={styles.filterBlock}>
        <h4 className={styles.blockTitle}>{t('filters.auction')}</h4>
        <div className={styles.checkboxGroup}>
          <label className={styles.checkboxLabel}>
            <input type="checkbox" className={styles.checkbox} />
            <span>Copart</span>
          </label>
          <label className={styles.checkboxLabel}>
            <input type="checkbox" className={styles.checkbox} />
            <span>IAAI</span>
          </label>
        </div>
      </div>
    </div>
  )
}