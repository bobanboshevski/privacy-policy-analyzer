'use client';

import {useState} from "react";
import InputMethodSelector from "@/components/ui/InputMethodSelector";
import {InputMethod} from "@/lib/types/input";
import {AnimatePresence, motion} from "framer-motion";
import {fadeSlide} from "@/lib/utils/animations";
import {PrivacyAnalysisConfig} from "@/lib/types/privacy";
import GenericTextInputForm from "@/components/forms/generic/GenericTextInputForm";
import GenericPdfUploadForm from "@/components/forms/generic/GenericPdfUploadForm";
import GenericUrlInputForm from "@/components/forms/generic/GenericUrlInputForm";

interface Props<TResponse> {
    config: PrivacyAnalysisConfig<TResponse>;
}

export default function GenericInputFormContainer<TResponse>({config}: Props<TResponse>) {
    const [method, setMethod] = useState<InputMethod>('text');

    return (
        <div className="w-full max-w-3xl mx-auto py-4 flex flex-col justify-items-center space-y-8 mt-8">
            <InputMethodSelector method={method} onChange={setMethod}/>

            <AnimatePresence mode="wait">
                <motion.div key={method} {...fadeSlide}>
                    {method === 'text' && <GenericTextInputForm config={config}/>}
                    {method === 'pdf' && <GenericPdfUploadForm config={config}/>}
                    {method === 'url' && <GenericUrlInputForm config={config}/>}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}