"use client";

import { useState } from "react";
import { useI18n } from "../../shared/i18n/I18nProvider"; // Скорректируйте путь к вашему провайдеру локализации

type Tab = "Automobiles" | "Motorcycles" | "ATVs";

const automobiles = [
  { name: "Acura" },
  { name: "Alfa Romeo" },
  { name: "Aston Martin" },
  { name: "Audi" },
  { name: "Bentley" },
  { name: "BMW" },
  { name: "Cadillac" },
  { name: "Chevrolet" },
  { name: "Chrysler" },
  { name: "Dodge" },
  { name: "Ferrari" },
  { name: "Fiat" },
  { name: "Ford" },
  { name: "GMC" },
  { name: "Honda" },
  { name: "Hyundai" },
  { name: "Infiniti" },
  { name: "Jaguar" },
  { name: "Jeep" },
  { name: "KIA" },
  { name: "Lamborghini" },
  { name: "Land Rover" },
  { name: "Lexus" },
  { name: "Maybach" },
  { name: "Mazda" },
  { name: "Mclaren" },
  { name: "Mercedes-Benz" },
  { name: "Mini" },
  { name: "Mitsubishi" },
  { name: "Nissan" },
  { name: "Porsche" },
  { name: "Renault" },
  { name: "Rolls-Royce" },
  { name: "Smart" },
  { name: "Subaru" },
  { name: "Suzuki" },
  { name: "Tesla" },
  { name: "Toyota" },
  { name: "Volkswagen" },
  { name: "Volvo" },
];

const motorcycles = [
  { name: "Aprilia Motorcycle" },
  { name: "BMW Motorcycle" },
  { name: "Ducati Motorcycle" },
  { name: "Harley-Davidson Motorcycle" },
  { name: "Honda Motorcycle" },
  { name: "Kawasaki Motorcycle" },
  { name: "KTM Motorcycle" },
  { name: "Suzuki Motorcycle" },
  { name: "Triumph Motorcycle" },
  { name: "Yamaha Motorcycle" },
];

const atvs = [
  { name: "Arctic Cat Atv" },
  { name: "Can-Am Atv" },
  { name: "Kawasaki Atv" },
  { name: "Polaris Atv" },
  { name: "Yamaha Atv" },
];

const logoMap: Record<string, string> = {
  Acura: "https://simpleicons.org/icons/acura.svg",
  "Alfa Romeo": "https://simpleicons.org/icons/alfaromeo.svg",
  "Aston Martin": "https://simpleicons.org/icons/astonmartin.svg",
  Audi: "https://simpleicons.org/icons/audi.svg",
  Bentley: "https://simpleicons.org/icons/bentley.svg",
  BMW: "https://simpleicons.org/icons/bmw.svg",
  Cadillac: "https://simpleicons.org/icons/cadillac.svg",
  Chevrolet: "https://simpleicons.org/icons/chevrolet.svg",
  Chrysler: "https://simpleicons.org/icons/chrysler.svg",
  Dodge: "https://simpleicons.org/icons/dodge.svg",
  Ferrari: "https://simpleicons.org/icons/ferrari.svg",
  Fiat: "https://simpleicons.org/icons/fiat.svg",
  Ford: "https://simpleicons.org/icons/ford.svg",
  GMC: "https://simpleicons.org/icons/gmc.svg",
  Honda: "https://simpleicons.org/icons/honda.svg",
  Hyundai: "https://simpleicons.org/icons/hyundai.svg",
  Infiniti: "https://simpleicons.org/icons/infiniti.svg",
  Jaguar: "https://simpleicons.org/icons/jaguar.svg",
  Jeep: "https://simpleicons.org/icons/jeep.svg",
  KIA: "https://simpleicons.org/icons/kia.svg",
  Lamborghini: "https://simpleicons.org/icons/lamborghini.svg",
  "Land Rover": "https://simpleicons.org/icons/landrover.svg",
  Lexus: "https://simpleicons.org/icons/lexus.svg",
  Mazda: "https://simpleicons.org/icons/mazda.svg",
  Mclaren: "https://simpleicons.org/icons/mclaren.svg",
  "Mercedes-Benz": "https://simpleicons.org/icons/mercedes.svg",
  Mini: "https://simpleicons.org/icons/mini.svg",
  Mitsubishi: "https://simpleicons.org/icons/mitsubishi.svg",
  Nissan: "https://simpleicons.org/icons/nissan.svg",
  Porsche: "https://simpleicons.org/icons/porsche.svg",
  Renault: "https://simpleicons.org/icons/renault.svg",
  "Rolls-Royce": "https://simpleicons.org/icons/rollsroyce.svg",
  Smart: "https://simpleicons.org/icons/smart.svg",
  Subaru: "https://simpleicons.org/icons/subaru.svg",
  Suzuki: "https://simpleicons.org/icons/suzuki.svg",
  Tesla: "https://simpleicons.org/icons/tesla.svg",
  Toyota: "https://simpleicons.org/icons/toyota.svg",
  Volkswagen: "https://simpleicons.org/icons/volkswagen.svg",
  Volvo: "https://simpleicons.org/icons/volvo.svg",
  Aprilia: "https://simpleicons.org/icons/aprilia.svg",
  Ducati: "https://simpleicons.org/icons/ducati.svg",
  "Harley-Davidson": "https://simpleicons.org/icons/harleydavidson.svg",
  Kawasaki: "https://simpleicons.org/icons/kawasaki.svg",
  KTM: "https://simpleicons.org/icons/ktm.svg",
  Triumph: "https://simpleicons.org/icons/triumph.svg",
  Yamaha: "https://simpleicons.org/icons/yamaha.svg",
  Polaris: "https://simpleicons.org/icons/polaris.svg",
};

