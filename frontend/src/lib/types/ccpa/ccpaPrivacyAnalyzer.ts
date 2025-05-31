export type AnalyzedCcpaPrivacyResponse = {
    success: boolean,
    data: {
        extractedText: string,
        metadata?: {
            pageCount: number,
            info: {
                PDFFormatVersion: string,
                IsAcroFormPresent: false,
                IsXFAPresent: false,
                Producer: string,
                CreationDate: string,
                ModDate: string
            }
        }
    },
    ccpaCompliance: {
        right_to_know_coverage: number,
        right_to_delete_coverage: number,
        right_to_opt_out_coverage: number,
        non_discrimination_coverage: number,
        notice_at_collection: number,
        verification_process: number,
        authorized_agent_process: number,
        overall_score: number,
        compliance_percentage: number,
        is_compliant: true
    }
}