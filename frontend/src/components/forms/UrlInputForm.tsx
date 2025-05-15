import {useState} from "react";
import {analyzeUrl} from "@/services/privacyAnalyzer";
import {AnalysisMode, AnalyzedPrivacyResponse, AnalyzeUrlResponse} from "@/lib/types/privacyAnalyzer";
import ResultViewModeSwitcher from "@/components/ui/ResultViewModeSwitcher";
import AnalysisResult from "@/components/ui/AnalysisResult";

export default function UrlInputForm() {
    const [url, setUrl] = useState("");
    const [error, setError] = useState<string | null>(null);
    // const [result, setResult] = useState<AnalyzeUrlResponse | null>(null);
    const [result, setResult] = useState<AnalyzedPrivacyResponse | null>(null);
    const [loading, setLoading] = useState(false);

    const [mode, setMode] = useState<AnalysisMode>(AnalysisMode.SIMPLE);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!url.trim()) {
            setError("Please enter a URL");
            return;
        }

        try {
            new URL(url);
            setError(null);
            setLoading(true);

            const response = await analyzeUrl(url.trim());
            setResult(response);
            console.log("Scraped response:", response);
        } catch (err) {
            console.error(err);
            setError("Failed to analyze URL.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="md:w-[600px] lg:w-[800px] space-y-4">
                <input
                    className="w-full p-3 border rounded-lg text-white bg-gray-800"
                    placeholder="Enter URL to privacy policy"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                />

                {error && <p className="text-red-500 text-sm">{error}</p>}
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

            <div className="md:w-[600px] lg:w-[800px] space-y-4">
                {error && <p className="text-red-500 text-sm">{error}</p>} {/* JUST AS EXAMPLE! */}
                {result && (
                    <>
                        <ResultViewModeSwitcher mode={mode} onModeChange={setMode}/>
                        <AnalysisResult result={result} mode={mode}/>
                    </>
                )}
                <br/>
            </div>
        </>
    );
}
