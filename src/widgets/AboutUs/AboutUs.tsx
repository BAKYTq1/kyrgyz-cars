// Массив с данными для галереи.
const galleryImages = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=600",
    alt: "Офис и компьютеры для заказа авто",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=600",
    alt: "Грузовые автомобили автовозы BidCars",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1542282088-fe8426682b8f?auto=format&fit=crop&q=80&w=600",
    alt: "Презентация спорткара на выставке",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=600",
    alt: "Погрузка автомобилей в морской контейнер",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=600",
    alt: "Транспортировка легковых машин",
  },
];

export function AboutUs() {
  return (
    <section className="w-full max-w-[1440px] mx-auto px-4 py-8 md:px-8 font-sans bg-gray-150">
      {/* Верхняя панель: Заголовок и Кнопка */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 md:mb-8">
        <h2 className="text-xl md:text-2xl lg:text-[26px] font-semibold text-slate-900 tracking-tight">
          Мы осуществляем погрузку, выгрузку и транспортировку контейнеров
        </h2>

        <a
          href="#about"
          className="inline-flex items-center justify-center px-5 py-2.5 bg-[#1488e4] hover:bg-[#1070bd] text-white font-medium text-sm rounded-full transition-colors duration-200 shrink-0 self-start sm:self-auto group"
        >
          О нас
          {/* Иконка стрелочки > */}
          <svg
            className="w-3 h-3 ml-1.5 transform group-hover:translate-x-0.5 transition-transform"
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
        </a>
      </div>

      {/* Адаптивная сетка изображений: grid-cols-2 по умолчанию для мобильных */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4 lg:gap-3">
        {galleryImages.map((image) => (
          <div
            key={image.id}
            className="relative aspect-[3/4] md:aspect-[3/5] lg:h-[420px] w-full overflow-hidden rounded-xl shadow-sm"
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </section>
  );
}