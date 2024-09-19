import { useEffect, useRef } from 'react';
import { Habit } from '../types/Habit';

interface NotificationTimers {
    [habitId: string]: NodeJS.Timeout;
}

export const useNotifications = (habits: Habit[]) => {
    const timersRef = useRef<NotificationTimers>({});

    useEffect(() => {
        Object.values(timersRef.current).forEach(clearTimeout);
        timersRef.current = {};

        const notificationHabits = habits.filter(
            habit => habit.notificationTime && new Date(habit.notificationTime).getTime() >= Date.now()
        );

        notificationHabits.forEach(habit => {
            const notificationTime = new Date(habit.notificationTime!).getTime();
            const currentTime = Date.now();
            const delay = notificationTime - currentTime;

            if (delay > 0) {
                const timer = setTimeout(() => {
                    new Notification(`Habit Tracker`, {
                        body: `Ricorda: ${habit.title}`,
                    });

                    delete timersRef.current[habit.id];
                }, delay);

                timersRef.current[habit.id] = timer;
            }
        });


        return () => {
            Object.values(timersRef.current).forEach(clearTimeout);
            timersRef.current = {};
        };
    }, [habits]);
};
