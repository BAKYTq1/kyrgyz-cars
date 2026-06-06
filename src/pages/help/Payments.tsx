import { useState } from 'react';

import HelpCategoryLayout, { type FaqItem } from './HelpCategoryLayout';

const paymentFaqs: FaqItem[] = [
  {
    question: 'How do I pay for a won vehicle?',
    answer:
      'After winning, you receive payment instructions with the amount, bank details, and transfer title. Payment is usually made by international bank transfer.',
  },
  {
    question: 'Which currency is used for payment?',
    answer:
      'Auction vehicle payment is usually made in USD. Logistics, service fees, and European costs may be calculated separately in EUR.',
  },
  {
    question: 'Are bank transfer fees included?',
    answer:
      'Bank transfer fees are usually charged by the client bank and are not included in the auction invoice.',
  },
  {
    question: 'Can I pay by card?',
    answer:
      'Vehicle payment normally requires bank transfer. Some smaller platform-related payments may depend on available payment methods.',
  },
  {
    question: 'When do I pay the BidCars commission?',
    answer:
      'The BidCars commission is paid separately according to the instructions provided after the vehicle is purchased.',
  },
];

export default function Payments() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <HelpCategoryLayout
      activeIndex={4}
      title="Payments and Related Questions"
      faqs={paymentFaqs}
      openIndex={openIndex}
      setOpenIndex={setOpenIndex}
    />
  );
}
