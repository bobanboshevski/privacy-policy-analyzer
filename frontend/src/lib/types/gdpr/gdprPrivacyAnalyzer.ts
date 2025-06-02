export type AnalyzedGdprPrivacyResponse = {
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
    gdprCompliance: {
        lawful_basis_coverage: number,
        data_subject_rights_coverage: number,
        consent_mechanism_quality: number,
        dpo_information: number,
        international_transfers: number,
        security_measures: number,
        breach_notification: number,
        retention_periods: number,
        overall_score: number,
        compliance_percentage: number,
        is_compliant: true
    }
}