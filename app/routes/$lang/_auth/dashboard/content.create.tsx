import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/$lang/_auth/dashboard/content/create")({
  loader: async ({ params: { lang } }) => {
    return { lang };
  },
  head: ({ loaderData: { lang } }) => {
    return {
      meta: [
        {
          title: "İçerik Oluştur | Dashboard",
        },
        {
          name: "description",
          content: "Sitedeki içerikleri oluşturabileceğiniz sayfa.",
        },
      ],
    };
  },
  component: () => {
    return <div>İçerik Oluştur | Dashboard</div>;
  },
});
