import { useState } from "react";

function SectionDivider() {
  return <div className="border-t border-slate-200 my-6 sm:my-8" />;
}

function Label({ text, required }: { text: string; required?: boolean }) {
  return (
    <p className="text-sm text-slate-400 mb-2">
      {text} {required && <span>*</span>}
    </p>
  );
}

function Input({
  placeholder,
  defaultValue,
}: {
  placeholder?: string;
  defaultValue?: string;
}) {
  return (
    <input
      defaultValue={defaultValue}
      placeholder={placeholder}
      className="w-full border border-slate-200 rounded-lg px-4 py-3 text-sm text-slate-700 bg-slate-50 outline-none focus:border-blue-400 focus:bg-white transition-colors placeholder:text-slate-300"
    />
  );
}

function PhoneInput() {
  return (
    <div className="flex items-center border border-slate-200 rounded-lg px-4 py-3 bg-slate-50 gap-2">
      <span className="text-base">🇰🇬</span>
      <span className="text-slate-400 text-sm">▾</span>
      <span className="text-slate-400 text-sm">+996</span>
      <input
        defaultValue="500 625 585"
        className="flex-1 bg-transparent text-sm text-slate-700 outline-none min-w-0"
      />
    </div>
  );
}

function CountrySelect() {
  return (
    <div className="flex items-center border border-slate-200 rounded-lg px-4 py-3 bg-white gap-2 w-full">
      <span className="text-base">🇰🇬</span>
      <span className="text-slate-400 text-sm">▾</span>
      <span className="text-sm text-slate-700 flex-1 min-w-0 truncate">
        Kyrgyzstan (Кыргызстан)
      </span>
    </div>
  );
}

function DestinationSelect() {
  return (
    <div className="flex items-center border border-slate-200 rounded-lg px-4 py-3 bg-white w-full">
      <span className="text-sm text-slate-700 flex-1 min-w-0 truncate">
        Rotterdam (Netherland)
      </span>
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        className="shrink-0"
      >
        <path
          d="M4 6L8 4L12 6"
          stroke="#94a3b8"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <path
          d="M4 10L8 12L12 10"
          stroke="#94a3b8"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

export function AccountProfile() {
  const [highRisk, setHighRisk] = useState(false);
  const [newsletter, setNewsletter] = useState(true);

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
      {/* Заголовок */}
      <div className="px-4 sm:px-8 py-5 sm:py-6 border-b border-slate-200">
        <h1 className="text-base sm:text-lg font-semibold text-slate-900">
          Личная информация
        </h1>
      </div>

      <div className="px-4 sm:px-8 py-5 sm:py-8">
        {/* ── Владелец учетной записи ── */}
        <p className="text-sm font-semibold text-slate-900 mb-4 sm:mb-6">
          Владелец учетной записи
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <Label text="Имя" required />
            <Input defaultValue="Daniel" />
          </div>
          <div>
            <Label text="Фамилия" required />
            <Input defaultValue=".m" />
          </div>
        </div>

        <SectionDivider />

        {/* ── Контактные данные ── */}
        <p className="text-sm font-semibold text-slate-900 mb-4 sm:mb-6">
          Контактные данные
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-5">
          <div>
            <Label text="Электронная почта" required />
            <Input defaultValue="masejitovandaniel@gmail.com" />
          </div>
          <div>
            <Label text="Телефон" required />
            <PhoneInput />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6">
          <button className="w-full border border-blue-400 text-blue-500 rounded-lg px-4 py-3 text-sm hover:bg-blue-50 transition-colors">
            Отправить письмо для активации
          </button>
          <button className="w-full bg-blue-500 text-white rounded-lg px-4 py-3 text-sm hover:bg-blue-600 transition-colors">
            Подтвердите ваш телефон
          </button>
        </div>

        <SectionDivider />

        {/* ── Физический адрес ── */}
        <p className="text-sm font-semibold text-slate-900 mb-4 sm:mb-6">
          Физический адрес
        </p>
        <div className="mb-4 sm:mb-5">
          <Label text="Адрес" required />
          <Input placeholder="Введите свой адрес" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-5">
          <div>
            <Label text="Город" required />
            <Input placeholder="Введите ваш город" />
          </div>
          <div>
            <Label text="Почтовый индекс" required />
            <Input placeholder="Введите ваш почтовый индекс" />
          </div>
        </div>
        <div>
          <Label text="Страна" required />
          <CountrySelect />
        </div>

        <SectionDivider />

        {/* ── Назначение по умолчанию ── */}
        <p className="text-sm font-semibold text-slate-900 mb-4 sm:mb-6">
          Назначение по умолчанию
        </p>
        <div>
          <Label text="Место назначение" />
          <DestinationSelect />
        </div>

        <SectionDivider />

        {/* ── Транспортные средства с высоким риском ── */}
        <p className="text-sm font-semibold text-slate-900 mb-4 sm:mb-5">
          Транспортные средства с высоким риском
        </p>
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={highRisk}
            onChange={(e) => setHighRisk(e.target.checked)}
            className="mt-0.5 w-4 h-4 accent-blue-500 cursor-pointer shrink-0"
          />
          <span className="text-sm text-slate-600 leading-relaxed">
            Разрешить делать ставки на транспортные средства, которые CarDeals не
            рекомендует из-за их аукционной истории или документации,
            препятствующей регистрации в Польше.
          </span>
        </label>

        <SectionDivider />

        {/* ── Информационные рассылки ── */}
        <p className="text-sm font-semibold text-slate-900 mb-4 sm:mb-5">
          Информационные рассылки
        </p>
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={newsletter}
            onChange={(e) => setNewsletter(e.target.checked)}
            className="w-4 h-4 accent-blue-500 cursor-pointer"
          />
          <span className="text-sm text-slate-600">
            Я хочу получать электронные письма CarDeals
          </span>
        </label>

        {/* ── Кнопка сохранения ── */}
        <div className="flex justify-center mt-8 sm:mt-10">
          <button className="w-full sm:w-auto bg-blue-500 text-white rounded-lg px-16 py-3 text-sm font-medium hover:bg-blue-600 transition-colors">
            Сохранить настройки
          </button>
        </div>
      </div>
    </div>
  );
}
