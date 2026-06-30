"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import StepIndicator from "@/components/studio/StepIndicator";
import UploadZone from "@/components/studio/UploadZone";
import ModeSelector from "@/components/studio/ModeSelector";
import GarmentSelector from "@/components/studio/GarmentSelector";
import CustomizePanel from "@/components/studio/CustomizePanel";
import ResultDisplay from "@/components/result/ResultDisplay";

export type Step = 1 | 2 | 3 | 4 | "result";
export type TryOnMode = "full" | "top" | "bottom" | "mix";
export type Garment = { id: string; name: string; color: string; category: string; gender: 'men' | 'women' | 'unisex'; customSrc?: string; styleCategory?: string; };
export type PoseOption = "standing" | "casual" | "power" | "walking";
export type BgOption = { type: 'preset' | 'color' | 'custom' | 'original'; value: string };

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
};

export default function StudioSection() {
  const [step, setStep] = useState<Step>(1);
  const [direction, setDirection] = useState(1);

  const [userPhoto, setUserPhoto] = useState<string | null>(null);
  const [mode, setMode] = useState<TryOnMode>("full");
  const [garment, setGarment] = useState<Garment | null>(null);
  const [topGarment, setTopGarment] = useState<Garment | null>(null);
  const [bottomGarment, setBottomGarment] = useState<Garment | null>(null);
  const [pose, setPose] = useState<string>("front");
  const [background, setBackground] = useState<BgOption>({ type: "original", value: "original" });

  const goTo = (s: Step) => {
    setDirection(stepNum(s) > stepNum(step) ? 1 : -1);
    setStep(s);
  };

  return (
    <section
      id="studio"
      style={{
        padding: "100px 24px",
        maxWidth: "1100px",
        margin: "0 auto",
        minHeight: "80vh",
      }}
    >
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{ textAlign: "center", marginBottom: "56px" }}
      >
        <span className="badge badge-indigo" style={{ marginBottom: "16px" }}>
          Try-On Studio
        </span>
        <h2
          className="font-display"
          style={{
            fontSize: "clamp(2rem, 5vw, 3rem)",
            fontWeight: 700,
            letterSpacing: "-0.03em",
            color: "white",
          }}
        >
          Style yourself in 4 steps
        </h2>
        <p style={{ color: "var(--text-2)", marginTop: "12px", fontSize: "1rem" }}>
          Upload, choose your mode, pick an outfit, and generate.
        </p>
      </motion.div>

      {/* Step Indicator */}
      {step !== "result" && (
        <StepIndicator currentStep={step as 1 | 2 | 3 | 4} />
      )}

      {/* Step Content */}
      <div style={{ marginTop: "48px", position: "relative", minHeight: "500px" }}>
        <AnimatePresence mode="wait" custom={direction}>
          {step === 1 && (
            <motion.div
              key="step1"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <UploadZone
                initialPreview={userPhoto}
                onUpload={(src) => { setUserPhoto(src); goTo(2); }}
              />
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <ModeSelector
                selected={mode}
                onSelect={(m) => { 
                  if (m !== mode) {
                    setGarment(null);
                    setTopGarment(null);
                    setBottomGarment(null);
                  }
                  setMode(m); 
                  goTo(3); 
                }}
                onBack={() => goTo(1)}
              />
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <GarmentSelector
                mode={mode}
                onSelect={(g) => { setGarment(g); goTo(4); }}
                onSelectTop={(g) => setTopGarment(g)}
                onSelectBottom={(g) => setBottomGarment(g)}
                topGarment={topGarment}
                bottomGarment={bottomGarment}
                onNext={() => goTo(4)}
                onBack={() => goTo(2)}
              />
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              key="step4"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <CustomizePanel
                pose={pose}
                background={background}
                onPoseChange={setPose}
                onBgChange={setBackground}
                onGenerate={() => goTo("result")}
                onBack={() => goTo(3)}
              />
            </motion.div>
          )}

          {step === "result" && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <ResultDisplay
                userPhoto={userPhoto}
                background={background}
                onTryAnother={() => goTo(3)}
                onStartOver={() => { setGarment(null); setTopGarment(null); setBottomGarment(null); goTo(1); }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

function stepNum(s: Step): number {
  if (s === "result") return 5;
  return s as number;
}
