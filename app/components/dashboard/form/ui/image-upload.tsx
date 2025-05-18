import React, { useState } from "react";
import { twMerge } from "tailwind-merge";
import { ImagePlus, X, Upload } from "lucide-react";
import { ImageType } from "@/components/image/types";
import ImageModal from "@/components/image";

interface ImageUploaderProps {
  label?: string;
  helperText?: string;
  error?: string;
  isRequired?: boolean;
  containerClassName?: string;
  className?: string;
  value?: string;
  onChange?: (value: string) => void;
  id?: string;
  previewSize?: "small" | "medium" | "large";
  onImageSelect?: (image: ImageType) => void;
  onImageClear?: () => void;
  portalId?: string;
}

export const FormImageUploader: React.FC<ImageUploaderProps> = ({
  label,
  helperText,
  error,
  isRequired = false,
  containerClassName,
  className,
  value,
  onChange,
  id,
  previewSize = "medium",
  onImageSelect,
  onImageClear,
  portalId,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // URL değişikliğini ele al
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  // Görüntüyü temizle
  const clearImage = () => {
    if (onChange) {
      onChange("");
    }

    if (onImageClear) {
      onImageClear();
    }
  };

  // Modaldan görsel seçildiğinde
  const handleImageSelect = (image: ImageType) => {
    if (onChange && image?.url) {
      onChange(image.url);
    }

    if (onImageSelect) {
      onImageSelect(image);
    }

    setIsModalOpen(false);
  };

  // Önizleme boyutu ayarları
  const previewSizeClass = {
    small: "aspect-video max-h-32",
    medium: "aspect-video max-h-48",
    large: "aspect-video max-h-64",
  }[previewSize];

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
            <div
              className={`relative mx-auto flex items-center justify-center overflow-hidden rounded bg-zinc-100 ${previewSizeClass}`}
            >
              <img
                src={value}
                alt="Görsel Önizleme"
                className="h-full w-full object-contain"
                onError={(e) => {
                  // Hatalı görsel için placeholder
                  e.currentTarget.src =
                    "https://placehold.co/600x400?text=Önizleme+Yüklenemedi";
                }}
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

        {/* Görsel URL ve Medya Kütüphanesi Butonu */}
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
          <div className="flex gap-2">
            <button
              type="button"
              className="border-cover flex items-center gap-1 rounded-md border bg-zinc-50 px-3 text-sm font-medium text-zinc-700 hover:bg-zinc-100"
              onClick={() => setIsModalOpen(true)}
            >
              <ImagePlus className="h-4 w-4" />
              <span className="hidden sm:inline">Galeri</span>
            </button>
          </div>
        </div>

        {(error || helperText) && (
          <div className="flex items-center gap-1.5">
            <p
              className={`text-xs ${error ? "text-red-500" : "text-zinc-500"}`}
            >
              {error || helperText}
            </p>
          </div>
        )}
      </div>

      {/* Görsel Seçme Modalı */}
      <ImageModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onImageSelect={handleImageSelect}
        singleSelect={true}
        title="Görsel Seç"
        portalId={portalId}
      />
    </div>
  );
};

export default FormImageUploader;
