import React, { useState } from "react";
import { twMerge } from "tailwind-merge";

interface StatusOption {
  value: string;
  label: string;
  color: string;
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

  // Geçerli seçeneği bul
  const currentOption = options.find((option) => option.value === value);

  // Seçim yap
  const handleSelect = (selectedValue: string) => {
    onChange(selectedValue);
    setIsOpen(false);
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

      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={twMerge(
            "flex w-full items-center justify-between rounded-md border px-4 py-2 text-left",
            currentOption ? `border-${currentOption.color}` : "border-zinc-300",
            error && "border-red-300 bg-red-50/30",
            className,
          )}
        >
          <span className={currentOption?.color || "text-zinc-600"}>
            {currentOption ? currentOption.label : "Seçiniz"}
          </span>
          <svg
            className="h-5 w-5 text-zinc-400"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
          >
            <path
              d="M7 7l3 3 3-3"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* Dropdown */}
        {isOpen && (
          <div className="absolute z-10 mt-1 w-full rounded-md border border-zinc-200 bg-white shadow-lg">
            <div className="p-1">
              {options.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleSelect(option.value)}
                  className={`flex w-full items-center rounded-md px-4 py-2 text-left text-sm hover:bg-zinc-100 ${
                    value === option.value ? "bg-zinc-100" : ""
                  }`}
                >
                  <span
                    className={`mr-2 inline-block h-2 w-2 rounded-full ${option.color.replace(
                      "text-",
                      "bg-",
                    )}`}
                  ></span>
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {(error || helperText) && (
        <div className="flex items-center gap-1.5">
          <p className={`text-xs ${error ? "text-red-500" : "text-zinc-500"}`}>
            {error || helperText}
          </p>
        </div>
      )}
    </div>
  );
};

FormStatusPicker.displayName = "Form-StatusPicker";
