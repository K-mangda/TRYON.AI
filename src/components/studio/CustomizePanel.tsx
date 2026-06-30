"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Sparkles, User, UserRound, Accessibility, Footprints, Upload, Image as ImageIcon, Palette } from "lucide-react";
import { PoseOption, BgOption } from "@/components/sections/StudioSection";

interface Props {
  pose: string;
  background: BgOption;
  onPoseChange: (p: string) => void;
  onBgChange: (b: BgOption) => void;
  onGenerate: () => void;
  onBack: () => void;
}

const POSES: { id: PoseOption; icon: React.ReactNode; label: string }[] = [
  { id: "standing", icon: <User size={28} />, label: "Standing" },
  { id: "casual",   icon: <UserRound size={28} />, label: "Casual" },
  { id: "power",    icon: <Accessibility size={28} />, label: "Power" },
  { id: "walking",  icon: <Footprints size={28} />, label: "Walking" },
];

const BACKGROUNDS = [
  { id: "white",   label: "White",    color: "#ffffff" },
  { id: "gray",    label: "Gray",     color: "#94a3b8" },
  { id: "sky",     label: "Sky Blue", color: "#7dd3fc" },
  { id: "id-blue", label: "ID Blue",  color: "#1d4ed8" },
  { id: "pink",    label: "Blush",    color: "#fda4af" },
  { id: "black",   label: "Black",    color: "#0f0f0f" },
  { id: "sunrise", label: "Sunrise",  color: "#fb923c" },
  { id: "ocean",   label: "Ocean",    color: "#0891b2" },
  { id: "studio",  label: "Studio",   color: "#334155" },
  { id: "park",    label: "Park",     color: "#4ade80" },
];

const LOADING_STAGES = [
  "Detecting body outline...",
  "Applying garment...",
  "Adjusting lighting...",
  "Finalizing details...",
];

