import { createContext, PropsWithChildren, useContext, useState } from "react";
import { toast } from "sonner";
import { createStore, StoreApi, useStore } from "zustand";
import { immer } from "zustand/middleware/immer";
import axios from "axios";
import {
  ApiResponse,
  ConfirmUploadInput,
  ConfirmUploadResponse,
  ImageState,
  ImageType,
  PresignedURLResponse,
  PresignURLInput,
} from "./types";

// API URL
const API_URL = import.meta.env.VITE_APP_BACKEND_URL || "http://localhost:8080";

// Varsayılan kategori
const DEFAULT_IMAGE_CATEGORY = "images";

// Axios instance - cookie tabanlı JWT auth için withCredentials: true
const api = axios.create({
  baseURL: API_URL + "/auth",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Image Provider
export function ImageProvider({ children }: PropsWithChildren) {
  const [store] = useState(() =>
    createStore<ImageState>()(
      immer((set, get) => ({
        // Başlangıç state değerleri
        images: [],
        selectedImage: { imageData: null },
        uploadQueue: [],
        isLoading: false,
        error: null,
        currentCategory: DEFAULT_IMAGE_CATEGORY,

        // Kategori değiştir
        setCategory: (category: string) => {
          set((state) => {
            state.currentCategory = category;
          });
          // Yeni kategorideki resimleri yükle
          get().fetchImages(category);
        },

        // 1. GET: Kategori bazlı görselleri getir
        fetchImages: async (category?: string) => {
          try {
            set((state) => {
              state.isLoading = true;
              state.error = null;

              // Eğer kategori belirtildiyse, currentCategory'yi güncelle
              if (category) {
                state.currentCategory = category;
              }
            });

            // Kullanılacak kategoriyi belirle
            const categoryToUse =
              category || get().currentCategory || DEFAULT_IMAGE_CATEGORY;

            // Kategori parametresi ile auth API isteği yap
            const response = await api.get<ApiResponse<ImageType[]>>(
              `/files/category?c=${categoryToUse}`,
            );

            if (response.data.success) {
              // Data null veya boş olsa bile hata vermesin
              set((state) => {
                state.images = response.data.data || [];
                state.isLoading = false;
              });
            } else {
              throw new Error(response.data.message || "Dosyalar getirilemedi");
            }
          } catch (error) {
            const errorMessage =
              error instanceof Error
                ? error.message
                : "Bilinmeyen bir hata oluştu";

            set((state) => {
              state.error = errorMessage;
              state.isLoading = false;

              // Hata durumunda, boş bir dizi olarak ayarla
              state.images = [];
            });

            toast.error("Dosyalar alınırken hata: " + errorMessage);
            console.error("Dosyalar alınırken hata:", error);
          }
        },

        // 2. UPLOAD: Görsel yükleme (tek dosya)
        uploadImage: async (
          file: File,
          category?: string,
          altText: string = "",
        ) => {
          try {
            set((state) => {
              state.isLoading = true;
              state.error = null;
            });

            // Kullanılacak kategoriyi belirle
            const categoryToUse =
              category || get().currentCategory || DEFAULT_IMAGE_CATEGORY;

            // 1. Presigned URL al
            const presignData: PresignURLInput = {
              filename: file.name,
              contentType: file.type,
              sizeInBytes: file.size,
              fileCategory: categoryToUse,
            };

            // Auth API ile presigned URL al
            const presignResponse = await api.post<
              ApiResponse<PresignedURLResponse>
            >("/files/presigned-url", presignData);

            if (!presignResponse.data.success || !presignResponse.data.data) {
              throw new Error(
                presignResponse.data.message || "Yükleme URL'si alınamadı",
              );
            }

            const {
              id: signatureId,
              presignedUrl,
              uploadUrl,
            } = presignResponse.data.data;

            // 2. Dosyayı Cloudflare R2'ye yükle
            const uploadResponse = await axios.put(presignedUrl, file, {
              headers: {
                "Content-Type": file.type,
              },
            });

            if (uploadResponse.status !== 200) {
              throw new Error("Dosya yüklenemedi");
            }

            // 3. Görsel boyutlarını al
            const previewUrl = URL.createObjectURL(file);
            const dimensions = await get().getImageDimensions(previewUrl);

            // 4. Yüklemeyi onayla
            const confirmData: ConfirmUploadInput = {
              signatureId,
              url: uploadUrl,
              width: dimensions.width,
              height: dimensions.height,
              sizeInBytes: file.size,
              altText: altText,
              fileCategory: categoryToUse,
            };

            // Auth API ile yüklemeyi onayla
            const confirmResponse = await api.post<
              ApiResponse<ConfirmUploadResponse>
            >("/files/confirm-upload", confirmData);

            if (!confirmResponse.data.success || !confirmResponse.data.data) {
              throw new Error(
                confirmResponse.data.message || "Yükleme onaylanamadı",
              );
            }

            const { id, url } = confirmResponse.data.data;

            // 5. Yeni görseli ekle
            const newImage: ImageType = {
              id,
              url,
              filename: file.name,
              fileType: file.type,
              fileCategory: categoryToUse,
              sizeInBytes: file.size,
              width: dimensions.width,
              height: dimensions.height,
              createdAt: new Date().toISOString(),
            };

            set((state) => {
              state.images = [...state.images, newImage];
              state.isLoading = false;
              // Yüklenen görseli seçili yap
              state.selectedImage = { imageData: newImage };
            });

            // Önizleme URL'ini temizle
            URL.revokeObjectURL(previewUrl);

            toast.success("Dosya başarıyla yüklendi");
            return newImage;
          } catch (error) {
            const errorMessage =
              error instanceof Error
                ? error.message
                : "Bilinmeyen bir hata oluştu";

            set((state) => {
              state.error = errorMessage;
              state.isLoading = false;
            });

            toast.error("Yükleme hatası: " + errorMessage);
            console.error("Yükleme hatası:", error);
            return null;
          }
        },

        // 3. DELETE: Görsel silme
        deleteImage: async (imageId: string) => {
          try {
            set((state) => {
              state.isLoading = true;
              state.error = null;
            });

            const response = await api.delete<ApiResponse<void>>(
              `/files/${imageId}`,
            );

            if (response.data.success) {
              // State'den görseli kaldır
              set((state) => {
                state.images = state.images.filter((img) => img.id !== imageId);

                // Eğer silinmiş görsel seçiliyse, seçimi iptal et
                if (state.selectedImage?.imageData?.id === imageId) {
                  state.selectedImage = { imageData: null };
                }

                state.isLoading = false;
              });

              toast.success("Dosya başarıyla silindi");
              return true;
            } else {
              throw new Error(response.data.message || "Dosya silinemedi");
            }
          } catch (error) {
            const errorMessage =
              error instanceof Error
                ? error.message
                : "Bilinmeyen bir hata oluştu";

            set((state) => {
              state.error = errorMessage;
              state.isLoading = false;
            });

            toast.error("Dosya silme hatası: " + errorMessage);
            console.error("Dosya silme hatası:", error);
            return false;
          }
        },

        // YARDIMCI FONKSİYONLAR

        // Görsel seçimi
        selectImage: (imageId: string | null) => {
          if (!imageId) {
            set((state) => {
              state.selectedImage = { imageData: null };
            });
            return;
          }

          const { images } = get();
          const selectedImage = images.find((img) => img.id === imageId);

          if (!selectedImage) {
            toast.error("Seçilen dosya bulunamadı");
            return;
          }

          set((state) => {
            state.selectedImage = { imageData: selectedImage };
          });
        },

        // Seçili görseli temizleme
        clearSelectedImage: () => {
          set((state) => {
            state.selectedImage = { imageData: null };
          });
        },

        // Görsel boyutlarını hesaplama
        getImageDimensions: (imageUrl: string) => {
          return new Promise<{ width: number; height: number }>(
            (resolve, reject) => {
              if (!imageUrl) {
                reject(new Error("Geçerli bir görsel URL'i bulunamadı"));
                return;
              }

              const img = new Image();

              img.onload = () => {
                resolve({
                  width: img.width,
                  height: img.height,
                });
              };

              img.onerror = () => {
                reject(new Error("Görsel boyutları hesaplanamadı"));
              };

              img.src = imageUrl;
            },
          );
        },
      })),
    ),
  );

  return (
    <ImageContext.Provider value={store}>{children}</ImageContext.Provider>
  );
}

// Context
const ImageContext = createContext<StoreApi<ImageState> | undefined>(undefined);

// Hook
export function useImage() {
  const context = useContext(ImageContext);

  if (!context) {
    throw new Error("useImage hook must be used within a ImageProvider");
  }

  return useStore(context, (state) => state);
}
