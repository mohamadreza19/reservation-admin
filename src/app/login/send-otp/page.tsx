"use client";
import {
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { FunctionComponent } from "react";

interface PageProps {}
const url = process.env.NEXT_PUBLIC_API_URL;
const Page: FunctionComponent<PageProps> = () => {
  const router = useRouter();
  console.log(url);
  return (
    <>
      <TextField
        label="شماره موبایل"
        fullWidth
        inputProps={{
          style: {
            direction: "ltr",
          },
        }}
      />
      <Button
        onClick={() => router.push("verify-otp")}
        variant="contained"
        fullWidth
      >
        ارسال کد
      </Button>
    </>
  );
};

export default Page;
