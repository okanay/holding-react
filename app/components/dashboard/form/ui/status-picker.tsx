import React, { useState } from "react";
import { createPortal } from "react-dom";
import { twMerge } from "tailwind-merge";
import { ChevronDown, X, Check, CircleDot } from "lucide-react";
import useClickOutside from "@/hooks/use-click-outside";

interface StatusOption {
  value: string;
  label: string;
  color: string; // "text-green-600 bg-green-50 border-green-200" formatında
}

interface StatusPickerProps {
  label?: string;
  helperText?: string;
  error?: string;
  isRequired?: boolean;
  containerClassName?: string;
  className?: string;
  options: StatusOption[];
  value: string;
  onChange: (value: string) => void;
  id?: string;
}

export const FormStatusPicker = ({
  label,
  helperText,
  error,
  isRequired = false,
  containerClassName,
  className,
  id,
  options,
  value,
  onChange,
}: StatusPickerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useClickOutside<HTMLDivElement>(() => {
    setIsOpen(false);
  }, isOpen);

  // Geçerli seçeneği bul
  const currentOption = options.find((option) => option.value === value);

  // Seçim yap
  const handleSelect = (selectedValue: string) => {
    onChange(selectedValue);
    setIsOpen(false);
  };

  // String'den sadece bg- kısmını çıkarma yardımcı fonksiyonu
  const extractColorClass = (colorString: string, prefix: string) => {
    const regex = new RegExp(`${prefix}[\\w-]+`);
    const match = colorString.match(regex);
    return match ? match[0] : "";
  };

  // Modal içeriği
  const modalContent = (
    <div className="fixed inset-0 z-1000 flex items-center justify-center bg-black/30">
      <div
        ref={ref}
        className="relative w-full max-w-sm rounded-lg bg-white p-6 shadow-lg"
      >
        <button
          className="absolute top-3 right-3 text-zinc-400 hover:text-zinc-600"
          onClick={() => setIsOpen(false)}
        >
          <X size={20} />
        </button>
        <div className="mb-4 text-lg font-semibold">
          {label || "Durum Seçin"}
        </div>
        <div className="mb-4 flex max-h-68 flex-col gap-2 overflow-y-auto">
          {options.map((option) => (
            <button
              key={option.value}
              className={twMerge(
                "flex items-center justify-between rounded px-3 py-2 text-sm transition-colors",
                value === option.value
                  ? "bg-primary-100 text-primary border-primary-200 border"
                  : "border border-zinc-200 bg-zinc-100 text-zinc-700 hover:bg-zinc-200",
              )}
              onClick={() => handleSelect(option.value)}
            >
              <span className="flex items-center gap-2">{option.label}</span>
              {value === option.value && (
                <Check
                  size={16}
                  className={twMerge(
                    value === option.value ? "text-primary" : "text-zinc-600",
                  )}
                />
              )}
            </button>
          ))}
          {options.length === 0 && (
            <div className="text-center text-sm text-zinc-400">
              Seçenek bulunmamaktadır
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // Mevcut seçim için renk sınıfları
  const currentTextColor = currentOption
    ? extractColorClass(currentOption.color, "text-")
    : "";
  const currentBgColor = currentOption
    ? extractColorClass(currentOption.color, "bg-")
    : "";
  const currentBorderColor = currentOption
    ? extractColorClass(currentOption.color, "border-")
    : "";

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

      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={twMerge(
          "flex h-10 w-full items-center justify-between rounded-md border bg-white px-3 py-2 text-left text-sm transition-all focus:outline-none",
          currentOption
            ? `${currentBorderColor} ${currentBgColor}`
            : "border-zinc-300",
          error && "border-red-300 bg-red-50/30",
          className,
        )}
      >
        <span className="flex items-center">
          {currentOption ? (
            <span className={currentTextColor}>{currentOption.label}</span>
          ) : (
            <span className="text-zinc-400">Seçiniz</span>
          )}
        </span>
        <ChevronDown size={18} className="text-zinc-400" />
      </button>

      {(error || helperText) && (
        <div className="flex items-center gap-1.5">
          <p className={`text-xs ${error ? "text-red-500" : "text-zinc-500"}`}>
            {error || helperText}
          </p>
        </div>
      )}

      {/* Modal Portal ile render ediliyor */}
      {isOpen && createPortal(modalContent, document.body)}
    </div>
  );
};

FormStatusPicker.displayName = "Form-StatusPicker";
