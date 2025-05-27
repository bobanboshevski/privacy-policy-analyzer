import {fetchFromApi} from "@/services/api";
import {PolicyRankingsResponse} from "@/lib/types/policyRanking";

/**
 * Get privacy policy response for the text from the analyzer
 */
export async function fetchWeeklyBestAndWorstRankings(): Promise<PolicyRankingsResponse> {
    return await fetchFromApi<PolicyRankingsResponse>("/api/policies/best-worst", {
        method: "GET"
    });
}