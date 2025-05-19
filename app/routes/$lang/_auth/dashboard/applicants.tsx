import { DashboardApplicantsPage } from "@/components/dashboard/pages/applicants";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/$lang/_auth/dashboard/applicants")({
  component: DashboardApplicantsPage,
});
