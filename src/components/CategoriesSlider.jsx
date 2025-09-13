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
        slidesPerView={3.2}
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
          <SwiperSlide key={i} className="p-10">
            <div className="category relative aspect-[1/1] rounded-lg overflow-hidden">
              <Image
                src={c.image}
                alt={c.title}
                width={200}
                height={200}
                quality={100}
                unoptimized
                className="w-full h-full   rounded-lg"
              />
              <div className="w-full h-full font-bold text-lg absolute top-0 left-0 bg-black/60 text-white flex items-center justify-center py-2 ">
                {c.title}
              </div>
            </div>
          </SwiperSlide>
        ))}
        <button
          ref={nextRef}
          className="absolute z-50 cursor-pointer left-0 top-1/2 -translate-y-1/2 text-[#4d1572] "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="50"
            height="50"
            viewBox="0 0 7 16"
          >
            <path
              fill="currentColor"
              d="M5.5 13a.47.47 0 0 1-.35-.15l-4.5-4.5c-.2-.2-.2-.51 0-.71l4.5-4.49c.2-.2.51-.2.71 0s.2.51 0 .71L1.71 8l4.15 4.15c.2.2.2.51 0 .71c-.1.1-.23.15-.35.15Z"
            />
          </svg>
        </button>
        <button
          ref={prevRef}
          className="absolute right-0 z-50 cursor-pointer top-1/2 -translate-y-1/2 text-[#4d1572]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="50"
            height="50"
            viewBox="0 0 7 16"
          >
            <path
              fill="currentColor"
              d="M1.5 13a.47.47 0 0 1-.35-.15c-.2-.2-.2-.51 0-.71L5.3 7.99L1.15 3.85c-.2-.2-.2-.51 0-.71s.51-.2.71 0l4.49 4.51c.2.2.2.51 0 .71l-4.5 4.49c-.1.1-.23.15-.35.15"
            />
          </svg>
        </button>
      </Swiper>
    </>
  );
}
