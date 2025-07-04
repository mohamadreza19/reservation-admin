"use client";
import { PersianWeekdays } from "@/libs/constants/persian-weekdays.constants";
import { toPersianDigits } from "@/libs/utils/toPersianDigits";
import moment, { Moment } from "moment-jalaali";
moment.loadPersian();
// DatePicker.jsx

import React, { FC, useEffect, useMemo, useRef, useState } from "react";
import { Button, Typography } from "@mui/material";
import { mergeClasses } from "@/libs/utils/mergeClasses";
import TuneIcon from "@mui/icons-material/Tune";
import CloseIcon from "@mui/icons-material/Close";
import { BaseProps } from "./date-picker-container/DatePickerContainer";
import { GenerateDateSlotProps, IDateSlot, OnSelectDate } from "./model";
import Date from "./Date";
import DateList from "./DateList";

interface DatePickerProps extends BaseProps, OnSelectDate {}

const currentDate = moment();
interface MonthSlot {
  formatted: string;
  monthIndex: number;
}

const DatePicker: FC<DatePickerProps> = ({ onSelectDate, handleClickIcon }) => {
  const [selectedYear, setSelectedYear] = useState(currentDate.jYear());
  const [selectedMonth, setSelectedMonth] = useState<MonthSlot>({
    formatted: currentDate.format("jMMMM"),
    monthIndex: currentDate.jMonth(),
  });

  const [selectedDay, setSelectedDay] = useState<IDateSlot>(
    toDateSlot(currentDate)
  );
  const dateSlots = useGenerateDateSlot({
    monthIndex: selectedMonth.monthIndex,
    year: selectedYear,
  });

  useMemo(() => {
    if (onSelectDate) onSelectDate(selectedDay.formatted);
  }, [selectedDay.formatted]);

  return (
    <div className=" ">
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <div className="text-lg font-semibold">{selectedMonth.formatted}</div>
        <div className="flex items-center gap-2">
          <button className="cursor-pointer" onClick={handleClickIcon}>
            <CloseIcon className="!size-[18px] !p-0" />
          </button>
          {/* <span className="material-icons">tune</span> */}
        </div>
      </div>
      <DateList
        dateSlots={dateSlots}
        selectedSlot={selectedDay}
        setSelectedSlot={setSelectedDay}
      />
    </div>
  );
};

export default DatePicker;

const useGenerateDateSlot = (props: GenerateDateSlotProps) => {
  return generateDate(props);
};

function generateDate({
  year,
  monthIndex,
}: GenerateDateSlotProps): IDateSlot[] {
  const generatedDaysNumber = generateMonthDays(year, monthIndex);

  return generatedDaysNumber.map((gdn) =>
    toDateSlot(createJalaliDate(year, monthIndex, gdn))
  );
}

export function toDateSlot(moment: Moment): IDateSlot {
  const baseDate = moment;
  const dayNumber = baseDate.weekday();
  const formatted = toIso(baseDate);
  const mouthDay = baseDate.jDate();

  return {
    date: baseDate,
    formatted,
    dayNumber: dayNumber,
    mouthDay: mouthDay,
  };
}

function toIso(moment: Moment) {
  return moment.format("YYYY-MM-DD");
}
function toNegative(num: number) {
  return num * -1;
}
function generateJalaliMonths(year: number) {
  return Array.from({ length: 12 }).map((_, monthIndex) => {
    const date = moment().jYear(year).jMonth(monthIndex).jDate(1);
    return {
      name: date.format("jMMMM"), // e.g. "خرداد"
      index: monthIndex, // needed for later
      year,
    };
  });
}
function generateMonthDays(year: number, monthIndex: number): number[] {
  const startOfMonth = moment()
    .jYear(year)
    .jMonth(monthIndex)
    .startOf("jMonth");
  const startOfNextMonth = startOfMonth.clone().add(1, "jMonth");

  const daysInMonth = startOfNextMonth.diff(startOfMonth, "days");

  return Array.from({ length: daysInMonth }, (_, i) => i + 1);
}
function createJalaliDate(
  year: number,
  monthIndex: number,
  day: number
): Moment {
  return moment().jYear(year).jMonth(monthIndex).jDate(day).startOf("day");
}
