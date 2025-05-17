import { EditorProvider } from "@/components/editor/store";
import { seoTranslations } from "@/i18n/languages";
import { ProtectedRoute } from "@/providers/auth/session-control";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/$lang/_auth/_dashboard")({
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
      <EditorProvider>
        <Outlet />
      </EditorProvider>
    </ProtectedRoute>
  );
}
