import { Stack } from "@mui/material";
import { FunctionComponent, ReactNode } from "react";

interface PageLayoutProps {
  children: ReactNode;
}

const PageLayout: FunctionComponent<PageLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full py-4">
      {children}
    </div>
  );
};

export default PageLayout;
