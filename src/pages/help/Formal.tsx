import { useState } from 'react';
import { useI18n } from '../../shared/i18n/I18nProvider';
import HelpCategoryLayout, { type FaqItem } from './HelpCategoryLayout';

export default function Formal() {
  const { t } = useI18n();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  
  const formalFaqs: FaqItem[] = [
    {
      question: t('help.faq.formal.q1'),
      answer: t('help.faq.formal.a1'),
    },
    {
      question: t('help.faq.formal.q2'),
      answer: t('help.faq.formal.a2'),
    },
    {
      question: t('help.faq.formal.q3'),
      answer: t('help.faq.formal.a3'),
    },
    {
      question: t('help.faq.formal.q4'),
      answer: t('help.faq.formal.a4'),
    },
    {
      question: t('help.faq.formal.q5'),
      answer: t('help.faq.formal.a5'),
    },
  ];

  return (
    <HelpCategoryLayout
      activeIndex={3}
      title={t('help.faq.formal.title')}
      faqs={formalFaqs}
      openIndex={openIndex}
      setOpenIndex={setOpenIndex}
    />
  );
}
