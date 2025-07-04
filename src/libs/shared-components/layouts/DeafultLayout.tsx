import { Container, Box } from "@mui/material";
import { FunctionComponent, ReactNode } from "react";
import { AppBarProps, default as DefaultAppBar } from "./AppBar";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
interface DefaultLayoutProps {
  children: ReactNode;
  AppBar?: ReactNode;

  AppBarProps?: AppBarProps;
}

const DEFAULT_APP_BAR_PROPS: AppBarProps = {
  label: "null",
  StartIcon: <ArrowForwardIosIcon className="" />,
  // StartIcon: <img className="size-8" src="/icons/logo.svg" />,
};

const DefaultLayout: FunctionComponent<DefaultLayoutProps> = ({
  children,
  AppBar,
  AppBarProps,
}) => {
  const mergedAppBarProps = {
    ...DEFAULT_APP_BAR_PROPS,
    ...AppBarProps,
  };
  const FinalAppBar = AppBar || <DefaultAppBar {...mergedAppBarProps} />;
  return (
    <Container
      maxWidth="sm"
      className="min-h-screen relative flex flex-col gap-6 py-6"
    >
      {FinalAppBar}

      {children}
    </Container>
  );
};

export default DefaultLayout;
