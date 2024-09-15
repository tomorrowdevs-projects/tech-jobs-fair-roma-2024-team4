import React, { useState } from "react";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function SignupPage() {
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState(null);
	const [success, setSuccess] = useState("");

	const handleSubmit = async event => {
		event.preventDefault();

		try {
			setError(null);
			await createUserWithEmailAndPassword(auth, email, password);
			setSuccess("Registrazione avvenuta con successo!");
		} catch (error) {
			setError(error.message);
		}
	};

	return (
		<div className="flex items-center justify-center min-h-screen bg-primary">
			<div className="w-full max-w-sm bg-white p-8 rounded-lg shadow-lg">
				<h2 className="text-2xl font-bold text-center mb-6">Registrati</h2>
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
					<div className="mb-6">
						<label htmlFor="password" className="block text-secondary">
							Password
						</label>
						<input
							id="password"
							type="password"
							className="w-full mt-1 p-2 border border-gray-300 rounded-lg"
							value={password}
							onChange={e => setPassword(e.target.value)}
						/>
					</div>
					{success && (
						<div className="mb-4 text-green-500">
							{success}{" "}
							<a href="/login" className="text-blue-500 hover:underline ml-2">
								Vai al login
							</a>
						</div>
					)}
					{error && <p className="text-red-500 mb-4">{error}</p>}
					<button
						type="submit"
						className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg disabled:bg-gray-400"
						disabled={!email || !password}
					>
						Registrati
					</button>
				</form>
				<div className="mt-6 text-center">
					<p className="text-secondary">
						Hai già un account?{" "}
						<a href="/login" className="text-blue-500 hover:underline">
							Accedi
						</a>
					</p>
				</div>
			</div>
		</div>
	);
}
