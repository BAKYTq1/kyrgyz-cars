import { useState } from 'react';

import HelpCategoryLayout, { type FaqItem } from './HelpCategoryLayout';

const depositFaqs: FaqItem[] = [
  {
    question: 'Why is a deposit required?',
    answer:
      'The deposit confirms serious bidding intent and unlocks the ability to place bids. It also protects the platform against unpaid winning bids.',
  },
  {
    question: 'Is the deposit refundable?',
    answer:
      'Yes, the deposit is refundable if there are no unpaid winning bids, active transactions, or unresolved obligations on the account.',
  },
  {
    question: 'How much deposit do I need?',
    answer:
      'The required deposit depends on the maximum bid amount. A higher bid limit usually requires a higher deposit.',
  },
  {
    question: 'Can I use one deposit for several bids?',
    answer:
      'You can place bids according to your available deposit limit, but every won auction creates a purchase obligation.',
  },
  {
    question: 'How do I request a deposit return?',
    answer:
      'Contact support from your account and request a refund. The team will check whether the account has no active obligations.',
  },
];

export default function Deposit() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <HelpCategoryLayout
      activeIndex={5}
      title="Deposit"
      faqs={depositFaqs}
      openIndex={openIndex}
      setOpenIndex={setOpenIndex}
    />
  );
}
