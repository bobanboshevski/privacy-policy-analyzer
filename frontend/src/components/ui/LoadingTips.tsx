import React, {useEffect, useState} from "react";
import {privacyTipsOriginal} from "@/lib/constants/privacyTips";


type LoadingTipsProps = {
    colorClass?: string;
};

function shuffleArray<T>(array: T[]): T[] {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

export default function LoadingTips({colorClass = "text-purple-600"}: LoadingTipsProps) {
    const [tips, setTips] = useState<string[]>([]);
    const [tipIndex, setTipIndex] = useState(0);

    useEffect(() => {
        // Shuffle tips once on mount
        const shuffled = shuffleArray(privacyTipsOriginal);
        setTips(shuffled);
        setTipIndex(0);
    }, []);

    useEffect(() => {
        if (tips.length === 0) return;

        const interval = setInterval(() => {
            setTipIndex(prev => (prev + 1) % tips.length);
        }, 4000);

        return () => clearInterval(interval);
    }, [tips]);

    return (
        <div className="mt-6 flex flex-col items-center space-y-3 mb-6">
            <div className="flex items-center space-x-3">
                <svg
                    className={`animate-spin h-6 w-6 ${colorClass}`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                    />
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8H4z"
                    />
                </svg>
                <span className={`${colorClass} font-medium animate-pulse`}>Analyzing PDF...</span>
            </div>
            <div className="text-center text-sm text-gray-600 italic">
                💡 Tip: {tips[tipIndex]}
            </div>
        </div>
    );
}