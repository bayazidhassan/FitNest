import BenefitsSection from './BenefitsSection';
import CategoriesSection from './CategoriesSection';
import FeaturedProducts from './FeaturedProducts';
import HeroSection from './HeroSection';
import ImageGallery from './ImageGallery';

const HomePage = () => {
  return (
    <div className="space-y-20">
      <HeroSection></HeroSection>
      <FeaturedProducts></FeaturedProducts>
      <CategoriesSection></CategoriesSection>
      <BenefitsSection></BenefitsSection>
      <ImageGallery></ImageGallery>
    </div>
  );
};

export default HomePage;
