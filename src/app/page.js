import CategoriesSlider from "@/components/CategoriesSlider";
import HomeBanner from "@/components/HomeBanner";
import Slider from "@/components/Slider";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex  flex-col items-center justify-between ">
      <div className="container w-[95%] md:w-[90%]   mx-auto pt-36">
        <HomeBanner />
      </div>
      <div className="container w-[95%] md:w-[90%]   mx-auto mt-14 md:mt-26">
        <div className="bg-[#4d1572] w-full rounded-2xl py-5 px-2 md:px-10">
          <div className="header mb-10 ">
            <h2 className="text-3xl  font-bold text-center w-fit mx-auto text-white  ">
              احدث التخفيضات
            </h2>
          </div>

          <Slider />
        </div>
      </div>
      <div className="container w-[90%]   mx-auto my-20 ">
        <div className="header mb-5 ">
          <h2 className="text-2xl font-bold text-center w-fit mx-auto text-[#4d1572] ">
            التصنيفات
          </h2>
        </div>
        <CategoriesSlider />
      </div>

      <div className="x-wolf w-[90%] md:w-[80%] mx-auto mb-20 relative text-center bg-[#4d1572] py-3 rounded-3xl px-5 md:px-20">
        <h2 className="title text-white font-bold text-xl mb-2">X-WOLF</h2>
        <p className="text-white font-semibold  ">فخامه و امان وقوة ضمان</p>
        <button className="bg-[#9d5ea9] px-3 py-1 text-white rounded-full text-sm font-[400] mt-24 mb-5">كمل وشوف</button>
      </div>
    </main>
  );
}
