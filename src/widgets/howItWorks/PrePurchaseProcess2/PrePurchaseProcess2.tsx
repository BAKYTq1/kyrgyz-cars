import { useState } from "react";
import { useI18n } from "../../../shared/i18n/I18nProvider"; // поправь путь

// ─── Статичные изображения (не переводятся) ──────────────────────────────────
const STEP_IMAGES: Record<number, string | undefined> = {
  1: "https://images.unsplash.com/photo-1619551734325-81aaf323686c?w=600&q=80",
  2: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&q=80",
  4: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=600&q=80",
  5: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=600&q=80",
  6: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400&q=80",
  7: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&q=80",
  9: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80",
  10: "https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=600&q=80",
  15: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=600&q=80",
};

// PDF-ссылки для шагов 2 и 7 (не переводятся)
const STEP_LINKS: Record<number, Array<{ label: string; url: string }>> = {
  2: [
    { label: "IAAI", url: "https://bid.cars/wire_iaai_en.pdf" },
    { label: "Copart", url: "https://bid.cars/wire_copart_en.pdf" },
  ],
  7: [
    { label: "Transport costs", url: "https://bid.cars/wire_transport_en.pdf" },
  ],
};

// ─── StepContent ─────────────────────────────────────────────────────────────
interface StepContentProps {
  stepIndex: number; // 0-based
  t: (k: string) => string;
  tl: (k: string) => readonly string[];
  pdfLabel: string;
}

