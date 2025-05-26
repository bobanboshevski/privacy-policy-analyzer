import {useState} from "react";
import {AnalysisMode, AnalyzedPrivacyResponse} from "@/lib/types/privacyAnalyzer";
import {analyzeText} from "@/services/privacyAnalyzer";
import AnalysisResultContainer from "@/components/ui/AnalysisResultContainer";
import LoadingTips from "@/components/ui/LoadingTips";
import {ApiError} from "@/lib/types/input";

export default function TextInputForm() {
    const [text, setText] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [result, setResult] = useState<AnalyzedPrivacyResponse | null>(null);
    const [loading, setLoading] = useState(false);
    const [mode, setMode] = useState<AnalysisMode>(AnalysisMode.SIMPLE);

    const handleSumbit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Submitted text: ", text);
        try {
            setError(null);
            setLoading(true);
            const response = await analyzeText(text);
            setResult(response);
            console.log("Text response: ", response);
        } catch (err) {
            const error = err as ApiError;
            console.error("Error during analyzing text:", error);
            setError(error.message || "Failed to analyze text.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <form onSubmit={handleSumbit} className="sm:w-[400px] md:w-[600px] lg:w-[800px] space-y-4">
                <textarea
                    className="w-full p-3 border rounded-lg text-white bg-gray-800
                focus:outline-none focus:border-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Paste privacy policy text here..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    rows={8}
                />
                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded"
                        disabled={loading}
                    >
                        {loading ? "Analyzing..." : "Analyze Text"}
                    </button>
                </div>
                {loading && <LoadingTips colorClass="text-blue-600"/>}
            </form>

            <AnalysisResultContainer
                error={error}
                result={result}
                mode={mode}
                setMode={setMode}
            />
        </div>
    )
}