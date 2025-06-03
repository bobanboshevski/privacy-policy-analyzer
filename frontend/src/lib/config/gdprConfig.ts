import {PrivacyAnalysisConfig} from "@/lib/types/privacy";
import {AnalyzedGdprPrivacyResponse} from "@/lib/types/gdpr/gdprPrivacyAnalyzer";
import * as gdprServices from "@/services/gdprPrivacyAnalyzer";
import GdprAnalysisResultContainer from "@/components/ui/gdpr/GdprAnalysisResultContainer";
import {gdprRenderMetric} from "@/lib/utils/gdpr/gdprRenderHelpers";

export const gdprConfig: PrivacyAnalysisConfig<AnalyzedGdprPrivacyResponse> = {
    complianceType: 'gdpr',
    services: {
        analyzeText: gdprServices.analyzeText,
        analyzePdfFile: gdprServices.analyzePdfFile,
        analyzeUrl: gdprServices.analyzeUrl,
    },
    components: {
        AnalysisResultContainer: GdprAnalysisResultContainer,
    },
    renderMetric: gdprRenderMetric,
    complianceTitle: "GDPR Compliance Metrics",
    feedbackCategory: "gdpr",
};