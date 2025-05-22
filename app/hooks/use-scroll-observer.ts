import { useState, useRef, useEffect } from "react";

type ScrollDirection = "up" | "down";
type ScrollPosition = "top" | "middle" | "bottom";

interface ScrollState {
  percentage: number;
  direction: ScrollDirection;
  position: ScrollPosition;
  scrollY: number;
  maxScroll: number;
  passed: boolean;
}

interface UseScrollObserverOptions {
  offset?: number;
}

function useScrollObserver(options: UseScrollObserverOptions = {}) {
  const [scrollState, setScrollState] = useState<ScrollState>({
    percentage: 0,
    direction: "down",
    position: "top",
    scrollY: 0,
    maxScroll: 0,
    passed: false,
  });

  const lastScrollY = useRef<number>(0);
  const offset = options.offset || 240;

  useEffect(() => {
    const calculateScrollState = (): void => {
      const scrollY = window.pageYOffset || document.documentElement.scrollTop;
      const maxScroll =
        Math.max(
          document.body.scrollHeight,
          document.documentElement.scrollHeight,
        ) - window.innerHeight;

      const percentage =
        maxScroll <= 0
          ? 0
          : Math.min(Math.max(0, (scrollY / maxScroll) * 100), 100);
      const direction: ScrollDirection =
        scrollY > lastScrollY.current ? "down" : "up";
      const position: ScrollPosition =
        percentage < 10 ? "top" : percentage > 90 ? "bottom" : "middle";
      const passed = scrollY > offset;

      setScrollState({
        percentage,
        direction,
        position,
        scrollY,
        maxScroll,
        passed,
      });

      lastScrollY.current = scrollY;
    };

    function debounce<T extends (...args: any[]) => void>(
      func: T,
      wait: number,
    ): (...args: Parameters<T>) => void {
      let timeout: ReturnType<typeof setTimeout> | undefined;
      return (...args: Parameters<T>) => {
        const later = () => {
          if (timeout) clearTimeout(timeout);
          func(...args);
        };
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(later, wait);
      };
    }

    const debouncedScroll = debounce(calculateScrollState, 20);

    // İlk yükleme
    calculateScrollState();

    window.addEventListener("scroll", debouncedScroll, { passive: true });
    window.addEventListener("resize", debouncedScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", debouncedScroll);
      window.removeEventListener("resize", debouncedScroll);
    };
  }, [offset]);

  return scrollState;
}

export default useScrollObserver;
