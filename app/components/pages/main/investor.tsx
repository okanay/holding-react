import React from "react";
import {
  Presentation,
  BarChart2,
  ChevronLeft,
  ChevronRight,
  MoveRight,
} from "lucide-react";
import { useSnapScroll } from "@/hooks/use-snap-scroll";

// Info Card Type
type InfoCard = {
  icon: React.ReactNode;
  borderColor: string;
  title: string;
  borderClass: string;
};

// Announcement Type
type Announcement = {
  date: string;
  title: string;
  link: string;
};

const infoCards: InfoCard[] = [
  {
    icon: <Presentation className="size-8 text-green-500" />,
    borderColor: "border-green-500",
    title: "Presentations and Bulletins",
    borderClass: "border-green-500",
  },
  {
    icon: <BarChart2 className="size-8 text-amber-500" />,
    borderColor: "border-amber-500",
    title: "Financial Information",
    borderClass: "border-amber-500",
  },
];

const announcements: Announcement[] = [
  {
    date: "13.05.2022",
    title:
      "Yapı Kredi Bank Appendix 1 (in Turkish) - MTO Information Memorandum",
    link: "#",
  },
  {
    date: "13.05.2022",
    title:
      "Yapı Kredi Bank Appendix 1 (in Turkish) - MTO Information Memorandum",
    link: "#",
  },
  {
    date: "13.05.2022",
    title:
      "Yapı Kredi Bank Appendix 1 (in Turkish) - MTO Information Memorandum",
    link: "#",
  },
  {
    date: "13.05.2022",
    title:
      "Yapı Kredi Bank Appendix 1 (in Turkish) - MTO Information Memorandum",
    link: "#",
  },
];

const InfoCardComponent: React.FC<InfoCard> = ({
  icon,
  borderColor,
  title,
  borderClass,
}) => (
  <div className="flex flex-col">
    <div
      className={`mb-4 flex h-14 w-14 items-center justify-center rounded-sm border p-3 ${borderColor}`}
    >
      {icon}
    </div>
    <h3 className="mb-2 text-xl font-semibold text-gray-900">{title}</h3>
    <div className={`mt-4 w-full border-t-2 ${borderClass}`}></div>
  </div>
);

const AnnouncementCard: React.FC<Announcement> = ({ date, title, link }) => (
  <div className="bg-primary-950 flex h-full min-h-[180px] flex-col justify-between p-4 transition-opacity duration-300 hover:opacity-50">
    <div className="mb-2 text-xs text-gray-300">{date}</div>
    <h3 className="mb-6 text-sm font-medium text-white">{title}</h3>
    <a
      href={link}
      className="border-primary-700 text-primary-700 mt-auto flex w-fit items-center border-b-2 pb-1 text-xs"
    >
      <span className="font-medium">Download</span>
      <MoveRight className="ml-2 size-4" />
    </a>
  </div>
);

const AnnouncementsSlider: React.FC<{ announcements: Announcement[] }> = ({
  announcements,
}) => {
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
    dependencies: [announcements.length],
  });

  const setCardRef = (index: number) => (el: HTMLLIElement | null) => {
    if (cardRefs.current) {
      cardRefs.current[index] = el;
    }
  };

  return (
    <div className="relative flex flex-col justify-between sm:h-[calc(100%_-_4rem)]">
      <div className="overflow-x-hidden">
        <ul
          ref={containerRef as React.RefObject<HTMLUListElement>}
          className="scrollbar-x-hidden relative flex overflow-x-auto"
        >
          {announcements.map((a, idx) => (
            <li
              key={idx}
              ref={setCardRef(idx)}
              className="w-full flex-shrink-0 md:w-1/2"
            >
              <AnnouncementCard {...a} />
            </li>
          ))}
        </ul>
      </div>
      <div className="flex items-center gap-4 pt-16 lg:pt-0">
        <button
          ref={btnLeftRef}
          onClick={handleScrollLeft}
          className="top-1/2 left-0 z-40 flex -translate-y-1/2 items-center justify-center rounded-sm border border-gray-200 bg-gray-50 p-2 text-gray-950 shadow-sm transition-opacity hover:opacity-75 aria-disabled:cursor-not-allowed aria-disabled:opacity-10"
        >
          <ChevronLeft className="size-4" />
        </button>
        <button
          ref={btnRightRef}
          onClick={handleScrollRight}
          className="top-1/2 right-0 z-40 flex -translate-y-1/2 items-center justify-center rounded-sm border border-gray-200 bg-gray-50 p-2 text-gray-950 shadow-sm transition-opacity hover:opacity-75 aria-disabled:cursor-not-allowed aria-disabled:opacity-10"
        >
          <ChevronRight className="size-4" />
        </button>
      </div>
    </div>
  );
};

const InvestorRelationsSection: React.FC = () => (
  <section className="bg-white py-16">
    <div className="mx-auto max-w-7xl">
      {/* Main Header */}
      <div className="mb-14 px-4 text-center">
        <h1 className="mb-6 text-5xl font-bold text-gray-800">
          Investor Relations
        </h1>
        <p className="mx-auto max-w-4xl text-lg text-balance text-gray-700">
          With the aim to increase the added value created for all of its
          shareholders, Koç Group of Companies have been in the business for
          almost 100 years and is continuing its journey with the objective of
          creating long-term value and within the framework of a global vision.
        </p>
        {/* Vertical Line Divider */}
        <div className="mt-10 flex justify-center">
          <div className="bg-primary-700 h-14 w-[2px]"></div>
        </div>
      </div>
      {/* Two Column Layout */}
      <div className="relative mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2">
        {/* Left Column */}
        <div className="px-4 md:pr-16">
          <h2 className="mb-6 text-center text-4xl font-bold text-gray-800 lg:text-start">
            Why Koç Holding?
          </h2>
          <p className="mb-8 text-center text-lg text-gray-700 lg:text-start">
            One of the best alternatives for anyone with a desire to invest in
            the high growth potential of our country.
          </p>
          {/* CTA Button */}
          <a
            href="#"
            className="from-primary-600 via-primary-700 to-primary-600 mx-auto mb-10 flex w-full items-center justify-center bg-gradient-to-r px-12 py-4 font-medium text-white transition-opacity duration-300 hover:opacity-75 sm:w-fit lg:mx-0"
          >
            More information
          </a>
          {/* Info Links Section */}
          <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {infoCards.map((card, idx) => (
              <InfoCardComponent key={idx} {...card} />
            ))}
          </div>
        </div>
        {/* Right Column */}
        <div className="bg-primary-950 mt-16 px-4 py-8 sm:px-8 lg:mt-0">
          <h2 className="mb-10 text-3xl font-bold text-gray-50">
            Latest Announcements
          </h2>
          <AnnouncementsSlider announcements={announcements} />
        </div>
      </div>
    </div>
  </section>
);

export default InvestorRelationsSection;
