import { useState } from 'react';

import { Dayjs } from 'dayjs';
import type { } from '@mui/x-date-pickers/AdapterDayjs';
import { v4 as uuidv4 } from 'uuid';

import {
    Button,
    Box,
    Checkbox,
    MenuItem,
    FormControlLabel,
    TextField,
    Typography,
} from '@mui/material';

import { DatePicker, TimePicker } from '@mui/x-date-pickers';

import { useHabits } from '../hooks/useHabits';

import { Habit } from '../types/Habit';
import { Recurrence } from '../types/Recurrence';
import { useNavigate } from 'react-router-dom';

export default function AddHabitForm() {
    const navigate = useNavigate();
    const { addHabit, error, setError } = useHabits();

    const [title, setTitle] = useState<string>('');
    const [startDate, setStartDate] = useState<Dayjs | null>(null);
    const [endDate, setEndDate] = useState<Dayjs | null>(null);
    const [startTime, setStartTime] = useState<Dayjs | null>(null);
    const [endTime, setEndTime] = useState<Dayjs | null>(null);
    const [notificationTime, setNotificationTime] = useState<Dayjs | null>(null);
    const [recurrence, setRecurrence] = useState<Recurrence | ''>('');
    const [isAllDay, setIsAllDay] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();


        if (!title || !startDate) {
            setError('Per favore, compila tutti i campi richiesti.');
            return;
        }

        const newHabit: Habit = {
            id: uuidv4(),
            userId: '',
            title,
            startDate: startDate.toDate(),
            endDate: endDate ? endDate.toDate() : null,
            startTime: isAllDay ? null : startTime?.format('HH:mm') || null,
            endTime: isAllDay ? null : endTime?.format('HH:mm') || null,
            notificationTime: notificationTime?.format('HH:mm') || null,
            recurrence: recurrence.length === 0 ? null : recurrence as Recurrence | null,
            isAllDay,
            completionDates: []
        };

        try {
            await addHabit(newHabit);
            navigate('/');
        } catch (err) {
            setError('Errore durante l\'aggiunta dell\'habit.');
            console.error(err);
        }
    };

    return (
        <Box sx={{ maxWidth: 400, margin: '0 auto', padding: 2 }}>
            <Typography variant="h6" gutterBottom>Aggiungi un nuovo habit</Typography>

            <form onSubmit={handleSubmit}>
                {error && <Typography color="error">{error}</Typography>}

                <TextField
                    fullWidth
                    label="Titolo"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    margin="normal"
                    required
                />

                <DatePicker
                    label="Data di inizio"
                    value={startDate}
                    onChange={(date) => setStartDate(date)}
                    sx={{ my: 2 }}
                />

                <DatePicker
                    label="Data di fine"
                    value={endDate}
                    onChange={(date) => setEndDate(date)}
                    sx={{ my: 2 }}
                />

                {!isAllDay && (
                    <>
                        <TimePicker
                            label="Orario di inizio"
                            value={startTime}
                            onChange={(time) => setStartTime(time)}
                            sx={{ my: 2 }}
                        />
                        <TimePicker
                            label="Orario di fine"
                            value={endTime}
                            onChange={(time) => setEndTime(time)}
                            sx={{ my: 2 }}
                        />
                    </>
                )}

                <FormControlLabel
                    control={<Checkbox checked={isAllDay} onChange={() => setIsAllDay(!isAllDay)} />}
                    label="Valido tutto il giorno"
                />

                <TextField
                    fullWidth
                    select
                    label="Ricorrenza"
                    value={recurrence}
                    onChange={(e) => setRecurrence(e.target.value as Recurrence)}
                    margin="normal"
                >
                    <MenuItem value=""></MenuItem>
                    <MenuItem value="daily">Giornaliera</MenuItem>
                    <MenuItem value="weekly">Settimanale</MenuItem>
                    <MenuItem value="monthly">Mensile</MenuItem>
                </TextField>

                <TimePicker
                    label="Orario notifica"
                    value={notificationTime}
                    onChange={(time) => setNotificationTime(time)} />

                <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}
                >
                    Aggiungi habit
                </Button>
            </form>
        </Box>
    );
}
