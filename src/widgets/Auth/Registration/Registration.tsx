import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useI18n } from "../../../shared/i18n/I18nProvider";
import { useAppDispatch, useAppSelector } from "../../../lib/store";
import { Link } from "react-router-dom";
import logo from "../../../assets/logotip.png";
import {
  registerThunk,
  verifyEmailThunk,
  resendOtpThunk,
  clearRegisterError,
  resetRegistrationState,
} from "../../../lib/auth/Register";

const slides = [
  {
    image:
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=900&q=80",
    name: "ŁUKASZ SZCZYGIEŁ",
    rating: 3,
    text: "Sprowadzić auto z USA to nic trudnego, wystarczy sobie je wyszukać, sprawdzić raportem i wylicytować, później postępować zgodnie z harmonogramem. Opłaty o cały proces jasne dla każdego. Polecam CarDeals bo wiedzą jak to robić zgodnie ze sztuką. Jedno auto już prawie gotowe, dwa kolejne w drodze.",
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
  {
    code: "KG",
    name: "Kyrgyzstan (Кыргызстан)",
    dial: "+996",
    flag: "🇰🇬",
    phoneLength: 9,
  },
  {
    code: "RU",
    name: "Russia (Россия)",
    dial: "+7",
    flag: "🇷🇺",
    phoneLength: 10,
  },
  {
    code: "KZ",
    name: "Kazakhstan (Казахстан)",
    dial: "+7",
    flag: "🇰🇿",
    phoneLength: 10,
  },
  {
    code: "US",
    name: "United States",
    dial: "+1",
    flag: "🇺🇸",
    phoneLength: 10,
  },
  {
    code: "DE",
    name: "Germany (Deutschland)",
    dial: "+49",
    flag: "🇩🇪",
    phoneLength: 11,
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5 mt-1 mb-3">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          className={`w-5 h-5 ${i <= rating ? "text-violet-400" : "text-gray-500"}`}
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
                fill="#7c3aed"
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

const OTP_LENGTH = 6;
const RESEND_COOLDOWN = 60; // секунд

type PasswordStrength = "empty" | "weak" | "medium" | "strong";

function getPasswordStrength(password: string): PasswordStrength {
  if (!password) return "empty";

  const hasLetter = /[a-zA-Zа-яА-ЯёЁ]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasLower = /[a-zа-яё]/.test(password);
  const hasUpper = /[A-ZА-ЯЁ]/.test(password);
  const hasSymbol = /[^a-zA-Z0-9а-яА-ЯёЁ]/.test(password);
  const isLongEnough = password.length >= 8;
  const isVeryLong = password.length >= 12;

  if (!isLongEnough || !hasLetter || !hasNumber) return "weak";

  const variety = [hasLower, hasUpper, hasSymbol].filter(Boolean).length;
  if (isVeryLong && variety >= 2) return "strong";
  if (variety >= 1) return "medium";
  return "medium";
}

function PasswordStrengthMeter({ password }: { password: string }) {
  const { t } = useI18n();
  const strength = getPasswordStrength(password);

  if (strength === "empty") return null;

  const config: Record<
    Exclude<PasswordStrength, "empty">,
    { label: string; color: string; bars: number }
  > = {
    weak: {
      label: t("auth.registration.passwordWeak"),
      color: "#ef4444",
      bars: 1,
    },
    medium: {
      label: t("auth.registration.passwordMedium"),
      color: "#a855f7",
      bars: 2,
    },
    strong: {
      label: t("auth.registration.passwordStrong"),
      color: "#7c3aed",
      bars: 3,
    },
  };

  const { label, color, bars } = config[strength];

  return (
    <div className="mt-2">
      <div className="flex gap-1">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-1.5 flex-1 rounded-full transition-colors duration-300"
            style={{ backgroundColor: i <= bars ? color : "#e5e7eb" }}
          />
        ))}
      </div>
      <p className="text-xs mt-1 font-medium" style={{ color }}>
        {label}
      </p>
    </div>
  );
}

