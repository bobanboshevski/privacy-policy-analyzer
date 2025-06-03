import {useState} from "react";
import {analyzeUrl} from "@/services/privacyAnalyzer";
import {AnalysisMode, AnalyzedPrivacyResponse} from "@/lib/types/privacyAnalyzer";
import AnalysisResultContainer from "@/components/ui/AnalysisResultContainer";
import {ApiError} from "@/lib/types/input";
import LoadingTips from "@/components/ui/LoadingTips";

export default function UrlInputForm() {
    const [url, setUrl] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [result, setResult] = useState<AnalyzedPrivacyResponse | null>(null);
    const [loading, setLoading] = useState(false);

    const [mode, setMode] = useState<AnalysisMode>(AnalysisMode.SIMPLE);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!url.trim()) {
            setError("Please enter a URL.");
            return;
        }

        try {
            // new URL(url);
            setError(null);
            setLoading(true);

            const response = await analyzeUrl(url.trim());
            setResult(response);
            console.log("Scraped response:", response);
        } catch (err) {
            const error = err as ApiError;
            console.error("Error during analyzeUrl:", error);
            setError(error.message || "Failed to analyze URL.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="sm:w-[400px] md:w-[600px] lg:w-[800px] space-y-4 mb-4">
                <input
                    className="w-full p-3 border rounded-lg text-white bg-gray-800"
                    placeholder="Enter URL to privacy policy"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                />

                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded"
                        disabled={loading}
                    >
                        {loading ? "Analyzing..." : "Analyze URL"}
                    </button>
                </div>
                {loading && <LoadingTips colorClass="text-green-600"/>}
            </form>

            <AnalysisResultContainer
                error={error}
                result={result}
                mode={mode}
                setMode={setMode}
            />
        </>
    );
}
