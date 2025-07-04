"use client";

import { Box, ThemeProvider } from "@mui/material";
import { FunctionComponent, ReactNode, useEffect } from "react";
import lightTheme from "./lightTheme";
import { Rtl } from "./rtlCache";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ACCESS_TOKEN_KEY } from "../constants/keys.constants";
import { useRouter, useSearchParams } from "next/navigation";
import DefaultLayout from "../shared-components/layouts/DeafultLayout";

interface ClientProviderProps {
  children: ReactNode;
}

const queryClient = new QueryClient();
const ClientProvider: FunctionComponent<ClientProviderProps> = ({
  children,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!localStorage.getItem(ACCESS_TOKEN_KEY)) {
      router.push(`/login/send-otp`);
    }
  }, []);
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Rtl>
          <ThemeProvider theme={lightTheme}>{children}</ThemeProvider>
        </Rtl>
      </QueryClientProvider>
    </>
  );
};

export default ClientProvider;
