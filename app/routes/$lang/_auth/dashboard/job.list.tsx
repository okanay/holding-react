// app/routes/$lang/_auth/dashboard/job.list.tsx
import { DashboardJobsListPage } from "@/components/dashboard/pages/list";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/$lang/_auth/dashboard/job/list")({
  loader: async ({ params: { lang } }) => {
    return { lang };
  },
  head: ({ loaderData: { lang } }) => {
    return {
      meta: [
        {
          title: "İş İlanları | Dashboard",
        },
        {
          name: "description",
          content: "İş ilanlarınızı yönetin, düzenleyin ve takip edin.",
        },
      ],
    };
  },
  component: DashboardJobsListPage,
});
