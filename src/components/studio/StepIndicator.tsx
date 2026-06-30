"use client";
import { Check } from "lucide-react";

interface Props {
  currentStep: 1 | 2 | 3 | 4;
}

const STEPS = [
  { n: 1, label: "Upload" },
  { n: 2, label: "Mode" },
  { n: 3, label: "Outfit" },
  { n: 4, label: "Customize" },
];

export default function StepIndicator({ currentStep }: Props) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0" }}>
      {STEPS.map((s, i) => {
        const done = s.n < currentStep;
        const active = s.n === currentStep;
        return (
          <div key={s.n} style={{ display: "flex", alignItems: "center" }}>
            {/* Dot + label */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
              <div style={{
                width: "36px", height: "36px",
                borderRadius: "50%",
                border: done || active ? "none" : "2px solid rgba(255,255,255,0.08)",
                background: done ? "var(--accent)" : active ? "var(--accent)" : "var(--bg-raised, #161628)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "var(--font-mono)", fontSize: "0.8rem",
                color: done || active ? "white" : "var(--text-3)",
                boxShadow: active ? "0 0 20px var(--accent-glow)" : "none",
                transition: "all 0.3s",
                flexShrink: 0,
              }}>
                {done ? <Check size={14} strokeWidth={3} /> : s.n}
              </div>
              <span style={{
                fontFamily: "var(--font-body)", fontSize: "0.7rem",
                color: active ? "white" : done ? "var(--accent-hover)" : "var(--text-3)",
                fontWeight: active ? 600 : 400,
                whiteSpace: "nowrap",
              }}>
                {s.label}
              </span>
            </div>

            {/* Connector */}
            {i < STEPS.length - 1 && (
              <div style={{ width: "clamp(40px, 10vw, 120px)", height: "2px", background: "rgba(255,255,255,0.06)", margin: "0 4px", marginBottom: "24px", position: "relative" }}>
                <div style={{
                  position: "absolute", inset: 0,
                  background: "linear-gradient(90deg, var(--accent), var(--accent-2))",
                  borderRadius: "99px",
                  width: s.n < currentStep ? "100%" : "0%",
                  transition: "width 0.5s cubic-bezier(0.16,1,0.3,1)",
                }} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
