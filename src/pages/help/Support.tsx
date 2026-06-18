import { useState } from 'react';
import { useI18n } from '../../shared/i18n/I18nProvider';
import HelpCategoryLayout, { type FaqItem } from './HelpCategoryLayout';

export default function Support() {
  const { t } = useI18n();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  
  const supportFaqs: FaqItem[] = [
    {
      question: t('help.faq.support.q1'),
      answer: t('help.faq.support.a1'),
    },
    {
      question: t('help.faq.support.q2'),
      answer: t('help.faq.support.a2'),
    },
    {
      question: t('help.faq.support.q3'),
      answer: t('help.faq.support.a3'),
    },
    {
      question: t('help.faq.support.q4'),
      answer: t('help.faq.support.a4'),
    },
    {
      question: t('help.faq.support.q5'),
      answer: t('help.faq.support.a5'),
    },
  ];

  return (
    <HelpCategoryLayout
      activeIndex={1}
      title={t('help.faq.support.title')}
      faqs={supportFaqs}
      openIndex={openIndex}
      setOpenIndex={setOpenIndex}
    />
  );
}
