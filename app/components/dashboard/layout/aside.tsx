import { Link } from "@/i18n/link";
import { useDashboardLayout } from "./provider";
import { List, LayoutDashboard, PlusSquare, Users } from "lucide-react";

export const DashboardAside = () => {
  const { isPanelExpanded } = useDashboardLayout();

  const menuItems = [
    {
      name: "Panel",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Yeni İş",
      href: "/dashboard/job/create",
      icon: PlusSquare,
    },
    {
      name: "İlanlar",
      href: "/dashboard/job/list",
      icon: List,
    },
    {
      name: "Başvurular",
      href: "/dashboard/applicants",
      icon: Users,
    },
  ];

  return (
    <aside
      data-expended={!isPanelExpanded}
      className="border-cover fixed top-0 z-100 h-full w-50 overflow-hidden border-r bg-white px-4 py-4 pt-20 transition-all duration-300 data-[expended=true]:w-0 data-[expended=true]:px-0 sm:sticky sm:border-0 sm:pt-4"
    >
      <div className="flex flex-col items-start justify-center">
        <div className="mt-2 px-2">
          <h2 className="text-xs font-semibold tracking-wider text-zinc-500 uppercase">
            Dashboard
          </h2>
        </div>
        <nav className="mt-2 space-y-1">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.href}
              className="group flex items-center rounded-lg px-3 py-2.5 text-sm font-medium text-zinc-700 transition-all hover:bg-zinc-100"
              activeProps={{
                className: "!bg-primary-50 !text-primary-600",
              }}
              activeOptions={{ exact: true }}
            >
              <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
              <span className="truncate">{item.name}</span>
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
};
