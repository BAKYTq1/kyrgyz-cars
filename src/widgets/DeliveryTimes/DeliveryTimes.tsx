import { useEffect, useCallback, useState } from "react";
import { useI18n } from "../../shared/i18n/I18nProvider"; // поправь путь под свой проект

// ─── Types ───────────────────────────────────────────────────────────────────
interface TerminalMeta {
  id: string;
  tz: string;
  lat: number;
  lon: number;
}

interface WeatherData {
  temp: number | null;
  humidity: number | null;
  wind: number | null;
  wmo: number | null;
}

// ─── Constants ───────────────────────────────────────────────────────────────
const TERMINAL_META: TerminalMeta[] = [
  { id: "ny", tz: "America/New_York", lat: 40.6413, lon: -74.006 },
  { id: "sv", tz: "America/New_York", lat: 32.0835, lon: -81.0998 },
  { id: "hs", tz: "America/Chicago", lat: 29.7604, lon: -95.3698 },
  { id: "la", tz: "America/Los_Angeles", lat: 33.7361, lon: -118.2639 },
  { id: "in", tz: "America/Indiana/Indianapolis", lat: 39.7684, lon: -86.1581 },
  { id: "rt", tz: "Europe/Amsterdam", lat: 51.9225, lon: 4.4792 },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────
function getLocalTime(tz: string): string {
  try {
    return new Intl.DateTimeFormat("ru-RU", {
      timeZone: tz,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    }).format(new Date());
  } catch {
    return "--:--:--";
  }
}

function getFormattedNow(): string {
  return new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date());
}

function getWmoDescription(
  wmo: number | null,
  t: (k: string) => string,
): string {
  if (wmo === null) return "—";
  if (wmo === 0) return t("deliveryTimes.wmo.clear");
  if (wmo <= 3) return t("deliveryTimes.wmo.partlyCloudy");
  if (wmo <= 49) return t("deliveryTimes.wmo.fog");
  if (wmo <= 59) return t("deliveryTimes.wmo.drizzle");
  if (wmo <= 69) return t("deliveryTimes.wmo.rain");
  if (wmo <= 79) return t("deliveryTimes.wmo.snow");
  if (wmo <= 99) return t("deliveryTimes.wmo.thunderstorm");
  return "—";
}

// ─── Weather fetcher ─────────────────────────────────────────────────────────
const weatherCache: Record<string, WeatherData> = {};

