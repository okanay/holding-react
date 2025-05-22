import React from "react";
import {
  MoveRight,
  ChevronLeft,
  ChevronRight,
  Megaphone,
  FileText,
  ArrowRight,
} from "lucide-react";
import { useSnapScroll } from "@/hooks/use-snap-scroll";

type News = {
  image: string;
  date: string;
  title: string;
  link: string;
};

const newsList: News[] = [
  {
    image:
      "https://cdn.koc.com.tr/cmscontainer/kocholding/media/koc/06medya-merkezi/haberler/_thumb_koc_logo_860x484.jpg?ext=.jpg",
    date: "07.11.2024",
    title:
      "Koç Holding Continued Its Growth With Strategic Investments In The First 9 Months Of 2024",
    link: "#",
  },
  {
    image:
      "https://cdn.koc.com.tr/cmscontainer/kocholding/media/koc/06medya-merkezi/haberler/_thumb_koc_logo_860x484.jpg?ext=.jpg",
    date: "07.11.2024",
    title:
      "Koç Holding Continued Its Growth With Strategic Investments In The First 9 Months Of 2024",
    link: "#",
  },
  {
    image:
      "https://cdn.koc.com.tr/cmscontainer/kocholding/media/koc/06medya-merkezi/haberler/_thumb_koc_logo_860x484.jpg?ext=.jpg",
    date: "07.11.2024",
    title:
      "Koç Holding Continued Its Growth With Strategic Investments In The First 9 Months Of 2024",
    link: "#",
  },
  {
    image:
      "https://cdn.koc.com.tr/cmscontainer/kocholding/media/koc/06medya-merkezi/haberler/_thumb_koc_logo_860x484.jpg?ext=.jpg",
    date: "07.11.2024",
    title:
      "Koç Holding Continued Its Growth With Strategic Investments In The First 9 Months Of 2024",
    link: "#",
  },
];

const NewsCard: React.FC<News> = ({ image, date, title, link }) => (
  <a
    href={link}
    className="flex h-full flex-col bg-gray-50 p-px transition-colors duration-300 hover:bg-gray-100"
  >
    <div className="relative aspect-video overflow-hidden">
      <img src={image} alt={title} className="h-full w-full object-contain" />
    </div>
    <div className="flex min-h-[240px] flex-1 flex-col justify-between p-6">
      <div className="mb-2 text-xs font-medium text-gray-950">{date}</div>
      <h3 className="text-primary-700 mb-4 line-clamp-3 text-lg font-medium">
        {title}
      </h3>
      <div className="border-primary-700 mt-auto flex w-fit items-center border-b-2 pb-1 text-sm text-gray-950">
        <span className="font-medium">Read more</span>
        <MoveRight className="text-primary-700 ml-2 size-4" />
      </div>
    </div>
  </a>
);

const NewsSlider: React.FC<{ news: News[] }> = ({ news }) => {
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
    dependencies: [news.length],
  });

  const setCardRef = (index: number) => (el: HTMLLIElement | null) => {
    if (cardRefs.current) {
      cardRefs.current[index] = el;
    }
  };

  return (
    <div className="relative mt-16">
      <div className="overflow-x-hidden">
        <ul
          ref={containerRef as React.RefObject<HTMLUListElement>}
          className="scrollbar-x-hidden relative flex flex-nowrap overflow-x-auto pb-8"
        >
          {news.map((item, idx) => (
            <li
              key={idx}
              ref={setCardRef(idx)}
              className="w-full flex-shrink-0 px-2 sm:w-2/4 lg:w-1/3"
            >
              <NewsCard {...item} />
            </li>
          ))}
        </ul>
      </div>
      <button
        ref={btnLeftRef}
        onClick={handleScrollLeft}
        className="bg-primary-950 absolute top-1/2 left-0 z-45 flex -translate-y-1/2 items-center justify-center rounded-sm border border-gray-800 p-2 text-gray-50 shadow-sm transition-opacity hover:opacity-75 aria-disabled:cursor-not-allowed aria-disabled:opacity-10 sm:top-[20%] sm:translate-y-0 lg:p-3 xl:-left-14"
      >
        <ChevronLeft className="size-4" />
      </button>
      <button
        ref={btnRightRef}
        onClick={handleScrollRight}
        className="bg-primary-950 absolute top-1/2 right-0 z-45 flex -translate-y-1/2 items-center justify-center rounded-sm border border-gray-800 p-2 text-gray-50 shadow-sm transition-opacity hover:opacity-75 aria-disabled:cursor-not-allowed aria-disabled:opacity-10 sm:top-[20%] sm:translate-y-0 lg:p-3 xl:-right-14"
      >
        <ChevronRight className="size-4" />
      </button>
    </div>
  );
};

const MediaSection: React.FC = () => (
  <section className="relative overflow-hidden bg-white py-16">
    <div className="mx-auto max-w-7xl px-4">
      {/* Main Header */}
      <div className="mb-14 text-center">
        <h1 className="mb-6 text-5xl font-bold text-gray-800">Media Center</h1>
        <p className="mx-auto max-w-4xl text-lg text-balance text-gray-700">
          Press releases, news, projects and more.
        </p>
        <div className="mt-10 flex justify-center">
          <div className="bg-primary-700 h-14 w-[2px]"></div>
        </div>
      </div>
      {/* News Slider */}
      <NewsSlider news={newsList} />
      {/* Categories Section */}
      <div className="mt-16 border-t border-gray-200 pt-12">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row sm:items-center md:items-end">
          {/* News Category */}
          <a
            href="#"
            className="transition-color from-primary-600 via-primary-700 to-primary-600 flex h-16 w-full items-center justify-center bg-gradient-to-r text-white transition-opacity duration-300 hover:opacity-75 sm:w-[240px]"
          >
            <h3 className="text-center font-bold">News</h3>
          </a>
          {/* Press Releases & Guidelines */}
          <div className="flex w-full flex-wrap items-center justify-center gap-6 sm:w-auto sm:justify-end">
            <a
              href="#"
              className="flex h-fit w-full items-center justify-between border-b-2 border-green-500 pb-4 transition hover:opacity-75 sm:w-[200px]"
            >
              <div className="flex items-center gap-2">
                <Megaphone className="size-4 text-green-500" />
                <h3 className="text-sm font-medium text-gray-900">
                  Press Releases
                </h3>
              </div>
              <ArrowRight className="size-5 text-green-500" />
            </a>
            <a
              href="#"
              className="flex h-fit w-full items-center justify-between border-b-2 border-amber-500 pb-4 transition hover:opacity-75 sm:w-[200px]"
            >
              <div className="flex items-center gap-2">
                <FileText className="size-4 text-amber-500" />
                <h3 className="text-sm font-medium text-gray-900">
                  Guidelines
                </h3>
              </div>
              <ArrowRight className="size-5 text-amber-500" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default MediaSection;
