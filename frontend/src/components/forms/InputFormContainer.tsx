'use client';

import {useState} from "react";
import InputMethodSelector from "@/components/ui/InputMethodSelector";
import {InputMethod} from "@/lib/types/input";
import TextInputForm from "@/components/forms/TextInputForm";
import PdfUploadForm from "@/components/forms/PdfUploadForm";
import UrlInputForm from "@/components/forms/UrlInputForm";
import {AnimatePresence, motion} from "framer-motion";
import {fadeSlide} from "@/lib/utils/animations";

export default function InputFormContainer() {
    const [method, setMethod] = useState<InputMethod>('text');

    return (
        <div className="w-full max-w-5=7xl mx-auto px-3 py-4 space-y-8 items-center justify-items-center">
            <InputMethodSelector method={method} onChange={setMethod}/>

            <AnimatePresence mode="wait">
                <motion.div
                    key={method}
                    {...fadeSlide}
                >
                    {method === 'text' && <TextInputForm/>}
                    {method === 'pdf' && <PdfUploadForm/>}
                    {method === 'url' && <UrlInputForm/>}
                </motion.div>
            </AnimatePresence>
        </div>
    )
}