async function fetchWeatherForTerminal(
  terminal: TerminalMeta,
): Promise<WeatherData> {
  if (weatherCache[terminal.id]) return weatherCache[terminal.id];
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${terminal.lat}&longitude=${terminal.lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&wind_speed_unit=kmh`;
    const response = await fetch(url);
    const data = await response.json();
    const current = data.current;
    const result: WeatherData = {
      temp: Math.round(current.temperature_2m),
      humidity: current.relative_humidity_2m,
      wind: Math.round(current.wind_speed_10m),
      wmo: current.weather_code,
    };
    weatherCache[terminal.id] = result;
    return result;
  } catch {
    return { temp: null, humidity: null, wind: null, wmo: null };
  }
}

// ─── CheckIcon ───────────────────────────────────────────────────────────────
function CheckIcon() {
  return (
    <svg
      className="w-5 h-5 text-green-500 flex-shrink-0"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <polyline points="9 12 11 14 15 10" />
    </svg>
  );
}

// ─── TerminalCard ─────────────────────────────────────────────────────────────
function TerminalCard({
  terminal,
  t,
}: {
  terminal: TerminalMeta;
  t: (k: string) => string;
}) {
  const [localTime, setLocalTime] = useState(() => getLocalTime(terminal.tz));
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  // Live clock
  useEffect(() => {
    const tick = setInterval(
      () => setLocalTime(getLocalTime(terminal.tz)),
      1000,
    );
    return () => clearInterval(tick);
  }, [terminal.tz]);

  // Fetch weather once
  useEffect(() => {
    setLoading(true);
    fetchWeatherForTerminal(terminal).then((data) => {
      setWeather(data);
      setLoading(false);
    });
  }, [terminal]);

  const wDesc = weather ? getWmoDescription(weather.wmo, t) : "—";
  const name = t(`deliveryTimes.terminals.${terminal.id}.name`);
  const status = t(`deliveryTimes.terminals.${terminal.id}.status`);

  // Build steps array from translations
  const steps = Array.from({ length: 4 }, (_, i) => ({
    label: t(`deliveryTimes.steps.${i}.label`),
    days: t(`deliveryTimes.steps.${i}.days`),
  }));

  return (
    <div
      id={`terminal-${terminal.id}`}
      className="border border-gray-200 rounded-xl bg-white mb-6 overflow-hidden"
    >
      {/* Terminal header */}
      <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100">
        <div>
          <span className="text-base font-semibold text-gray-900">{name}</span>
          <span className="text-xs text-gray-400 ml-2">
            ({t("deliveryTimes.localTime")} {localTime})
          </span>
        </div>
        <span className="bg-green-500 text-white text-xs font-semibold px-4 py-1.5 rounded-full">
          {t("deliveryTimes.working")}
        </span>
      </div>

      {/* Weather grid */}
      <div className="grid grid-cols-3 gap-0 border-b border-gray-100">
        {/* Temperature */}
        <div className="p-5 border-r border-gray-100">
          <p className="text-xs text-gray-400 mb-3">
            {t("deliveryTimes.weatherToday")}
          </p>
          {loading ? (
            <p className="text-3xl font-light text-gray-700 animate-pulse">
              ...
            </p>
          ) : (
            <>
              <p className="text-3xl font-light text-gray-800">
                {weather?.temp != null ? `${weather.temp}°C` : "—"}
              </p>
              <p className="text-xs text-gray-400 mt-1">{wDesc}</p>
            </>
          )}
        </div>

        {/* Humidity / wind */}
        <div className="p-5 border-r border-gray-100">
          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="text-sm text-gray-500">
              {t("deliveryTimes.humidity")}
            </span>
            <span className="text-sm font-medium text-gray-800">
              {loading
                ? "..."
                : weather?.humidity != null
                  ? `${weather.humidity}%`
                  : "—"}
            </span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="text-sm text-gray-500">
              {t("deliveryTimes.windSpeed")}
            </span>
            <span className="text-sm font-medium text-gray-800">
              {loading
                ? "..."
                : weather?.wind != null
                  ? `${weather.wind} km/h`
                  : "—"}
            </span>
          </div>
          <div className="flex justify-between items-center py-2">
            <span className="text-sm text-gray-500">
              {t("deliveryTimes.weatherAlert")}
            </span>
            <span className="text-sm text-gray-400">-</span>
          </div>
        </div>

        {/* Status text */}
        <div className="p-5">
          <p className="text-xs text-gray-400 mb-2">
            {t("deliveryTimes.currentStatus")}
          </p>
          <p className="text-sm text-gray-700 leading-relaxed">{status}</p>
        </div>
      </div>

      {/* Delivery steps */}
      <div className="px-6">
        {steps.map((step, i) => (
          <div
            key={i}
            className="flex justify-between items-center py-3.5 border-b border-gray-100 last:border-0"
          >
            <span className="text-sm text-gray-800 pr-4">{step.label}</span>
            <div className="flex items-center gap-2 flex-shrink-0">
              <span className="text-sm font-medium text-gray-800 whitespace-nowrap">
                {step.days}
              </span>
              <CheckIcon />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export function DeliveryTimes() {
  const { t } = useI18n();
  const [updatedAt, setUpdatedAt] = useState(getFormattedNow());
  const [activeTab, setActiveTab] = useState("ny");

  // Refresh updated-at every minute
  useEffect(() => {
    const id = setInterval(() => setUpdatedAt(getFormattedNow()), 60_000);
    return () => clearInterval(id);
  }, []);

  // Clear weather cache every 10 min
  useEffect(() => {
    const id = setInterval(() => {
      Object.keys(weatherCache).forEach((k) => delete weatherCache[k]);
    }, 10 * 60_000);
    return () => clearInterval(id);
  }, []);

  // Scroll to terminal section
  const scrollToTerminal = useCallback((id: string) => {
    setActiveTab(id);
    const el = document.getElementById(`terminal-${id}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  return (
    <div className="font-sans bg-gray-50 min-h-screen">
      {/* ── Hero ── */}
      <div
        className="relative bg-cover bg-center py-16 px-6 text-center"
        style={{
          backgroundImage:
            "linear-gradient(rgba(10,18,36,0.58), rgba(10,18,36,0.72)), url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1400&q=80')",
        }}
      >
        <h1 className="text-white text-2xl font-bold mb-2 tracking-tight">
          {t("deliveryTimes.title")}
        </h1>
        <p className="text-white/65 text-sm mb-8">
          {t("deliveryTimes.subtitle")}
        </p>

        {/* Terminal nav pills */}
        <div className="flex flex-wrap gap-2 justify-center">
          {TERMINAL_META.map((tm) => (
            <button
              key={tm.id}
              onClick={() => scrollToTerminal(tm.id)}
              className={[
                "px-4 py-1.5 rounded-full text-sm transition-all cursor-pointer",
                activeTab === tm.id
                  ? "bg-white text-gray-900 font-semibold"
                  : "bg-transparent text-white border border-white/40 hover:bg-white/15",
              ].join(" ")}
            >
              {t(`deliveryTimes.terminals.${tm.id}.name`)}
            </button>
          ))}
        </div>
      </div>

      {/* ── Content ── */}
      <div className="max-w-5xl mx-auto px-4 py-6">
        {/* Updated-at / Status bar */}
        <div className="flex justify-between items-center mb-5">
          <span className="text-xs text-gray-400">
            {t("deliveryTimes.updated")} {updatedAt}
          </span>
          <span className="text-xs text-gray-400">
            {t("deliveryTimes.status")}
          </span>
        </div>

        {/* All terminals rendered at once */}
        {TERMINAL_META.map((tm) => (
          <TerminalCard key={tm.id} terminal={tm} t={t} />
        ))}
      </div>
    </div>
  );
}
