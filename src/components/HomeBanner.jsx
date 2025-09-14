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
        spaceBetween={50}
        loop={true}
        modules={[Autoplay]}
        className="mySwiper overflow-hidden rounded-2xl"
      >
        <SwiperSlide>
          <Image
            src={"/banner3.jpg"}
            width={200}
            height={200}
            quality={100}
            unoptimized
            className="w-full  mx-auto md:aspect-[3/1.5] md:object-cover   aspect-[2/1.7] rounded-2xl  "
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src={"/banner2.jpg"}
            width={200}
            height={200}
            quality={100}
            unoptimized
            className="w-full  mx-auto md:aspect-[3/1.5] md:object-cover   aspect-[2/1.7] rounded-2xl  "
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src={"/banner1.jpg"}
            width={200}
            height={200}
            quality={100}
            unoptimized
            className="w-full  mx-auto md:aspect-[3/1.5] md:object-cover   aspect-[2/1.7] rounded-2xl  "
          />
        </SwiperSlide>
      </Swiper>
    </>
  );
}
