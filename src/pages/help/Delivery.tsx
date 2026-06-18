import { useState } from 'react';
import { useI18n } from '../../shared/i18n/I18nProvider';
import HelpCategoryLayout, { type FaqItem } from './HelpCategoryLayout';

export default function Delivery() {
  const { t } = useI18n();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  
  const deliveryFaqs: FaqItem[] = [
    {
      question: t('help.faq.delivery.q1'),
      answer: t('help.faq.delivery.a1'),
    },
    {
      question: t('help.faq.delivery.q2'),
      answer: t('help.faq.delivery.a2'),
    },
    {
      question: t('help.faq.delivery.q3'),
      answer: t('help.faq.delivery.a3'),
    },
    {
      question: t('help.faq.delivery.q4'),
      answer: t('help.faq.delivery.a4'),
    },
    {
      question: t('help.faq.delivery.q5'),
      answer: t('help.faq.delivery.a5'),
    },
    {
      question: t('help.faq.delivery.q6'),
      answer: t('help.faq.delivery.a6'),
    },
    {
      question: t('help.faq.delivery.q7'),
      answer: t('help.faq.delivery.a7'),
    },
  ];

  return (
    <HelpCategoryLayout
      activeIndex={2}
      title={t('help.faq.delivery.title')}
      faqs={deliveryFaqs}
      openIndex={openIndex}
      setOpenIndex={setOpenIndex}
    />
  );
}
