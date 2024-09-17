import React, { useState } from "react";
import { auth } from "../../firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function ResetPasswordPage() {
	const [email, setEmail] = useState("");
	const [error, setError] = useState(null);
	const navigate = useNavigate();

	const handleSubmit = async event => {
		event.preventDefault();

		try {
			setError(null);
			await sendPasswordResetEmail(auth, email);
			navigate("/login");
		} catch (error) {
			setError(error.message);
		}
	};

	return (
		<div className="flex items-center justify-center min-h-screen bg-primary">
			<div className="w-full max-w-sm bg-white p-8 rounded-lg shadow-lg">
				<h2 className="text-2xl font-bold text-center mb-6">
					Recupera la tua password
				</h2>
				<form onSubmit={handleSubmit}>
					<div className="mb-4">
						<label htmlFor="email" className="block text-secondary">
							E-mail
						</label>
						<input
							id="email"
							type="email"
							className="w-full mt-1 p-2 border border-gray-300 rounded-lg"
							value={email}
							onChange={e => setEmail(e.target.value)}
						/>
					</div>
					{error && <p className="text-red-500 mb-4">{error}</p>}
					<button
						type="submit"
						className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg disabled:bg-gray-400"
						disabled={!email}
					>
						Recupera password
					</button>
				</form>
				<div className="mt-6 text-center">
					<a href="/login" className="text-blue-500 hover:underline">
						Torna al login
					</a>
				</div>
			</div>
		</div>
	);
}
