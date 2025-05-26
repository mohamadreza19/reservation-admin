"use client";
import { Box, Container, Stack } from "@mui/material";
import { FunctionComponent, ReactNode } from "react";
import { ReactSVG } from "react-svg";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FunctionComponent<LayoutProps> = ({ children }) => {
  return (
    <Container maxWidth="sm">
      <Stack
        sx={{ minHeight: "100vh" }}
        justifyContent="center"
        alignItems="center"
        textAlign="center"
        display="flex"
        gap="16px"
      >
        <Box>
          <ReactSVG
            className="hover:cursor-pointer"
            src="/icons/main-icon-wth-label.svg"
          />
        </Box>
        {children}
      </Stack>
    </Container>
  );
};

export default Layout;
