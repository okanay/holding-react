import EditContentPage from "@/components/pages/dashboard/pages/contents/edit";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/$lang/_auth/dashboard/contents/edit/$id")(
  {
    loader: async ({ params: { lang } }) => {
      return { lang };
    },
    head: ({ loaderData: {} }) => {
      return {
        meta: [
          {
            title: "Edit İçerik | Dashboard",
          },
          {
            name: "description",
            content: "Sitedeki içerikleri düzenleyebileceğiniz edit sayfası.",
          },
        ],
      };
    },
    component: EditContentPage,
  },
);
