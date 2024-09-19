import { createTheme } from "@mui/material/styles";

const theme = createTheme({
	palette: {
		primary: {
			main: "#1B0A7C", // Blu principale
			light: "#63a4ff", // Blu chiaro
			dark: "#115293", // Blu scuro
			contrastText: "#ffffff", // Colore del testo in contrasto
		},
		secondary: {
			main: "#2196f3", // Blu secondario
			light: "#6ec6ff", // Blu secondario chiaro
			dark: "#0069c0", // Blu secondario scuro
			contrastText: "#ffffff", // Colore del testo in contrasto
		},
		info: {
			main: "#0d47a1", // Blu informativo
			light: "#5472d3", // Blu informativo chiaro
			dark: "#002171", // Blu informativo scuro
			contrastText: "#ffffff", // Colore del testo in contrasto
		},
		background: {
			default: "#e3f2fd", // Sfondo principale
			paper: "#DAA466", // Sfondo della carta
		},
		text: {
			primary: "#000000", // Testo principale
			secondary: "#333333", // Testo secondario
		},
	},
	breakpoints: {
		values: {
			xs: 0,
			sm: 600,
			md: 960,
			lg: 1280,
			xl: 1920,
		},
	},
});

export default theme;
