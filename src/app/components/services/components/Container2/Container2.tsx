import { FunctionComponent, ReactNode } from "react";
import Title, { Title2Props } from "./Title2";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { Button, Divider, Typography } from "@mui/material";

interface Container2Props extends Title2Props {
  children?: ReactNode;
  helperText?: string;
}

const Container2: FunctionComponent<Container2Props> = ({
  label,
  children,
  helperText,
}) => {
  return (
    <div className="flex flex-col gap-3 ">
      <Title label={label} />
      <div className="flex flex-col relative min-h-[120px]  border border-outline-variant rounded-2xl  gap-3 p-3 overflow-hidden">
        <Typography variant="caption" className="text-outline">
          {helperText}
        </Typography>
        <div className="">{children}</div>
      </div>
    </div>
  );
};

export default Container2;
