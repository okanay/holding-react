import React from "react";
import { format } from "date-fns";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";
import { createPortal } from "react-dom";
import { twMerge } from "tailwind-merge";
import { DayPicker } from "react-day-picker";

type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={twMerge("p-4", className)}
      classNames={{
        months:
          "flex flex-col sm:flex-row gap-6 sm:gap-8 justify-center items-center",
        month: "space-y-4",
        caption:
          "flex justify-center pt-1 relative items-center gap-2 select-none",
        caption_label: "text-base font-semibold text-zinc-800",
        nav: "flex items-center gap-2",
        nav_button:
          "h-8 w-8 bg-zinc-100 hover:bg-primary-100 transition-colors duration-150 p-0 rounded border border-zinc-200 shadow-sm focus:outline-none",
        nav_button_previous: "absolute left-2 flex items-center justify-center",
        nav_button_next: "absolute right-2 flex items-center justify-center",
        table: "w-full border-collapse",
        head_row: "flex",
        head_cell:
          "text-zinc-400 font-medium w-10 h-10 flex items-center justify-center text-xs uppercase tracking-wide",
        row: "flex w-full",
        cell: "relative p-0 text-center text-sm",
        day: "h-10 w-10 flex items-center justify-center font-medium rounded transition-colors duration-100 hover:text-primary-500 focus:outline-none",
        day_selected:
          "bg-primary-500 text-white focus:bg-primary-600 hover:!text-red-500 hover:!bg-red-100",
        day_today: "border border-zinc-300 bg-zinc-200 text-zinc-950 font-bold",
        day_outside:
          "text-zinc-300 hover:bg-zinc-100 aria-selected:bg-primary-100",
        day_disabled: "text-zinc-300 opacity-50",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: () => <ChevronLeft className="size-5" />,
        IconRight: () => <ChevronRight className="size-5" />,
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

interface ModalDatePickerProps {
  value: Date | null;
  onChange: (date: Date | null) => void;
  label?: string;
  helperText?: string;
  error?: string;
  id?: string;
  isRequired?: boolean;
  containerClassName?: string;
  minDate?: Date;
  maxDate?: Date;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const ModalDatePicker: React.FC<ModalDatePickerProps> = ({
  value,
  onChange,
  label,
  helperText,
  error,
  id,
  isRequired = false,
  containerClassName,
  minDate,
  maxDate,
  leftIcon = <CalendarDays className="h-5 w-5 text-zinc-400" />,
  rightIcon,
}) => {
  const [open, setOpen] = React.useState(false);
  const modalRef = React.useRef<HTMLDivElement>(null);

  // Dışarı tıklayınca kapansın
  React.useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  // Escape ile kapansın
  React.useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open]);

  // minDate ve maxDate için disabled fonksiyonu
  const disabledDays = [
    minDate && { before: minDate },
    maxDate && { after: maxDate },
  ].filter(Boolean);

  // Modal içeriği
  const modalContent = (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/30 transition-all">
      <div
        ref={modalRef}
        className="animate-in fade-in-0 zoom-in-95 w-full max-w-xs rounded-lg border border-zinc-100 bg-white p-6 shadow-2xl transition-all duration-200"
      >
        <Calendar
          mode="single"
          selected={value ?? undefined}
          onSelect={(date) => {
            setOpen(false);
            onChange(date ?? null);
          }}
          initialFocus
          disabled={disabledDays}
        />
      </div>
    </div>
  );

  // FormInput'a benzer input görünümü
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

      <div
        className={twMerge(
          "focus-within:border-primary-400 focus-within:ring-primary-400/20 relative flex h-10 items-center rounded-md border border-zinc-300 transition-all focus-within:ring-2",
          error && "border-red-300 bg-red-50/30",
        )}
      >
        {leftIcon && (
          <div className="pointer-events-none absolute left-3 text-zinc-400">
            {leftIcon}
          </div>
        )}

        <button
          type="button"
          id={id}
          className={twMerge(
            "w-full rounded-md bg-transparent py-2 text-left outline-none",
            leftIcon ? "pl-10" : "pl-3",
            rightIcon ? "pr-10" : "pr-3",
          )}
          onClick={() => setOpen(true)}
        >
          <span className={value ? "text-zinc-900" : "text-zinc-400"}>
            {value ? format(value, "yyyy-MM-dd") : "Tarih seçiniz"}
          </span>
        </button>

        {rightIcon && (
          <div className="absolute right-3 text-zinc-400">{rightIcon}</div>
        )}
      </div>

      {(error || helperText) && (
        <div className="flex items-center gap-1.5">
          <p className={`text-xs ${error ? "text-red-500" : "text-zinc-500"}`}>
            {error || helperText}
          </p>
        </div>
      )}

      {open && createPortal(modalContent, document.body)}
    </div>
  );
};

ModalDatePicker.displayName = "ModalDatePicker";
