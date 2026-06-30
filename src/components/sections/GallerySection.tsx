"use client";
import { motion } from "framer-motion";

// Sample gallery items using existing public images + color overlays
const GALLERY = [
  { id: 1, src: "/miles_casual.jpg",  label: "Casual Set",     bg: "Sky Blue",   filter: "Golden Hour", height: 320 },
  { id: 2, src: "/spiderman.jpg",     label: "Full Outfit",    bg: "Studio",     filter: "Cinematic",   height: 240 },
  { id: 3, src: "/peter.jpg",         label: "Top Only",       bg: "White",      filter: "Butter Skin", height: 280 },
  { id: 4, src: "/miles_casual.jpg",  label: "Mix & Match",    bg: "Park",       filter: "Dreamy",      height: 260 },
  { id: 5, src: "/spiderman.jpg",     label: "Bottom Only",    bg: "Sunrise",    filter: "Soft Glam",   height: 300 },
  { id: 6, src: "/peter.jpg",         label: "Formal Set",     bg: "Gray",       filter: "Natural",     height: 220 },
];

export default function GallerySection() {
  // Split into 3 columns
  const col1 = GALLERY.filter((_, i) => i % 3 === 0);
  const col2 = GALLERY.filter((_, i) => i % 3 === 1);
  const col3 = GALLERY.filter((_, i) => i % 3 === 2);

  return (
    <section
      id="gallery"
      style={{ padding: "100px 24px", maxWidth: "1100px", margin: "0 auto" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{ textAlign: "center", marginBottom: "56px" }}
      >
        <span className="badge badge-indigo" style={{ marginBottom: "16px" }}>Gallery</span>
        <h2
          className="font-display"
          style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 700, letterSpacing: "-0.03em" }}
        >
          See what&apos;s possible
        </h2>
        <p style={{ color: "var(--text-2)", marginTop: "12px", fontSize: "1rem" }}>
          Real results from the Virtual Try-On studio
        </p>
      </motion.div>

      {/* Masonry grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", alignItems: "start" }}>
        {[col1, col2, col3].map((col, ci) => (
          <div key={ci} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {col.map((item, ii) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: (ci * 0.1) + (ii * 0.08), duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                style={{ position: "relative", borderRadius: "16px", overflow: "hidden", cursor: "pointer", group: "" }}
                className="bento-card"
              >
                <img
                  src={item.src}
                  alt={item.label}
                  style={{
                    width: "100%",
                    height: `${item.height}px`,
                    objectFit: "cover",
                    display: "block",
                    transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1)",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                />
                {/* Hover overlay */}
                <div style={{
                  position: "absolute", inset: 0,
                  background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 50%)",
                  opacity: 0,
                  transition: "opacity 0.3s",
                  display: "flex", alignItems: "flex-end", padding: "16px",
                }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = "0")}
                >
                  <div>
                    <p style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "0.9rem", color: "white" }}>
                      {item.label}
                    </p>
                    <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "rgba(255,255,255,0.6)", marginTop: "2px" }}>
                      {item.bg} · {item.filter}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
