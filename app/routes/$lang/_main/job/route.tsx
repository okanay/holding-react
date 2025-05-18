import { JobFooter } from "@/components/jobs/pages/footers";
import { JobHeader } from "@/components/jobs/pages/headers";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/$lang/_main/job")({
  loader: async ({ params: { lang } }) => {
    const APL_URL_BASE = import.meta.env.VITE_APP_BACKEND_URL;
    const FETCH_URL = APL_URL_BASE + "/public/jobs";
    try {
      const response = await fetch(FETCH_URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (!data.success) {
        return { lang, jobs: [] };
      }

      // The jobs array is now under data.data.jobs, not data.jobs
      return { lang, jobs: data.data?.jobs || [] };
    } catch (error) {
      return { lang, jobs: [] };
    }
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
