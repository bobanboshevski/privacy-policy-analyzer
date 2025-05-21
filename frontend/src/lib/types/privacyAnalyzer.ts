export type AnalyzedPrivacyResponse = {
    success: boolean;
    data: {
        extractedText: string;
        metadata?: {
            info: {
                CreationDate: string,
                IsAcroFormPresent: boolean,
                IsXFAPresent: boolean,
                ModDate: string,
                PDFFormatVersion: string,
                Producer: string
            },
            pageCount: number,
        },
    },
    nlpAnalysis: {
        readability: {
            flesch_score: number,
            gunning_fog_index: number,
            smog_index: number,
            dale_chall_score: number,
            flesch_kincaid_grade: number
        },
        complexity: {
            word_count: number,
            sentence_count: number,
            avg_sentence_length: number,
            avg_word_length: number,
            syntactic_depth: number
        },
        ambiguity: {
            vague_word_ratio: number,
            passive_voice_ratio: number,
            conditional_statement_ratio: number
        },
        coverage: {
            coverage_score: number
        },
        sentiment: {
            subjectivity: number,
            polarity: number,
            opinion_density: number
        },
        userFocus: {
            pronoun_ratio: number,
            rights_phrase_density: number,
            call_to_action_presence: number
        }
    },
    summary: string,
    overallScore: number
};

export enum AnalysisMode {
    SIMPLE = 'simple',
    EXPERT = 'expert',
}
  