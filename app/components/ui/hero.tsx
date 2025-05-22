import React from "react";

type HeroSectionProps = {
  image: string;
  title: string;
  subtitle?: string;
  breadcrumbItems: BreadcrumbItem[];
};

export const HeroSection: React.FC<HeroSectionProps> = ({
  image,
  title,
  subtitle,
  breadcrumbItems,
}) => (
  <div>
    {/* Hero Banner */}
    <div className="relative h-96 bg-gray-950">
      <img
        src={image}
        alt={title}
        className="absolute inset-0 h-full w-full object-cover opacity-60"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-800/40 to-slate-800/40"></div>
      <div className="relative container mx-auto flex h-full flex-col items-center justify-center px-4 text-center">
        <div className="text-white">
          {subtitle && (
            <p className="mb-2 text-base font-medium tracking-wide uppercase opacity-80">
              {subtitle}
            </p>
          )}
          <h1 className="mb-2 text-4xl font-extrabold text-balance drop-shadow-lg md:text-5xl lg:text-6xl">
            {title}
          </h1>
        </div>
      </div>
    </div>
    {/* Breadcrumb */}
    <Breadcrumb items={breadcrumbItems} />
  </div>
);

export type BreadcrumbItem = {
  label: string;
  href?: string;
  type?: string; // İleride ikon veya farklı davranışlar için
};

type BreadcrumbProps = {
  items: BreadcrumbItem[];
};

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => (
  <nav
    className="from-primary-600 via-primary-700 to-primary-800 bg-gradient-to-r py-2"
    aria-label="Breadcrumb"
  >
    <div className="mx-auto max-w-7xl px-5">
      <ol className="flex items-center text-xs text-white">
        {items.map((item, idx) => (
          <React.Fragment key={idx}>
            {item.href && idx !== items.length - 1 ? (
              <a href={item.href} className="hover:underline">
                {item.label}
              </a>
            ) : (
              <span>{item.label}</span>
            )}
            {idx < items.length - 1 && <span className="mx-2">/</span>}
          </React.Fragment>
        ))}
      </ol>
    </div>
  </nav>
);
