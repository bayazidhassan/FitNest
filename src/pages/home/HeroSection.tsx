import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const HeroSection = () => {
  const heroImages = [
    "https://i.ibb.co.com/F4JWMJtv/pic-1.jpg",
    "https://i.ibb.co.com/35pvGXj5/pic-2.jpg",
    "https://i.ibb.co.com/sptkXCmK/pic-3.jpg",
    "https://i.ibb.co.com/jZjLwGT1/pic-4.jpg",
    "https://i.ibb.co.com/KchW53js/pic-5.jpg",
  ];

  return (
    <div className="-mt-4 w-full h-96 md:h-[700px]">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 3000 }}
        pagination={{ clickable: true }}
        loop
        className="w-full h-full"
      >
        {heroImages.map((img, index) => (
          <SwiperSlide key={index}>
            <div
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${img})` }}
            >
              <div className="w-full h-full bg-black/40 flex flex-col justify-center items-center">
                <h1 className="text-white text-center text-4xl md:text-6xl font-bold drop-shadow-lg">
                  FitNest — Your Fitness Partner
                </h1>
                <p className="text-white text-center text-lg md:text-2xl mt-4">
                  Best Gym Equipment & Accessories in Bangladesh
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroSection;
