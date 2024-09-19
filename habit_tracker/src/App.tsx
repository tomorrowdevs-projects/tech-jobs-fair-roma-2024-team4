import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";

import { LocalizationProvider } from "@mui/x-date-pickers";

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import NotificationProvider from "./components/NotificationProvider";
import ProtectedRoute from "./components/ProtectedRoute";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import SignupPage from "./pages/SignupPage";

import theme from './styles/theme';

import dayjs from 'dayjs';
import 'dayjs/locale/it';


import "./App.css";

function App() {

	dayjs.locale('it'); // Imposta il locale predefinito a italiano

	return (
		<LocalizationProvider dateAdapter={AdapterDayjs}>
			<ThemeProvider theme={theme}>
				<NotificationProvider>
					<CssBaseline />
					<BrowserRouter>
						<Routes>
							<Route
								path="/"
								element={<ProtectedRoute element={<HomePage />} />}
							/>
							<Route path="/login" element={<LoginPage />} />
							<Route path="/signup" element={<SignupPage />} />
							<Route path="/password-reset" element={<ResetPasswordPage />} />
						</Routes>
					</BrowserRouter>
				</NotificationProvider>
			</ThemeProvider>
		</LocalizationProvider>
	);
}

export default App;
