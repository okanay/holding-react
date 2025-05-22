import React from "react";
import { ArrowRight, HandHeart, TrendingUp, Laptop, Leaf } from "lucide-react";
import useSlider from "@/hooks/use-slider";

// Main Hero Component
const HeroSection = () => {
  // Slider verilerini tanımlayalım
  const sliderData = [
    {
      icon: HandHeart,
      title: "Strengthen communities. Together",
      description:
        "Investments we pioneered. Social development projects we have developed to add value and make a difference.",
      imageAlt: "Community Development",
    },
    {
      icon: TrendingUp,
      title: "Grow the business. Together",
      description:
        "Reliable, long-lasting relationships we have built. Our vision open to transformation change and innovation.",
      imageAlt: "Business Growth",
    },
    {
      icon: Laptop,
      title: "Digitalize operations. Together",
      description:
        "Embracing digital transformation in all our processes, creating efficient and innovative solutions for tomorrow.",
      imageAlt: "Digital Transformation",
    },
    {
      icon: Leaf,
      title: "Sustain our future. Together",
      description:
        "Committed to environmental responsibility and sustainable practices across all our operations and communities.",
      imageAlt: "Sustainability",
    },
  ];

  const { activeSlide, goToSlide } = useSlider(sliderData.length);

  return (
    <section className="relative">
      {/* Hero Image - Desktop */}
      <div className="relative hidden h-screen w-full md:block">
        <img
          src="https://assets.hoi.com.tr/dummy_ui_image_lg.jpg"
          alt="Hero Desktop"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/25"></div>
      </div>

      {/* Hero Image - Mobile */}
      <div className="relative block h-screen w-full md:hidden">
        <img
          src="https://assets.hoi.com.tr/dummy_ui_image_sm.jpg"
          alt="Hero Mobile"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/25"></div>
      </div>

      {/* Text Content Container */}
      <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-16 lg:mb-20 lg:px-40">
        <div className="max-w-5xl text-white">
          <h1 className="mb-4 text-5xl font-bold md:mb-8 md:text-7xl">
            Lead.
            <br />
            Together
          </h1>
          <p className="mb-8 max-w-lg text-lg leading-normal md:mb-12">
            Lead. Together, the sustainable and profitable growth approach of
            Koç Group, gets strength from our belief in cooperation and the
            transformation we will create.
          </p>

          {/* CTA Button */}
          <a
            href="#"
            className="from-primary-600 via-primary-700 to-primary-600 flex h-16 w-fit flex-col justify-center rounded-sm bg-gradient-to-r px-12 text-center text-sm font-medium text-white transition-opacity duration-300 ease-in-out hover:opacity-75"
          >
            Lead. Together at a glance
          </a>
        </div>
      </div>

      {/* Slider Section */}
      <div className="absolute right-0 bottom-0 hidden w-full overflow-hidden lg:flex">
        <div className="relative ml-auto flex h-[240px] w-[800px] flex-col items-end justify-end overflow-x-hidden">
          {/* Slider Track */}
          <div
            className="slider-track flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${activeSlide * 100}%)`,
            }}
          >
            {sliderData.map((slide, index) => (
              <SliderItem
                key={index}
                icon={slide.icon}
                title={slide.title}
                description={slide.description}
                imageAlt={slide.imageAlt}
              />
            ))}
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="navigation-controls absolute right-10 bottom-8 z-[40] flex items-center space-x-2">
          {sliderData.map((_, index) => (
            <NavigationDot
              key={index}
              isActive={activeSlide === index}
              onClick={() => goToSlide(index)}
              slideNumber={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

// Slider Item Component
type SliderItemProps = {
  icon: React.ElementType;
  title: string;
  description: string;
  imageAlt: string;
};

const SliderItem: React.FC<SliderItemProps> = ({
  icon: Icon,
  title,
  description,
  imageAlt,
}) => (
  <div className="slider-item from-primary-500 via-primary-700 to-primary-600 flex w-full flex-shrink-0 justify-end bg-gradient-to-l pb-4 pl-4">
    <div className="flex h-[200px] w-fit justify-end">
      <div className="flex items-end">
        <img
          src="https://assets.hoi.com.tr/dummy_ui_image_sm.jpg"
          alt={imageAlt}
          className="h-[220px] w-[360px] object-cover"
        />
        <div className="flex h-[200px] flex-col items-start justify-center bg-white pr-4 pl-6">
          <div className="flex items-start gap-2">
            <Icon className="text-primary-700 size-7 lg:size-8" />
            <div className="flex flex-col gap-2">
              <h3 className="text-primary-700 text-lg font-bold">{title}</h3>
              <p className="max-w-sm text-sm leading-normal text-gray-700">
                {description}
              </p>
              <a
                href="#"
                className="text-primary-700 hover:text-primary-800 inline-flex items-center font-medium transition-colors"
              >
                Discover
                <ArrowRight className="ml-2 size-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Navigation Dot Component
type NavigationDotProps = {
  isActive: boolean;
  onClick: () => void;
  slideNumber: number;
};

const NavigationDot: React.FC<NavigationDotProps> = ({
  isActive,
  onClick,
  slideNumber,
}) => (
  <button
    className={`nav-dot bg-primary-700 h-2 w-2 rounded-full opacity-50 transition-all duration-300 ease-in-out ${
      isActive ? "mx-1 w-8 rounded-full opacity-100" : "hover:opacity-75"
    }`}
    onClick={onClick}
    aria-label={`Slide ${slideNumber + 1}`}
  />
);

export default HeroSection;
