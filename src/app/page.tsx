"use client";
import { useRef } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import StudioSection from "@/components/sections/StudioSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import HowItWorks from "@/components/sections/HowItWorks";
import GallerySection from "@/components/sections/GallerySection";

export default function Home() {
  const studioRef = useRef<HTMLDivElement>(null);

  const scrollToStudio = () => {
    studioRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main style={{ background: "var(--bg-base)", minHeight: "100vh", overflowX: "hidden" }}>
      <Navbar onCTAClick={scrollToStudio} />
      <HeroSection onCTAClick={scrollToStudio} />
      <div ref={studioRef}>
        <StudioSection />
      </div>
      <FeaturesSection />
      <HowItWorks />
      <GallerySection />
      <Footer />
    </main>
  );
}
