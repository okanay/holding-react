import { Outlet } from "@tanstack/react-router";
import { DashboardFooter } from "./footers";
import { DashboardAside } from "./aside";
import { DashboardHeader } from "./headers";
import { DashboardLayoutProvider, useDashboardLayout } from "./provider";
import { ImageProvider } from "@/components/image/store";
import ImageModal from "@/components/image";

// Dashboard Ana Layout bileşeni
const DashboardLayoutContent = () => {
  const { isPanelExpanded } = useDashboardLayout();

  return (
    <ImageProvider>
      <DashboardHeader />
      <div className="flex h-fit min-h-screen items-start justify-start gap-x-4">
        <DashboardAside />
        <main className="w-full py-4 sm:pr-4">
          <Outlet />
        </main>
      </div>

      <DashboardFooter />
    </ImageProvider>
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
