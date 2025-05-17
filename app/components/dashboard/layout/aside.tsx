import { Link } from "@/i18n/link";
import { Home, LayoutDashboard, SquareChevronRight } from "lucide-react";
import { useDashboardLayout } from "./provider";

export const DashboardAside = () => {
  const { isPanelExpanded, togglePanel } = useDashboardLayout();

  const menuItems = [
    {
      name: "Home",
      href: "/",
      icon: Home,
    },
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
  ];

  return (
    <aside
      aria-disabled={isPanelExpanded}
      className={`absolute inset-y-0 left-0 z-20 flex flex-col border-r border-zinc-200 bg-white transition-all duration-300 ease-in-out`}
    >
      {/* Panel Toggle Button */}
      <button
        onClick={togglePanel}
        className="absolute top-[72px] right-0 flex h-8 w-8 translate-x-1/2 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-500 shadow-sm hover:text-zinc-900"
        aria-label={isPanelExpanded ? "Collapse sidebar" : "Expand sidebar"}
        title={isPanelExpanded ? "Collapse sidebar" : "Expand sidebar"}
      >
        <SquareChevronRight
          className={`h-4 w-4 transition-transform duration-300 ${isPanelExpanded ? "rotate-0" : "rotate-180"}`}
        />
      </button>

      {/* Panel İçeriği */}
      <div className="flex h-full flex-col gap-4 p-4">
        {/* Logo ve Marka */}
        <div
          className={`flex items-center ${isPanelExpanded ? "justify-start" : "justify-center"} py-2`}
        >
          <div className="flex items-center">
            <div className="bg-primary-600 flex h-8 w-8 items-center justify-center rounded-lg font-bold text-white">
              H
            </div>
            {isPanelExpanded && (
              <span className="ml-3 font-semibold text-zinc-900">Holding</span>
            )}
          </div>
        </div>

        {/* Menu Başlığı */}
        {isPanelExpanded && (
          <div className="mt-2 px-2">
            <h2 className="text-xs font-semibold tracking-wider text-zinc-500 uppercase">
              Dashboard
            </h2>
          </div>
        )}

        {/* Menu Öğeleri */}
        <nav className="space-y-1">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.href}
              className="flex items-center rounded-lg px-3 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100"
              activeProps={{
                className: "!text-primary",
              }}
              activeOptions={{ exact: true }}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {isPanelExpanded && <span>{item.name}</span>}
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
};
