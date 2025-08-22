// theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#0D1B2A", // Dark navy
      contrastText: "#fff",
    },
    secondary: {
      main: "#D4AF37", // Gold
      contrastText: "#fff",
    },
    background: {
      default: "#F5F5F5",
      paper: "#ffffff",
    },
    text: {
      primary: "#0D1B2A",
      secondary: "#555555",
    },
  },
  typography: {
    fontFamily: "Roboto, Helvetica, Arial, sans-serif",
    h6: { fontWeight: 700 },
    button: { textTransform: "none" },
  },
});

export default theme;
