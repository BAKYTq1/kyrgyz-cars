import { useEffect, useRef, useState, useCallback } from 'react';
import { useI18n } from '../../shared/i18n/I18nProvider';

import galleryImg1 from '../../assets/about1.jpg';
import galleryImg2 from '../../assets/about3.jpg';
import galleryImg3 from '../../assets/about3.jpg';
import galleryImg4 from '../../assets/about1.jpg';
import galleryImg5 from '../../assets/about3.jpg';
import galleryImg6 from '../../assets/about1.jpg';
import galleryImg7 from '../../assets/about-us-7.jpg';

type ReviewPlatform = 'google' | 'facebook' | 'trustpilot' | 'opinie';
type ActiveTab = ReviewPlatform | 'all';

type Review = {
  id: number;
  platform: ReviewPlatform;
  rating: number;
  text: string;
  name: string;
  date: string;
  avatar?: string;
};

type DeliveryCard = {
  titleKey: string;
  textKey: string;
  image: string;
  wide?: boolean;
};

type Stat = {
  target: number;
  labelKey: string;
  prefix?: string;
  suffix?: string;
  decimals?: number;
};

const reviewsData: Review[] = [
  {
    id: 1,
    platform: 'google',
    rating: 5,
    text: 'Отличный сервис, помогли подобрать и доставить автомобиль без лишних проблем.',
    name: 'Азамат',
    date: '12.05.2026',
  },
  {
    id: 2,
    platform: 'facebook',
    rating: 5,
    text: 'Все этапы были понятны, менеджер всегда был на связи.',
    name: 'Айдана',
    date: '08.05.2026',
  },
  {
    id: 3,
    platform: 'trustpilot',
    rating: 4,
    text: 'Машина пришла в хорошем состоянии, сроки доставки совпали с обещанными.',
    name: 'Руслан',
    date: '26.04.2026',
  },
  {
    id: 4,
    platform: 'opinie',
    rating: 5,
    text: 'Понравилась прозрачность работы и помощь с документами.',
    name: 'Элина',
    date: '14.04.2026',
  },
  {
    id: 5,
    platform: 'google',
    rating: 5,
    text: 'Быстро и профессионально. Рекомендую всем, кто хочет купить авто из США.',
    name: 'Тимур',
    date: '02.04.2026',
  },
  {
    id: 6,
    platform: 'trustpilot',
    rating: 5,
    text: 'Превосходный опыт работы с командой CarDeals. Всё чётко и в срок.',
    name: 'Камилла',
    date: '18.03.2026',
  },
];

const deliveryCards: DeliveryCard[] = [
  {
    titleKey: 'about.deliveryCards.seaShipping.title',
    textKey: 'about.deliveryCards.seaShipping.text',
    image: galleryImg7,
    wide: true,
  },
  {
    titleKey: 'about.deliveryCards.customs.title',
    textKey: 'about.deliveryCards.customs.text',
    image: galleryImg3,
  },
  {
    titleKey: 'about.deliveryCards.homeDelivery.title',
    textKey: 'about.deliveryCards.homeDelivery.text',
    image: galleryImg1,
  },
];

const stats: Stat[] = [
  { target: 250, suffix: '+', labelKey: 'about.stats.dailyBids' },
  { target: 14574, labelKey: 'about.stats.importedVehicles' },
  { target: 98, suffix: '%', labelKey: 'about.stats.satisfactionRate' },
  { target: 109.01, prefix: '$', suffix: 'M+', decimals: 2, labelKey: 'about.stats.importedVehicleValue' },
];

const tabs: { id: ActiveTab; label: string; rating: string }[] = [
  { id: 'all', label: 'about.reviews.all', rating: '4.9' },
  { id: 'google', label: 'Google', rating: '4.9' },
  { id: 'opinie', label: 'Opinie', rating: '5.0' },
  { id: 'facebook', label: 'Facebook', rating: '4.9' },
  { id: 'trustpilot', label: 'Trustpilot', rating: '4.8' },
];

const sourceBadgeClasses: Record<ReviewPlatform, string> = {
  google: 'bg-blue-500',
  facebook: 'bg-blue-600',
  trustpilot: 'bg-emerald-500',
  opinie: 'bg-red-600',
};




