import { useState } from 'react';
import { Link } from 'react-router-dom';

type MenuItem = {
  label: string;
  icon: string;
  path?: string;
};

type FaqItem = {
  question: string;
  answer: string;
};

const mainMenu: MenuItem[] = [
  { label: 'Процесс покупки', icon: 'help', path: '/help' },
  { label: 'Поддержка и консультация', icon: 'support', path: '/support' },
  { label: 'Доставка, транспортировка и документы', icon: 'truck', path: '/delivery' },
  { label: 'Формальные аспекты и правила', icon: 'info', path: '/formal' },
  { label: 'Платежи и связанные вопросы', icon: 'diamond', path: '/payments' },
  { label: 'Депозит', icon: 'lock', path: '/deposit' },
];

const firstLinks = [
  'Шаг за шагом - до покупки',
  'Шаг за шагом - после покупки',
  'Документы продажи',
];

const secondLinks = ['Сроки доставки', 'О нас', 'Blog'];

const purchaseFaqs: FaqItem[] = [
  {
    question: 'Сложен ли процесс покупки и импорта автомобилей через BidCars?',
    answer:
      'Процесс покупки автомобилей через платформу BidCars отличается простотой и прозрачностью. Ключевым моментом является наличие базовых навыков навигации по сайту, включая такие задачи, как размещение ставок на аукционе, внесение залога и осуществление международных переводов в долларах США (USD) и евро (EUR) через собственный банк. Мы берем на себя все формальности для клиента: от связи с аукционным домом, оформления документов, организации транспортировки в США, погрузки и разгрузки контейнеров до таможенного оформления и доставки автомобиля по указанному адресу.',
  },
  {
    question: 'Do I personally participate in live bidding when using your service, or does BidCars bid on my behalf?',
    answer:
      'При использовании нашего сервиса процесс торгов несколько отличается от традиционных онлайн-аукционов. Как пользователь, вы не делаете ставки в режиме реального времени лично. Вместо этого вы делегируете ставки на нашем сайте, указывая максимальную сумму, которую вы готовы предложить, на странице выбранного автомобиля. Эта сумма является конфиденциальной, видимой только нам в BidCars и не разглашается до начала онлайн-аукциона в аукционном доме.Если указанная вами сумма превышает начальную ставку онлайн-аукциона (т.е., превышает конечную ставку предварительного аукциона), то мы представим ваши интересы в пределах указанной вами максимальной суммы во время онлайн-аукциона. Однако важно помнить, что из-за технических ограничений пользователи не могут напрямую участвовать в торгах во время онлайн-аукциона. Вы можете указать только максимальную сумму, которую хотите предложить за конкретный автомобиль. Стоит отметить, что существует возможность увеличить эту сумму за 10 минут до начала финального онлайн-аукциона.Наш опыт показывает, что такой способ покупки автомобиля, как правило, более обдуман, поскольку исключает эмоциональный фактор, часто влияющий на ход торгов. Покупка, совершённая без эмоционального подтекста, обычно оказывается более успешной и приносящей больше удовлетворения.',
  },
  {
    question: 'Is the fee calculator available on the BidCars website accurate?',
    answer:
      'The calculator gives an estimated import cost based on available auction and logistics data. The final cost can change because of exchange rates, bank fees, storage, late payment penalties, or document-related fees.',
  },
  {
    question: 'Are all vehicles from IAAI and Copart displayed on BidCars website?',
    answer:
      'Most vehicles with scheduled auction dates are displayed. Some lots can be unavailable because of seller restrictions, missing sale dates, or technical limitations from the auction provider.',
  },
  {
    question: 'How to bid for a vehicle on BidCars?',
    answer:
      'Create an account, add a refundable deposit, open the vehicle page, enter your maximum bid, and confirm it before the auction starts.',
  },
  {
    question: 'Preliminary phase, live auction',
    answer:
      'The preliminary phase collects early bids before the final auction. In the live auction, bids are placed in real time until the vehicle is sold or your maximum bid is reached.',
  },
  {
    question: 'What to do after winning the auction?',
    answer:
      'After winning, you will receive payment details and next steps. Pay within the required deadline so the vehicle can be released and prepared for transport.',
  },
  {
    question: 'How to pay for the auctioned vehicle?',
    answer:
      'Payment is usually made by international bank transfer in USD. The exact amount, bank details, and transfer title are sent after the auction is won.',
  },
  {
    question: 'What is the BidCars commission?',
    answer:
      'BidCars charges a fixed service commission. It is shown separately from the auction price and logistics costs.',
  },
  {
    question: 'What is the price of the selected vehicle?',
    answer:
      'The final auction price is known only after bidding ends. You can use previous sales and market estimates to plan your maximum bid.',
  },
  {
    question: 'Offer for acceptance by the seller.',
    answer:
      'Some auctions require seller approval after the highest bid. In that case, the seller can accept, reject, or counter the offer.',
  },
  {
    question: 'Is signing a contract required before participating in an auction?',
    answer:
      'Registration and acceptance of platform terms are usually enough to participate. Additional documents may be requested for specific transactions.',
  },
  {
    question: 'What are the options for corporate purchasing if there is no corporate account on the BidCars platform?',
    answer:
      'A company can contact support to prepare the correct billing and registration details before placing bids.',
  },
  {
    question: 'Is it possible to simultaneously bid on two or more vehicles - until the first one is won?',
    answer:
      'Yes, but every winning bid creates an obligation to purchase. Bid carefully if you are bidding on multiple vehicles at the same time.',
  },
  {
    question: 'How does one proceed in the situation where multiple people, through BidCars, attend the auction of the same vehicle?',
    answer:
      'The platform accepts bids from different users independently. The highest valid bid represented during the live auction has priority.',
  },
];

