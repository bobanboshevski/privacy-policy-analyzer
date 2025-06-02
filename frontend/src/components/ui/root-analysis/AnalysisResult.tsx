'use client';

import {AnalysisMode, AnalyzedPrivacyResponse} from "@/lib/types/privacyAnalyzer";
import {motion, AnimatePresence} from "framer-motion";
import {useState} from "react";
import ScoreDisplay from "@/components/ui/ScoreDisplay";
import {easyMotionProps, expertMotionProps} from "@/lib/utils/animations";
import {splitSummaryIntoSections} from "@/components/ui/root-analysis/splitSummaryIntoSections";
import ExportDropdown from "@/components/ui/root-analysis/ExportDropdown";
import SummarySection from "@/components/ui/root-analysis/SummarySection";
import {renderMetric} from "@/lib/utils/renderHelpers";
import FeedbackForm from "@/components/forms/FeedbackForm";


interface Props {
    result: AnalyzedPrivacyResponse;
    mode: AnalysisMode;
}

export default function AnalysisResult({result, mode}: Props) {
    const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());
    const summarySections = splitSummaryIntoSections(result.summary);

    const toggleSection = (section: string) => {
        setExpandedSections(prev => {
            const newSet = new Set(prev);
            if (newSet.has(section)) {
                newSet.delete(section);
            } else {
                newSet.add(section);
            }
            return newSet;
        });
    };

    return (
        <div className="bg-gray-900 text-white p-4 rounded-lg shadow-md space-y-4">
            <AnimatePresence mode="wait">
                {mode === AnalysisMode.SIMPLE ? (
                    <motion.div key="simple" {...easyMotionProps}>
                        <h2 className="text-xl font-bold">Privacy Policy Summary</h2>
                        <SummarySection
                            sections={summarySections}
                            expandedSections={expandedSections}
                            toggleSection={toggleSection}
                        />
                        <hr className="border-gray-700"/>
                        <h3 className="text-xl font-semibold pt-4">Key Metrics</h3>

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
                    <motion.div key="expert" {...expertMotionProps}>
                        <div className="flex justify-between items-center text-center">
                            <h2 className="text-xl font-bold">Full Analysis</h2>
                            <ExportDropdown result={result}/>
                        </div>
                        <hr className="border-gray-700 my-6"/>
                        <h2 className="text-xl font-bold">Privacy Policy Summary</h2>
                        <SummarySection
                            sections={summarySections}
                            expandedSections={expandedSections}
                            toggleSection={toggleSection}
                        />
                        <hr className="border-gray-700 my-4"/>
                        <h3 className="text-xl font-semibold pt-4">Key Metrics</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-x-6"> {/* gap-4 */}
                            {Object.entries(result.nlpAnalysis.readability).map(([k, v]) => renderMetric(k, v))}
                            {Object.entries(result.nlpAnalysis.complexity).map(([k, v]) => renderMetric(k, v))}
                            {Object.entries(result.nlpAnalysis.ambiguity).map(([k, v]) => renderMetric(k, v))}
                            {Object.entries(result.nlpAnalysis.coverage).map(([k, v]) => renderMetric(k, v))}
                            {Object.entries(result.nlpAnalysis.sentiment).map(([k, v]) => renderMetric(k, v))}
                            {Object.entries(result.nlpAnalysis.userFocus).map(([k, v]) => renderMetric(k, v))}
                        </div>

                        <hr className="border-gray-700 my-6"/>
                        <ScoreDisplay score={result.overallScore}/>
                    </motion.div>
                )}
            </AnimatePresence>

            <FeedbackForm/>
        </div>
    );
}