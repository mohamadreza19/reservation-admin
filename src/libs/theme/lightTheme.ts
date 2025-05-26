// theme.ts
import { createTheme } from "@mui/material/styles";

const lightTheme = createTheme({
  direction: "rtl",
  typography: {
    fontFamily: `'IRANSansWeb', sans-serif`,
  },
  palette: {
    mode: "light",
    text: {},

    primary: {
      main: "rgb(0 105 112)",
      contrastText: "rgb(255 255 255)",
      light: "rgb(157 240 248)",
      dark: "rgb(0 32 34)",
    },
    secondary: {
      main: "rgb(123 88 13)",
      contrastText: "rgb(255 255 255)",
      light: "rgb(255 222 169)",
      dark: "rgb(39 25 0)",
    },
    info: {
      main: "#4F5E7D",
      contrastText: "#FFFFFF",
    },
    error: {
      main: "#BA1A1A",
      contrastText: "#FFFFFF",
    },
    background: {
      default: "rgb(244 250 251)",

      paper: "#F4FAFB",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 24, // More rounded buttons only
        },
      },
    },
  },
});

export default lightTheme;
