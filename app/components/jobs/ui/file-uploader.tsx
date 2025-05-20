import React, { useState, useRef, useEffect } from "react";
import { twMerge } from "tailwind-merge";
import { FileText, X, Loader, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";

const SUPPORTED_FILE_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

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
}

export const FileUploader: React.FC<FileUploaderProps> = ({
  label = "Resume/CV",
  helperText = "PDF or Word document (max. 10MB)",
  error,
  isRequired = false,
  containerClassName,
  className,
  value,
  onChange,
  id = "resume-upload",
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string>("");
  const [fileName, setFileName] = useState<string>("");
  const [fileSize, setFileSize] = useState<string>("");
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [uploadError, setUploadError] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Dosya URL'si değiştiğinde dosya adını ve ikonunu güncelle
  useEffect(() => {
    if (value) {
      const urlParts = value.split("/");
      const extractedFileName = urlParts[urlParts.length - 1];
      setFileName(extractedFileName);

      let iconUrl = "";
      if (extractedFileName.toLowerCase().endsWith(".pdf")) {
        iconUrl = "/icons/pdf-icon.svg";
      } else if (
        extractedFileName.toLowerCase().endsWith(".doc") ||
        extractedFileName.toLowerCase().endsWith(".docx")
      ) {
        iconUrl = "/icons/word-icon.svg";
      }
      setFilePreview(iconUrl || "/icons/document-icon.svg");
    }
  }, [value]);

  // Dosya seçimi
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    if (!SUPPORTED_FILE_TYPES.includes(selectedFile.type)) {
      setUploadError(
        "Unsupported file type. Please upload a PDF or Word document.",
      );
      setFile(null);
      return;
    }
    if (selectedFile.size > MAX_FILE_SIZE) {
      setUploadError("File size is too large. Maximum allowed is 10MB.");
      setFile(null);
      return;
    }

    setUploadError("");
    setFile(selectedFile);
    setFileName(selectedFile.name);
    setFileSize(formatFileSize(selectedFile.size));

    if (selectedFile.type === "application/pdf") {
      setFilePreview("/icons/pdf-icon.svg");
    } else if (
      selectedFile.type === "application/msword" ||
      selectedFile.type ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      setFilePreview("/icons/word-icon.svg");
    } else {
      setFilePreview("/icons/document-icon.svg");
    }

    handleUpload(selectedFile);
  };

  // Dosya boyutunu okunabilir formata çevir
  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + " bytes";
    else if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    else return (bytes / (1024 * 1024)).toFixed(2) + " MB";
  };

  // Dosya yükleme işlemi
  const handleUpload = async (fileToUpload: File) => {
    setIsUploading(true);
    setUploadProgress(0);

    try {
      const API_URL_BASE =
        import.meta.env.VITE_APP_BACKEND_URL || "http://localhost:8080";

      // 1. Presigned URL al
      const presignedResponse = await axios.post(
        `${API_URL_BASE}/public/files/presigned-url`,
        {
          filename: fileToUpload.name, // Uzantı dahil, olduğu gibi gönder
          contentType: fileToUpload.type,
          sizeInBytes: fileToUpload.size,
          fileCategory: "resumes",
        },
        {
          validateStatus: () => true,
        },
      );

      if (presignedResponse.status === 429) {
        setUploadError("Too many upload attempts. Please try again later.");
        setIsUploading(false);
        return;
      }
      if (!presignedResponse.data?.success || !presignedResponse.data?.data) {
        setUploadError(
          presignedResponse.data?.message || "Failed to get upload URL.",
        );
        setIsUploading(false);
        return;
      }

      const {
        id: signatureId,
        presignedUrl,
        uploadUrl,
      } = presignedResponse.data.data;

      // 2. Dosyayı presigned URL'e yükle
      await axios.put(presignedUrl, fileToUpload, {
        headers: {
          "Content-Type": fileToUpload.type,
        },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const percentComplete = Math.round(
              (progressEvent.loaded / progressEvent.total) * 100,
            );
            setUploadProgress(percentComplete);
          }
        },
      });

      // 3. Yüklemeyi onayla
      const confirmResponse = await axios.post(
        `${API_URL_BASE}/public/files/confirm-upload`,
        {
          signatureId,
          url: uploadUrl,
          fileCategory: "resumes",
          sizeInBytes: fileToUpload.size,
        },
        {
          validateStatus: () => true,
        },
      );

      if (confirmResponse.status === 429) {
        setUploadError("Too many requests. Please try again later.");
        setIsUploading(false);
        return;
      }
      if (!confirmResponse.data?.success) {
        setUploadError(
          confirmResponse.data?.message || "Failed to confirm file upload.",
        );
        setIsUploading(false);
        return;
      }

      setIsUploading(false);
      setUploadProgress(100);

      if (onChange) {
        onChange(uploadUrl);
      }
      toast.success("CV uploaded successfully", {
        description: fileToUpload.name,
      });
    } catch (error: any) {
      handleUploadError(error);
    }
  };

  // Hata yönetimi
  const handleUploadError = (error: any) => {
    setIsUploading(false);
    setUploadProgress(0);
    const errorMessage =
      error instanceof Error
        ? error.message
        : error?.response?.data?.message || "An unknown error occurred";
    setUploadError(errorMessage);
    toast.error("File upload error", {
      description: errorMessage,
    });
  };

  // Dosya temizleme
  const clearFile = () => {
    setFile(null);
    setFileName("");
    setFileSize("");
    setFilePreview("");
    setUploadProgress(0);
    setUploadError("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    if (onChange) {
      onChange("");
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
        </div>
      )}

      <div className="space-y-3">
        {value && (
          <div className="relative rounded-md border border-zinc-200 bg-zinc-50 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-zinc-100">
                <FileText className="h-6 w-6 text-zinc-500" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-medium text-zinc-800">
                  {fileName}
                </div>
                {fileSize && (
                  <div className="text-xs text-zinc-500">{fileSize}</div>
                )}
              </div>
              <button
                type="button"
                className="text-zinc-400 transition-colors hover:text-red-500"
                onClick={clearFile}
                aria-label="Remove file"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}

        {uploadError && (
          <div className="rounded-md border border-red-200 bg-red-50 p-3">
            <div className="flex">
              <div className="flex-shrink-0">
                <AlertCircle className="h-5 w-5 text-red-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{uploadError}</p>
              </div>
            </div>
          </div>
        )}

        {!value && !isUploading && (
          <div
            className="hover:border-primary cursor-pointer rounded-md border-2 border-dashed border-zinc-300 px-6 pt-5 pb-6 transition-colors"
            onClick={() => fileInputRef.current?.click()}
          >
            <div className="space-y-1 text-center">
              <svg
                className="mx-auto h-12 w-12 text-zinc-400"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div className="flex justify-center text-sm text-zinc-600">
                <label
                  htmlFor={id}
                  className="text-primary hover:text-primary-dark relative cursor-pointer rounded-md font-medium"
                >
                  <span>Upload Resume/CV</span>
                </label>
              </div>
              <p className="text-xs text-zinc-500">PDF or Word (.docx, .doc)</p>
            </div>
            <input
              id={id}
              ref={fileInputRef}
              type="file"
              onChange={handleFileChange}
              accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              className="sr-only"
            />
          </div>
        )}

        {isUploading && (
          <div className="rounded-md border border-zinc-200 bg-zinc-50 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-zinc-100">
                <Loader className="text-primary h-6 w-6 animate-spin" />
              </div>
              <div className="flex-1">
                <div className="mb-1 flex items-center justify-between">
                  <div className="truncate text-sm font-medium text-zinc-800">
                    {fileName}
                  </div>
                  <div className="text-xs font-medium text-zinc-700">
                    {uploadProgress}%
                  </div>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-zinc-200">
                  <div
                    className="bg-primary h-full rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {(error || helperText) && !uploadError && (
          <div className="flex items-center gap-1.5">
            <p
              className={`text-xs ${error ? "text-red-500" : "text-zinc-500"}`}
            >
              {error || helperText}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
