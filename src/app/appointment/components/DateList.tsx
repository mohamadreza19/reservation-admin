import { FunctionComponent, useEffect, useRef } from "react";
import { IDateSlot } from "./model";
import Date from "./Date";
import { toPersianDigits } from "@/libs/utils/toPersianDigits";
import { PersianWeekdays } from "@/libs/constants/persian-weekdays.constants";

interface DateListProps {
  dateSlots: IDateSlot[];
  selectedSlot: IDateSlot | null;
  setSelectedSlot: (slot: IDateSlot) => void;
}

const DateList: FunctionComponent<DateListProps> = ({
  dateSlots,
  selectedSlot,
  setSelectedSlot,
}) => {
  const dayRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    if (selectedSlot) {
      const ref = dayRefs.current[selectedSlot.formatted];
      if (ref) {
        ref.scrollIntoView({
          behavior: "smooth",
          inline: "center",
          block: "nearest",
        });
      }
    }
  }, [selectedSlot]);
  return (
    <div className="w-full flex items-center mx-auto justify-between  max-w-3xl overflow-auto  gap-4">
      {dateSlots.map((dSlot, index) => {
        return (
          <Date
            key={index}
            ref={(el) => {
              dayRefs.current[dSlot.formatted] = el;
            }}
            label={PersianWeekdays[dSlot.dayNumber + 1]}
            MouthDay={toPersianDigits(dSlot.mouthDay.toString())}
            onClick={() => setSelectedSlot(dSlot)}
            isSelected={dSlot.formatted === selectedSlot?.formatted}
          />
        );
      })}
    </div>
  );
};

export default DateList;
