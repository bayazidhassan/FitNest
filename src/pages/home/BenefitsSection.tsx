const BenefitsSection = () => {
  return (
    <div className="my-30 max-w-7xl mx-auto px-4">
      {/* Section Header */}
      <div className="text-center mb-4">
        <h1 className="text-3xl font-bold text-[#0D9488]">
          Why Choose Our Products?
        </h1>
        <p className="text-gray-600 mt-3 max-w-xl mx-auto">
          Discover the benefits of using our products. Quality, reliability, and
          convenience are guaranteed.
        </p>
      </div>

      {/* Benefits Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {/* Benefit 1 */}
        <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow hover:shadow-xl transition-shadow duration-300">
          <img
            src="https://i.ibb.co.com/SwfBWRcv/high-quality.jpg"
            alt="High Quality"
            className="w-25 h-25 mb-4 rounded-full"
          />
          <h3 className="text-xl font-semibold text-[#0D9488] mb-2">
            High Quality
          </h3>
          <p className="text-gray-600">
            Our products are made with premium materials to ensure durability
            and top-notch performance.
          </p>
        </div>

        {/* Benefit 2 */}
        <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow hover:shadow-xl transition-shadow duration-300">
          <img
            src="https://i.ibb.co.com/j9zfgxkG/fast-delivery.jpg"
            alt="Fast Delivery"
            className="w-25 h-25 mb-4 rounded-full"
          />
          <h3 className="text-xl font-semibold text-[#0D9488] mb-2">
            Fast Delivery
          </h3>
          <p className="text-gray-600">
            Get your products quickly with our reliable shipping services.
          </p>
        </div>

        {/* Benefit 3 */}
        <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow hover:shadow-xl transition-shadow duration-300">
          <img
            src="https://i.ibb.co.com/tpW12Zy4/24-7-service.jpg"
            alt="24/7 Support"
            className="w-25 h-25 mb-4 rounded-full"
          />
          <h3 className="text-xl font-semibold text-[#0D9488] mb-2">
            24/7 Support
          </h3>
          <p className="text-gray-600">
            Our support team is always ready to help you with any questions or
            issues.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BenefitsSection;
