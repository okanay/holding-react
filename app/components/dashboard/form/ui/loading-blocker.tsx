import { Loader2 } from "lucide-react";
import { createPortal } from "react-dom";

type LoadingProps = {
  loading: boolean;
  label: string;
};

export const LoadingBlocker = ({ loading, label }: LoadingProps) => {
  if (typeof window === "undefined") return null;
  return createPortal(
    <div
      aria-disabled={loading}
      className="pointer-events-none fixed inset-0 z-[1000] flex items-center justify-center bg-gray-950/10 opacity-0 backdrop-blur-sm aria-disabled:pointer-events-auto aria-disabled:opacity-100"
    >
      {loading && (
        <div className="flex flex-col items-center">
          <Loader2 className="h-6 w-6 animate-spin text-gray-700" />
          <span className="mt-2 text-sm text-gray-700">
            {label || "Blog Oluşturuluyor, Lütfen Bekleyin..."}
          </span>
        </div>
      )}
    </div>,
    document.body,
  );
};
