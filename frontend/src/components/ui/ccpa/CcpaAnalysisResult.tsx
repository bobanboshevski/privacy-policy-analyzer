'use client';

import { AnimatePresence, motion } from "framer-motion";
import { ccpaRenderMetric } from "@/lib/utils/ccpa/ccpaRenderHelpers";
import { easyMotionProps } from "@/lib/utils/animations";
import { AnalyzedCcpaPrivacyResponse } from "@/lib/types/ccpa/ccpaPrivacyAnalyzer";
import FeedbackForm from "@/components/forms/FeedbackForm";
import ComplianceScoreDisplay from "../ComplianceScoreDisplay";
import ReactMarkdown from "react-markdown";
import { overallCCPAComplianceScoreExplanation } from "@/lib/constants/metricExplanations";

interface Props {
    result: AnalyzedCcpaPrivacyResponse;
}

export default function CcpaAnalysisResult({ result }: Props) {

    return (
        <div className="bg-gray-900 text-white p-4 rounded-lg shadow-md space-y-4">
            <AnimatePresence mode="wait">
                <motion.div
                    key="simple"
                    {...easyMotionProps}
                >
                    <h3 className="text-lg font-semibold pt-4">CCPA Compliance Metrics</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-x-6">
                        {ccpaRenderMetric("right_to_know_coverage", result.ccpaCompliance.right_to_know_coverage)}
                        {ccpaRenderMetric("right_to_delete_coverage", result.ccpaCompliance.right_to_delete_coverage)}
                        {ccpaRenderMetric("right_to_opt_out_coverage", result.ccpaCompliance.right_to_opt_out_coverage)}
                        {ccpaRenderMetric("non_discrimination_coverage", result.ccpaCompliance.non_discrimination_coverage)}
                        {ccpaRenderMetric("notice_at_collection", result.ccpaCompliance.notice_at_collection)}
                        {ccpaRenderMetric("verification_process", result.ccpaCompliance.verification_process)}
                        {ccpaRenderMetric("authorized_agent_process", result.ccpaCompliance.authorized_agent_process)}
                        {ccpaRenderMetric("Compliant", result.ccpaCompliance.is_compliant ? "✅ Yes" : "❌ No")}
                    </div>
                    <hr className="border-gray-700 my-6" />
                    <ComplianceScoreDisplay score={result.ccpaCompliance.compliance_percentage} />
                    <div className="mt-2 text-sm text-gray-300 prose prose-invert max-w-none text-left">
                        <ReactMarkdown>{overallCCPAComplianceScoreExplanation}</ReactMarkdown>
                    </div>
                </motion.div>
            </AnimatePresence>

            <FeedbackForm category={'ccpa'} />
        </div>
    );
}