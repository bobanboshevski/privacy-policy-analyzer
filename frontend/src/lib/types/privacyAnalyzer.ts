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