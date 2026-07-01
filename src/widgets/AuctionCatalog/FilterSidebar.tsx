import type { ReactNode } from "react";
import { useI18n } from "../../shared/i18n/I18nProvider";
import styles from "./FilterSidebar.module.scss";

type ChipOption = {
  label: string;
  active?: boolean;
  color?: "blue" | "red" | "black" | "white";
};

function FilterSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className={styles.filterBlock}>
      <h4 className={styles.blockTitle}>{title}</h4>
      {children}
    </section>
  );
}

function RangeFilter({
  from,
  to,
  labels,
}: {
  from: string;
  to: string;
  labels: { range: string; from: string; to: string };
}) {
  return (
    <div className={styles.rangeFilter}>
      <input
        className={styles.rangeSlider}
        type="range"
        min="0"
        max="100"
        defaultValue="100"
        aria-label={labels.range}
      />
      <div className={styles.rangeGroup}>
        <input
          className={styles.rangeInput}
          defaultValue={from}
          aria-label={labels.from}
        />
        <span className={styles.rangeDash}>—</span>
        <input
          className={styles.rangeInput}
          defaultValue={to}
          aria-label={labels.to}
        />
      </div>
    </div>
  );
}

function Chips({ options }: { options: ChipOption[] }) {
  return (
    <div className={styles.chips}>
      {options.map(({ label, active, color }) => (
        <button
          type="button"
          key={label}
          className={`${styles.chip} ${active ? styles.activeChip : ""} ${color ? styles[color] : ""}`}
        >
          {color && <span className={styles.colorDot} />}
          {label}
          <span className={styles.chipInfo}>i</span>
        </button>
      ))}
    </div>
  );
}

export default function FilterSidebar({ onClose }: { onClose?: () => void }) {
  const { t } = useI18n();
  const f = (key: string) => t(`filters.catalogFilter.${key}`);
  const rangeLabels = {
    range: f("range"),
    from: t("filters.rangeFrom"),
    to: t("filters.rangeTo"),
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarHeader}>
        <span className={styles.sidebarTitle}>{t("filters.title")}</span>
        <div className={styles.headerActions}>
          <button type="button" className={styles.clearAllBtn}>
            {t("filters.clearAll")}
          </button>
          {onClose && (
            <button
              type="button"
              className={styles.closeButton}
              onClick={onClose}
              aria-label={t("filters.close")}
            >
              ×
            </button>
          )}
        </div>
      </div>

      <div className={styles.filtersBody}>
        <FilterSection title={f("estimatedPrice")}>
          <RangeFilter from="0" to="1 000 000" labels={rangeLabels} />
        </FilterSection>

        <FilterSection title={t("filters.year")}>
          <RangeFilter from="1950" to="2027" labels={rangeLabels} />
        </FilterSection>

        <FilterSection title={f("saleType")}>
          <Chips
            options={[
              { label: f("all"), active: true },
              { label: f("open") },
              { label: f("buyNow"), color: "red" },
            ]}
          />
        </FilterSection>

        <FilterSection title={f("mileage")}>
          <RangeFilter from="0" to="500 000" labels={rangeLabels} />
        </FilterSection>

        <FilterSection title={f("lotCategory")}>
          <Chips
            options={[
              { label: f("all"), active: true },
              { label: f("withDocumentsNoDamage") },
              { label: f("minorDamage") },
              { label: f("runAndDrive") },
            ]}
          />
        </FilterSection>

        <FilterSection title={f("bodyType")}>
          <Chips
            options={[
              { label: f("all"), active: true },
              { label: f("suv") },
              { label: f("sedan") },
              { label: f("wagon") },
              { label: f("pickup") },
              { label: f("minivan") },
              { label: f("coupe") },
              { label: f("convertible") },
              { label: f("hatchback") },
              { label: f("van") },
            ]}
          />
        </FilterSection>

        <FilterSection title={t("filters.transmission")}>
          <Chips
            options={[
              { label: f("all"), active: true },
              { label: t("filters.transmissions.auto") },
              { label: t("filters.transmissions.manual") },
              { label: f("cvt") },
              { label: f("robot") },
            ]}
          />
        </FilterSection>

        <FilterSection title={f("fuel")}>
          <Chips
            options={[
              { label: f("all"), active: true },
              { label: f("gasoline") },
              { label: f("diesel") },
              { label: f("hybrid") },
              { label: f("electric") },
              { label: f("gas") },
              { label: f("flexFuel") },
              { label: f("other") },
            ]}
          />
        </FilterSection>

        <FilterSection title={f("condition")}>
          <Chips
            options={[
              { label: f("all"), active: true },
              { label: f("runAndDrive") },
              { label: f("starts") },
              { label: f("doesNotStart") },
              { label: f("damaged") },
              { label: f("noDamage") },
              { label: f("repaired") },
            ]}
          />
        </FilterSection>

        <FilterSection title={f("vehicleType")}>
          <Chips
            options={[
              { label: f("all"), active: true },
              { label: f("passenger") },
              { label: f("truck") },
              { label: f("motorcycle") },
              { label: f("waterTransport") },
              { label: f("bus") },
              { label: f("specialEquipment") },
              { label: f("rv") },
            ]}
          />
        </FilterSection>

        <FilterSection title={f("color")}>
          <Chips
            options={[
              { label: f("all"), active: true },
              { label: f("black"), color: "black" },
              { label: f("white"), color: "white" },
              { label: f("silver") },
              { label: f("gray") },
              { label: f("red"), color: "red" },
              { label: f("blue"), color: "blue" },
              { label: f("green") },
              { label: f("brown") },
              { label: f("beige") },
              { label: f("other") },
            ]}
          />
        </FilterSection>

        <FilterSection title={f("documents")}>
          <Chips
            options={[
              { label: f("all"), active: true },
              { label: f("cleanTitle") },
              { label: f("salvageTitle") },
              { label: f("rebuiltTitle") },
              { label: f("noDocuments") },
            ]}
          />
        </FilterSection>

        <FilterSection title={f("engineVolume")}>
          <RangeFilter from="0" to="12" labels={rangeLabels} />
        </FilterSection>

        <FilterSection title={f("enginePower")}>
          <RangeFilter from="0" to="1000" labels={rangeLabels} />
        </FilterSection>

        <FilterSection title={f("engineType")}>
          <Chips
            options={[
              { label: f("all"), active: true },
              { label: f("vEngine") },
              { label: f("inlineEngine") },
              { label: f("electricEngine") },
            ]}
          />
        </FilterSection>

        <FilterSection title={f("drive")}>
          <Chips
            options={[
              { label: f("all"), active: true },
              { label: "4×4" },
              { label: "4×2" },
              { label: f("frontWheel") },
              { label: f("rearWheel") },
              { label: f("allWheel") },
            ]}
          />
        </FilterSection>

        <FilterSection title={f("cylinders")}>
          <Chips
            options={[
              { label: f("all"), active: true },
              { label: "3 cyl" },
              { label: "4 cyl" },
              { label: "6 cyl" },
              { label: "8 cyl" },
              { label: "10 cyl" },
              { label: "12 cyl" },
              { label: f("noCylinders") },
            ]}
          />
        </FilterSection>
      </div>
    </div>
  );
}
