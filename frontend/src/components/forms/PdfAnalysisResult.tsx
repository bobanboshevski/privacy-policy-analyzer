'use client';

import {AnalysisMode, AnalyzePdfResponse} from "@/lib/types/privacyAnalyzer";
import ReactMarkdown from 'react-markdown';
import {AnimatePresence, motion} from "framer-motion";

interface Props {
    result: AnalyzePdfResponse;
    mode: AnalysisMode;
}

export default function PdfAnalysisResult({result, mode}: Props) {

    return (
        <div className="bg-gray-900 text-white p-4 rounded-lg shadow-md space-y-4">
            <AnimatePresence mode="wait">
                {mode === AnalysisMode.SIMPLE ? (
                    <motion.div
                        key="simple"
                        initial={{opacity: 0, x: -20}}
                        animate={{opacity: 1, x: 0}}
                        exit={{opacity: 0, x: 20}}
                        transition={{duration: 0.3}}
                        className="space-y-3"
                    >
                        <h2 className="text-xl font-bold">Summary</h2>
                        <div className="prose prose-invert max-w-none">
                            <ReactMarkdown>
                                {result.summary}
                            </ReactMarkdown>
                        </div>

                    </motion.div>
                ) : (
                    <motion.div
                        key="expert"
                        initial={{opacity: 0, x: 20}}
                        animate={{opacity: 1, x: 0}}
                        exit={{opacity: 0, x: -20}}
                        transition={{duration: 0.3}}
                        className="space-y-3"
                    >
                        <h2 className="text-xl font-bold">Full Analysis</h2>
                        <div className="prose prose-invert max-w-none">
                            <ReactMarkdown>
                                {result.data.extractedText}
                            </ReactMarkdown>
                        </div>

                        <hr className="border-gray-700"/>
                        <div>
                            <h3 className="font-semibold text-lg">Summary</h3>
                            <div className="prose prose-invert max-w-none">
                                <ReactMarkdown>
                                    {result.summary}
                                </ReactMarkdown>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );

}