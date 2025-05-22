import { RenderJSON } from "@/components/pages/dashboard/tiptap/renderer";
import { Route } from "@/routes/$lang/_main/jobs/$slug/route";

export const JobSlugPage = () => {
  const { data, slug, lang } = Route.useLoaderData() as {
    data: Job;
    slug: string;
    lang: Language;
  };

  return (
    <article className="prose mx-auto max-w-3xl px-4 py-8">
      <RenderJSON json={JSON.parse(data.details.json) || {}} />
    </article>
  );
};
