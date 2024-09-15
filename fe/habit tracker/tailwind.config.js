/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				primary: "#ddae73",
				secondary: "#1d1307",
				tertiary: "#875921",
				fourty: "#f2e0ca",
				fifty: "#422b10",
			},
		},
	},
	plugins: [],
};
