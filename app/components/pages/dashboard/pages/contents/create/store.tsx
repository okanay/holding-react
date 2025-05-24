// app/components/dashboard/pages/create/store.tsx
import { createContext, PropsWithChildren, useContext, useState } from "react";
import { createStore, StoreApi, useStore } from "zustand";
import { immer } from "zustand/middleware/immer";
import { toast } from "sonner";
import DummyText from "../../../tiptap/dummy";

// Durum tipleri
export type FetchStatus = "idle" | "loading" | "success" | "error";

// Store için durum tipi
interface CreateContentState {
  // Form verileri ve durum
  formData: Partial<ContentFormValues>;
  formStatus: FetchStatus;
  formError: string | null;

  // Editör içeriği
  editorContent: string;

  // Contentlemler
  setFormData: (data: Partial<ContentFormValues>) => void;
  setEditorContent: (html: string) => void;
  createContent: (data: ContentFormValues) => Promise<boolean>;

  // Hazır form dataları
  resetForm: () => void;
}

// Varsayılan form değerleri
const defaultFormValues: Partial<ContentFormValues> = {
  title: "",
  description: "",
  slug: "",
  status: "draft" as const,
  category: "",
  language: "tr",
  identifier: "",
  imageUrl: "",
  contentHtml: "added-on-submit",
  contentJson: "added-on-submit",
  detailsJson: "",
};

export function CreateContentProvider({ children }: PropsWithChildren) {
  const [store] = useState(() =>
    createStore<CreateContentState>()(
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

        // Content oluştur
        createContent: async (data) => {
          try {
            set((state) => {
              state.formStatus = "loading";
              state.formError = null;
            });

            const APL_URL_BASE = import.meta.env.VITE_APP_BACKEND_URL;
            const FETCH_URL = APL_URL_BASE + "/auth/content";

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
              throw new Error(responseData.message || "Content oluşturulamadı");
            }

            set((state) => {
              state.formStatus = "success";
            });

            toast.success("Content başarıyla oluşturuldu!");
            return true;
          } catch (error) {
            set((state) => {
              state.formStatus = "error";
              state.formError =
                error instanceof Error
                  ? error.message
                  : "Bilinmeyen bir hata oluştu";
            });

            toast.error(`Content oluşturulurken bir hata oluştu`, {
              description: error.message,
            });
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
    <CreateContentContext.Provider value={store}>
      {children}
    </CreateContentContext.Provider>
  );
}

export function useCreateContent() {
  const context = useContext(CreateContentContext);

  if (!context) {
    throw new Error(
      "useCreateContent hook must be used within a CreateContentProvider",
    );
  }

  return useStore(context, (state) => state);
}

const CreateContentContext = createContext<CreateContentContextType>(undefined);
type CreateContentContextType = StoreApi<CreateContentState> | undefined;
