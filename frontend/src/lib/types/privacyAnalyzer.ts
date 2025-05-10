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
            pageCount: number
        }
    };
};

// types/privacyAnalyzer.ts
export type AnalyzeUrlResponse = {
    success: boolean;
    extractedText: string;
  };
  