export type DateStatistics = {
    id: number
    avg_time_due_to_assigned: string
    avg_time_assigned_to_due: string
    avg_time_last_past_due: string
    avg_time_last_to_grade: string
    avg_num_late: number
    avg_submissions: number
}

export type ScoreStatistic = {
    id: number
    min: number
    max: number
    mean: number
    upper_q: number
    median: number
    lower_q: number
}