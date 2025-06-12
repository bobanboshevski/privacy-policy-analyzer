interface Props {
  score: number;
}

export default function ComplianceScoreDisplay({ score }: Props) {
  let scoreColor = '';

  if (score < 50) {
    scoreColor = 'text-red-500';
  } else if (score < 75) {
    scoreColor = 'text-yellow-400';
  } else {
    scoreColor = 'text-green-400';
  }

  return (
    <div className="text-left">
      <h3 className="font-semibold text-lg">Compliance Score</h3>
      <div className={`text-3xl font-bold ${scoreColor}`}>
        {(score).toFixed(0)}%
      </div>
    </div>
  );
}
