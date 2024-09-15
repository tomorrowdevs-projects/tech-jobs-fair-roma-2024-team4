import { useState } from 'react';


import { auth } from '../../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import {
    Box,
    Button,
    Container,
    Link,
    TextField,
    Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
    const navigate = useNavigate();

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            setError(null);
            console.log(email, password);
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/');
        } catch (error: any) {
            setError(error.message);
        }
    };

    return (
        <Container maxWidth="xs">
            <Typography variant="h5" align="center" gutterBottom>
                Login
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    autoComplete='username'
                    label="E-mail"
                    type="email"
                    fullWidth
                    margin="normal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    autoComplete='current-password'
                    label="Password"
                    type="password"
                    fullWidth
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    disabled={!email || !password}
                >
                    Accedi
                </Button>
                {error && <Typography color="error">{error}</Typography>}
                <Box sx={{ mt: 3 }}>
                    <Link href="/password-reset" variant="body2">
                        Password dimenticata?
                    </Link>
                </Box>
                <Box display="flex" sx={{ mt: 2 }}>
                    <Typography variant='body2'>Non hai un account?</Typography>
                    <Link href="/signup" variant="body2" sx={{ ml: 1 }}>
                        Registrati
                    </Link>
                </Box>
            </form>
        </Container>
    )
}
