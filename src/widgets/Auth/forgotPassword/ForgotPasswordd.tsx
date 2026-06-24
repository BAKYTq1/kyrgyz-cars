import { useState, useEffect, useRef } from "react";
import { useI18n } from "../../../shared/i18n/I18nProvider";
import { useAppDispatch, useAppSelector } from "../../../lib/store";
import { Link } from "react-router-dom";
import logo from "../../../assets/logotip.png";
import {
  requestResetThunk,
  verifyResetThunk,
  confirmResetThunk,
  clearForgotPasswordError,
} from "../../../lib/auth/ForgotPassword";

type Step = "email" | "code" | "newPassword" | "done";

const slides = [
  {
    image:
      "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=1200&q=80",
    author: "Michał Malinowski",
    rating: 5,
    text: "Profesjonalna firma , pełna opieka od zakupu do dostawy pod dom. Polecam",
  },
  {
    image:
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1200&q=80",
    author: "Michał (Misiek)",
    rating: 5,
    text: "Polecam. Na początku się obawiałem ale wszystko jest proste i łatwe kontakt bdb. Corvette już śmiga. Polecam w 100%",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5 mt-1 mb-2">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i <= rating ? "text-white" : "text-gray-500"}`}
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

  return (
    <div className="relative w-full h-full rounded-2xl overflow-hidden">
      {slides.map((slide, index) => (
        <img
          key={index}
          src={slide.image}
          alt="CarDeals Background"
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 select-none"
          style={{ opacity: index === current ? 1 : 0 }}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      <div
        className="absolute bottom-0 left-0 right-0 p-7 transition-opacity duration-500"
        style={{ opacity: visible ? 1 : 0 }}
      >
        <p className="text-white font-bold text-sm tracking-wide">
          {slides[current].author}
        </p>
        <StarRating rating={slides[current].rating} />
        <p className="text-white/90 text-sm leading-relaxed mb-5">
          "{slides[current].text}"
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
              type="button"
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
              type="button"
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

function OtpInput({
  value,
  onChange,
  hasError,
  onComplete,
}: {
  value: string;
  onChange: (v: string) => void;
  hasError?: boolean;
  onComplete?: (code: string) => void;
}) {
  const length = 6;
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const digits = value.split("").slice(0, length);
  while (digits.length < length) digits.push("");

  const focusInput = (index: number) => {
    inputRefs.current[index]?.focus();
  };

  const handleChange = (index: number, raw: string) => {
    const digit = raw.replace(/\D/g, "").slice(-1);
    const newDigits = [...digits];
    newDigits[index] = digit;
    const newValue = newDigits.join("");
    onChange(newValue);

    if (digit && index < length - 1) {
      focusInput(index + 1);
    }

    if (digit && index === length - 1 && newValue.length === length) {
      onComplete?.(newValue);
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace") {
      if (!digits[index] && index > 0) {
        e.preventDefault();
        const newDigits = [...digits];
        newDigits[index - 1] = "";
        onChange(newDigits.join(""));
        focusInput(index - 1);
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      e.preventDefault();
      focusInput(index - 1);
    } else if (e.key === "ArrowRight" && index < length - 1) {
      e.preventDefault();
      focusInput(index + 1);
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "");
    if (!pasted) return;
    const newValue = pasted.slice(0, length);
    onChange(newValue);
    const nextIndex = Math.min(newValue.length, length - 1);
    focusInput(nextIndex);
    if (newValue.length === length) {
      onComplete?.(newValue);
    }
  };

  return (
    <div className="flex gap-2 justify-between">
      {digits.map((digit, index) => (
        <input
          key={index}
          ref={(el) => {
            inputRefs.current[index] = el;
          }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          autoFocus={index === 0}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          className={`w-12 h-12 text-center text-lg font-medium border rounded-xl bg-white focus:outline-none focus:ring-2 transition-all ${
            hasError
              ? "border-red-500 focus:ring-red-200"
              : "border-gray-200 focus:border-blue-400 focus:ring-blue-100"
          }`}
        />
      ))}
    </div>
  );
}

function PasswordInput({
  value,
  onChange,
  placeholder,
  hasError,
  autoFocus,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  hasError?: boolean;
  autoFocus?: boolean;
}) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative">
      <input
        type={visible ? "text" : "password"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoFocus={autoFocus}
        className={`w-full px-4 py-2.5 pr-11 border rounded-xl text-sm bg-white focus:outline-none focus:ring-2 transition-all ${
          hasError
            ? "border-red-500 focus:ring-red-200"
            : "border-gray-200 focus:border-blue-400 focus:ring-blue-100"
        }`}
      />
      <button
        type="button"
        tabIndex={-1}
        onClick={() => setVisible((v) => !v)}
        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
      >
        {visible ? (
          <svg
            className="w-[18px] h-[18px]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        ) : (
          <svg
            className="w-[18px] h-[18px]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 3l18 18" />
            <path d="M10.58 10.58a2 2 0 0 0 2.83 2.83" />
            <path d="M9.88 4.12A9.77 9.77 0 0 1 12 4c6.5 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68M6.61 6.61C4.07 8.36 2 12 2 12s3.5 7 10 7a9.6 9.6 0 0 0 5.39-1.61" />
          </svg>
        )}
      </button>
    </div>
  );
}

export function ForgotPasswordd() {
  const { t } = useI18n();
  const dispatch = useAppDispatch();
  const { loading, error, resetToken } = useAppSelector(
    (state) => state.forgotPassword,
  );

  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fieldError, setFieldError] = useState<string | null>(null);

  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(true);

  const go = (next: number) => {
    setVisible(false);
    setTimeout(() => {
      setCurrent(((next % slides.length) + slides.length) % slides.length);
      setVisible(true);
    }, 400);
  };

  useEffect(() => {
    const timer = setInterval(() => go(current + 1), 6000);
    return () => clearInterval(timer);
  }, [current]);

  const handleSubmitEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.trim()) {
      setFieldError(
        t("auth.forgotPassword.emailRequired") ||
          "Электронная почта обязательна для заполнения",
      );
      return;
    }
    if (!emailRegex.test(email)) {
      setFieldError(
        t("auth.forgotPassword.emailInvalid") ||
          "Введите корректный адрес электронной почты",
      );
      return;
    }

    setFieldError(null);
    const result = await dispatch(requestResetThunk({ email }));
    if (requestResetThunk.fulfilled.match(result)) {
      setStep("code");
    }
  };

  const submitCode = async (codeValue: string) => {
    if (!codeValue || codeValue.length < 6) {
      setFieldError(
        t("auth.forgotPassword.codeRequired") || "Введите код из письма",
      );
      return;
    }

    setFieldError(null);
    const result = await dispatch(verifyResetThunk({ email, code: codeValue }));
    if (verifyResetThunk.fulfilled.match(result)) {
      setStep("newPassword");
    }
  };

  const handleSubmitCode = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitCode(code);
  };

  const handleSubmitNewPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newPassword || !confirmPassword) {
      setFieldError(
        t("auth.forgotPassword.passwordRequired") ||
          "Заполните оба поля пароля",
      );
      return;
    }
    if (newPassword.length < 8) {
      setFieldError(
        t("auth.forgotPassword.passwordTooShort") ||
          "Пароль должен содержать минимум 8 символов",
      );
      return;
    }
    if (newPassword !== confirmPassword) {
      setFieldError(
        t("auth.forgotPassword.passwordMismatch") || "Пароли не совпадают",
      );
      return;
    }
    if (!resetToken) {
      setFieldError(
        t("auth.forgotPassword.tokenMissing") ||
          "Токен сброса не найден, начните заново",
      );
      return;
    }

    setFieldError(null);
    const result = await dispatch(
      confirmResetThunk({
        email,
        token: resetToken,
        new_password: newPassword,
        new_password2: confirmPassword,
      }),
    );
    if (confirmResetThunk.fulfilled.match(result)) {
      setStep("done");
    }
  };

  const handleBack = () => {
    setFieldError(null);
    dispatch(clearForgotPasswordError());
    if (step === "code") setStep("email");
    if (step === "newPassword") setStep("code");
  };

  const displayError = fieldError || error;

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col min-[1100px]:flex-row font-sans selection:bg-blue-500/20">
      <div className="w-full min-[1100px]:w-[52%] min-[1100px]:flex-none flex flex-col bg-white px-5 sm:px-8 py-6 sm:py-7">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <div className="w-[150px] h-11 flex items-center justify-center">
            <img
              src={logo}
              alt="CarDeals"
              className="w-full h-11 object-contain"
            />
          </div>
        </Link>

        <div className="flex-1 flex items-center justify-center pb-8 sm:pb-12">
          <div className="w-full max-w-[420px]">
            <div className="w-12 h-12 sm:w-[52px] sm:h-[52px] rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center mb-5 sm:mb-6 shadow-sm">
              <svg
                className="w-5 h-5 text-[#2563eb]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>

            {step === "email" && (
              <>
                <h1 className="text-lg sm:text-[23px] font-bold text-[#1e293b] tracking-tight mb-2">
                  {t("auth.forgotPassword.title")}
                </h1>
                <p className="text-[#94a3b8] text-xs sm:text-[13.5px] font-medium mb-5 sm:mb-6">
                  {t("auth.forgotPassword.subtitle")}
                </p>

                <form
                  onSubmit={handleSubmitEmail}
                  className="space-y-3 sm:space-y-4"
                >
                  <div>
                    <label className="block text-[12.5px] font-semibold text-[#475569] mb-1.5">
                      {t("auth.forgotPassword.email")}
                      <span className="text-red-500 ml-0.5">*</span>
                    </label>
                    <input
                      type="text"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (displayError) setFieldError(null);
                      }}
                      placeholder={t("auth.forgotPassword.emailPlaceholder")}
                      className={`w-full px-4 py-2.5 border rounded-xl text-sm bg-white focus:outline-none focus:ring-2 transition-all ${
                        displayError
                          ? "border-red-500 focus:ring-red-200"
                          : "border-gray-200 focus:border-blue-400 focus:ring-blue-100"
                      }`}
                    />
                    {displayError && (
                      <p className="text-red-500 text-xs mt-1.5 font-medium">
                        {displayError}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-2.5 bg-[#2563eb] hover:bg-blue-600 active:scale-[0.995] text-white font-medium rounded-xl text-sm shadow-sm transition-all mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {loading
                      ? t("auth.forgotPassword.sending") || "Отправка..."
                      : t("auth.forgotPassword.submit")}
                  </button>
                </form>
              </>
            )}

            {step === "code" && (
              <>
                <h1 className="text-lg sm:text-[23px] font-bold text-[#1e293b] tracking-tight mb-2">
                  {t("auth.forgotPassword.codeTitle") || "Введите код"}
                </h1>
                <p className="text-[#94a3b8] text-xs sm:text-[13.5px] font-medium mb-5 sm:mb-6">
                  {(t("auth.forgotPassword.codeSubtitle") ||
                    "Мы отправили код подтверждения на") + ` ${email}`}
                </p>

                <form
                  onSubmit={handleSubmitCode}
                  className="space-y-3 sm:space-y-4"
                >
                  <div>
                    <label className="block text-[12.5px] font-semibold text-[#475569] mb-1.5">
                      {t("auth.forgotPassword.code") || "Код подтверждения"}
                      <span className="text-red-500 ml-0.5">*</span>
                    </label>
                    <OtpInput
                      value={code}
                      onChange={(v) => {
                        setCode(v);
                        if (displayError) setFieldError(null);
                      }}
                      hasError={!!displayError}
                      onComplete={(fullCode) => submitCode(fullCode)}
                    />
                    {displayError && (
                      <p className="text-red-500 text-xs mt-1.5 font-medium">
                        {displayError}
                      </p>
                    )}
                  </div>

                  <div className="flex gap-2.5">
                    <button
                      type="button"
                      onClick={handleBack}
                      disabled={loading}
                      className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 active:scale-[0.995] text-gray-600 font-medium rounded-xl text-sm transition-all"
                    >
                      {t("auth.forgotPassword.back") || "Назад"}
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-1 py-2.5 bg-[#2563eb] hover:bg-blue-600 active:scale-[0.995] text-white font-medium rounded-xl text-sm shadow-sm transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {loading
                        ? t("auth.forgotPassword.verifying") || "Проверка..."
                        : t("auth.forgotPassword.verifyCode") ||
                          "Подтвердить код"}
                    </button>
                  </div>
                </form>
              </>
            )}

            {step === "newPassword" && (
              <>
                <h1 className="text-lg sm:text-[23px] font-bold text-[#1e293b] tracking-tight mb-2">
                  {t("auth.forgotPassword.newPasswordTitle") || "Новый пароль"}
                </h1>
                <p className="text-[#94a3b8] text-xs sm:text-[13.5px] font-medium mb-5 sm:mb-6">
                  {t("auth.forgotPassword.newPasswordSubtitle") ||
                    "Придумайте новый пароль для входа"}
                </p>

                <form
                  onSubmit={handleSubmitNewPassword}
                  className="space-y-3 sm:space-y-4"
                >
                  <div>
                    <label className="block text-[12.5px] font-semibold text-[#475569] mb-1.5">
                      {t("auth.forgotPassword.newPassword") || "Новый пароль"}
                      <span className="text-red-500 ml-0.5">*</span>
                    </label>
                    <PasswordInput
                      value={newPassword}
                      onChange={(v) => {
                        setNewPassword(v);
                        if (displayError) setFieldError(null);
                      }}
                      placeholder={
                        t("auth.forgotPassword.newPasswordPlaceholder") ||
                        "Введите новый пароль"
                      }
                      hasError={!!displayError}
                      autoFocus
                    />
                  </div>

                  <div>
                    <label className="block text-[12.5px] font-semibold text-[#475569] mb-1.5">
                      {t("auth.forgotPassword.confirmPassword") ||
                        "Подтвердите пароль"}
                      <span className="text-red-500 ml-0.5">*</span>
                    </label>
                    <PasswordInput
                      value={confirmPassword}
                      onChange={(v) => {
                        setConfirmPassword(v);
                        if (displayError) setFieldError(null);
                      }}
                      placeholder={
                        t("auth.forgotPassword.confirmPasswordPlaceholder") ||
                        "Повторите новый пароль"
                      }
                      hasError={!!displayError}
                    />
                    {displayError && (
                      <p className="text-red-500 text-xs mt-1.5 font-medium">
                        {displayError}
                      </p>
                    )}
                  </div>

                  <div className="flex gap-2.5">
                    <button
                      type="button"
                      onClick={handleBack}
                      disabled={loading}
                      className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 active:scale-[0.995] text-gray-600 font-medium rounded-xl text-sm transition-all"
                    >
                      {t("auth.forgotPassword.back") || "Назад"}
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-1 py-2.5 bg-[#2563eb] hover:bg-blue-600 active:scale-[0.995] text-white font-medium rounded-xl text-sm shadow-sm transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {loading
                        ? t("auth.forgotPassword.saving") || "Сохранение..."
                        : t("auth.forgotPassword.savePassword") ||
                          "Сохранить пароль"}
                    </button>
                  </div>
                </form>
              </>
            )}

            {step === "done" && (
              <>
                <h1 className="text-lg sm:text-[23px] font-bold text-[#1e293b] tracking-tight mb-2">
                  {t("auth.forgotPassword.successTitle") || "Готово!"}
                </h1>
                <p className="text-[#94a3b8] text-xs sm:text-[13.5px] font-medium mb-5 sm:mb-6">
                  {t("auth.forgotPassword.successSubtitle") ||
                    "Пароль успешно изменён. Войдите с новым паролем."}
                </p>
                <a
                  href="/login"
                  className="block w-full text-center py-2.5 bg-[#2563eb] hover:bg-blue-600 active:scale-[0.995] text-white font-medium rounded-xl text-sm shadow-sm transition-all"
                >
                  {t("auth.forgotPassword.toLogin") || "Войти"}
                </a>
              </>
            )}

            {step !== "done" && (
              <div className="text-center mt-6 sm:mt-8">
                <a
                  href="/login"
                  className="text-[#94a3b8] hover:text-blue-500 text-[13.5px] font-medium transition-colors"
                >
                  {t("auth.forgotPassword.backToLogin")}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="hidden min-[620px]:flex min-[620px]:h-72 min-[1100px]:h-auto min-[1100px]:flex-1 items-stretch p-4 min-[1100px]:p-4">
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
