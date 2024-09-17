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
    Modal,
    Grid2,
} from '@mui/material';

import { DatePicker, TimePicker } from '@mui/x-date-pickers';

import { useHabits } from '../hooks/useHabits';

import { Habit } from '../types/Habit';
import { isRecurrence, Recurrence } from '../types/Recurrence';

interface AddHabitModalProps {
    open: boolean;
    onClose: () => void;
}

export default function AddHabitModal({ open, onClose }: AddHabitModalProps) {
    const { addHabit, error, setError } = useHabits();

    const [title, setTitle] = useState<string>('');
    const [startDate, setStartDate] = useState<Dayjs | null>(null);
    const [endDate, setEndDate] = useState<Dayjs | null>(null);
    const [startTime, setStartTime] = useState<Dayjs | null>(null);
    const [endTime, setEndTime] = useState<Dayjs | null>(null);
    const [notificationTime, setNotificationTime] = useState<Dayjs | null>(null);
    const [recurrence, setRecurrence] = useState<Recurrence | String>('');
    const [recurrenceInterval, setRecurrenceInterval] = useState<number | null>(null);
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
            recurrence: isRecurrence(recurrence.toString()) ? recurrence as Recurrence | null : null,
            recurrenceInterval: recurrenceInterval,
            isAllDay,
            completionDates: []
        };

        try {
            await addHabit(newHabit);
            onClose();
        } catch (err) {
            setError('Errore durante l\'aggiunta dell\'habit.');
        }
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 600,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4
                }}
            >
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

                    <Grid2 container spacing={2}>
                        <Grid2 sx={{ flex: 2 }}>
                            <DatePicker
                                label="Data di inizio"
                                value={startDate}
                                onChange={(date) => setStartDate(date)}
                                sx={{ my: 2 }}
                            />
                        </Grid2>
                        <Grid2 sx={{ flex: 2 }}>
                            <DatePicker
                                label="Data di fine"
                                value={endDate}
                                onChange={(date) => setEndDate(date)}
                                sx={{ my: 2 }}
                            />
                        </Grid2>
                    </Grid2>

                    {!isAllDay && (
                        <Grid2 container spacing={2}>
                            <Grid2 sx={{ flex: 2 }}>
                                <TimePicker
                                    label="Orario di inizio"
                                    value={startTime}
                                    onChange={(time) => setStartTime(time)}
                                    sx={{ my: 2 }}
                                />
                            </Grid2>
                            <Grid2 sx={{ flex: 2 }}>
                                <TimePicker
                                    label="Orario di fine"
                                    value={endTime}
                                    onChange={(time) => setEndTime(time)}
                                    sx={{ my: 2 }}
                                />
                            </Grid2>
                        </Grid2>
                    )}

                    <FormControlLabel
                        control={
                            <Checkbox checked={isAllDay}
                                onChange={() => setIsAllDay(!isAllDay)} />}
                        label="Valido tutto il giorno"
                    />

                    <Grid2 container spacing={2}>
                        <Grid2 sx={{ flex: 2 }}>
                            <TextField
                                fullWidth
                                select
                                label="Ricorrenza"
                                value={recurrence}
                                onChange={(e) => setRecurrence(e.target.value as Recurrence)}
                                margin="normal"
                            >
                                <MenuItem value="nessuna">Nessuna</MenuItem>
                                <MenuItem value="daily">Giornaliera</MenuItem>
                                <MenuItem value="weekly">Settimanale</MenuItem>
                                <MenuItem value="monthly">Mensile</MenuItem>
                            </TextField>
                        </Grid2>

                        <Grid2 sx={{ flex: 2 }}>
                            {recurrence && isRecurrence(recurrence.toString()) && (
                                <TextField
                                    fullWidth
                                    type="number"
                                    label={`Ogni quanto (${recurrence})`}
                                    value={recurrenceInterval}
                                    onChange={(e) => setRecurrenceInterval(Number(e.target.value))}
                                    margin="normal"
                                    inputMode='numeric'
                                    inputProps={{
                                        min: 1,
                                        max: recurrence === 'daily' ? 30 : recurrence === 'weekly' ? 52 : 12,
                                    }}
                                />
                            )}
                        </Grid2>
                    </Grid2>

                    <TimePicker
                        label="Orario notifica"
                        value={notificationTime}
                        onChange={(time) => setNotificationTime(time)}
                        sx={{ my: 2 }}
                    />

                    <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                        Aggiungi habit
                    </Button>
                </form>
            </Box>
        </Modal>
    );
}
