import { ServiceDto } from "@/libs/api/generated/models";
import {
  Button,
  Dialog,
  DialogActions,
  DialogProps,
  Typography,
} from "@mui/material";
import React, { ReactNode } from "react";
import { ServiceAvatar } from "../ServiceAvatar";

export interface SubServicesDialogProps extends DialogProps {
  children?: ReactNode;

  SelectedSysAvatar?: ReactNode;
  onSubmit?: () => void;
}

export function SubServicesDialog({
  children,
  SelectedSysAvatar,
  onSubmit,
  ...props
}: SubServicesDialogProps) {
  return (
    <Dialog {...props}>
      <div className=" flex flex-col gap-3">
        {SelectedSysAvatar}

        <div className="flex flex-col gap-3 justify-center">
          <div>
            <Typography variant="body2">زیر مجموعه ها </Typography>
          </div>

          <>{children}</>
        </div>
      </div>
      <DialogActions>
        <Button onClick={onSubmit}>ذخیره</Button>
      </DialogActions>
    </Dialog>
  );
}
