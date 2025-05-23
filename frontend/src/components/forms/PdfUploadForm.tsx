import {useState} from "react";
import {analyzePdfFile} from "@/services/privacyAnalyzer";
import {AnalysisMode, AnalyzedPrivacyResponse} from "@/lib/types/privacyAnalyzer";
import AnalysisResultContainer from "@/components/ui/AnalysisResultContainer";
import {ApiError} from "@/lib/types/input";

export default function PdfUploadForm() {
    const [file, setFile] = useState<File | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [result, setResult] = useState<AnalyzedPrivacyResponse | null>(null);
    const [loading, setLoading] = useState(false);

    const [mode, setMode] = useState<AnalysisMode>(AnalysisMode.SIMPLE);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file) {
            setError("Please select a PDF file.");
            return;
        }
        try {
            setLoading(true);
            const response = await analyzePdfFile(file);
            setResult(response);
            console.log(response);
            setError(null);
        } catch (err) {
            const error = err as ApiError;
            console.error("Error during analyzePdf:", error);
            setError(error.message || "Failed to analyze URL.")
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}
                  className="sm:w-[400px] md:w-[600px] lg:w-[800px] space-y-4"> {/* sm:w-[500px]*/}
                <div>
                    {/*<div className="w-full md:w-[600px] lg:w-[800px] space-y-4">*/}
                    <label
                        htmlFor="pdf-upload"
                        className="block w-full p-3 rounded-lg text-white bg-gray-800 cursor-pointer text-center"
                    >
                        {file ? file.name : "Choose a PDF file"}
                    </label>
                    <input
                        id="pdf-upload"
                        type="file"
                        accept=".pdf"
                        className="hidden"
                        onChange={handleFileChange}
                    />
                </div>

                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded disabled:opacity-50"
                    >
                        {loading ? 'Analyzing...' : 'Analyze PDF'}
                    </button>
                </div>
            </form>

            <AnalysisResultContainer
                error={error}
                result={result}
                mode={mode}
                setMode={setMode}
            />
        </div>
    );

}
