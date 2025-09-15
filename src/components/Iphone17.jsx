"use client";
import React, { useEffect, useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import phones from "@/data/phones.json";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Autoplay, Pagination } from "swiper/modules";
import Image from "next/image";
import { toast } from "sonner";
import Link from "next/link";
export default function Iphone17() {
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
          540: { slidesPerView: 2 }, // تابلت
          1024: { slidesPerView: 3 }, // لاب توب
          1280: { slidesPerView: 3 }, // شاشات أكبر
        }}
        spaceBetween={10}
        loop={true}
        onInit={(swiper) => {
          swiper.pagination.init();
          swiper.pagination.update();
        }}
        pagination={{
          el: ".custom-pagination1",
          clickable: true,
          dynamicBullets: true,
        }}
        modules={[Autoplay, Pagination]}
        className="mySwiper overflow-hidden rounded-2xl"
      >
        {phones.new2.map((p, i) => (
          <SwiperSlide key={i} className="">
            <Link
              href={`/products/${p.category}/${p.type}/${p.id}`}
              className="product sm:px-3 p-2 sm:py-4 rounded-2xl bg-white    block  w-full  "
            >
              <div className="grid grid-cols-12 gap-2 items-center">
                <div className="image md:col-span-5 col-span-12  w-full relative h-[150px] overflow-hidden rounded-2xl">
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    quality={100}
                    unoptimized
                    className={` mx-auto w-full rounded-2xl  ${
                      p.type !== "samsung"
                        ? " scale-155  object-cover"
                        : " object-contain"
                    }   `}
                  />
                </div>
                <div className="flex md:col-span-7 col-span-12 flex-col justify-between w-full ">
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
                      خصم {p.disc}%
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
        className="custom-pagination1 absolute left-1/2  w-full"
      ></div>
    </>
  );
}
