import React from "react";
import { Heart, ChevronLeft, ChevronRight } from "lucide-react";
import { useSnapScroll } from "@/hooks/use-snap-scroll";

type Stat = {
  icon: React.ReactNode;
  value: string | number;
  valueColor: string;
  barColor: string;
  gradient: string;
  description: string;
};

const stats: Stat[] = [
  {
    icon: <Heart className="text-primary-400 size-8" />,
    value: 95,
    valueColor: "text-primary-600 group-hover:text-primary-600",
    barColor: "bg-primary-400 group-hover:bg-primary-400",
    gradient:
      "bg-gradient-to-r from-transparent via-primary-300 to-transparent",
    description: "Production Facilities and Marketing",
  },
  {
    icon: <Heart className="size-8 text-rose-400" />,
    value: 95,
    valueColor: "text-rose-600 group-hover:text-rose-600",
    barColor: "bg-rose-400 group-hover:bg-rose-400",
    gradient: "bg-gradient-to-r from-transparent via-rose-300 to-transparent",
    description: "Production Facilities and Marketing",
  },
  {
    icon: <Heart className="size-8 text-lime-400" />,
    value: 95,
    valueColor: "text-lime-600 group-hover:text-lime-600",
    barColor: "bg-lime-400 group-hover:bg-lime-400",
    gradient: "bg-gradient-to-r from-transparent via-lime-300 to-transparent",
    description: "Production Facilities and Marketing",
  },
  {
    icon: <Heart className="size-8 text-violet-500" />,
    value: 95,
    valueColor: "text-violet-600 group-hover:text-violet-600",
    barColor: "bg-violet-400 group-hover:bg-violet-400",
    gradient: "bg-gradient-to-r from-transparent via-violet-300 to-transparent",
    description: "Production Facilities and Marketing",
  },
  {
    icon: <Heart className="size-8 text-sky-400" />,
    value: 95,
    valueColor: "text-sky-600 group-hover:text-sky-600",
    barColor: "bg-sky-400 group-hover:bg-sky-400",
    gradient: "bg-gradient-to-r from-transparent via-sky-300 to-transparent",
    description: "Production Facilities and Marketing",
  },
];

const StatCard: React.FC<Stat> = ({
  icon,
  value,
  valueColor,
  barColor,
  gradient,
  description,
}) => (
  <div className="group relative flex h-full w-full flex-col justify-between gap-y-6 rounded-lg bg-gray-50 p-6 text-center shadow-lg transition-all duration-300 hover:shadow-xl">
    <div className="relative mx-auto flex flex-col items-center">
      {icon}
      <span
        className={`relative mt-4 text-5xl font-bold text-gray-950 transition-all duration-300 ${valueColor}`}
      >
        {value}
      </span>
    </div>
    <div className={`mx-auto h-px w-16 ${gradient}`}></div>
    <p className="font-medium text-balance text-gray-900">{description}</p>
    <div
      className={`absolute right-0 bottom-0 left-0 mx-auto h-1 w-[calc(100%_-2rem)] rounded-b-sm transition-all duration-300 group-hover:h-2 ${barColor}`}
    ></div>
  </div>
);

const StatsSlider: React.FC<{ stats: Stat[] }> = ({ stats }) => {
  const {
    containerRef,
    cardRefs,
    btnLeftRef,
    btnRightRef,
    handleScrollLeft,
    handleScrollRight,
  } = useSnapScroll({
    gap: 0,
    behavior: "smooth",
    updateOnMount: true,
    dependencies: [stats.length],
  });

  const setCardRef = (index: number) => (el: HTMLLIElement | null) => {
    if (cardRefs.current) {
      cardRefs.current[index] = el;
    }
  };

  return (
    <div className="relative">
      <div className="overflow-x-hidden pb-8 md:overflow-visible">
        <ul
          ref={containerRef as React.RefObject<HTMLUListElement>}
          className="scrollbar-x-hidden relative flex overflow-x-auto"
        >
          {stats.map((stat, idx) => (
            <li
              key={idx}
              ref={setCardRef(idx)}
              className="relative w-full flex-shrink-0 px-4 min-[440px]:w-2/4 md:w-1/3 xl:w-1/4"
            >
              <StatCard {...stat} />
            </li>
          ))}
        </ul>
      </div>
      <button
        ref={btnLeftRef}
        onClick={handleScrollLeft}
        className="absolute top-1/2 left-0 z-40 flex -translate-y-1/2 items-center justify-center rounded-sm border border-gray-200 bg-gray-50 p-2 text-gray-950 shadow-sm transition-opacity hover:opacity-75 aria-disabled:cursor-not-allowed aria-disabled:opacity-10 xl:-left-8"
      >
        <ChevronLeft className="size-4" />
      </button>
      <button
        ref={btnRightRef}
        onClick={handleScrollRight}
        className="absolute top-1/2 right-0 z-40 flex -translate-y-1/2 items-center justify-center rounded-sm border border-gray-200 bg-gray-50 p-2 text-gray-950 shadow-sm transition-opacity hover:opacity-75 aria-disabled:cursor-not-allowed aria-disabled:opacity-10 xl:-right-8"
      >
        <ChevronRight className="size-4" />
      </button>
    </div>
  );
};

const StatsSection: React.FC = () => (
  <section className="bg-primary-950 py-16">
    <div className="mx-auto max-w-7xl px-4">
      {/* Section Header */}
      <div className="flex flex-col gap-6 text-center">
        <h2 className="text-primary-600 text-5xl font-bold">Koç Now</h2>
        <p className="text-primary-50 mx-auto max-w-3xl text-lg tracking-wide text-balance md:text-xl">
          Our achievements and the outstanding statistics in the industries we
          lead come from the value we give to our colleagues and our partners.
        </p>
      </div>
      {/* Vertical Line Divider */}
      <div className="my-8 flex justify-center sm:mt-10 sm:mb-12">
        <div className="bg-primary-600 h-14 w-[2px]"></div>
      </div>
      {/* Stats Slider */}
      <StatsSlider stats={stats} />
    </div>
  </section>
);

export default StatsSection;
