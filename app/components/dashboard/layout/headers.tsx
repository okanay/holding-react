import { BellIcon, LogOut, Search, Sun } from "lucide-react";
import { useDashboardLayout } from "./provider";
import { useAuth } from "@/providers/auth";

export const DashboardHeader = ({ className = "" }: { className?: string }) => {
  const { isPanelExpanded } = useDashboardLayout();

  return (
    <header
      className={`${className} sticky top-0 z-30 flex h-16 items-center justify-between border-b border-zinc-200 bg-white px-4`}
    >
      {/* Left: Logo & Title (only visible on mobile) */}
      <div className="flex items-center">
        <div className="flex items-center">
          <div className="bg-primary-600 flex h-8 w-8 items-center justify-center rounded-lg font-bold text-white">
            H
          </div>
          <span className="ml-2 font-semibold text-zinc-900">Holding</span>
        </div>
      </div>
      {/* Right: Actions */}
      <div className="flex w-full items-center justify-end gap-3">
        {/* User Menu */}
        <UserButton />

        {/* Logout */}
        <LogoutButton />
      </div>
    </header>
  );
};

export const UserButton = () => {
  const { user } = useAuth();

  return (
    <button className="flex items-center gap-2 rounded-full border border-zinc-200 p-1 pr-4 hover:bg-zinc-50">
      <div className="h-7 w-7 overflow-hidden rounded-full bg-zinc-200">
        <img
          src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
          alt="User avatar"
          className="h-full w-full object-cover"
        />
      </div>
      <span className="text-sm font-medium text-zinc-700">{user.username}</span>
    </button>
  );
};

export const LogoutButton = () => {
  const { logout } = useAuth();

  return (
    <button
      onClick={logout}
      className="flex h-9 items-center justify-center gap-2 rounded-full border border-zinc-200 px-3 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-100"
    >
      <LogOut className="h-5 w-5" />
      Logout
    </button>
  );
};
