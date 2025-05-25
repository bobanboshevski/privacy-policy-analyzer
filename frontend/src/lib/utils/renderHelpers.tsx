import {TooltipIcon} from "@/components/ui/InfoTooltip";
import {metricExplanations} from "@/lib/constants/metricExplanations";
import {capitalizeFirst} from "@/lib/utils/formatters";
import {metricThresholds} from "@/lib/utils/metricTresholds";

export function renderMetric(name: string, value: number | string) {
    const isBad = metricThresholds[name as keyof typeof metricThresholds]?.(Number(value)) ?? false;

    return (
        <div key={name} className="flex items-center justify-between py-1">
            <span className="text-sm font-medium">
                {capitalizeFirst(name.replace(/_/g, ' '))}
                <TooltipIcon text={metricExplanations[name] || "No description"}/>
            </span>
            <span className={`text-sm font-mono ${isBad ? 'text-red-400 font-bold' : 'text-green-400'}`}>
                {typeof value === 'number' ? value.toFixed(2) : value}
            </span>
        </div>
    );
}