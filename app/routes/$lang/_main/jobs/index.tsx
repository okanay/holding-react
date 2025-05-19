import { JobPage } from "@/components/jobs/pages";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/$lang/_main/jobs/")({
  component: JobPage,
});
