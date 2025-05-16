"use client";

import React from "react";
import {AnalysisMode, AnalyzedPrivacyResponse} from "@/lib/types/privacyAnalyzer";
import ResultViewModeSwitcher from "./ResultViewModeSwitcher";
import AnalysisResult from "./AnalysisResult";

interface AnalysisResultContainerProps {
    error: string | null;
    result: AnalyzedPrivacyResponse | null;
    mode: AnalysisMode;
    setMode: (mode: AnalysisMode) => void;
}

export default function AnalysisResultContainer({error, result, mode, setMode,}: AnalysisResultContainerProps) {
    return (
        <div className="md:w-[600px] lg:w-[800px] space-y-4">
            {error && <p className="text-red-500 text-sm">{error}</p>}
            {result && (
                <>
                    <ResultViewModeSwitcher mode={mode} onModeChange={setMode}/>
                    <AnalysisResult result={result} mode={mode}/>
                </>
            )}
            <br/>
        </div>
    );
}