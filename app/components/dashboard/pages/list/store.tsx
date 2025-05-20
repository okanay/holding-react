// app/components/dashboard/pages/list/store.tsx
import { createContext, PropsWithChildren, useContext, useState } from "react";
import { createStore, StoreApi, useStore } from "zustand";
import { immer } from "zustand/middleware/immer";
import { toast } from "sonner";

// Durum tipleri
export type FetchStatus = "idle" | "loading" | "success" | "error";

// İş İlanı için Type tanımlaması
export type JobView = {
  id: string;
  slug: string;
  status: string;
  deadline?: string | null;
  createdAt: string;
  updatedAt: string;
  details: {
    title: string;
    description?: string;
    image?: string;
    location?: string;
    workMode?: string;
    employmentType?: string;
    experienceLevel?: string;
    html: string;
    json: string;
    formType: string;
    applicants: number;
  };
  categories?: {
    name: string;
    displayName: string;
    createdAt: string;
  }[];
};

// Sayfalama için tip
export interface Pagination {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

// Filtreler için tip
interface JobFilters {
  page: number;
  limit: number;
  q?: string;
  status?: string;
  category?: string;
  startDate?: string;
  endDate?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

// API yanıtı için tip
export interface JobsResponse {
  jobs: JobView[];
  pagination: Pagination;
}

// Store için durum tipi
interface JobsState {
  // İlanlar için state
  jobs: JobView[];
  jobsPagination: Pagination | null;
  jobsFilters: JobFilters;
  jobsStatus: FetchStatus;
  jobsError: string | null;

  // İşlemler
  setJobsFilters: (filters: Partial<JobsState["jobsFilters"]>) => void;
  getJobs: (options?: Partial<JobsState["jobsFilters"]>) => Promise<void>;
  refreshJobs: () => Promise<void>;
  updateJobStatus: (id: string, status: string) => Promise<boolean>;
  deleteJob: (id: string) => Promise<boolean>;
}

export function DashboardJobProvider({ children }: PropsWithChildren) {
  const [store] = useState(() =>
    createStore<JobsState>()(
      immer((set, get) => ({
        jobs: [],
        jobsStatus: "idle",
        jobsError: null,
        jobsPagination: null,
        jobsFilters: {
          page: 1,
          limit: 10,
          sortBy: "createdAt",
          sortOrder: "desc",
        },

        // Filtreleri güncelle
        setJobsFilters: (filters) => {
          set((state) => {
            state.jobsFilters = {
              ...state.jobsFilters,
              ...filters,
            };
          });
        },

        // İş ilanlarını getir
        getJobs: async (options) => {
          try {
            set((state) => {
              state.jobsStatus = "loading";
              state.jobsError = null;

              // Eğer options parametre olarak gelmişse filtreleri güncelle
              if (options) {
                state.jobsFilters = {
                  ...state.jobsFilters,
                  ...options,
                };
              }
            });

            const { jobsFilters } = get();

            // URL parametrelerini oluştur
            const params = new URLSearchParams();

            // Sayfalama parametreleri
            params.append("page", jobsFilters.page.toString());
            params.append("limit", jobsFilters.limit.toString());

            // Filtreleme parametreleri
            if (jobsFilters.q) params.append("q", jobsFilters.q);
            if (jobsFilters.status) params.append("status", jobsFilters.status);
            if (jobsFilters.category)
              params.append("category", jobsFilters.category);
            if (jobsFilters.startDate)
              params.append("startDate", jobsFilters.startDate);
            if (jobsFilters.endDate)
              params.append("endDate", jobsFilters.endDate);

            // Sıralama parametreleri
            if (jobsFilters.sortBy) params.append("sortBy", jobsFilters.sortBy);
            if (jobsFilters.sortOrder)
              params.append("sortOrder", jobsFilters.sortOrder);

            const API_URL_BASE =
              import.meta.env.VITE_APP_BACKEND_URL || "http://localhost:8080";
            const response = await fetch(
              `${API_URL_BASE}/auth/jobs?${params.toString()}`,
              {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                },
                credentials: "include",
              },
            );

            if (!response.ok) {
              throw new Error("İş ilanları getirilemedi");
            }

            const data = await response.json();

            if (!data.success) {
              throw new Error(data.message || "İş ilanları getirilemedi");
            }

            set((state) => {
              state.jobs = data.data.jobs || [];
              state.jobsPagination = data.data.pagination || null;
              state.jobsStatus = "success";
            });
          } catch (error) {
            console.error("İş ilanları getirilemedi:", error);
            set((state) => {
              state.jobsStatus = "error";
              state.jobsError =
                error instanceof Error
                  ? error.message
                  : "Bilinmeyen bir hata oluştu";
              state.jobs = [];
            });
          }
        },

        // İş ilanlarını yenile
        refreshJobs: async () => {
          const { jobsFilters } = get();
          await get().getJobs(jobsFilters);
        },

        // İş ilanı durumunu güncelle
        updateJobStatus: async (id, status) => {
          try {
            const API_URL_BASE =
              import.meta.env.VITE_APP_BACKEND_URL || "http://localhost:8080";
            const response = await fetch(
              `${API_URL_BASE}/auth/job/status/${id}`,
              {
                method: "PATCH",
                headers: {
                  "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({ status }),
              },
            );

            if (!response.ok) {
              throw new Error("Durum güncellenemedi");
            }

            const data = await response.json();

            if (!data.success) {
              throw new Error(data.message || "Durum güncellenemedi");
            }

            // Local state'teki ilgili ilanın durumunu güncelle
            set((state) => {
              const job = state.jobs.find((j) => j.id === id);
              if (job) {
                job.status = status;
              }
            });

            return true;
          } catch (error) {
            console.error("Durum güncellenemedi:", error);
            return false;
          }
        },

        // İş ilanını sil
        deleteJob: async (id) => {
          try {
            const API_URL_BASE =
              import.meta.env.VITE_APP_BACKEND_URL || "http://localhost:8080";
            const response = await fetch(`${API_URL_BASE}/auth/job/${id}`, {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
              credentials: "include",
            });

            if (!response.ok) {
              throw new Error("İş ilanı silinemedi");
            }

            const data = await response.json();

            if (!data.success) {
              throw new Error(data.message || "İş ilanı silinemedi");
            }

            // Local state'ten ilgili ilanı kaldır
            set((state) => {
              state.jobs = state.jobs.filter((job) => job.id !== id);
            });

            return true;
          } catch (error) {
            console.error("İş ilanı silinemedi:", error);
            return false;
          }
        },
      })),
    ),
  );

  return (
    <DashboardJobContext.Provider value={store}>
      {children}
    </DashboardJobContext.Provider>
  );
}

export function useDashboardJob() {
  const context = useContext(DashboardJobContext);

  if (!context) {
    throw new Error(
      "useDashboardJob hook must be used within a DashboardJobProvider",
    );
  }

  return useStore(context, (state) => state);
}

const DashboardJobContext = createContext<DashboardJobContextType>(undefined);
type DashboardJobContextType = StoreApi<JobsState> | undefined;
