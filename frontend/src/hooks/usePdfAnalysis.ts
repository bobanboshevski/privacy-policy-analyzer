import {useState} from "react";
import {analyzePdfFile} from "@/services/privacyAnalyzer";


// This is an example. I'm not sure what is the best practice for the long run as the code gets bigger.
export function usePdfAnalysis() {
    const [result, setResult] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function submitPdf(file: File) {
        try {
            setLoading(true);
            setError(null);
            const res = await analyzePdfFile(file);
            setResult(res);
        } catch (err) {
            setError("Failed to analyze PDF");
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    return { submitPdf, result, loading, error };
}