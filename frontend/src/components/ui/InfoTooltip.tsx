import { Info } from "lucide-react";

interface TooltipIconProps {
    text: string;
}

export function TooltipIcon({ text }: TooltipIconProps) {
    return (
        <div className="relative group inline-block ml-1 cursor-help">
            <Info className="w-4 h-4 text-blue-400 inline" />
            <div className="absolute z-10 w-64 p-2 text-sm text-white bg-gray-800 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {text}
            </div>
        </div>
    );
}