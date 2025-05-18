// app/components/common/file-upload/image-upload.tsx
import React, { useState, useEffect } from "react";
import { twMerge } from "tailwind-merge";
import { ImagePlus, X, Upload, AlertCircle, Loader2 } from "lucide-react";
import { useImage } from "@/components/image/store";

interface ImageUploaderProps {
  label?: string;
  helperText?: string;
  error?: string;
  isRequired?: boolean;
  containerClassName?: string;
  className?: string;
  value?: string;
  onChange?: (value: string) => void;
  onSelectImage?: () => void;
  id?: string;
  accept?: string;
  uploadCategory?: string;
  previewStyle?: "contain" | "cover";
}

export const ImageUploader = ({
  label,
  helperText,
  error,
  isRequired = false,
  containerClassName,
  className,
  value,
  onChange,
  onSelectImage,
  id,
  accept = "image/*",
  uploadCategory = "image",
  previewStyle = "cover",
}: ImageUploaderProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [fileToUpload, setFileToUpload] = useState<File | null>(null);

  const { addToUploadQueue, uploadSingleFile, uploadQueue } = useImage();

  // URL değişikliğini ele al
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.value);
      setUploadError(null);
    }
  };

  // Dosya seçme işleyicisi
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFileToUpload(file);
      setUploadError(null);

      // Input değerini sıfırla (aynı dosyayı tekrar seçebilmek için)
      e.target.value = "";
    }
  };

  // Dosya yükleme işlemi
  const handleUpload = async () => {
    if (!fileToUpload) return;

    setIsUploading(true);
    setUploadError(null);

    try {
      // Dosyayı kuyruğa ekle
      const uniqueId = `temp-${Date.now()}`;
      addToUploadQueue([fileToUpload]);

      // Kuyruktaki son öğeyi bul
      const queueItem = uploadQueue[uploadQueue.length - 1];

      // Dosyayı yükle
      const imageId = await uploadSingleFile(queueItem.id);

      // Yükleme başarılıysa URL'yi form değerine aktar
      const uploadedItem = uploadQueue.find(
        (item) => item.status === "success" && item.imageData?.id === imageId,
      );

      if (uploadedItem?.imageData?.url && onChange) {
        onChange(uploadedItem.imageData.url);
      } else {
        setUploadError("Görsel yüklendi ancak URL alınamadı.");
      }
    } catch (error) {
      setUploadError(
        error instanceof Error ? error.message : "Yükleme başarısız oldu.",
      );
    } finally {
      setIsUploading(false);
      setFileToUpload(null);
    }
  };

  // Dosya seçildiğinde otomatik yükleme başlat
  useEffect(() => {
    if (fileToUpload) {
      handleUpload();
    }
  }, [fileToUpload]);

  // Görüntüyü temizle
  const clearImage = () => {
    if (onChange) {
      onChange("");
      setUploadError(null);
      setFileToUpload(null);
    }
  };

  return (
    <div className={twMerge("flex flex-col gap-1.5", containerClassName)}>
      {label && (
        <div className="flex items-center justify-between">
          <label htmlFor={id} className="text-sm font-medium text-zinc-700">
            {label}
            {isRequired && <span className="ml-1 text-red-500">*</span>}
          </label>
          {error && <span className="text-xs text-red-500">{error}</span>}
        </div>
      )}

      <div className="space-y-3">
        {/* Görsel Önizleme */}
        {value && (
          <div className="relative rounded-md border border-zinc-200 bg-zinc-50 p-2">
            <div className="relative aspect-video w-full overflow-hidden rounded bg-zinc-100">
              <img
                src={value}
                alt="Görsel"
                className={`h-full w-full object-${previewStyle}`}
              />
            </div>
            <button
              type="button"
              className="absolute -top-2 -right-2 rounded-full bg-white p-1 shadow-md hover:bg-red-50"
              onClick={clearImage}
            >
              <X className="h-4 w-4 text-red-500" />
            </button>
          </div>
        )}

        {/* Görsel URL veya Yükleme Alanı */}
        <div className="flex gap-x-2">
          <div className="flex-1">
            <input
              id={id}
              type="text"
              value={value || ""}
              onChange={handleChange}
              placeholder="Görsel URL'si"
              className={twMerge(
                "focus:border-primary-400 focus:ring-primary-400/20 w-full rounded-md border border-zinc-300 px-4 py-2 focus:ring-2 focus:outline-none",
                error && "border-red-300 bg-red-50/30",
                className,
              )}
            />
          </div>

          {/* Dosya Yükleme Butonu */}
          <label
            className={twMerge(
              "flex cursor-pointer items-center gap-1 rounded-md border bg-zinc-50 px-3 text-sm font-medium text-zinc-700 hover:bg-zinc-100",
              isUploading && "cursor-not-allowed opacity-50",
            )}
          >
            {isUploading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Yükleniyor</span>
              </>
            ) : (
              <>
                <Upload className="h-4 w-4" />
                <span>Yükle</span>
              </>
            )}
            <input
              type="file"
              className="hidden"
              accept={accept}
              onChange={handleFileSelect}
              disabled={isUploading}
            />
          </label>

          {onSelectImage && (
            <button
              type="button"
              className="border-cover flex items-center gap-1 rounded-md border bg-zinc-50 px-3 text-sm font-medium text-zinc-700 hover:bg-zinc-100"
              onClick={onSelectImage}
            >
              <ImagePlus className="h-4 w-4" />
              <span className="hidden sm:inline">Medya</span>
            </button>
          )}
        </div>

        {/* Hata Mesajı */}
        {(error || uploadError || helperText) && (
          <div className="flex items-center gap-1.5">
            {(error || uploadError) && (
              <AlertCircle className="h-3.5 w-3.5 text-red-500" />
            )}
            <p
              className={`text-xs ${error || uploadError ? "text-red-500" : "text-zinc-500"}`}
            >
              {error || uploadError || helperText}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
