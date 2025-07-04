"use client";
import AppBar from "@/libs/shared-components/layouts/AppBar";
import DefaultLayout from "@/libs/shared-components/layouts/DeafultLayout";
import PageLayout from "@/libs/shared-components/layouts/PageLayout";
import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import { FunctionComponent } from "react";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AccessTimeTwoToneIcon from "@mui/icons-material/AccessTimeTwoTone";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
interface CheckoutProps {}

const Checkout: FunctionComponent<CheckoutProps> = () => {
  return (
    <>
      <AppBar label="پرداخت" />
      <PageLayout>
        <Stack
          flexDirection="column"
          alignItems="center"
          display="flex"
          py="60px"
          justifyContent="center"
          gap="8px"
        >
          <div className="bg-tertiary-container p-8 rounded-full">
            <AccessAlarmIcon className="size-6" />
          </div>
          <Typography variant="body1">تایید نهایی</Typography>
        </Stack>
        <Stack spacing={"12px"}>
          <CheckoutItem start="نام سرویس دهنده" end="منا محمدی" />
          <CheckoutItem start="خدمات" end="کاشت ناخون " />
          <CheckoutItem start="روز نوبت" end="دوشنبه، ۲ دی " />
          <CheckoutItem start="ساعت نوبت" end="۰۹:۳۰ صبح" />
        </Stack>
        <Divider className="!my-3" />
        <CheckoutItem start="مبلغ کل" end="۲۹۰,۰۰۰" />
        <Button onClick={() => {}} variant="contained" className="!mt-auto">
          بعدی
        </Button>
      </PageLayout>
    </>
  );
};

export default Checkout;

interface CheckoutItemProps {
  start?: string;
  end?: string;
}

const CheckoutItem: FunctionComponent<CheckoutItemProps> = ({ start, end }) => {
  return (
    <div className="flex justify-between items-center">
      <Typography variant="body2">{start}</Typography>
      <Typography variant="body2" fontWeight="700">
        {end}
      </Typography>
    </div>
  );
};
