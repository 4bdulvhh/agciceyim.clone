import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";

const images = [
  "https://agciceyim.az/data/slider/40/40_az.jpg",
  "https://agciceyim.az/data/slider/36/36_az.jpg",
  "https://agciceyim.az/data/slider/31/31_az.jpg",
  "https://agciceyim.az/data/slider/38/38_az.jpg",
  "https://agciceyim.az/data/slider/29/29_az.jpg",
  "https://agciceyim.az/data/slider/30/30_az.jpg",
];

const Slider = () => {
  return (
    <div className=" mt-[88px] lg:mt-0 max-w-full">
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination, Autoplay]}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              className="slider-image"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;
