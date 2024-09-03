import { Button } from "@/components/ui/button";
import Slider from "./_components/Slider";
import GlobalApi from "./_utils/GlobalApi";
import CategoryList from "./_components/CategoryList";
import ProdcutsList from "./_components/ProdcutsList";
import Image from "next/image";
import Footer from "./_components/Footer";

export default async function Home() {
  const sliderList = await GlobalApi.getSlider();

  const categoryList = await GlobalApi.getCategoryList();

  const prodcutsList = await GlobalApi.getAllProducts();
  return (
    <div className="p-10 px-14 md:px-16 select-none">
      {/* Slider */}
      <Slider sliderList={sliderList} />

      {/* Catergories List */}
      <CategoryList categoryList={categoryList} />

      {/* Prodcuts List */}
      <ProdcutsList prodcutsList={prodcutsList} />

      {/* Banner */}
      <Image
        src="/banner.jpeg"
        width={1000}
        height={300}
        className="w-full h-[400px] object-contain"
        alt="banner"
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}
