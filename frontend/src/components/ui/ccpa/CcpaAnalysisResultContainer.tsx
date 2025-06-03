"use client";

import React from "react";
import {AnalyzedCcpaPrivacyResponse} from "@/lib/types/ccpa/ccpaPrivacyAnalyzer";
import CcpaAnalysisResult from "@/components/ui/ccpa/CcpaAnalysisResult";
import {AnalysisResultContainerProps} from "@/lib/types/privacy";

export default function CcpaAnalysisResultContainer({error, result}: AnalysisResultContainerProps<AnalyzedCcpaPrivacyResponse>) {
    return (
        <div className="md:w-[600px] lg:w-[800px] space-y-4 mt-8">
            {error && <p className="text-red-500 text-sm">{error}</p>}
            {result && (
                <>
                    <CcpaAnalysisResult result={result}/>
                </>
            )}
            <br/>
        </div>
    );
}