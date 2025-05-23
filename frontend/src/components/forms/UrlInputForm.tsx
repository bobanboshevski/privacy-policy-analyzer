import {useState} from "react";
import {analyzeUrl} from "@/services/privacyAnalyzer";
import {AnalysisMode, AnalyzedPrivacyResponse} from "@/lib/types/privacyAnalyzer";
import AnalysisResultContainer from "@/components/ui/AnalysisResultContainer";
import {ApiError} from "@/lib/types/input";

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
            <form onSubmit={handleSubmit} className="sm:w-[400px] md:w-[600px] lg:w-[800px] space-y-4">
                <input
                    className="w-full p-3 border rounded-lg text-white bg-gray-800"
                    placeholder="Enter URL to privacy policy"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                />

                {/*{result && <p className="text-green-500 text-sm">{result.data.extractedText}</p>}*/}

                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded"
                        disabled={loading}
                    >
                        {loading ? "Analyzing..." : "Analyze URL"}
                    </button>
                </div>
                {/*extracted text in divs with scrolling*/}
                {/* {result?.extractedText && (
                <div className="mt-4 bg-gray-900 text-white p-4 rounded max-h-64 overflow-y-auto">
                    <h3 className="text-lg font-bold mb-2">Extracted Text:</h3>
                    <p className="text-sm leading-relaxed whitespace-pre-line">{result.extractedText}</p>
                </div>*/}
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
