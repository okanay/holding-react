import { JobSlugHeader } from "@/components/jobs/pages/headers";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/$lang/_main/job/$slug")({
  loader: async ({ params: { lang, slug } }) => {
    const APL_URL_BASE = import.meta.env.VITE_APP_BACKEND_URL;
    const FETCH_URL = `${APL_URL_BASE}/public/jobs/${slug}`;
    try {
      const response = await fetch(FETCH_URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const json = await response.json();

      if (!json.success) {
        return { lang, data: null, slug };
      }

      // The job object is now under data.data, not data.job or data.data.job
      return { lang, data: json.data || null, slug };
    } catch (error) {
      return { lang, data: null, slug };
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="min-h-dvh">
      <JobSlugHeader />
      <Outlet />
    </div>
  );
}
