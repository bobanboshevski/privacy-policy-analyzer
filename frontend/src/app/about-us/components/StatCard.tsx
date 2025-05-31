const StatCard = ({ number, label }: { number: string; label: string }) => (
  <div className="text-center">
    <div className="text-2xl font-bold text-purple-400 mb-1">{number}</div>
    <div className="text-sm text-slate-400">{label}</div>
  </div>
);

export default StatCard;
