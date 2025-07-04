"use client";
import React, { FunctionComponent } from "react";

import Example from "./example.svg";
import { Avatar, Button, Typography } from "@mui/material";
import { ServiceDto } from "@/libs/api/generated/models";
import { useFilesGet } from "@/libs/api/generated/file/file";

export interface ServiceProps {
  service: ServiceDto;
  onClick: () => void;
}

const Service: FunctionComponent<ServiceProps> = ({ service, onClick }) => {
  const file = useFilesGet("service", service.id, {
    query: {
      enabled: !!service.id,
      select(data) {
        return URL.createObjectURL(data);
      },
    },
  });
  // console.log("blob:" + file.data);
  return (
    <Button
      onClick={onClick}
      className="flex flex-col items-center gap-3 !text-on-background"
    >
      <section className="rounded-full border border-outline-variant bg-inverse-on-surface p-3">
        {/* <img className="size-6 " src={file.data} /> */}
        <Avatar src={file.data} />
      </section>
      <Typography variant="caption">{service.name}</Typography>
    </Button>
  );
};

export default Service;
