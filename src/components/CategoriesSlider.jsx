"use client";
import React, { useRef } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import categories from "@/data/categories.json";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Navigation } from "swiper/modules";
import Image from "next/image";
export default function CategoriesSlider() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  return (
    <>
      <Swiper
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          320: { slidesPerView: 4 }, // موبايل
          640: { slidesPerView: 4 }, // تابلت
        }}
        loop={true}
        spaceBetween={20}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
          swiper.navigation.init();
          swiper.navigation.update();
        }}
        modules={[Autoplay, Navigation]}
        className="mySwiper "
      >
        {categories.map((c, i) => (
          <SwiperSlide key={i} className="">
            <div className="category relative w-full flex flex-col items-center  ">
              <Image
                src={c.image}
                alt={c.title}
                width={70}
                height={70}
                quality={100}
                unoptimized
                className="w-full h-full   rounded-lg"
              />
              <div className="text-[10px]">{c.title}</div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
