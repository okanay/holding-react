import { Link } from "@/i18n/link";
import { useLanguage } from "@/i18n/use-language";
import { formatDate } from "@/utils/format-date";
import { Briefcase, MapPin, Clock } from "lucide-react";

export const JobCard = ({ job }: { job: Job }) => {
  const { language } = useLanguage();

  return (
    <Link to={`/job/${job.slug}`}>
      <div className="group relative flex flex-col items-start justify-between gap-6 border-b border-gray-200 bg-white py-6 md:flex-row md:items-center">
        {/* Image (if available) */}
        {job.details.image && (
          <div className="mb-4 flex-shrink-0 md:mr-6 md:mb-0">
            <img
              src={job.details.image}
              alt={job.details.title}
              className="h-16 w-16 rounded-md border border-gray-100 object-cover shadow-sm"
            />
          </div>
        )}
        {/* Main Info */}
        <div className="min-w-0 flex-1">
          <div className="mb-1 flex items-center gap-2">
            <h3 className="truncate text-xl font-semibold text-gray-900">
              {job.details.title}
            </h3>
            {job.status === "closed" && (
              <span className="ml-2 rounded bg-gray-200 px-2 py-0.5 text-xs font-medium text-gray-600">
                Kapalı
              </span>
            )}
            {job.status === "draft" && (
              <span className="ml-2 rounded bg-yellow-100 px-2 py-0.5 text-xs font-medium text-yellow-700">
                Taslak
              </span>
            )}
          </div>
          {/* Meta Info */}
          <div className="mb-2 flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-500">
            {job.details.employmentType && (
              <span className="flex items-center gap-1">
                <Briefcase size={14} className="text-primary-500" />
                {job.details.employmentType}
              </span>
            )}
            {job.details.location && (
              <span className="flex items-center gap-1">
                <MapPin size={14} className="text-primary-500" />
                {job.details.location}
              </span>
            )}
            {job.details.workMode && (
              <span className="flex items-center gap-1">
                <span className="bg-primary-400 mr-1 inline-block h-2 w-2 rounded-full" />
                {job.details.workMode}
              </span>
            )}
            {job.details.experienceLevel && (
              <span className="flex items-center gap-1">
                <span className="bg-primary-200 mr-1 inline-block h-2 w-2 rounded-full" />
                {job.details.experienceLevel}
              </span>
            )}

            {job.deadline && (
              <span className="flex items-center gap-1">
                <Clock size={14} className="text-primary-500" />
                Son başvuru: {formatDate(job.deadline, language)}
              </span>
            )}
          </div>
          {/* Description preview */}
          {job.details.description && (
            <p className="mt-3 line-clamp-2 text-sm text-gray-600">
              {job.details.description}
            </p>
          )}
        </div>
        {/* Details Button */}
        <div className="mt-4 flex-shrink-0 md:mt-0 md:ml-6">
          <div className="bg-primary text-color-primary hover:bg-primary-dark rounded px-6 py-2 font-medium shadow-sm">
            DETAYLAR
          </div>
        </div>
      </div>
    </Link>
  );
};
