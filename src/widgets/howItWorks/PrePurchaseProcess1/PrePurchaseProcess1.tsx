// React hooks imported but may be used indirectly
// import carImage from "../../../assets/bidcars_car.png"; // раскомментируй у себя

// Временная заглушка — убери когда подключишь реальный импорт
const carImage = "https://placehold.co/400x250/e8f0fe/2196f3?text=BidCars";

/* ─── Pulse animation (Tailwind не покрывает кастомные keyframes, добавляем глобально) ─── */
const pulseCSS = `
  @keyframes pulse-ring {
    0%   { transform: scale(1);   opacity: 0.7; }
    50%  { transform: scale(1.35); opacity: 0.3; }
    100% { transform: scale(1);   opacity: 0.7; }
  }
  .pulse-badge { animation: pulse-ring 1.8s ease-in-out infinite; }
`;

/* ─── Данные шагов ─── */
const STEPS = [
  {
    num: "ШАГ 1",
    title: "Найдите автомобиль своей мечты",
    body: [
      "Выбирайте из более 450 000 объявлений. Наш поисковик и подробные фильтры помогут легко найти нужный автомобиль в нашей базе. В BidCars не нужно создавать аккаунт, чтобы просматривать автомобили и аукционы.",
      "Аккаунт нужен только для участия в аукционе. Процесс регистрации прост и займёт не более 5 минут.",
    ],
    listTitle: "После создания аккаунта вы также получите:",
    list: [
      "Возможность добавлять автомобили в список отслеживания.",
      "Доступ к ценам архивных предложений.",
    ],
    footer:
      "Каждый месяц мы добавляем новые удобные функции для наших пользователей.",
    btn: "Создать бесплатный аккаунт",
  },
  {
    num: "ШАГ 2",
    title: "Внесите возвращаемый депозит",
    body: [
      "Возвращаемый депозит необходим для участия в аукционах — это требование аукционных домов (Copart и IAAI). Мы не берём комиссию за участие в аукционах. Если вы передумали — депозит можно вернуть в любой момент.",
      "После зачисления депозита вы сможете делать ставки в тот же день. При выигрыше средства замораживаются на сумму автомобиля. При проигрыше — автоматически возвращаются.",
    ],
    listTitle: "Уровни депозита:",
    list: [
      "Стартовый план — депозит $300; ставки до $50 000; до 5 авто одновременно.",
      "Профессиональный план — депозит $3 000; ставки до $500 000; до 10 авто.",
      "Корпоративный план — депозит $20 000; ставки до $200 000; до 20 авто.",
    ],
    btn: "Увеличить лимит ставок →",
  },
  {
    num: "ШАГ 3",
    title: "Аукцион начинается — почувствуйте азарт торгов!",
    body: [
      "Укажите максимальную сумму, которую вы готовы заплатить за автомобиль. Калькулятор BidCars покажет предварительный список расходов. Автомобиль будет выставлен на торги от вашего имени.",
      "Аукционы в США проходят в два этапа:",
    ],
    listTitle: null,
    list: [
      "Предварительные ставки (Pre-Bid) — несколько дней до начала, открываются за 5 дней до основного аукциона.",
      "Живой аукцион — начинается с наивысшей предварительной ставки. Побеждает тот, кто предложил больше.",
    ],
    footer:
      "BidCars представляет вас на живом аукционе в рамках установленного вами максимума. Это позволяет купить автомобиль по минимально возможной цене.",
  },
  {
    num: "ШАГ 4",
    title: "Оплатите автомобиль и ждите его прибытия!",
    body: [
      "После выигрыша аукциона вы получите реквизиты для банковского перевода и инструкцию по оплате. После зачисления средств мы заберём ваш автомобиль и возьмём на себя все формальности.",
      "Мы будем на связи на протяжении всего процесса транспортировки. Вы можете отслеживать статус автомобиля в личном кабинете — мы берём на себя таможенное оформление и все сопутствующие процедуры.",
      "Всё, что вам нужно — ждать доставки нового автомобиля прямо к вашей двери!",
      "Перейдите на вкладку «После покупки», чтобы ознакомиться с подробным планом действий после выигрыша аукциона, включая все этапы импорта.",
    ],
    btn: "После покупки →",
  },
];

