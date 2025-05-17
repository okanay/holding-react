import { JobFooter } from "@/components/jobs/pages/footers";
import { JobHeader } from "@/components/jobs/pages/headers";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/$lang/_main/job")({
  loader: async ({ params: { lang } }) => {
    return { lang };
  },
  head: ({ loaderData: { lang } }) => {
    return {};
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="px-4">
      <JobHeader />
      <Outlet />
      <JobFooter />
    </div>
  );
}
