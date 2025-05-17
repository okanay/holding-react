import { dummyJobs } from "@/components/jobs/dummy";
import { JobSlugPage } from "@/components/jobs/pages/slug";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/$lang/_main/job/$slug/")({
  loader: ({ params: { lang, slug } }) => {
    return {
      data: dummyJobs[0],
      slug,
      lang,
    };
  },
  component: JobSlugPage,
});
