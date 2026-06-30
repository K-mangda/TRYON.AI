"use client";
import { useState } from "react";
import { Download } from "lucide-react";

interface FilterValues {
  brightness: number;
  contrast: number;
  saturate: number;
  temperature: number; // -1 to 1 (cool to warm)
  hueRotate: number;
  blur: number;
  vignette: number; // 0 to 1
  grain: number; // 0 to 1
}

interface Props {
  imageSrc: string;
  bgColor?: string;
  customBgImage?: string | null;
  onFilterChange: (style: React.CSSProperties) => void;
  onDownload: () => void;
}

const PRESETS = [
  { name: "Natural",     brightness: 1,    contrast: 1,    saturate: 1,    temperature: 0,    hueRotate: 0,   blur: 0,   vignette: 0,   grain: 0 },
  { name: "Butter Skin", brightness: 1.05, contrast: 0.95, saturate: 1.1,  temperature: 0.1,  hueRotate: 5,   blur: 0,   vignette: 0.1, grain: 0.05 },
  { name: "Golden Hour", brightness: 1.1,  contrast: 1.05, saturate: 1.2,  temperature: 0.5,  hueRotate: 0,   blur: 0,   vignette: 0.2, grain: 0 },
  { name: "Cinematic",   brightness: 0.95, contrast: 1.3,  saturate: 0.8,  temperature: -0.2, hueRotate: 0,   blur: 0,   vignette: 0.5, grain: 0.15 },
  { name: "Soft Glam",   brightness: 1.08, contrast: 0.9,  saturate: 1.15, temperature: 0.05, hueRotate: 0,   blur: 0.5, vignette: 0,   grain: 0 },
  { name: "Y2K Chrome",  brightness: 1.1,  contrast: 1.1,  saturate: 1.4,  temperature: -0.15,hueRotate: 10,  blur: 0,   vignette: 0.3, grain: 0.2 },
  { name: "Dreamy",      brightness: 1.1,  contrast: 0.85, saturate: 0.9,  temperature: 0.1,  hueRotate: -5,  blur: 0.8, vignette: 0,   grain: 0.1 },
  { name: "Film Grain",  brightness: 1.0,  contrast: 1.15, saturate: 0.85, temperature: 0.15, hueRotate: 0,   blur: 0,   vignette: 0.4, grain: 0.4 },
];

const toFilterString = (v: FilterValues) =>
  `brightness(${v.brightness}) contrast(${v.contrast}) saturate(${v.saturate}) hue-rotate(${v.hueRotate}deg) blur(${v.blur}px)`;

const DEFAULT: FilterValues = { brightness: 1, contrast: 1, saturate: 1, temperature: 0, hueRotate: 0, blur: 0, vignette: 0, grain: 0 };

export default function FilterStudio({ imageSrc, bgColor, customBgImage, onFilterChange, onDownload }: Props) {
  const [activePreset, setActivePreset] = useState("Natural");
  const [values, setValues] = useState<FilterValues>(DEFAULT);

  const applyPreset = (p: typeof PRESETS[0]) => {
    const v: FilterValues = { ...p };
    setValues(v);
    setActivePreset(p.name);
    onFilterChange({ filter: toFilterString(v) });
  };

  const handleSlider = (key: keyof FilterValues, val: number) => {
    const newV = { ...values, [key]: val };
    setValues(newV);
    setActivePreset("Custom");
    onFilterChange({ filter: toFilterString(newV) });
  };

  const SLIDERS: { key: keyof FilterValues; label: string; min: number; max: number; step: number; unit: string }[] = [
    { key: "brightness",  label: "Brightness",  min: 0.5, max: 1.5,  step: 0.01, unit: "" },
    { key: "contrast",    label: "Contrast",    min: 0.5, max: 1.8,  step: 0.01, unit: "" },
    { key: "saturate",    label: "Saturation",  min: 0,   max: 2,    step: 0.01, unit: "" },
    { key: "temperature", label: "Temperature", min: -1,  max: 1,    step: 0.01, unit: "" },
    { key: "hueRotate",   label: "Hue",         min: -60, max: 60,   step: 1,    unit: "°" },
    { key: "blur",        label: "Dreamy Blur", min: 0,   max: 2,    step: 0.1,  unit: "px" },
    { key: "vignette",    label: "Vignette",    min: 0,   max: 1,    step: 0.01, unit: "" },
    { key: "grain",       label: "Film Grain",  min: 0,   max: 1,    step: 0.01, unit: "" },
  ];

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px" }}>
      {/* Left: Preview */}
      <div>
        <div style={{
          width: "100%", aspectRatio: "4/5",
          borderRadius: "16px",
          border: "1px solid rgba(255,255,255,0.08)",
          background: customBgImage ? `url(${customBgImage}) center/cover no-repeat` : (bgColor || "transparent"),
          filter: toFilterString(values),
          transition: "filter 0.1s",
          overflow: "hidden",
          position: "relative"
        }}>
          {/* Main Image */}
          <img
            src={imageSrc}
            alt="Filtered preview"
            style={{
              width: "100%", height: "100%", objectFit: "cover",
              opacity: bgColor || customBgImage ? 0.85 : 1
            }}
          />
          
          {/* Temperature Overlay */}
          <div style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            backgroundColor: values.temperature > 0 ? "#ff8800" : "#0088ff",
            opacity: Math.abs(values.temperature) * 0.25,
            mixBlendMode: "color"
          }}></div>

          {/* Vignette Overlay */}
          <div style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            boxShadow: `inset 0 0 ${values.vignette * 120}px rgba(0,0,0,${values.vignette * 0.8})`
          }}></div>

          {/* Film Grain Overlay */}
          <div style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            opacity: values.grain * 0.4,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            mixBlendMode: "overlay"
          }}></div>

        </div>
        <button onClick={onDownload} className="btn-primary" style={{ marginTop: "16px", width: "100%", justifyContent: "center" }}>
          <Download size={15} /> Download with Filter
        </button>
      </div>

      {/* Right: Controls */}
      <div>
        {/* Preset chips */}
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "var(--text-3)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "12px" }}>
          Preset Filters
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "28px" }}>
          {PRESETS.map((p) => (
            <button
              key={p.name}
              onClick={() => applyPreset(p)}
              className={`filter-chip ${activePreset === p.name ? "active" : ""}`}
            >
              {p.name}
            </button>
          ))}
        </div>

        {/* Manual Controls */}
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "var(--text-3)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "16px" }}>
          Manual Adjust
        </p>
        
        <div className="no-scrollbar" style={{ display: "flex", flexDirection: "column", gap: "16px", maxHeight: "400px", overflowY: "auto", paddingRight: "12px" }}>
          {SLIDERS.map((s) => (
            <div key={s.key}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                <span style={{ fontSize: "0.85rem", color: "var(--text-2)" }}>{s.label}</span>
                <span style={{ fontSize: "0.8rem", color: "var(--accent)", fontFamily: "var(--font-mono)" }}>
                  {values[s.key].toFixed(2)}{s.unit}
                </span>
              </div>
              <input
                type="range"
                min={s.min} max={s.max} step={s.step}
                value={values[s.key]}
                onChange={(e) => handleSlider(s.key, parseFloat(e.target.value))}
                className="custom-slider"
              />
            </div>
          ))}
        </div>

        <button
          onClick={() => applyPreset(PRESETS[0])}
          className="btn-ghost"
          style={{ marginTop: "24px", padding: "8px 16px", fontSize: "0.8rem" }}
        >
          Reset to Natural
        </button>
      </div>
    </div>
  );
}
