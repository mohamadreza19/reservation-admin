import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Stack,
  Box,
  Divider,
} from "@mui/material";
import { ServiceDto } from "@/libs/api/generated/models";

interface ServiceCardProps {
  service: ServiceDto;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  return (
    <Card variant="outlined" sx={{ minWidth: 275, borderRadius: 2 }}>
      <CardContent>
        <Stack spacing={1}>
          {/* Title */}
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6" color="textPrimary">
              {service.name}
            </Typography>
            {service.isSystemService && (
              <Chip label="خدمت سیستمی" color="info" size="small" />
            )}
          </Box>

          {/* Description */}
          {service.description && (
            <Typography variant="body2" color="textSecondary">
              {service.description}
            </Typography>
          )}

          <Divider />

          {/* Price */}
          {service.price && service.price && (
            <Typography variant="subtitle1" color="textPrimary">
              💰 قیمت: {service.price.amount.toLocaleString()} تومان
            </Typography>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;
