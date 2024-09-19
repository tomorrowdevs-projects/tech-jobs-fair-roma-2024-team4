import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Calendar from "react-calendar";

import {
	useTheme,
	AppBar,
	Avatar,
	Box,
	CircularProgress,
	Grid2,
	IconButton,
	Menu,
	MenuItem,
	Toolbar,
	Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import { useHabits } from "../hooks/useHabits";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";

import AddHabitModal from "./AddHabitModal";

import "react-calendar/dist/Calendar.css";
import HabitCard from "../components/HabitCard";
import { Habit } from "../types/Habit";
import { generateRecurrenceDates, useNotifications } from "../hooks/useNotification";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function HomePage() {
	useTheme();
	const navigate = useNavigate();

	const { error, fetchHabits, habits, loading } = useHabits();
	const [habitToEdit, setHabitToEdit] = useState<Habit | null>(null);
	const [modalOpen, setModalOpen] = useState<boolean>(false);

	const [selectedDate, setSelectedDate] = useState<Value>(new Date());
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

	useNotifications(habits);

	const handleNavigateToGraph = () => {
		handleMenuClose();
		navigate('/grafici');
	};

	// Funzione per controllare se la data selezionata è valida
	const isDateSelectedValid = (habit: Habit, selectedDate: Date): boolean => {
		const { startDate, endDate, recurrence, recurrenceInterval } = habit;

		// Se non c'è un'endDate, controlla solo se la data selezionata è la startDate
		if (!endDate) {
			return selectedDate.toDateString() === startDate.toDateString();
		}

		// Controlla se la data selezionata è compresa tra startDate e endDate
		if (selectedDate >= startDate && selectedDate <= endDate) {
			// Se c'è una ricorrenza, controlla le date di ricorrenza
			if (recurrence) {
				const recurrenceDates = generateRecurrenceDates(
					startDate,
					endDate,
					recurrence,
					recurrenceInterval
				);
				return recurrenceDates.some(
					date => date.toDateString() === selectedDate.toDateString()
				);
			}
			return true;
		}

		return false;
	};

	// Filtro degli habit basato sulla data selezionata
	const filteredHabits = useMemo(() => {
		return habits.filter(habit =>
			isDateSelectedValid(habit, selectedDate as Date)
		);
	}, [habits, selectedDate]);

	const isMorning = (startTime?: string) => {
		if (!startTime) return false;
		const time = parseInt(startTime.split(':')[0], 10);
		return time >= 0 && time < 12;
	};

	const isAfternoon = (startTime?: string) => {
		if (!startTime) return false;
		const time = parseInt(startTime.split(':')[0], 10);
		return time >= 12 && time < 18;
	};

	const isEvening = (startTime?: string) => {
		if (!startTime) return false;
		const time = parseInt(startTime.split(':')[0], 10);
		return time >= 18 || time < 6;
	};


	const handleOpenModal = (habit: Habit | null) => {
		setHabitToEdit(habit);
		setModalOpen(true);
	};

	const handleCloseModal = async () => {
		setModalOpen(false);
		setHabitToEdit(null);
		await fetchHabits();
	};

	const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
	};

	const handleLogout = async () => {
		try {
			await signOut(auth);
			navigate("/");
		} catch (error) { }
	};

	if (loading) {
		return (
			<Grid2
				container
				sx={{
					height: "100vh",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					textAlign: "center",
				}}
			>
				<Box>
					<CircularProgress sx={{ color: "primary.main" }} />
					<Typography variant="h6" mt={2}>
						Caricamento...
					</Typography>
				</Box>
			</Grid2>
		);
	}
	if (error)
		return (
			<Typography variant="h6" color="error">
				{error}
			</Typography>
		);

	return (
		<Box sx={{ height: "90vh" }}>
			<AppBar position="static" sx={{ height: "80px" }}>
				<Toolbar sx={{ height: "80px" }}>
					<Link
						to="/"
						style={{
							marginRight: 'auto',
							textDecoration: 'none',
							color: 'inherit',
						}}
					>
						<Typography
							variant="h6"
							sx={{
								flexGrow: 1,
								cursor: 'pointer',
							}}
						>
							Habit Tracker
						</Typography>
					</Link>
					<Typography variant="h6" sx={{ mr: 2 }}>
						{auth.currentUser?.email}
					</Typography>
					<IconButton onClick={handleMenuOpen}>
						<Avatar alt="Profile Icon" />
					</IconButton>
					<Menu
						anchorEl={anchorEl}
						open={Boolean(anchorEl)}
						onClose={handleMenuClose}
						anchorOrigin={{
							vertical: "top",
							horizontal: "right",
						}}
						transformOrigin={{
							vertical: "top",
							horizontal: "right",
						}}
						sx={{ mt: 8 }}
					>
						<MenuItem>Profilo</MenuItem>
						<MenuItem onClick={handleNavigateToGraph}>Grafici</MenuItem>
						<MenuItem onClick={handleLogout}>Logout</MenuItem>
					</Menu>
				</Toolbar>
			</AppBar>

			<Grid2
				container
				sx={{
					flex: 1,
					overflow: "hidden",
					flexDirection: { xs: "column", md: "row" },
					display: "flex",
					justifyContent: "center",
				}}
			>
				<Grid2
					sx={{
						flex: 3,
						overflowY: "auto",
						padding: { xs: 1, md: 2 },
						display: "flex",
						marginBottom: "auto",
						justifyContent: "center",
					}}
				>
					<Calendar onChange={setSelectedDate} value={selectedDate} />
				</Grid2>

				<Grid2
					sx={{
						flex: 9,
						overflowY: "auto",
						padding: 2,
					}}
				>
					<Typography variant="h6">Tutto il giorno</Typography>
					<Grid2 container spacing={2} sx={{ padding: 2 }}>

						{filteredHabits
							.filter((habit) => habit.isAllDay)
							.map((habit) => (
								<HabitCard
									key={habit.id}
									habit={habit}
									selectedDate={selectedDate as Date}
									handleOpenModal={handleOpenModal}
									onUpdate={fetchHabits}
								/>
							))}

					</Grid2>

					<Typography variant="h6">Mattina</Typography>
					<Grid2 container spacing={2} sx={{ padding: 2 }}>

						{filteredHabits
							.filter((habit) => !habit.isAllDay && isMorning(habit.startTime))
							.map((habit) => (
								<HabitCard
									key={habit.id}
									habit={habit}
									selectedDate={selectedDate as Date}
									handleOpenModal={handleOpenModal}
									onUpdate={fetchHabits}
								/>
							))}

					</Grid2>

					<Typography variant="h6">Pomeriggio</Typography>
					<Grid2 container spacing={2} sx={{ padding: 2 }}>

						{filteredHabits
							.filter((habit) => !habit.isAllDay && isAfternoon(habit.startTime))
							.map((habit) => (
								<HabitCard
									key={habit.id}
									habit={habit}
									selectedDate={selectedDate as Date}
									handleOpenModal={handleOpenModal}
									onUpdate={fetchHabits}
								/>
							))}

					</Grid2>

					<Typography variant="h6">Sera</Typography>
					<Grid2 container spacing={2} sx={{ padding: 2 }}>

						{filteredHabits
							.filter((habit) => !habit.isAllDay && isEvening(habit.startTime))
							.map((habit) => (
								<HabitCard
									key={habit.id}
									habit={habit}
									selectedDate={selectedDate as Date}
									handleOpenModal={handleOpenModal}
									onUpdate={fetchHabits}
								/>
							))}

					</Grid2>
				</Grid2>
			</Grid2>

			<AddHabitModal
				open={modalOpen}
				onClose={handleCloseModal}
				habit={habitToEdit}
			/>

			<IconButton
				color="primary"
				aria-label="Aggiungi habit"
				onClick={() => handleOpenModal(null)}
				sx={{
					position: "fixed",
					bottom: 16,
					right: 16,
					bgcolor: "primary.main",
					color: "white",
					"&:hover": {
						bgcolor: "primary.dark",
					},
				}}
			>
				<AddIcon />
			</IconButton>
		</Box>
	);
}
