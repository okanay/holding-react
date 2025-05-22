import { HeroSection } from "@/components/ui/hero";
import BoardOfDirectorsSection from "./board";

const breadcrumbItems = [
  { label: "Ana Sayfa", href: "/" },
  { label: "Kurumsal", href: "/board" },
  { label: "Yönetim Kurulumuz" },
];

export function RootTeamPage() {
  return (
    <main>
      <HeroSection
        image="https://assets.hoi.com.tr/dummy_ui_image_lg.jpg"
        title="Board of Directors"
        subtitle="Our Board of Directors"
        breadcrumbItems={breadcrumbItems}
      />
      <BoardOfDirectorsSection />
    </main>
  );
}
