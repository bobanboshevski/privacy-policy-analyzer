import {useEffect, useState} from "react";
import {getInitialMessage} from "@/services/privacyAnalyzer";

/**
* Hook for fetching initial data from the API
*/
export function useApiData() {
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true);
                const data = await getInitialMessage();
                setMessage(data);
                setError(null);
            } catch (err) {
                console.error("Failed to fetch data:", err);
                setError("Error getting data from backend!");
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    return { message, loading, error };
}

/**
 * Hook for fetching text response
 */



/**
 * Hook for fetching url response
 */



/**
 * Hook for fetching pdf response
 */