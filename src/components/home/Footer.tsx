import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const Footer = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);

  // Function to scroll to top smoothly
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    if (titleRef.current) {
      // Split text into individual characters
      const text = "DAADI'S";
      titleRef.current.innerHTML = text.split('').map((char) => 
        `<span class="char" style="display: inline-block; opacity: 0; transform: translateY(100px);">${char}</span>`
      ).join('');

      const chars = titleRef.current.querySelectorAll('.char');

      // Animate characters one by one when entering viewport
      gsap.set(chars, { opacity: 0, y: 100 });
      
      gsap.to(chars, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      });
    }
  }, []);

  return (
    <div className="bg-[#fef9c3] flex flex-col relative overflow-hidden min-h-[100vh]">
      {/* Top Section - Brand Text with GSAP Animation */}
      <div className="flex justify-start py-4 md:py-12 lg:py-16">
        <h1 
          ref={titleRef}
          className="text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] xl:text-[12rem] 2xl:text-[14rem] font-bold text-white text-center leading-none px-4 whitespace-nowrap"
        >
        </h1>
      </div>

      {/* Bottom Section - Content */}
      <div className="flex flex-col lg:flex-row relative">
        {/* Mobile/Tablet Layout - Stacked */}
        <div className="flex flex-col lg:hidden">
          {/* Tagline Section */}
          <div className="px-6 py-8 text-center">
            <p className="text-xl sm:text-2xl md:text-3xl text-gray-700 leading-relaxed font-medium">
              Authentic flavors,<br />
              traditional recipes,<br />
              made with love.
            </p>
          </div>

          {/* Product Image - Mobile/Tablet */}
          <div className="flex items-end justify-end relative min-h-[300px] sm:min-h-[350px] md:min-h-[400px]">
            {/* Stronger gradients from top/sides ONLY (no bottom) */}
            <div className="pointer-events-none absolute top-0 left-0 right-0 h-2/3 bg-gradient-radial from-orange-500 via-yellow-400 to-transparent opacity-80"></div>
            <div className="pointer-events-none absolute top-0 left-0 right-0 h-1/2 bg-gradient-radial from-red-500 via-orange-400 to-transparent opacity-70"></div>

            <img
              src="/assets/footerproduct.png"
              alt="DADI'S Product"
              className="block w-48 sm:w-64 md:w-80 object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.25)] absolute bottom-0 z-10"
            />
          </div>

          {/* Navigation Links - Mobile/Tablet Grid */}
          <div className="px-6 py-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {/* Index Column */}
              <div className="text-center sm:text-left">
                <h3 className="font-bold text-gray-800 mb-4 text-lg">Index</h3>
                <ul className="space-y-2">
                  <li><Link to="/" onClick={scrollToTop} className="text-gray-950 hover:-translate-y-1 transition-all duration-200 inline-block font-bold" style={{fontFamily: 'Poppins, sans-serif'}}>Home</Link></li>
                  <li><Link to="/about-us" onClick={scrollToTop} className="text-gray-950 hover:-translate-y-1 transition-all duration-200 inline-block font-bold" style={{fontFamily: 'Poppins, sans-serif'}}>About</Link></li>
                  <li><Link to="/category/all" onClick={scrollToTop} className="text-gray-950 hover:-translate-y-1 transition-all duration-200 inline-block font-bold" style={{fontFamily: 'Poppins, sans-serif'}}>Products</Link></li>
                  <li><Link to="./contact" onClick={scrollToTop} className="text-gray-950 hover:-translate-y-1 transition-all duration-200 inline-block font-bold" style={{fontFamily: 'Poppins, sans-serif'}}>Contact</Link></li>
                  <li><Link to="/faq" onClick={scrollToTop} className="text-gray-950 hover:-translate-y-1 transition-all duration-200 inline-block font-bold" style={{fontFamily: 'Poppins, sans-serif'}}>FAQ</Link></li>
                </ul>
              </div>

              {/* Social Column */}
              <div className="text-center sm:text-left">
                <h3 className="font-bold text-gray-800 mb-4 text-lg">Social</h3>
                <ul className="space-y-2">
                  <li><a href="https://www.instagram.com/daadis.in?igsh=MTg2aWx1M2o1d2c2bQ==" className="text-gray-950 hover:-translate-y-1 transition-all duration-200 inline-block font-bold" style={{fontFamily: 'Poppins, sans-serif'}}>Instagram</a></li>
                   </ul>
              </div>

              {/* Info Column */}
              <div className="text-center sm:text-left">
                <h3 className="font-bold text-gray-800 mb-4 text-lg">Info</h3>
                <ul className="space-y-2">
                  <li><a href="mailto:hello@dadis.com" className="text-gray-950 hover:-translate-y-1 transition-all duration-200 inline-block text-sm font-bold" style={{fontFamily: 'Poppins, sans-serif'}}>hello@dadis.com</a></li>
                  <li><Link to="/privacy-policy" onClick={scrollToTop} className="text-gray-950 hover:-translate-y-1 transition-all duration-200 inline-block font-bold" style={{fontFamily: 'Poppins, sans-serif'}}>Privacy Policy</Link></li>
                  <li><Link to="/terms-and-conditions" onClick={scrollToTop} className="text-gray-950 hover:-translate-y-1 transition-all duration-200 inline-block font-bold" style={{fontFamily: 'Poppins, sans-serif'}}>Terms of Service</Link></li>
                </ul>
              </div>
            </div>
          </div>

          {/* Copyright - Mobile/Tablet */}
          <div className="px-6 pb-6">
            <p className="text-sm text-gray-600 text-center">© 2025 DADI'S</p>
          </div>
        </div>

        {/* Desktop Layout - Three Column */}
        <div className="hidden lg:flex h-full w-full flex-1">
          {/* Left Column - Tagline and Copyright */}
          <div className="flex-1 flex flex-col justify-between p-12">
            <div>
              <p className="text-2xl xl:text-3xl 2xl:text-4xl text-gray-700 leading-relaxed font-medium">
                Authentic flavors,<br />
                traditional recipes,<br />
                made with love.
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">© 2025 DADI'S</p>
            </div>
          </div>

          {/* Center Column - Reserved for spacing */}
          <div className="flex-1"></div>

          {/* Right Column - Navigation Links */}
          <div className="flex-1 p-12">
            <div className="grid grid-cols-3 gap-6 xl:gap-8 h-full">
              

              {/* Social Column */}
              <div>
                <h3 className="font-bold text-gray-800 mb-6 text-lg">Social</h3>
                <ul className="space-y-3">
                  <li><a href="https://www.instagram.com/daadis.in?igsh=MTg2aWx1M2o1d2c2bQ==" className="text-gray-950 hover:-translate-y-1 transition-all duration-200 inline-block font-bold" style={{fontFamily: 'Poppins, sans-serif'}}>Instagram</a></li>
                 </ul>
              </div>

              {/* Info Column */}
              <div>
                <h3 className="font-bold text-gray-800 mb-6 text-lg">Info</h3>
                <ul className="space-y-3">
                  <li><a href="mailto:hello@dadis.com" className="text-gray-950 hover:-translate-y-1 transition-all duration-200 inline-block text-sm font-bold" style={{fontFamily: 'Poppins, sans-serif'}}>hello@dadis.com</a></li>
                  <li><Link to="/privacy-policy" onClick={scrollToTop} className="text-gray-950 hover:-translate-y-1 transition-all duration-200 inline-block font-bold" style={{fontFamily: 'Poppins, sans-serif'}}>Privacy Policy</Link></li>
                  <li><Link to="/terms-and-conditions" onClick={scrollToTop} className="text-gray-950 hover:-translate-y-1 transition-all duration-200 inline-block font-bold" style={{fontFamily: 'Poppins, sans-serif'}}>Terms & Conditions</Link></li>
                </ul>
              </div>

              {/* Index Column */}
              <div>
                <h3 className="font-bold text-gray-800 mb-6 text-lg">Index</h3>
                <ul className="space-y-3">
                  <li><Link to="/" onClick={scrollToTop} className="text-gray-950 hover:-translate-y-1 transition-all duration-200 inline-block font-bold" style={{fontFamily: 'Poppins, sans-serif'}}>Home</Link></li>
                  <li><Link to="/about-us" onClick={scrollToTop} className="text-gray-950 hover:-translate-y-1 transition-all duration-200 inline-block font-bold" style={{fontFamily: 'Poppins, sans-serif'}}>About</Link></li>
                  <li><Link to="/category/all" onClick={scrollToTop} className="text-gray-950 hover:-translate-y-1 transition-all duration-200 inline-block font-bold" style={{fontFamily: 'Poppins, sans-serif'}}>products</Link></li>
                  <li><Link to="/contact" onClick={scrollToTop} className="text-gray-950 hover:-translate-y-1 transition-all duration-200 inline-block font-bold" style={{fontFamily: 'Poppins, sans-serif'}}>Contact</Link></li>
                  <li><Link to="/faq" onClick={scrollToTop} className="text-gray-950 hover:-translate-y-1 transition-all duration-200 inline-block font-bold" style={{fontFamily: 'Poppins, sans-serif'}}>FAQ</Link></li>
                </ul>
              </div>

              
            </div>
          </div>
        </div>
      </div>

      {/* Product Image - Desktop (positioned at the very bottom, full width) */}
      <div className="pointer-events-none hidden lg:flex absolute inset-x-0 -bottom-8 justify-center items-end w-full">
        {/* Stronger gradients from the top/sides; nothing at the bottom */}
        <div className="absolute top-0 left-0 right-0 h-2/3 bg-gradient-radial from-orange-500 via-yellow-400 to-transparent opacity-80 scale-150"></div>
        <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-radial from-red-500 via-orange-400 to-transparent opacity-70 scale-125"></div>
        <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-radial from-yellow-500 via-orange-300 to-transparent opacity-60 scale-110"></div>

        <img
          src="/assets/footerproduct.png"
          alt="DADI'S Product"
          className="block align-bottom w-80 xl:w-96 2xl:w-[28rem] object-contain drop-shadow-[0_25px_50px_rgba(0,0,0,0.95)] relative z-10"
        />
      </div>
    </div>
  );
};