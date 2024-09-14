import { Button } from '@mui/material';
import { auth } from '../../firebase';
import { signOut } from 'firebase/auth';

export default function HomePage() {

    const handleLogout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
        }
    }

    return (
        <div>
            Ciao! Sei loggato con l'e-mail: {auth.currentUser?.email} <br /><br />

            <Button type="submit"
                variant="contained"
                color="primary"
                onClick={handleLogout}
            >
                Logout
            </Button>
        </div>
    )
}
