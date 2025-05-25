'use client';
import {AnalysisMode} from "@/lib/types/privacyAnalyzer";

interface Props {
    mode: AnalysisMode;
    onModeChange: (mode: AnalysisMode) => void;
}

export default function ResultViewModeSwitcher({mode, onModeChange}: Props) {
    return (
        <div className="flex justify-center">
            <div className="p-1 bg-gray-800 rounded-full shadow-inner">
                {
                    Object.values(AnalysisMode).map((m) => (
                        <button
                            key={m}
                            onClick={() => onModeChange(m)}
                            className={`px-4 py-2 rounded-full transition-all duration-300 text-sm font-medium ${
                                mode === m ? 'bg-gray-600 text-white shadow-md' : 'text-gray-300 hover:text-white'}`}
                        >
                            {m === AnalysisMode.SIMPLE ? 'Easy View' : 'Expert View'}
                        </button>
                    ))
                }
            </div>
        </div>
    );
}