import { Link } from "@/i18n/link";
import { useLanguage } from "@/i18n/use-language";
import { formatDate } from "@/utils/format-date";
import {
  Briefcase,
  MapPin,
  ChevronRight,
  CalendarDays,
  XCircle,
  Home,
  User,
} from "lucide-react";
import {
  WORK_MODE_OPTIONS,
  EMPLOYMENT_TYPE_OPTIONS,
  CATEGORY_OPTIONS,
} from "@/components/dashboard/form/config";
import { getLabelEnFromDictionary } from "../helper";

export const JobCard = ({ job }: { job: Job }) => {
  const { language } = useLanguage();

  const currentDate = new Date();
  const deadlineDate = job.deadline ? new Date(job.deadline) : null;
  const isDeadlinePassed = deadlineDate ? currentDate > deadlineDate : false;
  const isApplicationClosed = job.status === "closed" || isDeadlinePassed;

  // Status badge özellikleri
  const statusMap = {
    published: {
      bg: "bg-emerald-50",
      text: "text-emerald-700",
      label: "Active",
    },
    closed: { bg: "bg-zinc-100", text: "text-zinc-600", label: "Closed" },
    draft: { bg: "bg-amber-50", text: "text-amber-700", label: "Draft" },
  };

  const status =
    isDeadlinePassed && job.status === "published"
      ? { bg: "bg-zinc-100", text: "text-zinc-600", label: "Expired" }
      : statusMap[job.status] || statusMap.published;

  // Helper fonksiyonları ile İngilizce label'ları çekiyoruz
  const employmentTypeLabelEn = getLabelEnFromDictionary(
    EMPLOYMENT_TYPE_OPTIONS,
    job.details.employmentType,
  );

  const workModeLabelEn = getLabelEnFromDictionary(
    WORK_MODE_OPTIONS,
    job.details.workMode,
  );

  // Location için İngilizce karşılık (ör: "Any" ise "All locations")
  const location =
    job.details.location === "" || job.details.location === undefined
      ? "All locations"
      : job.details.location;

  // Deneyim seviyesi için (örnek: "Any" ise "All levels")
  const experienceLevel =
    job.details.experienceLevel === "Any"
      ? "All levels"
      : job.details.experienceLevel;

  return (
    <div className="group relative overflow-hidden rounded border border-zinc-100 bg-white p-6 transition-all duration-200 hover:border-zinc-200">
      <div className="flex flex-col gap-5 md:flex-row md:items-start md:gap-6">
        {/* Company Logo or First Letter */}
        <div className="flex-shrink-0">
          {job.details.image ? (
            <div className="relative h-14 w-14 overflow-hidden rounded border border-zinc-100">
              <img
                src={job.details.image}
                alt={`${job.details.title} logo`}
                className="h-full w-full object-cover"
              />
            </div>
          ) : (
            <div className="bg-primary-50 text-primary-700 flex h-14 w-14 items-center justify-center rounded text-xl font-bold">
              {job.details.title.charAt(0)}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col">
          {/* Title and Status */}
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <h3 className="mr-2 text-lg font-semibold text-zinc-900">
              {job.details.title}
            </h3>
            <span
              className={`inline-flex items-center rounded-full ${status.bg} px-2.5 py-0.5 text-xs font-medium ${status.text}`}
            >
              {status.label}
            </span>
          </div>

          {/* Company Name, Category and Location */}
          <div className="mb-2 flex flex-wrap items-center gap-3 text-sm text-zinc-700">
            <span className="inline-flex items-center gap-1.5">
              <MapPin size={15} className="text-sky-500" />
              {location}
            </span>
          </div>

          {/* Application Deadline and Status */}
          <div className="mb-2 flex flex-wrap items-center gap-3 text-xs font-medium">
            {job.deadline && (
              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 ${
                  isDeadlinePassed
                    ? "bg-zinc-100 text-zinc-500"
                    : "bg-indigo-50 text-indigo-700"
                }`}
                title="Application Deadline"
              >
                {isDeadlinePassed ? (
                  <XCircle size={14} className="text-zinc-400" />
                ) : (
                  <CalendarDays size={14} className="text-indigo-500" />
                )}
                {isDeadlinePassed
                  ? `Application closed: ${formatDate(job.deadline, language)}`
                  : `Deadline: ${formatDate(job.deadline, language)}`}
              </span>
            )}
          </div>

          {/* Description */}
          {job.details.description && (
            <p className="mb-3 line-clamp-2 text-sm leading-relaxed text-zinc-500">
              {job.details.description}
            </p>
          )}

          {/* Other Meta Information */}
          <div className="mb-2 flex flex-wrap gap-2 text-xs">
            {employmentTypeLabelEn && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2 py-0.5 font-medium text-emerald-700">
                <Briefcase size={13} className="text-emerald-500" />
                {employmentTypeLabelEn}
              </span>
            )}
            {workModeLabelEn && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-violet-50 px-2 py-0.5 font-medium text-violet-700">
                <Home size={13} className="text-violet-500" />
                {workModeLabelEn}
              </span>
            )}
            {experienceLevel && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-2 py-0.5 font-medium text-amber-700">
                <User size={13} className="text-amber-500" />
                {experienceLevel}
              </span>
            )}
            {job.createdAt && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-zinc-50 px-2 py-0.5 font-medium text-zinc-700">
                <CalendarDays size={13} className="text-zinc-400" />
                Posted: {formatDate(job.createdAt, language)}
              </span>
            )}
          </div>
        </div>

        {/* Application Button */}
        <div className="mt-4 flex-shrink-0 md:mt-0">
          {isApplicationClosed ? (
            <div className="inline-flex cursor-not-allowed items-center justify-center rounded bg-zinc-100 px-6 py-2.5 text-sm font-medium text-zinc-500">
              Applications Closed
            </div>
          ) : (
            <Link
              to={`/job/${job.slug}`}
              className="bg-primary hover:bg-primary-600 focus:ring-primary-500 inline-flex items-center justify-center rounded px-6 py-2.5 text-sm font-medium text-white transition-colors focus:ring-2 focus:ring-offset-1 focus:outline-none"
            >
              Apply
              <ChevronRight size={16} className="ml-1" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
