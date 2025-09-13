"use client";
import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Image from "next/image";
export default function HomeBanner() {
  return (
    <>
      <Swiper
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        loop={true}
        modules={[Autoplay]}
        className="mySwiper"
      >
        <SwiperSlide>
          <Image
            src={"/banner3.webp"}
            width={200}
            height={200}
            quality={100}
            unoptimized
            className="w-full h-full  aspect-[3/1.25] object-cover rounded-lg"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src={"/banner4.png"}
            width={200}
            height={200}
            quality={100}
            unoptimized
            className="w-full h-full  aspect-[3/1.25] object-cover rounded-lg"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src={"/banner5.jpg"}
            width={200}
            height={200}
            quality={100}
            unoptimized
            className="w-full h-full  aspect-[3/1.25] object-cover rounded-lg"
          />
        </SwiperSlide>
      </Swiper>
    </>
  );
}
