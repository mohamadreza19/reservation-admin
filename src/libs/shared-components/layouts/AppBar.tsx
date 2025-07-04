import { Button, Stack, Typography } from "@mui/material";
import { FunctionComponent, ReactNode } from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
export interface AppBarProps {
  label?: string;
  StartIcon?: ReactNode;
  EndIcon?: ReactNode;
  startCLick?: () => void;
}

const AppBar: FunctionComponent<AppBarProps> = ({
  label,
  StartIcon,
  EndIcon,
  startCLick,
}) => {
  return (
    <Stack
      sx={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <button className="cursor-pointer" onClick={startCLick}>
        {StartIcon}
      </button>
      {/* <ArrowForwardIosIcon /> */}
      <Typography variant="h5">{label}</Typography>
      {EndIcon ? EndIcon : <div className="invisible">qwe</div>}
      {/* <NotificationsOutlinedIcon /> */}
    </Stack>
  );
};

export default AppBar;
