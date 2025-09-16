import Image from "next/image";
import React from "react";

export default function Footer() {
  return (
    <footer className="w-full md:px-10 pt-5 md:pb-5 pb-20 bg-[#e3d0e8]">
      <div className="container grid grid-cols-12 mx-auto md:w-[90%] items-start   py-5 md:py-10">
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
          <div className=" flex flex-col items-center col-span-12 md:col-span-6">
            <h3 className="text-white text-[20px] mb-[16px]">
              تابعونا وصيروا اقرب
            </h3>
            <div className="links">
              <span className="border border-[#4d1572] p-2 rounded-full inline-block me-2 hover:scale-110 transition-all cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="#4d1572"
                    d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4zm9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8A1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5a5 5 0 0 1-5 5a5 5 0 0 1-5-5a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3"
                  />
                </svg>
              </span>
              <span className="border border-[#4d1572] p-2 rounded-full inline-block me-2 hover:scale-110 transition-all cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill="#4d1572"
                    d="M9.294 6.928L14.357 1h-1.2L8.762 6.147L5.25 1H1.2l5.31 7.784L1.2 15h1.2l4.642-5.436L10.751 15h4.05zM7.651 8.852l-.538-.775L2.832 1.91h1.843l3.454 4.977l.538.775l4.491 6.47h-1.843z"
                  />
                </svg>
              </span>
              <span className="border border-[#4d1572] p-2 rounded-full inline-block me-2 hover:scale-110 transition-all cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M21.07 16.17c-.34-.93-2.4-1.06-3.36-3.19c-.06-.16-.05-.27.11-.37c.74-.49 1.26-.76 1.56-1.33c.22-.41.25-.89.08-1.33c-.23-.61-.81-1-1.52-1c-.25 0-.45.05-.55.07c.01-.42 0-.86-.04-1.3c-.13-1.53-.67-2.34-1.23-2.98C15.79 4.37 14.48 3 12 3S8.21 4.37 7.88 4.74c-.56.64-1.1 1.45-1.23 2.98c-.03.44-.04.88-.04 1.3c-.11-.03-.3-.07-.55-.07c-.7 0-1.29.38-1.52 1c-.17.43-.14.92.08 1.33c.31.58.82.84 1.56 1.33c.16.11.17.21.11.37c-.97 2.13-3.02 2.26-3.36 3.19c-.15.4-.05.85.32 1.23c.57.59 1.63.77 1.84.91c.17.14.15.56.63.9c.38.26.8.28 1.25.29c1.31.05 1.6.27 2.1.58c.63.39 1.49.92 2.93.92s2.3-.53 2.93-.92c.5-.31.79-.53 2.1-.58c.45-.02.87-.03 1.25-.29c.49-.34.47-.76.63-.9c.21-.14 1.27-.32 1.84-.91c.37-.38.47-.83.32-1.23m-1.03.53c-.37.39-1.26.5-1.73.82c-.48.42-.4.74-.59.87c-.13.09-.36.1-.72.12c-1.4.05-1.91.31-2.52.69c-1.43.88-2.23.8-2.48.8s-1.05.08-2.47-.81c-.61-.38-1.11-.63-2.52-.69c-.36-.01-.59-.03-.72-.12c-.19-.13-.12-.45-.59-.87c-.48-.32-1.36-.43-1.73-.82c-.06-.06-.11-.14-.12-.15c.07-.1.41-.3.66-.44c.78-.46 1.98-1.14 2.71-2.75c.26-.7.03-1.26-.48-1.59c-1.15-.73-1.13-.76-1.24-.96a.62.62 0 0 1-.03-.5c.12-.32.45-.35.58-.35c.19 0 .18.01 1.57.37c-.02-1.4-.04-1.85.02-2.51c.11-1.31.57-1.93.98-2.4C8.9 5.11 9.99 3.98 12 4c2.01-.02 3.1 1.11 3.37 1.41c.41.47.87 1.09.98 2.4c.06.66.04 1.11.02 2.51c1.4-.36 1.38-.37 1.57-.37c.14 0 .46.03.58.35c.07.17.06.35-.03.5c-.11.2-.09.22-1.23.97c-.51.33-.74.89-.48 1.59c.73 1.61 1.93 2.29 2.71 2.75c.25.15.59.34.66.44c0 .01-.06.09-.11.15"
                  />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
