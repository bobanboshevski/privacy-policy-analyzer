'use client';

import {useState} from "react";
import InputMethodSelector from "@/components/ui/InputMethodSelector";
import {InputMethod} from "@/lib/types/input";
import {AnimatePresence, motion} from "framer-motion";
import {fadeSlide} from "@/lib/utils/animations";
import CcpaTextInputForm from "@/components/forms/ccpa/CcpaTextInputForm";
import CcpaPdfUploadForm from "@/components/forms/ccpa/CcpaPdfUploadForm";
import CcpaUrlInputForm from "@/components/forms/ccpa/CcpaUrlInputForm";

export default function CcpaInputFormContainer() {
    const [method, setMethod] = useState<InputMethod>('text');

    return (
        <div className="w-full max-w-3xl mx-auto py-4 flex flex-col justify-items-center space-y-8 mt-8"> {/* flex flex-col justify-items-center */}
            <InputMethodSelector method={method} onChange={setMethod}/>

            <AnimatePresence mode="wait">
                <motion.div
                    key={method}
                    {...fadeSlide}
                >
                    {method === 'text' && <CcpaTextInputForm/>}
                    {method === 'pdf' && <CcpaPdfUploadForm/>}
                    {method === 'url' && <CcpaUrlInputForm/>}
                </motion.div>
            </AnimatePresence>
        </div>
    )
}