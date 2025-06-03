export interface PrivacyAnalysisConfig<TResponse> {
    complianceType: 'gdpr' | 'ccpa';
    services: {
        analyzeText: (text: string) => Promise<TResponse>;
        analyzePdfFile: (file: File) => Promise<TResponse>;
        analyzeUrl: (url: string) => Promise<TResponse>;
    };
    components: {
        AnalysisResultContainer: React.ComponentType<AnalysisResultContainerProps<TResponse>>;
    };
    renderMetric: (key: string, value: number) => React.ReactNode;
    complianceTitle: string;
    feedbackCategory: string;
}

export interface AnalysisResultContainerProps<T> {
    error: string | null;
    result: T | null;
}