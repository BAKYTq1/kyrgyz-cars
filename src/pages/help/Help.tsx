import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useI18n } from '../../shared/i18n/I18nProvider';

type MenuItem = {
  labelKey?: string;
  label?: string;
  icon: string;
  path?: string;
};

const mainMenuConfig: MenuItem[] = [
  { labelKey: 'help.menu.purchaseProcess', icon: 'help', path: '/help' },
  { labelKey: 'help.menu.supportConsultation', icon: 'support', path: '/support' },
  { labelKey: 'help.menu.deliveryDocuments', icon: 'truck', path: '/delivery' },
  { labelKey: 'help.menu.formalRules', icon: 'info', path: '/formal' },
  { labelKey: 'help.menu.payments', icon: 'diamond', path: '/payments' },
  { labelKey: 'help.menu.deposit', icon: 'lock', path: '/deposit' },
];

const firstLinksConfig = [
  'help.links.beforePurchase',
  'help.links.afterPurchase',
  'help.links.saleDocuments',
];

const secondLinksConfig = ['help.links.deliveryTimes', 'help.links.about', 'help.links.blog'];

const purchaseFaqsConfig = [
  {
    questionKey: 'help.faq.processQuestion',
    answerKey: 'help.faq.processAnswer',
  },
  {
    questionKey: 'help.faq.biddingQuestion',
    answerKey: 'help.faq.biddingAnswer',
  },
  {
    questionKey: 'help.faq.calculatorQuestion',
    answerKey: 'help.faq.calculatorAnswer',
  },
];

// FAQ data will be populated dynamically from i18n

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
  const { t } = useI18n();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  
  const mainMenu: MenuItem[] = mainMenuConfig.map((item) => ({
    ...item,
    label: t(item.labelKey || ''),
  }));
  
  const firstLinks = firstLinksConfig.map((key) => t(key));
  
  const secondLinks = secondLinksConfig.map((key) => t(key));
  
  const purchaseFaqsData = purchaseFaqsConfig.map((item) => ({
    ...item,
    question: t(item.questionKey),
    answer: t(item.answerKey),
  }));

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
              {t('help.showAll')}
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
          <h1 className="mb-3 text-[19px] font-medium text-[#0f2740]">{t('help.title')}</h1>

          <div className="space-y-2">
            {purchaseFaqsData.map((faq, index) => {
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
