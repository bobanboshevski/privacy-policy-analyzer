import {AnalyzedCcpaPrivacyResponse} from "@/lib/types/ccpa/ccpaPrivacyAnalyzer";
import {fetchFromApi} from "@/services/api";

/**
 * Get privacy policy response for the text from the CCPA analyzer
 */
export async function analyzeText(text: string): Promise<AnalyzedCcpaPrivacyResponse> {
    return await fetchFromApi<AnalyzedCcpaPrivacyResponse>('/api/analyze/text/ccpa-compliance', {
        method: 'POST',
        body: JSON.stringify({text}),
        headers: {}
    });
}

/**
 * Get privacy policy response from the URL for the CCPA analyzer
 */
export async function analyzeUrl(trimmedUrl: string): Promise<AnalyzedCcpaPrivacyResponse> {
    return await fetchFromApi<AnalyzedCcpaPrivacyResponse>('/api/analyze/url/ccpa-compliance', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({url: trimmedUrl}),
    });
}

/**
 * Get privacy policy response for the PDF from the CCPA analyzer
 */
export async function analyzePdfFile(file: File): Promise<AnalyzedCcpaPrivacyResponse> {
    const formData = new FormData();
    formData.append('file', file);

    return await fetchFromApi<AnalyzedCcpaPrivacyResponse>('/api/analyze/pdf/ccpa-compliance/pdf-parse', {
        method: 'POST',
        body: formData,
        headers: {},
    });
}