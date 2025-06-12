import {TooltipIcon} from "@/components/ui/InfoTooltip";
import {ccpaMetricExplanations} from "@/lib/constants/ccpa/ccpaMerticExmplanations";
import {capitalizeFirst} from "@/lib/utils/formatters";
import {ccpaMetricThreshold} from "@/lib/utils/ccpa/ccpaMetricTreshold";

export function ccpaRenderMetric(name: string, value: number | string) {
    let isBad: boolean;

    // For the "Compliant" metric, explicitly set isBad based on "Yes"/"No" text.
    if (name === "Compliant") {
        isBad = value === "❌ No";
    } else {
        // Use normal numeric threshold logic for other metrics.
        isBad = ccpaMetricThreshold[name as keyof typeof ccpaMetricThreshold]?.(Number(value)) ?? false;
    }

    return (
        <div key={name} className="flex items-center justify-between py-1">
            <span className="text-sm font-medium">
                {capitalizeFirst(name.replace(/_/g, ' '))}
                <TooltipIcon text={ccpaMetricExplanations[name] || "No description"} />
            </span>
            <span className={`text-sm font-mono ${isBad ? 'text-red-400 font-bold' : 'text-green-400'}`}>
                {typeof value === 'number' ? value.toFixed(2) : value}
            </span>
        </div>
    );
}
