interface Props {
    score: number;
}

export default function ScoreDisplay({score}: Props) {
    let scoreColor = '';

    if (score < 0.50) {
        scoreColor = 'text-red-500';
    } else if (score < 0.75) {
        scoreColor = 'text-yellow-400';
    } else {
        scoreColor = 'text-green-400';
    }

    return (
        <div>
            <h3 className="font-semibold text-lg">Overall Score</h3>
            <div className={`text-3xl font-bold ${scoreColor}`}>
                {(score * 10).toFixed(2)}
            </div>
        </div>
    );
}