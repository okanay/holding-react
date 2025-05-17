import { Link } from "@/i18n/link";
import { useLanguage } from "@/i18n/use-language";
import { formatDate } from "@/utils/format-date";
import {
  Briefcase,
  MapPin,
  ChevronRight,
  CalendarDays,
  Clock,
  XCircle,
} from "lucide-react";

export const JobCard = ({ job }: { job: Job }) => {
  const { language } = useLanguage();

  // Şu anki tarih
  const currentDate = new Date();

  // Son başvuru tarihi kontrolü
  const deadlineDate = job.deadline ? new Date(job.deadline) : null;
  const isDeadlinePassed = deadlineDate ? currentDate > deadlineDate : false;

  // İlanın başvuruya açık olup olmadığı
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

  // Özel durum: Son başvuru tarihi geçmiş ama ilan hala yayında ise "Expired" göster
  const status =
    isDeadlinePassed && job.status === "published"
      ? { bg: "bg-zinc-100", text: "text-zinc-600", label: "Expired" }
      : statusMap[job.status] || statusMap.published;

  return (
    <div className="group relative overflow-hidden rounded border border-zinc-100 bg-white p-6 transition-all duration-200 hover:border-zinc-200">
      <div className="flex flex-col gap-5 md:flex-row md:items-start md:gap-6">
        {/* Company Logo/Image */}
        {job.details.image ? (
          <div className="flex-shrink-0">
            <div className="relative h-14 w-14 overflow-hidden rounded border border-zinc-100">
              <img
                src={job.details.image}
                alt={`${job.details.title} logo`}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        ) : (
          <div className="flex-shrink-0">
            <div className="bg-primary-50 text-primary-700 flex h-14 w-14 items-center justify-center rounded text-xl font-bold">
              {job.details.title.charAt(0)}
            </div>
          </div>
        )}

        {/* Content */}
        <div className="flex flex-1 flex-col">
          {/* Header */}
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

          {/* Meta Information */}
          <div className="mb-3 flex flex-wrap gap-x-5 gap-y-2 text-sm">
            {job.details.employmentType && (
              <span className="flex items-center text-zinc-600">
                <Briefcase size={15} className="text-primary-500 mr-1.5" />
                {job.details.employmentType}
              </span>
            )}
            {job.details.location && (
              <span className="flex items-center text-zinc-600">
                <MapPin size={15} className="text-primary-500 mr-1.5" />
                {job.details.location}
              </span>
            )}
            {job.details.workMode && (
              <span className="flex items-center text-zinc-600">
                <span className="bg-primary-400 mr-1.5 inline-block h-2.5 w-2.5 rounded-full" />
                {job.details.workMode}
              </span>
            )}
            {job.details.experienceLevel && (
              <span className="flex items-center text-zinc-600">
                <span className="bg-primary-300 mr-1.5 inline-block h-2.5 w-2.5 rounded-full" />
                {job.details.experienceLevel}
              </span>
            )}
          </div>

          {/* Description */}
          {job.details.description && (
            <p className="mb-3 line-clamp-2 text-sm leading-relaxed text-zinc-500">
              {job.details.description}
            </p>
          )}

          {/* Deadline */}
          {job.deadline && (
            <div className="mt-1 flex items-center text-xs font-medium text-zinc-500">
              {isDeadlinePassed ? (
                <>
                  <XCircle size={14} className="mr-1.5 text-zinc-400" />
                  <span className="text-zinc-500">
                    Application deadline passed:{" "}
                    {formatDate(job.deadline, language)}
                  </span>
                </>
              ) : (
                <>
                  <CalendarDays size={14} className="mr-1.5 text-zinc-400" />
                  Application deadline:{" "}
                  <span className="ml-1 text-zinc-700">
                    {formatDate(job.deadline, language)}
                  </span>
                </>
              )}
            </div>
          )}
        </div>

        {/* Apply Button */}
        <div className="mt-4 flex-shrink-0 md:mt-0">
          {isApplicationClosed ? (
            <div className="inline-flex cursor-not-allowed items-center justify-center rounded bg-zinc-100 px-6 py-2.5 text-sm font-medium text-zinc-500">
              Closed
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

      {/* Bottom section with applicants count */}
      {job.details.applicants > 0 && (
        <div className="mt-5 flex items-center border-t border-zinc-100 pt-4 text-xs text-zinc-500">
          <span className="flex items-center gap-1.5">
            <ChevronRight className="h-4 w-4 text-zinc-400" />
            {job.details.applicants}{" "}
            {job.details.applicants === 1 ? "applicant" : "applicants"} so far
          </span>
        </div>
      )}
    </div>
  );
};
