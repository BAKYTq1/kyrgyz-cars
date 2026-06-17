import { useEffect, useRef, useState, useCallback } from 'react';
import { useI18n } from '../../shared/i18n/I18nProvider';

import teamImg1 from '../../assets/about1.jpg';
import teamImg2 from '../../assets/about3.jpg';
import teamImg3 from '../../assets/about-us-7.jpg';

type ReviewPlatform = 'google' | 'facebook' | 'trustpilot' | 'opinie';
type ActiveTab = ReviewPlatform | 'all';

type Review = {
  id: number;
  platform: ReviewPlatform;
  rating: number;
  text: string;
  name: string;
  date: string;
  avatar: string;
};

const contactCardsConfig = [
  {
    step: '1',
    icon: 'chat',
    titleKey: 'contact.cards.chat.title',
    textKey: 'contact.cards.chat.text',
    metaKey: 'contact.cards.chat.meta',
    actionKey: 'contact.cards.chat.action',
    accent: 'blue',
  },
  {
    step: '2',
    icon: 'phone',
    titleKey: 'contact.cards.phone.title',
    textKey: 'contact.cards.phone.text',
    metaKey: 'contact.cards.phone.meta',
    actionKey: 'contact.cards.phone.action',
    accent: 'emerald',
  },
  {
    step: '3',
    icon: 'mail',
    titleKey: 'contact.cards.message.title',
    textKey: 'contact.cards.message.text',
    metaKey: 'contact.cards.message.meta',
    actionKey: 'contact.cards.message.action',
    accent: 'orange',
  },
];

const reviewsData: Review[] = [
  {
    id: 1,
    platform: 'google',
    rating: 5,
    text: 'Fantastic auto USA firm. BidCars team helped me with every step.',
    name: 'Yaroslav Waliszewski',
    date: '2 месяца назад',
    avatar: teamImg1,
  },
  {
    id: 2,
    platform: 'google',
    rating: 5,
    text: 'I would like to thank you for your outstanding professionalism.',
    name: 'Patryk Ivan',
    date: '2 месяца назад',
    avatar: teamImg2,
  },
  {
    id: 3,
    platform: 'opinie',
    rating: 5,
    text: 'Polcamserdecznie. Profesjonalna obsluga i bardzo dobry kontakt.',
    name: 'GrzegorzBlak',
    date: '3 месяца назад',
    avatar: teamImg3,
  },
  {
    id: 4,
    platform: 'facebook',
    rating: 5,
    text: 'Ogromnie jestem bardzo zadowolony. Wszystko zgodnie z planem.',
    name: 'Łukasz Jumel',
    date: '3 месяца назад',
    avatar: teamImg1,
  },
  {
    id: 5,
    platform: 'trustpilot',
    rating: 5,
    text: 'Very clear process, fast answers and reliable delivery.',
    name: 'Marcin K.',
    date: '4 месяца назад',
    avatar: teamImg2,
  },
  {
    id: 6,
    platform: 'google',
    rating: 5,
    text: 'The team explained every detail before bidding and shipping.',
    name: 'Anna Nowak',
    date: '4 месяца назад',
    avatar: teamImg3,
  },
];