function useCardsPerPage(containerRef: React.RefObject<HTMLDivElement | null>) {
  const [perPage, setPerPage] = useState(4);

  useEffect(() => {
    const update = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.offsetWidth;
      if (w < 640) setPerPage(1);
      else if (w < 1024) setPerPage(2);
      else setPerPage(4);
    };

    update();
    const ro = new ResizeObserver(update);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, [containerRef]);

  return perPage;
}

export default function About() {
  const { t } = useI18n();
  const [activeTab, setActiveTab] = useState<ActiveTab>('all');
  const [animatedStats, setAnimatedStats] = useState<number[]>(stats.map(() => 1));
  const [currentPage, setCurrentPage] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const perPage = useCardsPerPage(containerRef as React.RefObject<HTMLDivElement>);

  // Reset page when tab changes
  const handleTabChange = useCallback((tab: ActiveTab) => {
    setActiveTab(tab);
    setCurrentPage(0);
  }, []);

  useEffect(() => {
    const duration = 1600;
    const startTime = performance.now();
    let animationId = 0;

    const animateStats = (currentTime: number) => {
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);

      setAnimatedStats(
        stats.map((stat) => {
          const startValue = stat.target > 1 ? 1 : 0;
          return startValue + (stat.target - startValue) * easedProgress;
        }),
      );

      if (progress < 1) {
        animationId = requestAnimationFrame(animateStats);
      }
    };

    animationId = requestAnimationFrame(animateStats);
    return () => cancelAnimationFrame(animationId);
  }, []);

  const filteredReviews =
    activeTab === 'all'
      ? reviewsData
      : reviewsData.filter((review) => review.platform === activeTab);

  const totalPages = Math.ceil(filteredReviews.length / perPage);
  const visibleReviews = filteredReviews.slice(
    currentPage * perPage,
    currentPage * perPage + perPage,
  );

  const goTo = (page: number) => {
    setCurrentPage(Math.max(0, Math.min(page, totalPages - 1)));
  };

  return (
    <section className="bg-gray-100 py-10 text-gray-900 md:py-14 lg:py-16">
      <div className="mx-auto w-[min(1180px,calc(100%-24px))]">
        {/* Header + Gallery */}
        <div className="text-center">
          <h2 className="mb-2 text-2xl font-black leading-tight text-gray-950 md:mb-4 md:text-6xl">
            {t('about.title')}
          </h2>
          <p className="mx-auto mb-12 max-w-3xl text-sm leading-5 text-gray-500 md:mb-8 md:text-lg md:leading-7 md:text-gray-600">
            {t('about.subtitle')}
          </p>

          {/* Mobile gallery: one tall image and two stacked images. */}
          <div className="grid h-[250px] grid-cols-2 grid-rows-2 gap-4 md:hidden">
            <div className="row-span-2 overflow-hidden rounded-xl bg-gray-200">
              <img className="h-full w-full object-cover" src={galleryImg1} alt={t('about.gallery.alt1')} />
            </div>
            <div className="min-h-0 overflow-hidden rounded-xl bg-gray-200">
              <img
                className="h-full w-full object-cover"
                src={galleryImg7}
                alt={t('about.gallery.alt2')}
              />
            </div>
            <div className="min-h-0 overflow-hidden rounded-xl bg-gray-200">
              <img className="h-full w-full object-cover" src={galleryImg3} alt={t('about.gallery.alt3')} />
            </div>
          </div>

          {/* Full gallery for tablet and desktop. */}
          <div className="hidden gap-4 md:grid md:grid-cols-2 lg:min-h-[420px] lg:grid-cols-[1.15fr_0.85fr_0.85fr_1.15fr]">
            <div className="min-h-56 overflow-hidden rounded-lg bg-gray-200 md:min-h-72">
              <img className="h-full w-full object-cover" src={galleryImg1} alt={t('about.gallery.alt1')} />
            </div>
            <div className="grid gap-4">
              <div className="min-h-56 overflow-hidden rounded-lg bg-gray-200 lg:min-h-0">
                <img className="h-full w-full object-cover" src={galleryImg2} alt={t('about.gallery.alt2')} />
              </div>
              <div className="min-h-56 overflow-hidden rounded-lg bg-gray-200 lg:min-h-0">
                <img className="h-full w-full object-cover" src={galleryImg1} alt={t('about.gallery.alt1')} />
              </div>
            </div>
            <div className="grid gap-4">
              <div className="min-h-56 overflow-hidden rounded-lg bg-gray-200 lg:min-h-0">
                <img className="h-full w-full object-cover" src={galleryImg4} alt={t('about.gallery.alt4')} />
              </div>
              <div className="min-h-56 overflow-hidden rounded-lg bg-gray-200 lg:min-h-0">
                <img className="h-full w-full object-cover" src={galleryImg5} alt={t('about.gallery.alt5')} />
              </div>
            </div>
            <div className="min-h-56 overflow-hidden rounded-lg bg-gray-200 md:min-h-72">
              <img className="h-full w-full object-cover" src={galleryImg6} alt={t('about.gallery.alt4')} />
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="my-12 grid grid-cols-2 gap-x-5 gap-y-8 md:my-10 md:gap-4 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <div
              key={stat.labelKey}
              className="min-w-0 px-2 md:min-h-36 md:rounded-lg md:border md:border-gray-200 md:bg-white md:p-6 md:shadow-sm"
            >
              <h3
                className={`mb-4 whitespace-nowrap font-normal leading-none tracking-tight text-[#2196f3] md:mb-3 md:text-4xl md:font-black md:text-red-600 ${
                  index === 3
                    ? 'text-[clamp(1.45rem,7vw,2.25rem)]'
                    : 'text-[clamp(2rem,10vw,2.75rem)]'
                }`}
              >
                {stat.prefix}
                {animatedStats[index].toLocaleString('en-US', {
                  useGrouping: false,
                  minimumFractionDigits: stat.decimals ?? 0,
                  maximumFractionDigits: stat.decimals ?? 0,
                })}
                {stat.suffix}
              </h3>
              <p className="text-sm leading-5 text-gray-600 md:text-base md:leading-6">
                {t(stat.labelKey)}
              </p>
            </div>
          ))}
        </div>

        {/* Reviews carousel */}
        <div className="my-12">
          {/* Tab bar */}
          <div className="flex gap-2 overflow-x-auto pb-3">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  className={`h-11 shrink-0 rounded-lg border px-4 text-sm font-bold transition ${
                    isActive
                      ? 'border-blue-600 bg-blue-600 text-white'
                      : 'border-gray-200 bg-white text-gray-700 hover:border-blue-600 hover:text-blue-600'
                  }`}
                  type="button"
                  onClick={() => handleTabChange(tab.id)}
                >
                  {tab.id === 'all' ? t(tab.label) : tab.label}{' '}
                  <span className={isActive ? 'text-white' : 'text-red-600'}>{tab.rating}</span>
                </button>
              );
            })}
          </div>

          {/* Cards + nav */}
          <div ref={containerRef} className="relative mt-3">
            {filteredReviews.length > 0 ? (
              <>
                {/* Review cards */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {visibleReviews.map((review) => (
                    <div
                      key={review.id}
                      className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm"
                    >
                      <div className="mb-3 tracking-[2px] text-amber-500">
                        {'★'.repeat(review.rating)}
                      </div>
                      <h4 className="mb-2 text-lg font-bold leading-snug text-gray-950">
                        {review.text.substring(0, 40)}...
                      </h4>
                      <p className="leading-6 text-gray-600">{review.text}</p>
                      <span className="mt-4 inline-block font-bold text-blue-600">
                        {t('about.reviews.readMore')}
                      </span>

                      <div className="mt-5 flex items-center gap-3">
                        <div className="grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-full bg-gray-800 font-black text-white">
                          {review.avatar ? (
                            <img
                              className="h-full w-full object-cover"
                              src={review.avatar}
                              alt={review.name}
                            />
                          ) : (
                            review.name.charAt(0)
                          )}
                        </div>
                        <div>
                          <h5 className="text-sm font-bold text-gray-950">{review.name}</h5>
                          <span className="text-xs text-gray-500">{review.date}</span>
                        </div>
                      </div>

                      <div className="mt-4">
                        <span
                          className={`inline-flex min-h-7 items-center rounded-md px-3 text-xs font-black text-white ${sourceBadgeClasses[review.platform]}`}
                        >
                          {review.platform.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination: dots + arrows */}
                {totalPages > 1 && (
                  <div className="mt-6 flex items-center justify-center gap-4">
                    {/* Prev arrow */}
                    <button
                      type="button"
                      aria-label="Предыдущая страница"
                      disabled={currentPage === 0}
                      onClick={() => goTo(currentPage - 1)}
                      className="grid h-9 w-9 place-items-center rounded-full border border-gray-300 bg-white text-gray-600 shadow-sm transition hover:border-blue-500 hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-30"
                    >
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path
                          d="M10 12L6 8l4-4"
                          stroke="currentColor"
                          strokeWidth="1.75"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>

                    {/* Dots */}
                    <div className="flex gap-2">
                      {Array.from({ length: totalPages }).map((_, i) => (
                        <button
                          key={i}
                          type="button"
                          aria-label={`Страница ${i + 1}`}
                          onClick={() => goTo(i)}
                          className={`h-2 rounded-full transition-all ${
                            i === currentPage
                              ? 'w-6 bg-blue-600'
                              : 'w-2 bg-gray-300 hover:bg-gray-400'
                          }`}
                        />
                      ))}
                    </div>

                    {/* Next arrow */}
                    <button
                      type="button"
                      aria-label="Следующая страница"
                      disabled={currentPage === totalPages - 1}
                      onClick={() => goTo(currentPage + 1)}
                      className="grid h-9 w-9 place-items-center rounded-full border border-gray-300 bg-white text-gray-600 shadow-sm transition hover:border-blue-500 hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-30"
                    >
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path
                          d="M6 4l4 4-4 4"
                          stroke="currentColor"
                          strokeWidth="1.75"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                )}
              </>
            ) : (
              <p className="col-span-full rounded-lg bg-white p-7 text-center text-gray-600">
                {t('about.reviews.empty')}
              </p>
            )}
          </div>
        </div>

        {/* Auctions section */}
        <section className="my-14 rounded bg-white px-6 py-8 md:px-10 md:py-10">
          <div className="grid items-center gap-8 md:grid-cols-[minmax(0,1fr)_220px] lg:grid-cols-[minmax(0,1fr)_260px]">
            <div>
              <h3 className="mb-4 text-base font-black leading-tight text-black">{t('about.auctions.title')}</h3>
              <p className="max-w-3xl text-sm leading-7 text-slate-700 md:text-base md:leading-8">
                {t('about.auctions.text')}
                <br />
                {t('about.auctions.textSecond')}
              </p>
            </div>

            <div className="relative mx-auto h-56 w-full max-w-[220px] overflow-hidden bg-slate-800 shadow-xl md:h-64 lg:max-w-[240px]">
              <div className="absolute left-5 top-5 text-sm font-bold text-sky-300">CarDeals</div>
              <div className="absolute inset-x-5 bottom-12 text-center text-xs font-semibold text-white">
                Weź udział w licytacjach za darmo!
              </div>
              <button
                className="absolute left-1/2 top-1/2 grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-sm border border-white/60 bg-white/10"
                type="button"
                aria-label="Play video"
              >
                <span className="ml-1 h-0 w-0 border-y-[8px] border-l-[12px] border-y-transparent border-l-white" />
              </button>
            </div>
          </div>
        </section>

        {/* Delivery cards */}
        <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {deliveryCards.map((card) => (
            <article
              key={card.titleKey}
              className="group overflow-hidden rounded-xl bg-white shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  src={card.image}
                  alt={t(card.titleKey)}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
              <div className="px-6 py-6">
                <h4 className="mb-3 text-base font-black leading-tight text-gray-950">{t(card.titleKey)}</h4>
                <p className="text-sm leading-relaxed text-slate-600">{t(card.textKey)}</p>
              </div>
            </article>
          ))}
        </section>
      </div>
    </section>
  );
}
