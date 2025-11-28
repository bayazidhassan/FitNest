const ImageGallery = () => {
  return (
    <div className="my-20 max-w-7xl mx-auto px-4">
      {/* Section Header */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-[#0D9488]">
          Our Happy Customers
        </h1>
        <p className="text-gray-600 mt-3 max-w-xl mx-auto">
          See how our products have helped individuals lead healthier lives.
        </p>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="col-span-2 row-span-2 overflow-hidden rounded-lg">
          <img
            src="https://i.ibb.co.com/F4JWMJtv/pic-1.jpg"
            alt="Happy Customer 1"
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="overflow-hidden rounded-lg">
          <img
            src="https://i.ibb.co.com/35pvGXj5/pic-2.jpg"
            alt="Happy Customer 2"
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="overflow-hidden rounded-lg">
          <img
            src="https://i.ibb.co.com/sptkXCmK/pic-3.jpg"
            alt="Happy Customer 3"
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="overflow-hidden rounded-lg">
          <img
            src="https://i.ibb.co.com/jZjLwGT1/pic-4.jpg"
            alt="Happy Customer 4"
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="overflow-hidden rounded-lg">
          <img
            src="https://i.ibb.co.com/KchW53js/pic-5.jpg"
            alt="Happy Customer 5"
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      </div>
    </div>
  );
};

export default ImageGallery;
