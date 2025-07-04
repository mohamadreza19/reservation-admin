"use client";
import AppBar from "@/libs/shared-components/layouts/AppBar";
import DefaultLayout from "@/libs/shared-components/layouts/DeafultLayout";
import { FunctionComponent, useState } from "react";
import DatePicker from "./components/DatePicker";
import DatePickerContainer from "./components/date-picker-container/DatePickerContainer";

import moment from "moment-jalaali";
import { Appointments } from "./components";

interface PageProps {}

const Page: FunctionComponent<PageProps> = () => {
  const [date, setDate] = useState<string | undefined>();

  const handleChangeDate = (iso: string | undefined) => {
    setDate(iso);
  };
  return (
    <DefaultLayout
      AppBarProps={{
        label: "مدیریت نوبت ها",
      }}
    >
      <DatePickerContainer onSelectDate={handleChangeDate} />
      <Appointments date={date} />
    </DefaultLayout>
  );
};

export default Page;
