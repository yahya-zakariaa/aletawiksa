"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { toast } from "sonner";

export default function CartPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const cartProducts = localStorage.getItem("cart");
    let cart = cartProducts ? JSON.parse(cartProducts) : [];
    setProducts(cart);
  }, []);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;

    const updatedProducts = products.map((product) =>
      product.id === id ? { ...product, quantity: newQuantity } : product
    );

    setProducts(updatedProducts);
    localStorage.setItem("cart", JSON.stringify(updatedProducts));
    toast.success("تم تحديث الكمية");
  };

  const removeFromCart = (id) => {
    const updatedProducts = products.filter((product) => product.id !== id);
    setProducts(updatedProducts);
    localStorage.setItem("cart", JSON.stringify(updatedProducts));
    toast.success("تم إزالة المنتج من السلة");
  };

  const calculateTotal = () => {
    return products.reduce((total, product) => {
      return total + product.price * product.quantity;
    }, 0);
  };

  if (products.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 mt-10">
        <div className="text-center">
          <div className="bg-white p-8 rounded-xl shadow-md max-w-md mx-auto">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 mx-auto text-gray-400 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              alt="Empty Cart Icon"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              سلة التسوق فارغة
            </h2>
            <p className="text-gray-600 mb-6">
              لم تقم بإضافة أي منتجات إلى سلة التسوق بعد
            </p>
            <a
              href="/products"
              className="bg-[#4d1572] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#6b1fa3] transition-colors"
            >
              تصفح المنتجات
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 mt-34 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-8">
          سلة التسوق
        </h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* قائمة المنتجات */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="flex flex-col sm:flex-row border-b border-gray-200 last:border-b-0 p-4"
                >
                  <div className="sm:w-32 h-32 aspect-square relative mb-4 sm:mb-0">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-contain"
                    />
                  </div>

                  <div className="flex-grow sm:px-4">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                      {product.description}
                    </p>

                    <div className="flex items-center mt-4">
                      <span className="text-lg font-bold text-[#4d1572]">
                        {product.price.toLocaleString()} ر.س
                      </span>
                      {product.discount > 0 && (
                        <span className="text-sm text-red-600 bg-red-100 px-2 py-1 rounded-full mr-3">
                          خصم {product.discount}%
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex  items-center gap-5 justify-between mt-4 sm:mt-0">
                    <div className="flex items-center border border-gray-300 rounded-lg">
                      <button
                        onClick={() =>
                          updateQuantity(product.id, product.quantity - 1)
                        }
                        className="px-3 py-1 cursor-pointer text-gray-600 hover:bg-gray-100"
                      >
                        -
                      </button>
                      <span className="px-3 py-1">{product.quantity}</span>
                      <button
                        onClick={() =>
                          updateQuantity(product.id, product.quantity + 1)
                        }
                        className="px-3 py-1 cursor-pointer text-gray-600 hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(product.id)}
                      className="text-red-500 hover:text-red-700 cursor-pointer  flex items-center justify-center"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ملخص الطلب */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                ملخص الطلب
              </h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span>عدد المنتجات:</span>
                  <span>
                    {products.reduce(
                      (total, product) => total + product.quantity,
                      0
                    )}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>مجموع الأسعار:</span>
                  <span>{calculateTotal().toLocaleString()} ر.س</span>
                </div>

                <div className="flex justify-between text-green-600">
                  <span>الخصم:</span>
                  <span>
                    -
                    {products
                      .reduce((total, product) => {
                        return (
                          total +
                          product.price *
                            (product.discount / 100) *
                            product.quantity
                        );
                      }, 0)
                      .toLocaleString()}{" "}
                    ر.س
                  </span>
                </div>

                <div className="border-t border-gray-300 pt-3 mt-3">
                  <div className="flex justify-between font-bold text-lg">
                    <span>الإجمالي:</span>
                    <span className="text-[#4d1572]">
                      {(
                        calculateTotal() -
                        products.reduce((total, product) => {
                          return (
                            total +
                            product.price *
                              (product.discount / 100) *
                              product.quantity
                          );
                        }, 0)
                      ).toLocaleString()}{" "}
                      ر.س
                    </span>
                  </div>
                </div>
              </div>

              <button className="w-full bg-[#4d1572] text-white py-3 rounded-lg font-medium hover:bg-[#6b1fa3] transition-colors">
                إتمام الشراء
              </button>

              <a
                href="/products"
                className="block text-center text-[#4d1572] mt-4 hover:underline"
              >
                ← مواصلة التسوق
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
