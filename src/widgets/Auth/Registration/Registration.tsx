import { useState, useEffect } from "react";
import { useI18n } from "../../../shared/i18n/I18nProvider"; // Проверь правильность пути к провайдеру

const slides = [
  {
    image:
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=900&q=80",
    name: "ŁUKASZ SZCZYGIEŁ",
    rating: 3,
    text: "Sprowadzić auto z USA to nic trudnego, wystarczy sobie je wyszukać, sprawdzić raportem i wylicytować, później postępować zgodnie z harmonogramem. Opłaty o cały proces jasne dla każdego. Polecam BidCars bo wiedzą jak to robić zgodnie ze sztuką. Jedno auto już prawie gotowe, dwa kolejne w drodze.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=900&q=80",
    name: "АЗАМАТ БАКЫТБЕК",
    rating: 5,
    text: "Отличный сервис! Купил Toyota Camry через BidCars — всё прозрачно, доставка точно в срок. Менеджеры всегда на связи, объясняли каждый шаг. Буду рекомендовать всем друзьям.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=900&q=80",
    name: "НУРЛАН ЫСМАИЛОВ",
    rating: 4,
    text: "Пользуюсь уже второй раз. Первый раз взял Honda Accord, сейчас заказал BMW. Всё чётко, ставки удобные, поддержка работает быстро. Цены ниже рынка — реально выгодно.",
  },
];

