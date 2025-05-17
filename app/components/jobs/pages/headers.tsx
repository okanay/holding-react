import { Link } from "@/i18n/link";
import { Route } from "@/routes/$lang/_main/job/$slug/route";
import { useMatches } from "@tanstack/react-router";
import { MapPin } from "lucide-react";

export function JobHeader() {
  return (
    <header className="">
      <div className="mx-auto max-w-3xl">
        <Link
          to={"/job"}
          className="text-primary-600 inline-block py-4 text-3xl font-bold"
        >
          <span className="font-extrabold">HOI</span>
          <span className="relative">
            Holding
            <span className="bg-primary-600 absolute -top-2 -right-2 h-2 w-2 rounded-full"></span>
          </span>
        </Link>
      </div>
    </header>
  );
}

export const JobSlugHeader = () => {
  const { data, slug, lang } = Route.useLoaderData() as {
    data: Job;
    slug: string;
    lang: Language;
  };

  return (
    <header className="mx-auto flex max-w-3xl items-start justify-between gap-8 py-8">
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

      <JobActionButton data={data} />
    </header>
  );
};

const JobActionButton: React.FC<{ data: Job }> = ({ data }) => {
  const matches = useMatches();
  const isOnApplyPage = matches.some(
    (m: any) => m.routeId === "/$lang/_main/job/$slug/apply/",
  );
  if (isOnApplyPage) {
    return (
      <Link
        to={`/job/${data.slug}`}
        className="flex h-11 items-center justify-center rounded bg-zinc-200 px-4 text-sm font-semibold text-zinc-700 uppercase"
      >
        Job Details
      </Link>
    );
  }

  return (
    <Link
      to={`/job/${data.slug}/apply`}
      className="bg-primary flex h-11 items-center justify-center rounded px-4 text-sm font-semibold text-white uppercase"
    >
      Apply Now
    </Link>
  );
};
