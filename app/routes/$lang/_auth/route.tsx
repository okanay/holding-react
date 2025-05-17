import { seoTranslations } from "@/i18n/languages";
import { AuthProvider } from "@/providers/auth";
import { AuthSessionController } from "@/providers/auth/session-control";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/$lang/_auth")({
  loader: async ({ params: { lang } }) => {
    return { lang };
  },
  head: ({ loaderData: { lang } }) => {
    const seoData = seoTranslations[lang];
    return {
      meta: [
        {
          title: seoData.auth.root.title,
        },
        {
          name: "description",
          content: seoData.auth.root.description,
        },
      ],
      links: [],
    };
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <AuthProvider>
      <AuthSessionController>
        <Outlet />
      </AuthSessionController>
    </AuthProvider>
  );
}
