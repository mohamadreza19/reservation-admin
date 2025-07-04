"use client";
import { useVerifyOTP } from "@/libs/api/generated/auth/auth";
import { Button, TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import { FunctionComponent, useState, forwardRef, useMemo } from "react";
import OtpInput from "react-otp-input";
import { useBusinessIdStore, useSendOtpStore } from "../store";
import _ from "lodash";
import { useBusinessCreate } from "@/libs/api/generated/business/business";

const MuiOtpInput = forwardRef<HTMLInputElement, any>((props, ref) => {
  return (
    <TextField
      inputProps={{
        style: {
          textAlign: "center",
        },
      }}
      {...props}
      inputRef={ref}
    />
  );
});

interface PageProps {}

const Page: FunctionComponent<PageProps> = () => {
  const [otp, setOtp] = useState("");
  const router = useRouter();

  const businessMutation = useBusinessCreate();
  const mutate = useVerifyOTP({
    mutation: {
      onSuccess(data, variables, context) {
        localStorage.setItem("access_token", _.get(data, ["access_token"], ""));

        if (data.role !== "business_admin") {
          // alter business to user
          businessMutation.mutateAsync().then(() => router.push("/"));
        } else router.push("/");
      },
    },
  });
  const store = useSendOtpStore();
  const onSubmit = async () => {
    try {
      await mutate.mutateAsync({
        data: {
          phoneNumber: "+98" + store.phoneNumber,
          otp: otp,
        },
      });
    } catch (error) {
      console.error("Error sending OTP:", error);
      alert("خطا در ارسال کد");
    }
  };

  useMemo(() => {
    if (mutate.data) {
      store.clearPhoneNumber();
    }
  }, [mutate.data]);
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
      <Button
        loading={mutate.isPending}
        onClick={onSubmit}
        variant="contained"
        fullWidth
      >
        ورود
      </Button>
    </>
  );
};

export default Page;
