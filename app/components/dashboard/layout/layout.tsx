import { Outlet } from "@tanstack/react-router";
import { DashboardFooter } from "./footers";
import { DashboardAside } from "./aside";
import { DashboardHeader } from "./headers";
import { DashboardLayoutProvider } from "./provider";

export const DashboardLayout = () => {
  return (
    <DashboardLayoutProvider>
      <DashboardHeader />
      <DashboardAside />
      <div>
        <Outlet />
      </div>
      <DashboardFooter />
    </DashboardLayoutProvider>
  );
};