const countries = [
  { code: "KG", name: "Kyrgyzstan (Кыргызстан)", dial: "+996", flag: "🇰🇬" },
  { code: "RU", name: "Russia (Россия)", dial: "+7", flag: "🇷🇺" },
  { code: "KZ", name: "Kazakhstan (Казахстан)", dial: "+7", flag: "🇰🇿" },
  { code: "US", name: "United States", dial: "+1", flag: "🇺🇸" },
  { code: "DE", name: "Germany (Deutschland)", dial: "+49", flag: "🇩🇪" },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5 mt-1 mb-3">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          className={`w-5 h-5 ${i <= rating ? "text-yellow-400" : "text-gray-500"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function Slideshow({
  current,
  visible,
  onPrev,
  onNext,
}: {
  current: number;
  visible: boolean;
  onPrev: () => void;
  onNext: () => void;
}) {
  const { t } = useI18n();
  const slide = slides[current];
  return (
    <div className="relative w-full h-full rounded-2xl overflow-hidden">
      {slides.map((s, i) => (
        <img
          key={i}
          src={s.image}
          alt=""
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-600"
          style={{ opacity: i === current ? 1 : 0 }}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      <div
        className="absolute bottom-0 left-0 right-0 p-7 transition-opacity duration-500"
        style={{ opacity: visible ? 1 : 0 }}
      >
        <p className="text-white font-bold text-sm tracking-wide">
          {slide.name}
        </p>
        <StarRating rating={slide.rating} />
        <p className="text-white/90 text-sm leading-relaxed mb-5">
          "{slide.text}"
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-white/60 text-xs">
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            {t("auth.published")} <span className="underline">Google</span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={onPrev}
              className="w-9 h-9 rounded-full border border-white/40 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              onClick={onNext}
              className="w-9 h-9 rounded-full border border-white/40 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Registration() {
  const { t } = useI18n();
  const [step, setStep] = useState<1 | 2>(1);
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(true);

  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState(countries[0]);
  const [showCountryDrop, setShowCountryDrop] = useState(false);
  const [errors, setErrors] = useState<{
    email?: string;
    firstName?: string;
    lastName?: string;
  }>({});

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [promoEmails, setPromoEmails] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreeOrderTerms, setAgreeOrderTerms] = useState(false);
  const [isAdult, setIsAdult] = useState(false);

  const handleNextStep = () => {
    const newErrors: typeof errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) newErrors.email = t("auth.registration.emailRequired");
    else if (!emailRegex.test(email))
      newErrors.email = t("auth.registration.emailInvalid");
    if (!firstName.trim())
      newErrors.firstName = t("auth.registration.firstNameRequired");
    if (!lastName.trim())
      newErrors.lastName = t("auth.registration.lastNameRequired");
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) setStep(2);
  };

  const go = (next: number) => {
    setVisible(false);
    setTimeout(() => {
      setCurrent(((next % slides.length) + slides.length) % slides.length);
      setVisible(true);
    }, 500);
  };

  useEffect(() => {
    const tInterval = setInterval(() => go(current + 1), 5500);
    return () => clearInterval(tInterval);
  }, [current]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col min-[1100px]:flex-row">
      {/* ═══ Форма ═══ */}
      <div className="w-full min-[1100px]:w-[52%] min-[1100px]:flex-none flex flex-col bg-gray-100 px-5 sm:px-8 py-6 sm:py-7">
        {/* Логотип */}
        <div className="flex items-center gap-2 mb-8 sm:mb-10">
          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center shrink-0">
            <svg
              className="w-4 h-4 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
              />
            </svg>
          </div>
          <span className="text-lg font-bold text-gray-800 tracking-widest">
            BIDCARS
          </span>
        </div>

        <div className="flex-1 flex items-start justify-center">
          <div className="w-full max-w-[520px]">
            <a
              href="/"
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-blue-100 flex items-center justify-center mb-5 sm:mb-6 hover:bg-blue-200 active:scale-95 transition-all cursor-pointer"
            >
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.8}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                />
              </svg>
            </a>

            <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-1">
              {t("auth.registration.title")}
            </h1>
            <p className="text-gray-400 text-sm mb-4 sm:mb-5">
              {t("auth.registration.subtitle")}
            </p>

            {/* Прогресс */}
            <div className="relative flex justify-end mb-2 h-5">
              <button
                type="button"
                onClick={() => setStep(1)}
                className={`absolute left-0 bottom-0 flex items-center gap-1 text-blue-500 hover:text-blue-600 text-sm font-medium transition-all duration-300 ${
                  step === 2
                    ? "opacity-100 pointer-events-auto translate-x-0"
                    : "opacity-0 pointer-events-none -translate-x-2"
                }`}
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                {t("auth.registration.back")}
              </button>
              <span className="text-sm text-gray-400">
                {t("auth.registration.stepOf")} {step}{" "}
                {t("auth.registration.stepTotal")}
              </span>
            </div>
            <div className="w-full h-1 bg-gray-200 rounded-full mb-4 sm:mb-5">
              <div
                className="h-1 bg-blue-500 rounded-full transition-all duration-300"
                style={{ width: step === 1 ? "50%" : "100%" }}
              />
            </div>

            {/* Шаг 1 */}
            {step === 1 && (
              <div className="space-y-3 sm:space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    {t("auth.registration.email")}{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email)
                        setErrors({ ...errors, email: undefined });
                    }}
                    placeholder={t("auth.registration.emailPlaceholder")}
                    className={`w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 bg-white placeholder-gray-300 transition-colors ${
                      errors.email
                        ? "border-red-500 focus:ring-red-400"
                        : "border-gray-200 focus:ring-blue-400"
                    }`}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      {t("auth.registration.firstName")}{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => {
                        setFirstName(e.target.value);
                        if (errors.firstName)
                          setErrors({ ...errors, firstName: undefined });
                      }}
                      placeholder={t("auth.registration.firstNamePlaceholder")}
                      className={`w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 bg-white placeholder-gray-300 transition-colors ${
                        errors.firstName
                          ? "border-red-500 focus:ring-red-400"
                          : "border-gray-200 focus:ring-blue-400"
                      }`}
                    />
                    {errors.firstName && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.firstName}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      {t("auth.registration.lastName")}{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => {
                        setLastName(e.target.value);
                        if (errors.lastName)
                          setErrors({ ...errors, lastName: undefined });
                      }}
                      placeholder={t("auth.registration.lastNamePlaceholder")}
                      className={`w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 bg-white placeholder-gray-300 transition-colors ${
                        errors.lastName
                          ? "border-red-500 focus:ring-red-400"
                          : "border-gray-200 focus:ring-blue-400"
                      }`}
                    />
                    {errors.lastName && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.lastName}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      {t("auth.registration.phone")}
                    </label>
                    <div className="flex items-center border border-gray-200 rounded-xl bg-white overflow-hidden focus-within:ring-2 focus-within:ring-blue-400">
                      <div className="flex items-center gap-1 px-2.5 border-r border-gray-200 shrink-0 py-2.5">
                        <span className="text-base">{country.flag}</span>
                        <span className="text-xs text-gray-400">
                          {country.dial}
                        </span>
                      </div>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder={t("auth.registration.phonePlaceholder")}
                        className="flex-1 px-2 py-2.5 text-sm focus:outline-none placeholder-gray-300 bg-white min-w-0"
                      />
                    </div>
                  </div>
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      {t("auth.registration.country")}{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowCountryDrop(!showCountryDrop)}
                      className="w-full flex items-center justify-between px-3 py-2.5 border border-green-400 rounded-xl bg-white text-sm focus:outline-none"
                    >
                      <div className="flex items-center gap-1.5 min-w-0">
                        <span className="text-base shrink-0">
                          {country.flag}
                        </span>
                        <span className="text-gray-700 truncate text-xs">
                          {country.name}
                        </span>
                      </div>
                      <svg
                        className="w-4 h-4 text-green-500 shrink-0 ml-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </button>
                    {showCountryDrop && (
                      <div className="absolute z-20 mt-1 w-full bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
                        {countries.map((c) => (
                          <button
                            key={c.code}
                            type="button"
                            onClick={() => {
                              setCountry(c);
                              setShowCountryDrop(false);
                            }}
                            className="w-full flex items-center gap-2 px-3 py-2 hover:bg-gray-50 text-sm text-left"
                          >
                            <span className="text-base">{c.flag}</span>
                            <span className="truncate">{c.name}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleNextStep}
                  className="w-full py-3 bg-blue-500 hover:bg-blue-600 active:scale-[0.99] text-white font-semibold rounded-xl transition-all text-sm mt-1"
                >
                  {t("auth.registration.continue")}
                </button>
              </div>
            )}

            {/* Шаг 2 */}
            {step === 2 && (
              <div className="space-y-3 sm:space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    {t("auth.registration.password")}{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={t("auth.registration.passwordPlaceholder")}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white placeholder-gray-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    {t("auth.registration.confirmPassword")}{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder={t(
                      "auth.registration.confirmPasswordPlaceholder",
                    )}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white placeholder-gray-300"
                  />
                </div>

                <div className="space-y-2.5 pt-2">
                  <label className="flex items-start gap-2.5 text-xs text-gray-700 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={promoEmails}
                      onChange={(e) => setPromoEmails(e.target.checked)}
                      className="mt-0.5 rounded border-gray-300 accent-blue-500"
                    />
                    <span>{t("auth.registration.promoEmails")}</span>
                  </label>
                  <label className="flex items-start gap-2.5 text-xs text-gray-700 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={agreeTerms}
                      onChange={(e) => setAgreeTerms(e.target.checked)}
                      className="mt-0.5 rounded border-gray-300 accent-blue-500"
                    />
                    <span>
                      <span className="text-red-500">* </span>
                      {t("auth.registration.agreeTerms")}{" "}
                      <a
                        href="/terms"
                        className="text-blue-500 hover:underline"
                      >
                        {t("auth.registration.terms")}
                      </a>
                    </span>
                  </label>
                  <label className="flex items-start gap-2.5 text-xs text-gray-700 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={agreeOrderTerms}
                      onChange={(e) => setAgreeOrderTerms(e.target.checked)}
                      className="mt-0.5 rounded border-gray-300 accent-blue-500"
                    />
                    <span>
                      <span className="text-red-500">* </span>
                      {t("auth.registration.agreeOrderTerms")}{" "}
                      <a
                        href="/order-terms"
                        className="text-blue-500 hover:underline"
                      >
                        {t("auth.registration.orderTerms")}
                      </a>
                    </span>
                  </label>
                  <label className="flex items-start gap-2.5 text-xs text-gray-700 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={isAdult}
                      onChange={(e) => setIsAdult(e.target.checked)}
                      className="mt-0.5 rounded border-gray-300 accent-blue-500"
                    />
                    <span>
                      <span className="text-red-500">* </span>
                      {t("auth.registration.isAdult")}
                    </span>
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-blue-500 hover:bg-blue-600 active:scale-[0.99] text-white font-semibold rounded-xl transition-all text-sm mt-3"
                >
                  {t("auth.registration.submit")}
                </button>
              </div>
            )}

            <p className="text-center text-sm text-gray-400 mt-10 sm:mt-16">
              {t("auth.registration.haveAccount")}{" "}
              <a
                href="/login"
                className="text-blue-500 hover:underline font-medium"
              >
                {t("auth.registration.login")}
              </a>
            </p>
          </div>
        </div>
      </div>

      <div className="hidden min-[620px]:flex min-[620px]:h-72 min-[1100px]:h-auto min-[1100px]:flex-1 items-stretch p-4 min-[1100px]:p-6">
        <Slideshow
          current={current}
          visible={visible}
          onPrev={() => go(current - 1)}
          onNext={() => go(current + 1)}
        />
      </div>
    </div>
  );
}
