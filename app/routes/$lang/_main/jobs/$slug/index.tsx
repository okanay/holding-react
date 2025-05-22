import { JobSlugPage } from "@/components/pages/jobs/pages/slug";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/$lang/_main/jobs/$slug/")({
  component: JobSlugPage,
});
