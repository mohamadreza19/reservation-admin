import {
  FunctionComponent,
  ReactNode,
  useEffect,
  useMemo,
  useState,
} from "react";
import Container from "./Container";
import Service from "./components/Service/Service";
import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";

import {
  CreateServiceDto,
  ServiceDto,
  ServicesFindByBusinessParams,
} from "@/libs/api/generated/models";

import {
  ServiceAvatar,
  SubServices,
  SubServicesDialog,
  SystemServiceCategory,
} from "./components";
import {
  getServicesFindByBusinessQueryKey,
  servicesFindByBusiness,
  useServicesCreate,
  useServicesDelete,
  useServicesFindAll,
  useServicesFindByBusiness,
  useServicesUpdate,
} from "@/libs/api/generated/services/services";
import { useFieldArray, useForm } from "react-hook-form";

import _ from "lodash";
import { FormValues } from "./components/SubServices";
import { useQueryClient } from "@tanstack/react-query";

interface ServicesProps {
  businessId: string;
}

const Services: FunctionComponent<ServicesProps> = ({ businessId }) => {
  const { control, handleSubmit, register, formState, getValues, reset } =
    useForm<FormValues>({});

  const formField = useFieldArray({
    control,
    name: "services",
  });
  const [httpMode, setHttpMode] = useState<"create" | "edit">("create");
  const [isOpenSubService, setIsOpenSubService] = useState(false);
  const [isOpenSystemServiceCategory, setIsOpenSystemServiceCategory] =
    useState(false);
  const [selectedSysService, setSelectedSysService] = useState<ServiceDto>();

  const queryClient = useQueryClient();
  const systemService = useServicesFindAll();
  const { data } = useServicesFindByBusiness(
    businessId as any,

    {
      isSystemService: true,
    },
    {
      query: {
        enabled: !!businessId,
      },
    }
  );
  const businessSubService = useServicesFindByBusiness(
    businessId,
    {
      isSystemService: false,
      parentId: selectedSysService?.id,
    },
    {
      query: {
        enabled: !!businessId && !!(httpMode == "edit") && !!selectedSysService,
      },
    }
  );

  const handleChangeSelectedSysService = (sysService: ServiceDto) => {
    setSelectedSysService(sysService);
    setIsOpenSystemServiceCategory(false);
  };
  const customAppend = (): void => {
    formField.append({
      name: "",
      businessId: businessId,
      description: "",
      parentId: selectedSysService?.id,
    });
  };
  const customRemove = (i: number): void => {
    formField.remove(i);
    // removeService.mutate()
  };

  const handleAddNewSubServices = () => {
    // reset({
    //   services: [],
    // });
    setIsOpenSubService(true);
    setHttpMode("create");
  };
  const handleOpenEditSubServices = (ser: ServiceDto) => {
    // if (businessSubService.data) {
    //   reset({
    //     services: businessSubService.data.data,
    //   });
    // }
    setHttpMode("edit");
    handleChangeSelectedSysService(ser);
    setIsOpenSubService(true);
  };
  const removeService = useServicesDelete({
    mutation: {
      onSuccess(data, variables, context) {
        queryClient.invalidateQueries(
          getServicesFindByBusinessQueryKey(businessId) as any
        );
      },
    },
  });
  const updateService = useServicesUpdate({
    mutation: {
      onSuccess(data, variables, context) {
        queryClient.invalidateQueries(
          getServicesFindByBusinessQueryKey(businessId) as any
        );
      },
    },
  });
  const createService = useServicesCreate({
    mutation: {
      onSuccess(data, variables, context) {
        queryClient.invalidateQueries(
          getServicesFindByBusinessQueryKey(businessId) as any
        );
      },
    },
  });

  // set default value for system service
  useEffect(() => {
    if (!selectedSysService && systemService.data) {
      setSelectedSysService(systemService.data.data[0]);
    }
  }, [systemService.data]);

  useMemo(() => {
    if (httpMode == "create") {
      reset({
        services: [],
      });
    } else if (httpMode == "edit" && businessSubService.data) {
      reset({
        services: businessSubService.data.data,
      });
    }
  }, [businessSubService.data, httpMode]);

  const handleCreate = (formData: ServiceDto[]) => {
    formData.forEach((item) => {
      createService.mutate({ data: item as any });
    });
  };
  const handleUpdate = (formData: ServiceDto[]) => {
    const original = businessSubService.data?.data || [];
    const submitted = formData;

    // Split submitted into existing (with id) and new (without id)
    const [existing, created] = _.partition(
      submitted,
      (s: ServiceDto) => !!s.id
    );

    // Map original by id for quick lookup
    const originalById = _.keyBy(original, "id");

    // Detect deleted
    const deleted = _.differenceBy(original, existing, "id");

    // Detect updated
    const updated = existing.filter((item) => {
      const orig = originalById[item.id!];

      return !_.isEqual(item, orig);
    });

    // 🗑 Delete
    deleted.forEach((item) => {
      if (item.id) removeService.mutate({ id: item.id });
    });

    // ✏️ Update
    updated.forEach((item) => {
      updateService.mutate({
        id: item.id,
        data: {
          name: item.name,
          price: {
            amount: item.price?.amount as any,
          },
        },
      });
    });

    // ➕ Create
    created.forEach((item) => {
      // createService.mutate({ data: item as any });
    });
  };
  const submitHandler = (formData: FormValues) => {
    const submitted = formData.services as ServiceDto[];
    switch (httpMode) {
      case "create":
        handleCreate(submitted);
        break;
      case "edit":
        handleUpdate(submitted);
        break;

      default:
        break;
    }
    setIsOpenSubService(false);
  };

  return (
    <>
      <Container label="خدمات" onAddClick={handleAddNewSubServices}>
        {data &&
          data.data.map((ser, i) => (
            <Service
              onClick={() => handleOpenEditSubServices(ser)}
              key={i}
              service={ser}
            />
          ))}
      </Container>

      <SubServicesDialog
        SelectedSysAvatar={
          <ServiceAvatar
            service={selectedSysService}
            onClick={() => setIsOpenSystemServiceCategory(true)}
          />
        }
        open={isOpenSubService}
        onClose={() => setIsOpenSubService(false)}
        onSubmit={handleSubmit(submitHandler)}
      >
        {selectedSysService && (
          <SubServices
            {...formField}
            register={register}
            append={customAppend as any}
            remove={customRemove as any}
          />
        )}
      </SubServicesDialog>

      {systemService.data && (
        <SystemServiceCategory
          open={isOpenSystemServiceCategory}
          onClose={() => setIsOpenSystemServiceCategory(false)}
          systemServices={systemService.data.data}
          handleClickSystemService={handleChangeSelectedSysService}
        />
      )}
    </>
  );
};

export default Services;
