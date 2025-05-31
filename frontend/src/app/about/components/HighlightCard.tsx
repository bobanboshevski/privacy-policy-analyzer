import React from "react";

const HighlightCard = ({
  icon,
  title,
  description,
  gradient,
  delay
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient: string;
  delay: string;
}) => (
  <div
    className={`bg-white/5 backdrop-blur-xl shadow-2xl rounded-2xl p-8 hover:bg-white/10 hover:scale-105 transition-all duration-500 border border-white/10 group relative overflow-hidden`}
    style={{ animationDelay: delay }}
  >
    <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
    <div className="relative z-10">
      <div className="transform group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="font-bold text-2xl mb-4 text-white">{title}</h3>
      <p className="text-slate-300 leading-relaxed">{description}</p>
    </div>
  </div>
);

export default HighlightCard;
