import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

export default function LoginPage() {
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState(null);

	const handleSubmit = async event => {
		event.preventDefault();
		try {
			setError(null);
			console.log(email, password);
			await signInWithEmailAndPassword(auth, email, password);
			navigate("/");
		} catch (error) {
			setError(error.message);
		}
	};

	return (
		<div className="flex items-center justify-center min-h-screen bg-primary">
			<div className="w-full max-w-sm bg-white p-8 rounded-lg shadow-lg">
				<h2 className="text-2xl font-bold text-center mb-6">Login</h2>
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
							autoComplete="username"
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
							autoComplete="current-password"
						/>
					</div>
					<button
						type="submit"
						className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg disabled:bg-gray-400"
						disabled={!email || !password}
					>
						Accedi
					</button>
					{error && <p className="text-red-500 mt-2">{error}</p>}
				</form>
				<div className="mt-6 text-center">
					<a href="/password-reset" className="text-blue-500 hover:underline">
						Password dimenticata?
					</a>
				</div>
				<div className="mt-4 text-center">
					<p className="text-secondary">
						Non hai un account?{" "}
						<a href="/signup" className="text-blue-500 hover:underline">
							Registrati
						</a>
					</p>
				</div>
			</div>
		</div>
	);
}
