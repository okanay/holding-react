import { RenderJSON } from "@/components/dashboard/tiptap/renderer";
import { Link } from "@/i18n/link";
import { Route } from "@/routes/$lang/_main/job/$slug";
import { MapPin } from "lucide-react";

export const JobSlugPage = () => {
  const { data, slug, lang } = Route.useLoaderData() as {
    data: Job;
    slug: string;
    lang: Language;
  };

  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      {/* İş başlığı ve detay alanı */}
      <div className="mb-8 flex items-start justify-between gap-8">
        <div className="flex flex-col gap-6">
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-700">
            {data.details.title}
          </h1>

          <div className="flex flex-wrap gap-4 text-sm text-zinc-500">
            {data.details.location && (
              <div className="flex items-center gap-2 rounded-sm bg-zinc-100 px-3 py-1">
                <MapPin size={18} />
                <span className="font-medium">{data.details.location}</span>
              </div>
            )}
            <div className="flex items-center gap-2 rounded-sm bg-zinc-100 px-3 py-1">
              {data.categories && data.categories.length > 0 && (
                <>
                  <span className="font-medium">
                    {data.categories[0].displayName}
                  </span>
                  {(data.details.employmentType || data.details.workMode) && (
                    <span className="mx-1 text-zinc-400">/</span>
                  )}
                </>
              )}
              {data.details.employmentType && (
                <>
                  <span className="font-medium">
                    {data.details.employmentType}
                  </span>
                  {data.details.workMode && (
                    <span className="mx-1 text-zinc-400">/</span>
                  )}
                </>
              )}
              {data.details.workMode && (
                <span className="font-medium">{data.details.workMode}</span>
              )}
            </div>
          </div>
        </div>

        <Link
          to={`/job/${data.slug}/apply`}
          className="bg-primary flex h-11 items-center justify-center rounded px-4 text-sm font-semibold text-white"
        >
          APPLY FOR THIS JOB
        </Link>
      </div>
      <RenderJSON json={JSON.parse(data.details.json) || {}} />
    </main>
  );
};
