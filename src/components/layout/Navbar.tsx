"use client";
import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Code2, Menu, X } from "lucide-react";

interface NavbarProps {
  onCTAClick: () => void;
}

export default function Navbar({ onCTAClick }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: "0 24px",
        height: "64px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: scrolled ? "rgba(8,8,16,0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "1px solid transparent",
        transition: "background 0.3s, border-color 0.3s, backdrop-filter 0.3s",
      }}
    >
      {/* Logo */}
      <div 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}
      >
        <div style={{
          width: "8px", height: "8px", borderRadius: "50%",
          background: "var(--accent)",
          boxShadow: "0 0 12px var(--accent)",
          animation: "pulse-glow 2s ease-in-out infinite",
        }} />
        <span style={{
          fontFamily: "var(--font-display)",
          fontWeight: 700,
          fontSize: "1.1rem",
          letterSpacing: "-0.02em",
          color: "white",
        }}>
          TRYON<span style={{ color: "var(--accent)" }}>.AI</span>
        </span>
      </div>

      {/* Desktop Nav Links */}
      <div style={{ display: "flex", gap: "32px", alignItems: "center" }}
        className="hidden md:flex"
      >
        {["Features", "How It Works", "Gallery"].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase().replaceAll(" ", "-")}`}
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.875rem",
              fontWeight: 500,
              color: "var(--text-2)",
              textDecoration: "none",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "white")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-2)")}
          >
            {item}
          </a>
        ))}
      </div>

      {/* Right Controls */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <a
          href="https://github.com/K-mangda"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "var(--text-2)", transition: "color 0.2s" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "white")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-2)")}
          className="hidden md:flex"
        >
          <Code2 size={18} />
        </a>
        <a
          href="https://www.linkedin.com/in/korawit-thipmonthian-2b644b41a/"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "var(--text-2)", transition: "color 0.2s" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#0a66c2")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-2)")}
          className="hidden md:flex"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
            <rect width="4" height="12" x="2" y="9" />
            <circle cx="4" cy="4" r="2" />
          </svg>
        </a>
        <button
          onClick={onCTAClick}
          className="btn-primary hidden md:flex"
          style={{ padding: "8px 18px", fontSize: "0.825rem", borderRadius: "10px" }}
        >
          Try It Free
        </button>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ color: "var(--text-2)", background: "none", border: "none", cursor: "pointer" }}
          className="flex md:hidden"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            position: "absolute",
            top: "64px",
            left: 0,
            right: 0,
            background: "rgba(8,8,16,0.98)",
            backdropFilter: "blur(20px)",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
            padding: "20px 24px",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          {["Features", "How It Works", "Gallery"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replaceAll(" ", "-")}`}
              onClick={() => setMenuOpen(false)}
              style={{ color: "var(--text-2)", textDecoration: "none", fontSize: "0.95rem" }}
            >
              {item}
            </a>
          ))}
          <button onClick={() => { onCTAClick(); setMenuOpen(false); }} className="btn-primary" style={{ justifyContent: "center" }}>
            Try It Free
          </button>
        </motion.div>
      )}
    </motion.nav>
  );
}
