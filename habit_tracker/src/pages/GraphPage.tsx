import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
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
	Button,
} from "@mui/material";
import { useHabits } from "../hooks/useHabits";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";

import "react-calendar/dist/Calendar.css";
import HabitCard from "../components/HabitCard";
import { Habit } from "../types/Habit";
import { generateRecurrenceDates, useNotifications } from "../hooks/useNotification";
import Chart from "../components/Chart";

// Importa il componente Chart

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function HomePage() {
	useTheme();
	const { error, fetchHabits, habits, loading } = useHabits();
	const [habitToEdit, setHabitToEdit] = useState<Habit | null>(null);
	const [dateRange, setDateRange] = useState<Value>([new Date(), new Date()]);
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const [showGraph, setShowGraph] = useState<boolean>(false);

	useNotifications(habits);

	const filteredHabits = useMemo(() => {
		const [startDate, endDate] = dateRange as [Date, Date];
		return habits.filter(habit =>
			habit.startDate >= startDate && habit.startDate <= endDate
		);
	}, [habits, dateRange]);

	const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
	};

	const handleLogout = async () => {
		try {
			await signOut(auth);
		} catch (error) { }
	};

	const handleDateChange = (value: Value) => {
		setDateRange(value);
	};

	const handleGenerateGraph = () => {
		setShowGraph(true);
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
				{/* Seleziona il periodo con il calendario */}
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
					<Calendar
						selectRange={true}
						onChange={handleDateChange}
						value={dateRange}
					/>
				</Grid2>

				<Grid2
					sx={{
						flex: 9,
						overflowY: "auto",
						padding: 2,
					}}
				>
					<Button variant="contained" onClick={handleGenerateGraph}>
						Genera Grafico
					</Button>

					{/* Mostra gli habit filtrati per le date selezionate */}
					<Typography variant="h6" mt={2}>Habits Selezionate</Typography>
					<Grid2 container spacing={2} sx={{ padding: 2 }}>
						{filteredHabits.map((habit) => (
							<HabitCard
								key={habit.id}
								habit={habit}
								selectedDate={new Date()}
								handleOpenModal={function (habit: Habit | null): void {
									throw new Error("Function not implemented.");
								}} onUpdate={function (): void {
									throw new Error("Function not implemented.");
								}} />
						))}
					</Grid2>

					{/* Mostra il grafico solo se showGraph è true */}
					{showGraph && (
						<Box sx={{ marginTop: 4 }}>
							<Typography variant="h6">Grafico delle Habit</Typography>
							<Chart habits={filteredHabits} />
						</Box>
					)}
				</Grid2>
			</Grid2>
		</Box>
	);
}
