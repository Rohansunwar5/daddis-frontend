"use client";

import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { MoveRight, Triangle } from "lucide-react";
import ReactPlayer from "react-player/lazy";
import Carousel, { ArrowProps, DotProps } from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { ContainerScroll } from "../../Animation/container-scroll-animation";

// Custom Carousel Arrows + Dots for testimonials
const CustomTestimonialRightButton = ({ onClick }: ArrowProps) => (
  <Button
    variant="ghost"
    onClick={onClick}
    className="absolute border border-yellow-500 right-[5%] bottom-[5%] text-yellow-500 hover:border-yellow-500 hover:bg-yellow-100/50 hover:text-yellow-500 -translate-y-1/2 z-10 flex justify-center items-center rounded-full"
    aria-label="Next"
  >
    <MoveRight className="w-4 aspect-square" />
  </Button>
);

const CustomTestimonialLefttButton = ({ onClick }: ArrowProps) => (
  <Button
    variant="ghost"
    onClick={onClick}
    className="absolute border border-yellow-500 right-[12%] bottom-[5%] text-yellow-500 hover:border-yellow-500 hover:bg-yellow-100/50 hover:text-yellow-500 -translate-y-1/2 z-10 flex justify-center items-center rounded-full"
    aria-label="Previous"
  >
    <MoveRight className="w-4 aspect-square -rotate-180" />
  </Button>
);

const CustomTestimonialDot = ({ onClick, active }: { onClick?: () => void; active?: boolean }) => (
  <button
    onClick={onClick}
    className={`w-3 h-3 rounded-full mx-1 border-2 border-yellow-600 ${
      active ? "bg-yellow-500" : "bg-transparent"
    }`}
  />
);

// Custom Video Player for Testimonials
const CustomVideoPlayer = () => {
  return (
    <ReactPlayer
      height="100%"
      width="33%"
      style={{
        backgroundColor: "#fef9c3",
        aspectRatio: "1 / 2",
        borderRadius: "inherit",
        position: "relative",
      }}
      playing
      url="/assets/testimonials-1.mkv"
      light
      playIcon={
        <Button className="absolute bottom-5 w-[80%] backdrop-blur-md rounded-full bg-transparent border border-yellow-500 text-yellow-500">
          <span className="w-full flex items-center justify-between">
            Watch testimonial <Triangle className="rotate-90 w-4 aspect-square" />
          </span>
        </Button>
      }
    />
  );
};

export const HomeTestimonials = () => {
  return (
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
        infinite
        keyBoardControl
        minimumTouchDrag={80}
        pauseOnHover
        responsive={{
          desktop: { breakpoint: { max: 3000, min: 1024 }, items: 1 },
          tablet: { breakpoint: { max: 1024, min: 464 }, items: 1 },
          mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
        }}
        shouldResetAutoplay
        showDots
        slidesToSlide={1}
        swipeable
      >
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="w-full aspect-video flex gap-2 p-2 justify-center items-center my-auto relative m-auto rounded-md bg-white border border-yellow-100 h-full"
          >
            <CustomVideoPlayer />
            <div className="bg-yellow-100 text-yellow-500 p-[5%] font-[quicksand] font-semibold rounded-[inherit] flex-1 w-full h-full">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. In non dignissim odio, id
                faucibus nisl. Ut porttitor velit sed sem auctor efficitur.
              </p>
              <Separator className="my-4 w-[100%] mx-auto" />
              <p>Lorem ipsum</p>
              <p className="font-normal text-sm">Lorem ipsum</p>
            </div>
          </div>
        ))}
      </Carousel>
    </section>
  );
};
