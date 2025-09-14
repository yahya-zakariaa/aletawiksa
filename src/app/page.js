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
        <div className="bg-[#4d1572] w-full rounded-2xl py-5 px-5 md:px-10">
          <div className="header mb-10 ">
            <h2 className="text-3xl  font-bold text-center w-fit mx-auto text-white  ">
              احدث التخفيضات
            </h2>
          </div>

          <Slider />
        </div>
      </div>
      <div className="container w-[90%]   mx-auto my-20">
        <div className="header mb-10 ">
          <h2 className="text-2xl font-bold text-center w-fit mx-auto text-white px-5 py-2 rounded-full bg-[#4d1572] ">
            التصنيفات
          </h2>
        </div>
        <CategoriesSlider />
      </div>
    </main>
  );
}
