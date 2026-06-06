import { useState, useEffect } from "react";

// Данные для слайдшоу с отзывами клиентов
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

export function ForgotPasswordd() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);

  // Состояния для слайдшоу
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(true);

  const handleNextSlide = (next: number) => {
    setVisible(false);
    setTimeout(() => {
      setCurrent(((next % slides.length) + slides.length) % slides.length);
      setVisible(true);
    }, 400);
  };

  useEffect(() => {
    const timer = setInterval(() => handleNextSlide(current + 1), 6000);
    return () => clearInterval(timer);
  }, [current]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      setError("Электронная почта обязательна для заполнения");
    } else if (!emailRegex.test(email)) {
      setError("Введите корректный адрес электронной почты");
    } else {
      setError(null);
      // Логика отправки ссылки восстановления пароля
      console.log("Ссылка для сброса отправлена на:", email);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col lg:flex-row font-sans selection:bg-blue-500/20">
      {/* ── ЛЕВАЯ СТОРОНА (ФОРМА) ── */}
      <div className="flex-none lg:w-[49%] flex flex-col bg-[#f8fafc] px-8 py-7">
        {/* Логотип BIDCARS */}
        <div className="flex items-center gap-2 mb-14">
          <div className="w-8 h-8 bg-[#2563eb] rounded-lg flex items-center justify-center shrink-0 shadow-sm shadow-blue-500/20">
            <svg
              className="w-4 h-4 text-white transform -rotate-12"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
              />
            </svg>
          </div>
          <span className="text-xl font-black text-[#1e293b] tracking-wider font-mono">
            BIDCARS
          </span>
        </div>

        {/* Контент формы восстановления */}
        <div className="flex-1 flex items-center justify-center pb-12">
          <div className="w-full max-w-[420px]">
            {/* Синяя иконка замочка */}
            <div className="w-[52.5px] h-[52.5px] rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center mb-6 shadow-sm">
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

            <h1 className="text-[23px] font-bold text-[#1e293b] tracking-tight mb-2">
              Забыли пароль / Повторно отправить письмо активации?
            </h1>
            <p className="text-[#94a3b8] text-[13.5px] font-medium mb-6">
              Введите адрес вашей электронной почты ниже, чтобы получить ссылку
              для сброса пароля.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[12.5px] font-semibold text-[#475569] mb-1.5">
                  Электронная почта
                  <span className="text-red-500 ml-0.5">*</span>
                </label>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError(null);
                  }}
                  placeholder="Введите вашу электронную почту"
                  className={`w-full px-4 py-2.5 border rounded-xl text-[14px] bg-white focus:outline-none focus:ring-2 transition-all ${
                    error
                      ? "border-red-500 focus:ring-red-200"
                      : "border-gray-200 focus:border-blue-400 focus:ring-blue-100"
                  }`}
                />
                {error && (
                  <p className="text-red-500 text-xs mt-1.5 font-medium">
                    {error}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-[#2563eb] hover:bg-blue-600 active:scale-[0.995] text-white font-medium rounded-xl text-[14px] shadow-sm transition-all mt-2"
              >
                Отправить ссылку для сброса
              </button>
            </form>

            <div className="text-center mt-8">
              <a
                href="/login"
                className="text-[#94a3b8] hover:text-blue-500 text-[13.5px] font-medium transition-colors"
              >
                Вернуться к входу
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── ПРАВАЯ СТОРОНА (КОНТЕЙНЕРЫ И АВТО) ── */}
      <div className="hidden lg:flex flex-1 p-4 bg-[#f8fafc]">
        <div className="relative w-full h-full rounded-[24px] overflow-hidden shadow-sm">
          {slides.map((slide, index) => (
            <img
              key={index}
              src={slide.image}
              alt="BidCars Background"
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 select-none"
              style={{ opacity: index === current ? 1 : 0 }}
            />
          ))}

          {/* Затемняющий градиент снизу */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Плашка с отзывом клиента */}
          <div
            className="absolute bottom-0 left-0 right-0 p-8 text-white transition-opacity duration-400"
            style={{ opacity: visible ? 1 : 0 }}
          >
            <p className="text-[13.5px] font-bold tracking-wide opacity-90">
              {slides[current].author}
            </p>
            <StarRating rating={slides[current].rating} />
            <p className="text-[14px] leading-relaxed font-normal text-white/95 max-w-[580px] mt-2 mb-6">
              "{slides[current].text}"
            </p>

            <div className="flex items-center justify-between border-t border-white/10 pt-4">
              {/* Пометка Google */}
              <div className="flex items-center gap-1.5 text-white/50 text-[11.5px] font-medium">
                <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24">
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
                Опубликовано в <span className="underline">Google</span>
              </div>

              {/* Стрелочки навигации слайдера */}
              <div className="flex gap-2.5">
                <button
                  type="button"
                  onClick={() => handleNextSlide(current - 1)}
                  className="w-[34px] h-[34px] rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 active:scale-95 transition-all"
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
                </button>
                <button
                  type="button"
                  onClick={() => handleNextSlide(current + 1)}
                  className="w-[34px] h-[34px] rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 active:scale-95 transition-all"
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
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
