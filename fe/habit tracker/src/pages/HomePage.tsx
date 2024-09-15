import React from "react";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
	const navigate = useNavigate();

	const handleLogout = async () => {
		try {
			await signOut(auth);
			navigate("/login");
		} catch (error) {
			console.error("Errore durante il logout:", error);
		}
	};

	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-primary">
			<div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg text-center">
				<h2 className="text-xl font-bold mb-4">Benvenuto!</h2>
				<p className="text-secondary">
					Sei loggato con l'e-mail: {auth.currentUser?.email}
				</p>
				<button
					onClick={handleLogout}
					className="mt-6 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg"
				>
					Logout
				</button>
			</div>
		</div>
	);
}
