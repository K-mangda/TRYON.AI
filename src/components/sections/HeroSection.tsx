"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { ArrowDown, Sparkles, Zap, Layers, User, Shirt } from "lucide-react";

interface HeroSectionProps {
  onCTAClick: () => void;
}

const STATS = [
  { icon: <Layers size={16} />, label: "4 Try-On Modes" },
  { icon: <Sparkles size={16} />, label: "8 Filters" },
  { icon: <Zap size={16} />, label: "30+ Backgrounds" },
];

export default function HeroSection({ onCTAClick }: HeroSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  // ─── Parallax layers (each moves at different speed) ───
  const bgGridY   = useTransform(scrollY, [0, 600], [0, -50]);
  const glow1Y    = useTransform(scrollY, [0, 600], [0, -90]);
  const glow2Y    = useTransform(scrollY, [0, 600], [0, -70]);
  const cardY     = useTransform(scrollY, [0, 600], [0, -130]);
  const textY     = useTransform(scrollY, [0, 600], [0, -180]);
  const textOpacity = useTransform(scrollY, [0, 300], [1, 0]);

  // ─── 3D Hover Parallax ───────────
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 30 });
  
  const rotateX = useTransform(springY, [-0.5, 0.5], [14, -14]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-14, 14]);
  const rotateZ = useTransform(springX, [-0.5, 0.5], [-4, 4]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const x = (e.clientX / window.innerWidth) - 0.5;
    const y = (e.clientY / window.innerHeight) - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };
  
  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        paddingTop: "64px",
      }}
    >
      {/* ── Layer 0: Dot Grid BG (slowest) ─────────── */}
      <motion.div
        style={{ y: bgGridY, position: "absolute", inset: 0 }}
        className="dot-grid"
      />

      {/* ── Layer 1: Ambient Glow Orbs (slow) ───────── */}
      <motion.div style={{ y: glow1Y, position: "absolute", inset: 0, pointerEvents: "none" }}>
        <div style={{
          position: "absolute",
          top: "15%", left: "5%",
          width: "500px", height: "500px",
          background: "rgba(99,102,241,0.12)",
          borderRadius: "50%",
          filter: "blur(100px)",
        }} />
        <div style={{
          position: "absolute",
          top: "30%", right: "0%",
          width: "400px", height: "400px",
          background: "rgba(34,211,238,0.07)",
          borderRadius: "50%",
          filter: "blur(100px)",
        }} />
      </motion.div>

      {/* ── Inner Content Container ─────────── */}
      <div style={{
          position: "relative",
          zIndex: 10,
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 24px",
          paddingTop: "40px",
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
      }}>
        {/* ── Layer 3: Text Content (fastest) ─────────── */}
        <motion.div
          style={{
            y: textY,
            opacity: textOpacity,
            maxWidth: "640px",
          }}
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            style={{ marginBottom: "28px" }}
          >
            <span className="badge badge-indigo">
              <Sparkles size={10} />
              AI-Powered Fashion Studio
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="font-display gradient-text-subtle"
            style={{
              fontSize: "clamp(3rem, 8vw, 5.5rem)",
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              marginBottom: "24px",
            }}
          >
            Wear Anything.<br />
            <span className="gradient-text">Look Perfect.</span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontSize: "1.1rem",
              color: "var(--text-2)",
              lineHeight: 1.7,
              marginBottom: "36px",
              maxWidth: "480px",
            }}
          >
            Upload your photo, choose an outfit, and see yourself styled —
            instantly. No downloads, no app, just pure AI.
          </motion.p>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: "flex", gap: "24px", flexWrap: "wrap", marginBottom: "40px" }}
          >
            {STATS.map((s) => (
              <div key={s.label} style={{
                display: "flex", alignItems: "center", gap: "8px",
                fontFamily: "var(--font-mono)", fontSize: "0.85rem",
                color: "var(--text-3)",
              }}>
                <span style={{ color: "var(--accent)" }}>{s.icon}</span>
                {s.label}
              </div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}
          >
            <button
              onClick={onCTAClick}
              className="btn-primary"
              style={{ padding: "14px 28px", fontSize: "0.95rem", borderRadius: "12px" }}
            >
              <Sparkles size={16} />
              Start Trying On
            </button>
            <a
              href="https://github.com/K-mangda/TRYON.AI"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
              style={{ padding: "14px 24px", fontSize: "0.9rem", textDecoration: "none" }}
            >
              View on GitHub
            </a>
          </motion.div>
        </motion.div>

        {/* ── Layer 2: Mock UI Preview Card (medium) ──── */}
        <motion.div
          style={{
            y: cardY,
            pointerEvents: "none",
            perspective: "1200px",
            marginRight: "40px",
          }}
          className="hidden lg:block"
        >
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{
              width: "360px",
              background: "rgba(15,15,26,0.9)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "24px",
              padding: "20px",
              boxShadow: "0 40px 100px rgba(0,0,0,0.5), 0 0 0 1px rgba(99,102,241,0.1)",
              backdropFilter: "blur(20px)",
              rotateX: rotateX,
              rotateY: rotateY,
              rotateZ: rotateZ,
              transformStyle: "preserve-3d",
            }}
          >
            {/* Mock app UI */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
              <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#ef4444" }} />
              <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#f59e0b" }} />
              <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#22c55e" }} />
              <span style={{ marginLeft: "8px", fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "var(--text-3)" }}>
                tryon.ai/studio
              </span>
            </div>

            {/* Step indicator mock */}
            <div style={{ display: "flex", gap: "6px", marginBottom: "16px" }}>
              {[1,2,3,4].map((n) => (
                <div key={n} style={{
                  flex: 1, height: "3px", borderRadius: "99px",
                  background: n <= 2 ? "var(--accent)" : "rgba(255,255,255,0.08)",
                }} />
              ))}
            </div>

            {/* Upload area mock */}
            <div style={{
              border: "2px dashed rgba(99,102,241,0.3)",
              borderRadius: "14px",
              padding: "24px",
              textAlign: "center",
              marginBottom: "12px",
              background: "rgba(99,102,241,0.04)",
            }}>
              <div style={{ display: "flex", justifyContent: "center", marginBottom: "8px", color: "var(--accent)" }}>
                <User size={28} />
              </div>
              <p style={{ fontSize: "0.75rem", color: "var(--text-3)", fontFamily: "var(--font-body)" }}>
                Drop your photo here
              </p>
            </div>

            {/* Mode selector mock */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginBottom: "12px" }}>
              {[
                { icon: <User size={16} />, label: "Full Outfit", active: true },
                { icon: <Shirt size={16} />, label: "Top Only", active: false },
                { icon: <Layers size={16} />, label: "Bottom Only", active: false },
                { icon: <Sparkles size={16} />, label: "Mix & Match", active: false },
              ].map((m) => (
                <div key={m.label} style={{
                  padding: "8px",
                  borderRadius: "10px",
                  border: m.active ? "1px solid var(--accent)" : "1px solid rgba(255,255,255,0.06)",
                  background: m.active ? "rgba(99,102,241,0.12)" : "transparent",
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}>
                  <div style={{ color: m.active ? "#a5b4fc" : "var(--text-3)", marginBottom: "4px" }}>{m.icon}</div>
                  <div style={{ fontSize: "0.6rem", color: m.active ? "#a5b4fc" : "var(--text-3)" }}>{m.label}</div>
                </div>
              ))}
            </div>

            {/* Generate button mock */}
            <div style={{
              background: "var(--accent)",
              borderRadius: "10px",
              padding: "10px",
              textAlign: "center",
              fontSize: "0.8rem",
              color: "white",
              fontWeight: 600,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "6px"
            }}>
              <Sparkles size={14} /> Generate Look
            </div>
          </motion.div>

          {/* Floating badges */}
          <motion.div
            animate={{ y: [-6, 6, -6] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            style={{
              position: "absolute", top: "-20px", right: "-20px",
              background: "rgba(15,15,26,0.9)",
              border: "1px solid rgba(99,102,241,0.3)",
              borderRadius: "12px",
              padding: "8px 14px",
              fontSize: "0.75rem",
              fontFamily: "var(--font-mono)",
              color: "#a5b4fc",
              backdropFilter: "blur(10px)",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              z: 40,
            }}
          >
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#22c55e", display: "inline-block" }} />
            AI Ready
          </motion.div>

          <motion.div
            animate={{ y: [6, -6, 6] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            style={{
              position: "absolute", bottom: "20px", left: "-30px",
              background: "rgba(15,15,26,0.9)",
              border: "1px solid rgba(34,211,238,0.25)",
              borderRadius: "12px",
              padding: "8px 14px",
              fontSize: "0.75rem",
              color: "#67e8f9",
              backdropFilter: "blur(10px)",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              z: 50,
            }}
          >
            <Zap size={12} />
            &lt; 10s generate
          </motion.div>
        </motion.div>
      </div>

      {/* ── Scroll indicator ─────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        style={{
          position: "absolute",
          bottom: "32px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
          zIndex: 10,
        }}
      >
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "var(--text-3)", letterSpacing: "0.1em" }}>
          SCROLL
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={14} color="var(--text-3)" />
        </motion.div>
      </motion.div>
    </section>
  );
}
