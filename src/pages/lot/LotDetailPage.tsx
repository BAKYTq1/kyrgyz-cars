import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  FaCar,
  FaClock,
  FaMapMarkerAlt,
  FaFileAlt,
  FaShieldAlt,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../../lib/store";
import { fetchLotById } from "../../lib/lot/lotSlice";
import { useI18n } from "../../shared/i18n/I18nProvider";
import { CountdownTimer } from "../../shared/ui/countdown/Countdown";
import HowItWorksPage from "../../widgets/how-it-works/HowItWorksPage";

const transmissionMap: Record<number, string> = {
  0: "—",
  1: "Автомат",
  2: "Механика",
  3: "CVT",
};
const driveMap: Record<number, string> = {
  0: "—",
  1: "FWD",
  2: "RWD",
  3: "AWD",
  4: "4WD",
};
const fuelMap: Record<string, string> = {
  "0": "—",
  "1": "Бензин",
  "2": "Дизель",
  "3": "Гибрид",
  "4": "Электро",
};

export default function LotDetailPage() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { t } = useI18n();
  const {
    currentLot: car,
    loading,
    error,
  } = useAppSelector((state) => state.lots);
  const [activeImage, setActiveImage] = useState(0);
  const [bidAmount, setBidAmount] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    if (id) dispatch(fetchLotById(Number(id)));
  }, [id]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-10 h-10 border-4 border-violet-500 border-t-transparent rounded-full" />
      </div>
    );

  if (error || !car)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Лот не найден
      </div>
    );

  const auction: "Copart" | "IAAI" = car.lot.startsWith("1-")
    ? "Copart"
    : "IAAI";
  const images = Object.values(car.img_large ?? car.img).filter(
    Boolean,
  ) as string[];
  const buyNow =
    car.buy_now_price && Number(car.buy_now_price) > 0
      ? Number(car.buy_now_price)
      : null;

  const formatTime = (seconds: number) => {
    const d = Math.floor(seconds / 86400);
    const h = Math.floor((seconds % 86400) / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    return `${d}д ${h}ч ${m}м`;
  };

  const specs = [
    {
      label: "Пробег",
      value: car.odometer_substr
        ? `${car.odometer_substr.toLocaleString()} mi`
        : `${car.odometer.toLocaleString()} mi`,
    },
    { label: "Двигатель", value: car.specs.engine_rendered || "—" },
    { label: "КПП", value: transmissionMap[car.specs.transmission] ?? "—" },
    { label: "Привод", value: driveMap[car.specs.drive_type] ?? "—" },
    { label: "Топливо", value: fuelMap[car.specs.fuel_type] ?? "—" },
    { label: "Ключи", value: car.specs.key_info || "—" },
    { label: "Повреждения", value: car.primary_damage || "—" },
    { label: "Тип ущерба", value: car.loss_type || "—" },
    { label: "Локация", value: car.location || "—" },
    { label: "Продавец", value: car.seller_long ?? car.seller },
    {
      label: "Документ",
      value: car.sale_document_external ?? car.sale_document ?? "—",
    },
    { label: "VIN", value: car.vin },
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-4 px-4">
      <div className="max-w-[1240px] mx-auto">
        {/* Хлебные крошки */}
        <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-3">
          <span
            onClick={() => navigate("/")}
            className="hover:text-violet-500 cursor-pointer"
          >
            Главная
          </span>
          <span>/</span>
          <span
            onClick={() => navigate("/catalog")}
            className="hover:text-violet-500 cursor-pointer"
          >
            Каталог
          </span>
          <span>/</span>
          <span className="text-gray-600 truncate">{car.name}</span>
        </div>

        {/* Заголовок */}
        <div className="flex items-start justify-between flex-wrap gap-2 mb-4">
          <div>
            <h1 className="text-xl font-black text-gray-900">
              {car.name_long}
            </h1>
            <div className="flex items-center gap-2 mt-1.5">
              <span
                className={`text-xs font-bold px-2.5 py-1 rounded-md text-white ${auction === "Copart" ? "bg-violet-600" : "bg-red-500"}`}
              >
                {auction}
              </span>
              <span className="text-xs bg-green-100 text-green-700 px-2.5 py-1 rounded-md font-medium">
                {t("lotCard.auctionOpen")}
              </span>
              <span className="text-xs text-gray-400">#{car.lot}</span>
            </div>
          </div>
          {car.time_left && (
            <div className="flex items-center gap-2 text-orange-500 bg-orange-50 px-3 py-2 rounded-lg border border-orange-100">
              <FaClock className="text-sm shrink-0" />
              <CountdownTimer seconds={Number(car.time_left)} />
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Левая колонка */}
          <div className="lg:col-span-2 space-y-4">
            {/* Фото галерея */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
              <div className="relative group">
                <img
                  src={images[activeImage]}
                  alt={car.name}
                  className="w-full h-72 sm:h-96 object-cover"
                />
                {images.length > 1 && (
                  <>
                    <button
                      onClick={() =>
                        setActiveImage(
                          (p) => (p - 1 + images.length) % images.length,
                        )
                      }
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                    >
                      <FaChevronLeft />
                    </button>
                    <button
                      onClick={() =>
                        setActiveImage((p) => (p + 1) % images.length)
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                    >
                      <FaChevronRight />
                    </button>
                    <div className="absolute bottom-3 right-3 bg-black/50 text-white text-xs px-2 py-1 rounded-md">
                      {activeImage + 1} / {images.length}
                    </div>
                  </>
                )}
                {/* Бейджи видео/360 */}
                <div className="absolute top-3 left-3 flex gap-1.5">
                  {car.has_video && (
                    <span className="text-xs bg-black/60 text-white px-2 py-0.5 rounded-md">
                      ▶ Видео
                    </span>
                  )}
                  {car.has_360_view && (
                    <span className="text-xs bg-black/60 text-white px-2 py-0.5 rounded-md">
                      360°
                    </span>
                  )}
                </div>
              </div>

              {/* Миниатюры */}
              <div className="flex gap-2 p-3 overflow-x-auto scrollbar-hide">
                {images.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt=""
                    onClick={() => setActiveImage(i)}
                    className={`w-20 h-14 object-cover rounded-lg cursor-pointer shrink-0 border-2 transition ${
                      activeImage === i
                        ? "border-violet-500"
                        : "border-transparent hover:border-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Характеристики */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <h2 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                <FaCar className="text-violet-500" /> Характеристики
              </h2>
              <div className="divide-y divide-gray-50">
                {specs.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between py-2.5"
                  >
                    <span className="text-xs text-gray-400 w-36 shrink-0">
                      {item.label}
                    </span>
                    <span className="text-xs font-semibold text-gray-800 text-right">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Документы */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <h2 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                <FaFileAlt className="text-violet-500" /> Документы и
                особенности
              </h2>
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div className="bg-gray-50 rounded-xl p-3">
                  <p className="text-xs text-gray-400 mb-0.5">Номер лота</p>
                  <p className="text-sm font-semibold text-gray-800">
                    {car.lot}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-xl p-3">
                  <p className="text-xs text-gray-400 mb-0.5">VIN</p>
                  <p className="text-sm font-semibold text-gray-800 font-mono break-all">
                    {car.vin}
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {car.seller_trusted && (
                  <span className="flex items-center gap-1 text-xs bg-violet-50 text-violet-700 px-3 py-1 rounded-full border border-violet-100">
                    <FaShieldAlt /> Надёжный продавец
                  </span>
                )}
                {car.has_video && (
                  <span className="flex items-center gap-1 text-xs bg-violet-50 text-violet-700 px-3 py-1 rounded-full border border-violet-100">
                    <FaShieldAlt /> Есть видео
                  </span>
                )}
                {car.has_360_view && (
                  <span className="flex items-center gap-1 text-xs bg-green-50 text-violet-700 px-3 py-1 rounded-full border border-green-100">
                    <FaShieldAlt /> 360° вид
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Правая колонка — ставка */}
          <div>
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 sticky top-4 space-y-4">
              {/* Текущая ставка */}
              <div>
                <p className="text-xs text-gray-400 mb-1">
                  {t("lotCard.currentBid")}
                </p>
                <p className="text-3xl font-black text-gray-900">
                  {car.final_bid_formatted ?? car.prebid_price}
                </p>
                {car.estimated_min > 0 && (
                  <p className="text-xs text-gray-400 mt-1">
                    Оценка: ${car.estimated_min.toLocaleString()} — $
                    {car.estimated_max.toLocaleString()}
                  </p>
                )}
              </div>

              {/* Купить сейчас */}
              {buyNow && (
                <div className="p-3 bg-violet-50 rounded-xl border border-violet-100">
                  <p className="text-xs text-gray-500 mb-0.5">
                    {t("lotCard.buyNow")}
                  </p>
                  <p className="text-2xl font-black text-violet-600">
                    ${buyNow.toLocaleString()}
                  </p>
                </div>
              )}

              {/* Таймер */}
              {car.time_left && (
                <div className="flex items-center gap-2 text-orange-500 text-sm font-semibold">
                  <FaClock />
                  <span>До конца: {formatTime(Number(car.time_left))}</span>
                </div>
              )}

              {/* Форма ставки */}
              <div>
                <label className="text-xs text-gray-500 mb-1.5 block">
                  Ваша ставка
                </label>
                <input
                  type="number"
                  value={bidAmount}
                  onChange={(e) => setBidAmount(e.target.value)}
                  placeholder="$0"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none focus:border-violet-500 transition mb-2"
                />
                <button className="w-full bg-violet-600 hover:bg-violet-700 text-white font-bold py-3 rounded-xl transition">
                  Поставить ставку
                </button>
              </div>

              {buyNow && (
                <button className="w-full border-2 border-violet-600 text-violet-600 hover:bg-violet-50 font-bold py-3 rounded-xl transition">
                  Купить за ${buyNow.toLocaleString()}
                </button>
              )}

              {/* Локация */}
              <div className="flex items-center gap-2 text-xs text-gray-500 pt-3 border-t border-gray-100">
                <FaMapMarkerAlt className="text-violet-500 shrink-0" />
                <span>{car.location}</span>
              </div>

              {/* Продавец */}
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>Продавец</span>
                <span
                  className={`font-medium ${car.seller_trusted ? "text-violet-700" : "text-gray-700"}`}
                >
                  {car.seller_long ?? car.seller}
                  {car.seller_trusted && " ✓"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <HowItWorksPage />
    </div>
  );
}
