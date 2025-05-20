import {
  CATEGORY_OPTIONS,
  EMPLOYMENT_TYPE_OPTIONS,
  WORK_MODE_OPTIONS,
} from "@/components/dashboard/form/config";
import { Link } from "@/i18n/link";
import { Route } from "@/routes/$lang/_main/jobs/$slug/route";
import { useMatches } from "@tanstack/react-router";
import { MapPin } from "lucide-react";
import { getLabelEnFromDictionary } from "../helper";

export function JobHeader() {
  return (
    <header className="bg-zinc-100 px-4">
      <div className="mx-auto max-w-3xl">
        <Link
          to={"/jobs"}
          className="text-primary-600 inline-block py-4 text-3xl font-bold"
        >
          <span className="relative">Holding</span>
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

  // Helper fonksiyonları ile İngilizce label'ları çekiyoruz
  const categoryLabelEn =
    data.categories && data.categories.length > 0
      ? getLabelEnFromDictionary(CATEGORY_OPTIONS, data.categories[0].name)
      : "";

  const employmentTypeLabelEn = getLabelEnFromDictionary(
    EMPLOYMENT_TYPE_OPTIONS,
    data.details.employmentType,
  );

  const workModeLabelEn = getLabelEnFromDictionary(
    WORK_MODE_OPTIONS,
    data.details.workMode,
  );

  // Location için İngilizce karşılık (ör: "Any" ise "All locations")
  const location =
    data.details.location === "" || data.details.location === undefined
      ? "All locations"
      : data.details.location;

  return (
    <nav className="bg-zinc-100 px-4">
      <div className="mx-auto flex max-w-3xl items-start justify-between gap-8 py-8">
        <div className="flex flex-col gap-6">
          <h1 className="line-clamp-2 text-2xl font-semibold tracking-tight text-zinc-700 sm:text-3xl">
            {data.details.title}
          </h1>

          <div className="flex flex-wrap gap-4 text-sm text-zinc-500">
            {location && (
              <div className="flex items-center gap-2 rounded-sm bg-zinc-100 py-1">
                <MapPin size={18} />
                <span className="font-medium">{location}</span>
              </div>
            )}
            <div className="flex flex-wrap items-center gap-2 rounded-sm bg-zinc-100 py-1">
              {/* Combine the labels into an array, filter out falsy values (including void), and join with slashes */}
              {[categoryLabelEn, employmentTypeLabelEn, workModeLabelEn]
                .filter((label): label is string => Boolean(label))
                .map((label, idx, arr) => (
                  <span key={label} className="font-medium">
                    {label}
                    {idx < arr.length - 1 && (
                      <span className="mx-1 text-zinc-400">/</span>
                    )}
                  </span>
                ))}
            </div>
          </div>
        </div>

        <JobActionButton data={data} />
      </div>
    </nav>
  );
};

const JobActionButton: React.FC<{ data: Job }> = ({ data }) => {
  const matches = useMatches();
  const isOnApplyPage = matches.some(
    (m: any) => m.routeId === "/$lang/_main/jobs/$slug/apply/",
  );
  if (isOnApplyPage) {
    return (
      <Link
        to={`/jobs/${data.slug}`}
        className="flex h-11 items-center justify-center rounded bg-zinc-200 px-4 text-sm font-semibold text-nowrap text-zinc-700 uppercase"
      >
        Job Details
      </Link>
    );
  }

  return (
    <Link
      to={`/jobs/${data.slug}/apply`}
      className="bg-primary flex h-11 items-center justify-center rounded px-4 text-sm font-semibold text-nowrap text-white uppercase"
    >
      Apply Now
    </Link>
  );
};
