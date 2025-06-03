import {useState} from "react";
import {FeedbackResponse} from "@/lib/types/feedback";
import {sendFeedback} from "@/services/feedback";
import {ApiError} from "@/lib/types/input";

interface Props {
    category?: string;
}

export default function FeedbackForm({category = 'privacyAnalysis'}: Props) {
    const [feedbackMessage, setFeedbackMessage] = useState('');
    const [feedbackResult, setFeedbackResult] = useState<FeedbackResponse | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setFeedbackResult(null);

        try {
            const response = await sendFeedback(feedbackMessage, category);
            setFeedbackResult(response);
            setFeedbackMessage('');
        } catch (err) {
            const error = err as ApiError;
            console.error("Error submitting feedback:", error);
            setError(error.message || "Failed to send feedback.");
        }
    };

    return (
        <div className="border-t border-gray-700 pt-6">
            <h3 className="text-lg font-semibold mb-2">Give Us Your Feedback</h3>
            <p className="text-sm text-gray-400 mb-4">Was this analysis helpful? Let us know how we can improve.</p>
            <form onSubmit={handleSubmit} className="space-y-3">
                <textarea required={true}
                          name="feedback"
                          rows={3}
                          value={feedbackMessage}
                          onChange={(e) => setFeedbackMessage(e.target.value)}
                          placeholder="Write your feedback here..."
                          className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
                <button
                    type="submit"
                    className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded transition"
                >
                    Submit Feedback
                </button>
            </form>
            {feedbackResult && (
                <p className="text-green-400 mt-2">{feedbackResult.message}</p>
            )}
            {error && (
                <p className="text-red-400 mt-2">{error}</p>
            )}
        </div>
    );
}