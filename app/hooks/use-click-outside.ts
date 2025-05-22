import { useEffect, useRef, RefObject } from "react";

type Handler = (event: MouseEvent | TouchEvent) => void;

function useClickOutside<T extends HTMLElement = HTMLElement>(
  handler: Handler,
  active: boolean = true,
  excludeRefs: RefObject<HTMLElement>[] = [],
): RefObject<T | null> {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!active) return;

    const listener = (event: MouseEvent | TouchEvent) => {
      const el = ref.current;

      // Ana element tıklamayı içeriyorsa dışarıda değil demektir
      if (!el || el.contains(event.target as Node)) {
        return;
      }

      // Eğer hariç tutulan elementlerden birine tıklandıysa, dışarıda değil demektir
      const clickInExcludedRefs = excludeRefs.some(
        (excludeRef) =>
          excludeRef.current &&
          excludeRef.current.contains(event.target as Node),
      );

      if (clickInExcludedRefs) {
        return;
      }

      handler(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [handler, active, excludeRefs]);

  return ref;
}

export default useClickOutside;
