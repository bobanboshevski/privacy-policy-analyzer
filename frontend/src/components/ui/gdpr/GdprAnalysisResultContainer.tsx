"use client";

import React from "react";
import {AnalyzedGdprPrivacyResponse} from "@/lib/types/gdpr/gdprPrivacyAnalyzer";
import GdprAnalysisResult from "@/components/ui/gdpr/GdprAnalysisResult";
import {AnalysisResultContainerProps} from "@/lib/types/privacy";

export default function GdprAnalysisResultContainer({error, result}: AnalysisResultContainerProps<AnalyzedGdprPrivacyResponse>) {
    return (
        <div className="md:w-[600px] lg:w-[800px] space-y-4 mt-8">
            {error && <p className="text-red-500 text-sm">{error}</p>}
            {result && (
                <>
                    <GdprAnalysisResult result={result}/>
                </>
            )}
            <br/>
        </div>
    );
}