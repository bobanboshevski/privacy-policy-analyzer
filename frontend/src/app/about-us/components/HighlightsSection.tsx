import React from "react";
import { FaShieldAlt, FaBrain, FaUsers } from "react-icons/fa";
import HighlightCard from "./HighlightCard";

const HighlightsSection = ({ isVisible }: { isVisible: boolean }) => (
  <section className={`max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
    <HighlightCard
      icon={<FaShieldAlt className="text-emerald-400 text-6xl mb-6" />}
      title="Compliance First"
      description="Automatically check for GDPR and CCPA compliance using advanced legal keyword detection and comprehensive coverage analysis."
      gradient="from-emerald-500/20 to-green-500/20"
      delay="0s"
    />
    <HighlightCard
      icon={<FaBrain className="text-purple-400 text-6xl mb-6" />}
      title="AI-Powered Insights"
      description="Harness cutting-edge NLP to break down policy readability, complexity, sentiment analysis, and user-focused recommendations."
      gradient="from-purple-500/20 to-pink-500/20"
      delay="0.2s"
    />
    <HighlightCard
      icon={<FaUsers className="text-blue-400 text-6xl mb-6" />}
      title="Built by Students"
      description="Created by passionate students dedicated to bringing privacy clarity and transparency to users and companies worldwide."
      gradient="from-blue-500/20 to-cyan-500/20"
      delay="0.4s"
    />
  </section>
);

export default HighlightsSection;