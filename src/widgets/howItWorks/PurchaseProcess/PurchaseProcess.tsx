import { useState, useEffect } from "react";
import { PrePurchaseProcess1 } from "../../../widgets/howItWorks/PrePurchaseProcess1/PrePurchaseProcess1";
import { PostPurchaseProcess } from "../PrePurchaseProcess2/PrePurchaseProcess2";

const pulseCSS = `
  @keyframes pulse-ring {
    0%   { transform: scale(1);   opacity: 0.7; }
    50%  { transform: scale(1.35); opacity: 0.3; }
    100% { transform: scale(1);   opacity: 0.7; }
  }
  .pulse-badge { animation: pulse-ring 1.8s ease-in-out infinite; }
`;

function StepIndicator({ activePhase, onNavigate }: { activePhase: number; onNavigate: (phase: number) => void }) {
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

  const circleBase = {
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "700",
    fontSize: "15px",
    flexShrink: 0,
    transition:
      "transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease",
    cursor: "pointer",
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        marginBottom: "48px",
      }}
    >
      {/* Phase 1 */}
      <div
        onClick={() => onNavigate(1)}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          cursor: "pointer",
        }}
      >
        <span
          style={{
            fontSize: "13px",
            fontWeight: "600",
            marginBottom: "8px",
            color: activePhase === 1 ? "#1a1a2e" : "#999",
            transition: "color 0.3s",
          }}
        >
          Процесс до покупки
        </span>
        <div
          style={{
            ...circleBase,
            background:
              activePhase === 1 ? "#2196f3" : pulsing ? "#2196f3" : "#c5c5c5",
            color: activePhase === 1 ? "#fff" : pulsing ? "#fff" : "#888",
            boxShadow:
              activePhase === 1
                ? "0 0 0 4px #bde0fc"
                : pulsing
                  ? "0 0 0 4px #bde0fc"
                  : "none",
            transform: activePhase === 2 && pulsing ? "scale(1.2)" : "scale(1)",
          }}
          className={activePhase === 2 && pulsing ? "pulse-badge" : ""}
        >
          1
        </div>
      </div>

      {/* Dashed line */}
      <div
        style={{
          flex: 1,
          maxWidth: "420px",
          borderTop: "2px dashed #c5c5c5",
          marginTop: "30px",
        }}
      />

      {/* Phase 2 */}
      <div
        onClick={() => onNavigate(2)}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          cursor: "pointer",
        }}
      >
        <span
          style={{
            fontSize: "13px",
            fontWeight: "600",
            marginBottom: "8px",
            color: activePhase === 2 ? "#1a1a2e" : "#999",
            transition: "color 0.3s",
          }}
        >
          Процесс после покупки
        </span>
        <div
          style={{
            ...circleBase,
            background: activePhase === 2 ? "#2196f3" : "#c5c5c5",
            color: activePhase === 2 ? "#fff" : "#888",
            boxShadow: activePhase === 2 ? "0 0 0 4px #bde0fc" : "none",
            transform: activePhase === 1 && pulsing ? "scale(1.2)" : "scale(1)",
          }}
          className={activePhase === 1 && pulsing ? "pulse-badge" : ""}
        >
          2
        </div>
      </div>
    </div>
  );
}

export default function PurchaseProcess() {
  const [activePhase, setActivePhase] = useState(1);

  return (
    <>
      <style>{pulseCSS}</style>
      <div
        style={{
          fontFamily: "'Helvetica Neue', Arial, sans-serif",
          background: "#f0f2f5",
          minHeight: "100vh",
          padding: "48px 24px 60px",
        }}
      >
        <StepIndicator activePhase={activePhase} onNavigate={setActivePhase} />

        {activePhase === 1 ? (
          <PrePurchaseProcess1 _onNavigateToPhase={setActivePhase} />
        ) : (
          <PostPurchaseProcess _onNavigateToPhase={setActivePhase} />
        )}
      </div>
    </>
  );
}
