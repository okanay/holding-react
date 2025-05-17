import { Route } from "@/routes/$lang/_main/job/$slug/apply.index";

export function JobApplyPage() {
  const { data, slug, lang } = Route.useLoaderData() as {
    data: Job;
    slug: string;
    lang: Language;
  };

  return <div>{`Hello "/${lang}/_main/job/${slug}/apply"!`}</div>;
}
