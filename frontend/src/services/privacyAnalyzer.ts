import {fetchFromApi} from "@/services/api";
import {AnalyzePdfResponse} from "@/lib/types/privacyAnalyzer";

/**
 * Get initial welcome message from the analyzer
 */
export async function getInitialMessage(): Promise<string> {
    return await fetchFromApi<string>('');
}

/**
 * Get privacy policy response for the text from the analyzer
 */


/**
 * Get privacy policy response for the URL from the analyzer
 */


/**
 * Get privacy policy response for the PDF from the analyzer
 */
// example that could be useful
export async function analyzePdfFile(file: File): Promise<AnalyzePdfResponse> {
    const formData = new FormData();
    formData.append('file', file);

    return await fetchFromApi<AnalyzePdfResponse>('/api/analyze/pdf/pdf-parse', {
        method: 'POST',
        body: formData,
        headers: {},
    });
}
