import { createContext, PropsWithChildren, useContext, useState } from "react";
import { createStore, StoreApi, useStore } from "zustand";
import { immer } from "zustand/middleware/immer";

// Başvuranlar için durum
export type FetchStatus = "idle" | "loading" | "success" | "error";

export type JobView = {
  id: string;
  slug: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  details: {
    title: string;
    description: string;
    workMode: string;
    employmentType: string;
    experienceLevel: string;
    html: string;
    json: string;
    formType: string;
    applicants: number;
  };
  categories: {
    name: string;
    displayName: string;
    createdAt: string;
  }[];
};

// Sayfalama verisi için tip
export interface Pagination {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

interface JobFilters {
  page: number;
  limit: number;
  fullName?: string;
  email?: string;
  status?: string;
  startDate?: string;
  endDate?: string;
  jobId?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

// Başvuranlar yanıtı için tip
export interface JobsResponse {
  jobs: JobView[];
  pagination: Pagination;
}

// Store için durum tipi
interface DataState {
  // Başvuranlar için state
  jobs: JobView[];
  jobsPagination: Pagination;
  jobsFilters: JobFilters;
  jobsStatus: FetchStatus;
  jobsError: string | null;

  // setJobsFilters: (filters: Partial<DataState["jobsFilters"]>) => void;
  // getJobs: (options?: Partial<DataState["jobsFilters"]>) => Promise<void>;
  // refreshJobs: () => Promise<void>;
  // updateJobStatus: (id: string, status: JobView["status"]) => Promise<boolean>;
  // deleteJob: (id: string) => Promise<boolean>;
  // updateJobStatus: (id: string, status: JobView["status"]) => Promise<boolean>;
}

export function DashboardJobProvider({ children }: PropsWithChildren) {
  const [store] = useState(() =>
    createStore<DataState>()(
      immer((set, get) => ({
        jobs: [],
        jobsStatus: "idle",
        jobsError: null,
        jobsPagination: null,
        jobsFilters: {
          page: 1,
          limit: 10,
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
type DashboardJobContextType = StoreApi<DataState> | undefined;
