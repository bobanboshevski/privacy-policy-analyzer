export type AnalyzePdfResponse = {
    success: boolean;
    data: {
        extractedText: string;
        metadata: {
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
        flesch_score: number,
        gunning_fog_index: number,
        word_count: number,
        sentence_count: number,
    },
    summary: string
};

export type AnalyzeUrlResponse = {
    success: boolean;
    extractedText: string;
};

export enum AnalysisMode {
    SIMPLE = 'simple',
    EXPERT = 'expert',
}
  