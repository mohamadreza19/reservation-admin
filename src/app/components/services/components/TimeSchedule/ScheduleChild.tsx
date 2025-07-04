import { CreateScheduleDto } from "@/libs/api/generated/models";
import {
  getSchedulesFindAllQueryKey,
  useSchedulesUpdate,
} from "@/libs/api/generated/schedules/schedules";
import ClockInput from "@/libs/shared-components/forms/components/clock-input/ClockInput";
import { Checkbox, FormControlLabel, Switch, Typography } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import _ from "lodash";
import moment, { Moment } from "moment";
import { FunctionComponent, useState, ChangeEvent, useCallback } from "react";

import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";
import { PersianWeekdays } from "@/libs/constants/persian-weekdays.constants";

interface ScheduleChildProps extends CreateScheduleDto {
  id?: string;
}

const ScheduleChild: FunctionComponent<ScheduleChildProps> = ({
  day,
  startTime,
  endTime,
  isOpen,
  id,
}) => {
  const queryClient = useQueryClient();

  const [_isOpen, setIsOpen] = useState(isOpen);
  const [_startTime, setStartTime] = useState(
    startTime ? moment(startTime, "HH:mm") : null
  );
  const [_endTime, setEndTime] = useState(
    endTime ? moment(endTime, "HH:mm") : null
  );

  const updateSchedule = useSchedulesUpdate({
    mutation: {
      onSuccess(data, variables, context) {
        // queryClient.invalidateQueries(getSchedulesFindAllQueryKey() as any);
      },
    },
  });
  // Debounced update function for time inputs
  const debouncedUpdate = useCallback(
    _.debounce((payload: Partial<CreateScheduleDto>) => {
      if (id)
        updateSchedule.mutate({
          id: id,
          data: payload,
        });
    }, 4000),
    [updateSchedule]
  );

  // Handle checkbox toggle
  const handleIsOpenChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIsOpen(event.target.checked);
    debouncedUpdate({ isOpen: event.target.checked });
  };

  // Handle start time change
  const handleStartTimeChange = (newValue: Moment | null) => {
    setStartTime(newValue);
    debouncedUpdate({ startTime: newValue?.format("HH:mm") });
  };

  // Handle end time change
  const handleEndTimeChange = (newValue: Moment | null) => {
    setEndTime(newValue);
    debouncedUpdate({ endTime: newValue?.format("HH:mm") });
  };

  return (
    <div className="flex w-full justify-between items-center p-3">
      <div>
        <FormControlLabel
          control={
            <Switch
              title="as"
              checked={_isOpen}
              onChange={handleIsOpenChange}
            />
          }
          label={PersianWeekdays[day]}
        />
      </div>

      <div className="flex ms-auto gap-3 items-center justify-between">
        <section className="flex items-center gap-2">
          <Typography variant="body2">از</Typography>
          <ClockInput value={_startTime} onChange={handleStartTimeChange} />
        </section>
        <section className="flex items-center gap-2">
          <Typography variant="body2">تا</Typography>
          <ClockInput value={_endTime} onChange={handleEndTimeChange} />
        </section>
      </div>
    </div>
  );
};

export default ScheduleChild;
