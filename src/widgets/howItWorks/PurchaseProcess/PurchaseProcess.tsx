import { useState, useEffect } from "react";
import { PrePurchaseProcess1 } from "../../../widgets/howItWorks/PrePurchaseProcess1/PrePurchaseProcess1";
import { PostPurchaseProcess } from "../PrePurchaseProcess2/PrePurchaseProcess2";
import { useI18n } from "../../../shared/i18n/I18nProvider";

// Кастомные стили для анимации (оставляем через тег style, чтобы не раздувать tailwind.config.js)
const pulseCSS = `
  @keyframes pulse-ring {
    0%   { transform: scale(1);   opacity: 0.7; }
    50%  { transform: scale(1.35); opacity: 0.3; }
    100% { transform: scale(1);   opacity: 0.7; }
  }
  .pulse-badge { animation: pulse-ring 1.8s ease-in-out infinite; }
`;

// ─── StepIndicator ────────────────────────────────────────────────────────────
function StepIndicator({
  activePhase,
  onNavigate,
  label1,
  label2,
}: {
  activePhase: number;
  onNavigate: (phase: number) => void;
  label1: string;
  label2: string;
}) {
  const [pulsing, setPulsing] = useState(false);

  useEffect(() => {
    const startPulse = () => {
      setPulsing(true);
      setTimeout(() => setPulsing(false), 1800 * 3 + 200);
    };
    startPulse();
    const interval = setInterval(startPulse, 12000);
    return () => clearInterval(interval);
  }, []);

  // Общие базовые классы для кружков индикатора
  const circleBaseClass = `
    w-9 h-9 rounded-full flex items-center justify-center 
    font-bold text-[15px] shrink-0 cursor-pointer
    transition-all duration-300 ease-in-out
  `;

  return (
    <div className="flex items-start justify-center mb-12">
      {/* Phase 1 */}
      <div
        onClick={() => onNavigate(1)}
        className="flex flex-col items-center cursor-pointer"
      >
        <span
          className={`text-[13px] font-semibold mb-2 transition-colors duration-300 ${
            activePhase === 1 ? "text-[#1a1a2e]" : "text-[#999999]"
          }`}
        >
          {label1}
        </span>
        <div
          className={`
            ${circleBaseClass}
            ${activePhase === 1 || pulsing ? "bg-[#2196f3] text-white" : "bg-[#c5c5c5] text-[#888888]"}
            ${activePhase === 1 || pulsing ? "shadow-[0_0_0_4px_#bde0fc]" : "shadow-none"}
            ${activePhase === 2 && pulsing ? "scale-125 pulse-badge" : "scale-100"}
          `}
        >
          1
        </div>
      </div>

      {/* Dashed line */}
      <div className="flex-1 max-w-[420px] border-t-2 border-dashed border-[#c5c5c5] mt-[30px]" />

      {/* Phase 2 */}
      <div
        onClick={() => onNavigate(2)}
        className="flex flex-col items-center cursor-pointer"
      >
        <span
          className={`text-[13px] font-semibold mb-2 transition-colors duration-300 ${
            activePhase === 2 ? "text-[#1a1a2e]" : "text-[#999999]"
          }`}
        >
          {label2}
        </span>
        <div
          className={`
            ${circleBaseClass}
            ${activePhase === 2 ? "bg-[#2196f3] text-white" : "bg-[#c5c5c5] text-[#888888]"}
            ${activePhase === 2 ? "shadow-[0_0_0_4px_#bde0fc]" : "shadow-none"}
            ${activePhase === 1 && pulsing ? "scale-125 pulse-badge" : "scale-100"}
          `}
        >
          2
        </div>
      </div>
    </div>
  );
}

// ─── Главный компонент ────────────────────────────────────────────────────────
export default function PurchaseProcess() {
  const { t } = useI18n();
  const [activePhase, setActivePhase] = useState(1);

  return (
    <>
      <style>{pulseCSS}</style>
      <div className="font-sans bg-[#f0f2f5] min-h-screen px-6 pt-12 pb-[60px]">
        <StepIndicator
          activePhase={activePhase}
          onNavigate={setActivePhase}
          label1={t("howItWorks.prePurchase")}
          label2={t("howItWorks.postPurchase")}
        />

        {activePhase === 1 ? (
          <PrePurchaseProcess1 onNavigateToPhase={setActivePhase} />
        ) : (
          <PostPurchaseProcess onNavigateToPhase={setActivePhase} />
        )}
      </div>
    </>
  );
}
