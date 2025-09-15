"use client";
import React, { useEffect, useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import phones from "@/data/phones.json";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import Image from "next/image";
import { toast } from "sonner";
import Link from "next/link";
export default function NewProducts() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const paginationRef = useRef(null);

  const addToCart = (product) => {
    try {
      const cartProducts = localStorage.getItem("cart");
      let cart = cartProducts ? JSON.parse(cartProducts) : [];

      // التحقق مما إذا كان المنتج موجودًا بالفعل في السلة
      const existingProductIndex = cart.findIndex((p) => p.id === product.id);

      if (existingProductIndex !== -1) {
        // إذا كان المنتج موجودًا، نزيد الكمية فقط
        cart[existingProductIndex].quantity += 1;
        toast.info("تم زيادة كمية المنتج في السلة", { duration: 3000 });
      } else {
        // إذا لم يكن المنتج موجودًا، نضيفه مع كمية = 1
        cart.push({ ...product, quantity: 1 });
        toast.success("تم إضافة المنتج إلى السلة بنجاح!", { duration: 3000 });
      }

      localStorage.setItem("cart", JSON.stringify(cart));
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("حدث خطأ أثناء إضافة المنتج إلى السلة", { duration: 3000 });
    }
  };
  return (
    <>
      <Swiper
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          320: { slidesPerView: 2, spaceBetween: 10 }, // موبايل
          540: { slidesPerView: 5 }, // تابلت
        }}
        spaceBetween={10}
        loop={true}
        onInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
          swiper.params.pagination.el = paginationRef.current;
          swiper.navigation.init();
          swiper.pagination.init();
          swiper.navigation.update();
          swiper.pagination.update();
        }}
        navigation={{
          prevEl: ".custom-prev",
          nextEl: ".custom-next",
        }}
        pagination={{
          el: ".custom-pagination2",
          clickable: true,
          dynamicBullets: true,
        }}
        modules={[Autoplay, Navigation, Pagination]}
        className="mySwiper overflow-hidden rounded-2xl"
      >
        {phones.news.map((p, i) => (
          <SwiperSlide key={i} className="">
            <Link
              href={`/products/${p.category}/${p.type}/${p.id}`}
              className="product sm:px-3 p-2 sm:py-4 rounded-2xl bg-white    block  w-full  "
            >
              <div className="flex  flex-col items-center sm:items-start gap-2">
                <div className="image sm:aspect-[1/.6] aspect-[1/.6] w-full relative   h-full">
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    quality={100}
                    unoptimized
                    className=" mx-auto  md:max-w-[70px] max-w-[90px] md:max-h-[90px] max-h-[120px]  "
                  />
                </div>
                <div className="flex flex-col justify-between  w-full ">
                  <h3 className="sm:text-sm text-xs w-full text-nowrap">
                    {p.name}
                  </h3>
                  <p className="text-xs text-gray-500 line-clamp-1">
                    {p.description}
                  </p>
                  <div className="flex items-center justify-between sm:mt-5 mt-8">
                    <span className="sm:text-md text-[14px] font-bold text-[#333] ">
                      {p.price} ر.س
                    </span>
                    <span className="text-[10px] text-red-500 bg-red-100 sm:px-2 sm:py-1 px-1 py-0.5 rounded">
                      خصم {p.discount}%
                    </span>
                  </div>
                  <button
                    onClick={() => addToCart(p)}
                    className="bg-[#9d5ea9] sm:text-md text-xs text-white w-full py-2 rounded-md mt-3 flex items-center justify-center gap-2 hover:bg-[#6b1fa3] transition-colors cursor-pointer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                    >
                      <g
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1.5"
                      >
                        <path d="M20.177 12.511c-.35-3.002-.863-5.253-1.338-6.852c-.389-1.312-.584-1.968-1.382-2.563S15.843 2.5 14.211 2.5H8.79c-1.632 0-2.448 0-3.246.596c-.798.595-.993 1.251-1.382 2.563c-.475 1.599-.987 3.85-1.337 6.852c-.413 3.539-.62 5.308.573 6.648C4.591 20.5 6.524 20.5 10.392 20.5h2.216" />
                        <path d="M8.5 6.5a3 3 0 0 0 6 0m1 12h6m-3 3v-6" />
                      </g>
                    </svg>
                    أضف للسله
                  </button>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
      <div
        ref={paginationRef}
        className="custom-pagination2 absolute left-1/2  w-full"
      ></div>
      <button
        ref={nextRef}
        className="custom-next absolute md:block hidden z-30 cursor-pointer -left-8 top-[65%] -translate-y-1/2 bg-[#8749b3] text-[#fff] rounded-full p-2 "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
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
        className="custom-prev absolute md:block hidden -right-8 z-30 cursor-pointer top-[65%] -translate-y-1/2 bg-[#8749b3] text-[#fff] rounded-full p-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 7 16"
        >
          <path
            fill="currentColor"
            d="M1.5 13a.47.47 0 0 1-.35-.15c-.2-.2-.2-.51 0-.71L5.3 7.99L1.15 3.85c-.2-.2-.2-.51 0-.71s.51-.2.71 0l4.49 4.51c.2.2.2.51 0 .71l-4.5 4.49c-.1.1-.23.15-.35.15"
          />
        </svg>
      </button>
    </>
  );
}
