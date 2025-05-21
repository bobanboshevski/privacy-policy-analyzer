'use client';

import {AnalysisMode, AnalyzedPrivacyResponse} from "@/lib/types/privacyAnalyzer";
import ReactMarkdown from 'react-markdown';
import {AnimatePresence, motion} from "framer-motion";
import {renderMetric} from "@/lib/utils/renderHelpers";
import {easyMotionProps, expertMotionProps} from "@/lib/utils/animations";

interface Props {
    result: AnalyzedPrivacyResponse;
    mode: AnalysisMode;
}

export default function AnalysisResult({result, mode}: Props) {

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    async function handleExportPDF() {
        try {
            const blob = await exportToPdf(result);
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "analysis_result.pdf";
            a.click();
            window.URL.revokeObjectURL(url);
        } catch (err) {
            console.error("PDF export failed", err);
        } finally {
            setDropdownOpen(false);
        }
    }

    function handleExportCSV() {
        // TODO: implement CSV export logic
        setDropdownOpen(false);
    }

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setDropdownOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="bg-gray-900 text-white p-4 rounded-lg shadow-md space-y-4">
            <AnimatePresence mode="wait">
                {mode === AnalysisMode.SIMPLE ? (
                    <motion.div
                        key="simple"
                        {...easyMotionProps}
                    >
                        <h2 className="text-xl font-bold">Summary</h2>
                        <div className="prose prose-invert max-w-none">
                            <ReactMarkdown>
                                {result.summary}
                            </ReactMarkdown>
                        </div>
                        <hr className="border-gray-700"/>

                        <h3 className="text-lg font-semibold pt-4">Key Metrics</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-x-6">
                            {renderMetric("flesch_score", result.nlpAnalysis.readability.flesch_score)}
                            {renderMetric("word_count", result.nlpAnalysis.complexity.word_count)}
                            {renderMetric("average_sentence_length", result.nlpAnalysis.complexity.avg_sentence_length)}
                            {renderMetric("average_word_length", result.nlpAnalysis.complexity.avg_word_length)}
                            {renderMetric("subjectivity", result.nlpAnalysis.sentiment.subjectivity)}
                            {renderMetric("polarity", result.nlpAnalysis.sentiment.polarity)}
                        </div>

                    </motion.div>
                ) : (
                    <div className="bg-gray-900 text-white p-4 rounded-lg shadow-md space-y-4">
                        <motion.div key="expert" {...expertMotionProps}>
                            {/*<h2 className="text-xl font-bold">Full Analysis</h2>*/}

                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-bold">Full Analysis</h2>
                                <div ref={dropdownRef} className="relative inline-block text-left">
                                    <button
                                        type="button"
                                        className="text-white text-2xl mr-2 ml-2 hover:text-gray-300 focus:outline-none cursor-pointer"
                                        onClick={() => setDropdownOpen((prev) => !prev)}
                                    >
                                        ⋮
                                    </button>
                                    {dropdownOpen && (
                                        <div
                                            className="absolute right-0 mt-2 w-36 origin-top-right rounded-md bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                                            <div className="py-1">
                                                <button
                                                    className="w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-700"
                                                    onClick={handleExportPDF}
                                                >
                                                    Export to PDF
                                                </button>
                                                <button
                                                    className="w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-700"
                                                    onClick={handleExportCSV}
                                                >
                                                    Export to CSV
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="prose prose-invert max-w-none">
                                <ReactMarkdown>
                                    {/*{result.data.extractedText}*/}
                                </ReactMarkdown>
                            </div>

                            <div>
                                <h3 className="font-semibold text-lg">Summary</h3>
                                <div className="prose prose-invert max-w-none">
                                    <ReactMarkdown>
                                        {result.summary}
                                    </ReactMarkdown>
                                </div>
                            </div>
                            <hr className="border-gray-700 my-6"/>
                            <h3 className="text-lg font-semibold pt-4">Key Metrics</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-x-6"> {/* gap-4 */}
                                {Object.entries(result.nlpAnalysis.readability).map(([k, v]) => renderMetric(k, v))}
                                {Object.entries(result.nlpAnalysis.complexity).map(([k, v]) => renderMetric(k, v))}
                                {Object.entries(result.nlpAnalysis.ambiguity).map(([k, v]) => renderMetric(k, v))}
                                {Object.entries(result.nlpAnalysis.coverage).map(([k, v]) => renderMetric(k, v))}
                                {Object.entries(result.nlpAnalysis.sentiment).map(([k, v]) => renderMetric(k, v))}
                                {Object.entries(result.nlpAnalysis.userFocus).map(([k, v]) => renderMetric(k, v))}
                            </div>
                            <hr className="border-gray-700 my-6"/>

                            <ScoreDisplay score={result.overallScore} />
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );

}