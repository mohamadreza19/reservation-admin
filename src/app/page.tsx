"use client";
import SplashScreen from "@/libs/shared-components/splash-screen/SplashScreen";
import lightTheme from "@/libs/theme/lightTheme";
import { Box, Button, createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme();

export default function Home() {
  return <ThemeProvider theme={lightTheme}></ThemeProvider>;
}
