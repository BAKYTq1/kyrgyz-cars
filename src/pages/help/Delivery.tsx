import { useState } from 'react';

import HelpCategoryLayout, { type FaqItem } from './HelpCategoryLayout';

const deliveryFaqs: FaqItem[] = [
  {
    question: 'How much does it cost to import a vehicle?',
    answer:
      'The total import cost depends on the auction price, auction fees, inland transport in the USA, ocean shipping, customs clearance, taxes, port handling, and delivery to the final address.',
  },
  {
    question: 'Do you offer home delivery?',
    answer:
      'Yes. After the vehicle reaches Europe and customs procedures are completed, BidCars can organize delivery to the address selected by the client.',
  },
  {
    question: 'To which ports do you ship vehicles?',
    answer:
      'Vehicles are usually shipped to major European ports used by BidCars logistics partners. The destination port depends on country, route availability, and the best current transport option.',
  },
  {
    question: 'When will I receive the vehicle documents?',
    answer:
      'Documents are prepared and transferred after the auction house releases them and all required payments are completed.',
  },
  {
    question: 'Where can I check the vehicle status?',
    answer:
      'The vehicle status can be checked in your BidCars account. Important updates are also sent by the support team.',
  },
  {
    question: 'Can I request additional inspections or photos of the vehicle at the port terminal?',
    answer:
      'Additional photos or inspection requests may be possible depending on the terminal and vehicle location.',
  },
  {
    question: 'Is it possible to use your export services for vehicles that were not purchased directly through BidCars?',
    answer:
      'In selected cases, BidCars can help with export or logistics for vehicles purchased outside the platform.',
  },
];

export default function Delivery() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <HelpCategoryLayout
      activeIndex={2}
      title="Delivery, Shipping, and Documents"
      faqs={deliveryFaqs}
      openIndex={openIndex}
      setOpenIndex={setOpenIndex}
    />
  );
}
