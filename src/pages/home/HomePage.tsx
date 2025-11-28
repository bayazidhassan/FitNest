import BenefitsSection from "./BenefitsSection";
import CategoriesSection from "./CategoriesSection";
import FeaturedProducts from "./FeaturedProducts";
import HeroSection from "./HeroSection";
import ImageGallery from "./ImageGallery";

const HomePage = () => {
  return (
    <>
      <HeroSection></HeroSection>
      <CategoriesSection></CategoriesSection>
      <FeaturedProducts></FeaturedProducts>
      <BenefitsSection></BenefitsSection>
      <ImageGallery></ImageGallery>
    </>
  );
};

export default HomePage;
