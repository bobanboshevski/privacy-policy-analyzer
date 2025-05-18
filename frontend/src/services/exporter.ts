import {AnalyzedPrivacyResponse} from "@/lib/types/privacyAnalyzer";
import {fetchFromApi} from "@/services/api";

export async function exportToPdf(data: AnalyzedPrivacyResponse): Promise<Blob> {
    const payload = {
        summary: data.summary,
        metrics: data.nlpAnalysis,
    };
    return await fetchFromApi<Blob>('/api/export/pdf', {
        method: 'POST',
        headers: {},
        body: JSON.stringify(payload),
    }, 'blob');
}