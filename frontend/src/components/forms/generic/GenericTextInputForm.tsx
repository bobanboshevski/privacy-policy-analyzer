import {useState} from "react";
import {ApiError} from "next/dist/server/api-utils";
import {PrivacyAnalysisConfig} from "@/lib/types/privacy";
import LoadingTips from "@/components/ui/LoadingTips";

interface Props<TResponse> {
    config: PrivacyAnalysisConfig<TResponse>;
}

export default function GenericTextInputForm<TResponse>({config}: Props<TResponse>) {
    const [text, setText] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [result, setResult] = useState<TResponse | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Submitted text: ", text);

        try {
            setError(null);
            setLoading(true);
            const response = await config.services.analyzeText(text);
            setResult(response);
            console.log("Text response: ", response);
        } catch (err) {
            const error = err as ApiError;
            console.error("Error during analyzing text:", error);
            setError(error.message || "Failed to analyze text.");
        } finally {
            setLoading(false);
        }
    };

    const {AnalysisResultContainer} = config.components;

    return (
        <div>
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-[95%] sm:max-w-[500px] md:max-w-[600px] lg:max-w-[800px] space-y-4 mx-auto"
            >
        <textarea
            className="w-full p-3 border rounded-lg text-white bg-gray-800 focus:outline-none focus:border-none focus:ring-2 focus:ring-blue-500"
            placeholder="Paste privacy policy text here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={8}
        />
                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded cursor-pointer"
                        disabled={loading}
                    >
                        {loading ? "Analyzing..." : "Analyze Text"}
                    </button>
                </div>
                {loading && <LoadingTips colorClass="text-blue-600"/>}
            </form>

            <AnalysisResultContainer error={error} result={result}/>
        </div>
    );
}