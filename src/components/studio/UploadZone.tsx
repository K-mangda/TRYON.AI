"use client";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Upload, ImageIcon, X, Check, User, UserRound, Sun, Sparkles } from "lucide-react";

interface Props {
  onUpload: (src: string) => void;
  initialPreview?: string | null;
}

export default function UploadZone({ onUpload, initialPreview }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(initialPreview || null);
  const [error, setError] = useState<string | null>(null);

  const handleFile = (file: File) => {
    setError(null);
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      setError("Please use JPG, PNG, or WEBP"); return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setError("File too large (max 10MB)"); return;
    }
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault(); setDragging(false);
    const f = e.dataTransfer.files[0];
    if (f) handleFile(f);
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) handleFile(f);
  };

  if (preview) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "24px" }}
      >
        <div style={{ position: "relative", display: "inline-block" }}>
          <img
            src={preview}
            alt="Your photo"
            style={{
              maxHeight: "420px", maxWidth: "100%",
              borderRadius: "20px",
              objectFit: "cover",
              border: "1px solid rgba(255,255,255,0.1)",
              boxShadow: "0 24px 60px rgba(0,0,0,0.5)",
            }}
          />

          {/* Change photo button */}
          <button
            onClick={() => setPreview(null)}
            style={{
              position: "absolute", top: "12px", right: "12px",
              width: "32px", height: "32px",
              borderRadius: "50%",
              background: "rgba(8,8,16,0.85)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "var(--text-2)",
              cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              backdropFilter: "blur(10px)",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(239,68,68,0.2)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(8,8,16,0.85)")}
          >
            <X size={14} />
          </button>
        </div>
        <motion.button
          className="btn-primary"
          onClick={() => onUpload(preview)}
          style={{ 
            marginTop: "16px",
            padding: "14px 40px", 
            fontSize: "1rem", 
            fontWeight: 500,
            gap: "8px",
          }}
        >
          <span>Continue</span>
        </motion.button>
      </motion.div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "32px" }}>
      {/* Drop zone */}
      <motion.div
        className={`upload-zone ${dragging ? "drag-over" : ""}`}
        style={{
          width: "100%", maxWidth: "560px",
          padding: "64px 32px",
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          gap: "16px", cursor: "pointer",
          textAlign: "center",
        }}
        whileHover={{ scale: 1.01 }}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        onClick={() => inputRef.current?.click()}
      >
        <motion.div
          animate={dragging ? { scale: 1.15 } : { scale: 1 }}
          style={{
            width: "64px", height: "64px",
            background: "rgba(99,102,241,0.1)",
            borderRadius: "16px",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}
        >
          {dragging ? <ImageIcon size={28} color="var(--accent)" /> : <Upload size={28} color="var(--accent)" />}
        </motion.div>

        <div>
          <p style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "1.1rem", color: "white", marginBottom: "6px" }}>
            {dragging ? "Drop it here!" : "Drop your photo here"}
          </p>
          <p style={{ fontSize: "0.875rem", color: "var(--text-3)" }}>
            or click to browse — JPG, PNG, WEBP · max 10MB
          </p>
        </div>

        {error && (
          <p style={{ fontSize: "0.8rem", color: "#f87171", fontFamily: "var(--font-mono)" }}>{error}</p>
        )}

        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          style={{ display: "none" }}
          onChange={onInputChange}
        />
      </motion.div>

      {/* Tips */}
      <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", justifyContent: "center" }}>
        {[
          { icon: <User size={14} />, tip: "Full body works best" },
          { icon: <UserRound size={14} />, tip: "Half body is fine too" },
          { icon: <Sun size={14} />, tip: "Good lighting helps" },
        ].map((t) => (
          <div key={t.tip} style={{
            display: "flex", alignItems: "center", gap: "8px",
            background: "var(--glass-bg)",
            border: "1px solid var(--glass-border)",
            borderRadius: "10px",
            padding: "8px 16px",
            fontSize: "0.8rem",
            color: "var(--text-3)",
          }}>
            <span>{t.icon}</span> {t.tip}
          </div>
        ))}
      </div>
    </div>
  );
}
