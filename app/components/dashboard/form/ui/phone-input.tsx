import React, { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

interface PhoneInputProps {
  value: string;
  onChange: (val: string) => void;
  label?: string;
  error?: string;
  helperText?: string;
  isRequired?: boolean;
  id?: string;
  defaultCountry?: string; // "TR" gibi, opsiyonel
  className?: string;
  containerClassName?: string;
}

export const PhoneInput: React.FC<PhoneInputProps> = ({
  value,
  onChange,
  label,
  error,
  helperText,
  isRequired = false,
  id,
  defaultCountry = "TR",
  className,
  containerClassName,
}) => {
  // Alan kodu ve telefon numarası için state'ler
  const [countryCode, setCountryCode] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  // Alan kodu değiştiğinde
  const handleCountryCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Sadece sayı ve boşluk kabul et
    const newCode = e.target.value.replace(/[^\d ]/g, "");
    setCountryCode(newCode);

    // Tam değeri birleştir ve üst bileşene bildir (alan kodu ve numara arasında boşluk olacak şekilde)
    const fullValue = `+${newCode} ${phoneNumber}`;
    onChange(fullValue);
  };

  // Telefon numarası değiştiğinde
  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Sadece sayı ve boşluk kabul et
    const newPhone = e.target.value.replace(/[^\d ]/g, "");
    setPhoneNumber(newPhone);

    // Tam değeri birleştir ve üst bileşene bildir (alan kodu ve numara arasında boşluk olacak şekilde)
    const fullValue = `+${countryCode} ${newPhone}`;
    onChange(fullValue);
  };

  return (
    <div className={twMerge("flex flex-col gap-1.5", containerClassName)}>
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-zinc-700">
          {label}
          {isRequired && <span className="ml-1 text-red-500">*</span>}
        </label>
      )}
      <div
        className={twMerge(
          "focus-within:border-primary-400 focus-within:ring-primary-400/20 relative flex h-10 items-center gap-2 overflow-hidden rounded-md border border-zinc-300 bg-white transition-all focus-within:ring-2",
          error && "border-red-300 bg-red-50/30",
        )}
      >
        {/* Alan kodu */}
        <div className="flex h-full items-center">
          <span className="border-cover flex h-full flex-col items-center justify-center border-r bg-zinc-100 px-2 text-base font-medium text-zinc-500">
            +
          </span>
          <input
            type="text"
            inputMode="numeric"
            autoComplete="tel-country-code"
            className={twMerge(
              "border-cover h-full w-14 border-r bg-transparent text-center text-sm outline-none",
            )}
            placeholder="90"
            aria-label="Alan kodu"
            id={id ? id + "-country" : undefined}
            value={countryCode}
            onChange={handleCountryCodeChange}
          />
        </div>
        {/* Telefon numarası */}
        <input
          type="text"
          inputMode="numeric"
          autoComplete="tel-national"
          className={twMerge(
            "flex-1 bg-transparent text-sm outline-none",
            className,
          )}
          placeholder="5XX XXX XX XX"
          aria-label="Telefon numarası"
          id={id}
          value={phoneNumber}
          onChange={handlePhoneNumberChange}
        />
      </div>
      <div className="flex items-center gap-1.5">
        {error ? (
          <p className="text-xs text-red-500">{error}</p>
        ) : helperText ? (
          <p className="text-xs text-zinc-500">{helperText}</p>
        ) : null}
      </div>
    </div>
  );
};
