import { useNavigate } from 'react-router-dom';
import { Box, Button, Card, CardContent, Grid2, Stack, Typography } from '@mui/material';


import { auth } from '../../firebase';
import { signOut } from 'firebase/auth';
import { useHabits } from '../hooks/useHabits';

export default function HomePage() {

    const navigate = useNavigate();
    const { error, habits, loading } = useHabits();


    const handleLogout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
        }
    }

    if (loading) return <Typography variant="h6">Caricamento...</Typography>;
    if (error) return <Typography variant="h6" color="error">{error}</Typography>;

    return (
        <Grid2 container spacing={2} sx={{ height: '100vh' }}>

            <Grid2 sx={{ overflowY: 'auto', padding: 2 }}>
                <Typography variant="h6" gutterBottom>
                    Ciao! Sei loggato con l'e-mail: {auth.currentUser?.email}
                </Typography>
                <Box sx={{ padding: 2 }}>
                    <Stack spacing={2}>
                        {habits.map((habit) => (
                            <Card key={habit.id}>
                                <CardContent>
                                    <Typography variant="h6" component="div">
                                        {habit.title}
                                    </Typography>
                                    <Typography color="text.secondary">
                                        {habit.isAllDay ? 'Tutto il giorno' : `Dalle ${habit.startTime || 'N/A'} alle ${habit.endTime || 'N/A'}`}
                                    </Typography>
                                    <Typography color="text.secondary">
                                        {`Ricorrenza: ${habit.recurrence ? habit.recurrence : 'Nessuna'}`}
                                    </Typography>
                                    {/* <Typography color="text.secondary">
                                        {habit.isCompleted ? 'Completato' : 'Non completato'}
                                    </Typography> */}
                                    <Typography color="text.secondary">
                                        {`Data di inizio: ${habit.startDate.toLocaleDateString()}`}
                                    </Typography>
                                    <Typography color="text.secondary">
                                        {`Data di fine: ${habit.endDate ? habit.endDate.toLocaleDateString() : 'N/A'}`}
                                    </Typography>
                                    <Typography color="text.secondary">
                                        {`Orario di inizio: ${habit.startTime || 'N/A'}`}
                                    </Typography>
                                    <Typography color="text.secondary">
                                        {`Orario di fine: ${habit.endTime || 'N/A'}`}
                                    </Typography>
                                    <Typography color="text.secondary">
                                        {`Notifica alle: ${habit.notificationTime || 'N/A'}`}
                                    </Typography>
                                    <Typography color="text.secondary">
                                        {`Date di completamento: ${habit.completionDates.map(date => date.toLocaleDateString()).join(', ')}`}
                                    </Typography>
                                </CardContent>
                            </Card>
                        ))}
                    </Stack>
                </Box>
            </Grid2>


            <Grid2 sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: 2 }}>
                <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-evenly', mb: 2 }}>
                    <Button variant="contained" color="primary" sx={{ width: '40%' }}
                        onClick={() => navigate('/addHabit')}>
                        Aggiungi habit
                    </Button>
                    <Button variant="contained" color="secondary" sx={{ width: '40%' }}>
                        Test 1
                    </Button>
                </Box>

                <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-evenly', mb: 2 }}>
                    <Button variant="contained" color="success" sx={{ width: '40%' }}>
                        Test 2
                    </Button>
                    <Button variant="contained" color="error" sx={{ width: '40%' }}>
                        Test 3
                    </Button>
                </Box>

                <Button variant="contained" color="primary" onClick={handleLogout} sx={{ width: '40%' }}>
                    Logout
                </Button>
            </Grid2>
        </Grid2>
    )
}
