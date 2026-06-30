"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Upload, Shirt, Star, User } from "lucide-react";
import { TryOnMode, Garment } from "@/components/sections/StudioSection";

interface Props {
  mode: TryOnMode;
  onSelect: (g: Garment) => void;
  onSelectTop: (g: Garment) => void;
  onSelectBottom: (g: Garment) => void;
  topGarment: Garment | null;
  bottomGarment: Garment | null;
  onNext: () => void;
  onBack: () => void;
}

const generateId = () => Math.random().toString(36).substr(2, 9);

// ─── Styles & Dynamic Garment Generation ─────────────────────────────
const STYLES = [
  { id: "all", label: "All Styles" },
  { id: "korean", label: "Korean" },
  { id: "street", label: "Streetwear" },
  { id: "sport", label: "Sportswear" },
  { id: "smart", label: "Smart Casual" },
  { id: "vintage", label: "Vintage" },
  { id: "minimal", label: "Minimalist" },
  { id: "y2k", label: "Y2K" },
  { id: "tech", label: "Techwear" },
];

const TOPS_PICS = [
  "/garments/m_top_smart.png", "/garments/m_top_vintage.png", "/garments/men_korean.png",
  "/garments/men_sport.png", "/garments/men_street.png", "/garments/w_top_smart.png",
  "/garments/w_top_vintage.png", "/garments/women_korean.png", "/garments/women_sport.png",
  "/garments/women_street.png"
];

const BOTS_PICS = [
  "/garments/m_bot_korean.png", "/garments/m_bot_smart.png", "/garments/m_bot_sport.png",
  "/garments/m_bot_street.png", "/garments/m_bot_vintage.png"
];

const generateGarments = (category: "top" | "bottom" | "outfit", countPerStyle: number): Garment[] => {
  const garments: Garment[] = [];
  let topIdx = 0;
  let botIdx = 0;
  
  STYLES.filter(s => s.id !== "all").forEach((style) => {
    for (let i = 1; i <= countPerStyle; i++) {
      const gender = i % 2 === 0 ? "women" : "men";
      let localSrc = "";
      if (category === "bottom") {
        localSrc = BOTS_PICS[botIdx % BOTS_PICS.length];
        botIdx++;
      } else {
        localSrc = TOPS_PICS[topIdx % TOPS_PICS.length];
        topIdx++;
      }
      
      garments.push({
        id: `${style.id}-${category}-${i}`,
        name: `${style.label} ${category === 'bottom' ? 'Bottom' : 'Top'} ${i}`,
        color: "#f1f5f9",
        category: category,
        gender: gender,
        styleCategory: style.id,
        customSrc: localSrc
      });
    }
  });
  return garments;
};

const ALL_TOPS = generateGarments("outfit", 5);
const ALL_BOTTOMS = generateGarments("bottom", 5);

