import React from "react";
import Container2 from "../Container2/Container2";
import Checkbox from "@mui/material/Checkbox";
import { Button, TextField, Typography } from "@mui/material";
import ClockInput from "@/libs/shared-components/forms/components/clock-input/ClockInput";
import {
  getSchedulesFindAllQueryKey,
  useSchedulesFindAll,
  useSchedulesInitiate,
} from "@/libs/api/generated/schedules/schedules";
import ScheduleChild from "./ScheduleChild";
import AddIcon from "@mui/icons-material/Add";
import { useQueryClient } from "@tanstack/react-query";

export interface TimeScheduleProps {
  prop?: string;
}

export function TimeSchedule({ prop = "default value" }: TimeScheduleProps) {
  const { data, isSuccess } = useSchedulesFindAll();
  const queryClient = useQueryClient();

  const initiateSchedule = useSchedulesInitiate({
    mutation: {
      onSuccess(data, variables, context) {
        queryClient.invalidateQueries(getSchedulesFindAllQueryKey() as any);
      },
    },
  });

  const handleInitiateSchedules = () => {
    initiateSchedule.mutate();
  };

  return (
    <>
      <Container2 label="ساعات کاری" helperText="شامل">
        {isSuccess && !data.length && (
          <div className="flex justify-center items-center">
            <Button
              loading={initiateSchedule.isPending}
              onClick={handleInitiateSchedules}
              className="mx-auto"
              startIcon={<AddIcon />}
            >
              ساخت
            </Button>
          </div>
        )}
        <div className="flex flex-col gap-3">
          {data &&
            data.map((sceduleChild, key) => (
              <ScheduleChild {...sceduleChild} key={key} />
            ))}
        </div>
      </Container2>
    </>
  );
}
