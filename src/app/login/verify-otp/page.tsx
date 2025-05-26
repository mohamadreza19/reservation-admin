"use client";
import { Button, TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import { FunctionComponent, useState, forwardRef } from "react";
import OtpInput from "react-otp-input";

const MuiOtpInput = forwardRef<HTMLInputElement, any>((props, ref) => {
  return <TextField {...props} inputRef={ref} />;
});

interface PageProps {}

const Page: FunctionComponent<PageProps> = () => {
  const [otp, setOtp] = useState("");
  const router = useRouter();
  return (
    <>
      <OtpInput
        value={otp}
        onChange={setOtp}
        numInputs={6}
        containerStyle={{
          gap: "16px",
          direction: "ltr",
        }}
        inputStyle={{
          width: "100%",
        }}
        renderInput={(props) => <MuiOtpInput {...props} />}
      />
      <Button variant="text">ارسال مجدد</Button>
      <Button onClick={() => router.push("/")} variant="contained" fullWidth>
        ورود
      </Button>
    </>
  );
};

export default Page;
