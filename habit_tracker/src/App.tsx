import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
  createTheme,
  ThemeProvider,
} from '@mui/material';

import { LocalizationProvider } from '@mui/x-date-pickers';

import ProtectedRoute from './components/ProtectedRoute';

import AddHabitForm from './pages/AddHabitPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import SignupPage from './pages/SignupPage';
import theme from './styles/theme';
import './App.css'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

/*
const theme = createTheme({
  palette: {
    primary: {
      main: '#3f51b5',
    },
  },
});
*/

function App() {

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<ProtectedRoute element={<HomePage />} />} />
            <Route path='/addHabit' element={<ProtectedRoute element={<AddHabitForm />} />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path='/password-reset' element={<ResetPasswordPage />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </LocalizationProvider>

  )
}

export default App
