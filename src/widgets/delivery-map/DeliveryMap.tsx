import { useState } from "react";
// @ts-ignore - react-simple-maps has no type declarations
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import { FaAnchor, FaHome, FaTruck, FaMapMarkerAlt } from "react-icons/fa";
import { useI18n } from "../../shared/i18n/I18nProvider";

const GEO_URL =
  "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

// Оставляем ключи на английском, так как они приходят из geo.properties.name карты
const homeDeliveryCountries = [
  "Kyrgyzstan",
  "Kazakhstan",
  "Russia",
  "Uzbekistan",
  "Tajikistan",
  "Turkmenistan",
  "Azerbaijan",
  "Georgia",
  "Armenia",
];
const pickupCountries = ["Mongolia", "Belarus", "Ukraine", "Moldova"];

const markers = [
  {
    nameKey: "deliveryMap.markers.bishkek",
    coordinates: [74.5, 42.8] as [number, number],
  },
  {
    nameKey: "deliveryMap.markers.almaty",
    coordinates: [76.9, 43.2] as [number, number],
  },
  {
    nameKey: "deliveryMap.markers.tashkent",
    coordinates: [69.2, 41.3] as [number, number],
  },
  {
    nameKey: "deliveryMap.markers.tbilisi",
    coordinates: [44.8, 41.7] as [number, number],
  },
];

const countriesList = [
  { id: "Kyrgyzstan", flag: "🇰🇬" },
  { id: "Kazakhstan", flag: "🇰🇿" },
  { id: "Russia", flag: "🇷🇺" },
  { id: "Uzbekistan", flag: "🇺🇿" },
  { id: "Tajikistan", flag: "🇹🇯" },
  { id: "Turkmenistan", flag: "🇹🇲" },
  { id: "Azerbaijan", flag: "🇦🇿" },
  { id: "Georgia", flag: "🇬🇪" },
  { id: "Armenia", flag: "🇦🇲" },
];