const shortName: Record<string, string> = {
  Maybach: "Maybach",
  "Arctic Cat Atv": "Arctic Cat",
  "Can-Am Atv": "Can-Am",
};

function BrandCard({ name }: { name: string }) {
  const baseName = name.replace(" Motorcycle", "").replace(" Atv", "");
  const logoUrl = logoMap[name] || logoMap[baseName];
  const [imgError, setImgError] = useState(false);

  return (
    <div
      className="responsive-card"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        border: "1px solid #e8eaed",
        borderRadius: 10,
        padding: "12px 8px",
        backgroundColor: "#fff",
        cursor: "pointer",
        transition:
          "box-shadow 0.15s, transform 0.15s, width 0.2s, height 0.2s",
        gap: 8,
        boxSizing: "border-box",
      }}
      onMouseEnter={(e) => {
        const target = e.currentTarget as HTMLDivElement;
        target.style.boxShadow = "0 4px 14px rgba(0,0,0,0.08)";
        target.style.transform = "translateY(-1px)";
      }}
      onMouseLeave={(e) => {
        const target = e.currentTarget as HTMLDivElement;
        target.style.boxShadow = "none";
        target.style.transform = "none";
      }}
    >
      <div
        className="responsive-logo-container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {logoUrl && !imgError ? (
          <img
            src={logoUrl}
            alt={name}
            onError={() => setImgError(true)}
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              objectFit: "contain",
              filter:
                "invert(25%) sepia(10%) saturate(400%) hue-rotate(180deg) brightness(85%)",
              opacity: 0.9,
            }}
          />
        ) : (
          <span
            className="responsive-fallback-text"
            style={{
              color: "#7a8fa6",
              fontWeight: 700,
              textAlign: "center",
              letterSpacing: 0.5,
              lineHeight: 1.2,
              textTransform: "uppercase",
              fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
              display: "block",
              width: "100%",
            }}
          >
            {shortName[name] || baseName}
          </span>
        )}
      </div>
      <span
        className="responsive-brand-name"
        style={{
          color: "#4a5568",
          fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
          fontWeight: 500,
          textAlign: "center",
          lineHeight: 1.2,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
        title={name}
      >
        {baseName}
      </span>
    </div>
  );
}

const tabData: Record<Tab, { name: string }[]> = {
  Automobiles: automobiles,
  Motorcycles: motorcycles,
  ATVs: atvs,
};

export function PopularMakes() {
  const { t } = useI18n();
  const [activeTab, setActiveTab] = useState<Tab>("Automobiles");
  const [renderTab, setRenderTab] = useState<Tab>("Automobiles");
  const [opacity, setOpacity] = useState(1);

  const handleTabChange = (newTab: Tab) => {
    if (newTab === activeTab) return;

    setOpacity(0);
    setActiveTab(newTab);

    setTimeout(() => {
      setRenderTab(newTab);
      setOpacity(1);
    }, 250);
  };

  const items = tabData[renderTab];

  const tabsConfig: { id: Tab; labelKey: string }[] = [
    { id: "Automobiles", labelKey: "makes.tabs.automobiles" },
    { id: "Motorcycles", labelKey: "makes.tabs.motorcycles" },
    { id: "ATVs", labelKey: "makes.tabs.atvs" },
  ];

  return (
    <div
      style={{
        fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
        backgroundColor: "#f9fafb",
        minHeight: "80vh",
        padding: "40px 24px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <style>{`
        /* Desktop styles */
        .responsive-card { width: 100px; height: 100px; }
        .responsive-logo-container { width: 68px; height: 46px; }
        .responsive-fallback-text { font-size: 10px; }
        .responsive-brand-name { font-size: 12px; max-width: 105px; }

        /* Mobile styles (< 640px) */
        @media (max-width: 640px) {
          .responsive-card { width: 95px; height: 90px; padding: 8px 4px !important; gap: 4px !important; }
          .responsive-logo-container { width: 55px; height: 36px; }
          .responsive-fallback-text { font-size: 8px; }
          .responsive-brand-name { font-size: 11px; max-width: 85px; }
        }
      `}</style>

      <div style={{ width: "100%", maxWidth: 1280 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 12,
            flexWrap: "wrap",
            gap: 16,
          }}
        >
          <h2
            style={{
              fontSize: 24,
              fontWeight: 700,
              color: "#1a202c",
              margin: 0,
              letterSpacing: -0.5,
            }}
          >
            {t("makes.title")}
          </h2>

          <div style={{ display: "flex", gap: 24 }}>
            {tabsConfig.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                style={{
                  background: "none",
                  border: "none",
                  padding: "0 0 8px",
                  fontSize: 15,
                  fontWeight: activeTab === tab.id ? 600 : 400,
                  color: activeTab === tab.id ? "#3b82f6" : "#9aa5b4",
                  cursor: "pointer",
                  borderBottom:
                    activeTab === tab.id
                      ? "2px solid #3b82f6"
                      : "2px solid transparent",
                  transition: "all 0.2s",
                  fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                }}
              >
                {t(tab.labelKey)}
              </button>
            ))}
          </div>
        </div>

        <div
          style={{
            height: 1,
            backgroundColor: "#e8eaed",
            marginBottom: 32,
          }}
        />

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 16,
            justifyContent: "center",
            opacity: opacity,
            transition: "opacity 0.25s ease-in-out",
          }}
        >
          {items.map((item) => (
            <BrandCard key={item.name} name={item.name} />
          ))}
        </div>
      </div>
    </div>
  );
}
