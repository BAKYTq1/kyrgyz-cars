import { useState } from "react";

const steps = [
  {
    id: 1,
    title: "Ставка на автомобиль принята",
    payment: false,
    content: {
      description:
        'После выигрыша автомобиля и входа в личный кабинет BidCars статус аукциона меняется на "Автомобиль выигран". Это означает, что ставка была принята — самое время открыть бутылку шампанского!',
      image:
        "https://images.unsplash.com/photo-1619551734325-81aaf323686c?w=600&q=80",
      imageCaption: '2015 Audi S3 — статус "Автомобиль выигран" на BidCars',
    },
  },
  {
    id: 2,
    title: "Оплата за автомобиль",
    payment: true,
    content: {
      description:
        "После выигрыша на аукционе, в течение нескольких часов, отправляется SMS и электронное письмо со скриншотом от аукционного дома, подтверждающим победу автомобиля.",
      quote:
        "Вы выиграли 2015 Audi S3 #483982. Детали оплаты были отправлены на ваш адрес электронной почты. Пожалуйста, обеспечьте своевременную оплату.",
      extra:
        "Письмо содержит сумму к оплате в USD (сумма ставки + аукционные сборы), описание перевода и вложение с номером счета, номером SWIFT, адресом банка и т. д.",
      links: [
        { label: "IAAI", url: "https://bid.cars/wire_iaai_en.pdf" },
        { label: "Copart", url: "https://bid.cars/wire_copart_en.pdf" },
      ],
      image:
        "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&q=80",
      imageCaption: "Неоплаченный инвойс на платформе аукциона",
    },
  },
  {
    id: 3,
    title: "Подтверждение получения оплаты",
    payment: false,
    content: {
      description:
        "Как только средства поступают на счет аукционного дома, отправляется SMS, подтверждающее получение оплаты. Запрос на забор автомобиля автоматически перенаправляется в транспортную компанию.",
      quote:
        "Мы зафиксировали вашу оплату за 2015 Audi S3 и организовали его забор из аукционного дома.",
    },
  },
  {
    id: 4,
    title: "Обновления по транспортировке автомобиля",
    payment: false,
    content: {
      description:
        'Во вкладке "Транспорт" в личном кабинете BidCars предоставляется информация о:',
      bullets: [
        "Заборе автомобиля из аукционного дома,",
        "Доставке автомобиля на судоходный терминал,",
        "Планируемом убытии автомобиля (ETD),",
        "Ожидаемом времени прибытия (ETA),",
        "Заборе контейнера из порта.",
      ],
      image:
        "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=600&q=80",
      imageCaption: "Таймлайн отслеживания транспортировки",
    },
  },
  {
    id: 5,
    title: "Фотографии с судоходного терминала",
    payment: false,
    content: {
      description:
        "Фотодокументация автомобиля с судоходного терминала доступна через несколько дней после его прибытия.",
      quote:
        "Фотографии 2015 Audi S3 были отправлены на ваш адрес электронной почты.",
      image:
        "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=600&q=80",
      imageCaption: "Автомобиль на судоходном терминале",
    },
  },
  {
    id: 6,
    title: "Доставка автомобиля в Европу",
    payment: false,
    content: {
      description:
        'Во вкладке "Транспорт" статус автомобиля обновляется с указанием дат отправления и прибытия, номера контейнера и карты, показывающей местоположение контейнеровоза.',
      image:
        "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400&q=80",
      imageCaption: "Карта местоположения контейнеровоза",
    },
  },
  {
    id: 7,
    title: "Расчет стоимости транспортировки",
    payment: true,
    content: {
      description:
        "В течение нескольких дней после отправки в Европу предоставляется отчет о расходах на автовоз и фрахт с деталями для перевода. Оплата производится в USD на счет в США.",
      quote:
        "Расчет транспортировки для 2015 Audi S3 был отправлен на ваш адрес электронной почты. Пожалуйста, произведите оплату в течение 72 часов.",
      links: [
        {
          label: "Транспортные расходы",
          url: "https://bid.cars/wire_transport_en.pdf",
        },
      ],
      image:
        "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&q=80",
      imageCaption: "Инвойс за транспортные расходы",
    },
  },
  {
    id: 8,
    title: "Форма таможенной очистки",
    payment: false,
    content: {
      description:
        "За несколько дней до прибытия автомобиля в Европу отправляется форма таможенной очистки для ввода необходимых данных (частное или фискальное оформление), информации о доставке автомобиля и деталей транспортных документов.",
      quote:
        "Разрешение на таможенную очистку 2015 Audi S3 было отправлено на ваш адрес электронной почты. Пожалуйста, заполните форму в течение 3 дней.",
    },
  },
  {
    id: 9,
    title: "Комиссионный сбор BidCars",
    payment: true,
    content: {
      description:
        "За несколько дней до прибытия в Европу отправляется ссылка на оплату сервисной комиссии BidCars. Оплата может быть произведена через мгновенный банковский перевод или кредитную карту (на базе Stripe).",
      quote:
        "Ваш автомобиль находится в пути и скоро прибудет в порт в Европе. Ожидаемая дата прибытия — понедельник, 11 декабря 2023 года. Пожалуйста, произведите оплату за наши логистические услуги:\n\nhttps://payments.bid.cars/en/fee/WAULC68E14A227038/482925780\n\nС наилучшими пожеланиями, BidCars.",
      image:
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80",
      imageCaption: "Платежный портал BidCars",
    },
  },
  {
    id: 10,
    title: "Инвойс за таможенную очистку",
    payment: true,
    content: {
      description:
        "После таможенной очистки отправляется электронное письмо с инвойсом, который необходимо оплатить в EUR напрямую на счет таможенного агентства.",
      quote:
        "Таможенная очистка для 2015 Audi S3 была отправлена на ваш адрес электронной почты. Пожалуйста, произведите оплату в течение 72 часов.",
      extra:
        "Примечание: Перевод в ЕВРО (€), не в долларах США. Может взиматься плата за хранение в размере 15 EUR в день или выше.",
      image:
        "https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=600&q=80",
      imageCaption: "Инвойс за таможенную очистку",
    },
  },
  {
    id: 11,
    title: "Уведомление о заборе автомобиля",
    payment: false,
    content: {
      description:
        "Отправляется SMS, указывающее, что логистическая служба запланировала забор автомобиля из Роттердама на определенный день.",
      quote:
        "Забор автомобиля 2015 Audi S3 из порта Роттердама запланирован на пятницу (2023-12-16). Подтверждение будет отправлено отдельно. Дата забора может измениться.",
    },
  },
  {
    id: 12,
    title: "Подтверждение забора автомобиля",
    payment: false,
    content: {
      description:
        "После того как автомобиль забран, отправляются электронное письмо и SMS с подтверждением забора, а также номером телефона транспортной компании и причитающейся суммой.",
      quote:
        "Автомобиль 2015 Audi S3 был забран из порта. Транспортная компания BidCars (+48 726 099 099). Водитель свяжется с вами по поводу доставки. Пожалуйста, подготовьте 450 EUR — оплата наличными водителю.",
    },
  },
  {
    id: 13,
    title: "Сканы документов на автомобиль",
    payment: false,
    content: {
      description:
        "После забора автомобиля сканы документов на транспортное средство автоматически отправляются на ваш адрес электронной почты.",
      extra:
        "Оригиналы документов будут отправлены курьером GLS в течение 2 недель после забора. В особых случаях до 30 дней. Документы отправляются из нашего офиса не реже одного раза в неделю.",
    },
  },
  {
    id: 14,
    title: "Поступление документов в офис",
    payment: false,
    content: {
      description:
        "По прибытии документов в офис отправляется SMS-уведомление. После комплектации они отправляются курьерской службой UPS / GLS / DPD.",
      quote:
        "Оригиналы документов на 2015 Audi S3 поступили в наш офис. Отправка с переводами курьером UPS / GLS / DPD состоится в течение 5 рабочих дней.",
    },
  },
  {
    id: 15,
    title: "Подтверждение отправки документов",
    payment: false,
    content: {
      description:
        "При отправке автоматически генерируется SMS-уведомление, информирующее об отгрузке.",
      quote:
        "Документы на автомобиль 2015 Audi S3 запланированы к отправке в четверг (2023-12-21). Курьер DPD (1000667692324U).",
      image:
        "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=600&q=80",
      imageCaption: "Конверт с документами BidCars",
    },
  },
  {
    id: 16,
    title: "Завершение обслуживания BidCars",
    payment: false,
    content: {
      description:
        "Завершение обслуживания со стороны BidCars означает успешное выполнение всех этапов сделки — от победы на аукционе до доставки автомобиля и документов. Клиенты могут рассчитывать на поддержку на каждом шагу.",
      extra:
        "BidCars обеспечивает полную прозрачность и предоставляет детальную отчетность по обслуживанию, гарантируя ясность и честность.",
      isCompletion: true,
    },
  },
];