export default function CustomizePanel({ pose, background, onPoseChange, onBgChange, onGenerate, onBack }: Props) {
  const [generating, setGenerating] = useState(false);
  const [stage, setStage] = useState(0);

  const handleCustomBgUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        if (ev.target?.result) {
          onBgChange({ type: "custom", value: ev.target.result as string });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = async () => {
    setGenerating(true);
    setStage(0);

    // Staged loading animation
    for (let i = 0; i < LOADING_STAGES.length; i++) {
      await new Promise((r) => setTimeout(r, 900 + Math.random() * 600));
      setStage(i + 1);
    }
    await new Promise((r) => setTimeout(r, 400));
    setGenerating(false);
    onGenerate();
  };

  if (generating) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "400px", gap: "32px" }}
      >
        {/* Spinner ring */}
        <div style={{ position: "relative", width: "80px", height: "80px" }}>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
            style={{
              position: "absolute", inset: 0,
              borderRadius: "50%",
              border: "3px solid rgba(99,102,241,0.15)",
              borderTopColor: "var(--accent)",
            }}
          />
          <div style={{
            position: "absolute", inset: "12px",
            borderRadius: "50%",
            background: "rgba(99,102,241,0.08)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <Sparkles size={22} color="var(--accent)" />
          </div>
        </div>

        {/* Stage text */}
        <div style={{ textAlign: "center" }}>
          <motion.p
            key={stage}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display"
            style={{ fontSize: "1.1rem", fontWeight: 600, color: "white", marginBottom: "8px" }}
          >
            {LOADING_STAGES[Math.min(stage, LOADING_STAGES.length - 1)]}
          </motion.p>
          <p style={{ fontSize: "0.8rem", color: "var(--text-3)", fontFamily: "var(--font-mono)" }}>
            AI processing · please wait
          </p>
        </div>

        {/* Progress dots */}
        <div style={{ display: "flex", gap: "8px" }}>
          {LOADING_STAGES.map((_, i) => (
            <div key={i} style={{
              width: i < stage ? "24px" : "8px",
              height: "8px", borderRadius: "999px",
              background: i < stage ? "var(--accent)" : "rgba(255,255,255,0.1)",
              transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
            }} />
          ))}
        </div>
      </motion.div>
    );
  }

  return (
    <div style={{ maxWidth: "760px", margin: "0 auto" }}>
      <div style={{ marginBottom: "28px" }}>
        <button onClick={onBack} className="btn-ghost" style={{ padding: "8px 16px", fontSize: "0.825rem" }}>
          <ArrowLeft size={14} /> Back
        </button>
        <h3 className="font-display" style={{ fontSize: "1.5rem", fontWeight: 700, color: "white", marginTop: "20px", marginBottom: "4px" }}>
          Customize your look
        </h3>
        <p style={{ color: "var(--text-3)", fontSize: "0.875rem" }}>
          Choose your pose, background, and lighting style
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
        {/* Left column */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {/* Pose */}
          <div>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", color: "var(--text-3)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "12px" }}>
              Pose
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
              {POSES.map((p) => (
                <div
                  key={p.id}
                  className={`pose-card ${pose === p.id ? "selected" : ""}`}
                  onClick={() => onPoseChange(p.id)}
                >
                  <div style={{ marginBottom: "8px", color: pose === p.id ? "var(--accent)" : "var(--text-2)", transition: "color 0.2s" }}>{p.icon}</div>
                  <div style={{ fontSize: "0.95rem" }}>{p.label}</div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right column — Background */}
        <div>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", color: "var(--text-3)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "12px" }}>
            Background
          </p>
          
          {/* Top Options: Original & Custom */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "16px" }}>
            <button
              onClick={() => onBgChange({ type: "original", value: "original" })}
              style={{
                display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                padding: "12px", borderRadius: "12px",
                background: background.type === "original" ? "rgba(99,102,241,0.15)" : "var(--glass-bg)",
                border: background.type === "original" ? "1px solid var(--accent)" : "1px solid var(--glass-border)",
                color: background.type === "original" ? "white" : "var(--text-2)",
                fontSize: "0.85rem", cursor: "pointer", transition: "all 0.2s"
              }}
            >
              <ImageIcon size={16} /> Original
            </button>
            <label
              style={{
                display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                padding: "12px", borderRadius: "12px",
                background: background.type === "custom" ? "rgba(99,102,241,0.15)" : "var(--glass-bg)",
                border: background.type === "custom" ? "1px solid var(--accent)" : "1px solid var(--glass-border)",
                color: background.type === "custom" ? "white" : "var(--text-2)",
                fontSize: "0.85rem", cursor: "pointer", transition: "all 0.2s"
              }}
            >
              <Upload size={16} /> Upload
              <input type="file" accept="image/*" style={{ display: "none" }} onChange={handleCustomBgUpload} />
            </label>
          </div>

          <p style={{ fontSize: "0.75rem", color: "var(--text-3)", marginBottom: "8px" }}>Or choose a preset color:</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "8px" }}>
            {BACKGROUNDS.map((b) => {
              const isSelected = background.type === "preset" && background.value === b.id;
              return (
                <div
                  key={b.id}
                  onClick={() => onBgChange({ type: "preset", value: b.id })}
                  title={b.label}
                  style={{
                    width: "100%", aspectRatio: "1",
                    borderRadius: "10px",
                    background: b.color,
                    cursor: "pointer",
                    border: isSelected ? "3px solid var(--accent)" : "3px solid transparent",
                    boxShadow: isSelected ? "0 0 0 2px rgba(99,102,241,0.4)" : "none",
                    transition: "all 0.2s",
                  }}
                />
              );
            })}
            
            <div
              title="Pick Custom Color"
              style={{
                width: "100%", aspectRatio: "1",
                borderRadius: "10px",
                background: "var(--glass-bg)",
                cursor: "pointer",
                border: background.type === "color" ? "3px solid var(--accent)" : "1px solid var(--glass-border)",
                boxShadow: background.type === "color" ? "0 0 0 2px rgba(99,102,241,0.4)" : "none",
                transition: "all 0.2s",
                position: "relative",
                display: "flex", alignItems: "center", justifyContent: "center"
              }}
            >
              <input
                type="color"
                value={background.type === "color" ? background.value : "#ffffff"}
                onChange={(e) => onBgChange({ type: "color", value: e.target.value })}
                style={{
                  opacity: 0,
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  cursor: "pointer"
                }}
              />
              <div style={{ 
                background: "conic-gradient(red, yellow, lime, aqua, blue, magenta, red)", 
                borderRadius: "50%", 
                padding: "6px", 
                display: "flex", 
                pointerEvents: "none",
                boxShadow: "0 2px 10px rgba(0,0,0,0.5)"
              }}>
                <Palette size={14} color="white" style={{ filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.8))" }} />
              </div>
            </div>
          </div>
          
          {/* Hex code input when custom color is selected */}
          {background.type === "color" && (
            <div style={{ marginTop: "12px", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ fontSize: "0.8rem", color: "var(--text-3)" }}>HEX:</span>
              <input 
                type="text" 
                value={background.value} 
                onChange={(e) => onBgChange({ type: "color", value: e.target.value })}
                style={{ 
                  background: "var(--glass-bg)", 
                  border: "1px solid var(--glass-border)", 
                  color: "var(--text-1)", 
                  padding: "6px 12px", 
                  borderRadius: "8px", 
                  fontSize: "0.85rem",
                  width: "100px",
                  fontFamily: "var(--font-mono)"
                }}
              />
            </div>
          )}
          <p style={{ fontSize: "0.9rem", color: "var(--text-3)", marginTop: "12px" }}>
            Selected: <span style={{ color: "var(--text-2)", fontWeight: 500 }}>
              {background.type === "original" ? "Original (No Change)" 
               : background.type === "custom" ? "Custom Image"
               : background.type === "color" ? background.value
               : BACKGROUNDS.find(b => b.id === background.value)?.label}
            </span>
          </p>
        </div>
      </div>

      <div style={{ marginTop: "36px", display: "flex", justifyContent: "center" }}>
        <button
          onClick={handleGenerate}
          className="btn-primary"
          style={{ padding: "14px 48px", fontSize: "1rem" }}
        >
          Generate
        </button>
      </div>
    </div>
  );
}
