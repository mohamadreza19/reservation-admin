import React from "react";
import { SubService } from "./SubService/SubService";
import { CreateServiceDto, ServiceDto } from "@/libs/api/generated/models";
import {
  useFieldArray,
  UseFieldArrayReturn,
  useForm,
  UseFormRegister,
} from "react-hook-form";
import { Button, TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export interface SubServicesProps extends UseFieldArrayReturn<any> {
  register: UseFormRegister<FormValues>;
}

export interface FormValues {
  services: CreateServiceDto[];
}
export function SubServices({
  append,
  remove,
  fields,
  register,
}: SubServicesProps) {
  return (
    <div className="flex flex-col gap-3 justify-center">
      {fields.map((field, index) => (
        <section
          key={field.id}
          className="flex gap-3 flex-col  border-b border-solid border-outline p-3"
        >
          <TextField
            {...register(`services.${index}.name`)}
            label="عنوان"
            fullWidth
            size="small"
          />
          <TextField
            {...register(`services.${index}.price.amount`)}
            label="هزینه"
            fullWidth
            size="small"
          />
          <Button onClick={() => remove(index)}>
            <DeleteIcon
              className="!text-[16px] self-end !w-fit"
              color="error"
            />
          </Button>
        </section>
      ))}
      <div className="w-full">
        <Button size="small" onClick={() => append({})}>
          افزودن
        </Button>
      </div>
    </div>
  );
}
