export interface vacationsCount{
    PAID: number
    UNPAID: number
    SICK: number
    PENDING: number
};

export interface VacationsList {
    start_date: Date
    end_date: Date
    type: 'PAID' | 'UNPAID' | 'SICK'
}