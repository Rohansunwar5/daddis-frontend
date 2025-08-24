// HomePage.tsx
import { useEffect, useState } from "react";
import { ICategory, IProduct } from "../../utils/constants";
import { useSelector } from "react-redux";
import { Button } from "../ui/button";
import { HomePageHeroCarousel } from "./HomePageHeroCarousel";
import Marquee from "react-fast-marquee";
import { MoveRight, Triangle } from "lucide-react";
import ReactPlayer from "react-player/lazy";
import Carousel, { ArrowProps, DotProps } from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { ContainerScroll } from "../../Animation/container-scroll-animation";
import  HomeOurProducts  from "./Home-OurProducts";

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
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 32 32">
          <path
            fillRule="evenodd"
            d="M 24.503906 7.503906 C ..."
          />
        </svg>
      </Button>

      {/* Hero Section */}
      <HomePageHeroCarousel bannerHeros={bannerHeros} />

      {/* Our Products Section */}
      <HomeOurProducts categories={categories} />

      {/* Best Sellers */}
      {/* You can add your Best Sellers component here using topProducts */}

      {/* Partners */}
      <div className="p-10 w-full h-full best-sellers-section">
        <h1 className="font-bold flex justify-center items-center text-xl mb-8">Our partners</h1>
        <Marquee className="flex justify-evenly items-center sm:gap-4 gap-2 w-full" autoFill speed={100}>
          {partnerBannersFromStore?.map((banner: any) => (
            <img
              key={banner.bannerName}
              className="sm:w-32 w-14 sm:mr-8 mr-4 object-contain rounded-md"
              src={banner?.imageUrl?.url!}
              alt=""
            />
          ))}
        </Marquee>
      </div>

      {/* Testimonials + ContainerScroll */}
      <section className="w-full p-10 px-0">
        <div className="flex flex-col overflow-hidden">
          <ContainerScroll
            titleComponent={
              <h1 className="font-bold text-center text-4xl md:text-6xl lg:text-7xl mb-8">
                Our products are loved by
              </h1>
            }
          >
            <img
              src="/linear.webp"
              alt="hero"
              height={720}
              width={1400}
              className="mx-auto rounded-2xl object-cover h-full object-left-top"
              draggable={false}
            />
          </ContainerScroll>
        </div>

        <Carousel
          customDot={<CustomTestimonialDot />}
          customRightArrow={<CustomTestimonialRightButton />}
          customLeftArrow={<CustomTestimonialLefttButton />}
          responsive={{
            desktop: { breakpoint: { max: 3000, min: 1024 }, items: 1 },
            tablet: { breakpoint: { max: 1024, min: 464 }, items: 1 },
            mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
          }}
          infinite
          showDots
          className="home-page-carousel rounded-md m-auto w-[70%] h-full"
        >
          {/* Testimonial Slides */}
          <div className="flex justify-center items-center p-6">
            <CustomVideoPlayer />
          </div>
          <div className="flex justify-center items-center p-6">
            <p className="text-xl text-center">“Amazing product quality and fast delivery!”</p>
          </div>
          <div className="flex justify-center items-center p-6">
            <p className="text-xl text-center">“Our customers love these products!”</p>
          </div>
        </Carousel>
      </section>
    </div>
  );
};
