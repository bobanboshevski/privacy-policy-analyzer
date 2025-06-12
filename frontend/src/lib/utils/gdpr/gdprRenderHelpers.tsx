import {TooltipIcon} from "@/components/ui/InfoTooltip";
import {gdprMetricExplanations} from "@/lib/constants/gdpr/gdprMetricExplanations";
import {capitalizeFirst} from "@/lib/utils/formatters";
import {gdprMetricThreshold} from "@/lib/utils/gdpr/gdprMetricThreshold";

export function gdprRenderMetric(name: string, value: number | string) {
        let isBad: boolean;
    if (name === "Compliant") {
        isBad = value === "❌ No";
    } else {
        // Use normal numeric threshold logic for other metrics.
        isBad = gdprMetricThreshold[name as keyof typeof gdprMetricThreshold]?.(Number(value)) ?? false;
    }
    return (
        <div key={name} className="flex items-center justify-between py-1">
            <span className="text-sm font-medium">
                {capitalizeFirst(name.replace(/_/g, ' '))}
                <TooltipIcon text={gdprMetricExplanations[name] || "No description"}/>
            </span>
            <span className={`text-sm font-mono ${isBad ? 'text-red-400 font-bold' : 'text-green-400'}`}>
                {typeof value === 'number' ? value.toFixed(2) : value}
            </span>
        </div>
    );
}