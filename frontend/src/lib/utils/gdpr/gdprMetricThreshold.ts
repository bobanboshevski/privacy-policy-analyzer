export const gdprMetricThreshold: Record<string, (value: number) => boolean> = {
    lawful_basis_coverage: (value: number) => value < 0.8, // Below 0.8 means weak or missing justification
    data_subject_rights_coverage: (value: number) => value < 0.8, // Rights not clearly explained
    consent_mechanism_quality: (value: number) => value < 0.8, // Poor or unclear consent process
    dpo_information: (value: number) => value < 1.0, // DPO missing or not identifiable
    international_transfers: (value: number) => value < 0.8, // Missing cross-border data transfer info
    security_measures: (value: number) => value < 0.8, // Security practices not well explained
    breach_notification: (value: number) => value < 0.8, // Breach procedures not mentioned or vague
    retention_periods: (value: number) => value < 0.75, // No clear data retention policy
    overall_score: (value: number) => value < 0.8, // Overall GDPR readiness is poor
}