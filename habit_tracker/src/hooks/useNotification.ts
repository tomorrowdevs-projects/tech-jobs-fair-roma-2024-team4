import { useEffect, useRef } from 'react';
import { Habit } from '../types/Habit';
import { Recurrence } from '../types/Recurrence';

// Funzione per generare date ricorrenti basate su frequenza e intervallo
export const generateRecurrenceDates = (
    startDate: Date,
    endDate: Date | null,
    frequency: Recurrence | undefined,
    interval: number | undefined
): Date[] => {
    const dates: Date[] = [];
    const now = new Date();

    // Usa una data di fine se fornita, altrimenti usa una data di fine molto futura
    const end = endDate || new Date(now.getFullYear() + 10, 0, 1);

    let currentDate = new Date(startDate);
    dates.push(new Date(currentDate));

    while (currentDate <= end) {
        switch (frequency) {
            case "daily":
                currentDate.setDate(currentDate.getDate() + (interval || 1));
                break;
            case "weekly":
                currentDate.setDate(currentDate.getDate() + (interval || 1) * 7);
                break;
            case "monthly":
                currentDate.setMonth(currentDate.getMonth() + (interval || 1));
                break;
            default:
                break;
        }

        dates.push(new Date(currentDate));
    }

    return dates;
};

export const useNotifications = (habits: Habit[]) => {
    const notificationTimeouts = useRef<Set<NodeJS.Timeout>>(new Set()); // Usa un Set per tenere traccia dei timeout
    const scheduledNotifications = useRef<Set<string>>(new Set()); // Usa un Set per tenere traccia delle notifiche programmate

    useEffect(() => {
        const now = new Date();

        // Cancella i timer esistenti e resetta il Set delle notifiche pianificate
        notificationTimeouts.current.forEach(timeout => clearTimeout(timeout));
        notificationTimeouts.current.clear();
        scheduledNotifications.current.clear();

        habits.forEach(habit => {
            if (habit.notificationTime) {
                const [hours, minutes] = habit.notificationTime.split(':').map(Number);
                const notificationDate = new Date(now);
                notificationDate.setHours(hours, minutes, 0, 0);

                if (habit.recurrence) {
                    // Calcola le date ricorrenti
                    const recurrenceDates = generateRecurrenceDates(
                        habit.startDate,
                        habit.endDate || null,
                        habit.recurrence,
                        habit.recurrenceInterval
                    );

                    // Trova la data di notifica più vicina
                    let closestDate = null;
                    for (const date of recurrenceDates) {
                        const fullNotificationDate = new Date(date);
                        fullNotificationDate.setHours(hours, minutes, 0, 0);

                        if (fullNotificationDate.getTime() >= now.getTime() && (!closestDate || fullNotificationDate < closestDate)) {
                            closestDate = fullNotificationDate;
                        }
                    }

                    if (closestDate) {
                        const notificationKey = `${habit.id}-${closestDate.toISOString()}`;
                        if (!scheduledNotifications.current.has(notificationKey)) {
                            scheduledNotifications.current.add(notificationKey);
                            const delay = closestDate.getTime() - now.getTime();
                            const timer = setTimeout(() => {
                                new Notification(`Habit Tracker`, {
                                    body: `Ricorda: ${habit.title}`,
                                });
                            }, delay);

                            notificationTimeouts.current.add(timer);
                        }
                    }
                } else {
                    const fullNotificationDate = new Date(notificationDate);
                    const delay = fullNotificationDate.getTime() - now.getTime();

                    if (delay >= 0) {
                        const notificationKey = `${habit.id}-${fullNotificationDate.toISOString()}`;
                        if (!scheduledNotifications.current.has(notificationKey)) {
                            scheduledNotifications.current.add(notificationKey);
                            const timer = setTimeout(() => {
                                new Notification(`Habit Tracker`, {
                                    body: `Ricorda: ${habit.title}`,
                                });
                            }, delay);

                            notificationTimeouts.current.add(timer);
                        }
                    }
                }
            }
        });

        // Pulizia all'unmount
        return () => {
            notificationTimeouts.current.forEach(timeout => clearTimeout(timeout));
            notificationTimeouts.current.clear();
            scheduledNotifications.current.clear();
        };
    }, [habits]); // Ritorna solo quando habits cambia

    return { generateRecurrenceDates };
};