import {
    Box,
    Button,
    Container,
    Link,
    TextField,
    Typography,
} from '@mui/material';

export default function LoginPage() {
    return (
        <Container maxWidth="xs">
            <Typography variant="h5" align="center" gutterBottom>
                Login
            </Typography>
            <form >
                <TextField
                    label="E-mail"
                    type="email"

                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Password"
                    type="password"
                    fullWidth
                    margin="normal"
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                >
                    Accedi
                </Button>

                <Box sx={{ mt: 3 }}>
                    <Link href="#" variant="body2">
                        Password dimenticata?
                    </Link>
                </Box>
                <Box sx={{ mt: 2 }}>
                    Non hai un account? <Link href="/signup" variant="body2">
                        Registrati
                    </Link>
                </Box>
            </form>
        </Container>
    )
}
