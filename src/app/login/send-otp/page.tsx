"use client";
import { useSendOTP } from "@/libs/api/generated/auth/auth";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { FunctionComponent, useEffect, useMemo } from "react";
import { useForm, useWatch } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useBusinessIdStore, useSendOtpStore } from "../store";
import lightTheme from "@/libs/theme/lightTheme";
import PageLayout from "@/libs/shared-components/layouts/PageLayout";

interface PageProps {}

// Yup schema for validating Persian phone numbers (local format starting with 9)
const phoneRegExp = /^9\d{9}$/;
const schema = yup.object().shape({
  phoneNumber: yup
    .string()
    .required("شماره موبایل الزامی است")
    .matches(phoneRegExp, "شماره موبایل باید با 9 شروع شده و 10 رقم باشد"),
  // .transform((value) => {
  //   if (value && phoneRegExp.test(value)) {
  //     return `+98${value}`;
  //   }
  //   return value;
  // }),
});

interface FormData {
  phoneNumber: string;
}

const Page: FunctionComponent<PageProps> = () => {
  const router = useRouter();
  const { mutateAsync, isPending } = useSendOTP();
  const store = useSendOtpStore();

  // Initialize react-hook-form with yup resolver
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      phoneNumber: "",
    },
    resolver: yupResolver(schema),
  });
  useEffect(() => {
    if (store.phoneNumber) {
      setValue("phoneNumber", store.phoneNumber);
    }
  }, [store.phoneNumber, setValue]);
  // Handle form submission
  const onSubmit = async (data: FormData) => {
    try {
      await mutateAsync({
        data: {
          phoneNumber: "+98" + data.phoneNumber, // Already transformed to +98 format by yup
        },
      });
      router.push("verify-otp");
      store.setPhoneNumber(data.phoneNumber);
    } catch (error) {
      console.error("Error sending OTP:", error);
      alert("خطا در ارسال کد");
    }
  };

  return (
    <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        <TextField
          label="شماره موبایل"
          fullWidth
          type="tel"
          placeholder="مثال: 9032446913"
          error={!!errors.phoneNumber}
          helperText={
            errors.phoneNumber?.message ||
            "شماره موبایل را بدون +98 یا 0 وارد کنید"
          }
          {...register("phoneNumber")}
          inputProps={{
            style: {
              direction: "ltr",
            },
          }}
        />

        <Button loading={isPending} type="submit" variant="contained" fullWidth>
          ارسال کد
        </Button>
      </Stack>
    </form>
  );
};

export default Page;
