// app/components/dashboard/store.tsx
import { createContext, PropsWithChildren, useContext, useState } from "react";
import { createStore, StoreApi, useStore } from "zustand";
import { immer } from "zustand/middleware/immer";

// Başvuranlar için durum
export type Status = "idle" | "loading" | "success" | "error";

// Başvuran tipini tanımlayalım
export interface Applicant {
  id: string;
  jobId: string;
  fullName: string;
  email: string;
  phone: string;
  formType: string;
  formJson: string;
  status: Status;
  createdAt: string;
  updatedAt: string;
}

// Sayfalama verisi için tip
export interface Pagination {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

interface ApplicantsFilters {
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
export interface ApplicantsResponse {
  applications: Applicant[];
  pagination: Pagination;
}

// Store için durum tipi
interface DataState {
  view: {
    job: {
      create: "editor" | "form";
    };
  };
  setView: (view: DataState["view"]) => void;

  // Başvuranlar için state
  applicants: Applicant[];
  applicantsPagination: Pagination;
  applicantsFilters: ApplicantsFilters;
  applicantsStatus: Status;
  applicantsError: string | null;

  setApplicantsFilters: (
    filters: Partial<DataState["applicantsFilters"]>,
  ) => void;
  getApplicants: (
    options?: Partial<DataState["applicantsFilters"]>,
  ) => Promise<void>;
  refreshApplicants: () => Promise<void>;
  updateApplicantStatus: (
    id: string,
    status: Applicant["status"],
  ) => Promise<boolean>;
}

export function DashboardProvider({ children }: PropsWithChildren) {
  const [store] = useState(() =>
    createStore<DataState>()(
      immer((set, get) => ({
        view: {
          job: {
            create: "form",
          },
        },
        setView: (view) =>
          set((state) => {
            state.view = view;
          }),

        // Başvuranlar için başlangıç durumu
        applicants: [],
        applicantsStatus: "idle",
        applicantsError: null,
        applicantsPagination: null,
        applicantsFilters: {
          page: 1,
          limit: 10,
        },

        // Başvuranları getir
        getApplicants: async (options) => {
          try {
            set((state) => {
              state.applicantsStatus = "loading";
              state.applicantsError = null;

              // Mevcut filtreleri güncelle
              if (options) {
                state.applicantsFilters = {
                  ...state.applicantsFilters,
                  ...options,
                };
              }
            });

            const { applicantsFilters } = get();

            // URL parametrelerini oluştur
            const params = new URLSearchParams();

            // Sayfalama parametreleri
            params.append("page", applicantsFilters.page.toString());
            params.append("limit", applicantsFilters.limit.toString());

            // Filtreleme parametreleri
            if (applicantsFilters.fullName)
              params.append("fullName", applicantsFilters.fullName);
            if (applicantsFilters.email)
              params.append("email", applicantsFilters.email);
            if (applicantsFilters.status)
              params.append("status", applicantsFilters.status);
            if (applicantsFilters.startDate)
              params.append("startDate", applicantsFilters.startDate);
            if (applicantsFilters.endDate)
              params.append("endDate", applicantsFilters.endDate);
            if (applicantsFilters.jobId)
              params.append("jobId", applicantsFilters.jobId);

            // Sıralama parametreleri
            if (applicantsFilters.sortBy)
              params.append("sortBy", applicantsFilters.sortBy);
            if (applicantsFilters.sortOrder)
              params.append("sortOrder", applicantsFilters.sortOrder);

            const API_URL_BASE =
              import.meta.env.VITE_APP_BACKEND_URL || "http://localhost:8080";
            const response = await fetch(
              `${API_URL_BASE}/auth/applicants?${params.toString()}`,
              {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                },
                credentials: "include",
              },
            );

            if (!response.ok) {
              throw new Error("Failed to fetch applicants");
            }

            const data = await response.json();

            if (!data.success) {
              throw new Error(data.message || "Failed to fetch applicants");
            }

            set((state) => {
              // null kontrolü ekleyerek boş dizi ile değiştiriyoruz
              state.applicants = data.data.applications || [];
              state.applicantsPagination = data.data.pagination;
              state.applicantsStatus = "success";
            });
          } catch (error) {
            set((state) => {
              state.applicantsStatus = "error";
              state.applicantsError =
                error instanceof Error
                  ? error.message
                  : "An unknown error occurred";
              // Hata durumunda da boş dizi atayalım
              state.applicants = [];
            });
          }
        },

        // Başvuranları yenile
        refreshApplicants: async () => {
          const { applicantsFilters } = get();
          await get().getApplicants(applicantsFilters);
        },

        // Başvuru durumunu güncelle
        updateApplicantStatus: async (id, status) => {
          try {
            const API_URL_BASE =
              import.meta.env.VITE_APP_BACKEND_URL || "http://localhost:8080";
            const response = await fetch(
              `${API_URL_BASE}/auth/applicant/status/${id}`,
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
              throw new Error("Failed to update applicant status");
            }

            const data = await response.json();

            if (!data.success) {
              throw new Error(
                data.message || "Failed to update applicant status",
              );
            }

            // Eğer başarılıysa local olarak applicants dizisinde ilgili başvuranın status'unu güncelle
            set((state) => {
              const applicant = state.applicants.find((a) => a.id === id);
              if (applicant) {
                applicant.status = status;
              }
            });

            return true;
          } catch (error) {
            return false;
          }
        },

        // Filtreleri ayarla
        setApplicantsFilters: (filters) => {
          set((state) => {
            state.applicantsFilters = {
              ...state.applicantsFilters,
              ...filters,
            };
          });
        },
      })),
    ),
  );

  return (
    <DashboardContext.Provider value={store}>
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const context = useContext(DashboardContext);

  if (!context) {
    throw new Error(
      "useDashboard hook must be used within a DashboardProvider",
    );
  }

  return useStore(context, (state) => state);
}

const DashboardContext = createContext<DashboardContextType>(undefined);
type DashboardContextType = StoreApi<DataState> | undefined;
