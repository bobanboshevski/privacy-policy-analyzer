const metricWeights = {
    // Critical (total = 0.5)
    coverage_score: 0.125,
    vague_word_ratio: 0.125,
    rights_phrase_density: 0.125,
    call_to_action_presence: 0.125,

    // Medium (total = 0.3)
    flesch_score: 0.06,
    passive_voice_ratio: 0.06,
    subjectivity: 0.06,
    opinion_density: 0.06,
    polarity: 0.06,

    // Helpful (total = 0.2)
    avg_sentence_length: 0.04,
    avg_word_length: 0.04,
    pronoun_ratio: 0.04,
    syntactic_depth: 0.04,
    conditional_statement_ratio: 0.04
};

/**
 * Direction high means higher is better; direction low means lower is better
 * @type {{subjectivity: {min: number, max: number, direction: string}, conditional_statement_ratio: {min: number, max: number, direction: string}, pronoun_ratio: {min: number, max: number, direction: string}, passive_voice_ratio: {min: number, max: number, direction: string}, opinion_density: {min: number, max: number, direction: string}, avg_sentence_length: {min: number, max: number, direction: string}, vague_word_ratio: {min: number, max: number, direction: string}, call_to_action_presence: {special: string}, rights_phrase_density: {min: number, max: number, direction: string}, syntactic_depth: {min: number, max: number, direction: string}, avg_word_length: {min: number, max: number, direction: string}, coverage_score: {min: number, max: number, direction: string}, flesch_score: {min: number, max: number, direction: string}, polarity: {special: string}}}
 */

const normalizationConfig = {
    flesch_score: { min: 0, max: 100, direction: "high" },
    passive_voice_ratio: { min: 0, max: 0.3, direction: "low" },
    subjectivity: { min: 0, max: 1, direction: "low" },
    opinion_density: { min: 0, max: 1, direction: "low" },
    polarity: { special: "polarity" }, // between -1 and 1

    avg_sentence_length: { min: 5, max: 40, direction: "low" },
    avg_word_length: { min: 3, max: 8, direction: "low" },
    pronoun_ratio: { min: 0, max: 0.1, direction: "high" },
    syntactic_depth: { min: 2, max: 10, direction: "low" },
    conditional_statement_ratio: { min: 0, max: 0.05, direction: "low" },

    coverage_score: { min: 0, max: 1, direction: "high" },
    vague_word_ratio: { min: 0, max: 0.1, direction: "low" },
    rights_phrase_density: { min: 0, max: 0.2, direction: "high" },
    call_to_action_presence: { special: "boolean" }
};

function normalizeMetric(name, value) {
    const config = normalizationConfig[name];
    if (!config) return null;

    if (config.special === "polarity") {
        return Math.max(0, 1 - Math.abs(value)); // closer to 0 = better
    }

    if (config.special === "boolean") {
        return value === 1 ? 1 : 0;
    }

    const { min, max, direction } = config;
    let normalized = (value - min) / (max - min);
    if (direction === "low") normalized = 1 - normalized;

    return Math.max(0, Math.min(1, normalized));
}

function computeOverallScore(pythonAnalysisResult) {
    const flatMetrics = {
        ...pythonAnalysisResult.coverage,
        ...pythonAnalysisResult.ambiguity,
        ...pythonAnalysisResult.readability,
        ...pythonAnalysisResult.sentiment,
        ...pythonAnalysisResult.userFocus,
        ...pythonAnalysisResult.complexity
    };

    let total = 0;
    for (const [name, value] of Object.entries(flatMetrics)) {
        const weight = metricWeights[name];
        if (!weight) continue;

        const score = normalizeMetric(name, value);
        if (score == null) continue;

        total += score * weight;
    }
    return total; // between 0 - 1
}

module.exports = {
    computeOverallScore
};