import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/$lang/_auth/dashboard/content/edit/$id")({
  loader: async ({ params: { lang } }) => {
    return { lang };
  },
  head: ({ loaderData: { lang } }) => {
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
  component: () => {
    return <div>Edit İçerik | Dashboard</div>;
  },
});
