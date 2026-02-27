import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import bgImage1 from '../../assets/images/pic-1.webp';
import bgImage2 from '../../assets/images/pic-2.webp';
import bgImage3 from '../../assets/images/pic-3.webp';
import bgImage4 from '../../assets/images/pic-4.webp';
import bgImage5 from '../../assets/images/pic-5.webp';

const HeroSection = () => {
  /*
  const heroImages = [
    'https://i.ibb.co.com/F4JWMJtv/pic-1.jpg',
    'https://i.ibb.co.com/35pvGXj5/pic-2.jpg',
    'https://i.ibb.co.com/sptkXCmK/pic-3.jpg',
    'https://i.ibb.co.com/jZjLwGT1/pic-4.jpg',
    'https://i.ibb.co.com/KchW53js/pic-5.jpg',
  ];
  */
  const heroImages = [bgImage1, bgImage2, bgImage3, bgImage4, bgImage5];

  return (
    <div className="-mt-4 w-full h-96 md:h-[700px] relative">
      {/* Swiper Carousel */}
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 3000 }}
        pagination={{ clickable: true }}
        loop
        className="w-full h-full"
      >
        {heroImages.map((img, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-full">
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center opacity-90"
                style={{ backgroundImage: `url(${img})` }}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Overlay Text */}
      <div className="absolute inset-0 z-10 flex flex-col justify-center items-center text-center pointer-events-none px-4">
        <h1 className="text-white text-4xl md:text-6xl font-bold drop-shadow-lg">
          <span className="text-[#0D9488]">FitNest</span> — Your Fitness Partner
        </h1>
        <p className="text-white text-lg md:text-2xl mt-4">
          Best Gym Equipment & Accessories in Bangladesh
        </p>
      </div>
    </div>
  );
};

export default HeroSection;
