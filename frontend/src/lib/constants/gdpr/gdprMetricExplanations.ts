export const gdprMetricExplanations: Record<string, string> = {
    lawful_basis_coverage: "Measures if the document explains a lawful basis for data processing under GDPR Article 6. Higher scores (closer to 1.0) indicate strong legal justification coverage.",
    data_subject_rights_coverage: "Measures if user rights (access, erasure, rectification, etc.) are clearly explained. A higher score (close to 1.0) indicates better compliance.",
    consent_mechanism_quality: "Evaluates clarity and quality of consent mechanisms (e.g., opt-out, informed choice). A score close to 1.0 means the consent approach is likely GDPR-compliant.",
    dpo_information: "Checks for the presence of Data Protection Officer contact details. A score of 1.0 means the DPO is clearly identified and reachable.",
    international_transfers: "Measures if international data transfers and safeguards (e.g., SCCs, adequacy) are disclosed. A higher score (near 1.0) is ideal.",
    security_measures: "Evaluates if technical and organizational security practices are described. Scores near 1.0 indicate thorough security disclosures.",
    breach_notification: "Checks for procedures regarding data breach notifications. A good score is ≥ 0.8, showing strong incident response transparency.",
    retention_periods: "Assesses clarity on how long data is stored and when it’s deleted. A score ≥ 0.75 suggests good retention transparency.",
    overall_score: "Overall GDPR readiness score based on all sub-metrics. Scores above 0.8 suggest strong compliance."
}