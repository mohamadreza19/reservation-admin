export interface OnSelectDate {
  onSelectDate?: (iso: string | undefined) => void;
}

export interface IOrderByDate {
  [key: string]: AppointmentModel[];
}

export interface GenerateDateSlotProps {
  year: number;
  monthIndex: number;
}
export interface IDateSlot {
  date: Moment;
  formatted: string;
  dayNumber: number;
  mouthDay: number;
}
