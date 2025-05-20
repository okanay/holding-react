import { DashboardEditJobPage } from "@/components/dashboard/pages/edit";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/$lang/_auth/dashboard/job/edit/$id")({
  loader: async ({ params: { lang, id } }) => {
    return {
      id,
      lang,
    };
  },
  component: DashboardEditJobPage,
});
