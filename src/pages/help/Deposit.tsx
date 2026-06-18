import { useState } from 'react';
import { useI18n } from '../../shared/i18n/I18nProvider';
import HelpCategoryLayout, { type FaqItem } from './HelpCategoryLayout';

export default function Deposit() {
  const { t } = useI18n();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  
  const depositFaqs: FaqItem[] = [
    {
      question: t('help.faq.deposit.q1'),
      answer: t('help.faq.deposit.a1'),
    },
    {
      question: t('help.faq.deposit.q2'),
      answer: t('help.faq.deposit.a2'),
    },
    {
      question: t('help.faq.deposit.q3'),
      answer: t('help.faq.deposit.a3'),
    },
    {
      question: t('help.faq.deposit.q4'),
      answer: t('help.faq.deposit.a4'),
    },
    {
      question: t('help.faq.deposit.q5'),
      answer: t('help.faq.deposit.a5'),
    },
  ];

  return (
    <HelpCategoryLayout
      activeIndex={5}
      title={t('help.faq.deposit.title')}
      faqs={depositFaqs}
      openIndex={openIndex}
      setOpenIndex={setOpenIndex}
    />
  );
}
