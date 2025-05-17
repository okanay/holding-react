import { Outlet } from "@tanstack/react-router";
import { DashboardFooter } from "./footers";
import { DashboardAside } from "./aside";
import { DashboardHeader } from "./headers";
import { DashboardLayoutProvider, useDashboardLayout } from "./provider";

// Dashboard Ana Layout bileşeni
const DashboardLayoutContent = () => {
  const { isPanelExpanded } = useDashboardLayout();

  return (
    <div>
      <DashboardHeader />
      <div className="flex h-fit min-h-screen items-start justify-start gap-x-4">
        <DashboardAside />
        <main className="w-full px-4 py-4 sm:pr-4">
          <Outlet />
        </main>
      </div>

      <DashboardFooter />
    </div>
  );
};

// Provider ile sarmalanmış ana bileşen
export const DashboardLayout = () => {
  return (
    <DashboardLayoutProvider>
      <DashboardLayoutContent />
    </DashboardLayoutProvider>
  );
};
