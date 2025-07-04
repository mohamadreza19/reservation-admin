import { useAppointmentsGetAll } from "@/libs/api/generated/appointment/appointment";
import { Appointment as AppointmentModel } from "@/libs/api/generated/models";
import { mapIsoToJalali } from "@/libs/utils/data-transformer";
import { toPersianDigits } from "@/libs/utils/toPersianDigits";
import { Divider, Typography } from "@mui/material";
import React, { FunctionComponent, useMemo } from "react";
import { IOrderByDate } from "../model";

export interface AppointmentsProps {
  prop?: string;
  date: string | undefined;
}

export function Appointments({ date }: AppointmentsProps) {
  const params = useMemo(() => {
    return date ? { date } : undefined;
  }, [date]);

  const appointment = useAppointmentsGetAll(params);

  const appointmentsByDate = useMemo(() => {
    let orderedByDates: IOrderByDate = {};
    if (appointment.data) {
      for (const appo of appointment.data) {
        const date = appo.timeslot.date;

        if (!Array.isArray(orderedByDates[date])) {
          orderedByDates[date] = [];
        }
        orderedByDates[date].push(appo);
      }
    }
    return orderedByDates;
  }, [appointment.data?.length]);

  return (
    <div className="pt-11 flex w-full flex-col gap-3 justify-center items-center">
      <SortByDate data={appointmentsByDate} />
    </div>
  );
}

interface SortByDateProps {
  data: IOrderByDate;
}
const SortByDate: FunctionComponent<SortByDateProps> = ({ data }) => {
  return (
    <div className="w-full">
      {Object.keys(data).map((key) => {
        return (
          <div className="w-full ">
            <Divider textAlign="right">
              <Typography className="!text-[16px] !font-bold">
                {toPersianDigits(mapIsoToJalali(key), false)}
              </Typography>
            </Divider>
            <div className="flex py-4  flex-col gap-3">
              {data[key].map((appointment, index) => (
                <Appointment {...appointment} key={index} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};
interface AppointmentProps extends AppointmentModel {}
const Appointment: FunctionComponent<AppointmentProps> = ({
  service,
  timeslot,
  customer,
  // business,
}) => {
  return (
    <section className="p-3 rounded-2xl border border-outline-variant w-full flex justify-between">
      <div className="flex flex-col items-center justify-between">
        <Typography>{customer.userInfo.userName}</Typography>
      </div>
      <div className="flex flex-col gap-2">
        <div>
          <Typography variant="caption" fontWeight={700}>
            {service.name}
          </Typography>
        </div>
        <div className="flex items-center gap-2">
          <Typography variant="caption">
            {toPersianDigits(timeslot.endTime, false)}
          </Typography>
          -
          <Typography variant="caption">
            {toPersianDigits(timeslot.startTime, false)}
          </Typography>
        </div>
      </div>
    </section>
  );
};

export default Appointment;
