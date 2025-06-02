'use client';

import {AnimatePresence, motion} from "framer-motion";
import {ccpaRenderMetric} from "@/lib/utils/ccpa/ccpaRenderHelpers";
import {easyMotionProps} from "@/lib/utils/animations";
import {AnalyzedCcpaPrivacyResponse} from "@/lib/types/ccpa/ccpaPrivacyAnalyzer";
import FeedbackForm from "@/components/forms/FeedbackForm";

interface Props {
    result: AnalyzedCcpaPrivacyResponse;
}

export default function CcpaAnalysisResult({result}: Props) {

    // const [dropdownOpen, setDropdownOpen] = useState(false);
    // const dropdownRef = useRef<HTMLDivElement>(null);

    // async function handleExportPDF() {
    //     try {
    //         const blob = await exportToPdf(result);
    //         const url = window.URL.createObjectURL(blob);
    //         const a = document.createElement("a");
    //         a.href = url;
    //         a.download = "analysis_result.pdf";
    //         a.click();
    //         window.URL.revokeObjectURL(url);
    //     } catch (err) {
    //         console.error("PDF export failed", err);
    //     } finally {
    //         setDropdownOpen(false);
    //     }
    // }

    // function handleExportCSV() {
    //     // TODO: implement CSV export logic
    //     setDropdownOpen(false);
    // }
    //
    // useEffect(() => {
    //     function handleClickOutside(event: MouseEvent) {
    //         if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
    //             setDropdownOpen(false);
    //         }
    //     }
    //
    //     document.addEventListener("mousedown", handleClickOutside);
    //     return () => {
    //         document.removeEventListener("mousedown", handleClickOutside);
    //     };
    // }, []);

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
                        {ccpaRenderMetric("overall_score", result.ccpaCompliance.overall_score)}
                        {ccpaRenderMetric("Compliance %", result.ccpaCompliance.compliance_percentage)}
                        {ccpaRenderMetric("Compliant", result.ccpaCompliance.is_compliant ? "✅ Yes" : "❌ No")}
                    </div>
                </motion.div>
            </AnimatePresence>

            <FeedbackForm category={'ccpa'}/>
        </div>
    );
}