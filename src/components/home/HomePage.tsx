// HomePage.tsx
import { useEffect, useState } from "react";
import { ICategory, IProduct } from "../../utils/constants";
import { useSelector } from "react-redux";
import { Button } from "../ui/button";
import { HomePageHeroCarousel } from "./HomePageHeroCarousel";
import Marquee from "react-fast-marquee";
import HomeOurProducts from "./Home-OurProducts";
import { HomeTestimonials } from "./Home-Testimonials";

export const HomePage = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [topProducts, setTopProducts] = useState<IProduct[]>([]);
  const heroBannersFromStore = useSelector((state: any) => state.website.heroBanners);
  const categoriesFromStore = useSelector((state: any) => state.website.categories);
  const partnerBannersFromStore = useSelector((state: any) => state.website.partnerBanners);
  const topProductsFromStore = useSelector((state: any) => state.website.topProducts);

  const [bannerHeros, setBannerHeros] = useState<any[]>([]);

  useEffect(() => {
    setBannerHeros(heroBannersFromStore);
    setCategories(categoriesFromStore);
    setTopProducts(topProductsFromStore);
  }, [heroBannersFromStore, categoriesFromStore, topProductsFromStore]);

  return (
    <div className="mt-[56px] font-[quicksand]">
      {/* Floating WhatsApp button */}
      <Button
        variant="ghost"
        className="fixed bg-white hover:bg-green-500 hover:fill-white p-2 h-auto m-0 rounded-full z-[200] transition-all bottom-[5%] right-[5%]"
      >
        {/* WhatsApp SVG */}
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 32 32">
          <path
            fillRule="evenodd"
            d="M 24.503906 7.503906 ... (keep same path)"
          />
        </svg>
      </Button>

      {/* Hero Section */}
      <HomePageHeroCarousel bannerHeros={bannerHeros} />

      {/* Products Section (Categories + Best Sellers) */}
      <HomeOurProducts categories={categories} topProducts={topProducts} />

      {/* Partners Section */}
      <div className="p-10 w-full h-full">
        <h1 className="font-bold flex justify-center items-center text-xl mb-8">Our partners</h1>
        <Marquee
          className="flex justify-evenly items-center sm:gap-4 gap-2 w-full"
          autoFill
          speed={100}
        >
          {partnerBannersFromStore
            ? partnerBannersFromStore?.map((banner: any) => (
                <img
                  key={banner.bannerName}
                  id="partner-banner-image"
                  className="sm:w-32 w-14 sm:mr-[128px] mr-4 object-contain rounded-md"
                  src={banner?.imageUrl?.url!}
                  alt=""
                />
              ))
            : [0, 1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="sm:w-32 w-14 sm:mr-8 mr-4 aspect-square rounded-full bg-gray-200 animate-pulse"
                />
              ))}
        </Marquee>
      </div>

      {/* From the Gram Section */}
      <div className="w-full p-10 home-page-carousel-container">
        <h1 className="font-bold text-xl mb-8 flex justify-center items-center relative">
          From the gram
        </h1>
        <div className="flex gap-4 w-[60%] m-auto">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="w-[277px] my-auto relative m-auto aspect-[9/16] rounded-md bg-white border border-gray-600/50 h-full"
            >
              <video
                src="https://res.cloudinary.com/dmrgscauc/video/upload/v1755776761/TUKTUK_ADS_Demo_y2kl5b.mp4"
                controls
                autoPlay
                loop
                muted
                className="bg-white-100 w-[275px] h-[395px] object-inherit rounded-[inherit]"
              />
              <span className="font-bold flex justify-center items-center absolute bottom-0 left-0 right-0 h-[20%] bg-white rounded-[inherit] rounded-t-none">
                Reel title
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ✅ Testimonials Section */}
      <HomeTestimonials />
    </div>
  );
};
