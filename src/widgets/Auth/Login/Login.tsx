import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useI18n } from "../../../shared/i18n/I18nProvider";
import { useAppDispatch, useAppSelector } from "../../../lib/store";
import { loginThunk, clearError } from "../../../lib/auth/Login";
import { Link } from "react-router-dom";
import logo from "../../../assets/logotip.png";

const slides = [
  {
    image:
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=900&q=80",
    name: "PIOTR JASICA",
    rating: 3,
    text: "To kolejny samochód sprowadzony z USA, ale pierwszy przez firmę CarDeals, dlatego mając porównanie mogę szczerze polecić. Pełen profesjonalizm od pierwszego kontaktu do momentu dostarczenia pojazdu, na bieżąco informacje mailowe o statusie transakcji, również kontakt telefoniczny na najwyższym poziom...",
  },
  {
    image:
      "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=900&q=80",
    name: "АЗАМАТ БАКЫТБЕК",
    rating: 5,
    text: "Отличный сервис! Купил Toyota Camry через CarDeals — всё прозрачно, доставка точно в срок. Менеджеры всегда на связи, объясняли каждый шаг. Буду рекомендовать всем друзьям.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=900&q=80",
    name: "НУРЛАН ЫСМАИЛОВ",
    rating: 4,
    text: "Пользуюсь уже второй раз. Первый раз взял Honda Accord, сейчас заказал BMW. Всё чётко, ставки удобные, поддержка работает быстро. Цены ниже рынка — реально выгодно.",
  },
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

export function Login() {
  const { t } = useI18n();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useAppSelector((s) => s.auth);

  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [showPass, setShowPass] = useState(false);

  // Редирект если уже авторизован — в личный кабинет
  useEffect(() => {
    if (isAuthenticated) navigate("/account");
  }, [isAuthenticated]);

  // Чистим ошибку при размонтировании
  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, []);

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

  const handleSubmit = async () => {
    if (!email.trim() || !password.trim()) return;
    dispatch(loginThunk({ email: email.trim(), password }));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col min-[1100px]:flex-row">
      {/* ═══ Левая часть — форма ═══ */}
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
              href="/registration"
              title={t("auth.login.register")}
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-blue-100 flex items-center justify-center mb-5 sm:mb-7 hover:bg-blue-200 active:scale-95 transition-all cursor-pointer"
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
              {t("auth.login.title")}
            </h1>
            <p className="text-gray-400 text-sm mb-5 sm:mb-7">
              {t("auth.login.subtitle")}
            </p>

            {/* ── Ошибка от сервера ── */}
            {error && (
              <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600">
                {error}
              </div>
            )}

            <div className="space-y-3 sm:space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  {t("auth.login.email")}{" "}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                  placeholder={t("auth.login.emailPlaceholder")}
                  disabled={loading}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white placeholder-gray-300 disabled:opacity-60"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  {t("auth.login.password")}{" "}
                  <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showPass ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                    placeholder={t("auth.login.passwordPlaceholder")}
                    disabled={loading}
                    className="w-full px-4 py-2.5 pr-11 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white placeholder-gray-300 disabled:opacity-60"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPass ? (
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
              </div>

              <label className="flex items-center gap-2.5 cursor-pointer select-none w-fit pt-1">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 accent-blue-500"
                />
                <span className="text-sm text-gray-600">
                  {t("auth.login.remember")}
                </span>
              </label>

              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading || !email.trim() || !password.trim()}
                className="w-full py-3 bg-blue-500 hover:bg-blue-600 active:scale-[0.99] text-white font-semibold rounded-xl transition-all text-sm mt-1 disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100 flex items-center justify-center gap-2"
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
                {loading ? t("auth.login.loading") : t("auth.login.submit")}
              </button>
            </div>

            <p className="text-center text-sm text-gray-400 mt-5 sm:mt-6">
              <a
                href="/forgotpassword"
                className="hover:text-blue-500 transition-colors"
              >
                {t("auth.login.forgotPassword")}
              </a>
            </p>
            <p className="text-center text-sm text-gray-400 mt-16 sm:mt-20">
              {t("auth.login.noAccount")}{" "}
              <a
                href="/registration"
                className="text-blue-500 hover:underline font-medium"
              >
                {t("auth.login.register")}
              </a>
            </p>
          </div>
        </div>
      </div>

      <div className="hidden min-[620px]:flex min-[620px]:h-72 min-[1100px]:h-auto min-[1100px]:flex-1 items-stretch p-4 min-[1100px]:p-5">
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
