import ReactMarkdown from "react-markdown";
import {Components} from "react-markdown";

const renderers: Components = {
    h2: ({children}) => {
        const text = String(children);
        const id = text.toLowerCase().replace(/\s+/g, "-");
        return <h2 id={id} className="text-2xl font-bold pt-6 pb-2">{children}</h2>;
    },
    h3: ({children}) => <h3 className="text-xl font-semibold pt-4 pb-1">{children}</h3>,
    li: ({children}) => <li className="ml-4 list-disc">{children}</li>,
};

interface Props {
    sections: { summary: string; positive: string; negative: string };
    expandedSections: Set<string>;
    toggleSection: (key: string) => void;
}

export default function SummarySection({sections, expandedSections, toggleSection}: Props) {
    const items = [
        {label: "1. Summary", key: "summary", content: sections.summary},
        {label: "2. Positive Aspects", key: "positive", content: sections.positive},
        {label: "3. Negative Aspects / Concerns", key: "negative", content: sections.negative},
    ];

    return (
        <div className="space-y-4">
            {items.map(({label, key, content}) => (
                <div key={key} className="bg-gray-800 rounded-lg">
                    <button
                        onClick={() => toggleSection(key)}
                        className={`w-full text-left p-3 font-semibold hover:bg-gray-700 cursor-pointer ${
                            key === "positive" ? "text-green-400" : key === "negative" ? "text-red-400" : "text-white"
                        }`}
                    >
                        {label}
                    </button>
                    {expandedSections.has(key) && (
                        <div className="px-4 pb-4 prose prose-invert max-w-none text-sm text-left">
                            <ReactMarkdown components={renderers}>{content}</ReactMarkdown>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}