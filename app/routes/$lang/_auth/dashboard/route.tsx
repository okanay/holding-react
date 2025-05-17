import { DashboardLayout } from "@/components/dashboard/layout/layout";
import { DashboardProvider } from "@/components/dashboard/store";
import { seoTranslations } from "@/i18n/languages";
import { ProtectedRoute } from "@/providers/auth/session-control";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/$lang/_auth/dashboard")({
  loader: async ({ params: { lang } }) => {
    return { lang };
  },
  head: ({ loaderData: { lang } }) => {
    const seoData = seoTranslations[lang];
    return {
      meta: [
        {
          title: seoData.auth.editor.root.title,
        },
        {
          name: "description",
          content: seoData.auth.editor.root.description,
        },
      ],
      links: [],
    };
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <ProtectedRoute>
      <DashboardProvider>
        <DashboardLayout />
      </DashboardProvider>
    </ProtectedRoute>
  );
}
