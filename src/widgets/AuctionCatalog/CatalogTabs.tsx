import { useI18n } from '../../shared/i18n/I18nProvider'
import styles from './CatalogTabs.module.scss'

interface CatalogTabsProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export default function CatalogTabs({ activeTab, setActiveTab }: CatalogTabsProps) {
  const { t } = useI18n()

  // Список табов формируется внутри компонента для динамического перевода
  const tabs = [
    { id: 'all', label: t('catalog2.tabs.all') },
    { id: 'open', label: t('catalog2.tabs.open') },
    { id: 'buy-now', label: `${t('catalog2.tabs.buyNow')} ⚡` },
    { id: 'tomorrow', label: t('catalog2.tabs.tomorrow') },
  ]

  return (
    <div className={styles.tabsContainer}>
      <div className={styles.tabsList}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`${styles.tabButton} ${activeTab === tab.id ? styles.activeTab : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  )
}
