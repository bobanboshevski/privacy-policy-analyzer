import {fetchFromApi} from "@/services/api";

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
export async function analyzePdfFile(file: File): Promise<string> {
    const formData = new FormData();
    formData.append('pdf', file);

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/analyze/pdf`, {
        method: 'POST',
        body: formData,
    });

    if (!response.ok) {
        throw new Error('Failed to analyze PDF');
    }

    return await response.text(); // or `.json()` depending on API
}
