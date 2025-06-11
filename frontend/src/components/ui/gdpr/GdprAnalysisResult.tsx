'use client';

import {AnimatePresence, motion} from "framer-motion";
import {gdprRenderMetric} from "@/lib/utils/gdpr/gdprRenderHelpers";
import {easyMotionProps} from "@/lib/utils/animations";
import {AnalyzedGdprPrivacyResponse} from "@/lib/types/gdpr/gdprPrivacyAnalyzer";
import FeedbackForm from "@/components/forms/FeedbackForm";
import { overallGDPRComplianceScoreExplanation } from "@/lib/constants/metricExplanations";
import ReactMarkdown from "react-markdown";
import ComplianceScoreDisplay from "../ComplianceScoreDisplay";

interface Props {
    result: AnalyzedGdprPrivacyResponse;
}

export default function GdprAnalysisResult({result}: Props) {

    return (
        <div className="bg-gray-900 text-white p-4 rounded-lg shadow-md space-y-4">
            <AnimatePresence mode="wait">
                <motion.div
                    key="simple"
                    {...easyMotionProps}
                >
                    <h3 className="text-lg font-semibold pt-4">GDPR Compliance Metrics</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-x-6">
                        {gdprRenderMetric("lawful_basis_coverage", result.gdprCompliance.lawful_basis_coverage)}
                        {gdprRenderMetric("data_subject_rights_coverage", result.gdprCompliance.data_subject_rights_coverage)}
                        {gdprRenderMetric("consent_mechanism_quality", result.gdprCompliance.consent_mechanism_quality)}
                        {gdprRenderMetric("dpo_information", result.gdprCompliance.dpo_information)}
                        {gdprRenderMetric("international_transfers", result.gdprCompliance.international_transfers)}
                        {gdprRenderMetric("security_measures", result.gdprCompliance.security_measures)}
                        {gdprRenderMetric("breach_notification", result.gdprCompliance.breach_notification)}
                        {gdprRenderMetric("retention_periods", result.gdprCompliance.retention_periods)}
                        {gdprRenderMetric("Compliant", result.gdprCompliance.is_compliant ? "✅ Yes" : "❌ No")}
                    </div>
                    <hr className="border-gray-700 my-6"/>
                    <ComplianceScoreDisplay score={result.gdprCompliance.compliance_percentage}/>
                    <div className = "mt-2 text-sm text-gray-300 prose prose-invert max-w-none text-left">
                    <ReactMarkdown>{overallGDPRComplianceScoreExplanation}</ReactMarkdown>     
                    </div>

                </motion.div>
            </AnimatePresence>

            <FeedbackForm category={'gdpr'}/>
        </div>
    );
}