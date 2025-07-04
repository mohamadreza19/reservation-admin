"use client";
import { useGetPublicProfile } from "@/libs/api/generated/business/business";
import SplashScreen from "@/libs/shared-components/splash-screen/SplashScreen";
import ErrorTwoToneIcon from "@mui/icons-material/ErrorTwoTone";
import {
  Box,
  CircularProgress,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import { useSearchParams } from "next/navigation";
import { FunctionComponent, ReactNode, useMemo } from "react";
import { ReactSVG } from "react-svg";
import { useBusinessIdStore } from "./store";
import DefaultLayout from "@/libs/shared-components/layouts/DeafultLayout";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FunctionComponent<LayoutProps> = ({ children }) => {
  const searchParams = useSearchParams();

  return (
    <DefaultLayout AppBar={<></>}>
      <div className="flex flex-col gap-8 items-center justify-center h-screen">
        <ReactSVG
          className="hover:cursor-pointer"
          src="/icons/main-icon-wth-label.svg"
        />

        {children}
      </div>
    </DefaultLayout>
  );
};

export default Layout;
