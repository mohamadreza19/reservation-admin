import { FunctionComponent, useState } from "react";
import DatePicker from "../DatePicker";
import TuneIcon from "@mui/icons-material/Tune";
import { OnSelectDate } from "../model";

interface DatePickerContainerProps extends OnSelectDate {}

const DatePickerContainer: FunctionComponent<DatePickerContainerProps> = ({
  onSelectDate,
}) => {
  const [showFilter, setShowFilter] = useState(false);

  const handleShowFilter = () => setShowFilter(true);
  const handleHideFilter = () => setShowFilter(false);

  const handleClearFilter = () => {
    handleHideFilter();
    onSelectDate?.(undefined);
  };
  return (
    <div className="rounded-2xl border border-outline-variant p-4  w-full min-h-32">
      {showFilter ? (
        <DatePicker
          handleClickIcon={handleClearFilter}
          onSelectDate={onSelectDate}
        />
      ) : (
        <Base handleClickIcon={handleShowFilter} />
      )}
    </div>
  );
};

export interface BaseProps {
  handleClickIcon?: () => void;
}

const Base: FunctionComponent<BaseProps> = ({ handleClickIcon }) => {
  return (
    <div className="flex justify-between items-center">
      <div className="text-lg font-semibold">اخرین ها</div>
      <button onClick={handleClickIcon} className="cursor-pointer">
        <TuneIcon className="!size-[18px] !p-0" />
      </button>
    </div>
  );
};

export default DatePickerContainer;
