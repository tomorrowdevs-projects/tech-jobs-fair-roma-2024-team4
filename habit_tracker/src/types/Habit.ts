import { Recurrence } from "./Recurrence";

export interface Habit {
    id: string;
    userId: string;
    title: string;
    startDate: Date;
    endDate: Date | null;
    startTime: string | null;
    endTime: string | null;
    notificationTime: string | null;
    recurrence: Recurrence | undefined | null;
    recurrenceInterval: number | null;
    isAllDay: boolean;
	isCompleted: boolean;
    completionDates: Date[];
}
