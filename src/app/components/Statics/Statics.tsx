import { Divider, Typography } from "@mui/material";
import { FunctionComponent } from "react";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";

interface StaticsProps {}

const Statics: FunctionComponent<StaticsProps> = () => {
  return (
    <div className="flex justify-between p-3">
      <div className="flex flex-col gap-3 items-center">
        <Typography variant="body1" fontWeight="700">
          ۱۶
        </Typography>
        <div className="flex items-center gap-2">
          <Person2OutlinedIcon sx={{ fontSize: "16px" }} />
          <Typography fontWeight="400">تعداد مشتری</Typography>
        </div>
      </div>
      <Divider orientation="vertical" flexItem />
      <div className="flex flex-col gap-3 items-center">
        <Typography variant="body1" fontWeight="700">
          ۱۶
        </Typography>
        <div className="flex items-center gap-2">
          <DoneOutlinedIcon sx={{ fontSize: "16px" }} />
          <Typography fontWeight="400">رزرهای انجام شده</Typography>
        </div>
      </div>
    </div>
  );
};

export default Statics;
