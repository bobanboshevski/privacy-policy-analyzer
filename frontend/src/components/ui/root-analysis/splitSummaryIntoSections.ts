export function splitSummaryIntoSections(summary: string) {
    const sections = {
        summary: '',
        positive: '',
        negative: ''
    };

    const parts = summary.split(/^##\s+(\d+\.\s+(Summary|Positive Aspects|Negative Aspects\s*\/\s*Concerns))$/gm);
    for (let i = 0; i < parts.length; i++) {
        const sectionTitle = parts[i]?.trim().toLowerCase();
        if (sectionTitle.includes('summary')) sections.summary = parts[i + 1]?.trim() || '';
        if (sectionTitle.includes('positive aspects')) sections.positive = parts[i + 1]?.trim() || '';
        if (sectionTitle.includes('negative aspects')) sections.negative = parts[i + 1]?.trim() || '';
    }
    return sections;
}