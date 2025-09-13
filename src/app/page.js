import CategoriesSlider from "@/components/CategoriesSlider";
import HomeBanner from "@/components/HomeBanner";
import Slider from "@/components/Slider";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex  flex-col items-center justify-between ">
      <div className="container w-[90%] h-[90vh]  mx-auto pt-36">
        <HomeBanner />
      </div>
      <div className="container w-[90%] h-[90vh]  mx-auto mt-40">
        <div className="header mb-10 ">
          <h2 className="text-2xl font-bold text-center w-fit mx-auto text-white px-5 py-2 rounded-full bg-[#4d1572] ">
            احدث التخفيضات
          </h2>
        </div>
        <Slider />
      </div>
      <div className="container w-[90%] h-[80vh]  mx-auto mt-20">
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
