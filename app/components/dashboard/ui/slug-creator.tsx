import React, { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { Lock, Unlock, RotateCcw } from "lucide-react";
import { slugify } from "../helper";

interface Props
  extends Omit<React.ComponentProps<"input">, "onChange" | "value"> {
  label?: string;
  isRequired?: boolean;
  errorMessage?: string;
  hint?: string;
  autoMode?: boolean; // Başlangıçta otomatik mi?
  watchedValue: string; // Başlık gibi, watch ile gelen değer
  value: string; // Formun slug değeri
  onChange: (val: string) => void; // Formun setValue fonksiyonu
  containerClassName?: string;
}

export const SlugCreator = ({
  label = "Slug",
  isRequired = false,
  errorMessage,
  hint = "URL'de görünecek benzersiz tanımlayıcı. Özel karakterler ve boşluk içermemeli.",
  autoMode = true,
  watchedValue,
  value,
  onChange,
  containerClassName,
  ...props
}: Props) => {
  const [isAuto, setIsAuto] = useState(autoMode);

  // watchedValue değiştikçe ve otomatik modda ise slug'ı güncelle
  useEffect(() => {
    if (isAuto) {
      const newSlug = slugify(watchedValue || "");
      if (newSlug !== value) {
        onChange(newSlug);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchedValue, isAuto]);

  // Manuel input değişikliği
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = slugify(e.target.value);
    onChange(newValue);
  };

  // Başlıktan tekrar üret (manueldeyken)
  const regenerateFromWatched = () => {
    const newSlug = slugify(watchedValue || "");
    onChange(newSlug);
  };

  return (
    <div className={twMerge("flex flex-col gap-1.5", containerClassName)}>
      {label && (
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-zinc-700">
            {label}
            {isRequired && <span className="ml-1 text-red-500">*</span>}
          </label>
          <button
            type="button"
            onClick={() => setIsAuto((prev) => !prev)}
            className="flex items-center gap-1.5 rounded-full bg-zinc-100 px-2 py-1 text-xs font-medium text-zinc-600 transition-colors duration-200 hover:bg-zinc-200 hover:text-zinc-800"
          >
            {isAuto ? (
              <>
                <Lock size={12} className="text-amber-500" /> Düzenlemeyi Aç
              </>
            ) : (
              <>
                <Unlock size={12} className="text-green-500" /> Otomatik Düzenle
              </>
            )}
          </button>
        </div>
      )}

      <div
        className={twMerge(
          "group relative flex items-center rounded-md border border-zinc-300 transition-all focus-within:border-zinc-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-zinc-100",
          isAuto &&
            "pointer-events-none cursor-not-allowed bg-zinc-50 text-zinc-500",
          errorMessage ? "border-red-500 bg-red-50" : "",
        )}
      >
        <div className="pointer-events-none absolute left-3 font-medium text-zinc-400 select-none">
          /
        </div>
        <input
          {...props}
          readOnly={isAuto}
          value={value}
          onChange={handleInputChange}
          className={twMerge(
            "w-full resize-y rounded-md bg-transparent py-2 pr-14 pl-6 outline-none",
            props.className || "",
          )}
        />
        <div className="absolute right-2 flex items-center gap-1.5">
          {!isAuto && (
            <button
              type="button"
              onClick={regenerateFromWatched}
              className="rounded border border-zinc-200 bg-zinc-100 p-1 text-zinc-600 hover:bg-zinc-200 hover:text-zinc-700"
              title="Başlıktan yeniden oluştur"
            >
              <RotateCcw size={14} />
            </button>
          )}
        </div>
      </div>

      {(errorMessage || hint) && (
        <div className="flex items-center gap-1.5">
          <p
            className={`text-xs ${errorMessage ? "text-red-500" : "text-zinc-500"}`}
          >
            {errorMessage || hint}
          </p>
        </div>
      )}
    </div>
  );
};

SlugCreator.displayName = "SlugCreator";
