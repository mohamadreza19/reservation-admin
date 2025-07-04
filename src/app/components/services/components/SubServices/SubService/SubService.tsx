import { Button, TextField } from "@mui/material";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";

export interface SubServiceProps {
  prop?: string;
}

export function SubService({ prop = "default value" }: SubServiceProps) {
  return (
    <section className="flex gap-3 flex-col  border-b border-solid border-outline p-3">
      <TextField
        label="عنوان"
        fullWidth
        size="small"
        // value={price}
        // onChange={(e) => setPrice(e.target.value)}
      />
      <TextField
        label="هزینه"
        fullWidth
        size="small"
        // value={price}
        // onChange={(e) => setPrice(e.target.value)}
      />
      <Button>
        <DeleteIcon className="!text-[16px] self-end !w-fit" color="error" />
      </Button>
    </section>
  );
}
