import {useState} from "react";
import {ApiError} from "@/lib/types/input";
import {PrivacyAnalysisConfig} from "@/lib/types/privacy";

interface Props<TResponse> {
    config: PrivacyAnalysisConfig<TResponse>;
}

export default function GenericUrlInputForm<TResponse>({config}: Props<TResponse>) {
    const [url, setUrl] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [result, setResult] = useState<TResponse | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!url.trim()) {
            setError("Please enter a URL.");
            return;
        }

        try {
            setError(null);
            setLoading(true);

            const response = await config.services.analyzeUrl(url.trim());
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

    const {AnalysisResultContainer} = config.components;

    return (
        <>
            <form onSubmit={handleSubmit} className="sm:w-[400px] md:w-[600px] lg:w-[800px] space-y-4">
                <input
                    className="w-full p-3 border rounded-lg text-white bg-gray-800"
                    placeholder="Enter URL to privacy policy"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                />

                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded cursor-pointer"
                        disabled={loading}
                    >
                        {loading ? "Analyzing..." : "Analyze URL"}
                    </button>
                </div>
            </form>

            <AnalysisResultContainer error={error} result={result}/>
        </>
    );
}