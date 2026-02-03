import service from '../../assets/images/24_7_service.jpg';
import delivery from '../../assets/images/fast_delivery.jpg';
import quality from '../../assets/images/high_quality.jpg';

const BenefitsSection = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-0">
      <div className="text-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-[#0D9488]">Why Choose Our Products?</h1>
        <p className="text-gray-500 mt-1 max-w-4/5 mx-auto">
          Discover the benefits of using our products. Quality, reliability, and convenience are
          guaranteed.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="border border-gray-300 flex flex-col items-center justify-center text-center p-6 bg-gray-50 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
          <img src={quality} alt="High Quality" className="w-24 h-24 mb-4 rounded-full" />
          <h3 className="text-xl font-semibold text-[#0D9488] mb-1">High Quality</h3>
          <p className="text-gray-700">
            Our products are made with premium materials to ensure durability and top-notch
            performance.
          </p>
        </div>
        <div className="border border-gray-300 flex flex-col items-center justify-center text-center p-6 bg-gray-50 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
          <img src={delivery} alt="Fast Delivery" className="w-24 h-24 mb-4 rounded-full" />
          <h3 className="text-xl font-semibold text-[#0D9488] mb-1">Fast Delivery</h3>
          <p className="text-gray-700">
            Get your products quickly with our reliable shipping services.
          </p>
        </div>
        <div className="border border-gray-300 flex flex-col items-center justify-center text-center p-6 bg-gray-50 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
          <img src={service} alt="24/7 Support" className="w-24 h-24 mb-4 rounded-full" />
          <h3 className="text-xl font-semibold text-[#0D9488] mb-1">24/7 Support</h3>
          <p className="text-gray-700">
            Our support team is always ready to help you with any questions or issues.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BenefitsSection;
