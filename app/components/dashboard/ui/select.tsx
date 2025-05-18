import React, { useState } from "react";
import { createPortal } from "react-dom";
import { twMerge } from "tailwind-merge";
import { ChevronDown, X, Plus } from "lucide-react";
import useClickOutside from "@/hooks/use-click-outside";

interface SelectOption {
  value: string;
  label: string;
}

interface Props extends React.ComponentProps<"select"> {
  label?: string;
  helperText?: string;
  error?: string;
  isRequired?: boolean;
  containerClassName?: string;
  options: SelectOption[];
  selectedValues: string[];
  placeholder?: string;
  onCreateOption?: (input: string) => Promise<SelectOption>;
  onCreateActive?: boolean;
}

export const FormSingleSelect = ({
  label,
  helperText,
  error,
  isRequired = false,
  containerClassName,
  className,
  options,
  value,
  onChange,
  placeholder = "Seçiniz",
  onCreateOption,
  onCreateActive = false,
}: Props) => {
  const [open, setOpen] = useState(false);
  const ref = useClickOutside<HTMLDivElement>(() => {
    setOpen(false);
  }, open);
  const [selected, setSelected] = useState<string | undefined>(value as any);
  const [localOptions, setLocalOptions] = useState<SelectOption[]>(
    options as any,
  );
  const [newOptionInput, setNewOptionInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);

  const handleSelect = (val: any) => {
    setSelected(val);
    setOpen(false);
    onChange?.(val);
  };

  const handleCreateOption = async () => {
    if (!newOptionInput.trim()) return;
    setLoading(true);
    setCreateError(null);
    try {
      const created = await onCreateOption(newOptionInput.trim());
      setLocalOptions((prev) => [...prev, created]);
      setNewOptionInput("");
    } catch (err: any) {
      setCreateError(
        err?.message || "Yeni seçenek eklenirken bir hata oluştu.",
      );
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    setLocalOptions(options as any);
  }, [options]);

  // Modal içeriği
  const modalContent = (
    <div className="fixed inset-0 z-1000 flex items-center justify-center bg-black/30">
      <div
        ref={ref}
        className="relative w-full max-w-sm rounded-lg bg-white p-6 shadow-lg"
      >
        <button
          className="absolute top-3 right-3 text-zinc-400 hover:text-zinc-600"
          onClick={() => setOpen(false)}
        >
          <X size={20} />
        </button>
        <div className="mb-4 text-lg font-semibold">{label || placeholder}</div>
        <div className="mb-4 flex max-h-68 flex-col gap-2 overflow-y-auto">
          {localOptions.map((option) => (
            <button
              key={option.value}
              className={twMerge(
                "flex items-center gap-2 rounded px-3 py-2 text-sm transition-colors",
                selected === option.value
                  ? "bg-primary-100 text-primary-700 border-primary-200 border"
                  : "border border-zinc-200 bg-zinc-100 text-zinc-700 hover:bg-zinc-200",
              )}
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </button>
          ))}
          {localOptions.length === 0 && (
            <div className="text-center text-sm text-zinc-400">
              Seçenek bulunmamaktadır
            </div>
          )}
        </div>
        {onCreateActive ? (
          <div className="mt-2 flex items-center gap-2">
            <input
              type="text"
              className="flex-1 rounded border border-zinc-300 px-2 py-1 text-sm"
              placeholder="Yeni seçenek ekle"
              value={newOptionInput}
              onChange={(e) => setNewOptionInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleCreateOption();
              }}
              disabled={loading}
            />
            <button
              className="bg-primary-600 hover:bg-primary-700 flex items-center gap-1 rounded px-3 py-1 text-sm text-white disabled:opacity-50"
              onClick={handleCreateOption}
              disabled={loading || !newOptionInput.trim()}
              type="button"
            >
              <Plus size={16} />
              Ekle
            </button>
          </div>
        ) : null}
        {createError && (
          <div className="mt-1 text-xs text-red-500">{createError}</div>
        )}
      </div>
    </div>
  );

  return (
    <div className={twMerge("flex flex-col gap-1.5", containerClassName)}>
      {label && (
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-zinc-700">
            {label}
            {isRequired && <span className="ml-1 text-red-500">*</span>}
          </label>
          {error && <span className="text-xs text-red-500">{error}</span>}
        </div>
      )}

      <button
        type="button"
        className={twMerge(
          "flex h-10 w-full items-center justify-between rounded-md border border-zinc-300 bg-white px-3 py-2 text-left text-sm transition-all focus:outline-none",
          error && "border-red-300 bg-red-50/30",
          className,
        )}
        onClick={() => setOpen(true)}
      >
        <span>
          {selected ? (
            localOptions.find((o) => o.value === selected)?.label
          ) : (
            <span className="text-zinc-400">{placeholder}</span>
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
      {open && createPortal(modalContent, document.body)}
    </div>
  );
};
