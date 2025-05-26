"use client";

import { Box, ThemeProvider } from "@mui/material";
import { FunctionComponent, ReactNode } from "react";
import lightTheme from "./lightTheme";
import { Rtl } from "./rtlCache";

interface ClientProviderProps {
  children: ReactNode;
}

const ClientProvider: FunctionComponent<ClientProviderProps> = ({
  children,
}) => {
  return (
    <>
      <Rtl>
        <ThemeProvider theme={lightTheme}>
          <Box
            sx={{
              width: "440px",
              maxWidth: "100%",
              mx: "auto", // center horizontally
            }}
          >
            {children}
          </Box>
        </ThemeProvider>
      </Rtl>
    </>
  );
};

export default ClientProvider;
