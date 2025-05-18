import React from "react";
import { twMerge } from "tailwind-merge";

interface TextareaProps extends React.ComponentProps<"textarea"> {
  label?: string;
  helperText?: string;
  error?: string;
  isRequired?: boolean;
  containerClassName?: string;
}

export const FormTextarea = ({
  label,
  helperText,
  error,
  isRequired = false,
  containerClassName,
  className,
  id,
  ...props
}: TextareaProps) => {
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
          "focus-within:border-primary-400 focus-within:ring-primary-400/20 relative rounded-md border border-zinc-300 transition-all focus-within:ring-2",
          error && "border-red-300 bg-red-50/30",
        )}
      >
        <textarea
          id={id}
          {...props}
          className={twMerge(
            "min-h-[80px] w-full resize-y rounded-md bg-transparent px-3 py-2 outline-none",
            className,
          )}
        />
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

FormTextarea.displayName = "Form-Textarea";
