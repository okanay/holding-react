import React from "react";
import { ApplicantRow } from "./table-row";
import { SearchX, RefreshCw, Filter } from "lucide-react";
import { Applicant, useDashboardApplicant } from "./store";

interface TableProps {
  applicants: Applicant[];
}

export const ApplicantsTable: React.FC<TableProps> = ({ applicants }) => {
  if (applicants.length <= 0) {
    return <EmptyState />;
  }

  return (
    <div className="overflow-hidden rounded-md border border-zinc-200 bg-white">
      <ul className="divide-y divide-zinc-100 overflow-hidden">
        {applicants.map((applicant) => (
          <ApplicantRow key={applicant.id} applicant={applicant} />
        ))}
      </ul>
    </div>
  );
};

export const EmptyState: React.FC = ({}) => {
  const { setApplicantsFilters, getApplicants, applicantsFilters } =
    useDashboardApplicant();

  const hasActiveFilters = () => {
    return (
      !!applicantsFilters.fullName ||
      !!applicantsFilters.email ||
      !!applicantsFilters.status ||
      !!applicantsFilters.startDate ||
      !!applicantsFilters.endDate ||
      !!applicantsFilters.jobId
    );
  };

  const handleClearFilters = () => {
    setApplicantsFilters({
      page: 1,
      limit: 10,
      fullName: "",
      email: "",
      status: "",
      startDate: "",
      endDate: "",
      sortBy: "created_at",
      sortOrder: "desc",
    });

    getApplicants();
  };

  return (
    <div className="overflow-hidden rounded-md border border-zinc-200 bg-white">
      <div className="flex flex-col items-center justify-center px-6 py-12 text-center">
        {hasActiveFilters() ? (
          // Filtre uygulanmış fakat sonuç bulunamadı
          <>
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-amber-50 text-amber-500">
              <SearchX className="h-8 w-8" />
            </div>
            <h3 className="mb-2 text-lg font-medium text-zinc-800">
              Sonuç Bulunamadı
            </h3>
            <p className="mb-6 max-w-md text-sm text-zinc-500">
              Arama kriterlerinize uygun başvuru bulunamadı. Filtreleri
              değiştirerek tekrar deneyebilirsiniz.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <button
                onClick={handleClearFilters}
                className="inline-flex items-center gap-2 rounded-md border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50"
              >
                <Filter className="h-4 w-4" />
                Filtreleri Temizle
              </button>
              <button
                onClick={() => getApplicants()}
                className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
              >
                <RefreshCw className="h-4 w-4" />
                Yenile
              </button>
            </div>
          </>
        ) : (
          // Hiç başvuru yok
          <>
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-blue-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h3 className="mb-2 text-lg font-medium text-zinc-800">
              Henüz Başvuru Yok
            </h3>
            <p className="mb-6 max-w-md text-sm text-zinc-500">
              Şu anda sistemde herhangi bir başvuru bulunmuyor. İş ilanları
              yayınlandığında ve başvurular geldiğinde burada görüntülenecektir.
            </p>
            <button
              onClick={() => getApplicants()}
              className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
            >
              <RefreshCw className="h-4 w-4" />
              Yenile
            </button>
          </>
        )}
      </div>
    </div>
  );
};
