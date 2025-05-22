import { BreadcrumbItem, HeroSection } from "@/components/ui/hero";
import { Value, ValuesSlider } from "./card";
import { Shield, Lightbulb, Users, Target, Heart, Leaf } from "lucide-react";
import LocationMapSection from "@/components/ui/leaflet-map";
import ContactCTASection from "@/components/ui/contact-cta";

const breadcrumbItems: BreadcrumbItem[] = [
  { label: "Home Page", href: "/" },
  { label: "About", href: "/about" },
  { label: "Who are We?" },
];

const values: Value[] = [
  {
    icon: <Shield className="text-primary-700 size-7" />,
    title: "Trust",
    description:
      "We build relationships based on trust with our customers, employees, and business partners.",
  },
  {
    icon: <Lightbulb className="text-primary-700 size-7" />,
    title: "Innovation",
    description:
      "We constantly encourage innovation and develop creative solutions.",
  },
  {
    icon: <Users className="text-primary-700 size-7" />,
    title: "Collaboration",
    description: "We value teamwork and believe we are stronger together.",
  },
  {
    icon: <Target className="text-primary-700 size-7" />,
    title: "Excellence",
    description:
      "We aim for the highest quality standards and strive for continuous improvement.",
  },
  {
    icon: <Heart className="text-primary-700 size-7" />,
    title: "Customer Focus",
    description:
      "We understand our customers' needs and strive to exceed their expectations.",
  },
  {
    icon: <Leaf className="text-primary-700 size-7" />,
    title: "Sustainability",
    description:
      "We develop business models that are environmentally friendly and sensitive to future generations.",
  },
];

export function RootAboutPage() {
  return (
    <main>
      <HeroSection
        image="https://assets.hoi.com.tr/dummy_ui_image_lg.jpg"
        title="Who are We?"
        subtitle="About Us"
        breadcrumbItems={breadcrumbItems}
      />

      {/* Introduction Section */}
      <section className="px-5 py-12 sm:py-20">
        <div className="mx-auto max-w-4xl sm:text-center">
          <h2 className="mb-6 text-3xl font-extrabold tracking-tight text-gray-950 md:text-5xl">
            Turkey's Leader, Global Player
          </h2>
          <div className="mx-auto max-w-3xl space-y-6 text-lg leading-relaxed text-gray-700">
            <p>
              Koç Holding, with its almost a century-long journey since 1926,
              has differentiated itself from competitors by achieving numerous
              breakthroughs in Turkey, from industrialization to globalization,
              playing key roles with its leading positions. The Koç Group
              established Turkey’s first joint stock company, created the
              Republic’s first industrial endeavor and first international
              partnership and realized the first public offering.
            </p>
            <p>
              Koç Holding is Turkey’s leading investment holding company and the
              Koç Group is Turkey's largest industrial and services group in
              terms of revenues, exports, number of employees and market
              capitalization on Borsa Istanbul. The Group has been a driving
              force of the Turkish economy with total revenues that correspond
              around 8% of Turkey’s GDP and exports that comprise around 7% of
              Turkey’s total exports.
            </p>
            <p>
              Following $11.2 billion investments in the last five years, Koç
              Holding is the only Turkish company in Fortune Global 500. Koç
              Holding has leading positions with strong competitive advantages
              in energy, automotive, consumer durables and finance sectors,
              which offer strong long-term growth potential.
            </p>
            <p>
              The Koç Group manage activities according to international
              standards of corporate governance, customer satisfaction,
              sustainability and social responsibility. Today, as Turkey’s
              largest group of companies, the Koç Group will continue to create
              value for all its shareholders.
            </p>
          </div>
          {/* Vertical Divider */}
          <div className="mt-12 flex justify-center">
            <div className="bg-primary-700 h-14 w-[2px] rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Values Section (Wheel Scroll) */}
      <section className="bg-gray-50 py-12 sm:py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-10 text-center">
            <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 md:text-3xl">
              Our Core Values
            </h2>
            <p className="mx-auto max-w-2xl text-base text-gray-600 md:text-lg">
              The values that guide our vision, culture, and every step we take
              as Koç Holding.
            </p>
          </div>
          <ValuesSlider values={values} />
        </div>
      </section>

      <LocationMapSection />
      <ContactCTASection />
    </main>
  );
}
