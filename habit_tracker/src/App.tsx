import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
  createTheme,
  ThemeProvider,
} from '@mui/material';

import ProtectedRoute from './components/ProtectedRoute';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import SignupPage from './pages/SignupPage';

import './App.css'

const theme = createTheme({
  palette: {
    primary: {
      main: '#3f51b5',
    },
  },
});
function App() {

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProtectedRoute element={<HomePage />} />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path='/password-reset' element={<ResetPasswordPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
