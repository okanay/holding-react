import { dummyJobs } from "@/components/jobs/dummy";
import { JobSlugHeader } from "@/components/jobs/pages/headers";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/$lang/_main/job/$slug")({
  loader: ({ params: { lang, slug } }) => {
    return {
      data: dummyJobs[0],
      slug,
      lang,
    };
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <JobSlugHeader />
      <Outlet />
    </>
  );
}
