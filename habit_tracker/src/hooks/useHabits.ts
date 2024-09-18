import { useState, useEffect } from 'react';

import { auth, db } from '../../firebase';
import { collection, addDoc, getDocs, query, where, Timestamp } from 'firebase/firestore';

import { Habit } from '../types/Habit';

export const useHabits = () => {
    const [habits, setHabits] = useState<Habit[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const addHabit = async (newHabit: Habit) => {
        try {

            if (!auth.currentUser)
                throw new Error('Utente non autenticato.');

            const habit = {
                ...newHabit,
                userId: auth.currentUser.uid,
                startDate: Timestamp.fromDate(newHabit.startDate),
                endDate: newHabit.endDate ? Timestamp.fromDate(newHabit.endDate) : null,
                completionDates: newHabit.completionDates.map((date) => Timestamp.fromDate(date)),
            };

            await addDoc(collection(db, 'habits'), habit);
        } catch (e) {
            setError('Errore durante l\'aggiunta dell\'habit.');
            console.log(e);
        }
    };

    const fetchHabits = async (userId: string) => {
        try {
            setLoading(true);
            const habitsRef = collection(db, 'habits');
            const q = query(habitsRef, where('userId', '==', userId));
            const querySnapshot = await getDocs(q);

            const habitsData: Habit[] = querySnapshot.docs.map((doc) => {
                const data = doc.data();
                return {
                    ...data,
                    startDate: data.startDate instanceof Timestamp ? data.startDate.toDate() : new Date(data.startDate),
                    endDate: data.endDate ? (data.endDate instanceof Timestamp ? data.endDate.toDate() : new Date(data.endDate)) : null,
                    completionDates: (data.completionDates || []).map((date: Timestamp | string) =>
                        date instanceof Timestamp ? date.toDate() : new Date(date)
                    ),
                } as Habit;
            });

            setHabits(habitsData);
        } catch (e) {
            setError('Errore durante il recupero degli habits.');
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        const user = auth.currentUser;
        if (user) {
            fetchHabits(user.uid);
        }
    }, []);

    return {
        addHabit,
        error,
        fetchHabits,
        habits,
        loading,
        setError,
        setLoading,
		setHabits,
    };
};
