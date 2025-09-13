"use client";
import React, { useEffect, useState } from "react";
import phones from "@/data/phones.json";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import Link from "next/link";

export default function Page() {
  const [products, setProducts] = useState([]);
  const [sortOption, setSortOption] = useState("");

  useEffect(() => {
    const allProducts = Object.values(phones).reduce((p, c) => p.concat(c), []);
    setProducts(allProducts);
  }, []);

  const sortProducts = (option) => {
    let sorted = [...products];
    if (option === "priceAsc") {
      sorted.sort((a, b) => a.price - b.price);
    } else if (option === "priceDesc") {
      sorted.sort((a, b) => b.price - a.price);
    } else if (option === "discount") {
      sorted.sort((a, b) => b.discount - a.discount);
    } else if (option === "name") {
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    }
    setProducts(sorted);
  };

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

  useEffect(() => {
    if (sortOption) sortProducts(sortOption);
  }, [sortOption]);

  return (
    <section className="min-h-screen mt-44 md:mt-40 px-4 sm:px-6 pb-10">
      {/* العنوان الرئيسي */}
      <div className="header mb-4 md:mb-6 text-center">
        <p className="text-gray-600 mt-3 md:mt-4 text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
          تصفح جميع المنتجات المتاحة في متجرنا واختر ما يناسبك
        </p>
      </div>

      {/* عدد المنتجات وخيارات التصفية */}
      <div className="w-full max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 md:mb-8">
        <p className="text-gray-700 text-base sm:text-lg font-medium whitespace-nowrap">
          إجمالي المنتجات:{" "}
          <span className="text-[#4d1572] font-bold">{products.length}</span>
        </p>
        <Select onValueChange={(value) => setSortOption(value)}>
          <SelectTrigger className="w-full sm:w-[220px] bg-white border-[#4d1572]/20">
            <SelectValue placeholder="ترتيب حسب" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="priceAsc">السعر: من الأرخص للأغلى</SelectItem>
            <SelectItem value="priceDesc">السعر: من الأغلى للأرخص</SelectItem>
            <SelectItem value="discount">أعلى خصم</SelectItem>
            <SelectItem value="name">الاسم</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* شبكة المنتجات */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6 max-w-7xl mx-auto">
        {products.map((p, i) => (
          <Link
            href={`/products/${p.category}/${p.type}/${p.id}`}
            key={i}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-[#4d1572]/20"
          >
            {/* صورة المنتج */}
            <div className="aspect-[1/1.2] w-full relative ">
              <Image
                src={p.image}
                alt={p.name}
                fill
                quality={100}
                unoptimized
                className="object-contain w-full h-full p-4 transition-transform duration-300 hover:scale-105"
              />
              {p.discount > 0 && (
                <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  خصم {p.discount}%
                </div>
              )}
            </div>

            {/* معلومات المنتج */}
            <div className="p-4">
              <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-2 line-clamp-1">
                {p.name}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 mb-3 line-clamp-2 leading-relaxed h-12">
                {p.description}
              </p>

              {/* السعر والخصم */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-lg md:text-xl font-bold text-[#4d1572]">
                  {p.price.toLocaleString()} ر.س
                </span>
                {p.discount > 0 && (
                  <span className="text-xs sm:text-sm text-red-600 bg-red-100 px-2 py-1 rounded-full">
                    وفر {Math.round(p.price * (p.discount / 100))} ر.س
                  </span>
                )}
              </div>

              {/* زر الإضافة إلى السلة */}
              <button
                onClick={() => addToCart(p)}
                className="w-full bg-[#4d1572] cursor-pointer text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-[#6b1fa3] transition-colors duration-200 text-sm md:text-base font-medium transform hover:scale-[1.02] active:scale-[0.98]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="32"
                    d="M256 256v128m64-64H192M80 176a16 16 0 0 0-16 16v216c0 30.24 25.76 56 56 56h272c30.24 0 56-24.51 56-54.75V192a16 16 0 0 0-16-16Zm80 0v-32a96 96 0 0 1 96-96h0a96 96 0 0 1 96 96v32"
                  />
                </svg>
                أضف للسلة
              </button>
            </div>
          </Link>
        ))}
      </div>

      {/* رسالة عندما لا يوجد منتجات */}
      {products.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">لا توجد منتجات لعرضها حالياً</p>
        </div>
      )}
    </section>
  );
}
