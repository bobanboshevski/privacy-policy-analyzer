import {AnalyzedGdprPrivacyResponse} from "@/lib/types/gdpr/gdprPrivacyAnalyzer";
import {fetchFromApi} from "@/services/api";

/**
 * Get privacy policy response for the text from the GDPR analyzer
 */
export async function analyzeText(text: string): Promise<AnalyzedGdprPrivacyResponse> {
    return await fetchFromApi<AnalyzedGdprPrivacyResponse>('/api/analyze/text/gdpr-compliance', {
        method: 'POST',
        body: JSON.stringify({text}),
        headers: {}
    });
}

/**
 * Get privacy policy response from the URL for the GDPR analyzer
 */
export async function analyzeUrl(trimmedUrl: string): Promise<AnalyzedGdprPrivacyResponse> {
    return await fetchFromApi<AnalyzedGdprPrivacyResponse>('/api/analyze/url/gdpr-compliance', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({url: trimmedUrl}),
    });
}

/**
 * Get privacy policy response for the PDF from the GDPR analyzer
 */
export async function analyzePdfFile(file: File): Promise<AnalyzedGdprPrivacyResponse> {
    const formData = new FormData();
    formData.append('file', file);

    return await fetchFromApi<AnalyzedGdprPrivacyResponse>('/api/analyze/pdf/gdpr-compliance/pdf-parse', {
        method: 'POST',
        body: formData,
        headers: {},
    });
}