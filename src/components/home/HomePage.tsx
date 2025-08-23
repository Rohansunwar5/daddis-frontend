import { useEffect, useState } from "react";
import { ICategory, IProduct } from "../../utils/constants";
import { Link } from "react-router-dom";
// import { any } from "zod";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import { HomePageHeroCarousel } from "./HomePageHeroCarousel";
import Marquee from "react-fast-marquee";
import { LucideHeart, MoveRight, Triangle } from "lucide-react";
import ReactPlayer from 'react-player/lazy';
import { Skeleton } from "@mui/material";
import Carousel, { ArrowProps, DotProps }  from 'react-multi-carousel';
// import { setHeroBanners } from "../../redux/slices/websiteSlice";
import 'react-multi-carousel/lib/styles.css';
import { Separator } from "../ui/separator";
import { optimizeCloudinaryUrl } from "../../utils/utility-functions";
import { ContainerScroll } from "../../Animation/container-scroll-animation";
import CircularGallery from "../../Animation/CircularGallery";

export const HomePage = () => {

    const [ categories, setCategories ] = useState<ICategory[]>([]);
    // const [ partnerBanners, setBannerPartners ] = useState([]);
    const [ topProducts, setTopProducts ] = useState<Array<IProduct>>([]);
    const heroBannersFromStore = useSelector((state: any) => state.website.heroBanners);
    const categoriesFromStore = useSelector((state : any) => state.website.categories);
    const partnerBannersFromStore = useSelector((state : any) => state.website.partnerBanners);
    // const partnerBannersFromStore = undefined;
    const topProductsFromStore = useSelector((state: any) => state.website.topProducts);

    const [ bannerHeros, setBannerHeros ] = useState([]);
    // const bannerHeros: ISampleBanners[] = [
    //     {
    //         bannerName: "Namak para",
    //         imageUrl: "/assets/hero/1.png",
    //         bannerType: "hero-section-banner",
    //         bannerText: "Namak para",
    //         bannerColours: ["#FF885B", "#B7E0FF"],
    //         bannerElementUrl: "/assets/hero/2.png",
    //     },
    //     {
    //         bannerName: "Shakkar-para",
    //         imageUrl: "/assets/hero/3.png",
    //         bannerType: "hero-section-banner",
    //         bannerText: "Shakkar Para",
    //         bannerColours: ["#C68FE6", "#B7E0FF"],
    //         bannerElementUrl: "/assets/hero/4.png",
    //     },
    //     {
    //         bannerName: "peri-peri-khakhra",
    //         imageUrl: "/assets/hero/5.png",
    //         bannerType: "hero-section-banner",
    //         bannerText: "Peri Peri Khakhra",
    //         bannerColours: ["#8967B3", "white"],
    //         bannerElementUrl: "/assets/hero/6.png",
    //     },
    //     {
    //         bannerName: "Kaju-katli",
    //         imageUrl: "/assets/hero/7.png",
    //         bannerType: "hero-section-banner",
    //         bannerText: "Kaju Katli",
    //         bannerColours: ["#16325B", "white"],
    //         bannerElementUrl: "/assets/hero/8.png",
    //     },
    // ];

    
    useEffect(() => {        
        // console.log(categoriesFromStore);
        // console.log(partnerBannersFromStore);
        setBannerHeros(heroBannersFromStore);
        setCategories(categoriesFromStore);
        // setCategories([]);
        // setBannerPartners(partnerBannersFromStore);
        setTopProducts(topProductsFromStore);
    }, [heroBannersFromStore, categoriesFromStore]);

    // const CustomLeftArrow = ({ onClick, ...rest }: ArrowProps) => {
    //     const {
    //         // carouselState: { currentSlide },
    //     } = rest;
    //     return (
    //         <Button variant={"ghost"}
    //             onClick={onClick}
    //             className="absolute left-2 top-1/2 text-yellow-500 hover:bg-transparent hover:text-yellow-500 -translate-y-1/2 z-10 flex justify-center items-center rounded-full"
    //             aria-label="Previous"
    //         >
    //             <Triangle className="w-4 aspect-square -rotate-90" />
    //         </Button>
    //     );
    // };

    // const CustomRightArrow = ({ onClick, ...rest }: ArrowProps) => {
    //     const {
    //         // carouselState: { currentSlide },
    //     } = rest;
    //     return (
    //         <Button variant={"ghost"}
    //             onClick={onClick}
    //             className="absolute right-2 top-1/2 text-yellow-500 hover:bg-transparent hover:text-yellow-500 -translate-y-1/2 z-10 flex justify-center items-center rounded-full"
    //             aria-label="Next"
    //         >
    //             <Triangle className="w-4 aspect-square rotate-90" />
    //         </Button>
    //     );
    // };

    const CustomTestimonialRightButton = ({ onClick, ...rest }: ArrowProps) => {
        const {
            // carouselState: { currentSlide },
        } = rest;
        return (
            <Button variant={"ghost"}
                onClick={onClick}
                className="absolute border border-yellow-500 right-[5%] bottom-[5%] text-yellow-500 hover:border-yellow-500 hover:bg-yellow-100/50 hover:text-yellow-500 -translate-y-1/2 z-10 flex justify-center items-center rounded-full"
                aria-label="Next"
            >
                <MoveRight className="w-4 aspect-square" />
            </Button>
        );
    };

    const CustomTestimonialLefttButton = ({ onClick, ...rest }: ArrowProps) => {
        const {
            // carouselState: { currentSlide },
        } = rest;
        return (
            <Button variant={"ghost"}
                onClick={onClick}
                className="absolute border border-yellow-500 right-[12%] bottom-[5%] text-yellow-500 hover:border-yellow-500 hover:bg-yellow-100/50 hover:text-yellow-500 -translate-y-1/2 z-10 flex justify-center items-center rounded-full"
                aria-label="Next"
            >
                <MoveRight className="w-4 aspect-square -rotate-180" />
            </Button>
        );
    };

    

    // const CustomDot = ({ onClick, active }: DotProps) => (
    //     <button
    //       onClick={onClick}
    //       className={`w-3 self-center justify-self-center h-3 rounded-full mx-1 border-2 border-yellow-600 ${active ? 'bg-yellow-500' : 'bg-transparent'}`}
    //     />
    // );

    const CustomTestimonialDot = ({ onClick, active }: DotProps) => (
        <button
          onClick={onClick}
          className={`w-3 self-center justify-self-center h-3 rounded-full mx-1 border-2 border-yellow-600 ${active ? 'bg-yellow-500' : 'bg-transparent'}`}
        />
    );

    return (
        <div className="mt-[56px] font-[quicksand]">
            <Button variant={"ghost"} className="fixed hover fill-green-500 bg-white hover:bg-green-500 hover:fill-white p-2 h-auto m-0 rounded-full z-[200] transition-all bottom-[5%] right-[5%]">
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 32 32">
                    <path fill-rule="evenodd" d="M 24.503906 7.503906 C 22.246094 5.246094 19.246094 4 16.050781 4 C 9.464844 4 4.101563 9.359375 4.101563 15.945313 C 4.097656 18.050781 4.648438 20.105469 5.695313 21.917969 L 4 28.109375 L 10.335938 26.445313 C 12.078125 27.398438 14.046875 27.898438 16.046875 27.902344 L 16.050781 27.902344 C 22.636719 27.902344 27.996094 22.542969 28 15.953125 C 28 12.761719 26.757813 9.761719 24.503906 7.503906 Z M 16.050781 25.882813 L 16.046875 25.882813 C 14.265625 25.882813 12.515625 25.402344 10.992188 24.5 L 10.628906 24.285156 L 6.867188 25.269531 L 7.871094 21.605469 L 7.636719 21.230469 C 6.640625 19.648438 6.117188 17.820313 6.117188 15.945313 C 6.117188 10.472656 10.574219 6.019531 16.054688 6.019531 C 18.707031 6.019531 21.199219 7.054688 23.074219 8.929688 C 24.949219 10.808594 25.980469 13.300781 25.980469 15.953125 C 25.980469 21.429688 21.523438 25.882813 16.050781 25.882813 Z M 21.496094 18.445313 C 21.199219 18.296875 19.730469 17.574219 19.457031 17.476563 C 19.183594 17.375 18.984375 17.328125 18.785156 17.625 C 18.585938 17.925781 18.015625 18.597656 17.839844 18.796875 C 17.667969 18.992188 17.492188 19.019531 17.195313 18.871094 C 16.894531 18.722656 15.933594 18.40625 14.792969 17.386719 C 13.90625 16.597656 13.304688 15.617188 13.132813 15.320313 C 12.957031 15.019531 13.113281 14.859375 13.261719 14.710938 C 13.398438 14.578125 13.5625 14.363281 13.710938 14.1875 C 13.859375 14.015625 13.910156 13.890625 14.011719 13.691406 C 14.109375 13.492188 14.058594 13.316406 13.984375 13.167969 C 13.910156 13.019531 13.3125 11.546875 13.0625 10.949219 C 12.820313 10.367188 12.574219 10.449219 12.390625 10.4375 C 12.21875 10.429688 12.019531 10.429688 11.820313 10.429688 C 11.621094 10.429688 11.296875 10.503906 11.023438 10.804688 C 10.75 11.101563 9.980469 11.824219 9.980469 13.292969 C 9.980469 14.761719 11.050781 16.183594 11.199219 16.382813 C 11.347656 16.578125 13.304688 19.59375 16.300781 20.886719 C 17.011719 21.195313 17.566406 21.378906 18 21.515625 C 18.714844 21.742188 19.367188 21.710938 19.882813 21.636719 C 20.457031 21.550781 21.648438 20.914063 21.898438 20.214844 C 22.144531 19.519531 22.144531 18.921875 22.070313 18.796875 C 21.996094 18.671875 21.796875 18.597656 21.496094 18.445313 Z"></path>
                </svg>
            </Button>
            {/* <div id="hero-section" className="p-0 m-0 bg-green-300 w-full h-[calc(100vh-56px)]"> */}
            <HomePageHeroCarousel bannerHeros={bannerHeros} />
            <div className="p-10 our-products-section">
                <h1 className="font-bold relative text-center text-xl">Our products<Link className="absolute right-0" to={"/category/all"}><Button variant={"ghost"} className="underline">View all</Button></Link></h1>
                <div className="mt-8 grid w-full sm:grid-cols-3 grid-cols-1 justify-items-center gap-5 h-full">
                    {categories.length === 0 ? [0, 1, 2].map(number => {
                        return (
                            <div key={number} className="w-[100%] col-span-1">
                                <Skeleton className="rounded-md w-[100%] h-full aspect-video" />
                                <Skeleton className="w-1/2" />
                            </div>
                        );
                    }) : categories?.map((category: ICategory) => {
                        return (
                            <div key={category.categoryName} className="w-[100%] col-span-1">
                                <Link to={`/category/${category._id}`} className="hover:cursor-pointer hover:scale-110 transition-all duration-150 flex justify-center gap-2 flex-col">
                                    <img src={optimizeCloudinaryUrl(category?.banners[0]?.imageUrl?.url)} className="rounded-md w-[100%] object-cover object-top sm:aspect-video h-[40%] " />
                                    <h3 className="font-bold">
                                        {category.categoryName}
                                    </h3>
                                </Link>
                            </div>
                        );
                    })}
                </div>
            </div>
            <div id="best-sellers-section" className="font-[quicksand] p-10 flex gap-4 flex-col w-full">
                <p className="text-xl font-bold text-center mb-8">Best sellers</p>
                <div className="grid grid-cols-3 gap-4">
                    <div className="row-span-1 rounded-lg flex flex-col justify-center relative">
                        <Button variant={"ghost"} className="p-0 m-0 hover:scale-125 absolute top-3 right-3 transition-all duration-150 w-10 h-10 rounded-full"><LucideHeart className="hover:stroke-red-500 stroke-1"/></Button>
                        <img className="h-[75%] object-cover rounded-md mb-3" src={optimizeCloudinaryUrl(topProducts[0]?.imageUrl[0].url)} alt="" />
                        <span>
                            {topProducts[0]?.productName}
                        </span>
                        <span className="text-slate-500">
                            {topProducts[0]?.weight.number}{topProducts[0]?.weight.unit}
                        </span>
                        <span>
                            ₹ {topProducts[0]?.price}
                        </span>
                    </div>
                    <div className="row-span-1 col-span-1 rounded-lg flex flex-col justify-center relative">
                        <Button variant={"ghost"} className="p-0 m-0 hover:scale-125 absolute top-3 right-3 transition-all duration-150 w-10 h-10 rounded-full"><LucideHeart className="hover:stroke-red-500 stroke-1"/></Button>
                        <img className="h-[75%] object-cover rounded-md mb-3" src={topProducts[1]?.imageUrl[0].url} alt="" />
                        <span>
                            {topProducts[1]?.productName}
                        </span>
                        <span className="text-slate-500">
                            {topProducts[1]?.weight?.number}{topProducts[1]?.weight?.unit}
                        </span>
                        <span>
                            ₹ {topProducts[1]?.price}
                        </span>
                    </div>
                    <div className="row-span-1 col-span-1 rounded-lg flex flex-col justify-center relative">
                        <Button variant={"ghost"} className="p-0 m-0 hover:scale-125 absolute top-3 right-3 transition-all duration-150 w-10 h-10 rounded-full"><LucideHeart className="hover:stroke-red-500 stroke-1"/></Button>
                        <img className="h-[75%] object-cover rounded-md mb-3" src={topProducts[2]?.imageUrl[0].url} alt="" />
                        <span>
                            {topProducts[2]?.productName}
                        </span>
                        <span className="text-slate-500">
                            {topProducts[2]?.weight?.number}{topProducts[2]?.weight?.unit}
                        </span>
                        <span>
                            ₹ {topProducts[2]?.price}
                        </span>
                    </div>
                </div>
            </div>
            <div className="p-10 w-full h-full best-sellers-section">
                <h1 className="font-bold flex justify-center items-center text-xl mb-8">Our partners</h1>
                {/* <div ref={marqueeInnerRef} className="flex justify-evenly animate-marquee items-center sm:gap-4 gap-2 mt-4 w-full overflow-x-hidden"> */}
                <Marquee className="flex justify-evenly items-center sm:gap-4 gap-2 w-full" autoFill speed={100}>
                    {partnerBannersFromStore ? partnerBannersFromStore?.map((banner: any) => {
                        return <img key={banner.bannerName} id="partner-banner-image" className="sm:w-32 w-14 sm:mr-8 mr-4 object-contain rounded-md" src={banner?.imageUrl?.url!} alt="" />;
                    }) : [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(skeletonNumber => <Skeleton key={skeletonNumber} className="sm:w-32 w-14 sm:mr-8 mr-4 aspect-square rounded-full" />)}
                    {/* {partnerBannersFromStore?.map((banner: any) => {
                        return <img className="w-32 object-contain rounded-md" src={banner?.imageUrl?.url!} alt="" />;
                    })} */}
                {/* </div> */}
                </Marquee>
            </div>
            <div className="w-full p-10 home-page-carousel-container">
                <h1 className="font-bold text-xl mb-8 flex justify-center items-center relative">From the gram</h1>
                {/* <Carousel
                    customDot={<CustomDot />}
                    customRightArrow={<CustomRightArrow onClick={() => {}} />}
                    customLeftArrow={<CustomLeftArrow onClick={() => {}} />}
                    additionalTransfrom={0}
                    arrows
                    autoPlaySpeed={3000}
                    centerMode={false}
                    className="home-page-carousel m-auto w-[90%] py-[5%] h-full"
                    containerClass="home-page-carousel-container"
                    dotListClass="absolute! bottom-8!"
                    draggable
                    focusOnSelect={false}
                    infinite
                    itemClass=""
                    keyBoardControl
                    minimumTouchDrag={80}
                    pauseOnHover
                    renderArrowsWhenDisabled={false}
                    renderButtonGroupOutside={false}
                    renderDotsOutside={false}
                    responsive={{
                        desktop: {
                        breakpoint: {
                            max: 3000,
                            min: 1024
                        },
                        items: 3
                        },
                        mobile: {
                        breakpoint: {
                            max: 464,
                            min: 0
                        },
                        items: 1
                        },
                        tablet: {
                        breakpoint: {
                            max: 1024,
                            min: 464
                        },
                        items: 2
                        }
                    }}
                    rewind={false}
                    rewindWithAnimation={false}
                    rtl={false}
                    shouldResetAutoplay
                    showDots
                    sliderClass=""
                    slidesToSlide={1}
                    swipeable
                > */}
                <div className="flex gap-4 w-[60%] m-auto">
                    <div className="w-[277px] my-auto relative m-auto aspect-[9/16] rounded-md bg-white border border-gray-600/50 h-full">
                        <video src={"https://res.cloudinary.com/dmrgscauc/video/upload/v1755776761/TUKTUK_ADS_Demo_y2kl5b.mp4"} controls autoPlay loop muted className="bg-white-100 w-[275px] h-[395px] object-inherit rounded-[inherit]" />
                        <span className="font-bold flex justify-center items-center absolute bottom-0 left-0 right-0 h-[20%] bg-white rounded-[inherit] rounded-t-none">
                            {"Reel title"}
                        </span>
                    </div>
                    <div className="w-[277px] my-auto relative m-auto aspect-[9/16] rounded-md bg-white border border-gray-600/50 h-full">
                        <video src={"https://res.cloudinary.com/dmrgscauc/video/upload/v1755776761/TUKTUK_ADS_Demo_y2kl5b.mp4"} controls autoPlay loop muted className="bg-white-100 w-[275px] h-[395px] object-inherit rounded-[inherit]" />
                        <span className="font-bold flex justify-center items-center absolute bottom-0 left-0 right-0 h-[20%] bg-white rounded-[inherit] rounded-t-none">
                            {"Reel title"}
                        </span>
                    </div>
                    <div className="w-[277px] my-auto relative m-auto aspect-[9/16] rounded-md bg-white border border-gray-600/50 h-full">
                        <video src={"https://res.cloudinary.com/dmrgscauc/video/upload/v1755776761/TUKTUK_ADS_Demo_y2kl5b.mp4"} controls autoPlay loop muted className="bg-white-100 w-[275px] h-[395px] object-inherit rounded-[inherit]" />
                        <span className="font-bold flex justify-center items-center absolute bottom-0 left-0 right-0 h-[20%] bg-white rounded-[inherit] rounded-t-none">
                            {"Reel title"}
                        </span>
                    </div>
                </div>
                {/* </Carousel> */}
            </div>
            <section className="w-full p-10 px-0">
                <div className="flex flex-col overflow-hidden">
                  <ContainerScroll
                     titleComponent={
                     <h1 className="font-bold text-center text-4xl md:text-6xl lg:text-7xl mb-8">
                       Our products are loved by
                    </h1>
                    }
                >
                    {/* 👇 children (optional image or content) */}
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
                 <div className="w-full p-10 relative z-[50]">
                   <CircularGallery/>
                    <Carousel
                        customDot={<CustomTestimonialDot />}
                        customRightArrow={<CustomTestimonialRightButton onClick={() => {}} />}
                        customLeftArrow={<CustomTestimonialLefttButton onClick={() => {}} />}
                        additionalTransfrom={0}
                        arrows
                        autoPlaySpeed={3000}
                        centerMode={false}
                        className="home-page-carousel rounded-md m-auto w-[70%] h-full"
                        containerClass="home-page-carousel-container"
                        dotListClass="testimonial-dot-list"
                        draggable
                        focusOnSelect={false}
                        infinite
                        itemClass=""
                        keyBoardControl
                        minimumTouchDrag={80}
                        pauseOnHover
                        renderArrowsWhenDisabled={false}
                        renderButtonGroupOutside={false}
                        renderDotsOutside={false}
                        responsive={{
                            desktop: {
                            breakpoint: {
                                max: 3000,
                                min: 1024
                            },
                            items: 1
                            },
                            mobile: {
                            breakpoint: {
                                max: 464,
                                min: 0
                            },
                            items: 1
                            },
                            tablet: {
                            breakpoint: {
                                max: 1024,
                                min: 464
                            },
                            items: 1
                            }
                        }}
                        rewind={false}
                        rewindWithAnimation={false}
                        rtl={false}
                        shouldResetAutoplay
                        showDots
                        sliderClass=""
                        slidesToSlide={1}
                        swipeable
                    >
                        <div className="w-full aspect-video flex gap-2 p-2 justify-center items-center my-auto relative m-auto rounded-md bg-white border border-yellow-100 h-full">
                            <CustomVideoPlayer />
                            {/* <video src="/assets/testimonials-1.mkv" autoPlay controls></video> */}
                            <div className="bg-yellow-100 text-yellow-500 p-[5%] font-[quicksand] font-semibold rounded-[inherit] flex-1 w-full h-full">
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In non dignissim odio, id faucibus nisl. Ut porttitor velit sed sem auctor efficitur. Ut quis ipsum et leo consectetur consequat a ut nibh. Etiam sagittis faucibus luctus. Curabitur vehicula, sapien sed sollicitudin iaculis, justo tellus efficitur mauris, nec consectetur augue metus eleifend nisl. Morbi dignissim et arcu et finibus. Morbi vel metus enim. Proin facilisis velit ac urna efficitur facilisis. Donec id vestibulum nulla. Aliquam faucibus diam vel tincidunt euismod. In at est urna. Nunc ultrices lobortis consectetur. Proin vel auctor mi, quis ultrices sem.</p>
                                <Separator className="my-4 w-[100%] mx-auto"/>
                                <p>Lorem ipsum</p>
                                <p className="font-normal text-sm">Lorem ipsum</p>
                            </div>
                        </div>
                        <div className="w-full aspect-video flex gap-2 p-2 justify-center items-center my-auto relative m-auto rounded-md bg-white border border-gray-600/50 h-full">
                            <CustomVideoPlayer />
                            {/* <video src="/assets/testimonials-1.mkv" autoPlay controls></video> */}
                            <div className="bg-yellow-100 text-yellow-500 p-[5%] font-[quicksand] font-semibold rounded-[inherit] flex-1 w-full h-full">
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In non dignissim odio, id faucibus nisl. Ut porttitor velit sed sem auctor efficitur. Ut quis ipsum et leo consectetur consequat a ut nibh. Etiam sagittis faucibus luctus. Curabitur vehicula, sapien sed sollicitudin iaculis, justo tellus efficitur mauris, nec consectetur augue metus eleifend nisl. Morbi dignissim et arcu et finibus. Morbi vel metus enim. Proin facilisis velit ac urna efficitur facilisis. Donec id vestibulum nulla. Aliquam faucibus diam vel tincidunt euismod. In at est urna. Nunc ultrices lobortis consectetur. Proin vel auctor mi, quis ultrices sem.</p>
                                <Separator className="my-4 w-[100%] mx-auto"/>
                                <p>Lorem ipsum</p>
                                <p className="font-normal text-sm">Lorem ipsum</p>
                            </div>
                        </div>
                        <div className="w-full aspect-video flex gap-2 p-2 justify-center items-center my-auto relative m-auto rounded-md bg-white border border-gray-600/50 h-full">
                            <CustomVideoPlayer />
                            {/* <video src="/assets/testimonials-1.mkv" autoPlay controls></video> */}
                            <div className="bg-yellow-100 text-yellow-500 p-[5%] font-[quicksand] font-semibold rounded-[inherit] flex-1 w-full h-full">
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In non dignissim odio, id faucibus nisl. Ut porttitor velit sed sem auctor efficitur. Ut quis ipsum et leo consectetur consequat a ut nibh. Etiam sagittis faucibus luctus. Curabitur vehicula, sapien sed sollicitudin iaculis, justo tellus efficitur mauris, nec consectetur augue metus eleifend nisl. Morbi dignissim et arcu et finibus. Morbi vel metus enim. Proin facilisis velit ac urna efficitur facilisis. Donec id vestibulum nulla. Aliquam faucibus diam vel tincidunt euismod. In at est urna. Nunc ultrices lobortis consectetur. Proin vel auctor mi, quis ultrices sem.</p>
                                <Separator className="my-4 w-[100%] mx-auto"/>
                                <p>Lorem ipsum</p>
                                <p className="font-normal text-sm">Lorem ipsum</p>
                            </div>
                        </div>
                        <div className="w-full aspect-video flex gap-2 p-2 justify-center items-center my-auto relative m-auto rounded-md bg-white border border-gray-600/50 h-full">
                            <CustomVideoPlayer />
                            {/* <video src="/assets/testimonials-1.mkv" autoPlay controls></video> */}
                            <div className="bg-yellow-100 text-yellow-500 p-[5%] font-[quicksand] font-semibold rounded-[inherit] flex-1 w-full h-full">
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In non dignissim odio, id faucibus nisl. Ut porttitor velit sed sem auctor efficitur. Ut quis ipsum et leo consectetur consequat a ut nibh. Etiam sagittis faucibus luctus. Curabitur vehicula, sapien sed sollicitudin iaculis, justo tellus efficitur mauris, nec consectetur augue metus eleifend nisl. Morbi dignissim et arcu et finibus. Morbi vel metus enim. Proin facilisis velit ac urna efficitur facilisis. Donec id vestibulum nulla. Aliquam faucibus diam vel tincidunt euismod. In at est urna. Nunc ultrices lobortis consectetur. Proin vel auctor mi, quis ultrices sem.</p>
                                <Separator className="my-4 w-[100%] mx-auto"/>
                                <p>Lorem ipsum</p>
                                <p className="font-normal text-sm">Lorem ipsum</p>
                            </div>
                        </div>
                        <div className="w-full aspect-video flex gap-2 p-2 justify-center items-center my-auto relative m-auto rounded-md bg-white border border-gray-600/50 h-full">
                            <CustomVideoPlayer />
                            {/* <video src="/assets/testimonials-1.mkv" autoPlay controls></video> */}
                            <div className="bg-yellow-100 text-yellow-500 p-[5%] font-[quicksand] font-semibold rounded-[inherit] flex-1 w-full h-full">
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In non dignissim odio, id faucibus nisl. Ut porttitor velit sed sem auctor efficitur. Ut quis ipsum et leo consectetur consequat a ut nibh. Etiam sagittis faucibus luctus. Curabitur vehicula, sapien sed sollicitudin iaculis, justo tellus efficitur mauris, nec consectetur augue metus eleifend nisl. Morbi dignissim et arcu et finibus. Morbi vel metus enim. Proin facilisis velit ac urna efficitur facilisis. Donec id vestibulum nulla. Aliquam faucibus diam vel tincidunt euismod. In at est urna. Nunc ultrices lobortis consectetur. Proin vel auctor mi, quis ultrices sem.</p>
                                <Separator className="my-4 w-[100%] mx-auto"/>
                                <p>Lorem ipsum</p>
                                <p className="font-normal text-sm">Lorem ipsum</p>
                            </div>
                        </div>
                    </Carousel>
                    
                </div>
                {/*<h1 className="font-bold flex justify-center items-center text-xl mb-8 relative">Our products are loved by</h1>*/}
                {/*<div className="w-full p-10 relative z-[50]">
                </div>*/}
            </section>
        </div>
    );
};


const CustomVideoPlayer = () => {
    return (
        <ReactPlayer height={"100%"} width={"33%"} style={{
            // height: "100%",
            // width: "50px !important",
            backgroundColor: "#fef9c3",
            // flex: "0 1 auto",
            aspectRatio: "1 / 2",
            borderRadius: "inherit",
            position: "relative"
        }} playing url={"/assets/testimonials-1.mkv"} light playIcon={<Button className="absolute bottom-5 w-[80%] backdrop-blur-md rounded-full bg-transparent border border-yellow-500 text-yellow-500">
            <span className="w-full flex items-center justify-between">Watch testimonial <Triangle className="rotate-90 w-4 aspect-square"/></span>
            {/* <div className="absolute w-full h-full rounded-[inherit] top-0 bottom-0 left-0 right-0 blur-sm bg-white/50" /> */}
        </Button>}></ReactPlayer>
    );
}