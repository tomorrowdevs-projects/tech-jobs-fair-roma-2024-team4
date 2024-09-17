export type Recurrence = 'daily' | 'weekly' | 'monthly';

export const isRecurrence = (value: string): value is Recurrence => {
    return value === 'daily' || value === 'weekly' || value === 'monthly';
}