import { RefreshCw } from "lucide-react";
import { useDashboardJob } from "./store";
import { Link } from "@/i18n/link";

export const EmptyState: React.FC = () => {
  const { refreshJobs } = useDashboardJob();
  return (
    <div className="overflow-hidden rounded-md border border-zinc-200 bg-white">
      <div className="flex flex-col items-center justify-center px-6 py-12 text-center">
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
          Henüz İş İlanı Yok
        </h3>

        <p className="mb-6 max-w-md text-sm text-zinc-500">
          Henüz hiç iş ilanı oluşturmadınız. Yeni bir iş ilanı oluşturmak için
          "Yeni İlan" butonunu kullanabilirsiniz.
        </p>

        <div className="flex flex-wrap justify-center gap-3">
          <Link
            to="/dashboard/job/create"
            className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 3a1 1 0 00-1 1v5H4a1 1 0 100 2h5v5a1 1 0 102 0v-5h5a1 1 0 100-2h-5V4a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            Yeni İlan Oluştur
          </Link>

          <button
            onClick={() => refreshJobs()}
            className="inline-flex items-center gap-2 rounded-md border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50"
          >
            <RefreshCw className="h-4 w-4" />
            Yenile
          </button>
        </div>
      </div>
    </div>
  );
};
