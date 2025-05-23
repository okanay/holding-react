import { DashboardEditJobPage } from "@/components/pages/dashboard/pages/edit";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/$lang/_auth/dashboard/jobs/edit/$id")({
  loader: async ({ params: { lang, id } }) => {
    return {
      id,
      lang,
    };
  },
  head: ({ loaderData: { lang } }) => {
    return {
      meta: [
        {
          title: "İş İlanını Düzenle | Dashboard",
        },
        {
          name: "description",
          content: "İş ilanınızı düzenleyin ve güncelleyin.",
        },
      ],
    };
  },
  component: DashboardEditJobPage,
});
