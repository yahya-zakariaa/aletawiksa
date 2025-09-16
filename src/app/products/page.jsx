"use client";
import React, { useEffect, useState } from "react";
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

const modules = {
  phones: () => import("@/data/phones.json"),
  gaming: () => import("@/data/gaming.json"),
  // headphone: () => import("@/data/headphone.json"),
  // ipad: () => import("@/data/ipad.json"),
  // watchs: () => import("@/data/watchs.json"),
};

const shuffleArray = (array) => {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

export default function Page() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortOption, setSortOption] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAllProducts = async () => {
      try {
        setLoading(true);

        // تحميل جميع البيانات من جميع الوحدات
        const moduleKeys = Object.keys(modules);
        const allProducts = [];

        for (const key of moduleKeys) {
          try {
            const module = await modules[key]();
            const data = module.default || module;

            // جمع جميع المنتجات من جميع الفئات
            Object.values(data).forEach((categoryProducts) => {
              if (Array.isArray(categoryProducts)) {
                allProducts.push(...categoryProducts);
              }
            });
          } catch (error) {
            console.error(`Error loading ${key} data:`, error);
          }
        }

        // خلط المنتجات عشوائياً
        const shuffledProducts = shuffleArray(allProducts);
        setProducts(shuffledProducts);
        setFilteredProducts(shuffledProducts);
      } catch (error) {
        console.error("Error loading products:", error);
        toast.error("حدث خطأ في تحميل المنتجات");
      } finally {
        setLoading(false);
      }
    };

    loadAllProducts();
  }, []);

  // فلترة المنتجات بناءً على البحث
  useEffect(() => {
    let filtered = [...products];

    if (searchQuery) {
      filtered = filtered.filter((product) =>
        product.name?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  }, [searchQuery, products]);

  const sortProducts = (option) => {
    let sorted = [...filteredProducts];
    if (option === "priceAsc") {
      sorted.sort((a, b) => {
        const priceA = parseFloat(a.price?.toString().split(" ")[0]) || 0;
        const priceB = parseFloat(b.price?.toString().split(" ")[0]) || 0;
        return priceA - priceB;
      });
    } else if (option === "priceDesc") {
      sorted.sort((a, b) => {
        const priceA = parseFloat(a.price?.toString().split(" ")[0]) || 0;
        const priceB = parseFloat(b.price?.toString().split(" ")[0]) || 0;
        return priceB - priceA;
      });
    } else if (option === "disc") {
      sorted.sort((a, b) => (b.disc || 0) - (a.disc || 0));
    } else if (option === "name") {
      sorted.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
    }
    setFilteredProducts(sorted);
  };

  const addToCart = (product, e) => {
    e.preventDefault();
    e.stopPropagation();

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

  if (loading) {
    return (
      <section className="min-h-screen mt-24 md:mt-40 px-4 sm:px-6 pb-10 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4d1572] mx-auto"></div>
          <p className="mt-4 text-gray-600">جاري تحميل المنتجات...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen mt-24 md:mt-40 px-4 sm:px-6 pb-10">
      {/* العنوان الرئيسي */}
      <div className="header mb-4 md:mb-6 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-[#4d1572]">
          جميع المنتجات
        </h1>
        <p className="text-gray-600 mt-3 md:mt-4 text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
          تصفح جميع المنتجات المتاحة في متجرنا واختر ما يناسبك
        </p>
      </div>

      {/* شريط البحث */}
      <div className="w-full max-w-7xl mx-auto gap-5 mb-6 flex justify-between items-center flex-wrap">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="ابحث عن منتج..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-3 pl-10 border border-[#4d1572]/30 rounded-lg focus:ring-2 focus:ring-[#4d1572] focus:border-transparent"
          />
          <svg
            className="absolute left-3 top-3.5 h-5 w-5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <Select onValueChange={(value) => setSortOption(value)}>
          <SelectTrigger className="bg-white border-[#4d1572]/20 py-3">
            <SelectValue placeholder="ترتيب حسب" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="priceAsc">السعر: من الأرخص للأغلى</SelectItem>
            <SelectItem value="priceDesc">السعر: من الأغلى للأرخص</SelectItem>
            <SelectItem value="disc">أعلى خصم</SelectItem>
            <SelectItem value="name">الاسم</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* عدد المنتجات وخيارات التصفية */}
      <div className="w-full max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 md:mb-8">
        <p className="text-gray-700 text-base sm:text-lg font-medium whitespace-nowrap">
          إجمالي المنتجات:{" "}
          <span className="text-[#4d1572] font-bold">
            {filteredProducts.length}
          </span>
        </p>
      </div>

      {/* شبكة المنتجات */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 max-w-7xl mx-auto">
        {filteredProducts.map((p, i) => {
          const priceString = p.price?.toString() || "0";
          // نأخذ الجزء الأول قبل المسافة إذا كان هناك مسافة
          const price = parseFloat(priceString.split(" ")[0]) || 0;

          return (
            <div
              key={i}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-[#4d1572]/20"
            >
              <Link
                href={`/products/${p.category}/${p.type}/${p.id}`}
                className=""
              >
                {/* صورة المنتج */}
                <div className="w-full h-[180px] overflow-hidden rounded-2xl relative">
                  <Image
                    src={p.image || "/placeholder-image.jpg"}
                    alt={p.name}
                    fill
                    quality={100}
                    unoptimized
                    className={`mx-auto w-full rounded-2xl ${
                      p.name?.includes("17") || p.name?.includes("Air")
                        ? "object-cover scale-130"
                        : "object-contain sm:scale-100 scale-80"
                    }`}
                  />
                  {p.disc > 0 && (
                    <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      خصم {p.disc}%
                    </div>
                  )}
                </div>

                {/* معلومات المنتج */}
                <div className="px-4 mt-4">
                  <h3 className="text-base md:text-lg font-semibold text-gray-800 line-clamp-1 mb-2">
                    {p.name}
                  </h3>

                  {/* السعر والخصم */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-lg md:text-xl font-bold text-[#4d1572]">
                      {price.toLocaleString()} ر.س
                    </span>
                    {p.disc > 0 && (
                      <span className="text-xs text-red-600 bg-red-100 px-2 mt-2 py-1 rounded-full">
                        وفر {Math.round(price * (p.disc / 100))} ر.س
                      </span>
                    )}
                  </div>
                </div>
              </Link>

              {/* زر الإضافة إلى السلة */}
              <div className="px-4 pb-4">
                <button
                  onClick={(e) => addToCart(p, e)}
                  className="w-full bg-[#4d1572] cursor-pointer text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-[#6b1fa3] transition-colors duration-200 text-sm md:text-base font-medium transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 512 512"
                  >
                    <path
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="32"
                      d="M256 256v128m64-64H192M80 176a16 16 0 0 0-16 16v216c0 30.24 25.76 56 56 56h272c30.24 0 56-24.51 56-54.75V192a16 16 0 0 0-16-16Zm80 0v-32a96 96 0 0 1 96-96h0a96 96 0 0 1 96 96v32"
                    />
                  </svg>
                  أضف للسلة
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* رسالة عندما لا يوجد منتجات */}
      {filteredProducts.length === 0 && !loading && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">لا توجد منتجات تطابق بحثك</p>
        </div>
      )}
    </section>
  );
}
