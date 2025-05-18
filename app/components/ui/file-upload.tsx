// app/components/common/file-upload/file-upload.tsx
import React, { useState, useEffect } from "react";
import { twMerge } from "tailwind-merge";
import {
  File,
  X,
  Upload,
  AlertCircle,
  Loader2,
  FileText,
  ExternalLink,
} from "lucide-react";
import { useImage } from "@/components/image/store";

interface FileUploaderProps {
  label?: string;
  helperText?: string;
  error?: string;
  isRequired?: boolean;
  containerClassName?: string;
  className?: string;
  value?: string;
  onChange?: (value: string) => void;
  id?: string;
  accept?: string;
  uploadCategory?: string;
  fileType?: "cv" | "certificate" | "general";
}

export const FileUploader = ({
  label,
  helperText,
  error,
  isRequired = false,
  containerClassName,
  className,
  value,
  onChange,
  id,
  accept = ".pdf,.doc,.docx,.txt",
  uploadCategory = "document",
  fileType = "general",
}: FileUploaderProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [fileToUpload, setFileToUpload] = useState<File | null>(null);
  const [fileInfo, setFileInfo] = useState<{
    name: string;
    type: string;
  } | null>(null);

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
      setFileInfo({
        name: file.name,
        type: file.type,
      });
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
      // Dosya boyutu kontrolü (10MB)
      if (fileToUpload.size > 10 * 1024 * 1024) {
        throw new Error("Dosya boyutu 10MB'dan küçük olmalıdır.");
      }

      // Dosyayı kuyruğa ekle
      addToUploadQueue([fileToUpload]);

      // Kuyruktaki son öğeyi bul
      const queueItem = uploadQueue[uploadQueue.length - 1];

      // Dosyayı yükle
      const fileId = await uploadSingleFile(queueItem.id);

      // Yükleme başarılıysa URL'yi form değerine aktar
      const uploadedItem = uploadQueue.find(
        (item) => item.status === "success" && item.imageData?.id === fileId,
      );

      if (uploadedItem?.imageData?.url && onChange) {
        onChange(uploadedItem.imageData.url);
      } else {
        setUploadError("Dosya yüklendi ancak URL alınamadı.");
      }
    } catch (error) {
      setUploadError(
        error instanceof Error ? error.message : "Yükleme başarısız oldu.",
      );
    } finally {
      setIsUploading(false);
    }
  };

  // Dosya seçildiğinde otomatik yükleme başlat
  useEffect(() => {
    if (fileToUpload) {
      handleUpload();
    }
  }, [fileToUpload]);

  // Dosyayı temizle
  const clearFile = () => {
    if (onChange) {
      onChange("");
      setUploadError(null);
      setFileToUpload(null);
      setFileInfo(null);
    }
  };

  // Dosya adından uzantıyı çıkar
  const getFileExtension = (filename: string) => {
    return filename.split(".").pop()?.toUpperCase() || "";
  };

  // Dosya adını kısalt (çok uzunsa)
  const truncateFileName = (filename: string, maxLength = 20) => {
    if (filename.length <= maxLength) return filename;

    const extension = getFileExtension(filename);
    const nameWithoutExt = filename.substring(0, filename.lastIndexOf("."));

    if (nameWithoutExt.length <= maxLength - extension.length - 3) {
      return filename;
    }

    return `${nameWithoutExt.substring(0, maxLength - extension.length - 3)}...${extension}`;
  };

  // Dosya türüne göre ikon seç
  const getFileIcon = () => {
    if (fileInfo?.type.includes("pdf")) {
      return <FileText className="h-8 w-8 text-red-500" />;
    } else if (
      fileInfo?.type.includes("word") ||
      fileInfo?.name.endsWith(".doc") ||
      fileInfo?.name.endsWith(".docx")
    ) {
      return <FileText className="h-8 w-8 text-blue-500" />;
    } else {
      return <File className="h-8 w-8 text-gray-500" />;
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
        {/* Dosya Önizleme */}
        {value && fileInfo && (
          <div className="relative rounded-md border border-zinc-200 bg-zinc-50 p-4">
            <div className="flex items-center gap-3">
              {getFileIcon()}
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-medium text-zinc-800">
                  {truncateFileName(fileInfo.name)}
                </div>
                <div className="text-xs text-zinc-500">
                  {getFileExtension(fileInfo.name)} Dosyası
                </div>
              </div>
              <a
                href={value}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full p-1.5 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-700"
              >
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
            <button
              type="button"
              className="absolute -top-2 -right-2 rounded-full bg-white p-1 shadow-md hover:bg-red-50"
              onClick={clearFile}
            >
              <X className="h-4 w-4 text-red-500" />
            </button>
          </div>
        )}

        {/* Dosya URL veya Yükleme Alanı */}
        <div className="flex gap-x-2">
          <div className="flex-1">
            <input
              id={id}
              type="text"
              value={value || ""}
              onChange={handleChange}
              placeholder="Dosya URL'si"
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
