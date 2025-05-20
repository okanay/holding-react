// app/components/dashboard/pages/create/store.tsx
import { createContext, PropsWithChildren, useContext, useState } from "react";
import { createStore, StoreApi, useStore } from "zustand";
import { immer } from "zustand/middleware/immer";
import { toast } from "sonner";
import DummyText from "../../tiptap/dummy";

// Durum tipleri
export type FetchStatus = "idle" | "loading" | "success" | "error";

// Store için durum tipi
interface CreateJobState {
  // Form verileri ve durum
  formData: Partial<JobFormValues>;
  formStatus: FetchStatus;
  formError: string | null;

  // Editör içeriği
  editorContent: string;

  // İşlemler
  setFormData: (data: Partial<JobFormValues>) => void;
  setEditorContent: (html: string) => void;
  createJob: (data: JobFormValues) => Promise<boolean>;

  // Hazır form dataları
  resetForm: () => void;
}

// Varsayılan form değerleri
const defaultFormValues: Partial<JobFormValues> = {
  title: "Senior Software Developer",
  description:
    "We are looking for an experienced software developer to join innovative projects at one of Turkey's leading technology companies.",
  slug: "senior-software-developer",
  status: "draft",
  image: "",
  location: "",
  workMode: "Any",
  employmentType: "Any",
  experienceLevel: "Any",
  html: DummyText,
  json: "not-included",
  formType: "default",
  categories: ["software"],
  deadline: null,
};

export function CreateJobProvider({ children }: PropsWithChildren) {
  const [store] = useState(() =>
    createStore<CreateJobState>()(
      immer((set, get) => ({
        // Form başlangıç değerleri
        formData: { ...defaultFormValues },
        formStatus: "idle",
        formError: null,
        editorContent: DummyText,

        // Form verilerini güncelle
        setFormData: (data) => {
          set((state) => {
            state.formData = {
              ...state.formData,
              ...data,
            };
          });
        },

        // Editör içeriğini güncelle
        setEditorContent: (html) => {
          set((state) => {
            state.editorContent = html;
          });
        },

        // İş ilanı oluştur
        createJob: async (data) => {
          try {
            set((state) => {
              state.formStatus = "loading";
              state.formError = null;
            });

            const APL_URL_BASE = import.meta.env.VITE_APP_BACKEND_URL;
            const FETCH_URL = APL_URL_BASE + "/auth/create-new-job";

            const response = await fetch(FETCH_URL, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              credentials: "include",
              body: JSON.stringify(data),
            });

            const responseData = await response.json();

            if (!responseData.success) {
              throw new Error(
                responseData.message || "İş ilanı oluşturulamadı",
              );
            }

            set((state) => {
              state.formStatus = "success";
            });

            toast.success("İş ilanı başarıyla oluşturuldu!");
            return true;
          } catch (error) {
            console.error("İş ilanı oluşturulamadı:", error);
            set((state) => {
              state.formStatus = "error";
              state.formError =
                error instanceof Error
                  ? error.message
                  : "Bilinmeyen bir hata oluştu";
            });

            toast.error("İş ilanı oluşturulurken bir hata oluştu");
            return false;
          }
        },

        // Formu sıfırla
        resetForm: () => {
          set((state) => {
            state.formData = { ...defaultFormValues };
            state.formStatus = "idle";
            state.formError = null;
            state.editorContent = DummyText;
          });
        },
      })),
    ),
  );

  return (
    <CreateJobContext.Provider value={store}>
      {children}
    </CreateJobContext.Provider>
  );
}

export function useCreateJob() {
  const context = useContext(CreateJobContext);

  if (!context) {
    throw new Error(
      "useCreateJob hook must be used within a CreateJobProvider",
    );
  }

  return useStore(context, (state) => state);
}

const CreateJobContext = createContext<CreateJobContextType>(undefined);
type CreateJobContextType = StoreApi<CreateJobState> | undefined;