export function Registration() {
  const { t } = useI18n();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error, registeredEmail, registrationSuccess } =
    useAppSelector((s) => s.register);

  const [step, setStep] = useState<1 | 2 | 3>(1);
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
    phone?: string;
  }>({});

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [step2Errors, setStep2Errors] = useState<{
    password?: string;
    confirmPassword?: string;
  }>({});

  // ── Шаг 3: подтверждение email ──
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [resendCooldown, setResendCooldown] = useState(0);

  // Редирект после успешной верификации
  useEffect(() => {
    if (registrationSuccess) {
      navigate("/login");
    }
  }, [registrationSuccess]);

  // Чистим ошибку и состояние регистрации при размонтировании
  useEffect(() => {
    return () => {
      dispatch(clearRegisterError());
      dispatch(resetRegistrationState());
    };
  }, []);

  // Когда регистрация прошла успешно — переходим на шаг 3
  useEffect(() => {
    if (registeredEmail) {
      setStep(3);
      setResendCooldown(RESEND_COOLDOWN);
    }
  }, [registeredEmail]);

  // Таймер для повторной отправки кода
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const tick = setInterval(() => setResendCooldown((c) => c - 1), 1000);
    return () => clearInterval(tick);
  }, [resendCooldown]);

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

  // При смене страны — обрезаем уже введённый телефон под новый лимит цифр
  const handleCountryChange = (c: (typeof countries)[number]) => {
    setCountry(c);
    setShowCountryDrop(false);
    const digits = phone.replace(/\D/g, "");
    if (digits.length > c.phoneLength) {
      setPhone(digits.slice(0, c.phoneLength));
    }
    if (errors.phone) setErrors({ ...errors, phone: undefined });
  };

  // Оставляем только цифры и сразу обрезаем по максимуму для выбранной страны —
  // лишние цифры просто не вводятся, а не отправляются с невалидным номером.
  const handlePhoneChange = (value: string) => {
    const digitsOnly = value.replace(/\D/g, "").slice(0, country.phoneLength);
    setPhone(digitsOnly);
    if (errors.phone) setErrors({ ...errors, phone: undefined });
  };

  const handleNextStep = () => {
    const newErrors: typeof errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
    if (!email.trim()) newErrors.email = t("auth.registration.emailRequired");
    else if (!emailRegex.test(email.trim()))
      newErrors.email = t("auth.registration.emailInvalid");
    if (!firstName.trim())
      newErrors.firstName = t("auth.registration.firstNameRequired");
    if (!lastName.trim())
      newErrors.lastName = t("auth.registration.lastNameRequired");
    if (phone.trim()) {
      const phoneDigits = phone.replace(/\D/g, "");
      if (phoneDigits.length !== country.phoneLength) {
        newErrors.phone = t("auth.registration.phoneInvalid", {
          length: country.phoneLength,
        });
      }
    }
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      dispatch(clearRegisterError());
      setStep(2);
    }
  };

  const handleSubmitRegister = () => {
    const newErrors: typeof step2Errors = {};
    const hasLetter = /[a-zA-Zа-яА-ЯёЁ]/.test(password);
    const hasNumber = /[0-9]/.test(password);

    if (!password) newErrors.password = t("auth.registration.passwordRequired");
    else if (password.length < 8)
      newErrors.password = t("auth.registration.passwordTooShort");
    else if (!hasLetter || !hasNumber)
      newErrors.password = t("auth.registration.passwordNeedsLetterAndNumber");

    if (confirmPassword !== password)
      newErrors.confirmPassword = t("auth.registration.passwordMismatch");
    setStep2Errors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    dispatch(
      registerThunk({
        email: email.trim(),
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        password,
        password2: confirmPassword,
      }),
    );
  };

  // ── OTP helpers ──
  const handleOtpChange = (index: number, value: string) => {
    const digit = value.replace(/\D/g, "").slice(-1);
    const next = [...otp];
    next[index] = digit;
    setOtp(next);
    if (digit && index < OTP_LENGTH - 1) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "");
    if (!pasted) return;
    e.preventDefault();
    const next = Array(OTP_LENGTH).fill("");
    pasted
      .slice(0, OTP_LENGTH)
      .split("")
      .forEach((d, i) => (next[i] = d));
    setOtp(next);
    const lastIndex = Math.min(pasted.length, OTP_LENGTH) - 1;
    otpRefs.current[lastIndex]?.focus();
  };

  const handleVerify = () => {
    const code = otp.join("");
    if (code.length !== OTP_LENGTH || !registeredEmail) return;
    dispatch(clearRegisterError());
    dispatch(verifyEmailThunk({ email: registeredEmail, code }));
  };

  const handleResend = () => {
    if (!registeredEmail || resendCooldown > 0) return;
    dispatch(clearRegisterError());
    dispatch(resendOtpThunk({ email: registeredEmail }));
    setResendCooldown(RESEND_COOLDOWN);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col min-[1100px]:flex-row">
      {/* ═══ Форма ═══ */}
      <div className="w-full min-[1100px]:w-[52%] min-[1100px]:flex-none flex flex-col bg-white px-5 sm:px-8 py-6 sm:py-7">
        {/* Логотип */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <div className="w-[150px] h-11 flex items-center justify-center">
            <img
              src={logo}
              alt="CarDeals"
              className="w-full h-11 object-contain"
            />
          </div>
        </Link>

        <div className="flex-1 flex items-start justify-center">
          <div className="w-full max-w-[520px]">
            <a
              href="/"
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-violet-100 flex items-center justify-center mb-5 sm:mb-6 hover:bg-violet-200 active:scale-95 transition-all cursor-pointer"
            >
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6 text-violet-500"
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
              {step === 3
                ? t("auth.registration.verifyTitle")
                : t("auth.registration.title")}
            </h1>
            <p className="text-gray-400 text-sm mb-4 sm:mb-5">
              {step === 3
                ? `${t("auth.registration.verifySubtitle")} ${registeredEmail ?? ""}`
                : t("auth.registration.subtitle")}
            </p>

            {/* Прогресс */}
            <div className="relative flex justify-end mb-2 h-5">
              <button
                type="button"
                onClick={() => setStep(1)}
                className={`absolute left-0 bottom-0 flex items-center gap-1 text-violet-500 hover:text-violet-600 text-sm font-medium transition-all duration-300 ${
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
                className="h-1 bg-violet-500 rounded-full transition-all duration-300"
                style={{
                  width: step === 1 ? "33%" : step === 2 ? "66%" : "100%",
                }}
              />
            </div>

            {/* ── Ошибка от сервера ── */}
            {error && (
              <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600">
                {error}
              </div>
            )}

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
                        : "border-gray-200 focus:ring-violet-400"
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
                          : "border-gray-200 focus:ring-violet-400"
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
                          : "border-gray-200 focus:ring-violet-400"
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
                    <div
                      className={`flex items-center border rounded-xl bg-white overflow-hidden focus-within:ring-2 transition-colors ${
                        errors.phone
                          ? "border-red-500 focus-within:ring-red-400"
                          : "border-gray-200 focus-within:ring-violet-400"
                      }`}
                    >
                      <div className="flex items-center gap-1 px-2.5 border-r border-gray-200 shrink-0 py-2.5">
                        <span className="text-base">{country.flag}</span>
                        <span className="text-xs text-gray-400">
                          {country.dial}
                        </span>
                      </div>
                      <input
                        type="tel"
                        inputMode="numeric"
                        value={phone}
                        onChange={(e) => handlePhoneChange(e.target.value)}
                        placeholder={t("auth.registration.phonePlaceholder")}
                        className="flex-1 px-2 py-2.5 text-sm focus:outline-none placeholder-gray-300 bg-white min-w-0"
                      />
                    </div>
                    {errors.phone && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.phone}
                      </p>
                    )}
                  </div>
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      {t("auth.registration.country")}{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowCountryDrop(!showCountryDrop)}
                      className="w-full flex items-center justify-between px-3 py-2.5 border border-violet-400 rounded-xl bg-white text-sm focus:outline-none"
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
                        className="w-4 h-4 text-violet-500 shrink-0 ml-1"
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
                            onClick={() => handleCountryChange(c)}
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
                  className="w-full py-3 bg-violet-500 hover:bg-violet-600 active:scale-[0.99] text-white font-semibold rounded-xl transition-all text-sm mt-1"
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
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        if (step2Errors.password)
                          setStep2Errors({
                            ...step2Errors,
                            password: undefined,
                          });
                      }}
                      onKeyDown={(e) =>
                        e.key === "Enter" && handleSubmitRegister()
                      }
                      disabled={loading}
                      placeholder={t("auth.registration.passwordPlaceholder")}
                      className={`w-full px-4 py-2.5 pr-11 border rounded-xl text-sm focus:outline-none focus:ring-2 bg-white placeholder-gray-300 disabled:opacity-60 transition-colors ${
                        step2Errors.password
                          ? "border-red-500 focus:ring-red-400"
                          : "border-gray-200 focus:ring-violet-400"
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? (
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={1.8}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={1.8}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                      )}
                    </button>
                  </div>
                  {step2Errors.password && (
                    <p className="text-red-500 text-xs mt-1">
                      {step2Errors.password}
                    </p>
                  )}
                  <PasswordStrengthMeter password={password} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    {t("auth.registration.confirmPassword")}{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                        if (step2Errors.confirmPassword)
                          setStep2Errors({
                            ...step2Errors,
                            confirmPassword: undefined,
                          });
                      }}
                      onKeyDown={(e) =>
                        e.key === "Enter" && handleSubmitRegister()
                      }
                      disabled={loading}
                      placeholder={t(
                        "auth.registration.confirmPasswordPlaceholder",
                      )}
                      className={`w-full px-4 py-2.5 pr-11 border rounded-xl text-sm focus:outline-none focus:ring-2 bg-white placeholder-gray-300 disabled:opacity-60 transition-colors ${
                        step2Errors.confirmPassword
                          ? "border-red-500 focus:ring-red-400"
                          : "border-gray-200 focus:ring-violet-400"
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? (
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={1.8}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={1.8}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                      )}
                    </button>
                  </div>
                  {step2Errors.confirmPassword && (
                    <p className="text-red-500 text-xs mt-1">
                      {step2Errors.confirmPassword}
                    </p>
                  )}
                </div>

                <button
                  type="button"
                  onClick={handleSubmitRegister}
                  disabled={loading}
                  className="w-full py-3 bg-violet-500 hover:bg-violet-600 active:scale-[0.99] text-white font-semibold rounded-xl transition-all text-sm mt-3 disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100 flex items-center justify-center gap-2"
                >
                  {loading && (
                    <svg
                      className="w-4 h-4 animate-spin"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8H4z"
                      />
                    </svg>
                  )}
                  {loading
                    ? t("auth.registration.loading")
                    : t("auth.registration.submit")}
                </button>
              </div>
            )}

            {/* Шаг 3 — подтверждение email */}
            {step === 3 && (
              <div className="space-y-5">
                <div className="flex justify-between gap-2">
                  {otp.map((digit, i) => (
                    <input
                      key={i}
                      ref={(el) => {
                        otpRefs.current[i] = el;
                      }}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      disabled={loading}
                      onChange={(e) => handleOtpChange(i, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(i, e)}
                      onPaste={handleOtpPaste}
                      className="w-12 h-14 text-center text-xl font-semibold border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-violet-400 disabled:opacity-60"
                    />
                  ))}
                </div>

                <button
                  type="button"
                  onClick={handleVerify}
                  disabled={loading || otp.join("").length !== OTP_LENGTH}
                  className="w-full py-3 bg-violet-500 hover:bg-violet-600 active:scale-[0.99] text-white font-semibold rounded-xl transition-all text-sm disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100 flex items-center justify-center gap-2"
                >
                  {loading && (
                    <svg
                      className="w-4 h-4 animate-spin"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8H4z"
                      />
                    </svg>
                  )}
                  {loading
                    ? t("auth.registration.verifying")
                    : t("auth.registration.verifyButton")}
                </button>

                <p className="text-center text-sm text-gray-400">
                  {t("auth.registration.didNotReceiveCode")}{" "}
                  {resendCooldown > 0 ? (
                    <span className="text-gray-400">
                      {t("auth.registration.resendIn", {
                        seconds: resendCooldown,
                      })}
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={handleResend}
                      disabled={loading}
                      className="text-violet-500 hover:underline font-medium disabled:opacity-60"
                    >
                      {t("auth.registration.resendCode")}
                    </button>
                  )}
                </p>
              </div>
            )}

            {step !== 3 && (
              <p className="text-center text-sm text-gray-400 mt-10 sm:mt-16">
                {t("auth.registration.haveAccount")}{" "}
                <a
                  href="/login"
                  className="text-violet-500 hover:underline font-medium"
                >
                  {t("auth.registration.login")}
                </a>
              </p>
            )}
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
