import { useSnapScroll } from "@/hooks/use-snap-scroll";
import { ChevronLeft, ChevronRight } from "lucide-react";

export type Value = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

const ValueCard: React.FC<Value> = ({ icon, title, description }) => (
  <div className="border-primary-700 focus-within:border-primary-700 hover:border-primary-800 flex h-full flex-col items-center border-b-4 bg-white p-8 transition">
    <div className="bg-primary-50 mb-6 flex size-14 items-center justify-center rounded-full">
      {icon}
    </div>
    <h3 className="mb-3 text-xl font-bold text-gray-900">{title}</h3>
    <p className="text-center text-base text-gray-700">{description}</p>
  </div>
);

// Values Slider
export const ValuesSlider: React.FC<{ values: Value[] }> = ({ values }) => {
  const {
    containerRef,
    cardRefs,
    btnLeftRef,
    btnRightRef,
    handleScrollLeft,
    handleScrollRight,
  } = useSnapScroll({
    gap: 24,
    behavior: "smooth",
    updateOnMount: true,
    dependencies: [values.length],
  });

  const setCardRef = (index: number) => (el: HTMLLIElement | null) => {
    if (cardRefs.current) {
      cardRefs.current[index] = el;
    }
  };

  return (
    <div className="wheel-container relative">
      {/* Navigation Buttons */}
      <button
        ref={btnLeftRef}
        onClick={handleScrollLeft}
        className="text-primary-700 hover:border-primary-700 hover:bg-primary-50 absolute top-1/2 left-0 z-10 flex -translate-y-1/2 items-center justify-center rounded-full border border-gray-300 bg-white p-2 shadow transition aria-disabled:cursor-not-allowed aria-disabled:opacity-20"
        aria-label="Scroll left"
      >
        <ChevronLeft className="size-5" />
      </button>
      <button
        ref={btnRightRef}
        onClick={handleScrollRight}
        className="text-primary-700 hover:border-primary-700 hover:bg-primary-50 absolute top-1/2 right-0 z-10 flex -translate-y-1/2 items-center justify-center rounded-full border border-gray-300 bg-white p-2 shadow transition aria-disabled:cursor-not-allowed aria-disabled:opacity-20"
        aria-label="Scroll right"
      >
        <ChevronRight className="size-5" />
      </button>
      {/* Scrollable Values Container */}
      <div className="overflow-x-hidden pb-8">
        <ul
          ref={containerRef as React.RefObject<HTMLUListElement>}
          className="wheel-scroll scrollbar-x-hidden flex snap-x snap-mandatory gap-6 overflow-x-auto px-2"
        >
          {values.map((value, idx) => (
            <li
              key={idx}
              ref={setCardRef(idx)}
              className="w-[300px] flex-shrink-0 snap-center"
            >
              <ValueCard {...value} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
