import { JobApplyPage } from "@/components/pages/jobs/pages/apply";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/$lang/_main/jobs/$slug/apply/")({
  component: JobApplyPage,
});