function GarmentCard({ g, selected, onClick }: { g: Garment; selected: boolean; onClick: () => void }) {
  return (
    <motion.div
      className={`garment-card ${selected ? "selected" : ""}`}
      onClick={onClick}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <div style={{
        height: "140px",
        background: !g.customSrc ? `linear-gradient(135deg, ${g.color}cc, ${g.color}88)` : "var(--glass-bg)",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: "2.5rem",
        position: "relative",
        overflow: "hidden"
      }}>
        {g.customSrc && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={g.customSrc} alt={g.name} style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", inset: 0 }} />
        )}
        {!g.customSrc && <Shirt size={32} color="rgba(255,255,255,0.5)" style={{ zIndex: 1 }} />}
        {selected && (
          <div style={{
            position: "absolute", top: "8px", right: "8px",
            width: "22px", height: "22px", borderRadius: "50%",
            background: "var(--accent)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "11px", color: "white",
          }}>✓</div>
        )}
      </div>
      <div style={{ padding: "10px 12px", background: "var(--bg-surface)" }}>
        <p style={{ fontSize: "0.8rem", fontWeight: 500, color: selected ? "#a5b4fc" : "var(--text-2)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
          {g.name}
        </p>
      </div>
    </motion.div>
  );
}

export default function GarmentSelector({ mode, onSelect, onSelectTop, onSelectBottom, topGarment, bottomGarment, onNext, onBack }: Props) {
  const [genderFilter, setGenderFilter] = useState<'all'|'men'|'women'>('all');
  const [styleFilter, setStyleFilter] = useState<string>("all");
  const [selected, setSelected] = useState<Garment | null>(null);

  const [customTop, setCustomTop] = useState<Garment | null>(null);
  const [customBottom, setCustomBottom] = useState<Garment | null>(null);
  const [customSingle, setCustomSingle] = useState<Garment | null>(null);

  const handleCustomUpload = (e: React.ChangeEvent<HTMLInputElement>, targetCategory: "top" | "bottom" | "single") => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      if (!ev.target?.result) return;
      const newCustom: Garment = {
        id: `custom-${generateId()}`,
        name: "My Custom Image",
        color: "#4f46e5",
        category: targetCategory === "single" ? mode : targetCategory,
        gender: "unisex",
        customSrc: ev.target.result as string,
      };
      if (targetCategory === "top") {
        setCustomTop(newCustom);
        onSelectTop(newCustom);
      } else if (targetCategory === "bottom") {
        setCustomBottom(newCustom);
        onSelectBottom(newCustom);
      } else {
        setCustomSingle(newCustom);
        handleSelect(newCustom);
      }
    };
    reader.readAsDataURL(file);
  };

  const isMix = mode === "mix";

  const filterItems = (items: Garment[], selectedId?: string) => {
    return items.filter(g => {
      const matchGender = genderFilter === 'all' || g.gender === 'unisex' || g.gender === genderFilter;
      const matchStyle = styleFilter === 'all' || g.styleCategory === styleFilter;
      return (matchGender && matchStyle) || g.id === selectedId;
    });
  };

  const currentItems = filterItems(mode === "bottom" ? ALL_BOTTOMS : ALL_TOPS, selected?.id);
  const filteredTops = filterItems(ALL_TOPS, topGarment?.id);
  const filteredBottoms = filterItems(ALL_BOTTOMS, bottomGarment?.id);

  const canProceed = isMix ? (topGarment && bottomGarment) : selected;

  const handleSelect = (g: Garment) => {
    setSelected(g);
    if (!isMix) onSelect(g);
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      {/* Header & Gender Filter */}
      <div style={{ marginBottom: "20px", display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "16px" }}>
        <div>
          <button onClick={onBack} className="btn-ghost" style={{ padding: "8px 16px", fontSize: "0.825rem" }}>
            <ArrowLeft size={14} /> Back
          </button>
          <h3 className="font-display" style={{ fontSize: "1.5rem", fontWeight: 700, color: "white", marginTop: "20px", marginBottom: "4px" }}>
            {isMix ? "Pick your top & bottom" : "Choose a garment"}
          </h3>
          <p style={{ color: "var(--text-3)", fontSize: "0.875rem" }}>
            {isMix ? "Select one from each column below" : "Click a garment to select it, or upload your own"}
          </p>
        </div>

        {/* Gender Filter Toggle */}
        <div style={{ display: "flex", background: "var(--glass-bg)", padding: "4px", borderRadius: "10px", border: "1px solid var(--glass-border)" }}>
          {(['all', 'men', 'women'] as const).map(g => (
            <button
              key={g}
              onClick={() => setGenderFilter(g)}
              style={{
                padding: "6px 14px",
                borderRadius: "6px",
                fontSize: "0.8rem",
                textTransform: "capitalize",
                background: genderFilter === g ? "var(--accent)" : "transparent",
                color: genderFilter === g ? "white" : "var(--text-3)",
                border: "none", cursor: "pointer", transition: "all 0.2s",
                display: "flex", alignItems: "center", gap: "6px"
              }}
            >
              {g === 'all' ? <Star size={12}/> : <User size={12}/>}
              {g}
            </button>
          ))}
        </div>
      </div>

      {/* Unified Style Selector Chips */}
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", paddingBottom: "12px", marginBottom: "16px" }}>
        {STYLES.map((style) => (
          <button
            key={style.id}
            onClick={() => setStyleFilter(style.id)}
            style={{
              padding: "8px 16px",
              borderRadius: "8px",
              border: "1px solid",
              borderColor: styleFilter === style.id ? "var(--accent)" : "var(--glass-border)",
              background: styleFilter === style.id ? "var(--accent)" : "var(--glass-bg)",
              color: styleFilter === style.id ? "white" : "var(--text-2)",
              fontSize: "0.85rem",
              fontWeight: 500,
              cursor: "pointer",
              transition: "all 0.2s",
              whiteSpace: "nowrap"
            }}
          >
            {style.label}
          </button>
        ))}
      </div>

      {/* Mix & Match: Two columns */}
      {isMix ? (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
          {/* Tops column */}
          <div>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "var(--text-3)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "12px", display: "flex", alignItems: "center", gap: "6px" }}>
              <Shirt size={14} /> Top
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
              {customTop && <GarmentCard g={customTop} selected={topGarment?.id === customTop.id} onClick={() => onSelectTop(customTop)} />}
              <label className="garment-card" style={{ border: "2px dashed rgba(99,102,241,0.25)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "8px", cursor: "pointer", minHeight: "140px", background: "var(--glass-bg)", color: "var(--text-3)" }}>
                <Upload size={20} />
                <span style={{ fontSize: "0.75rem", textAlign: "center" }}>Upload Top</span>
                <input type="file" accept="image/*" style={{ display: "none" }} onChange={(e) => handleCustomUpload(e, "top")} />
              </label>
              {filteredTops.map((g) => (
                <GarmentCard key={g.id} g={g} selected={topGarment?.id === g.id} onClick={() => onSelectTop(g)} />
              ))}
            </div>
          </div>
          {/* Bottoms column */}
          <div>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "var(--text-3)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "12px", display: "flex", alignItems: "center", gap: "6px" }}>
              <Shirt size={14} style={{ transform: "rotate(180deg)" }} /> Bottom
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
              {customBottom && <GarmentCard g={customBottom} selected={bottomGarment?.id === customBottom.id} onClick={() => onSelectBottom(customBottom)} />}
              <label className="garment-card" style={{ border: "2px dashed rgba(99,102,241,0.25)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "8px", cursor: "pointer", minHeight: "140px", background: "var(--glass-bg)", color: "var(--text-3)" }}>
                <Upload size={20} />
                <span style={{ fontSize: "0.75rem", textAlign: "center" }}>Upload Bottom</span>
                <input type="file" accept="image/*" style={{ display: "none" }} onChange={(e) => handleCustomUpload(e, "bottom")} />
              </label>
              {filteredBottoms.map((g) => (
                <GarmentCard key={g.id} g={g} selected={bottomGarment?.id === g.id} onClick={() => onSelectBottom(g)} />
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Single column */
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: "12px" }}>
          {customSingle && <GarmentCard g={customSingle} selected={selected?.id === customSingle.id} onClick={() => handleSelect(customSingle)} />}
          <label className="garment-card" style={{ border: "2px dashed rgba(99,102,241,0.25)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "8px", cursor: "pointer", minHeight: "140px", background: "var(--glass-bg)", color: "var(--text-3)" }}>
            <Upload size={20} />
            <span style={{ fontSize: "0.75rem", textAlign: "center" }}>Upload your own</span>
            <input type="file" accept="image/*" style={{ display: "none" }} onChange={(e) => handleCustomUpload(e, "single")} />
          </label>
          {currentItems.map((g) => (
            <GarmentCard key={g.id} g={g} selected={selected?.id === g.id} onClick={() => handleSelect(g)} />
          ))}
        </div>
      )}

      {/* Next button */}
      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "24px" }}>
        <button
          onClick={onNext}
          className="btn-primary"
          disabled={!canProceed}
          style={{
            padding: "12px 32px",
            opacity: canProceed ? 1 : 0.4,
            cursor: canProceed ? "pointer" : "not-allowed",
          }}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
