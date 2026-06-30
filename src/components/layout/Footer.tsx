"use client";
import { motion } from "framer-motion";
import { Globe, ExternalLink, Code2 } from "lucide-react";

const TECH_STACK = ["Next.js 16", "React 19", "TypeScript", "Framer Motion", "Tailwind CSS v4"];

export default function Footer() {
  return (
    <footer style={{
      borderTop: "1px solid rgba(255,255,255,0.06)",
      padding: "60px 24px 40px",
      background: "var(--bg-base)",
    }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "48px", marginBottom: "48px" }}
          className="grid-cols-1 md:grid-cols-3"
        >
          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
              <div style={{
                width: "8px", height: "8px", borderRadius: "50%",
                background: "var(--accent)",
                boxShadow: "0 0 12px var(--accent)",
              }} />
              <span style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "1.1rem",
                color: "white",
              }}>
                TRYON<span style={{ color: "var(--accent)" }}>.AI</span>
              </span>
            </div>
            <p style={{ fontSize: "0.875rem", color: "var(--text-3)", lineHeight: 1.6, maxWidth: "220px" }}>
              Virtual try-on studio built as a GitHub portfolio project.
            </p>
          </div>

          {/* Tech Stack */}
          <div>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "var(--text-3)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "16px" }}>
              Built with
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {TECH_STACK.map((tech) => (
                <span key={tech} style={{ fontSize: "0.85rem", color: "var(--text-2)" }}>
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "var(--text-3)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "16px" }}>
              Find me
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <a
                href="https://github.com/K-mangda"
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--text-2)", textDecoration: "none", fontSize: "0.875rem", transition: "color 0.2s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "white")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-2)")}
              >
                <Code2 size={15} /> GitHub
                <ExternalLink size={11} style={{ opacity: 0.5 }} />
              </a>
              <a
                href="https://www.linkedin.com/in/korawit-thipmonthian-2b644b41a/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--text-2)", textDecoration: "none", fontSize: "0.875rem", transition: "color 0.2s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "white")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-2)")}
              >
                <Globe size={15} /> LinkedIn
                <ExternalLink size={11} style={{ opacity: 0.5 }} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: "1px solid rgba(255,255,255,0.06)",
          paddingTop: "24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "12px",
        }}>
          <p style={{ fontSize: "0.8rem", color: "var(--text-3)" }}>
            Built for portfolio · Open source on GitHub
          </p>
          <p style={{ fontSize: "0.8rem", color: "var(--text-3)", fontFamily: "var(--font-mono)" }}>
            2025 · K-mangda
          </p>
        </div>
      </div>
    </footer>
  );
}