function StepContent({ current }: { current: any }) {
  if (current.content.isCompletion) {
    return (
      <div className="text-center py-6">
        <div className="text-6xl mb-4">🚗</div>
        <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center mx-auto mb-5 text-white text-3xl">
          ✓
        </div>
        <p className="text-sm text-gray-600 leading-relaxed mb-3">
          {current.content.description}
        </p>
        {current.content.extra && (
          <p className="text-sm text-gray-400 leading-relaxed">
            {current.content.extra}
          </p>
        )}
      </div>
    );
  }
  return (
    <>
      <p className="text-sm text-gray-600 leading-relaxed mb-4">
        {current.content.description}
      </p>
      {current.content.bullets && (
        <ul className="list-disc ml-5 mb-4 space-y-1.5">
          {current.content.bullets.map((b: any, i: number) => (
            <li key={i} className="text-sm text-gray-600 leading-relaxed">
              {b}
            </li>
          ))}
        </ul>
      )}
      {current.content.links && (
        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-2">
            PDF с реквизитами для перевода:
          </p>
          <ul className="list-disc ml-5 space-y-1">
            {current.content.links.map((l: any, i: number) => (
              <li key={i}>
                <span className="text-sm text-gray-700">{l.label} — </span>
                <a
                  href={l.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-blue-500 hover:underline break-all"
                >
                  {l.url}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
      {current.content.quote && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-3.5 mb-4">
          <p className="text-sm text-blue-800 leading-relaxed whitespace-pre-line">
            "{current.content.quote}"
          </p>
        </div>
      )}
      {current.content.extra && (
        <p className="text-sm text-gray-400 leading-relaxed mb-4">
          {current.content.extra}
        </p>
      )}
      {current.content.image && (
        <div className="mt-4 rounded-lg overflow-hidden border border-gray-200">
          <img
            src={current.content.image}
            alt={current.content.imageCaption || ""}
            className="w-full object-cover block"
            onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
          {current.content.imageCaption && (
            <div className="px-3.5 py-2 bg-gray-50 border-t border-gray-200">
              <p className="text-xs text-gray-400">
                {current.content.imageCaption}
              </p>
            </div>
          )}
        </div>
      )}
    </>
  );
}

// @ts-ignore - onNavigateToPhase not yet used
export function PostPurchaseProcess({ _onNavigateToPhase }: { _onNavigateToPhase?: any }) {
  const [activeStep, setActiveStep] = useState(1);
  const total = steps.length;
  const current = steps[activeStep - 1];

  return (
    <div className="max-w-5xl mx-auto px-3 sm:px-4 py-4">
      <div className="flex gap-5 items-start">
        {/* Sidebar: desktop only */}
        <div className="hidden lg:block w-72 flex-shrink-0 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {steps.map((step) => (
            <button
              key={step.id}
              onClick={() => setActiveStep(step.id)}
              className={[
                "w-full flex items-center gap-2.5 px-3.5 py-2.5 border-b border-gray-100 last:border-b-0 text-left transition-colors",
                activeStep === step.id
                  ? "bg-blue-50 border-l-[3px] border-l-blue-500"
                  : "border-l-[3px] border-l-transparent hover:bg-gray-50",
              ].join(" ")}
            >
              <div
                className={[
                  "w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0",
                  activeStep === step.id
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-500",
                ].join(" ")}
              >
                {step.id}
              </div>
              <span
                className={[
                  "text-[13px] flex-1 leading-snug",
                  activeStep === step.id
                    ? "text-blue-700 font-semibold"
                    : "text-gray-700",
                ].join(" ")}
              >
                {step.title}
              </span>
              {step.payment && (
                <span className="text-[10px] font-bold bg-blue-500 text-white px-1.5 py-0.5 rounded flex-shrink-0">
                  PAYMENT
                </span>
              )}
              {activeStep === step.id && (
                <span className="text-blue-500 text-base flex-shrink-0">›</span>
              )}
            </button>
          ))}
        </div>

        {/* Detail panel */}
        <div className="flex-1 min-w-0">
          {/* MOBILE: white card */}
          <div className="lg:hidden bg-white rounded-xl border border-gray-200 shadow-sm p-4">
            <div className="flex items-center gap-3 mb-5">
              <button
                onClick={() => setActiveStep((s) => Math.max(s - 1, 1))}
                disabled={activeStep === 1}
                className={[
                  "px-5 py-2 rounded-lg border text-sm font-semibold",
                  activeStep === 1
                    ? "border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50 cursor-pointer",
                ].join(" ")}
              >
                Back
              </button>
              <span className="text-sm text-gray-500 font-medium flex-1 text-center">
                {activeStep} / {total}
              </span>
              <button
                onClick={() => setActiveStep((s) => Math.min(s + 1, total))}
                disabled={activeStep === total}
                className={[
                  "px-5 py-2 rounded-lg text-sm font-semibold text-white",
                  activeStep === total
                    ? "bg-blue-300 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-600 cursor-pointer",
                ].join(" ")}
              >
                Next
              </button>
            </div>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                {current.id}
              </div>
              <h2 className="text-lg font-extrabold text-gray-900 leading-tight">
                {current.title}
              </h2>
            </div>

            <hr className="border-gray-200 mb-5" />

            <StepContent current={current} />
          </div>

          {/* DESKTOP: card with blue left border */}
          <div className="hidden lg:flex bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="w-1.5 bg-blue-500 flex-shrink-0" />
            <div className="flex-1 p-7 min-w-0">
              <div className="flex items-center gap-3 mb-6">
                <button
                  onClick={() => setActiveStep((s) => Math.max(s - 1, 1))}
                  disabled={activeStep === 1}
                  className={[
                    "px-4 py-1.5 rounded-md border text-sm font-semibold transition-colors",
                    activeStep === 1
                      ? "border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed"
                      : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50 cursor-pointer",
                  ].join(" ")}
                >
                  Назад
                </button>
                <span className="text-sm text-gray-400 font-medium">
                  {activeStep} / {total}
                </span>
                <button
                  onClick={() => setActiveStep((s) => Math.min(s + 1, total))}
                  disabled={activeStep === total}
                  className={[
                    "px-4 py-1.5 rounded-md text-sm font-semibold text-white transition-colors",
                    activeStep === total
                      ? "bg-blue-300 cursor-not-allowed"
                      : "bg-blue-500 hover:bg-blue-600 cursor-pointer",
                  ].join(" ")}
                >
                  Далее
                </button>
              </div>

              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                  {current.id}
                </div>
                <h2 className="text-xl font-extrabold text-gray-900 leading-tight">
                  {current.title}
                </h2>
              </div>

              <hr className="border-gray-100 mb-5" />

              <StepContent current={current} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
