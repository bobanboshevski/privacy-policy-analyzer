import {fetchFromApi} from "@/services/api";
import {FeedbackResponse} from "@/lib/types/feedback";

export async function sendFeedback(feedback: string, type: string): Promise<FeedbackResponse> {
    return await fetchFromApi<FeedbackResponse>('/api/feedback', {
        method: 'POST',
        body: JSON.stringify({feedback, type}),
        headers: {}
    });
}