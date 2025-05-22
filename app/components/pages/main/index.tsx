import FeatureSection from "./features";
import HeroSection from "./hero";
import InvestorRelationsSection from "./investor";
import LifeInSection from "./life-in";
import MediaSection from "./media";
import RelatedPagesSection from "./related";
import StatsSection from "./stats";

export function RootMainPage() {
  return (
    <main>
      <HeroSection />
      <FeatureSection />
      <StatsSection />
      <InvestorRelationsSection />
      <LifeInSection />
      <MediaSection />
      <RelatedPagesSection />
    </main>
  );
}
