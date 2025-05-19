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
  applicantsStatus: Status;
  applicantsError: string | null;
  applicantsFilters: {
    page: number;
    limit: number;
  };

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
            params.append("page", applicantsFilters.page.toString());
            params.append("limit", applicantsFilters.limit.toString());

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
              state.applicants = data.data.applications;
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
              `${API_URL_BASE}/auth/applicants/${id}/status`,
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

            // Başarılı güncellemeden sonra başvuruları yenile
            await get().refreshApplicants();
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
