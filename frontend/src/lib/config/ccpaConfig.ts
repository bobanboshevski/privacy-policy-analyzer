import {PrivacyAnalysisConfig} from "@/lib/types/privacy";
import {AnalyzedCcpaPrivacyResponse} from "@/lib/types/ccpa/ccpaPrivacyAnalyzer";
import * as ccpaServices from "@/services/ccpaPrivacyAnalyzer";
import CcpaAnalysisResultContainer from "@/components/ui/ccpa/CcpaAnalysisResultContainer";
import {ccpaRenderMetric} from "@/lib/utils/ccpa/ccpaRenderHelpers";

export const ccpaConfig: PrivacyAnalysisConfig<AnalyzedCcpaPrivacyResponse> = {
    complianceType: 'ccpa',
    services: {
        analyzeText: ccpaServices.analyzeText,
        analyzePdfFile: ccpaServices.analyzePdfFile,
        analyzeUrl: ccpaServices.analyzeUrl,
    },
    components: {
        AnalysisResultContainer: CcpaAnalysisResultContainer,
    },
    renderMetric: ccpaRenderMetric,
    complianceTitle: "CCPA Compliance Metrics",
    feedbackCategory: "ccpa",
};