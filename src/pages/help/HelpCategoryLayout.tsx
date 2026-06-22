import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useI18n } from '../../shared/i18n/I18nProvider';

export type FaqItem = {
  question: string;
  answer: string;
};

type HelpCategoryLayoutProps = {
  activeIndex: number;
  title: string;
  faqs: FaqItem[];
  openIndex: number | null;
  setOpenIndex: (index: number | null) => void;
};

const mobileHelpSectionsConfig = [
  { key: 'support', titleKey: 'help.faq.support.title', itemCount: 5 },
  { key: 'delivery', titleKey: 'help.faq.delivery.title', itemCount: 7 },
  { key: 'formal', titleKey: 'help.faq.formal.title', itemCount: 5 },
  { key: 'payments', titleKey: 'help.faq.payments.title', itemCount: 5 },
  { key: 'deposit', titleKey: 'help.faq.deposit.title', itemCount: 5 },
] as const;

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

export default function HelpCategoryLayout({
  activeIndex,
  title,
  faqs,
  openIndex,
  setOpenIndex,
}: HelpCategoryLayoutProps) {
  const { t } = useI18n();
  const [mobileOpenFaq, setMobileOpenFaq] = useState<string | null>(null);
  
  const mainMenuConfig = [
    { labelKey: 'help.menu.purchaseProcess', icon: 'help', path: '/help' },
    { labelKey: 'help.menu.supportConsultation', icon: 'support', path: '/support' },
    { labelKey: 'help.menu.deliveryDocuments', icon: 'truck', path: '/delivery' },
    { labelKey: 'help.menu.formalRules', icon: 'info', path: '/formal' },
    { labelKey: 'help.menu.payments', icon: 'diamond', path: '/payments' },
    { labelKey: 'help.menu.deposit', icon: 'lock', path: '/deposit' },
  ];
  
  const mainMenu = mainMenuConfig.map((item) => ({
    ...item,
    label: t(item.labelKey),
  }));
  
  const firstLinksConfig = [
    'help.links.beforePurchase',
    'help.links.afterPurchase',
    'help.links.saleDocuments',
  ];
  
  const firstLinks = firstLinksConfig.map((key) => t(key));
  
  const secondLinksConfig = ['help.links.deliveryTimes', 'help.links.about'];
  
  const secondLinks = secondLinksConfig.map((key) => t(key));

  const mobileHelpSections = [
    {
      key: 'purchase',
      title: t('help.title'),
      faqs: [
        {
          question: t('help.faq.processQuestion'),
          answer: t('help.faq.processAnswer'),
        },
        {
          question: t('help.faq.biddingQuestion'),
          answer: t('help.faq.biddingAnswer'),
        },
        {
          question: t('help.faq.calculatorQuestion'),
          answer: t('help.faq.calculatorAnswer'),
        },
      ],
    },
    ...mobileHelpSectionsConfig.map((section) => ({
      key: section.key,
      title: t(section.titleKey),
      faqs: Array.from({ length: section.itemCount }, (_, index) => ({
        question: t(`help.faq.${section.key}.q${index + 1}`),
        answer: t(`help.faq.${section.key}.a${index + 1}`),
      })),
    })),
  ];

  return (
    <section className="min-h-screen bg-[#f4f5f7] py-4 text-[#0f2740] md:py-6">
      <div className="mx-auto grid w-[min(1160px,calc(100%-24px))] gap-10 md:w-[min(1160px,calc(100%-32px))] md:grid-cols-[280px_minmax(0,1fr)] md:gap-6">
        <aside className="space-y-4 md:space-y-6">
          <nav className="hidden overflow-hidden rounded border border-[#d9e0e7] bg-white md:block">
            {mainMenu.map((item, index) => (
              <Link
                key={item.label}
                to={item.path}
                className={`flex min-h-[74px] w-full items-center gap-3 border-b border-[#d9e0e7] px-4 text-left text-[13px] font-bold leading-4 text-[#0f2740] last:border-b-0 ${
                  index === activeIndex
                    ? 'border-l-2 border-l-[#1677d2] bg-white'
                    : 'hover:bg-slate-50'
                }`}
              >
                <span className="shrink-0 text-[#6d8aa8]">
                  <MenuIcon name={item.icon} />
                </span>
                {item.label}
              </Link>
            ))}
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
              return link === 'О нас' ? (
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

        <main className="min-w-0">
          <div className="space-y-9 md:hidden">
            {mobileHelpSections.map((section) => (
              <section key={section.key}>
                <h2 className="mb-3 text-[19px] font-medium text-[#0f2740]">{section.title}</h2>

                <div className="space-y-2">
                  {section.faqs.map((faq, index) => {
                    const faqKey = `${section.key}-${index}`;
                    const isOpen = mobileOpenFaq === faqKey;

                    return (
                      <article key={faqKey} className="bg-white">
                        <button
                          type="button"
                          onClick={() => setMobileOpenFaq(isOpen ? null : faqKey)}
                          aria-expanded={isOpen}
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
              </section>
            ))}
          </div>

          <div className="hidden md:block">
            <h1 className="mb-3 text-[19px] font-medium text-[#0f2740]">{title}</h1>

            <div className="space-y-2">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <article key={faq.question} className="bg-white">
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    aria-expanded={isOpen}
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
          </div>
        </main>
      </div>
    </section>
  );
}
