import CategoriesSection from "@/Component/Home/CategoriesSection";
import FeaturesSection from "@/Component/Home/FeatureSection";
import HeroSection from "@/Component/Home/HeroSection";
import PopularProducts from "@/Component/Home/PopularProducts";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <FeaturesSection />
      <CategoriesSection />
      <PopularProducts />
    </main>
  );
}
