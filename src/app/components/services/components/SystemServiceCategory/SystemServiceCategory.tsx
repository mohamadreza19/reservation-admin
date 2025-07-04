import { useFilesGet } from "@/libs/api/generated/file/file";
import { ServiceDto } from "@/libs/api/generated/models";
import {
  Avatar,
  Dialog,
  DialogContent,
  DialogProps,
  DialogTitle,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React from "react";

interface SystemServiceCategoryProps extends DialogProps {
  handleClickSystemService: (service: ServiceDto) => void;
  systemServices?: ServiceDto[];
}

interface ServiceAvatarProps {
  service: ServiceDto;
}

function ServiceAvatar({ service }: ServiceAvatarProps) {
  const file = useFilesGet("service", service.id, {
    query: {
      enabled: !!service.id,
      select(data) {
        return URL.createObjectURL(data);
      },
    },
  });

  return <Avatar src={file.data} />;
}

export function SystemServiceCategory({
  systemServices,
  handleClickSystemService,
  ...props
}: SystemServiceCategoryProps) {
  return (
    <Dialog {...props}>
      <DialogTitle>لیست خدمات</DialogTitle>
      <DialogContent>
        <List>
          {systemServices &&
            systemServices.map((service, index) => (
              <ListItemButton
                key={index}
                onClick={() => handleClickSystemService(service)}
              >
                <ListItemIcon>
                  <ServiceAvatar service={service} />
                </ListItemIcon>
                <ListItemText primary={service.name} />
              </ListItemButton>
            ))}
        </List>
      </DialogContent>
    </Dialog>
  );
}
