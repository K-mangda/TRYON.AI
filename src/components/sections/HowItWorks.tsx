"use client";
import { motion } from "framer-motion";
import { Upload, Shirt, Download } from "lucide-react";

const STEPS = [
  {
    n: "01",
    icon: <Upload size={24} />,
    title: "Upload Your Photo",
    desc: "Drag & drop or click to upload. Works with full body and half body shots.",
  },
  {
    n: "02",
    icon: <Shirt size={24} />,
    title: "Choose & Customize",
    desc: "Pick your mode, select a garment, then customize pose, background, and lighting.",
  },
  {
    n: "03",
    icon: <Download size={24} />,
    title: "Download & Share",
    desc: "Get your result in seconds. Apply filters, then download or share.",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      style={{
        padding: "100px 24px",
        borderTop: "1px solid rgba(255,255,255,0.04)",
        borderBottom: "1px solid rgba(255,255,255,0.04)",
        background: "rgba(255,255,255,0.01)",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{ textAlign: "center", marginBottom: "64px" }}
        >
          <span className="badge badge-indigo" style={{ marginBottom: "16px" }}>How It Works</span>
          <h2
            className="font-display"
            style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 700, letterSpacing: "-0.03em" }}
          >
            Three steps to your perfect look
          </h2>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0", position: "relative" }}>
          {/* Connector line */}
          <div style={{
            position: "absolute",
            top: "40px",
            left: "calc(100% / 6)",
            right: "calc(100% / 6)",
            height: "1px",
            background: "linear-gradient(90deg, transparent, rgba(99,102,241,0.3), rgba(34,211,238,0.3), transparent)",
          }} />

          {STEPS.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              style={{ padding: "0 24px", textAlign: "center" }}
            >
              {/* Icon circle */}
              <div style={{
                width: "80px", height: "80px",
                borderRadius: "50%",
                background: "var(--bg-surface)",
                border: "1px solid rgba(99,102,241,0.2)",
                display: "flex", alignItems: "center", justifyContent: "center",
                margin: "0 auto 24px",
                color: "var(--accent)",
                position: "relative",
                boxShadow: "0 0 32px rgba(99,102,241,0.1)",
              }}>
                {s.icon}
                <span style={{
                  position: "absolute", top: "-8px", right: "-8px",
                  fontFamily: "var(--font-mono)", fontSize: "0.65rem",
                  background: "var(--accent)", color: "white",
                  width: "22px", height: "22px", borderRadius: "50%",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontWeight: 700,
                }}>
                  {i + 1}
                </span>
              </div>

              <h3 className="font-display" style={{ fontSize: "1.1rem", fontWeight: 600, color: "white", marginBottom: "10px" }}>
                {s.title}
              </h3>
              <p style={{ fontSize: "0.875rem", color: "var(--text-3)", lineHeight: 1.65 }}>
                {s.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
