import React from "react";
import { twMerge } from "tailwind-merge";

interface InputProps extends React.ComponentProps<"input"> {
  label?: string;
  helperText?: string;
  error?: string;
  isRequired?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerClassName?: string;
}

export const FormInput = ({
  label,
  helperText,
  error,
  isRequired = false,
  leftIcon,
  rightIcon,
  containerClassName,
  className,
  id,
  ...props
}: InputProps) => {
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
          "focus-within:border-primary-400 focus-within:ring-primary-400/20 relative flex items-center rounded-md border border-zinc-300 transition-all focus-within:ring-2",
          error && "border-red-300 bg-red-50/30",
        )}
      >
        {leftIcon && (
          <div className="pointer-events-none absolute left-3 text-zinc-400">
            {leftIcon}
          </div>
        )}

        <input
          id={id}
          {...props}
          className={twMerge(
            "h-10 w-full rounded-md bg-transparent py-2 outline-none",
            leftIcon ? "pl-10" : "pl-3",
            rightIcon ? "pr-10" : "pr-3",
            className,
          )}
        />

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
    </div>
  );
};

FormInput.displayName = "Form-Input";
