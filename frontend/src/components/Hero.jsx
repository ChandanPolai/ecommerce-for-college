import React, { useState, useEffect } from "react";
import { assets } from "../assets/assets";

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Latest Arrivals",
      subtitle: "OUR BESTSELLERS",
      tagline: "SHOP COLLECTION",
      image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1600&auto=format&fit=crop&q=80"
    },
    {
      title: "Elegant Aesthetics",
      subtitle: "EXCLUSIVE SELECTION",
      tagline: "EXPLORE NOW",
      image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1600&auto=format&fit=crop&q=80"
    },
    {
      title: "Timeless Tailoring",
      subtitle: "SEASONAL EDIT",
      tagline: "DISCOVER",
      image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1600&auto=format&fit=crop&q=80"
    },
    {
      title: "Modern Minimalism",
      subtitle: "URBAN APPAREL",
      tagline: "VIEW JOURNAL",
      image: "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=1600&auto=format&fit=crop&q=80"
    },
    {
      title: "Sartorial Splendor",
      subtitle: "HAUTE COUTURE",
      tagline: "EXPLORE COLLECTION",
      image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=1600&auto=format&fit=crop&q=80"
    },
    {
      title: "Nordic Knits",
      subtitle: "WINTER SELECTION",
      tagline: "GET INSPIRED",
      image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1600&auto=format&fit=crop&q=80"
    },
    {
      title: "Street Essentials",
      subtitle: "PREMIUM DENIM",
      tagline: "SHOP DENIM",
      image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=1600&auto=format&fit=crop&q=80"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col sm:flex-row bg-[#faf6f0] overflow-hidden mb-12 border-b border-[#eedfc9]/25 relative h-[65vh] sm:h-[75vh] lg:h-[80vh] mx-[-16px] sm:mx-[-5vw] md:mx-[-7vw] lg:mx-[-9vw]">
      {/* Hero Left Side */}
      <div className="w-full sm:w-1/2 flex items-center justify-start py-20 sm:py-0 z-10 relative h-[250px] sm:h-full">
        <div className="text-gray-800 w-full relative h-full">
          {slides.map((slide, idx) => (
            <div
              key={idx}
              className={`transition-all duration-1000 ease-in-out absolute inset-0 flex flex-col justify-center pl-8 sm:pl-[5vw] md:pl-[7vw] lg:pl-[9vw] pr-8 ${
                idx === currentSlide
                  ? "opacity-100 translate-y-0 pointer-events-auto"
                  : "opacity-0 translate-y-4 pointer-events-none"
              }`}
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="w-8 md:w-11 h-[1.5px] bg-[#c5a880]"></span>
                <p className="font-semibold text-xs tracking-[0.25em] text-[#c5a880] uppercase">{slide.subtitle}</p>
              </div>
              <h1 className="prata-regular text-4xl sm:py-3 lg:text-6xl leading-[1.15] text-[#111111] font-bold">
                {slide.title.split(' ')[0]} <br />
                <span className="text-[#c5a880]">{slide.title.split(' ').slice(1).join(' ')}</span>
              </h1>
              <div className="flex items-center gap-2 mt-6 cursor-pointer group/btn inline-flex w-max">
                <p className="font-bold text-xs tracking-[0.25em] text-gray-900 border-b-2 border-gray-900 pb-1 group-hover/btn:border-[#c5a880] group-hover/btn:text-[#c5a880] transition-colors duration-300">
                  {slide.tagline}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Hero Right Side Carousel */}
      <div className="w-full sm:w-1/2 overflow-hidden relative h-[250px] sm:h-full">
        {slides.map((slide, idx) => (
          <img
            key={idx}
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-in-out transform ${
              idx === currentSlide ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-105 pointer-events-none"
            }`}
            src={slide.image}
            alt={slide.title}
          />
        ))}

        {/* Slide Indicators / Dots */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 sm:left-auto sm:right-[9vw] sm:translate-x-0 flex gap-2.5 z-20 bg-white/40 backdrop-blur-md px-3.5 py-2 rounded-full border border-white/20">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                idx === currentSlide ? "bg-[#c5a880] w-6" : "bg-gray-300/80 hover:bg-gray-400"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
