import { Button, Typography } from "@mui/material";
import React, { ForwardedRef } from "react";
import { mergeClasses } from "@/libs/utils/mergeClasses";

export interface DateProps {
  label?: string;
  MouthDay: string;
  onClick: () => void;
  isSelected: boolean;
}

const Date = React.forwardRef<HTMLDivElement, DateProps>(
  (
    { label, MouthDay, onClick, isSelected },
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    return (
      <div
        ref={ref}
        className={mergeClasses(
          "flex flex-col items-center gap-1.5 cursor-pointer"
        )}
      >
        <Typography variant="caption">{label}</Typography>
        <Button
          color={isSelected ? "primary" : "info"}
          variant={isSelected ? "contained" : "text"}
          onClick={onClick}
        >
          <Typography>{MouthDay}</Typography>
        </Button>
      </div>
    );
  }
);

Date.displayName = "Date"; // Helps with debugging in React DevTools

export default Date;