/* ─── StepCard ─── */
function StepCard({ step }: { step: any }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 sm:p-8 flex flex-col gap-3">
      {/* Бейдж */}
      <span className="inline-block self-start bg-blue-500 text-white text-xs font-bold tracking-widest px-4 py-1 rounded">
        {step.num}
      </span>

      {/* Заголовок */}
      <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
        {step.title}
      </h3>

      {/* Параграфы */}
      {step.body.map((p: any, i: number) => (
        <p key={i} className="text-sm text-gray-500 leading-relaxed">
          {p}
        </p>
      ))}

      {/* Список */}
      {step.list && (
        <>
          {step.listTitle && (
            <p className="text-sm font-semibold text-gray-700">
              {step.listTitle}
            </p>
          )}
          <ul className="list-disc pl-5 space-y-1">
            {step.list.map((item: any, i: number) => (
              <li key={i} className="text-sm text-gray-500 leading-relaxed">
                {item}
              </li>
            ))}
          </ul>
        </>
      )}

      {/* Доп. текст после списка */}
      {step.footer && (
        <p className="text-sm text-gray-500 leading-relaxed">{step.footer}</p>
      )}

      {/* Кнопка */}
      {step.btn && (
        <button className="mt-2 self-start bg-blue-500 hover:bg-blue-600 active:bg-blue-700 transition-colors text-white text-sm font-semibold px-6 py-2.5 rounded-md">
          {step.btn}
        </button>
      )}
    </div>
  );
}

/* ─── Главный компонент ─── */
// @ts-ignore - onNavigateToPhase not yet used
export function PrePurchaseProcess1({ _onNavigateToPhase }: { _onNavigateToPhase?: any } = {}) {
  return (
    <>
      <style>{pulseCSS}</style>

      <div className="font-sans bg-slate-100 min-h-screen px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* ── Hero ── */}
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-4 tracking-tight">
              Процесс покупки автомобиля
            </h1>
            <p className="text-sm sm:text-base text-gray-500 leading-relaxed">
              Вас интересует импорт автомобилей из США? Ознакомьтесь с нашим
              руководством о том, как проходит процесс покупки автомобиля из США
              на нашем сайте. Мы объясняем всё важное шаг за шагом. Отныне
              аукционы США не будут для вас загадкой.
            </p>
          </div>

          {/* ── Intro ── */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mb-10 flex flex-col sm:flex-row">
            {/* Синяя полоска слева — только на desktop */}
            <div className="hidden sm:block w-1.5 bg-blue-500 flex-shrink-0" />

            {/* Текст */}
            <div className="flex-1 p-6 sm:p-10">
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 mb-4">
                4 шага к покупке автомобиля с BidCars
              </h2>
              <p className="text-sm text-gray-500 leading-relaxed mb-3">
                Чтобы сделать процесс импорта автомобилей из США понятным и
                прозрачным, мы создали сервис BidCars. Аукционы проводятся без
                посредников, без скрытых расходов — вы сами принимаете все
                решения! Вы выбираете автомобиль и сумму, которую готовы
                заплатить, а мы помогаем вам выиграть аукцион! Важно: в BidCars
                нет никаких расходов до того, как вы выиграете ставку.
              </p>
              <p className="text-sm text-gray-500 leading-relaxed">
                Регистрация и участие в аукционе бесплатны! Мы требуем только
                возвращаемый депозит для обеспечения ваших ставок! BidCars
                позволяет быстро и легко заказывать, покупать и доставлять
                автомобили, включая доставку до двери. BidCars — это 100%
                прозрачность и полный контроль над местонахождением вашего
                автомобиля.
              </p>
            </div>

            {/* Картинка */}
            <div className="flex-shrink-0 flex items-center justify-center p-4 sm:p-6 sm:w-72">
              <img
                src={carImage}
                alt="Автомобиль BidCars"
                className="w-full max-w-xs sm:max-w-full h-auto object-contain"
              />
            </div>
          </div>

          {/* ── Steps grid ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {STEPS.map((step, i) => (
              <StepCard key={i} step={step} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default PrePurchaseProcess1;
