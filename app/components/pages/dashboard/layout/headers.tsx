// app/components/dashboard/layout/headers.tsx
import { LogOut, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { useDashboardLayout } from "./provider";
import { useAuth } from "@/providers/auth";

export const DashboardHeader = () => {
  const { isPanelExpanded, togglePanel } = useDashboardLayout();

  return (
    <header className="border-cover fixed top-0 left-0 z-101 flex w-full items-center justify-between border-b bg-white px-4 py-4 sm:relative">
      {/* Left: Logo ve Toggle Button */}
      <div className="flex items-center gap-4">
        {/* Logo */}
        <div className="flex items-center">
          <span className="ml-3 font-semibold text-zinc-900">Holding</span>
        </div>

        {/* Toggle Button */}
        <button
          onClick={togglePanel}
          className="border-cover flex h-9 w-9 items-center justify-center rounded-md border bg-zinc-100 text-zinc-800 hover:bg-zinc-50 hover:text-zinc-500"
          aria-label={isPanelExpanded ? "Paneli kapat" : "Paneli aç"}
        >
          {isPanelExpanded ? (
            <PanelLeftClose className="h-5 w-5" />
          ) : (
            <PanelLeftOpen className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Right: User Controls */}
      <div className="flex items-center justify-end gap-3">
        <LogoutButton />
        <UserButton />
      </div>
    </header>
  );
};

export const UserButton = () => {
  const { user } = useAuth();

  return (
    <button className="border-cover flex h-10 items-center gap-2 rounded border bg-zinc-100 p-1 pr-4 hover:bg-zinc-50">
      <div className="h-7 w-7 overflow-hidden rounded-full bg-zinc-200">
        <img
          src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
          alt="User avatar"
          className="h-full w-full object-cover"
        />
      </div>
      <span className="text-sm font-medium text-zinc-700 first-letter:uppercase">
        {user.username}
      </span>
    </button>
  );
};

export const LogoutButton = () => {
  const { logout } = useAuth();

  return (
    <button
      onClick={logout}
      className="border-cover flex h-10 items-center justify-center gap-2 rounded border bg-zinc-100 px-3 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-100"
    >
      <LogOut className="h-5 w-5" />
      <span className="hidden sm:inline">Logout</span>
    </button>
  );
};
