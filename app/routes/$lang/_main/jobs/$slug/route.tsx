import { JobSlugHeader } from "@/components/pages/jobs/pages/headers";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/$lang/_main/jobs/$slug")({
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
        throw redirect({ to: `/${lang}/not-found`, replace: true });
      }

      return { lang, data: json.data || null, slug };
    } catch (error) {
      throw redirect({ to: `/${lang}/not-found`, replace: true });
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
