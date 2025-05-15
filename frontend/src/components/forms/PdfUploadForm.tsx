import {useState} from "react";
import {analyzePdfFile} from "@/services/privacyAnalyzer";
import {AnalyzePdfResponse} from "@/lib/types/privacyAnalyzer";
import ReactMarkdown from 'react-markdown';

export default function PdfUploadForm() {
    const [file, setFile] = useState<File | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [result, setResult] = useState<AnalyzePdfResponse | null>(null);
    const [loading, setLoading] = useState(false);

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
            console.error(err);
            setError("Inserted file is either not PDF or not a privacy policy. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="md:w-[600px] lg:w-[800px] space-y-4">
            <div>
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

            {error && <p className="text-red-500 text-sm">{error}</p>} {/* JUST AS EXAMPLE! */}
            {result && <p className="text-green-500 text-sm">{result.data.extractedText}</p>} {/* JUST AS EXAMPLE! */}
            <br/>
            {result && (
                <div className="prose prose-sm max-w-none text-green-800">
                    <ReactMarkdown>{result.summary}</ReactMarkdown>
                </div>
            )} {/* JUST AS EXAMPLE! */}

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

    );
}