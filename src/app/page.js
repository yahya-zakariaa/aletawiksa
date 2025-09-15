import CategoriesSlider from "@/components/CategoriesSlider";
import HomeBanner from "@/components/HomeBanner";
import Iphone17 from "@/components/Iphone17";
import NewProducts from "@/components/NewProducts";
import Slider from "@/components/Slider";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex  flex-col items-center justify-between ">
      <div className="container w-[95%] md:w-[85%] overflow-hidden   mx-auto pt-36">
        <HomeBanner />
      </div>
      <div className="container w-[95%] md:w-[85%]    mx-auto mt-14 ">
        <div className="bg-[#4d1572] w-full rounded-2xl pb-12 md:pb-16 pt-7 px-2 relative">
          <div className="header mb-10 ">
            <h2 className="text-3xl  font-bold text-center w-fit mx-auto text-white  ">
              الجديد
            </h2>
          </div>

          <Iphone17 />
        </div>
      </div>
      <div className="container w-[95%] md:w-[85%]    mx-auto mt-14 ">
        <div className="bg-[#4d1572] w-full rounded-2xl pb-12 md:pb-16 pt-7 px-2 relative">
          <div className="header mb-10 ">
            <h2 className="text-3xl  font-bold text-center w-fit mx-auto text-white  ">
              احدث التخفيضات
            </h2>
          </div>

          <Slider />
        </div>
      </div>
      <div className="container w-[90%]   mx-auto my-14 ">
        <div className="header mb-5 ">
          <h2 className="text-2xl font-bold text-center w-fit mx-auto text-[#4d1572] ">
            التصنيفات
          </h2>
        </div>
        <CategoriesSlider />
      </div>

      <div className="container w-[95%] md:w-[85%] overflow-hidden mx-auto mb-14 relative text-center bg-[#4d1572] py-3 rounded-3xl px-5 md:px-20">
        <h2 className="title text-white font-bold text-xl md:text-3xl tracking-wide mb-2">
          X-WOLF
        </h2>
        <p className="text-white font-semibold  ">فخامه و امان وقوة ضمان</p>
        <button className="bg-[#9d5ea9] px-4 py-2.5 text-white rounded-full text-md font-medium  mt-24 mb-5">
          كمل وشوف
        </button>
      </div>
      <div className="container w-[95%] md:w-[85%]    mx-auto mb-14 ">
        <div className="bg-[#4d1572] w-full rounded-2xl pb-12 md:pb-16 pt-5 px-2 relative">
          <div className="header mb-10 text-center">
            <h2 className="text-3xl  font-bold  w-fit mx-auto text-white mb-2  ">
              الجديد
            </h2>
            <p className="mx-auto text-lg f text-white">احدث المنتجات</p>
          </div>

          <NewProducts />
        </div>
      </div>
      <div className="container p-3 md:p-4 relative  w-[95%] md:w-[85%]    mx-auto mb-14 border border-[#4d1572] rounded-md">
        <div className="grid grid-cols-12  items-center">
          <div className="col-span-4 md:col-span-7 relative">
            <h1 className="text-[#9d5ea9] text-md md:text-5xl  font-bold mb-1 md:mb-2">
              طرق دفع متعددة{" "}
            </h1>
            <h1 className="text-[#9d5ea9] text-md md:text-5xl  font-bold">
              وآمنة
            </h1>
            <div className="icon absolute z-[2] right-0 top-1/2 -translate-y-1/2 ">
              <svg
                width="120"
                height="120"
                viewBox="0 0 214 253"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M107.232 232.731C181.506 216.8 192.156 150.314 194.131 87.1152C194.213 84.5439 195.312 82.1102 197.187 80.3487C199.062 78.5872 201.559 77.6419 204.131 77.7203C206.702 77.803 209.135 78.9025 210.896 80.7775C212.657 82.6524 213.602 85.1495 213.523 87.7206C211.253 160.358 195.749 234.831 109.127 252.154H105.322C42.4217 239.574 16.9681 197.074 6.90492 146.754C0.571784 115.093 0.506592 80.2722 0.506592 48.6112C0.506833 46.6722 1.08815 44.7779 2.17552 43.1725C3.26289 41.5672 4.80641 40.3246 6.60689 39.6051L103.62 0.798331C105.938 -0.128089 108.524 -0.126422 110.84 0.802988L207.444 39.6097C209.831 40.5696 211.739 42.4378 212.748 44.8037C213.758 47.1696 213.787 49.8397 212.83 52.2271C211.869 54.6139 210.001 56.5219 207.635 57.5322C205.268 58.5424 202.598 58.5721 200.21 57.6149L107.215 20.2587L19.9158 55.1771C19.9321 83.8066 20.279 114.69 25.9299 142.949C34.3912 185.253 55.1089 221.552 107.232 232.731ZM97.5223 131.906L129.467 99.9608C133.253 96.1749 139.402 96.1749 143.188 99.9608C146.974 103.747 146.974 109.896 143.188 113.682L104.382 152.486C103.481 153.387 102.412 154.102 101.235 154.589C100.058 155.077 98.7962 155.328 97.5223 155.328C96.2484 155.328 94.9869 155.077 93.81 154.589C92.6331 154.102 91.5637 153.387 90.6629 152.486L71.2584 133.084C67.4725 129.298 67.4725 123.149 71.2584 119.363C75.0443 115.577 81.1935 115.577 84.9794 119.363L97.5223 131.906Z"
                  fill="#9d5ea94c"
                ></path>
              </svg>
            </div>
          </div>
          <div className="md:col-span-5 col-span-8">
            <div className="slider-payments grid grid-cols-10  justify-start">
              <div className="md:col-span-2 col-span-3 ">
                <Link
                  href="#"
                  className="rounded px-3 py-2 me-1 mb-1 flex w-full h-full items-center justify-center"
                >
                  <Image
                    width={90}
                    height={20}
                    unoptimized
                    quality={100}
                    alt="image"
                    className="w-full h-auto"
                    src="/buy-method-1.svg"
                  />
                </Link>
              </div>
              <div className="md:col-span-2 col-span-3 ">
                <Link
                  href="#"
                  className="rounded px-3 py-2 me-1 mb-1 flex w-full h-full items-center justify-center"
                >
                  <Image
                    width={90}
                    height={20}
                    unoptimized
                    quality={100}
                    src="/buy-method-2.png"
                    alt="image"
                    className="w-full h-auto"
                  />
                </Link>
              </div>
              <div className="md:col-span-2 col-span-3 ">
                <Link
                  href="#"
                  className="rounded px-3 py-2 me-1 mb-1 flex w-full h-full items-center justify-center"
                >
                  <Image
                    width={90}
                    height={20}
                    unoptimized
                    quality={100}
                    src="/buy-method-3.webp"
                    alt="image"
                    className="w-full h-auto"
                  />
                </Link>
              </div>
              <div className="md:col-span-2 col-span-3 ">
                <Link
                  href="#"
                  className="rounded px-3 py-2 me-1 mb-1 flex w-full h-full items-center justify-center"
                >
                  <Image
                    width={90}
                    height={20}
                    unoptimized
                    quality={100}
                    src="/buy-method-4.svg"
                    alt="image"
                    className="w-full h-auto"
                  />
                </Link>
              </div>
              <div className="md:col-span-2 col-span-3 ">
                <Link
                  href="#"
                  className="rounded px-3 py-2 me-1 mb-1 flex w-full h-full items-center justify-center"
                >
                  <Image
                    width={90}
                    height={20}
                    unoptimized
                    quality={100}
                    src="/buy-method-5.png"
                    alt="image"
                    className="w-full h-auto"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
