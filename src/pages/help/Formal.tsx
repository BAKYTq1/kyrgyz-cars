import { useState } from 'react';

import HelpCategoryLayout, { type FaqItem } from './HelpCategoryLayout';

const formalFaqs: FaqItem[] = [
  {
    question: 'What rules do I need to accept before bidding?',
    answer:
      'Before bidding, you need to register, accept platform terms, place the required deposit, and agree to pay for any vehicle you win.',
  },
  {
    question: 'Is signing a separate contract required?',
    answer:
      'In most cases, accepting the platform terms during registration is enough. Additional documents may be requested for company purchases or specific transactions.',
  },
  {
    question: 'Who is responsible for checking vehicle condition?',
    answer:
      'Auction vehicles are sold according to auction information and photos. The buyer should review all available data before placing a bid.',
  },
  {
    question: 'Can the seller reject my winning bid?',
    answer:
      'Some lots require seller approval. The seller can accept, reject, or counter the offer after the auction.',
  },
  {
    question: 'What happens if payment is late?',
    answer:
      'Late payment may cause penalties, storage fees, cancellation, or account restrictions depending on auction and platform rules.',
  },
];

export default function Formal() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <HelpCategoryLayout
      activeIndex={3}
      title="Formal Aspects and Rules"
      faqs={formalFaqs}
      openIndex={openIndex}
      setOpenIndex={setOpenIndex}
    />
  );
}
