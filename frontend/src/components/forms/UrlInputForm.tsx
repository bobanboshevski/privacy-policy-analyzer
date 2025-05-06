import {useState} from "react";

export default function UrlInputForm() {

    const [url, setUrl] = useState('');
    const [error, setError] = useState<string | null>(null);
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!url.trim()) {
            setError('Please enter a URL');
            return;
        }

        try {
            new URL(url); // Will throw if invalid
            setError(null);

            // TODO: call backend API with URL
            console.log("Submitted URL:", url);

        } catch (_) {
            setError('Invalid URL format');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="md:w-[600px] lg:w-[800px] space-y-4">
            <input
                // type="url"
                className="w-full p-3 border rounded-lg text-white bg-gray-800"
                placeholder="Enter URL to privacy policy"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
            />

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <div className="flex justify-end">
                <button
                    type="submit"
                    className="bg-green-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded"
                >
                    Analyze URL
                </button>
            </div>
        </form>
    );
}