function StepContent({ stepIndex, t, tl, pdfLabel }: StepContentProps) {
  const base = `howItWorks.post.steps.${stepIndex}`;
  const isCompletion = t(`${base}.isCompletion`) === "true";
  const description = t(`${base}.description`);
  const quote = t(`${base}.quote`);
  const extra = t(`${base}.extra`);
  const imageCaption = t(`${base}.imageCaption`);
  const bullets = tl(`${base}.bullets`) as string[];
  const image = STEP_IMAGES[stepIndex + 1];
  const links = STEP_LINKS[stepIndex + 1];

  if (isCompletion) {
function StepContent({ current }: { current: any }) {
  if (current.content.isCompletion) {
    return (
      <div className="text-center py-6">
        <div className="text-6xl mb-4">🚗</div>
        <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center mx-auto mb-5 text-white text-3xl">
          ✓
        </div>
        <p className="text-sm text-gray-600 leading-relaxed mb-3">
          {description}
        </p>
        {extra && extra !== `${base}.extra` && (
          <p className="text-sm text-gray-400 leading-relaxed">{extra}</p>
        )}
      </div>
    );
  }

  return (
    <>
      <p className="text-sm text-gray-600 leading-relaxed mb-4">
        {description}
      </p>

      {bullets.length > 0 && (
        <ul className="list-disc ml-5 mb-4 space-y-1.5">
          {bullets.map((b, i) => (
          {current.content.bullets.map((b: any, i: number) => (
            <li key={i} className="text-sm text-gray-600 leading-relaxed">
              {b}
            </li>
          ))}
        </ul>
      )}

      {links && (
        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-2">{pdfLabel}</p>
          <ul className="list-disc ml-5 space-y-1">
            {links.map((l, i) => (
            {current.content.links.map((l: any, i: number) => (
              <li key={i}>
                <span className="text-sm text-gray-700">{l.label} — </span>
                <a
                  href={l.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-blue-500 hover:underline break-all"
                >
                  {l.url}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {quote && quote !== `${base}.quote` && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-3.5 mb-4">
          <p className="text-sm text-blue-800 leading-relaxed whitespace-pre-line">
            "{quote}"
          </p>
        </div>
      )}

      {extra && extra !== `${base}.extra` && (
        <p className="text-sm text-gray-400 leading-relaxed mb-4">{extra}</p>
      )}

      {image && (
        <div className="mt-4 rounded-lg overflow-hidden border border-gray-200">
          <img
            src={image}
            alt={imageCaption || ""}
            className="w-full object-cover block"
            onError={(e) => {
            onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
          {imageCaption && imageCaption !== `${base}.imageCaption` && (
            <div className="px-3.5 py-2 bg-gray-50 border-t border-gray-200">
              <p className="text-xs text-gray-400">{imageCaption}</p>
            </div>
          )}
        </div>
      )}
    </>
  );
}

// ─── Главный компонент ────────────────────────────────────────────────────────
export function PostPurchaseProcess({
  onNavigateToPhase,
}: {
  onNavigateToPhase?: (phase: number) => void;
}) {
  const { t, tl } = useI18n();
// @ts-ignore - onNavigateToPhase not yet used
export function PostPurchaseProcess({ _onNavigateToPhase }: { _onNavigateToPhase?: any }) {
  const [activeStep, setActiveStep] = useState(1);
  const total = 16;

  const backLabel = t("howItWorks.post.back");
  const nextLabel = t("howItWorks.post.next");
  const pdfLabel = t("howItWorks.post.pdfLabel");

  // Читаем заголовок и payment текущего шага из переводов
  const getTitle = (i: number) => t(`howItWorks.post.steps.${i - 1}.title`);
  const getPayment = (i: number) =>
    t(`howItWorks.post.steps.${i - 1}.payment`) === "true";

  return (
    <div className="max-w-5xl mx-auto px-3 sm:px-4 py-4">
      <div className="flex gap-5 items-start">
        {/* ── Sidebar: desktop ── */}
        <div className="hidden lg:block w-72 flex-shrink-0 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {Array.from({ length: total }, (_, i) => i + 1).map((id) => (
            <button
              key={id}
              onClick={() => setActiveStep(id)}
              className={[
                "w-full flex items-center gap-2.5 px-3.5 py-2.5 border-b border-gray-100 last:border-b-0 text-left transition-colors",
                activeStep === id
                  ? "bg-blue-50 border-l-[3px] border-l-blue-500"
                  : "border-l-[3px] border-l-transparent hover:bg-gray-50",
              ].join(" ")}
            >
              <div
                className={[
                  "w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0",
                  activeStep === id
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-500",
                ].join(" ")}
              >
                {id}
              </div>
              <span
                className={[
                  "text-[13px] flex-1 leading-snug",
                  activeStep === id
                    ? "text-blue-700 font-semibold"
                    : "text-gray-700",
                ].join(" ")}
              >
                {getTitle(id)}
              </span>
              {getPayment(id) && (
                <span className="text-[10px] font-bold bg-blue-500 text-white px-1.5 py-0.5 rounded flex-shrink-0">
                  PAYMENT
                </span>
              )}
              {activeStep === id && (
                <span className="text-blue-500 text-base flex-shrink-0">›</span>
              )}
            </button>
          ))}
        </div>

        {/* ── Detail panel ── */}
        <div className="flex-1 min-w-0">
          {/* MOBILE */}
          <div className="lg:hidden bg-white rounded-xl border border-gray-200 shadow-sm p-4">
            <div className="flex items-center gap-3 mb-5">
              <button
                onClick={() => setActiveStep((s) => Math.max(s - 1, 1))}
                disabled={activeStep === 1}
                className={[
                  "px-5 py-2 rounded-lg border text-sm font-semibold",
                  activeStep === 1
                    ? "border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50 cursor-pointer",
                ].join(" ")}
              >
                {backLabel}
              </button>
              <span className="text-sm text-gray-500 font-medium flex-1 text-center">
                {activeStep} / {total}
              </span>
              <button
                onClick={() => setActiveStep((s) => Math.min(s + 1, total))}
                disabled={activeStep === total}
                className={[
                  "px-5 py-2 rounded-lg text-sm font-semibold text-white",
                  activeStep === total
                    ? "bg-blue-300 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-600 cursor-pointer",
                ].join(" ")}
              >
                {nextLabel}
              </button>
            </div>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                {activeStep}
              </div>
              <h2 className="text-lg font-extrabold text-gray-900 leading-tight">
                {getTitle(activeStep)}
              </h2>
            </div>

            <hr className="border-gray-200 mb-5" />

            <StepContent
              stepIndex={activeStep - 1}
              t={t}
              tl={tl}
              pdfLabel={pdfLabel}
            />
          </div>

          {/* DESKTOP */}
          <div className="hidden lg:flex bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="w-1.5 bg-blue-500 flex-shrink-0" />
            <div className="flex-1 p-7 min-w-0">
              <div className="flex items-center gap-3 mb-6">
                <button
                  onClick={() => setActiveStep((s) => Math.max(s - 1, 1))}
                  disabled={activeStep === 1}
                  className={[
                    "px-4 py-1.5 rounded-md border text-sm font-semibold transition-colors",
                    activeStep === 1
                      ? "border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed"
                      : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50 cursor-pointer",
                  ].join(" ")}
                >
                  {backLabel}
                </button>
                <span className="text-sm text-gray-400 font-medium">
                  {activeStep} / {total}
                </span>
                <button
                  onClick={() => setActiveStep((s) => Math.min(s + 1, total))}
                  disabled={activeStep === total}
                  className={[
                    "px-4 py-1.5 rounded-md text-sm font-semibold text-white transition-colors",
                    activeStep === total
                      ? "bg-blue-300 cursor-not-allowed"
                      : "bg-blue-500 hover:bg-blue-600 cursor-pointer",
                  ].join(" ")}
                >
                  {nextLabel}
                </button>
              </div>

              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                  {activeStep}
                </div>
                <h2 className="text-xl font-extrabold text-gray-900 leading-tight">
                  {getTitle(activeStep)}
                </h2>
              </div>

              <hr className="border-gray-100 mb-5" />

              <StepContent
                stepIndex={activeStep - 1}
                t={t}
                tl={tl}
                pdfLabel={pdfLabel}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
