import { HeroSection } from "@/components/ui/hero";
import LocationMapSection from "@/components/ui/leaflet-map";
import ContactFormSection from "./form";
import ContactInfoSection from "./information";

const breadcrumbItems = [
  { label: "Home Page", href: "/" },
  { label: "Contact", href: "/contact" },
  { label: "Get in Touch" },
];

export function RootContactPage() {
  return (
    <main>
      <HeroSection
        image="https://assets.hoi.com.tr/dummy_ui_image_lg.jpg"
        title="Get in Touch"
        subtitle="Contact"
        breadcrumbItems={breadcrumbItems}
      />

      <section className="bg-gray-50 py-8 sm:py-16">
        <div className="container mx-auto max-w-2xl md:max-w-7xl">
          <div className="flex flex-col gap-10 md:flex-row md:gap-16">
            {/* Contact Information */}
            <div className="order-2 flex flex-col justify-center px-4 sm:order-none md:w-1/2">
              <ContactInfoSection />
            </div>
            {/* Contact Form */}
            <div className="order-1 sm:order-none sm:pr-4 md:w-1/2">
              <ContactFormSection />
            </div>
          </div>
        </div>
      </section>
      <LocationMapSection />
    </main>
  );
}
