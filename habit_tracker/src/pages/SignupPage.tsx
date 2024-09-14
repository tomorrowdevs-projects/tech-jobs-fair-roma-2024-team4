import { auth } from '../../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

import {
    Box,
    Button,
    Container,
    Link,
    TextField,
    Typography,
} from '@mui/material';

import { useState } from "react";


export default function SignupPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);


    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            setError(null);
            await createUserWithEmailAndPassword(auth, email, password);
            setSuccess('Registrazione avvenuta con successo!');
        } catch (error: any) {
            setError(error.message);
        }
    };

    return (
        <Container maxWidth="xs">
            <Typography variant="h5" align="center" gutterBottom>
                Registrati
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="E-mail"
                    type="email"
                    fullWidth
                    margin="normal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    autoComplete='off'
                    label="Password"
                    type="password"
                    fullWidth
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}

                />
                {success &&
                    <Box display="flex" sx={{ my: 2 }}>
                        <Typography color="success">{success}</Typography>
                        <Link href="/login" variant="body1" sx={{ ml: 1 }}>
                            Vai al login
                        </Link>
                    </Box>}
                {error && <Typography color="error">{error}</Typography>}
                <Button

                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    disabled={!email || !password}
                >
                    Registrati
                </Button>
                <Box display="flex" sx={{ mt: 2 }}>
                    <Typography variant='body2'>Hai già un account?</Typography>
                    <Link href="/login" variant="body2" sx={{ ml: 1 }}>
                        Accedi
                    </Link>
                </Box>
            </form>
        </Container>
    )
}
