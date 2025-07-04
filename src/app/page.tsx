"use client";

import {
  getBusinessGetProfileQueryKey,
  useBusinessGetMyLink,
  useBusinessGetProfile,
  useBusinessPatch,
} from "@/libs/api/generated/business/business";

import { useServicesFindAll } from "@/libs/api/generated/services/services";

import DefaultLayout from "@/libs/shared-components/layouts/DeafultLayout";
import { Box, Button, Fab, Stack, Typography } from "@mui/material";
import _ from "lodash";

import { useRouter } from "next/navigation";
import Profile from "./components/profile/Profile";
import Statics from "./components/Statics/Statics";
import Services from "./components/services/Services";
import { TimeSchedule } from "./components/services/components";
import { useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";

import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import Timeslots from "./components/timeslots/Timeslots";

export default function Home() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data, isLoading } = useBusinessGetProfile();

  const systemService = useServicesFindAll({
    isSystemService: true,
  });
  const businessId = useMemo(() => {
    if (data) return data.id;
  }, [data]);

  // console.log(businessServices.data);
  const updateBusiness = useBusinessPatch({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: getBusinessGetProfileQueryKey(),
        });
      },
    },
  });

  const handleUpdateName = (name: string) => {
    updateBusiness.mutateAsync({
      data: {
        name,
      },
    });
  };

  const navigateToAppointment = () => {
    router.push("/appointment");
  };

  return (
    <DefaultLayout AppBar={<></>}>
      <Profile
        isLoading={isLoading || updateBusiness.isPending}
        OnBlurEditName={handleUpdateName}
        name={data?.name}
      />
      <Statics />
      <Services businessId={businessId as any} />
      <TimeSchedule />
      <Timeslots />
      <Button
        onClick={navigateToAppointment}
        variant="contained"
        className="!text-[16px] text-nowrap !h-fit !fixed top-4/5"
        startIcon={<CalendarTodayIcon />}
      >
        مدیریت نوبت‌ها
      </Button>
      {/* مدیریت نوبت‌ها */}
    </DefaultLayout>
  );
}
