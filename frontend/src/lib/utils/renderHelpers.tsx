import {TooltipIcon} from "@/components/ui/InfoTooltip";
import {metricExplanations} from "@/lib/constants/metricExplanations";
import {capitalizeFirst} from "@/lib/utils/formatters";

export function renderMetric(name: string, value: number | string) {
    return (
        <div key={name} className="flex items-center justify-between py-1">
            <span className="text-sm font-medium">
                {capitalizeFirst(name.replace(/_/g, ' '))}
                <TooltipIcon text={metricExplanations[name] || "No description"}/>
            </span>
            <span className="text-sm font-mono">{value}</span>
        </div>
    );
}