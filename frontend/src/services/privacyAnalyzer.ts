import {fetchFromApi} from "@/services/api";
import {AnalyzePdfResponse, AnalyzeUrlResponse} from "@/lib/types/privacyAnalyzer";

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
 * Get privacy policy response from the URL for the analyzer
 */
export async function analyzeUrl(trimmedUrl:string): Promise<AnalyzeUrlResponse> {


    return await fetchFromApi<AnalyzeUrlResponse>('/api/analyze/url/scrape', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: trimmedUrl }),
    });
  }

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
