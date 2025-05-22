// app/components/dashboard/pages/list/index.tsx
import { useEffect } from "react";
import { Pagination } from "./pagination";
import { DashboardJobProvider, useDashboardJob } from "./store";
import { JobTable } from "./table";
import { Filter } from "./filter";
import { Loader2 } from "lucide-react";

export const DashboardJobsListPage = () => {
  return (
    <DashboardJobProvider>
      <JobsPageContent />
    </DashboardJobProvider>
  );
};

const JobsPageContent = () => {
  const { jobs, getJobs, jobsStatus, jobsError } = useDashboardJob();

  // Component ilk yüklendiğinde iş ilanlarını getir
  useEffect(() => {
    getJobs();
  }, []);

  // Yükleniyor durumu
  if (jobsStatus === "loading") {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="flex h-96 items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
            <p className="text-lg text-zinc-600">İş ilanları yükleniyor...</p>
          </div>
        </div>
      </div>
    );
  }

  // Hata durumu
  if (jobsStatus === "error") {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="flex h-96 flex-col items-center justify-center">
          <div className="flex flex-col items-center gap-3 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-10 w-10 text-red-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-zinc-800">
              Bir hata oluştu
            </h2>
            <p className="max-w-md text-zinc-600">
              {jobsError ||
                "İş ilanları yüklenirken bir sorun oluştu. Lütfen sayfayı yenileyin veya daha sonra tekrar deneyin."}
            </p>
            <button
              onClick={() => getJobs()}
              className="mt-4 inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              Tekrar Dene
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-20 px-4 sm:mt-0">
      <Filter />
      <JobTable jobs={jobs} />
      <Pagination />
    </div>
  );
};