function MenuIcon({ name }: { name: string }) {
  const common = {
    stroke: 'currentColor',
    strokeWidth: 1.6,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };

  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      {name === 'help' && (
        <>
          <circle cx="12" cy="12" r="9" {...common} />
          <path d="M9.8 9a2.4 2.4 0 0 1 4.6 1c0 1.8-2.4 2-2.4 3.6" {...common} />
          <path d="M12 17h.01" {...common} />
        </>
      )}
      {name === 'support' && (
        <>
          <path d="M5 13a7 7 0 0 1 14 0v4a2 2 0 0 1-2 2h-2" {...common} />
          <path d="M5 13h3v5H6a1 1 0 0 1-1-1zM19 13h-3v5h2a1 1 0 0 0 1-1z" {...common} />
        </>
      )}
      {name === 'truck' && (
        <>
          <path d="M3 7h11v9H3zM14 10h4l3 3v3h-7z" {...common} />
          <path d="M7 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM17 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" {...common} />
        </>
      )}
      {name === 'info' && (
        <>
          <circle cx="12" cy="12" r="9" {...common} />
          <path d="M12 11v5M12 8h.01" {...common} />
        </>
      )}
      {name === 'diamond' && <path d="M12 3 21 9l-9 12L3 9zM3 9h18" {...common} />}
      {name === 'lock' && (
        <>
          <path d="M7 11h10v9H7zM9 11V8a3 3 0 0 1 6 0v3" {...common} />
        </>
      )}
      {name === 'external' && <path d="M8 8h8v8M16 8l-8 8M6 5h13v13" {...common} />}
    </svg>
  );
}

export default function Help() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="min-h-screen bg-[#f4f5f7] py-6 text-[#0f2740]">
      <div className="mx-auto grid w-[min(1160px,calc(100%-32px))] gap-6 md:grid-cols-[280px_minmax(0,1fr)]">
        <aside className="space-y-6">
          <nav className="overflow-hidden rounded border border-[#d9e0e7] bg-white">
            {mainMenu.map((item, index) => {
              const className = `flex min-h-[60px] w-full items-center gap-3 border-b border-[#d9e0e7] px-4 text-left text-[13px] font-bold leading-4 text-[#0f2740] last:border-b-0 ${
                index === 0 ? 'border-l-2 border-l-[#1677d2] bg-white' : 'hover:bg-slate-50'
              }`;
              const content = (
                <>
                  <span className="shrink-0 text-[#6d8aa8]">
                    <MenuIcon name={item.icon} />
                  </span>
                  {item.label}
                </>
              );

              return item.path ? (
                <Link key={item.label} to={item.path} className={className}>
                  {content}
                </Link>
              ) : (
                <button key={item.label} type="button" className={className}>
                  {content}
                </button>
              );
            })}
            <button
              type="button"
              onClick={() => setOpenIndex(null)}
              className="block w-full px-4 pb-2 text-right text-[11px] font-medium text-[#1677d2]"
            >
              Показать все
            </button>
          </nav>

          <nav className="overflow-hidden rounded border border-[#d9e0e7] bg-white">
            {firstLinks.map((link) => (
              <button
                key={link}
                type="button"
                className="flex min-h-[56px] w-full items-center justify-between border-b border-[#d9e0e7] px-4 text-left text-[13px] font-bold last:border-b-0 hover:bg-slate-50"
              >
                {link}
                <span className="text-[#7e99b4]">
                  <MenuIcon name="external" />
                </span>
              </button>
            ))}
          </nav>

          <nav className="overflow-hidden rounded border border-[#d9e0e7] bg-white">
            {secondLinks.map((link) => {
              const className = "flex min-h-[56px] w-full items-center justify-between border-b border-[#d9e0e7] px-4 text-left text-[13px] font-bold last:border-b-0 hover:bg-slate-50";
              const content = (
                <>
                  {link}
                  <span className="text-[#7e99b4]">
                    <MenuIcon name="external" />
                  </span>
                </>
              );
              return link === '\u041e \u043d\u0430\u0441' ? (
                <Link key={link} to="/about" className={className}>
                  {content}
                </Link>
              ) : (
                <button key={link} type="button" className={className}>
                  {content}
                </button>
              );
            })}
          </nav>
        </aside>

        <main>
          <h1 className="mb-3 text-[19px] font-medium text-[#0f2740]">Purchase Process</h1>

          <div className="space-y-2">
            {purchaseFaqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <article key={faq.question} className="bg-white">
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="flex min-h-[48px] w-full items-center justify-between gap-4 px-5 text-left text-[13px] font-medium leading-5 text-[#0f2740] hover:bg-[#fbfcfe]"
                  >
                    <span>{faq.question}</span>
                    <span className="shrink-0 text-lg leading-none text-[#7e99b4]">
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="border-t border-[#eef1f4] px-5 pb-5 pt-3 text-[13px] leading-6 text-[#58718c]">
                      {faq.answer}
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </main>
      </div>
    </section>
  );
}
