import React from "react";
import { ArrowRight } from "lucide-react";

type RelatedPage = {
  label: string;
  href: string;
};

const relatedPages: RelatedPage[] = [
  { label: "About Koç Holding", href: "#" },
  { label: "Koç Group Companies", href: "#" },
  { label: "Koç Culture And Our Priorities", href: "#" },
  { label: "Why Koç Holding?", href: "#" },
  { label: "Vehbi Koç Foundation", href: "#" },
  { label: "Hotline", href: "#" },
];

const RelatedPagesSection: React.FC = () => (
  <section className="from-primary-600 via-primary-700 to-primary-600 bg-gradient-to-r py-10 sm:py-16">
    <div className="mx-auto max-w-7xl px-4">
      <h2 className="mb-10 text-center text-3xl font-bold text-white">
        Related Pages
      </h2>
      <div className="flex flex-wrap items-center justify-center gap-4">
        {relatedPages.map((page, idx) => (
          <a
            key={idx}
            href={page.href}
            className="flex items-center rounded-full bg-white px-4 py-2 text-[0.6rem] font-medium text-gray-900 transition-all hover:bg-gray-100 sm:text-xs"
          >
            <span>{page.label}</span>
            <ArrowRight className="ml-2 size-4" />
          </a>
        ))}
      </div>
    </div>
  </section>
);

export default RelatedPagesSection;