const tabs: { id: ActiveTab; label: string; rating: string }[] = [
  { id: 'all', label: 'Все отзывы', rating: '4.9' },
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

const teamMembers = [
  {
    name: 'Patryk Szweicki',
    roleKey: 'contact.team.roles.leadCustomerManager',
    image: teamImg1,
  },
  {
    name: 'Bartosz',
    roleKey: 'contact.team.roles.carPurchaseSpecialist',
    image: teamImg2,
  },
  {
    name: 'Adrian',
    roleKey: 'contact.team.roles.carLogisticsSpecialist',
    image: teamImg3,
  },
  {
    name: 'Grażyna',
    roleKey: 'contact.team.roles.customerServiceSpecialist',
    image: teamImg1,
  },
];

const iconPaths = {
  chat: (
    <path
      d="M5 6.5A3.5 3.5 0 0 1 8.5 3h7A3.5 3.5 0 0 1 19 6.5v4A3.5 3.5 0 0 1 15.5 14H12l-4.5 3v-3A3.5 3.5 0 0 1 5 10.5z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  phone: (
    <path
      d="M7.2 4.5 9 8.2l-1.7 1.2a11 11 0 0 0 5.3 5.3L13.8 13l3.7 1.8v2.7c0 .8-.7 1.5-1.5 1.5A13 13 0 0 1 3 6c0-.8.7-1.5 1.5-1.5z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  mail: (
    <path
      d="M4 6h16v12H4z M4 7l8 6 8-6"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
};

export default function Contact() {
  const { t } = useI18n();
  const [activeTab, setActiveTab] = useState<ActiveTab>('all');
  const [currentPage, setCurrentPage] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const perPage = useCardsPerPage(containerRef);
  
  const contactCards = contactCardsConfig.map((card) => ({
    ...card,
    title: t(card.titleKey),
    text: t(card.textKey),
    meta: t(card.metaKey),
    action: t(card.actionKey),
  }));

  const handleTabChange = useCallback((tab: ActiveTab) => {
    setActiveTab(tab);
    setCurrentPage(0);
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
    <section className="bg-gray-50 text-gray-950">
      <div className="mx-auto w-[min(1110px,calc(100%-28px))] py-8 md:py-10">
        <div className="text-center">
          <h1 className="text-2xl font-black md:text-3xl">{t('contact.title')}</h1>
          <p className="mx-auto mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {contactCards.map((card) => (
            <article
              key={card.title}
              className="relative min-h-52 rounded-lg border border-blue-200 bg-white p-5 shadow-sm"
            >
              <span className="absolute -left-2 -top-2 grid h-7 w-7 place-items-center rounded-full bg-blue-600 text-xs font-black text-white">
                {card.step}
              </span>
              <div className="flex items-start justify-between gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-md bg-blue-600 text-white">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    {iconPaths[card.icon as keyof typeof iconPaths]}
                  </svg>
                </div>
                <span
                  className={`rounded-full border px-3 py-1 text-[11px] font-bold ${
                    card.accent === 'emerald'
                      ? 'border-emerald-300 bg-emerald-50 text-emerald-700'
                      : card.accent === 'orange'
                        ? 'border-orange-300 bg-orange-50 text-orange-700'
                        : 'border-blue-300 bg-blue-50 text-blue-700'
                  }`}
                >
                  {t('contact.onlineBadge')}
                </span>
              </div>
              <h2 className="mt-5 text-lg font-black">{card.title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">{card.text}</p>
              <p className="mt-2 text-xs font-semibold text-slate-500">{card.meta}</p>
              <button className="mt-5 text-sm font-black text-blue-600" type="button">
                {card.action}
              </button>
            </article>
          ))}
        </div>

        <p className="mx-auto mt-5 max-w-3xl text-center text-xs leading-5 text-slate-500">
          {t('contact.supportNote')}
        </p>
      </div>

      <div className="border-y border-gray-200 bg-white py-10 md:py-12">
        <div className="mx-auto w-[min(1110px,calc(100%-28px))]">
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
                  {t(`contact.reviews.all`)}{' '}
                  <span className={isActive ? 'text-white' : 'text-red-600'}>{tab.rating}</span>
                </button>
              );
            })}
          </div>

          <div ref={containerRef} className="relative mt-3">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {visibleReviews.map((review) => (
                <article
                  key={review.id}
                  className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm"
                >
                  <div className="mb-3 tracking-[2px] text-amber-500">
                    {'★'.repeat(review.rating)}
                  </div>
                  <h3 className="mb-2 min-h-12 text-base font-bold leading-snug text-gray-950">
                    {review.text}
                  </h3>
                  <div className="mt-5 flex items-center gap-3">
                    <img
                      className="h-11 w-11 rounded-full object-cover"
                      src={review.avatar}
                      alt={review.name}
                    />
                    <div>
                      <p className="text-sm font-bold text-gray-950">{review.name}</p>
                      <p className="text-xs text-gray-500">{review.date}</p>
                    </div>
                  </div>

                  <span
                    className={`mt-4 inline-flex min-h-7 items-center rounded-md px-3 text-xs font-black text-white ${sourceBadgeClasses[review.platform]}`}
                  >
                    {review.platform.toUpperCase()}
                  </span>
                </article>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="mt-6 flex items-center justify-center gap-4">
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

                <div className="flex gap-2">
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      aria-label={`Страница ${i + 1}`}
                      onClick={() => goTo(i)}
                      className={`h-2 rounded-full transition-all ${
                        i === currentPage ? 'w-6 bg-blue-600' : 'w-2 bg-gray-300 hover:bg-gray-400'
                      }`}
                    />
                  ))}
                </div>

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
          </div>
        </div>
      </div>

      <div className="mx-auto w-[min(1110px,calc(100%-28px))] py-10 md:py-12">
        <div className="border-t border-gray-300 pt-8">
          <div className="grid gap-6 md:grid-cols-[1fr_320px] md:items-start">
            <div>
              <h2 className="text-xl font-black">{t('contact.location.title')}</h2>
              <p className="mt-3 max-w-xl text-sm leading-6 text-slate-600">
                {t('contact.location.text')}
              </p>
            </div>

            <div className="flex gap-4 rounded-lg bg-white p-4 shadow-sm">
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-md bg-blue-600 text-white">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 21s7-5.3 7-11a7 7 0 1 0-14 0c0 5.7 7 11 7 11z"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  />
                  <circle cx="12" cy="10" r="2.4" stroke="currentColor" strokeWidth="1.8" />
                </svg>
              </div>
              <div className="text-sm">
                <p className="font-black">BidCars</p>
                <p className="mt-2 leading-6 text-slate-600">
                  Wierzbowa 28/46, 45-045 Poznan, Poland
                  <br />
                  VAT-EU: NIP PL6040053012
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
            <iframe
              title="BidCars map"
              className="h-[320px] w-full md:h-[390px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps?q=Wierzbowa%2028%2F46%2C%2045-045%20Poznan%2C%20Poland&output=embed"
            />
          </div>
        </div>

        <section className="mt-12">
          <h2 className="text-xl font-black">{t('contact.team.title')}</h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
            {t('contact.team.text')}
          </p>

          <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {teamMembers.map((member) => (
              <article key={member.name} className="rounded-lg bg-white p-4 shadow-sm">
                <img
                  className="h-48 w-full rounded-md object-cover object-center"
                  src={member.image}
                  alt={member.name}
                />
                <h3 className="mt-4 text-sm font-black">{member.name}</h3>
                <p className="mt-2 text-xs leading-5 text-slate-500">{t(member.roleKey)}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}
