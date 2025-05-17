import { Outlet } from "@tanstack/react-router";
import { DashboardFooter } from "./footers";
import { DashboardAside } from "./aside";
import { DashboardHeader } from "./headers";

export const DashboardLayout = () => {
  return (
    <>
      <DashboardHeader />
      <DashboardAside />
      <div>
        <Outlet />
      </div>
      <DashboardFooter />
    </>
  );
};
