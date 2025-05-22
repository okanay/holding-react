import { useSnapScroll } from "@/hooks/use-snap-scroll";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useState } from "react";
import { twMerge } from "tailwind-merge";

const tabsData: Tab[] = [
  {
    id: "digital-transformation",
    title: "Digital Transformation",
    contentTitle: "Faster, easier, more sustainable",
    contentSubtitle:
      "Our digital transformation objectives and projects for our customers, partners and employees.",
    cards: [
      {
        image:
          "https://cdn.koc.com.tr/cmscontainer/kocholding/media/koc/05surdurulebilirlik/dijital-donusum/01.jpg?ext=.jpg",
        title: "Koç Digital & Koç Digital Academy",
        description:
          "KoçDigital established by KoçSistem in partnership with Boston Consulting Group (BCG) is focused on Advanced Analytics and the Internet of Things (IoT) to innovate sustainable solutions for businesses.",
      },
      {
        image:
          "https://cdn.koc.com.tr/cmscontainer/kocholding/media/koc/05surdurulebilirlik/dijital-donusum/01.jpg?ext=.jpg",
        title: "Digital Innovation Hub",
        description:
          "Creating a culture of innovation through digital transformation initiatives that empower our workforce and enhance customer experiences across all touchpoints.",
      },
      {
        image:
          "https://cdn.koc.com.tr/cmscontainer/kocholding/media/koc/05surdurulebilirlik/dijital-donusum/01.jpg?ext=.jpg",
        title: "Smart Manufacturing",
        description:
          "Implementing Industry 4.0 technologies to optimize production processes, reduce waste, and improve operational efficiency across our manufacturing facilities.",
      },
    ],
  },
  {
    id: "innovation",
    title: "Innovation",
    contentTitle: "Innovation drives our future",
    contentSubtitle:
      "Breakthrough innovations and research initiatives that shape tomorrow's business landscape.",
    cards: [
      {
        image:
          "https://cdn.koc.com.tr/cmscontainer/kocholding/media/koc/05surdurulebilirlik/dijital-donusum/01.jpg?ext=.jpg",
        title: "Innovation Labs",
        description:
          "State-of-the-art research facilities where breakthrough technologies are developed and tested before market implementation.",
      },
      {
        image:
          "https://cdn.koc.com.tr/cmscontainer/kocholding/media/koc/05surdurulebilirlik/dijital-donusum/01.jpg?ext=.jpg",
        title: "Startup Ecosystem",
        description:
          "Supporting emerging technologies and fostering entrepreneurship through strategic partnerships with innovative startups and scale-ups.",
      },
    ],
  },
];

const FeatureSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="relative space-y-12 overflow-hidden px-4 py-12">
      <TabNavigation
        tabs={tabsData}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      {tabsData.map((tab, idx) => (
        <TabContent
          key={tab.id}
          isActive={activeTab === idx}
          title={tab.contentTitle}
          subtitle={tab.contentSubtitle}
          cards={tab.cards}
        />
      ))}
    </section>
  );
};

export type Card = {
  image: string;
  title: string;
  description: string;
  link?: string;
};

export type Tab = {
  id: string;
  title: string;
  contentTitle: string;
  contentSubtitle: string;
  cards: Card[];
};

type TabNavigationProps = {
  tabs: Tab[];
  activeTab: number;
  onTabChange: (index: number) => void;
};

