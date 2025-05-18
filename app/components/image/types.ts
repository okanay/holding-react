// Temel görsel türü
export interface ImageType {
  id: string;
  url: string;
  filename: string;
  fileType?: string;
  fileCategory?: string;
  altText?: string;
  width?: number;
  height?: number;
  sizeInBytes?: number;
  createdAt: string;
  updatedAt?: string;
}

// Yükleme durumu
type UploadStatus =
  | "idle"
  | "preparing"
  | "uploading"
  | "confirming"
  | "success"
  | "error";

// Yükleme kuyruğundaki öğe
export interface QueueItem {
  id: string;
  file: File;
  previewUrl: string;
  status: UploadStatus;
  progress: number;
  error: string | null;
  altText?: string;
  category?: string; // Dosya kategorisi
  // Yükleme işlemi için gerekli bilgiler
  signatureId?: string;
  presignedUrl?: string;
  uploadUrl?: string;
  // Yükleme sonrası dönen bilgiler
  imageData?: {
    id?: string;
    url?: string;
    width?: number;
    height?: number;
  };
}

// Seçilen görsel
export interface SelectedImage {
  imageData: ImageType | null;
}

// API yanıtları
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// Presigned URL için giriş
export interface PresignURLInput {
  filename: string;
  contentType: string;
  sizeInBytes: number;
  fileCategory?: string; // Dosya kategorisi eklendi
}

// Presigned URL yanıtı
export interface PresignedURLResponse {
  id: string;
  presignedUrl: string;
  uploadUrl: string;
  expiresAt: string;
  filename: string;
}

// Yükleme onayı için giriş
export interface ConfirmUploadInput {
  signatureId: string;
  url: string;
  width: number;
  height: number;
  sizeInBytes: number;
  altText?: string;
  fileCategory?: string; // Dosya kategorisi eklendi
}

// Yükleme onayı yanıtı
export interface ConfirmUploadResponse {
  id: string;
  url: string;
}

// ImageProvider state tip tanımı
export interface ImageState {
  // State
  images: ImageType[];
  selectedImage: SelectedImage;
  uploadQueue: QueueItem[];
  isLoading: boolean;
  error: string | null;
  currentCategory: string; // Aktif kategori

  // Temel İşlemler - Sadece bu 3 fonksiyona odaklanıyoruz
  fetchImages: (category?: string) => Promise<void>; // Görselleri getir
  uploadImage: (
    file: File,
    category?: string,
    altText?: string,
  ) => Promise<ImageType | null>; // Görsel yükle
  deleteImage: (id: string) => Promise<boolean>; // Görsel sil

  // Yardımcı İşlemler
  selectImage: (id: string | null) => void;
  clearSelectedImage: () => void;
  getImageDimensions: (
    imageUrl: string,
  ) => Promise<{ width: number; height: number }>;
  setCategory: (category: string) => void; // Kategori değiştirme
}
