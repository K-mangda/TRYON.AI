"use client";
import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { Download, RefreshCw, RotateCcw, Share2, Sparkles, Palette } from "lucide-react";
import FilterStudio from "./FilterStudio";

import { BgOption } from "@/components/sections/StudioSection";

interface Props {
  userPhoto: string | null;
  background: BgOption;
  onTryAnother: () => void;
  onStartOver: () => void;
}

// Background color map
const BG_COLORS: Record<string, string> = {
  white: "#ffffff", gray: "#94a3b8", sky: "#7dd3fc",
  pink: "#fda4af", black: "#0f0f0f", sunrise: "#fb923c",
  ocean: "#0891b2", studio: "#334155", park: "#4ade80", city: "#475569",
};

const SAMPLE_RESULT = "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800"; // fallback sample image

export default function ResultDisplay({ userPhoto, background, onTryAnother, onStartOver }: Props) {
  const [sliderPos, setSliderPos] = useState(50);
  const [dragging, setDragging] = useState(false);
  const [activeTab, setActiveTab] = useState<"result" | "filter">("result");
  const [filterStyle, setFilterStyle] = useState<React.CSSProperties>({});
  const containerRef = useRef<HTMLDivElement>(null);

  const bgColor = background.type === "preset" ? (BG_COLORS[background.value] ?? "#ffffff") : 
                  background.type === "color" ? background.value : "transparent";
  
  const customBgImage = background.type === "custom" ? background.value : null;

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!dragging || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    setSliderPos(Math.max(5, Math.min(95, x)));
  }, [dragging]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.touches[0].clientX - rect.left) / rect.width) * 100;
    setSliderPos(Math.max(5, Math.min(95, x)));
  }, []);

  const handleDownload = () => {
    const imgSrc = userPhoto ?? SAMPLE_RESULT;
    
    // If we have filters applied, use canvas to bake them into the image
    if (filterStyle.filter) {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.filter = filterStyle.filter as string;
          ctx.drawImage(img, 0, 0);
          const link = document.createElement("a");
          link.href = canvas.toDataURL("image/jpeg", 0.9);
          link.download = "virtual-tryon-filtered.jpg";
          link.click();
        }
      };
      img.src = imgSrc;
    } else {
      const link = document.createElement("a");
      link.href = imgSrc;
      link.download = "virtual-tryon-result.jpg";
      link.click();
    }
  };

  return (
    <div style={{ maxWidth: "900px", margin: "0 auto" }}>
      {/* Tabs */}
      <div style={{ display: "flex", gap: "4px", marginBottom: "28px", background: "var(--glass-bg)", borderRadius: "12px", padding: "4px", width: "fit-content" }}>
        {(["result", "filter"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setActiveTab(t)}
            style={{
              padding: "8px 20px",
              borderRadius: "9px",
              border: "none",
              cursor: "pointer",
              fontSize: "0.95rem",
              fontFamily: "var(--font-body)",
              fontWeight: 500,
              background: activeTab === t ? "var(--accent)" : "transparent",
              color: activeTab === t ? "white" : "var(--text-3)",
              transition: "all 0.2s",
            }}
          >
            {t === "result" ? (
              <span style={{ display: "flex", alignItems: "center", gap: "6px" }}><Sparkles size={16} /> Result</span>
            ) : (
              <span style={{ display: "flex", alignItems: "center", gap: "6px" }}><Palette size={16} /> Filter Studio</span>
            )}
          </button>
        ))}
      </div>

      <div style={{ display: activeTab === "result" ? "block" : "none" }}>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          {/* Before/After Slider */}
          <div
            ref={containerRef}
            className="compare-container"
            style={{ height: "480px", cursor: "ew-resize", userSelect: "none" }}
            onMouseMove={handleMouseMove}
            onMouseDown={() => setDragging(true)}
            onMouseUp={() => setDragging(false)}
            onMouseLeave={() => setDragging(false)}
            onTouchMove={handleTouchMove}
            onTouchStart={() => setDragging(true)}
            onTouchEnd={() => setDragging(false)}
          >
            {/* Before (original) */}
            <img
              src={userPhoto ?? SAMPLE_RESULT}
              alt="Before"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />

            {/* After (result with background) */}
            <div
              className="compare-after"
              style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
            >
              <div style={{ 
                width: "100%", height: "100%", position: "relative",
                background: customBgImage ? `url(${customBgImage}) center/cover no-repeat` : bgColor
              }}>
                <img
                  src={userPhoto ?? SAMPLE_RESULT}
                  alt="After"
                  style={{ width: "100%", height: "100%", objectFit: "cover", opacity: background.type === "original" ? 1 : 0.85, ...filterStyle }}
                />
              </div>
            </div>

            {/* Handle line */}
            <div className="compare-handle" style={{ left: `${sliderPos}%` }}>
              <div className="compare-handle-knob">
                <span style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "-1px" }}>◀▶</span>
              </div>
            </div>

            {/* Labels */}
            <div style={{ position: "absolute", top: "16px", left: "16px", pointerEvents: "none" }}>
              <span style={{ 
                background: "rgba(9, 9, 11, 0.6)", color: "rgba(255,255,255,0.8)", 
                border: "1px solid rgba(255,255,255,0.1)", 
                fontSize: "0.75rem", fontWeight: 500, letterSpacing: "0.05em",
                padding: "4px 12px", borderRadius: "8px",
                backdropFilter: "blur(8px)",
                fontFamily: "var(--font-mono)"
              }}>BEFORE</span>
            </div>
            <div style={{ position: "absolute", top: "16px", right: "16px", pointerEvents: "none" }}>
              <span style={{ 
                background: "rgba(99, 102, 241, 0.15)", color: "rgba(255,255,255,0.9)", 
                border: "1px solid rgba(99, 102, 241, 0.3)", 
                fontSize: "0.75rem", fontWeight: 500, letterSpacing: "0.05em",
                padding: "4px 12px", borderRadius: "8px",
                backdropFilter: "blur(8px)",
                fontFamily: "var(--font-mono)"
              }}>AFTER</span>
            </div>
          </div>

          <div style={{ marginTop: "24px" }}></div>

          {/* Action buttons */}
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginTop: "16px" }}>
            <button onClick={handleDownload} className="btn-primary" style={{ gap: "8px", padding: "12px 24px", borderRadius: "10px", fontSize: "0.9rem" }}>
              <Download size={15} /> Download
            </button>
            <button onClick={onTryAnother} className="btn-ghost" style={{ gap: "8px", padding: "12px 24px", borderRadius: "10px", fontSize: "0.9rem" }}>
              <RefreshCw size={15} /> Try Another Look
            </button>
            <button onClick={onStartOver} className="btn-ghost" style={{ gap: "8px", marginLeft: "auto", padding: "12px 24px", borderRadius: "10px", fontSize: "0.9rem" }}>
              <RotateCcw size={15} /> Start Over
            </button>
          </div>
        </motion.div>
      </div>

      <div style={{ display: activeTab === "filter" ? "block" : "none" }}>
        <FilterStudio
          imageSrc={userPhoto ?? SAMPLE_RESULT}
          bgColor={bgColor !== "transparent" ? bgColor : undefined}
          customBgImage={customBgImage}
          onFilterChange={(style) => setFilterStyle(style)}
          onDownload={handleDownload}
        />
      </div>
    </div>
  );
}
