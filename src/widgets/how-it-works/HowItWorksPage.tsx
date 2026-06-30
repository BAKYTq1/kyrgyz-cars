import { Link } from "react-router-dom";
import {
  FaQuestionCircle,
  FaLifeRing,
  FaSearch,
  FaMoneyBillWave,
  FaGavel,
  FaTruck,
} from "react-icons/fa";

const faqs = [
  {
    q: "Процесс покупки автомобилей через CarDeals сложен?",
    a: "Процесс покупки автомобилей через платформу CarDeals отличается простотой и ясностью. Для этого необходимы базовые навыки навигации по сайту, такие как размещение ставок, внесение депозита и проведение международных переводов в долларах США (USD) и евро (EUR) через ваш банк. Мы берём на себя все формальности для клиента, включая контакт с аукционным домом, управление документацией, организацию транспортировки в США, загрузку в контейнер, разгрузку, таможенное оформление и доставку автомобиля по указанному адресу.",
  },
  {
    q: "Как оплатить купленный на аукционе автомобиль?",
    a: "Для завершения оплаты купленного на аукционе автомобиля вам потребуется валютный счёт в долларах США и возможность проводить международные переводы. Если у вас есть сомнения относительно самостоятельного проведения транзакций, вы можете распечатать электронное письмо, полученное от нас, вместе с приложенным PDF-файлом с деталями перевода и обратиться за поддержкой в местное отделение вашего банка.",
  },
  {
    q: "Что происходит после выигрыша ставки?",
    a: "После выигрыша ставки на платформе CarDeals статус вашей ставки изменится на «Автомобиль выигран». Это означает, что ваше предложение было принято продавцом, и вы приобрели автомобиль. Окончательная сумма оплаты может быть ниже вашей максимальной предложенной суммы благодаря усилиям CarDeals по обеспечению автомобиля по лучшей цене во время прямого аукциона. В течение нескольких часов после завершения аукциона вы получите электронное письмо с подробностями транзакции, включая номер счёта, точную сумму к оплате и назначение платежа.",
  },
  {
    q: "Предоставляет ли CarDeals услуги таможенного оформления и доставки на дом?",
    a: "Для всех автомобилей, направленных в Роттердам, наш основной порт, мы предлагаем комплексные логистические услуги. Это включает таможенное оформление и доставку автомобиля непосредственно клиенту (для определённых местоположений), обеспечивая удобство и отсутствие сложностей в процессе импорта автомобиля для наших клиентов.",
  },
];

const steps = [
  {
    num: "ШАГ 1",
    title: "Найдите автомобиль своей мечты",
    icon: <FaSearch className="text-violet-500 text-2xl" />,
    text: "Найдите автомобиль своей мечты из США. Наш поисковик и детализированные фильтры облегчат вам просмотр нашей базы данных автомобилей. В CarDeals вам не нужно создавать учётную запись, чтобы просматривать автомобили и интересующие аукционы.",
    action: { label: "Создайте бесплатную учётную запись", to: "/register" },
  },
  {
    num: "ШАГ 2",
    title: "Оплатите возвратный депозит",
    icon: <FaMoneyBillWave className="text-violet-500 text-2xl" />,
    text: "Для участия в аукционах требуется возвратный депозит — это требование аукционных домов Copart и IAAI. Мы не взимаем никаких сборов за участие в торгах/аукционе — если вы хотите попрактиковаться, вы можете заказать возврат депозита через клиентский кабинет.",
  },
  {
    num: "ШАГ 3",
    title: "Аукцион начинается прямо сейчас — почувствуйте азарт!",
    icon: <FaGavel className="text-violet-500 text-2xl" />,
    text: "Установите максимальную сумму, которую вы готовы заплатить за данный автомобиль. Калькулятор, представленный на странице, поможет вам суммировать все расходы. Ваш заказ будет принят — автомобиль будет выставлен на аукционе CarDeals во время прямого аукциона аукционного дома.",
  },
  {
    num: "ШАГ 4",
    title: "Оплатите автомобиль и... ждите его прибытия!",
    icon: <FaTruck className="text-violet-500 text-2xl" />,
    text: "После выигрыша аукциона компания CarDeals вышлет вам данные для банковского перевода и инструкции по выполнению международного перевода в США. После зачисления средств мы заберём ваш автомобиль и сделаем дополнительные фотографии.",
  },
];

export default function HowItWorksPage() {
  return (
    <div className="bg-gray-50 max-w-7xl mx-auto">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Левая колонка — FAQ */}
          <div>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              {/* Заголовок */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <FaQuestionCircle className="text-gray-400" />
                  <span className="font-bold text-gray-900 text-sm">
                    Часто задаваемые вопросы
                  </span>
                </div>
                <Link
                  to="/help"
                  className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-violet-600 transition border border-gray-200 rounded-lg px-3 py-1.5"
                >
                  <FaLifeRing className="text-xs" />
                  Центр помощи
                </Link>
              </div>

              {/* FAQ список */}
              <div className="divide-y divide-gray-50">
                {faqs.map((faq, i) => (
                  <div key={i} className="px-6 py-5">
                    <h3 className="text-sm font-bold text-gray-900 mb-2">
                      {faq.q}
                    </h3>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      {faq.a}
                    </p>
                    {i === 0 && (
                      <Link
                        to="/catalog"
                        className="inline-block mt-3 bg-violet-600 hover:bg-violet-700 text-white text-xs font-semibold px-4 py-2 rounded-lg transition"
                      >
                        Процесс покупки автомобиля через CarDeals
                      </Link>
                    )}
                    {i === 2 && (
                      <Link
                        to="/calculator"
                        className="inline-block mt-3 bg-violet-600 hover:bg-violet-700 text-white text-xs font-semibold px-4 py-2 rounded-lg transition"
                      >
                        График импорта
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Правая колонка — 4 шага */}
          <div>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              {/* Заголовок */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                <span className="font-bold text-gray-900 text-sm">
                  4 шага к покупке автомобиля из США с CarDeals
                </span>
                <Link
                  to="/catalog"
                  className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-violet-600 transition border border-gray-200 rounded-lg px-3 py-1.5"
                >
                  Как это работает
                </Link>
              </div>

              {/* Шаги */}
              <div className="divide-y divide-gray-50">
                {steps.map((step, i) => (
                  <div key={i} className="px-6 py-5">
                    <div className="flex items-start gap-4">
                      <div className="shrink-0">
                        <div className="w-10 h-10 rounded-full bg-violet-50 flex items-center justify-center">
                          {step.icon}
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-bold text-violet-500 uppercase tracking-wide mb-1">
                          {step.num}
                        </p>
                        <h3 className="text-sm font-bold text-gray-900 mb-2">
                          {step.title}
                        </h3>
                        <p className="text-xs text-gray-500 leading-relaxed">
                          {step.text}
                        </p>
                        {step.action && (
                          <Link
                            to={step.action.to}
                            className="inline-block mt-3 bg-violet-600 hover:bg-violet-700 text-white text-xs font-semibold px-4 py-2 rounded-lg transition"
                          >
                            {step.action.label}
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
