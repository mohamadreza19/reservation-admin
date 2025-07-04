import { FunctionComponent, useEffect, useState } from "react";
import NotificationsNoneSharpIcon from "@mui/icons-material/NotificationsNoneSharp";
import KeyboardBackspaceSharpIcon from "@mui/icons-material/KeyboardBackspaceSharp";
import {
  Avatar,
  Button,
  Divider,
  Skeleton,
  TextField,
  Typography,
} from "@mui/material";
import FileCopyOutlinedIcon from "@mui/icons-material/FileCopyOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { useBusinessGetMyLink } from "@/libs/api/generated/business/business";

interface HeaderProps {
  name: string | undefined | null;
  isLoading: boolean;
  OnBlurEditName: (name: string) => void;
}

const Profile: FunctionComponent<HeaderProps> = ({
  name,
  isLoading,
  OnBlurEditName,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState("");
  const mylink = useBusinessGetMyLink();
  useEffect(() => {
    if (name) setEditedName(name);
  }, [name]);
  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedName(e.target.value);
  };

  const handleBlur = () => {
    setIsEditing(false);
    OnBlurEditName(editedName);
    // TODO: Optional: Save the new name here or call a callback
  };
  console.log(mylink.data);
  const copyBusinessAddress = () => {
    navigator.clipboard.writeText(mylink.data);
  };

  return (
    <div className="bg-tertiary-container  p-4 rounded-2xl flex flex-col gap-4">
      <div>
        <section className="flex gap-3 items-center">
          {isLoading ? (
            <>
              <Skeleton variant="circular" width={40} height={40} />
              <Skeleton variant="text" width={120} height={32} />
            </>
          ) : (
            <>
              <Avatar />
              {isEditing ? (
                <TextField
                  value={editedName}
                  onChange={handleNameChange}
                  onBlur={handleBlur}
                  variant="standard"
                  autoFocus
                  size="small"
                />
              ) : (
                <>
                  <Typography variant="h5">{editedName}</Typography>
                  <EditOutlinedIcon
                    className="!size-3 cursor-pointer"
                    onClick={handleEditClick}
                  />
                </>
              )}
            </>
          )}
        </section>
      </div>

      <div className="flex items-center justify-between">
        {isLoading ? (
          <>
            <Skeleton variant="rectangular" width={150} height={32} />
            <Skeleton variant="text" width={100} height={24} />
          </>
        ) : (
          <>
            <div className="flex gap-2 items-center ">
              <Button variant="contained" size="small">
                رایگان
              </Button>
              <section className="flex items-center gap-2">
                <Typography
                  className="!text-on-tertiary-container"
                  variant="caption"
                  fontWeight="400"
                >
                  پلن خود را ارتقاع دهید
                </Typography>
                <KeyboardBackspaceSharpIcon className="!text-[12px]" />
              </section>
            </div>
            <div className="" onClick={copyBusinessAddress}>
              <Button className="!text-on-tertiary-container flex items-center gap-1">
                <FileCopyOutlinedIcon className="!text-[12px]" />
                <Typography variant="caption">آدرس شما</Typography>
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
