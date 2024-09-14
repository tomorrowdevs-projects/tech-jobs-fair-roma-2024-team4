import './App.css'
import {
  createTheme,
  ThemeProvider,
} from '@mui/material';
import LoginPage from './pages/LoginPage';

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
      <LoginPage />
    </ThemeProvider>
  )
}

export default App