export default function DeliveryMap() {
  const { t } = useI18n();
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
  const [activeCountry, setActiveCountry] = useState<string | null>(
    "Kyrgyzstan",
  );
  const [tooltip, setTooltip] = useState<{
    x: number;
    y: number;
    name: string;
  } | null>(null);

  const isHomeDelivery = (name: string) => homeDeliveryCountries.includes(name);
  const isPickup = (name: string) => pickupCountries.includes(name);

  const getColor = (name: string) => {
    if (name === activeCountry) return "#7c3aed";
    if (name === hoveredCountry) return "#a78bfa";
    if (isHomeDelivery(name)) return "#c4b5fd";
    if (isPickup(name)) return "#e9d5ff";
    return "#e2e8f0";
  };

  // Получаем данные для боковой панели на основе выбранного ID страны
  const getCountryStaticData = (id: string) => {
    const allFlags: Record<string, string> = {
      Kyrgyzstan: "🇰🇬",
      Kazakhstan: "🇰🇿",
      Russia: "🇷🇺",
      Uzbekistan: "🇺🇿",
      Tajikistan: "🇹🇯",
      Turkmenistan: "🇹🇲",
      Azerbaijan: "🇦🇿",
      Georgia: "🇬🇪",
      Armenia: "🇦🇲",
      Mongolia: "🇲🇳",
      Belarus: "🇧🇾",
      Ukraine: "🇺🇦",
      Moldova: "🇲🇩",
    };
    return {
      flag: allFlags[id] || "🌍",
      name: t(`deliveryMap.countries.${id}`),
      delivery: isHomeDelivery(id)
        ? t("deliveryMap.homeDelivery")
        : t("deliveryMap.pickup"),
      time: t(`deliveryMap.times.${id}`),
    };
  };

  const activeInfo = activeCountry ? getCountryStaticData(activeCountry) : null;

  const pickupLocations = [
    { icon: <FaAnchor />, name: t("deliveryMap.markers.bishkek") },
    { icon: <FaAnchor />, name: t("deliveryMap.markers.almaty") },
    { icon: <FaAnchor />, name: t("deliveryMap.markers.tashkent") },
    { icon: <FaAnchor />, name: t("deliveryMap.markers.tbilisi") },
    {
      icon: <FaHome />,
      name: t("deliveryMap.markers.moscow"),
      note: t("deliveryMap.extraFee"),
    },
  ];

  return (
    <section className="py-12 px-4" style={{ backgroundColor: "#f8fafc" }}>
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">
          {t("deliveryMap.title")}
        </h2>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Левая панель */}
          <div className="md:w-64 shrink-0 flex flex-col gap-4">
            {/* Инфо выбранной страны */}
            {activeCountry && activeInfo && (
              <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">{activeInfo.flag}</span>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">
                      {activeInfo.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {activeInfo.delivery}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-600 bg-violet-50 rounded-lg px-3 py-2">
                  <FaTruck className="text-violet-500" />
                  <span>
                    {t("deliveryMap.deliveryPeriod")}:{" "}
                    <strong>{activeInfo.time}</strong>
                  </span>
                </div>
              </div>
            )}

            {/* Страны доставки */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                {t("deliveryMap.homeDelivery")}
              </p>
              <ul className="space-y-2">
                {countriesList.map((c) => (
                  <li
                    key={c.id}
                    className="flex items-center gap-2 text-sm text-gray-700"
                  >
                    <span className="w-2 h-2 rounded-full bg-violet-500 shrink-0" />
                    <span>{c.flag}</span>
                    {t(`deliveryMap.countries.${c.id}`)}
                  </li>
                ))}
              </ul>
            </div>

            {/* Самовывоз */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                {t("deliveryMap.pickupLocationsTitle")}
              </p>
              <ul className="space-y-2">
                {pickupLocations.map((loc, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-2 text-sm text-gray-600"
                  >
                    <span className="text-violet-400 text-xs">{loc.icon}</span>
                    <span>{loc.name}</span>
                    {loc.note && (
                      <span className="text-gray-400 text-xs">{loc.note}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Карта */}
          <div className="flex-1 relative">
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
              {/* Tooltip */}
              {tooltip &&
                (isHomeDelivery(tooltip.name) || isPickup(tooltip.name)) && (
                  <div
                    className="absolute z-20 bg-gray-900 text-white text-xs px-3 py-2 rounded-lg pointer-events-none shadow-lg"
                    style={{ left: tooltip.x + 10, top: tooltip.y - 10 }}
                  >
                    <div className="flex items-center gap-1">
                      <FaMapMarkerAlt className="text-violet-400" />
                      {t(`deliveryMap.countries.${tooltip.name}`)}
                    </div>
                    <div className="text-gray-300 mt-0.5">
                      {isHomeDelivery(tooltip.name)
                        ? t("deliveryMap.homeDelivery")
                        : t("deliveryMap.pickup")}
                    </div>
                  </div>
                )}

              <ComposableMap
                projection="geoMercator"
                projectionConfig={{ center: [65, 45], scale: 350 }}
                style={{ width: "100%", height: "660px" }}
              >
                <Geographies geography={GEO_URL}>
                  {({ geographies }: { geographies: any[] }) =>
                    geographies.map((geo: any) => {
                      const name = geo.properties.name;
                      const hasDelivery =
                        isHomeDelivery(name) || isPickup(name);
                      return (
                        <Geography
                          key={geo.rsmKey}
                          geography={geo}
                          fill={getColor(name)}
                          stroke="#fff"
                          strokeWidth={0.5}
                          style={{
                            default: { outline: "none" },
                            hover: {
                              outline: "none",
                              cursor: hasDelivery ? "pointer" : "default",
                            },
                            pressed: { outline: "none" },
                          }}
                          onMouseEnter={(
                            e: React.MouseEvent<SVGPathElement>,
                          ) => {
                            setHoveredCountry(name);
                            setTooltip({
                              x: e.nativeEvent.offsetX,
                              y: e.nativeEvent.offsetY,
                              name,
                            });
                          }}
                          onMouseMove={(
                            e: React.MouseEvent<SVGPathElement>,
                          ) => {
                            setTooltip({
                              x: e.nativeEvent.offsetX,
                              y: e.nativeEvent.offsetY,
                              name,
                            });
                          }}
                          onMouseLeave={() => {
                            setHoveredCountry(null);
                            setTooltip(null);
                          }}
                          onClick={() => {
                            if (hasDelivery) {
                              setActiveCountry(name);
                            }
                          }}
                        />
                      );
                    })
                  }
                </Geographies>

                {/* Маркеры городов */}
                {markers.map((m, i) => (
                  <Marker key={i} coordinates={m.coordinates}>
                    <circle
                      r={4}
                      fill="#7c3aed"
                      stroke="#fff"
                      strokeWidth={1.5}
                    />
                    <text
                      textAnchor="middle"
                      y={-8}
                      style={{
                        fontSize: "10px",
                        fill: "#4c1d95",
                        fontWeight: 600,
                      }}
                    >
                      {t(m.nameKey)}
                    </text>
                  </Marker>
                ))}
              </ComposableMap>
            </div>

            {/* Легенда */}
            <div className="flex gap-4 mt-3 text-xs text-gray-500 flex-wrap">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-violet-300 inline-block" />
                {t("deliveryMap.homeDelivery")}
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-violet-200 inline-block" />
                {t("deliveryMap.pickup")}
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-violet-600 inline-block" />
                {t("deliveryMap.legendActive")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
