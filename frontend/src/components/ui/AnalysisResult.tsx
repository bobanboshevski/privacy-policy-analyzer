'use client';

import {AnalysisMode, AnalyzedPrivacyResponse} from "@/lib/types/privacyAnalyzer";
import ReactMarkdown from 'react-markdown';
import {AnimatePresence, motion} from "framer-motion";
import {renderMetric} from "@/lib/utils/renderHelpers";
import {easyMotionProps, expertMotionProps} from "@/lib/utils/animations";
import ScoreDisplay from "@/components/ui/ScoreDisplay";

interface Props {
    result: AnalyzedPrivacyResponse;
    mode: AnalysisMode;
}

export default function AnalysisResult({result, mode}: Props) {

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
                            {/*{renderMetric("pronoun_ratio", result.nlpAnalysis.userFocus.pronoun_ratio)}*/}
                        </div>

                    </motion.div>
                ) : (
                    <div>
                        <motion.div key="expert" {...expertMotionProps}>
                            <h2 className="text-xl font-bold">Full Analysis</h2>
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

                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
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