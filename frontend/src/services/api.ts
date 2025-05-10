/**
 * Base API client for making HTTP requests
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL || '';

/**
 * Generic function for making API requests
 */
// export async function fetchFromApi<T>(
//     endpoint: string = '',
//     options: RequestInit = {}
// ): Promise<T> {
//     try {
//         const url = `${API_URL}${endpoint}`;
//         const response = await fetch(url, {
//             headers: {
//                 'Content-Type': 'application/json',
//                 ...options.headers,
//             },
//             ...options,
//         });
//
//         if (!response.ok) {
//             throw new Error(`API error: ${response.status}`);
//         }
//
//         // Check if the response is expected to be JSON
//         const contentType = response.headers.get('content-type');
//         if (contentType && contentType.includes('application/json')) {
//             return await response.json();
//         } else {
//             // For text responses
//             const text = await response.text();
//             return text as unknown as T;
//         }
//     } catch (error) {
//         console.error('API request failed:', error);
//         throw error;
//     }
// }
export async function fetchFromApi<T>(
    endpoint: string = '',
    options: RequestInit = {}
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

        const contentType = response.headers.get('content-type');
        if (contentType?.includes('application/json')) {
            return await response.json();
        } else {
            const text = await response.text();
            return text as unknown as T;
        }
    } catch (error) {
        console.error('API request failed:', error);
        throw error;
    }
}