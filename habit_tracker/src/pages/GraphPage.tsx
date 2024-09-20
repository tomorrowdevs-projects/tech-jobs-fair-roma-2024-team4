import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
	useTheme,
	AppBar,
	Avatar,
	Box,
	IconButton,
	Menu,
	MenuItem,
	Toolbar,
	Typography,
} from "@mui/material";

import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import { useHabits } from "../hooks/useHabits";
import HabitCompletionChart from "../components/HabitCompletionChart";

export default function GraphPage() {
	useTheme();
	const navigate = useNavigate();

	const { habits } = useHabits();

	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

	const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
	};

	const handleNavigateToHome = () => {
		handleMenuClose();
		navigate('/');
	};

	const handleLogout = async () => {
		try {
			await signOut(auth);
			navigate("/");
		} catch (error) { }
	};

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
							Habit Tracker - Grafici
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
						<MenuItem onClick={handleNavigateToHome}>Home</MenuItem>
						<MenuItem>Profilo</MenuItem>
						<MenuItem onClick={handleLogout}>Logout</MenuItem>
					</Menu>
				</Toolbar>
			</AppBar>

			{/* Aggiungi qui il componente Chart.js */}
			<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'calc(100vh - 80px)' }}>
				<HabitCompletionChart habits={habits} />
			</Box>
		</Box>
	);
}
