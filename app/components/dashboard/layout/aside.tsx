// app/components/dashboard/layout/aside.tsx
import { Link } from "@/i18n/link";
import { ClipboardPen, Home, NotepadText } from "lucide-react";
import { useDashboardLayout } from "./provider";

export const DashboardAside = () => {
  const { isPanelExpanded, togglePanel } = useDashboardLayout();

  const menuItems = [
    {
      name: "Editör Paneli",
      href: "/dashboard",
      icon: Home,
    },
    {
      name: "Yeni İş Oluştur",
      href: "/dashboard/job/create",
      icon: ClipboardPen,
    },
    {
      name: "İş İlanları",
      href: "/dashboard/job/list",
      icon: ClipboardPen,
    },
    {
      name: "Başvurular",
      href: "/dashboard/applicants",
      icon: NotepadText,
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