const TabNavigation: React.FC<TabNavigationProps> = ({
  tabs,
  activeTab,
  onTabChange,
}) => {
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
    dependencies: [activeTab],
  });

  const setTabRef = (index: number) => (el: HTMLLIElement | null) => {
    if (cardRefs.current) {
      cardRefs.current[index] = el;
    }
  };

  return (
    <div className="relative">
      <button
        ref={btnLeftRef}
        onClick={handleScrollLeft}
        className="bg-primary-950 absolute top-[125%] left-0 z-40 hidden items-center justify-center rounded-sm border border-gray-800 p-2 text-gray-50 shadow-sm transition-opacity hover:opacity-75 disabled:cursor-not-allowed disabled:opacity-10 md:hidden"
      >
        <ChevronLeft className="size-4" />
      </button>
      <button
        ref={btnRightRef}
        onClick={handleScrollRight}
        className="bg-primary-950 absolute top-[125%] right-0 z-40 hidden items-center justify-center rounded-sm border border-gray-800 p-2 text-gray-50 shadow-sm transition-opacity hover:opacity-75 disabled:cursor-not-allowed disabled:opacity-10 md:hidden"
      >
        <ChevronRight className="size-4" />
      </button>
      <ul
        ref={containerRef as React.RefObject<HTMLUListElement>}
        className="mx-auto flex w-full max-w-5xl justify-center gap-x-6 overflow-x-auto text-sm"
      >
        {tabs.map((tab, idx) => (
          <li key={tab.id} className="flex-shrink-0" ref={setTabRef(idx)}>
            <button
              onClick={() => onTabChange(idx)}
              className={`border-b-2 px-2 pb-4 font-medium transition-all duration-100 ease-in hover:opacity-75 active:scale-95 ${
                activeTab === idx
                  ? "border-primary-700 text-primary-700"
                  : "border-gray-200/50"
              }`}
            >
              {tab.title}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

type TabContentProps = {
  isActive: boolean;
  title: string;
  subtitle: string;
  cards: Card[];
};

const FeatureCard: React.FC<Card> = ({
  image,
  title,
  description,
  link = "#",
}) => (
  <div className="group h-full w-full flex-shrink-0 md:w-auto">
    <a
      href={link}
      className="flex h-full flex-col overflow-hidden rounded-sm border border-gray-100 bg-white transition duration-300 hover:bg-gray-50 hover:opacity-75"
    >
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gray-900 opacity-0 transition-opacity duration-300 group-hover:opacity-5"></div>
        <img src={image} alt={title} className="h-auto w-full object-cover" />
      </div>
      <div className="flex flex-grow flex-col p-5">
        <div className="bg-primary-700 mb-4 h-1 w-12 opacity-80"></div>
        <h3 className="mb-4 text-xl font-semibold text-gray-950">{title}</h3>
        <p className="mb-5 line-clamp-3 flex-grow text-sm leading-relaxed text-gray-800">
          {description}
        </p>
        <span className="mt-auto inline-flex items-center">
          <span className="text-primary-700 text-sm font-medium">
            More Information
          </span>
          <span className="text-primary-700 ml-2 transition-transform duration-200 group-hover:translate-x-0.5">
            →
          </span>
        </span>
      </div>
    </a>
  </div>
);

const TabContent: React.FC<TabContentProps> = ({
  isActive,
  title,
  subtitle,
  cards,
}) => {
  const {
    containerRef,
    cardRefs,
    btnLeftRef,
    btnRightRef,
    handleScrollLeft,
    handleScrollRight,
  } = useSnapScroll({
    gap: 32,
    behavior: "smooth",
    updateOnMount: true,
    dependencies: [isActive],
  });

  const setCardRef = (index: number) => (el: HTMLDivElement | null) => {
    if (cardRefs.current) {
      cardRefs.current[index] = el;
    }
  };

  return (
    <div
      className={twMerge(
        "transition-all duration-500",
        isActive
          ? "visible relative translate-y-0 opacity-100"
          : "invisible absolute w-full translate-y-[10%] opacity-0",
      )}
      style={{
        transitionProperty: "opacity, transform",
        transitionDelay: "0ms, 0ms",
        transitionDuration: "500ms, 500ms",
      }}
    >
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-8 text-center">
          <h2 className="mb-5 text-4xl font-bold text-gray-800 md:text-5xl">
            {title}
          </h2>
          <p className="mx-auto max-w-2xl text-base text-gray-800">
            {subtitle}
          </p>
        </div>
        <div className="mb-10 flex justify-center">
          <div className="bg-primary-700 h-14 w-[2px]"></div>
        </div>
        <div className="relative">
          <button
            ref={btnLeftRef}
            onClick={handleScrollLeft}
            className="bg-primary-950 absolute top-1/2 -left-4 z-40 flex items-center justify-center rounded-sm border border-gray-800 p-2 text-gray-50 shadow-sm transition-opacity hover:opacity-75 aria-disabled:cursor-not-allowed aria-disabled:opacity-10 md:hidden"
          >
            <ChevronLeft className="size-4" />
          </button>
          <button
            ref={btnRightRef}
            onClick={handleScrollRight}
            className="bg-primary-950 absolute top-1/2 right-0 z-40 flex items-center justify-center rounded-sm border border-gray-800 p-2 text-gray-50 shadow-sm transition-opacity hover:opacity-75 aria-disabled:cursor-not-allowed aria-disabled:opacity-10 md:hidden"
          >
            <ChevronRight className="size-4" />
          </button>
          <div
            ref={containerRef as React.RefObject<HTMLDivElement>}
            className={twMerge(
              "scrollbar-x-hidden mx-auto flex max-w-4xl gap-8 overflow-x-auto scroll-smooth pb-8 md:grid md:gap-10 md:overflow-visible",
              cards.length === 1 ? "md:grid-cols-2" : "",
              cards.length === 2 ? "md:grid-cols-2" : "",
              cards.length === 3 ? "md:grid-cols-3" : "",
            )}
          >
            {cards.map((card, idx) => (
              <div key={idx} ref={setCardRef(idx)} className="w-full shrink-0">
                <FeatureCard {...card} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureSection;
