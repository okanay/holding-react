// app/components/dashboard/pages/edit/store.tsx
import { createContext, PropsWithChildren, useContext, useState } from "react";
import { createStore, StoreApi, useStore } from "zustand";
import { immer } from "zustand/middleware/immer";
import { toast } from "sonner";

// Durum tipleri
export type FetchStatus = "idle" | "loading" | "success" | "error";

// Store için durum tipi
interface EditJobState {
  // İlan verileri
  job: JobFormValues | null;
  jobStatus: FetchStatus;
  jobError: string | null;

  // İşlemler
  fetchJob: (id: string) => Promise<void>;
  updateJob: (id: string, data: JobFormValues) => Promise<boolean>;
  setInitialEditorContent: (html: string) => void;

  // Editor içeriği
  editorContent: string;
}

export function EditJobProvider({ children }: PropsWithChildren) {
  const [store] = useState(() =>
    createStore<EditJobState>()(
      immer((set, get) => ({
        job: null,
        jobStatus: "idle",
        jobError: null,
        editorContent: "",

        // İş ilanı verilerini getir
        fetchJob: async (id: string): Promise<void> => {
          try {
            set((state) => {
              state.jobStatus = "loading";
              state.jobError = null;
            });

            const API_URL_BASE =
              import.meta.env.VITE_APP_BACKEND_URL || "http://localhost:8080";
            const response = await fetch(`${API_URL_BASE}/auth/job/${id}`, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
              credentials: "include",
            });

            if (!response.ok) {
              throw new Error("İş ilanı getirilemedi");
            }

            const data = await response.json();

            if (!data.success) {
              throw new Error(data.message || "İş ilanı getirilemedi");
            }

            const jobData = data.data;

            // Form verilerine dönüştür
            const formValues: JobFormValues = {
              title: jobData.details.title,
              description: jobData.details.description,
              slug: jobData.slug,
              status: jobData.status,
              image: jobData.details.image || "",
              location: jobData.details.location || "",
              workMode: jobData.details.workMode || "Any",
              employmentType: jobData.details.employmentType || "Any",
              experienceLevel: jobData.details.experienceLevel || "Any",
              html: jobData.details.html,
              json: jobData.details.json,
              formType: jobData.details.formType || "default",
              categories: jobData.categories?.map(
                (cat: { name: string }) => cat.name,
              ) || ["software"],
              deadline: jobData.deadline ? new Date(jobData.deadline) : null,
            };

            set((state) => {
              state.job = formValues;
              state.jobStatus = "success";
              state.editorContent = formValues.html;
            });
          } catch (error) {
            console.error("İş ilanı getirilemedi:", error);
            set((state) => {
              state.jobStatus = "error";
              state.jobError =
                error instanceof Error
                  ? error.message
                  : "Bilinmeyen bir hata oluştu";
              state.job = null;
            });

            toast.error("İş ilanı yüklenirken bir hata oluştu");
            throw error;
          }
        },

        // İş ilanını güncelle
        updateJob: async (id, data) => {
          try {
            set((state) => {
              state.jobStatus = "loading";
            });

            const API_URL_BASE =
              import.meta.env.VITE_APP_BACKEND_URL || "http://localhost:8080";
            const response = await fetch(`${API_URL_BASE}/auth/job/${id}`, {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              credentials: "include",
              body: JSON.stringify(data),
            });

            if (!response.ok) {
              throw new Error("İş ilanı güncellenemedi");
            }

            const responseData = await response.json();

            if (!responseData.success) {
              throw new Error(
                responseData.message || "İş ilanı güncellenemedi",
              );
            }

            set((state) => {
              state.job = data;
              state.jobStatus = "success";
            });

            toast.success("İş ilanı başarıyla güncellendi");
            return true;
          } catch (error) {
            console.error("İş ilanı güncellenemedi:", error);
            set((state) => {
              state.jobStatus = "error";
              state.jobError =
                error instanceof Error
                  ? error.message
                  : "Bilinmeyen bir hata oluştu";
            });

            toast.error("İş ilanı güncellenirken bir hata oluştu");
            return false;
          }
        },

        // Editör içeriğini ayarla
        setInitialEditorContent: (html: string) => {
          set((state) => {
            state.editorContent = html;
          });
        },
      })),
    ),
  );

  return (
    <EditJobContext.Provider value={store}>{children}</EditJobContext.Provider>
  );
}

export function useEditJob() {
  const context = useContext(EditJobContext);

  if (!context) {
    throw new Error("useEditJob hook must be used within a EditJobProvider");
  }

  return useStore(context, (state) => state);
}

const EditJobContext = createContext<EditJobContextType>(undefined);
type EditJobContextType = StoreApi<EditJobState> | undefined;
