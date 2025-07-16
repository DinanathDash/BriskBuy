import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { ChevronLeft, ChevronRight, ShoppingBag, Zap, Gift, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: "Grand Sale",
      subtitle: "45% OFF",
      description: "Limited Time Offer",
      buttonText: "SHOP NOW",
      buttonLink: "/products?category=sale",
      bgColor: "bg-gradient-to-br from-yellow-400 via-orange-400 to-red-500",
      textColor: "text-gray-900",
      image: "https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?w=800&h=600&fit=crop",
      decorativeElements: true,
      layout: "left"
    },
    {
      id: 2,
      title: "Fashion Week",
      subtitle: "60% OFF",
      description: "Latest Trends & Styles",
      buttonText: "EXPLORE NOW",
      buttonLink: "/products?category=fashion",
      bgColor: "bg-gradient-to-br from-purple-500 via-pink-500 to-red-500",
      textColor: "text-white",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop",
      decorativeElements: true,
      layout: "right"
    },
    {
      id: 3,
      title: "Tech Deals",
      subtitle: "Up to 50% OFF",
      description: "Electronics & Gadgets",
      buttonText: "SHOP TECH",
      buttonLink: "/products?category=electronics",
      bgColor: "bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700",
      textColor: "text-white",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop",
      decorativeElements: true,
      layout: "center"
    },
    {
      id: 4,
      title: "New Arrivals",
      subtitle: "Fresh Collection",
      description: "Just In This Week",
      buttonText: "DISCOVER",
      buttonLink: "/products?sort=newest",
      bgColor: "bg-gradient-to-br from-green-400 via-teal-500 to-blue-600",
      textColor: "text-white",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
      decorativeElements: true,
      layout: "left"
    }
  ];

  // Auto-slide functionality
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative w-full h-[250px] sm:h-[300px] md:h-[400px] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-all duration-700 ease-in-out ${
            index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
          }`}
        >
          <div className={`w-full h-full ${slide.bgColor} relative overflow-hidden`}>
            {/* Decorative Elements */}
            {slide.decorativeElements && (
              <div className="absolute inset-0 overflow-hidden">
                {/* Floating Circles - Responsive positioning */}
                <div className="absolute top-2 left-2 sm:top-6 sm:left-6 w-8 h-8 sm:w-12 sm:h-12 md:w-20 md:h-20 bg-white/10 rounded-full blur-sm animate-pulse"></div>
                <div className="absolute top-8 right-4 sm:top-20 sm:right-12 w-6 h-6 sm:w-10 sm:h-10 md:w-16 md:h-16 bg-white/15 rounded-full blur-sm animate-pulse delay-1000"></div>
                <div className="absolute bottom-6 left-8 sm:bottom-12 sm:left-20 w-10 h-10 sm:w-16 sm:h-16 md:w-24 md:h-24 bg-white/8 rounded-full blur-sm animate-pulse delay-500"></div>
                <div className="absolute bottom-8 right-2 sm:bottom-20 sm:right-6 w-8 h-8 sm:w-12 sm:h-12 md:w-18 md:h-18 bg-white/12 rounded-full blur-sm animate-pulse delay-1500"></div>
                
                {/* Geometric Shapes - Hidden on mobile for cleaner look */}
                <div className="hidden sm:block absolute top-12 right-20 w-6 h-6 md:w-10 md:h-10 bg-yellow-300/20 rotate-45 rounded-lg animate-bounce"></div>
                <div className="hidden sm:block absolute bottom-24 left-12 w-4 h-4 md:w-8 md:h-8 bg-pink-300/20 rotate-12 rounded-lg animate-bounce delay-700"></div>
                
                {/* Shopping Bag Illustrations - Smaller on mobile */}
                <div className="absolute top-4 right-4 sm:top-10 sm:right-10 text-white/10 transform rotate-12">
                  <ShoppingBag className="h-6 w-6 sm:h-8 sm:w-8 md:h-12 md:w-12" />
                </div>
                <div className="absolute bottom-4 left-4 sm:bottom-10 sm:left-10 text-white/10 transform -rotate-12">
                  <Gift className="h-5 w-5 sm:h-7 sm:w-7 md:h-10 md:w-10" />
                </div>
              </div>
            )}

            {/* Main Content Container */}
            <div className="relative z-10 h-full flex items-center">
              <div className="container mx-auto px-3 sm:px-4 md:px-8">
                <div className={`grid md:grid-cols-2 gap-3 sm:gap-6 items-center ${
                  slide.layout === 'center' ? 'text-center md:col-span-2' : ''
                }`}>
                  
                  {/* Text Content */}
                  <div className={`${slide.layout === 'right' ? 'md:order-2' : ''} ${
                    slide.layout === 'center' ? 'col-span-2 max-w-3xl mx-auto' : ''
                  }`}>
                    {/* Sale Badge */}
                    <div className="inline-flex items-center gap-2 mb-2 sm:mb-3">
                      <div className="bg-black/20 backdrop-blur-sm rounded-full px-2 py-1 sm:px-3 sm:py-1">
                        <span className={`text-xs font-bold ${slide.textColor} tracking-wider`}>
                          SHOP ONLINE
                        </span>
                      </div>
                    </div>

                    {/* Main Heading */}
                    <div className="mb-2 sm:mb-4">
                      <h1 className={`text-xl sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-black ${slide.textColor} leading-tight sm:leading-none mb-1 sm:mb-2`}>
                        {slide.title}
                      </h1>
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                        <div className="bg-yellow-400 rounded-full px-3 py-1 sm:p-2 md:p-3">
                          <span className="text-sm sm:text-lg md:text-xl lg:text-2xl font-black text-gray-900">
                            {slide.subtitle}
                          </span>
                        </div>
                        <div className={`${slide.textColor} opacity-90`}>
                          <p className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold">
                            {slide.description}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* CTA Button */}
                    <Button 
                      asChild 
                      size="lg" 
                      className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-black text-xs sm:text-sm md:text-base px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300 border-2 md:border-4 border-gray-900"
                    >
                      <Link to={slide.buttonLink}>
                        {slide.buttonText}
                      </Link>
                    </Button>
                  </div>

                  {/* Image/Visual Content */}
                  {slide.layout !== 'center' && (
                    <div className={`relative ${slide.layout === 'right' ? 'md:order-1' : ''}`}>
                      <div className="relative">
                        {/* Shopping person illustration area */}
                        <div className="w-full h-32 sm:h-40 md:h-48 lg:h-60 flex items-center justify-center">
                          <div className="relative">
                            {/* Main shopping bags - Responsive sizing */}
                            <div className="flex items-center justify-center gap-1 sm:gap-2 md:gap-3">
                              <div className="bg-green-400 w-6 h-8 sm:w-8 sm:h-12 md:w-12 md:h-16 lg:w-16 lg:h-20 rounded-t-lg transform -rotate-12 shadow-xl"></div>
                              <div className="bg-pink-400 w-5 h-7 sm:w-6 sm:h-10 md:w-8 md:h-12 lg:w-12 lg:h-16 rounded-t-lg transform rotate-6 shadow-xl"></div>
                              <div className="bg-yellow-400 w-5 h-8 sm:w-7 sm:h-11 md:w-9 md:h-14 lg:w-14 lg:h-18 rounded-t-lg transform -rotate-6 shadow-xl"></div>
                              <div className="bg-blue-400 w-4 h-6 sm:w-5 sm:h-8 md:w-7 md:h-10 lg:w-10 lg:h-14 rounded-t-lg transform rotate-12 shadow-xl"></div>
                            </div>
                            
                            {/* Floating elements - Responsive positioning */}
                            <div className="absolute -top-2 -left-2 sm:-top-4 sm:-left-4 w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 lg:w-6 lg:h-6 bg-yellow-300 rounded-full animate-bounce"></div>
                            <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-3 w-2 h-2 sm:w-2 sm:h-2 md:w-3 md:h-3 lg:w-4 lg:h-4 bg-pink-300 rounded-full animate-bounce delay-300"></div>
                            <div className="absolute -bottom-1 -left-1 sm:-bottom-2 sm:-left-2 w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 lg:w-6 lg:h-6 bg-green-300 rounded-full animate-bounce delay-700"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Bottom decorative wave */}
            <div className="absolute bottom-0 left-0 w-full h-6 sm:h-8 md:h-12 bg-gradient-to-t from-black/10 to-transparent"></div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <Button
        variant="ghost"
        size="sm"
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 text-gray-900 hover:bg-white h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 rounded-full shadow-lg backdrop-blur-sm border-2 border-gray-900/10"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 text-gray-900 hover:bg-white h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 rounded-full shadow-lg backdrop-blur-sm border-2 border-gray-900/10"
        onClick={nextSlide}
      >
        <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5" />
      </Button>

      {/* Dot Indicators */}
      <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-1 sm:gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 w-2 sm:h-3 sm:w-3 md:h-4 md:w-4 rounded-full transition-all duration-300 border border-white ${
              index === currentSlide 
                ? 'bg-yellow-400 border-gray-900 scale-110 shadow-lg' 
                : 'bg-white/70 hover:bg-white hover:scale-105'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
