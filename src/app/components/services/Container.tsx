import { FunctionComponent, ReactNode } from "react";
import Title, { TitleProps } from "./Title";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { Button, Divider, Typography } from "@mui/material";

interface ContainerProps extends TitleProps {
  children?: ReactNode;
  onAddClick?: () => void;
}

const Container: FunctionComponent<ContainerProps> = ({
  label,
  children,
  onAddClick,
}) => {
  return (
    <div className="flex flex-col gap-3 ">
      <Title label={label} />
      <div className="flex relative h-[120px]  border border-outline-variant rounded-2xl  gap-3 ps-3 overflow-hidden">
        <div className="flex items-center gap-3">
          <Button variant="text" onClick={onAddClick}>
            {" "}
            <AddIcon className="!text-[12px]" />
            <Typography variant="caption">افزودن</Typography>
          </Button>

          {children}
        </div>
        <div className="border-s items-center flex justify-center w-[48px] start-full border-outline-variant ms-auto !h-full">
          <ArrowBackIosNewIcon />
        </div>
      </div>
    </div>
  );
};

export default Container;
