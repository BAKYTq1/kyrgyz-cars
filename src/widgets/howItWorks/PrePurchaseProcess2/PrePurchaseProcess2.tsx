import { useState } from "react";
import { useI18n } from "../../../shared/i18n/I18nProvider";

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

const STEP_LINKS: Record<number, Array<{ label: string; url: string }>> = {
  2: [
    { label: "IAAI", url: "https://bid.cars/wire_iaai_en.pdf" },
    { label: "Copart", url: "https://bid.cars/wire_copart_en.pdf" },
  ],
  7: [
    { label: "Transport costs", url: "https://bid.cars/wire_transport_en.pdf" },
  ],
};

interface StepContentProps {
  stepIndex: number;
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
              <li key={i}>
                <span className="text-sm text-gray-700">{l.label} — </span>
                <a
                  href={l.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-violet-500 hover:underline break-all"
                >
                  {l.url}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {quote && quote !== `${base}.quote` && (
        <div className="bg-violet-50 border border-violet-200 rounded-lg px-4 py-3.5 mb-4">
          <p className="text-sm text-violet-800 leading-relaxed whitespace-pre-line">
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

export function PostPurchaseProcess({
  _onNavigateToPhase,
}: { _onNavigateToPhase?: (phase: number) => void } = {}) {
  void _onNavigateToPhase;
  const { t, tl } = useI18n();
  const [activeStep, setActiveStep] = useState(1);
  const total = 16;

  const backLabel = t("howItWorks.post.back");
  const nextLabel = t("howItWorks.post.next");
  const pdfLabel = t("howItWorks.post.pdfLabel");
  const getTitle = (i: number) => t(`howItWorks.post.steps.${i - 1}.title`);
  const getPayment = (i: number) =>
    t(`howItWorks.post.steps.${i - 1}.payment`) === "true";

  const navButtons = (mobile = false) => (
    <div className={`flex items-center gap-3 ${mobile ? "mb-5" : "mb-6"}`}>
      <button
        onClick={() => setActiveStep((s) => Math.max(s - 1, 1))}
        disabled={activeStep === 1}
        className={`px-${mobile ? 5 : 4} py-${mobile ? 2 : 1.5} rounded-${mobile ? "lg" : "md"} border text-sm font-semibold transition-colors ${
          activeStep === 1
            ? "border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed"
            : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50 cursor-pointer"
        }`}
      >
        {backLabel}
      </button>
      <span
        className={`text-sm text-gray-${mobile ? 500 : 400} font-medium flex-1 ${mobile ? "text-center" : ""}`}
      >
        {activeStep} / {total}
      </span>
      <button
        onClick={() => setActiveStep((s) => Math.min(s + 1, total))}
        disabled={activeStep === total}
        className={`px-${mobile ? 5 : 4} py-${mobile ? 2 : 1.5} rounded-${mobile ? "lg" : "md"} text-sm font-semibold text-white transition-colors ${
          activeStep === total
            ? "bg-violet-300 cursor-not-allowed"
            : "bg-violet-500 hover:bg-violet-600 cursor-pointer"
        }`}
      >
        {nextLabel}
      </button>
    </div>
  );

  const stepHeader = (size: "sm" | "lg") => (
    <div className={`flex items-center gap-3 mb-${size === "lg" ? 5 : 4}`}>
      <div
        className={`w-${size === "lg" ? 8 : 9} h-${size === "lg" ? 8 : 9} rounded-full bg-violet-500 flex items-center justify-center text-white text-sm font-bold flex-shrink-0`}
      >
        {activeStep}
      </div>
      <h2
        className={`text-${size === "lg" ? "xl" : "lg"} font-extrabold text-gray-900 leading-tight`}
      >
        {getTitle(activeStep)}
      </h2>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto px-3 sm:px-4 py-4">
      <div className="flex gap-5 items-start">
        {/* Sidebar десктоп */}
        <div className="hidden lg:block w-72 flex-shrink-0 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {Array.from({ length: total }, (_, i) => i + 1).map((id) => (
            <button
              key={id}
              onClick={() => setActiveStep(id)}
              className={[
                "w-full flex items-center gap-2.5 px-3.5 py-2.5 border-b border-gray-100 last:border-b-0 text-left transition-colors",
                activeStep === id
                  ? "bg-violet-50 border-l-[3px] border-l-violet-500"
                  : "border-l-[3px] border-l-transparent hover:bg-gray-50",
              ].join(" ")}
            >
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${activeStep === id ? "bg-violet-500 text-white" : "bg-gray-200 text-gray-500"}`}
              >
                {id}
              </div>
              <span
                className={`text-[13px] flex-1 leading-snug ${activeStep === id ? "text-violet-700 font-semibold" : "text-gray-700"}`}
              >
                {getTitle(id)}
              </span>
              {getPayment(id) && (
                <span className="text-[10px] font-bold bg-violet-500 text-white px-1.5 py-0.5 rounded flex-shrink-0">
                  PAYMENT
                </span>
              )}
              {activeStep === id && (
                <span className="text-violet-500 text-base flex-shrink-0">
                  ›
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Detail panel */}
        <div className="flex-1 min-w-0">
          {/* Мобилка */}
          <div className="lg:hidden bg-white rounded-xl border border-gray-200 shadow-sm p-4">
            {navButtons(true)}
            {stepHeader("sm")}
            <hr className="border-gray-200 mb-5" />
            <StepContent
              stepIndex={activeStep - 1}
              t={t}
              tl={tl}
              pdfLabel={pdfLabel}
            />
          </div>

          {/* Десктоп */}
          <div className="hidden lg:flex bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="w-1.5 bg-violet-500 flex-shrink-0" />
            <div className="flex-1 p-7 min-w-0">
              {navButtons(false)}
              {stepHeader("lg")}
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

export default PostPurchaseProcess;
