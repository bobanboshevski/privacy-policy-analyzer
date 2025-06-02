export const ccpaMetricThreshold: Record<string, (value: number) => boolean> = {
    right_to_know_coverage: (value: number) => value < 0.7,
    right_to_delete_coverage: (value: number) => value < 0.7,
    right_to_opt_out_coverage: (value: number) => value < 0.7,
    non_discrimination_coverage: (value: number) => value < 0.6,
    notice_at_collection: (value: number) => value < 0.6,
    verification_process: (value: number) => value < 0.5,
    authorized_agent_process: (value: number) => value !== 1.0,
    overall_score: (value: number) => value < 0.8
}