/**
 * Base API client for making HTTP requests
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL || '';

/**
 * Generic function for making API requests
 */
export async function fetchFromApi<T>(
    endpoint: string = '',
    options: RequestInit = {},
    responseType: 'json' | 'text' | 'blob' = 'json'
): Promise<T> {
    try {
        const url = `${API_URL}${endpoint}`;

        const headers = options.body instanceof FormData
            ? options.headers || {} // don't set Content-Type for FormData
            : {
                'Content-Type': 'application/json',
                ...options.headers,
            };

        const response = await fetch(url, {
            ...options,
            headers,
        });

        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }

        if (responseType === 'blob') {
            return await response.blob() as T;
        }

        const contentType = response.headers.get('content-type');
        if (contentType?.includes('application/json')) {
            return await response.json(); // return await response.blob() as T;
        } else {
            const text = await response.text();
            return text as unknown as T;
        }
    } catch (error) {
        console.error('API request failed:', error);
        throw error;
    }
}