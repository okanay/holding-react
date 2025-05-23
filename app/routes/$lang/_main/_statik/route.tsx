import { RootFooter } from "@/components/footer";
import { RootHeader } from "@/components/header";
import { seoTranslations } from "@/i18n/languages";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/$lang/_main/_statik")({
  loader: async ({ params: { lang } }) => {
    return { lang };
  },
  head: ({ loaderData: { lang } }) => {
    const seoData = seoTranslations[lang];
    return {
      meta: [
        {
          title: seoData.root.title,
        },
        {
          name: "description",
          content: seoData.root.description,
        },
      ],
      links: [],
    };
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <RootHeader />
      <Outlet />
      <RootFooter />
    </>
  );
}
