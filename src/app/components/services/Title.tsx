import { Typography } from "@mui/material";
import { FunctionComponent } from "react";

export interface TitleProps {
  label: string;
}

const Title: FunctionComponent<TitleProps> = ({ label }) => {
  return (
    <Typography variant="caption" fontWeight={400}>
      {label}
    </Typography>
  );
};

export default Title;
