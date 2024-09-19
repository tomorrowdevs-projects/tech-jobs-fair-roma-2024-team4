import React, { useState } from 'react';
import { Card, CardContent, Typography, IconButton, Tooltip, Box, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';

import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import { Habit } from '../types/Habit';
import { useHabits } from '../hooks/useHabits';

interface HabitCardProps {
    habit: Habit;
    selectedDate: Date;
    handleOpenModal: (habit: Habit | null) => void;
    onUpdate: () => void;
}

const HabitCard: React.FC<HabitCardProps> = ({ habit, selectedDate, handleOpenModal, onUpdate }) => {
    const { completeHabit, deleteHabit } = useHabits();
    const [open, setOpen] = useState(false);  // Stato per aprire/chiudere la finestra di dialogo

    const handleOpenDeleteConfirm = () => {
        setOpen(true);  // Apre la finestra di dialogo
    };

    const handleClose = () => {
        setOpen(false);  // Chiude la finestra di dialogo
    };

    const handleCompleteHabit = async (habit: Habit) => {
        await completeHabit(habit, selectedDate);
        onUpdate();
    }

    const handleDeleteHabit = async () => {
        await deleteHabit(habit);
        onUpdate();
        handleClose();  // Chiude la finestra di dialogo dopo aver eliminato
    }

    const handleEditHabit = async (habit: Habit | null) => {
        handleOpenModal(habit);
    }

    const isCompleted = habit.completionDates.some(date => date.toDateString() === selectedDate.toDateString());

    return (
        <>
            <Card sx={{ width: 250 }}>
                <CardContent>
                    <Typography
                        variant="h6"
                        component="div"
                        style={{ textDecoration: isCompleted ? 'line-through' : 'none' }}>
                        {habit.title}
                    </Typography>
                    <Typography color="text.secondary">
                        {habit.isAllDay ? 'Tutto il giorno' : habit.endDate ?
                            `Alle ${habit.startTime}` : `Dalle ${habit.startTime} alle ${habit.endTime}`}
                    </Typography>
                </CardContent>
                <CardContent>
                    <Box display="flex" alignItems="center" justifyContent="flex-end" flexGrow={1}>
                        <Tooltip title="Completa">
                            <IconButton color="success" onClick={async () => await handleCompleteHabit(habit)}>
                                <CheckIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Modifica">
                            <IconButton color="primary" onClick={async () => await handleEditHabit(habit)}>
                                <EditIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Elimina">
                            <IconButton color="error" onClick={handleOpenDeleteConfirm}>
                                <DeleteIcon />
                            </IconButton>
                        </Tooltip>
                    </Box>
                </CardContent>
            </Card>

            {/* Dialog di conferma per l'eliminazione */}
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Conferma eliminazione"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Sei sicuro di voler eliminare questa abitudine? Questa azione non può essere annullata.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Annulla
                    </Button>
                    <Button onClick={handleDeleteHabit} color="error" autoFocus>
                        Elimina
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default HabitCard;
