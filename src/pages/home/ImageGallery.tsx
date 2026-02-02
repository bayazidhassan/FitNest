import bgImage1 from '../../assets/images/pic-1.jpg';
import bgImage2 from '../../assets/images/pic-2.jpg';
import bgImage3 from '../../assets/images/pic-3.jpg';
import bgImage4 from '../../assets/images/pic-4.jpg';
import bgImage5 from '../../assets/images/pic-5.jpg';

const ImageGallery = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px">
      <div className="text-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-[#0D9488]">Our Happy Customers</h1>
        <p className="text-gray-500 mt-1 max-w-3/5 mx-auto">
          See how our products have helped individuals lead healthier lives.
        </p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="col-span-2 row-span-2 overflow-hidden rounded-lg">
          <img
            //src="https://i.ibb.co.com/F4JWMJtv/pic-1.jpg"
            src={bgImage1}
            alt="Happy Customer 1"
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="overflow-hidden rounded-lg">
          <img
            //src="https://i.ibb.co.com/35pvGXj5/pic-2.jpg"
            src={bgImage2}
            alt="Happy Customer 2"
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="overflow-hidden rounded-lg">
          <img
            //src="https://i.ibb.co.com/sptkXCmK/pic-3.jpg"
            src={bgImage3}
            alt="Happy Customer 3"
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="overflow-hidden rounded-lg">
          <img
            //src="https://i.ibb.co.com/jZjLwGT1/pic-4.jpg"
            src={bgImage4}
            alt="Happy Customer 4"
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="overflow-hidden rounded-lg">
          <img
            //src="https://i.ibb.co.com/KchW53js/pic-5.jpg"
            src={bgImage5}
            alt="Happy Customer 5"
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      </div>
    </div>
  );
};

export default ImageGallery;
