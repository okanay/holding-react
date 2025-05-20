import { createFileRoute } from "@tanstack/react-router";
import { DashboardIndexPage } from "@/components/dashboard/pages/index";

export const Route = createFileRoute("/$lang/_auth/dashboard/")({
  loader: async ({ params: { lang } }) => {
    return {
      lang,
    };
  },
  head: ({ loaderData: { lang } }) => {
    return {
      meta: [
        {
          title: "Dashboard | Panel Anasayfa",
        },
        {
          name: "description",
          content:
            "Dashboard paneli anasayfası. Hesabınızı yönetin, ilanlarınızı görüntüleyin ve daha fazlasını keşfedin.",
        },
      ],
    };
  },
  component: DashboardIndexPage,
});
