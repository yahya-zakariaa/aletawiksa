"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { toast } from "sonner";

const modules = {
  phones: () => import("@/data/phones.json"),
  // headphone: () => import("@/data/headphone.json"),
  // ipad: () => import("@/data/ipad.json"),
  // watchs: () => import("@/data/watchs.json"),
};

export default function ProductDetailPage() {
  const params = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const loadProductData = async () => {
      if (params.category && modules[params.category]) {
        try {
          setLoading(true);
          const dataModule = await modules[params.category]();
          const productData = dataModule[params.type]?.find(
            (p) => p.id.toString() === params.id
          );

          if (productData) {
            setProduct(productData);
            if (productData.colors && productData.colors.length > 0) {
              setSelectedColor(productData.colors[0].name);
            }
          } else {
            console.warn("Product not found");
          }
        } catch (error) {
          console.error("Error loading product:", error);
          toast.error("حدث خطأ في تحميل بيانات المنتج");
        } finally {
          setLoading(false);
        }
      } else {
        console.warn("Category not found:", params.category);
        setLoading(false);
      }
    };

    loadProductData();
  }, [params]);

  const addToCart = () => {
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center mt-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#4d1572]"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center mt-20">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800">المنتج غير موجود</h2>
          <p className="text-gray-600 mt-2">
            عذراً، لم يتم العثور على المنتج المطلوب
          </p>
          <a
            href="/products"
            className="text-[#4d1572] hover:underline mt-4 inline-block"
          >
            العودة إلى المتجر
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 md:mt-38 mt-16 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* مسار التنقل */}
          <nav className="text-sm text-gray-600 mb-6">
            <a href="/" className="hover:text-[#4d1572]">
              الرئيسية
            </a>
            <span className="mx-2">/</span>
            <a href="/products" className="hover:text-[#4d1572]">
              المنتجات
            </a>
            <span className="mx-2">/</span>
            <span className="text-gray-800">{product.name}</span>
            <span className="mx-2">/</span>
            <a
              href={`/category/${params.category}`}
              className="hover:text-[#4d1572] capitalize"
            >
              {params.category}
            </a>
          </nav>

          <div className="flex flex-col md:flex-row gap-8 bg-white rounded-xl shadow-md p-6">
            {/* معرض الصور */}
            <div className="md:w-1/3">
              <div className="aspect-square relative  rounded-lg overflow-hidden">
                <Image
                  src={`${product.image}`}
                  alt={product.name}
                  fill
                  className={`object-cover`}
                  unoptimized
                  quality={100}
                />
              </div>

              {product.discount > 0 && (
                <div className="absolute top-4 left-4 bg-red-500 text-white font-bold px-3 py-1 rounded-full text-sm">
                  خصم {product.discount}%
                </div>
              )}
            </div>

            {/* معلومات المنتج */}
            <div className="md:w-1/2">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                {product.name}
              </h1>

              <p className="text-gray-600 mb-6 leading-relaxed">
                {product.description}
              </p>

              {/* السعر */}
              <div className="flex items-center mb-6">
                <span className="text-2xl mb-3 font-bold text-[#4d1572]">
                  {product.price.toLocaleString()}
                </span>
                {product.discount > 0 && (
                  <span className="text-lg text-red-500 opacity-75 line-through mr-4">
                    {(
                      product.price /
                      (1 - product.discount / 100)
                    ).toLocaleString()}{" "}
                    ر.س
                  </span>
                )}
              </div>

              {/* الألوان */}
              {product.colors && product.colors.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    اختر اللون:
                  </h3>
                  <div className="flex gap-2">
                    {product.colors.map((color, index) => (
                      <button
                        key={index}
                        className={`px-4 py-2 rounded-full border ${
                          selectedColor === color.name
                            ? "border-[#4d1572] bg-[#4d1572] text-white"
                            : "border-gray-300 bg-white text-gray-800  cursor-pointer"
                        }`}
                        onClick={() => setSelectedColor(color.name)}
                      >
                        {color.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* الكمية */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  الكمية:
                </h3>
                <div className="flex items-center border border-gray-300 rounded-lg w-fit">
                  <button
                    className="px-3 py-2 cursor-pointer text-gray-600 hover:bg-gray-100"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    -
                  </button>
                  <span className="px-4 py-2">{quantity}</span>
                  <button
                    className="px-3 py-2 cursor-pointer text-gray-600 hover:bg-gray-100"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* أزرار الإجراء */}
              <div className="flex gap-4">
                <button
                  onClick={addToCart}
                  className="flex-1 cursor-pointer bg-[#4d1572] text-white py-3 px-6 rounded-lg font-medium hover:bg-[#6b1fa3] transition-colors flex items-center justify-center gap-2"
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
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="32"
                      d="M256 256v128m64-64H192M80 176a16 16 0 0 0-16 16v216c0 30.24 25.76 56 56 56h272c30.24 0 56-24.51 56-54.75V192a16 16 0 0 0-16-16Zm80 0v-32a96 96 0 0 1 96-96h0a96 96 0 0 1 96 96v32"
                    />
                  </svg>
                  أضف إلى السلة
                </button>

                <button className="px-6 py-3 cursor-pointer border border-[#4d1572] text-[#4d1572] rounded-lg font-medium hover:bg-[#4d1572] hover:text-white transition-colors">
                  شراء الآن
                </button>
              </div>

              {/* معلومات إضافية */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  معلومات المنتج:
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex">
                    <span className="w-32 font-medium">الفئة:</span>
                    <span className="capitalize">{product.category}</span>
                  </li>
                  <li className="flex">
                    <span className="w-32 font-medium">النوع:</span>
                    <span className="capitalize">{product.type}</span>
                  </li>
                  <li className="flex">
                    <span className="w-32 font-medium">التوافر:</span>
                    <span className="text-green-600">متوفر في المخزون</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
