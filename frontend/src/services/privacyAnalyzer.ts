import {fetchFromApi} from "@/services/api";
import {AnalyzedPrivacyResponse} from "@/lib/types/privacyAnalyzer";

/**
 * Get initial welcome message from the analyzer
 */
export async function getInitialMessage(): Promise<string> {
    return await fetchFromApi<string>('');
}

/**
 * Get privacy policy response from the URL for the analyzer
 */
export async function analyzeUrl(trimmedUrl: string): Promise<AnalyzedPrivacyResponse> {
    return await fetchFromApi<AnalyzedPrivacyResponse>('/api/analyze/url/scrape', {
        method: 'POST',
        body: JSON.stringify({url: trimmedUrl}),
    });
}

/**
 * Get privacy policy response for the PDF from the analyzer
 */
export async function analyzePdfFile(file: File): Promise<AnalyzedPrivacyResponse> {
    const formData = new FormData();
    formData.append('file', file);

    return await fetchFromApi<AnalyzedPrivacyResponse>('/api/analyze/pdf/pdf-parse', {
        method: 'POST',
        body: formData,
    });
}

/**
 * Get privacy policy response for the text from the analyzer
 */
export async function analyzeText(text: string): Promise<AnalyzedPrivacyResponse> {
    return await fetchFromApi<AnalyzedPrivacyResponse>('/api/analyze/text', {
        method: 'POST',
        body: JSON.stringify({text}),
    });
}
