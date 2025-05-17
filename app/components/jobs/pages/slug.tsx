import { RenderJSON } from "@/components/dashboard/tiptap/renderer";
import { Route } from "@/routes/$lang/_main/job/$slug/route";

export const JobSlugPage = () => {
  const { data, slug, lang } = Route.useLoaderData() as {
    data: Job;
    slug: string;
    lang: Language;
  };

  return (
    <article className="mx-auto max-w-3xl py-8">
      <RenderJSON json={JSON.parse(data.details.json) || {}} />
    </article>
  );
};
