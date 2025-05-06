'use client';

import {InputMethod} from "@/lib/types/input";
import {INPUT_METHODS} from "@/lib/constants/inputMethods";
import {motion} from "framer-motion";


interface Props {
    method: InputMethod;
    onChange: (value: InputMethod) => void;
}

export default function InputMethodSelector({method, onChange}: Props) {

    return (
        <div className="flex justify-center">
            <div className="relative inline-flex bg-gray-800 p-1 rounded-full">

                {INPUT_METHODS.map((option) => (
                    <button
                        key={option.value}
                        onClick={() => onChange(option.value)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                            method === option.value ? 'bg-white text-black' : 'text-white hover:bg-gray-700'
                        }`}
                    >
                        {option.label}
                    </button>
                ))}
            </div>
        </div>
    )
}