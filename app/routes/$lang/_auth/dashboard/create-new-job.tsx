import { DashboardCreateNewJobPage } from "@/components/dashboard/pages/create-new-job";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/$lang/_auth/dashboard/create-new-job")({
  component: DashboardCreateNewJobPage,
});
