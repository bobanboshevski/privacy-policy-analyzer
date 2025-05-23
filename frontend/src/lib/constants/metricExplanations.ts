export const metricExplanations: Record<string, string> = {
    flesch_score: "Higher scores indicate easier reading (0-100 scale).",
    gunning_fog_index: "Estimates the years of formal education needed to understand.",
    smog_index: "Estimates years of education needed to understand (for longer texts).",
    dale_chall_score: "Measures text complexity based on familiar words.",
    flesch_kincaid_grade: "Grade level required to understand the text.",
    word_count: "Total number of words in the document.",
    sentence_count: "Total number of sentences.",
    avg_sentence_length: "Average number of words per sentence.",
    avg_word_length: "Average number of characters per word.",
    syntactic_depth: "Complexity of sentence structure.",
    vague_word_ratio: "Percentage of vague or ambiguous words.",
    passive_voice_ratio: "Proportion of passive voice usage.",
    conditional_statement_ratio: "Frequency of conditional statements like 'if', 'might'.",
    coverage_score: "How well the document covers expected topics.",
    subjectivity: "How subjective the text is (0-1 scale).",
    polarity: "Sentiment polarity, negative to positive (-1 to 1).",
    opinion_density: "Frequency of opinions or judgments.",
    pronoun_ratio: "Frequency of personal pronouns.",
    rights_phrase_density: "Density of rights-related phrases.",
    call_to_action_presence: "Presence of strong user directives."
};