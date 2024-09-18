import { createTheme } from "@mui/material/styles";

const theme = createTheme({
	palette: {
		primary: {
			main: "#3f51b5", // Violet Blue, Colore principale
			light: "#757de8", // Tropical Indigo, Versione più chiara del colore principale
			dark: "#002984", // Resolution Blue, Versione più scura del colore principale
			contrastText: "#fff", // Bianco, Colore del testo su sfondo primario
		},
		secondary: {
			main: "#FE9900", // Orange Peel, Colore secondario
			light: "#ffb84d", // H Yellow, Versione più chiara del colore secondario
			dark: "#cc7a00", // Ochre, Versione più scura del colore secondario
			contrastText: "#000", // Nero, Colore del testo su sfondo secondario
		},
		background: {
			default: "#f5f5f5", // White Smoke, Colore di sfondo principale
			paper: "#daa466", // Earth Yellow, Colore di sfondo per i componenti di tipo "paper" (es. Card)
		},
		error: {
			main: "#f44336", // Vermilion, Colore per gli errori
		},
		warning: {
			main: "#ffa726", // Orange, Colore per i warning
		},
		info: {
			main: "#29b6f6", // Piction Blue, Colore per le informazioni
		},
		success: {
			main: "#66bb6a", // Mantis, Colore per i messaggi di successo
		},
		text: {
			primary: "#333", // Jet, Colore del testo principale
			secondary: "#888", // Gray, Colore del testo secondario
			disabled: "#bbb", // Silver, Colore del testo disabilitato
		},
	},
});

export default theme;
