import { useState } from 'react';
import { useI18n } from '../../shared/i18n/I18nProvider';
import HelpCategoryLayout, { type FaqItem } from './HelpCategoryLayout';

export default function Payments() {
  const { t } = useI18n();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  
  const paymentFaqs: FaqItem[] = [
    {
      question: t('help.faq.payments.q1'),
      answer: t('help.faq.payments.a1'),
    },
    {
      question: t('help.faq.payments.q2'),
      answer: t('help.faq.payments.a2'),
    },
    {
      question: t('help.faq.payments.q3'),
      answer: t('help.faq.payments.a3'),
    },
    {
      question: t('help.faq.payments.q4'),
      answer: t('help.faq.payments.a4'),
    },
    {
      question: t('help.faq.payments.q5'),
      answer: t('help.faq.payments.a5'),
    },
  ];

  return (
    <HelpCategoryLayout
      activeIndex={4}
      title={t('help.faq.payments.title')}
      faqs={paymentFaqs}
      openIndex={openIndex}
      setOpenIndex={setOpenIndex}
    />
  );
}
