import React from "react";

const VisionCard = ({
  icon,
  title,
  description
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => (
  <div className="text-center group">
    <div className="text-3xl text-purple-400 mb-3 transform group-hover:scale-110 transition-transform duration-300">
      {icon}
    </div>
    <h3 className="font-semibold text-white mb-2">{title}</h3>
    <p className="text-sm text-slate-400">{description}</p>
  </div>
);

export default VisionCard;
