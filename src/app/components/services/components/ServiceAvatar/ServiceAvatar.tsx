import { useFilesGet } from "@/libs/api/generated/file/file";
import { ServiceDto } from "@/libs/api/generated/models";
import { Avatar, Button, Typography } from "@mui/material";
import React from "react";

export interface ServiceAvatarProps {
  prop?: string;
  onClick?: () => void;
  service: ServiceDto | undefined;
}

export function ServiceAvatar({ onClick, service }: ServiceAvatarProps) {
  const file = useFilesGet("service", (service as ServiceDto).id, {
    query: {
      enabled: service && !!service.id,
      select(data) {
        return URL.createObjectURL(data);
      },
    },
  });

  return (
    <div className="flex items-center gap-3">
      <div>
        <Button
          onClick={onClick}
          className="!rounded-full border !border-outline-variant !bg-inverse-on-surface !p-3"
        >
          {service && <Avatar src={file.data} />}
        </Button>
      </div>
      <div>
        <Typography variant="body1" fontWeight={700}>
          {service?.name}
        </Typography>
      </div>
    </div>
  );
}
