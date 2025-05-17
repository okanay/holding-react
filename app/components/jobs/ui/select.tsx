import useClickOutside from "@/hooks/use-click-outside";
import { CheckCircle2, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";

type Props = {
  label: string;
  options: string[];
  value?: string;
  onChange?: (option: string) => void;
};

export const Select: React.FC<Props> = ({
  label,
  options,
  value,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(value || "");

  // Dışarıdan gelen value değeri değiştiğinde state'i güncelle
  useEffect(() => {
    if (value !== undefined) {
      setSelectedOption(value);
    }
  }, [value]);

  const ref = useClickOutside<HTMLDivElement>(() => {
    setIsOpen(false);
  });

  const handleSelect = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
    if (onChange) onChange(option);
  };

  // Tüm seçenekleri içeren genişletilmiş dizi
  const allOptions = [""].concat(options);

  return (
    <div className="relative">
      <button
        type="button"
        className="focus:ring-primary-300 flex w-full items-center justify-between rounded border border-zinc-200 bg-white px-4 py-3 text-left transition focus:ring-2 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-2">
          {selectedOption === "" ? (
            <span className="ml-1 text-zinc-400">{label}</span>
          ) : (
            <span className="ml-1 line-clamp-1 text-zinc-700">
              {selectedOption}
            </span>
          )}
        </div>
        <ChevronDown
          size={20}
          className={`ml-2 text-zinc-400 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div
          ref={ref}
          className="animate-fade-in absolute z-20 mt-2 w-full rounded border border-zinc-200 bg-white shadow-xl"
        >
          <ul className="max-h-60 overflow-auto py-2">
            {allOptions.map((option, index) => (
              <li
                key={index}
                className={`line-clamp-1 flex cursor-pointer items-center justify-between px-4 py-2 text-xs transition-colors ${
                  option === selectedOption
                    ? "bg-primary-50 text-primary-600 font-medium"
                    : option === ""
                      ? "text-zinc-500 hover:bg-zinc-100"
                      : "text-zinc-700 hover:bg-zinc-100"
                }`}
                onClick={() => handleSelect(option)}
              >
                <span className="line-clamp-1">
                  {option === "" ? "All" : option}
                </span>
                {option === selectedOption && (
                  <CheckCircle2
                    size={16}
                    className="text-primary-600 ml-2 shrink-0"
                  />
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
