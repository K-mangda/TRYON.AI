"use client";
import { motion } from "framer-motion";
import { TryOnMode } from "@/components/sections/StudioSection";
import { ArrowLeft, User, Shirt, Scissors, Layers } from "lucide-react";

interface Props {
  selected: TryOnMode;
  onSelect: (m: TryOnMode) => void;
  onBack: () => void;
}

const MODES = [
  {
    id: "full" as TryOnMode,
    icon: <User size={32} color="#a5b4fc" />,
    label: "Full Outfit",
    desc: "Replace the entire outfit at once",
    tip: "Best for: full body photo",
  },
  {
    id: "top" as TryOnMode,
    icon: <Shirt size={32} color="#818cf8" />,
    label: "Top Only",
    desc: "Change your shirt, keep your pants",
    tip: "Works with: full or half body",
  },
  {
    id: "bottom" as TryOnMode,
    icon: <Scissors size={32} color="#6366f1" />,
    label: "Bottom Only",
    desc: "Change your pants, keep your shirt",
    tip: "Best for: full body photo",
  },
  {
    id: "mix" as TryOnMode,
    icon: <Layers size={32} color="#4f46e5" />,
    label: "Mix & Match",
    desc: "Pick a top AND bottom separately",
    tip: "Best for: full body photo",
  },
];

export default function ModeSelector({ selected, onSelect, onBack }: Props) {
  return (
    <div style={{ maxWidth: "680px", margin: "0 auto" }}>
      <div style={{ marginBottom: "32px" }}>
        <button onClick={onBack} className="btn-ghost" style={{ padding: "8px 16px", fontSize: "0.825rem", gap: "6px" }}>
          <ArrowLeft size={14} /> Back
        </button>
        <h3 className="font-display" style={{ fontSize: "1.5rem", fontWeight: 700, color: "white", marginTop: "20px", marginBottom: "8px" }}>
          Choose your try-on mode
        </h3>
        <p style={{ color: "var(--text-3)", fontSize: "0.9rem" }}>
          Select what you want to change — the garment options will update automatically.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
        {MODES.map((m, i) => (
          <motion.div
            key={m.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="mode-card"
            onClick={() => onSelect(m.id)}
          >
            <div style={{ fontSize: "2.2rem", marginBottom: "10px" }}>{m.icon}</div>
            <p className="font-display" style={{ fontWeight: 600, fontSize: "1rem", color: "white", marginBottom: "6px" }}>
              {m.label}
            </p>
            <p style={{ fontSize: "0.8rem", color: "var(--text-3)", lineHeight: 1.5, marginBottom: "12px" }}>
              {m.desc}
            </p>
            <span className="badge badge-indigo" style={{ fontSize: "0.6rem" }}>{m.tip}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
