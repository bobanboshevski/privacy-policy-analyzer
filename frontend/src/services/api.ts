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
        let errorMessage = `API error: ${response.status}`;

        try {
            const errorBody: { error?: string } = await response.json();
            if (errorBody?.error) {
                errorMessage = errorBody.error;
            }
        } catch (jsonError) {
            console.warn("Failed to parse error response as JSON:", jsonError);
        }
        const error = new Error(errorMessage);
        Object.assign(error, {status: response.status});
        throw error;
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
}