import { dummyJobs } from "@/components/jobs/dummy";
import { JobApplyPage } from "@/components/jobs/pages/apply";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/$lang/_main/job/$slug/apply/")({
  loader: ({ params: { lang, slug } }) => {
    return {
      data: dummyJobs[0],
      slug,
      lang,
    };
  },
  component: JobApplyPage,
});
