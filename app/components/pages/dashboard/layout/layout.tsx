import { Outlet } from "@tanstack/react-router";
import { DashboardFooter } from "./footers";
import { DashboardAside } from "./aside";
import { DashboardHeader } from "./headers";
import { DashboardLayoutProvider } from "./provider";
import { ImageProvider } from "@/components/image/store";

// Dashboard Ana Layout bileşeni
const DashboardLayoutContent = () => {
  return (
    <ImageProvider>
      <DashboardHeader />
      <div className="sticky top-0 flex gap-4">
        <DashboardAside />
        <main className="mx-auto w-full max-w-7xl pt-4 sm:pr-4">
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
