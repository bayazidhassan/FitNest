import "swiper/css"; //check global.d.ts file
import "swiper/css/pagination"; //check global.d.ts file
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
          // <SwiperSlide key={index}>
          //   <div
          //     className="w-full h-full bg-cover bg-center"
          //     style={{ backgroundImage: `url(${img})` }}
          //   >
          //     <div className="w-full h-full bg-black/40 flex flex-col justify-center items-center">
          //       <h1 className="text-white text-center text-4xl md:text-6xl font-bold drop-shadow-lg">
          //         <span className="text-[#0D9488]">FitNest</span> — Your Fitness
          //         Partner
          //       </h1>
          //       <p className="text-white text-center text-lg md:text-2xl mt-4">
          //         Best Gym Equipment & Accessories in Bangladesh
          //       </p>
          //     </div>
          //   </div>
          // </SwiperSlide>
          <SwiperSlide key={index}>
            <div className="relative w-full h-full">
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center opacity-80"
                style={{ backgroundImage: `url(${img})` }}
              ></div>

              {/* Overlay Text Content */}
              <div className="relative z-10 w-full h-full flex flex-col justify-center items-center">
                <h1 className="text-white text-center text-4xl md:text-6xl font-bold drop-shadow-lg">
                  <span className="text-[#0D9488]">FitNest</span> — Your Fitness
                  Partner
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
