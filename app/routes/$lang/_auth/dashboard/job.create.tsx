import { DashboardCreateNewJobPage } from "@/components/pages/dashboard/pages/create";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/$lang/_auth/dashboard/job/create")({
  loader: async ({ params: { lang } }) => {
    return {
      lang,
    };
  },
  head: ({ loaderData: { lang } }) => {
    return {
      meta: [
        {
          title: "İş İlanı Oluştur | Dashboard",
        },
        {
          name: "description",
          content: "Yeni bir iş ilanı oluşturun ve yayınlayın.",
        },
      ],
    };
  },
  component: DashboardCreateNewJobPage,
});
