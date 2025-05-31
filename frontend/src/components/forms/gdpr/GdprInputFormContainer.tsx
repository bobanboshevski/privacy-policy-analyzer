'use client';

import {useState} from "react";
import InputMethodSelector from "@/components/ui/InputMethodSelector";
import {InputMethod} from "@/lib/types/input";
import {AnimatePresence, motion} from "framer-motion";
import {fadeSlide} from "@/lib/utils/animations";
import GdprTextInputForm from "@/components/forms/gdpr/GdprTextInputForm";
import GdprPdfUploadForm from "@/components/forms/gdpr/GdprPdfUploadForm";
import GdprUrlInputForm from "@/components/forms/gdpr/GdprUrlInputForm";

export default function GdprInputFormContainer() {
    const [method, setMethod] = useState<InputMethod>('text');

    return (
        <div className="w-full max-w-3xl mx-auto py-4 flex flex-col justify-items-center space-y-8 mt-8">
            <InputMethodSelector method={method} onChange={setMethod}/>

            <AnimatePresence mode="wait">
                <motion.div
                    key={method}
                    {...fadeSlide}
                >
                    {method === 'text' && <GdprTextInputForm/>}
                    {method === 'pdf' && <GdprPdfUploadForm/>}
                    {method === 'url' && <GdprUrlInputForm/>}
                </motion.div>
            </AnimatePresence>
        </div>
    )
}