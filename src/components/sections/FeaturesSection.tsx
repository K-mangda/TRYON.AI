"use client";
import { motion } from "framer-motion";
import { Zap, Layers, ImageIcon, Sparkles, Smartphone, Palette } from "lucide-react";

const FEATURES = [
  {
    icon: <Sparkles size={22} />,
    title: "Photorealistic AI Results",
    desc: "Powered by IDM-VTON — state-of-the-art virtual try-on that preserves body shape and fabric texture.",
    span: 2,
    accent: true,
  },
  {
    icon: <Zap size={22} />,
    title: "Fast Generation",
    desc: "Results in under 10 seconds.",
    span: 1,
    accent: false,
  },
  {
    icon: <Layers size={22} />,
    title: "4 Try-On Modes",
    desc: "Full outfit, top only, bottom only, or mix & match.",
    span: 1,
    accent: false,
  },
  {
    icon: <Palette size={22} />,
    title: "8 Photo Filters",
    desc: "Butter Skin, Cinematic, Dreamy and more — real-time CSS filter preview.",
    span: 1,
    accent: false,
  },
  {
    icon: <ImageIcon size={22} />,
    title: "30+ Backgrounds",
    desc: "Solid colors, gradients, studio, and outdoor scenes.",
    span: 1,
    accent: false,
  },
  {
    icon: <Smartphone size={22} />,
    title: "Mobile Friendly",
    desc: "Works perfectly on any device — no app needed.",
    span: 1,
    accent: false,
  },
];

export default function FeaturesSection() {
  return (
    <section
      id="features"
      style={{ padding: "100px 24px", maxWidth: "1100px", margin: "0 auto" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{ textAlign: "center", marginBottom: "56px" }}
      >
        <span className="badge badge-indigo" style={{ marginBottom: "16px" }}>Features</span>
        <h2
          className="font-display"
          style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 700, letterSpacing: "-0.03em" }}
        >
          Everything you need
        </h2>
        <p style={{ color: "var(--text-2)", marginTop: "12px", fontSize: "1rem", maxWidth: "480px", margin: "12px auto 0" }}>
          From AI generation to photo editing — all in one seamless studio.
        </p>
      </motion.div>

      {/* Bento Grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "16px",
      }}>
        {FEATURES.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: i * 0.07, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="bento-card"
            style={{
              gridColumn: f.span === 2 ? "span 2" : "span 1",
              padding: "28px",
              background: f.accent
                ? "linear-gradient(135deg, rgba(99,102,241,0.12), rgba(34,211,238,0.05))"
                : "var(--glass-bg)",
            }}
          >
            <div style={{
              width: "44px", height: "44px",
              background: f.accent ? "rgba(99,102,241,0.2)" : "rgba(255,255,255,0.04)",
              borderRadius: "12px",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: f.accent ? "#a5b4fc" : "var(--text-2)",
              marginBottom: "16px",
              border: f.accent ? "1px solid rgba(99,102,241,0.2)" : "1px solid rgba(255,255,255,0.06)",
            }}>
              {f.icon}
            </div>
            <h3 className="font-display" style={{ fontSize: "1.05rem", fontWeight: 600, color: "white", marginBottom: "8px" }}>
              {f.title}
            </h3>
            <p style={{ fontSize: "0.875rem", color: "var(--text-3)", lineHeight: 1.6 }}>
              {f.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
