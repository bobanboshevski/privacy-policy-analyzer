export type InputMethod = 'text' | 'url' | 'pdf';

export type ApiError = Error & { status?: number };