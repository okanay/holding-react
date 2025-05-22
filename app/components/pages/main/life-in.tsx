import React from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useSnapScroll } from "@/hooks/use-snap-scroll";

type LifeCard = {
  text: string;
  link: string;
  linkLabel: string;
};

const lifeCards: LifeCard[] = [
  {
    text: `Our founder Vehbi Koç's "My most important asset is my human resources" philosophy inspires all of our human resources practices. As Koç Group, we believe that the path to social and economic development is through happier employees and happier workplaces. With the people-oriented transformation we practised, we focus on employee experience, act with an innovative human resources perspective built on the values ​​of equality, solidarity, modernity and lifelong development.`,
    link: "#",
    linkLabel: "Discover more",
  },
];

const LifeCardComponent: React.FC<LifeCard> = ({ text, link, linkLabel }) => (
  <div className="flex h-full min-w-0 flex-1 flex-col justify-between bg-white px-4 py-8 lg:px-12">
    <div>
      <p className="mb-4 text-gray-950 sm:font-semibold">{text}</p>
    </div>
    <a
      href={link}
      className="border-primary-700 text-primary-700 mt-6 flex w-fit items-center border-b-2 pb-2 text-xs font-medium transition-opacity duration-300 hover:opacity-75"
    >
      {linkLabel}
      <ArrowRight className="ml-2 size-4" />
    </a>
  </div>
);

const LifeCardSlider: React.FC<{ cards: LifeCard[] }> = ({ cards }) => {
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
    dependencies: [cards.length],
  });

  const setCardRef = (index: number) => (el: HTMLDivElement | null) => {
    if (cardRefs.current) {
      cardRefs.current[index] = el;
    }
  };

  return (
    <div className="relative">
      <div className="overflow-x-hidden">
        <div
          ref={containerRef as React.RefObject<HTMLDivElement>}
          className="flex snap-x snap-mandatory overflow-x-auto"
        >
          {cards.map((card, idx) => (
            <div
              key={idx}
              ref={setCardRef(idx)}
              className="w-full flex-shrink-0 snap-center"
              style={{ minWidth: "100%" }}
            >
              <LifeCardComponent {...card} />
            </div>
          ))}
        </div>
      </div>
      <div className="pointer-events-none absolute top-1/2 left-0 z-40 flex w-full -translate-y-1/2 justify-between gap-2 px-2">
        <button
          ref={btnLeftRef}
          onClick={handleScrollLeft}
          className="pointer-events-auto flex items-center justify-center rounded-sm border border-gray-200 bg-gray-50 p-2 text-gray-950 shadow-sm transition-opacity hover:opacity-75 aria-disabled:cursor-not-allowed aria-disabled:opacity-10"
        >
          <ChevronLeft className="size-4" />
        </button>
        <button
          ref={btnRightRef}
          onClick={handleScrollRight}
          className="pointer-events-auto flex items-center justify-center rounded-sm border border-gray-200 bg-gray-50 p-2 text-gray-950 shadow-sm transition-opacity hover:opacity-75 aria-disabled:cursor-not-allowed aria-disabled:opacity-10"
        >
          <ChevronRight className="size-4" />
        </button>
      </div>
    </div>
  );
};

const LifeInSection: React.FC = () => (
  <section className="bg-primary-950 relative h-full lg:mt-32 lg:h-[640px]">
    <div className="relative mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2">
      {/* Sol Taraf */}
      <div className="relative flex items-center justify-center py-8 text-center lg:translate-y-[-30px] lg:justify-start lg:py-0 lg:text-start">
        <div className="px-4 lg:max-w-lg">
          <h2 className="mb-6 text-5xl font-bold text-gray-50">Life In Koç</h2>
          <p className="mb-6 text-sm text-pretty text-gray-100 lg:max-w-sm">
            Koç Holding is the leader Turkish company in Forbes' "World's best
            employers" list.
          </p>
          <a
            href="#"
            className="flex w-full items-center justify-center bg-gray-50 py-4 font-medium text-gray-950 transition-opacity duration-300 hover:opacity-75 lg:w-fit lg:px-8"
          >
            More information
          </a>
        </div>
      </div>
      {/* Sağ Taraf */}
      <div className="flex flex-col lg:translate-y-[-60px]">
        {/* Görsel Alanı */}
        <div className="relative h-96 w-full overflow-hidden px-4 sm:px-0">
          <img
            src="https://cdn.koc.com.tr/cmscontainer/kocholding/media/koc/04kariyer/876x520_b_1.jpg?ext=.jpg"
            alt="Employee at Koç Holding"
            className="h-full w-full object-cover"
          />
          <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent px-4 py-8 lg:px-8">
            <h3 className="text-3xl font-bold text-white">İçinde Koç Var</h3>
          </div>
        </div>
        {/* Snap Scroll İçerik Alanı */}
        <LifeCardSlider cards={lifeCards} />
      </div>
    </div>
  </section>
);

export default LifeInSection;
