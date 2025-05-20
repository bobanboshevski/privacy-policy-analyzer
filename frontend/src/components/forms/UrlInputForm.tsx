import { useState } from "react";
import { analyzeUrl } from "@/services/privacyAnalyzer";
import { AnalyzeUrlResponse } from "@/lib/types/privacyAnalyzer";

export default function UrlInputForm() {
  const [url, setUrl] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AnalyzeUrlResponse | null>(null);
  const [loading, setLoading] = useState(false);

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
      setError(null);
      console.log("Scraped response:", response);
    } catch (err: any) {
      console.error("API error:", err);

      const apiMessage =
        err?.response?.data?.error?.toLowerCase() || "";

      if (apiMessage.includes("does not appear to point to a privacy policy")) {
        setError("Please choose another URL");
      } else {
        setError("It seems like URL does not contain privacy policy. Please try again");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="md:w-[600px] lg:w-[800px] space-y-4">
      <input
        className="w-full p-3 border rounded-lg text-white bg-gray-800"
        placeholder="Enter URL to privacy policy"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />

      {error && <p className="text-red-500 text-sm">{error}</p>}
      {result && <p className="text-green-500 text-sm">{result.extractedText}</p>}

      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded"
          disabled={loading}
        >
          {loading ? "Analyzing..." : "Analyze URL"}
        </button>
      </div>
    </form>
  );
}
