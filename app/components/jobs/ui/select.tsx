import useClickOutside from "@/hooks/use-click-outside";
import { Check, CheckCircle2, ChevronDown } from "lucide-react";
import { useState } from "react";

// Custom Select Component
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
  const [selectedOption, setSelectedOption] = useState("");
  const ref = useClickOutside<HTMLDivElement>(() => {
    setIsOpen(!isOpen), isOpen;
  });

  const handleSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    if (onChange) onChange(option);
  };

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
            <span className="ml-1 text-zinc-700">{selectedOption}</span>
          )}
        </div>
        <ChevronDown
          size={20}
          className={`ml-2 text-zinc-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div
          ref={ref}
          className="animate-fade-in absolute z-20 mt-2 w-full rounded-lg border border-zinc-200 bg-white shadow-xl"
        >
          <ul className="max-h-60 overflow-auto py-2">
            <li
              className={`cursor-pointer rounded-md px-4 py-2 text-sm transition-colors ${
                selectedOption === ""
                  ? "bg-primary-50 text-primary-600 flex items-center"
                  : "text-zinc-500 hover:bg-zinc-100"
              }`}
              onClick={() => handleSelect("")}
            >
              {selectedOption === "" ? (
                <>
                  <Check size={16} className="text-primary-600 mr-2" />
                  Tümü
                </>
              ) : (
                "Tümü"
              )}
            </li>
            {options.map((option, index) => (
              <li
                key={index}
                className={`flex cursor-pointer items-center rounded-md px-4 py-2 text-sm transition-colors ${
                  option === selectedOption
                    ? "bg-primary-50 text-primary-600 font-medium"
                    : "text-zinc-700 hover:bg-zinc-100"
                }`}
                onClick={() => handleSelect(option)}
              >
                {option === selectedOption && (
                  <CheckCircle2 size={16} className="text-primary-600 mr-2" />
                )}
                {option}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
