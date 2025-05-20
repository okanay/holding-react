import { DashboardJobsListPage } from "@/components/dashboard/pages/list";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/$lang/_auth/dashboard/job/list")({
  component: DashboardJobsListPage,
});
