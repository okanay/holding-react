import { JobApplyPage } from "@/components/jobs/pages/apply";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/$lang/_main/job/$slug/apply/")({
  component: JobApplyPage,
});
