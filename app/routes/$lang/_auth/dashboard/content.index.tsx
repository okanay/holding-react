import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/$lang/_auth/dashboard/content/")({
  loader: async ({ params: { lang } }) => {
    return { lang };
  },
  head: ({ loaderData: { lang } }) => {
    return {
      meta: [
        {
          title: "İçerik Listesi | Dashboard",
        },
        {
          name: "description",
          content: "Sitedeki içerikleri düzenleyebileceğiniz sayfa.",
        },
      ],
    };
  },
  component: () => {
    return <div>İçerik Listesi | Dashboard</div>;
  },
});
