import { Link } from "@/i18n/link";
import { useDashboardLayout } from "./provider";
import {
  List,
  LayoutDashboard,
  PlusSquare,
  Users,
  Newspaper,
} from "lucide-react";

export const DashboardAside = () => {
  const { isPanelExpanded } = useDashboardLayout();

  const menuGroups = [
    {
      label: "Genel",
      items: [
        {
          name: "Panel",
          href: "/dashboard",
          icon: LayoutDashboard,
          description: "Genel bakış ve özet bilgiler",
        },
      ],
    },
    {
      label: "İş İlanları",
      items: [
        {
          name: "Oluştur",
          href: "/dashboard/jobs/create",
          icon: PlusSquare,
          description: "Yeni iş ilanı oluştur",
        },
        {
          name: "İlanlar",
          href: "/dashboard/jobs/",
          icon: List,
          description: "Tüm iş ilanlarını görüntüle",
        },
        {
          name: "Başvurular",
          href: "/dashboard/applicants",
          icon: Users,
          description: "İş başvurularını yönet",
        },
      ],
    },
    {
      label: "İçerik",
      items: [
        {
          name: "Oluştur",
          href: "/dashboard/content/create",
          icon: PlusSquare,
          description: "Yeni içerik oluştur",
        },
        {
          name: "İçerikler",
          href: "/dashboard/content",
          icon: Newspaper,
          description: "Tüm içerikleri görüntüle",
        },
      ],
    },
  ];

  return (
    <aside
      data-expended={!isPanelExpanded}
      className="border-cover fixed top-0 z-100 h-full w-60 shrink-0 overflow-hidden border-r bg-white px-2 py-4 pt-20 transition-all duration-300 data-[expended=true]:w-0 data-[expended=true]:px-0 sm:sticky sm:border-0 sm:pt-4"
    >
      <div className="flex flex-col items-start justify-center">
        <div className="mt-4 w-full space-y-4">
          {menuGroups.map((group, groupIndex) => (
            <div key={groupIndex} className="border-cover border-b pb-2">
              <div className="flex items-center gap-2 px-5 pb-2">
                <div className={`bg-primary-500 h-2 w-2 rounded-full`} />
                <h3
                  className={`text-primary-500 text-xs font-semibold tracking-wider uppercase`}
                >
                  {group.label}
                </h3>
              </div>
              <nav className="flex flex-col gap-0.5">
                {group.items.map((item, itemIndex) => (
                  <Link
                    key={itemIndex}
                    to={item.href}
                    className={`group hover:bg-primary-50 relative flex items-center rounded-lg px-3 py-2 text-sm font-medium text-zinc-700 transition-all`}
                    activeProps={{
                      className: `!bg-primary-50 !text-primary-900 font-medium`,
                    }}
                    activeOptions={{ exact: true }}
                    title={item.description}
                  >
                    <div
                      className={`group-hover:bg-primary-200 group-[[data-active=true]]:bg-primary-500 absolute top-0 bottom-0 left-0 w-1 rounded-full opacity-0 transition-all group-hover:opacity-100 group-[[data-active=true]]:opacity-100`}
                    />
                    <div
                      className={`group-hover:text-primary-600 group-[[data-active=true]]:text-primary-600 mr-3 flex items-center justify-center rounded-md p-1`}
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                    </div>
                    <span className="truncate">{item.name}</span>
                  </Link>
                ))}
              </nav>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};
