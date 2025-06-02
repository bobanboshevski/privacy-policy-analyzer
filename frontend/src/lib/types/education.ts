export interface TrainingItem {
    id: string;
    title: string;
    description: string;
    category: string;
    content: string;
    resources: {
        type: 'link' | 'video';
        label: string;
        url: string;
    }[];
    updatedAt: string | null;
}

export interface TrainingDataResponse {
    trainingItems: TrainingItem[];
}