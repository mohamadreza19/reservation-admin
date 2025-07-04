import { FunctionComponent } from "react";
import Container2 from "../services/components/Container2/Container2";
import { Button, Typography } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import {
  getTimeslotsStatusQueryKey,
  useTimeslotsCreate,
  useTimeslotsStatus,
} from "@/libs/api/generated/timeslots/timeslots";
import { toPersianDigits } from "@/libs/utils/toPersianDigits";
import { useQueryClient } from "@tanstack/react-query";

interface TimeslotsProps {}

const Timeslots: FunctionComponent<TimeslotsProps> = () => {
  const mutation = useTimeslotsCreate({
    mutation: {
      onSuccess() {
        queryClient.invalidateQueries(getTimeslotsStatusQueryKey() as any);
      },
    },
  });
  const timeslotsStatus = useTimeslotsStatus({});
  const queryClient = useQueryClient();

  const createTimeSlot = () => {
    mutation.mutate();
  };
  return (
    <Container2 label="تولید زمان" helperText="هر ۱۲ روز">
      <div className="flex justify-between items-center h-full">
        {timeslotsStatus.data && (
          <Button
            disabled={timeslotsStatus.data.gapFromNow >= 3}
            onClick={createTimeSlot}
            size="small"
            startIcon={<AccessTimeIcon />}
            loading={mutation.isPending}
          >
            تولید
          </Button>
        )}

        {timeslotsStatus.data && (
          <Typography
            className="!text-tertiary"
            fontWeight={700}
            variant="body2"
          >
            {toPersianDigits(timeslotsStatus.data?.gapFromNow)} روز تا تولید
            بعدی
          </Typography>
        )}
      </div>
    </Container2>
  );
};

export default Timeslots;
