import { useI18n } from "../../../shared/i18n/I18nProvider";

const carImage = "https://placehold.co/400x250/e8f0fe/2196f3?text=BidCars";

interface StepData {
  num: string;
  title: string;
  body: string[];
  listTitle?: string;
  list?: string[];
  footer?: string;
  btn?: string;
}

function StepCard({ step }: { step: StepData }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 sm:p-8 flex flex-col gap-3">
      <span className="inline-block self-start bg-blue-500 text-white text-xs font-bold tracking-widest px-4 py-1 rounded">
        {step.num}
      </span>

      <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
        {step.title}
      </h3>

      {step.body.map((p, i) => (
        <p key={i} className="text-sm text-gray-500 leading-relaxed">{p}</p>
      ))}

      {step.list && (
        <>
          {step.listTitle && (
            <p className="text-sm font-semibold text-gray-700">{step.listTitle}</p>
          )}
          <ul className="list-disc pl-5 space-y-1">
            {step.list.map((item, i) => (
              <li key={i} className="text-sm text-gray-500 leading-relaxed">{item}</li>
            ))}
          </ul>
        </>
      )}

      {step.footer && (
        <p className="text-sm text-gray-500 leading-relaxed">{step.footer}</p>
      )}

      {step.btn && (
        <button className="mt-2 self-start bg-blue-500 hover:bg-blue-600 active:bg-blue-700 transition-colors text-white text-sm font-semibold px-6 py-2.5 rounded-md">
          {step.btn}
        </button>
      )}
    </div>
  );
}

export function PrePurchaseProcess1({ _onNavigateToPhase }: { _onNavigateToPhase?: (phase: number) => void } = {}) {
  const { t, tl } = useI18n();

  const steps: StepData[] = Array.from({ length: 4 }, (_, i) => ({
    num: t(`howItWorks.pre.steps.${i}.num`),
    title: t(`howItWorks.pre.steps.${i}.title`),
    body: tl(`howItWorks.pre.steps.${i}.body`) as string[],
    listTitle: t(`howItWorks.pre.steps.${i}.listTitle`) || undefined,
    list: tl(`howItWorks.pre.steps.${i}.list`) as string[],
    footer: t(`howItWorks.pre.steps.${i}.footer`) || undefined,
    btn: t(`howItWorks.pre.steps.${i}.btn`) || undefined,
  }));

  return (
    <div className="font-sans bg-slate-100 min-h-screen px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">

        {/* Hero */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-4 tracking-tight">
            {t("howItWorks.pre.heroTitle")}
          </h1>
          <p className="text-sm sm:text-base text-gray-500 leading-relaxed">
            {t("howItWorks.pre.heroSubtitle")}
          </p>
        </div>

        {/* Intro */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mb-10 flex flex-col sm:flex-row">
          <div className="hidden sm:block w-1.5 bg-blue-500 flex-shrink-0" />
          <div className="flex-1 p-6 sm:p-10">
            <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 mb-4">
              {t("howItWorks.pre.introTitle")}
            </h2>
            <p className="text-sm text-gray-500 leading-relaxed mb-3">
              {t("howItWorks.pre.introP1")}
            </p>
            <p className="text-sm text-gray-500 leading-relaxed">
              {t("howItWorks.pre.introP2")}
            </p>
          </div>
          <div className="flex-shrink-0 flex items-center justify-center p-4 sm:p-6 sm:w-72">
            <img
              src={carImage}
              alt="BidCars"
              className="w-full max-w-xs sm:max-w-full h-auto object-contain"
            />
          </div>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {steps.map((step, i) => (
            <StepCard key={i} step={step} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default PrePurchaseProcess1;