"use client";
import React, { useState, useEffect } from "react";
import BackgroundElements from "./components/BackgroundElements";
import HeroSection from "./components/HeroSection";
import HighlightsSection from "./components/HighlightsSection";
import VisionSection from "./components/VisionSection";
import TeamSection from "./components/TeamSection";

const AboutPage = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const handleMouseMove = (e: { clientX: any; clientY: any; }) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white py-16 px-4 md:px-8 relative overflow-hidden">
      <BackgroundElements mousePosition={mousePosition} />
      <HeroSection isVisible={isVisible} />
      <HighlightsSection isVisible={isVisible} />
      <VisionSection isVisible={isVisible} />
      <TeamSection isVisible={isVisible} />
    </div>
  );
};

export default AboutPage;