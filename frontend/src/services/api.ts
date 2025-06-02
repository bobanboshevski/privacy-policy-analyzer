/**
 * Base API client for making HTTP requests
 */
import {auth} from "@/lib/firebase";

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

    // Get token if user is logged in
    const currentUser = auth.currentUser;
    const token = currentUser ? await currentUser.getIdToken() : null;

    const baseHeaders: HeadersInit =
        options.body instanceof FormData
            ? options.headers || {} // don't override content-type
            : {
                'Content-Type': 'application/json',
                ...(options.headers || {}),
            };

    const headers: HeadersInit = {
        ...baseHeaders,
        ...(token ? {Authorization: `Bearer ${token}`} : {}),
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