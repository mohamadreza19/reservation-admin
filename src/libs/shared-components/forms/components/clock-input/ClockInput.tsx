import {
  Box,
  Button,
  Dialog,
  DialogActions,
  TextField,
  TextFieldProps,
} from "@mui/material";
import {
  LocalizationProvider,
  PickersActionBarProps,
  renderTimeViewClock,
  TimeClock,
  TimePicker,
  TimeView,
  usePickerActionsContext,
} from "@mui/x-date-pickers-pro";
import { AdapterMoment } from "@mui/x-date-pickers-pro/AdapterMoment";
import React, { FunctionComponent, useEffect, useState } from "react";
import moment, { Moment } from "moment";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import "./ClockInput.css";
type ClockInputProps = {
  onChange: (newValue: Moment | null) => void;
  value: Moment | null;
};

const ClockInput: FunctionComponent<ClockInputProps> = ({
  value,
  onChange,
  ...props
}) => {
  // const [selectedTime, setSelectedTime] = useState<Moment | null>(
  //   value ? moment(value, "HH:mm") : null
  // );

  const handleTimeChange = (newValue: Moment | null) => {
    onChange(newValue || null);
  };
  // useEffect(() => {
  //   if (value) {
  //     setSelectedTime(moment(value, "HH:mm"));
  //   }
  // }, [value]);

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <DemoContainer components={["TimePicker"]}>
          <TimePicker
            value={value}
            onChange={handleTimeChange}
            slots={{
              actionBar: CustomActionBar,
            }}
            viewRenderers={{
              hours: renderTimeViewClock,
              minutes: renderTimeViewClock,
              // seconds: renderTimeViewClock,
            }}
            ampm={false}
            slotProps={{
              actionBar: {
                actions: ["accept"],
                content: "بستن",
              },
              textField: {
                size: "small",
                sx: {
                  width: "fit-content !important", // 👈 Add this line
                  minWidth: "fit-content !important", // Optional: prevent default min width
                },
              },
            }}
          />
        </DemoContainer>
      </LocalizationProvider>
    </>
  );
};

export default ClockInput;

function CustomActionBar(props: PickersActionBarProps) {
  const { actions, className } = props;

  const {
    clearValue,
    setValueToToday,
    acceptValueChanges,
    cancelValueChanges,
  } = usePickerActionsContext();
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const open = Boolean(anchorEl);

  if (actions == null || actions.length === 0) {
    return null;
  }

  const menuItems = actions?.map((actionType) => {
    switch (actionType) {
      case "accept":
        return (
          <Button
            onClick={() => {
              setAnchorEl(null);
              acceptValueChanges();
            }}
            key={actionType}
          >
            بستن
          </Button>
        );

      default:
        return null;
    }
  });

  return <DialogActions className={className}>{menuItems}</DialogActions>;
}
