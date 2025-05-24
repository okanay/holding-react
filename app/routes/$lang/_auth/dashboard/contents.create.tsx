import { CreateContentPage } from "@/components/pages/dashboard/pages/contents/create";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/$lang/_auth/dashboard/contents/create")({
  loader: async ({ params: { lang } }) => {
    return { lang };
  },
  head: ({ loaderData: {} }) => {
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
  component: CreateContentPage,
});
