import { Typography } from "@mui/material";
import { FunctionComponent } from "react";

export interface Title2Props {
  label: string;
}

const Title2: FunctionComponent<Title2Props> = ({ label }) => {
  return (
    <Typography variant="caption" fontWeight={400}>
      {label}
    </Typography>
  );
};

export default Title2;
