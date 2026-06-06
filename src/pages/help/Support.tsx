import { useState } from 'react';

import HelpCategoryLayout, { type FaqItem } from './HelpCategoryLayout';

const supportFaqs: FaqItem[] = [
  {
    question: 'How can I contact BidCars support?',
    answer:
      'You can contact support through online chat, email, or phone. Our team helps with platform use, bidding questions, payments, documents, and delivery updates.',
  },
  {
    question: 'Can BidCars help me choose a vehicle?',
    answer:
      'BidCars provides tools, vehicle data, and consultation, but the final purchase decision, budget, and risk assessment remain with the client.',
  },
  {
    question: 'Can I get additional information about a vehicle?',
    answer:
      'Available vehicle data is shown on the lot page. If reports or additional photos are available, support can help you find them before bidding.',
  },
  {
    question: 'Do you inspect vehicles before the auction?',
    answer:
      'Physical inspection depends on location and availability. Many auction vehicles are sold as-is, so photos, history reports, and auction descriptions should be reviewed carefully.',
  },
  {
    question: 'Can support cancel my bid?',
    answer:
      'Bid cancellation depends on auction status and timing. Contact support as quickly as possible, because live auction bids may become binding.',
  },
];

export default function Support() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <HelpCategoryLayout
      activeIndex={1}
      title="Support and Consultation"
      faqs={supportFaqs}
      openIndex={openIndex}
      setOpenIndex={setOpenIndex}
    />
  );
}
