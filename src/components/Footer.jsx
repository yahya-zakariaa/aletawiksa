import Image from "next/image";
import React from "react";

export default function Footer() {
  return (
    <footer className="w-full px-10 pt-5 md:pb-5 pb-20 bg-[#e3d0e8]">
      <div className="container grid grid-cols-12 mx-auto w-[90%] items-start   py-5 md:py-10">
        <div className="flex px-3 flex-col md:col-span-5 col-span-12 md:text-start text-center">
          <Image
            src="/logo.png"
            alt="logo"
            width={150}
            height={50}
            className="mb-5"
          />
          <div className="content">
            <h3 className="text-white text-[20px]">مين احنا؟</h3>
            <p className="mt-3 text-[14px] text-[#4d1572] font-medium">
              متجر سعودي رائد يتميّز بكفاءة إدارية عالية ومعرفة علمية متخصصة،
              نُقدم من خلالها أفضل الحلول والمنتجات لعملائنا. نحن وكلاء وموزعون
              معتمدون لأبرز الشركات العالمية والمحلية، و علامة تجارية مسجلة و
              نفخر بتحدي المنافسة على مستوى الجودة والخدمة والأسعار، ونسعى
              دائمًا لتقديم تجربة تسوّق استثنائية تُلبي كافة احتياجات عملائنا،
              بأعلى معايير الجودة وأفضل الأسعار. رؤيتنا قائمة على التطوير
              المستمر والارتقاء الدائم بمستوى الخدمة والأداء، لأن رضا عملائنا هو
              غايتنا الأسمى.
            </p>
          </div>
          <div className="flex  items-center md:justify-start justify-center gap-3  mt-3">
            <Image
              src="/download1.svg"
              alt="payment methods"
              width={120}
              height={30}
              unoptimized
              className="mt-5"
            />
            <Image
              src="/download2.svg"
              alt="payment methods"
              width={120}
              height={30}
              unoptimized
              className="mt-5"
            />
          </div>
        </div>
        <div className=" col-span-12 md:col-span-7 w-full grid grid-cols-12  md:gap-10">
          <div className="grid grid-cols-12 col-span-12 md:mt-0 mt-3  md:col-span-6">
            <div className=" col-span-6 px-2">
              <div className="flex flex-col md:text-start text-center w-full">
                <h3 className="text-white text-[20px] mb-[16px]">وين تلقانا</h3>
                <p className="text-[#4d1572] text-[13px] font-[500] mb-2">
                  الفرع الاول الرياض - حي القادسية - طريق الشيخ جابر
                </p>
                <p className="text-[#4d1572] text-[13px] font-[500] ">
                  الفرع الثاني الرياض - حي الياسمين - طريق انس بن مالك
                </p>
              </div>
            </div>
            <div className=" col-span-6 px-2">
              <div className="flex flex-col md:text-start text-center w-full">
                <h3 className="text-white text-[20px] mb-[16px]">روابط مهمه</h3>
                <p className="text-[#4d1572] text-[13px] font-[500] mb-1">
                  سياسة الخصوصية
                </p>
                <p className="text-[#4d1572] text-[13px] font-[500] mb-1">
                  الشروط والاحكام
                </p>
                <p className="text-[#4d1572] text-[13px] font-[500] mb-1">
                  الاستبدال و الاسترجاع
                </p>
                <p className="text-[#4d1572] text-[13px] font-[500] mb-1">
                  الشحن والتوصيل
                </p>
                <p className="text-[#4d1572] text-[13px] font-[500] ">
                  اتصل بنا
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
