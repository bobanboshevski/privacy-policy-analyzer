const metricExplanations = {
    flesch_score: "Higher scores indicate easier reading (0-100 scale). Good: 60–100 (easy), Bad: <30 (very difficult)",
    gunning_fog_index: "Estimates the years of formal education needed to understand. Good: <12 (high school level), Bad: >16 (college+)",
    smog_index: "Estimates years of education needed to understand (for longer texts). Like Gunning Fog, based on polysyllables. Good: <10 (easy), Bad: >14 (very hard)",
    dale_chall_score: "Measures text complexity based on familiar words. Good: <6 (understandable), Bad: >8 (difficult)",
    flesch_kincaid_grade: "U.S. school grade level. Grade level required to understand the text. Good: <10 (high school), Bad: >12 (college+)",

    word_count: "Total number of words in the document.",
    sentence_count: "Total number of sentences.",

    avg_sentence_length: "Average number of words per sentence. Good: 12–20 | Too high: > 25 (hard to follow)",
    avg_word_length: "Average number of characters per word. Good: 4–5 | Too high: > 6 (overly complex vocab)",
    syntactic_depth: "Complexity of sentence structure (average syntactic tree depth of sentences). Good: < 5 | High: > 7 (more nested, harder to parse)",

    vague_word_ratio: "Percentage of vague or ambiguous words. Good: < 0.02 | Bad: > 0.05",
    passive_voice_ratio: "Proportion of passive voice usage. Good: < 0.1 | Bad: > 0.2",
    conditional_statement_ratio: "Frequency of conditional statements like 'if', 'might', 'would'. Good: < 0.01 | Bad: > 0.03",

    coverage_score: "Measures how well the text covers key privacy topics using semantic similarity. Good: 0.75–1 (all major topics present), Poor: < 0.5 (few or no topics covered)",

    subjectivity: "How subjective the text is (0 = objective, 1 = subjective scale). Good: Depends on context; lower for factual docs like privacy policy.",
    polarity: "Sentiment polarity, negative to positive (-1 = negative to 1 = positive). Good: Near 0 for neutral texts like policies.",
    opinion_density: "Frequency of opinions or judgments. Fraction of sentences that are opinionated (subjectivity > 0.5). Good: Low for formal/legal text; high means opinion-heavy.",

    pronoun_ratio: "Frequency of personal pronouns. Measures the ratio of second-person pronouns (you, your, yours). Good: Higher ratio indicates more direct communication with the user. Bad: Lower ratio indicates less engagement.",
    rights_phrase_density: " Measures how often user rights-related phrases appear. Good: Higher ratio suggests clearer user rights explanation. Bad: Lower ratio suggests less emphasis on user rights.",
    call_to_action_presence: "Presence of strong user directives. Good: Presence indicates actionable instructions for users. Bad: Absence suggests lack of clear instructions or user engagement."
};

const metricThresholds = {
    flesch_score: value => value < 30,
    gunning_fog_index: value => value > 16,
    smog_index: value => value > 14,
    dale_chall_score: value => value > 8,
    flesch_kincaid_grade: value => value > 12,

    avg_sentence_length: value => value > 25,
    avg_word_length: value => value > 6,
    syntactic_depth: value => value > 7,

    vague_word_ratio: value => value > 0.05,
    passive_voice_ratio: value => value > 0.2,
    conditional_statement_ratio: value => value > 0.03,

    coverage_score: value => value < 0.5,

    subjectivity: value => value > 0.3,
    polarity: value => Math.abs(value) > 0.2,
    opinion_density: value => value > 0.2,

    pronoun_ratio: value => value < 0.02,
    rights_phrase_density: value => value < 0.1,
    call_to_action_presence: value => value === 0
};

module.exports = {
    metricExplanations,
    metricThresholds
};
