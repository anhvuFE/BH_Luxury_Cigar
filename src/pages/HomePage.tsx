import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/animations.css";
import {
  FaFire,
  FaCrown,
  FaStar,
  FaShieldAlt,
  FaPhone,
  FaQuoteLeft,
  FaChevronLeft,
  FaChevronRight,
  FaPlay,
} from "react-icons/fa";
import { GiCigar } from "react-icons/gi";
import Products from "../components/sections/Products";
import { API_CONFIG, API_ENDPOINTS } from "../config/api";
import type { Category } from "../types/database";

const HomePage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  const bannerSlides = [
    {
      id: 1,
      image: "/src/assets/images/banner1.png",
      title: "BH LUXURY CIGAR",
      subtitle: "Chuyên gia Xì Gà Cuba hàng đầu Việt Nam",
      description:
        "Khám phá bộ sưu tập xì gà Cuba cao cấp với chất lượng đảm bảo 100%",
    },
    {
      id: 2,
      image: "/src/assets/images/banner2.png",
      title: "ATELIER HAUTE CREATION",
      subtitle: "Nghệ thuật chế tác xì gà đỉnh cao",
      description:
        "Trải nghiệm những sản phẩm thủ công tinh xảo từ các nghệ nhân hàng đầu",
    },
    {
      id: 3,
      image: "/src/assets/images/banner3.png",
      title: "WHISKY & CIGAR COLLECTION",
      subtitle: "Bộ sưu tập Whisky & Xì Gà cao cấp",
      description:
        "Sự kết hợp hoàn hảo giữa whisky thượng hạng và xì gà Cuba chính hãng",
    },
  ];

  useEffect(() => {
    loadCategories();
  }, []);

  // Auto-slide effect
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
    }, 5000);

    return () => clearInterval(slideInterval);
  }, [bannerSlides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + bannerSlides.length) % bannerSlides.length
    );
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const loadCategories = async () => {
    try {
      const response = await axios.get(
        `${API_CONFIG.BASE_URL}${API_CONFIG.BASE_PATH}${API_ENDPOINTS.CATEGORIES.LIST}`
      );
      const responseData = response.data;

      if (responseData.success && Array.isArray(responseData.data)) {
        setCategories(responseData.data.slice(0, 6)); // Limit to 6 categories for grid
      }
    } catch (error) {
      console.error("Error loading categories:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Hero Slider Section */}
      <section className="relative w-full h-screen overflow-hidden">
        {/* Floating Smoke Effects - Responsive */}
        <div className="absolute inset-0 pointer-events-none z-20">
          <div className="absolute top-10 sm:top-20 left-10 sm:left-20 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gray-300 opacity-30 floating-smoke floating-smoke-1"></div>
          <div className="absolute top-20 sm:top-40 right-16 sm:right-32 w-4 h-4 sm:w-6 sm:h-6 rounded-full bg-gray-400 opacity-20 floating-smoke floating-smoke-2"></div>
          <div className="absolute top-30 sm:top-60 left-1/3 w-6 h-6 sm:w-10 sm:h-10 rounded-full bg-gray-200 opacity-25 floating-smoke floating-smoke-3"></div>
          <div className="absolute top-40 sm:top-80 right-10 sm:right-20 w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-gray-300 opacity-15 floating-smoke floating-smoke-4"></div>
        </div>

        {/* Golden Particles - Responsive */}
        <div className="absolute inset-0 pointer-events-none z-10">
          <div className="absolute bottom-10 sm:bottom-20 left-5 sm:left-10 w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-amber-400 golden-particles particle-1"></div>
          <div className="absolute bottom-16 sm:bottom-32 left-16 sm:left-32 w-1 h-1 rounded-full bg-amber-500 golden-particles particle-2"></div>
          <div className="absolute bottom-20 sm:bottom-40 left-10 sm:left-20 w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-amber-300 golden-particles particle-3"></div>
          <div className="absolute bottom-14 sm:bottom-28 left-20 sm:left-40 w-1 h-1 rounded-full bg-amber-600 golden-particles particle-4"></div>
          <div className="absolute bottom-25 sm:bottom-50 left-8 sm:left-16 w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-amber-400 golden-particles particle-5"></div>
        </div>

        <div className="relative w-full h-full">
          {/* Slides */}
          {bannerSlides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out ${
                index === currentSlide
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-100"
              }`}
            >
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover object-center"
              />

              {/* Animated Dark Overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/60 luxury-shimmer"></div>

              {/* Rotating Cigar Ring Background - Responsive */}
              <div className="absolute top-1/4 right-4 sm:right-10 opacity-10">
                <div className="w-32 h-32 sm:w-64 sm:h-64 lg:w-96 lg:h-96 border-2 sm:border-4 border-amber-500 rounded-full cigar-ring"></div>
              </div>

              {/* Content Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                  {/* Main Title with Luxury Effect - Responsive */}
                  <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-4 sm:mb-6 tracking-wide luxury-text-reveal cigar-glow relative">
                    {slide.title}
                    <div className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 w-6 h-6 sm:w-8 sm:h-8">
                      <GiCigar className="text-lg sm:text-2xl text-amber-400 floating-smoke" />
                    </div>
                  </h1>

                  {/* Subtitle with Shimmer - Responsive */}
                  <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light mb-6 sm:mb-8 text-amber-300 animate-fade-in-up animation-delay-200 luxury-shimmer">
                    {slide.subtitle}
                  </h2>

                  {/* Description with Fade - Responsive */}
                  <p className="text-base sm:text-lg md:text-xl mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed animate-fade-in-up animation-delay-400 text-gray-100">
                    {slide.description}
                  </p>

                  {/* Premium Buttons - Responsive */}
                  <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-8 animate-fade-in-up animation-delay-600">
                    <button className="btn-luxury text-black px-6 sm:px-8 md:px-12 py-3 sm:py-4 md:py-5 rounded-full font-bold text-base sm:text-lg md:text-xl transition-all duration-500 transform hover:scale-110 shadow-2xl relative overflow-hidden">
                      <span className="relative z-10">Khám Phá Ngay</span>
                    </button>
                    <button className="border-3 border-amber-400 text-white px-6 sm:px-8 md:px-12 py-3 sm:py-4 md:py-5 rounded-full font-bold text-base sm:text-lg md:text-xl hover:bg-amber-400 hover:text-black transition-all duration-500 transform hover:scale-110 flex items-center justify-center premium-hover cigar-glow">
                      <FaPlay className="mr-2 sm:mr-3" />
                      Xem Video
                    </button>
                  </div>

                  {/* Decorative Elements */}
                  <div className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 opacity-30">
                    <div className="flex space-x-4">
                      <GiCigar className="text-4xl text-amber-400 cigar-ring" />
                      <GiCigar className="text-3xl text-amber-500 floating-smoke" />
                      <GiCigar
                        className="text-4xl text-amber-400 cigar-ring"
                        style={{ animationDelay: "10s" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Luxury Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-8 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-amber-500/20 to-amber-600/20 backdrop-blur-sm border border-amber-500/30 hover:border-amber-500/60 text-amber-400 p-5 rounded-full transition-all duration-500 hover:scale-125 z-30 cigar-glow premium-hover"
          >
            <FaChevronLeft className="text-2xl" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-8 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-amber-500/20 to-amber-600/20 backdrop-blur-sm border border-amber-500/30 hover:border-amber-500/60 text-amber-400 p-5 rounded-full transition-all duration-500 hover:scale-125 z-30 cigar-glow premium-hover"
          >
            <FaChevronRight className="text-2xl" />
          </button>

          {/* Luxury Slide Indicators */}
          <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 flex space-x-4 z-30">
            {bannerSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`relative transition-all duration-500 ${
                  index === currentSlide ? "w-12 h-4" : "w-4 h-4"
                }`}
              >
                <div
                  className={`w-full h-full rounded-full transition-all duration-500 ${
                    index === currentSlide
                      ? "bg-gradient-to-r from-amber-400 to-amber-600 cigar-glow"
                      : "bg-white/30 hover:bg-white/60 border border-amber-500/30"
                  }`}
                />
                {index === currentSlide && (
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-400 to-amber-600 luxury-shimmer" />
                )}
              </button>
            ))}
          </div>

          {/* Enhanced Progress Bar */}
          <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-black/40 via-black/20 to-black/40">
            <div
              className="h-full bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 transition-all duration-5000 ease-linear relative overflow-hidden"
              style={{
                width: `${((currentSlide + 1) / bannerSlides.length) * 100}%`,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent luxury-shimmer" />
            </div>
          </div>
        </div>
      </section>

      {/* Categories Collection - Premium Design */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 transform rotate-12">
            <GiCigar className="text-6xl text-amber-500" />
          </div>
          <div className="absolute bottom-20 right-20 transform -rotate-45">
            <GiCigar className="text-8xl text-amber-500" />
          </div>
        </div>

        <div className="container mx-auto px-4 relative">
          {/* Section Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full mb-8">
              <GiCigar className="text-2xl text-black" />
            </div>
            <h2 className="text-5xl font-bold text-gray-900 mb-6 tracking-tight">
              Bộ Sưu Tập Đặc Biệt
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Khám phá những dòng xì gà cao cấp được tuyển chọn kỹ lưỡng từ các
              vùng đất nổi tiếng trên thế giới
            </p>
            <div className="flex items-center justify-center space-x-2 mt-8">
              <div className="w-20 h-1 bg-amber-500 rounded-full"></div>
              <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
              <div className="w-20 h-1 bg-amber-500 rounded-full"></div>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="relative">
                <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-amber-500"></div>
                <div className="absolute inset-0 rounded-full border-4 border-amber-200"></div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {categories.map((category, index) => {
                return (
                  <Link
                    key={category._id}
                    to={`/collections?category=${
                      category.slug || category._id
                    }`}
                    className={`group relative block premium-card-entrance category-stagger-${
                      index + 1
                    }`}
                  >
                    <div className="relative h-96 rounded-3xl overflow-hidden bg-gradient-to-br from-gray-900 to-black shadow-2xl border border-amber-500/20 hover:border-amber-500/50 transition-all duration-500 transform hover:scale-105 hover:shadow-amber-500/20 humidor-open premium-hover">
                      {/* Background Image */}
                      <img
                        src={
                          category.image ||
                          category.image_url ||
                          "/src/assets/images/placeholder.png"
                        }
                        alt={category.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-60"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "/src/assets/images/placeholder.png";
                        }}
                      />

                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent group-hover:from-black/90 transition-all duration-500"></div>

                      {/* Premium Badge */}
                      <div className="absolute top-6 right-6">
                        <div className="bg-gradient-to-r from-amber-400 to-amber-600 text-black px-4 py-2 rounded-full text-xs font-bold tracking-wide">
                          PREMIUM
                        </div>
                      </div>

                      {/* Content */}
                      <div className="absolute bottom-0 left-0 right-0 p-8">
                        <div className="space-y-4">
                          <div className="flex items-center space-x-3 mb-4">
                            <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                            <span className="text-amber-400 text-sm font-medium tracking-wider">
                              COLLECTION #{index + 1}
                            </span>
                          </div>

                          <h3 className="text-white text-2xl font-bold tracking-wide group-hover:text-amber-300 transition-colors duration-300">
                            {category.name.toUpperCase()}
                          </h3>

                          {category.description ? (
                            <p className="text-gray-300 text-sm leading-relaxed line-clamp-2">
                              {category.description}
                            </p>
                          ) : (
                            <p className="text-gray-300 text-sm leading-relaxed">
                              Khám phá bộ sưu tập {category.name.toLowerCase()}{" "}
                              cao cấp với chất lượng đỉnh cao
                            </p>
                          )}

                          {/* Action Button */}
                          <div className="flex items-center justify-between pt-4 border-t border-amber-500/30">
                            <span className="text-amber-400 text-sm font-medium">
                              Xem Bộ Sưu Tập
                            </span>
                            <div className="w-8 h-8 bg-amber-500/20 rounded-full flex items-center justify-center group-hover:bg-amber-500 transition-colors duration-300">
                              <span className="text-amber-400 group-hover:text-black transition-colors duration-300">
                                →
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Decorative Elements */}
                      <div className="absolute top-8 left-8 opacity-20 group-hover:opacity-40 transition-opacity duration-500">
                        <GiCigar className="text-4xl text-amber-500 transform rotate-12" />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}

          {/* View All Button */}
          <div className="text-center mt-16">
            <Link
              to="/collections"
              className="inline-flex items-center bg-gradient-to-r from-amber-500 to-amber-600 text-black px-12 py-4 rounded-full font-bold text-lg hover:from-amber-400 hover:to-amber-500 transition-all duration-300 transform hover:scale-105 shadow-2xl btn-glow"
            >
              Xem Tất Cả Bộ Sưu Tập
              <span className="ml-3 transform group-hover:translate-x-1 transition-transform duration-300">
                →
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Products Section - Firebase + Static Products */}
      <Products />

      {/* PHU KIỆN XÌ GÀ Section */}
      <section className="py-24 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 transform rotate-45">
            <GiCigar className="text-8xl text-amber-500 floating-smoke floating-smoke-1" />
          </div>
          <div className="absolute bottom-20 right-20 transform -rotate-12">
            <GiCigar className="text-6xl text-amber-500 cigar-ring" />
          </div>
        </div>

        {/* Golden Particles */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-32 left-1/4 w-2 h-2 bg-amber-400 rounded-full golden-particles particle-1"></div>
          <div className="absolute bottom-40 right-1/3 w-1 h-1 bg-amber-500 rounded-full golden-particles particle-3"></div>
          <div className="absolute top-60 right-1/4 w-3 h-3 bg-amber-300 rounded-full golden-particles particle-5"></div>
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-20">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full mb-8 cigar-glow animate-fade-in-up">
              <GiCigar className="text-2xl text-black" />
            </div>
            <h2 className="text-6xl font-bold text-white mb-6 tracking-tight luxury-text-reveal">
              PHU KIỆN XÌ GÀ
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto animate-fade-in-up animation-delay-400">
              Bộ sưu tập phụ kiện cao cấp dành cho những người sành điệu
            </p>
            <div className="flex items-center justify-center space-x-2 mt-8 animate-fade-in-up animation-delay-600">
              <div className="w-20 h-1 bg-amber-500 rounded-full whisky-pour"></div>
              <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
              <div className="w-20 h-1 bg-amber-500 rounded-full whisky-pour animation-delay-200"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 max-w-7xl mx-auto">
            {[
              {
                name: "Bộ Phụ Kiện Gốm Bật Lửa & Dao Cắt COHIBA BEHIKE X",
                brand: "HABANOS",
                price: "14.168.000đ",
                image: "/src/assets/images/PK/1.png",
              },
              {
                name: "Dao Cắt Xì Gà Hai Lưỡi H.UPMANN",
                brand: "HABANOS",
                price: "286.000đ",
                image: "/src/assets/images/PK/2.png",
              },
              {
                name: "Gạt Tàn Xì Gà Bằng Gốm FLOR DE CASTILLO SNAKE Ashtray",
                brand: "FLOR DE CASTILLO",
                price: "3.348.000đ",
                image: "/src/assets/images/PK/3.png",
              },
              {
                name: "Gạt Tàn Xì Gà Bằng Gốm FLOR DE CASTILLO ART Ashtray",
                brand: "FLOR DE CASTILLO",
                price: "3.348.000đ",
                image: "/src/assets/images/PK/4.png",
              },
              {
                name: "Gạt Tàn Gốm S.T. Dupont Fender | 006425",
                brand: "S.T. DUPONT",
                price: "13.996.800đ",
                image: "/src/assets/images/PK/5.png",
              },
            ].map((item, index) => {
              return (
                <div
                  key={index}
                  className={`group relative bg-gradient-to-b from-white to-gray-50 border border-amber-500/20 rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-amber-500/20 transition-all duration-500 text-center premium-card-entrance category-stagger-${
                    index + 1
                  } premium-hover`}
                >
                  {/* Premium Badge */}
                  <div className="absolute top-4 right-4 z-10">
                    <div className="bg-gradient-to-r from-amber-400 to-amber-600 text-black px-3 py-1 rounded-full text-xs font-bold cigar-glow">
                      PREMIUM
                    </div>
                  </div>

                  {/* Image Container */}
                  <div className="relative">
                    <div className="w-full h-56 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-6 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-700 filter group-hover:drop-shadow-lg"
                      />
                    </div>
                    {/* Shimmer Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent luxury-shimmer"></div>
                  </div>

                  {/* Content */}
                  <div className="p-6 space-y-4">
                    <h3 className="font-bold text-gray-900 text-sm leading-tight min-h-[3rem] luxury-text-reveal animation-delay-200">
                      {item.name}
                    </h3>

                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                      <div className="text-sm text-amber-600 font-bold tracking-wider">
                        {item.brand}
                      </div>
                      <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                    </div>

                    <div className="text-xl font-bold text-amber-600 luxury-shimmer">
                      {item.price}
                    </div>

                    {/* Decorative Line */}
                    <div className="w-full h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent"></div>
                  </div>

                  {/* Hover Effect Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-amber-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-16">
            <button className="btn-luxury text-black px-12 py-4 rounded-full font-bold text-lg transition-all duration-500 transform hover:scale-110 shadow-2xl">
              <span className="relative z-10">XEM TẤT CẢ PHỤ KIỆN</span>
            </button>
          </div>
        </div>
      </section>

      {/* Banner 2 Section - ATELIER HAUTE CREATION - Responsive */}
      <section className="relative w-full h-[50vh] sm:h-[60vh] md:h-[70vh] overflow-hidden">
        {/* Background Image with Parallax */}
        <div className="absolute inset-0">
          <img
            src="/src/assets/images/banner2.png"
            alt="ATELIER HAUTE CREATION Banner"
            className="w-full h-full object-cover transform scale-110 group-hover:scale-100 transition-transform duration-[8s] ease-out"
          />
        </div>

        {/* Animated Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60 luxury-shimmer"></div>

        {/* Floating Elements - Responsive */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 sm:top-20 left-10 sm:left-20 w-4 h-4 sm:w-6 sm:h-6 bg-amber-400/30 rounded-full floating-smoke floating-smoke-1"></div>
          <div className="absolute bottom-16 sm:bottom-32 right-16 sm:right-32 w-3 h-3 sm:w-4 sm:h-4 bg-amber-500/20 rounded-full floating-smoke floating-smoke-3"></div>
          <div className="absolute top-1/2 left-4 sm:left-10 w-2 h-2 bg-amber-300 rounded-full golden-particles particle-2"></div>
          <div className="absolute bottom-10 sm:bottom-20 left-1/3 w-2 h-2 sm:w-3 sm:h-3 bg-amber-400 rounded-full golden-particles particle-4"></div>
        </div>

        {/* Content Overlay - Responsive */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full mb-6 sm:mb-8 cigar-glow animate-fade-in-up">
              <GiCigar className="text-lg sm:text-2xl text-black" />
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 tracking-wide luxury-text-reveal cigar-glow">
              ATELIER HAUTE CRÉATION
            </h2>

            <p className="text-lg sm:text-xl md:text-2xl font-light mb-6 sm:mb-8 text-amber-300 animate-fade-in-up animation-delay-400 luxury-shimmer">
              Nghệ thuật chế tác xì gà đỉnh cao
            </p>

            <p className="text-sm sm:text-base md:text-lg mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed animate-fade-in-up animation-delay-600 text-gray-200">
              Khám phá những tác phẩm nghệ thuật được chế tác bằng tay từ những
              nghệ nhân hàng đầu thế giới
            </p>

            <div className="flex justify-center animate-fade-in-up animation-delay-800">
              <button className="btn-luxury text-black px-6 sm:px-8 md:px-10 py-3 sm:py-4 rounded-full font-bold text-base sm:text-lg transition-all duration-500 transform hover:scale-110 shadow-2xl">
                <span className="relative z-10">Khám Phá Bộ Sưu Tập</span>
              </button>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 opacity-40">
              <div className="flex space-x-6">
                <GiCigar className="text-3xl text-amber-400 cigar-ring" />
                <GiCigar className="text-4xl text-amber-500 floating-smoke" />
                <GiCigar
                  className="text-3xl text-amber-400 cigar-ring"
                  style={{ animationDelay: "10s" }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Subtle Pattern Overlay */}
        <div className="absolute top-10 right-10 opacity-10">
          <div className="w-32 h-32 border-2 border-amber-500 rounded-full cigar-ring"></div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="relative py-24 bg-black overflow-hidden">
        {/* Background Cigar Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 transform rotate-12">
            <GiCigar className="text-8xl text-amber-500" />
          </div>
          <div className="absolute top-32 right-20 transform -rotate-45">
            <GiCigar className="text-6xl text-amber-500" />
          </div>
          <div className="absolute bottom-20 left-1/4 transform rotate-45">
            <GiCigar className="text-7xl text-amber-500" />
          </div>
          <div className="absolute bottom-40 right-10 transform -rotate-12">
            <GiCigar className="text-5xl text-amber-500" />
          </div>
        </div>

        <div className="relative container mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full mb-8">
              <FaQuoteLeft className="text-3xl text-black" />
            </div>
            <h2 className="text-6xl font-bold text-white mb-6 tracking-tight">
              Khách Hàng Nói Gì
            </h2>
            <div className="flex items-center justify-center space-x-2">
              <div className="w-16 h-1 bg-amber-500 rounded-full"></div>
              <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
              <div className="w-16 h-1 bg-amber-500 rounded-full"></div>
            </div>
          </div>

          {/* Main Content */}
          <div className="max-w-6xl mx-auto">
            {/* Central Testimonial */}
            <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-3xl p-12 mb-16 border border-amber-500/20 shadow-2xl testimonial-float premium-hover cigar-glow">
              {/* Floating Quote Particles */}
              <div className="absolute top-4 left-4 opacity-20">
                <div className="w-3 h-3 bg-amber-400 rounded-full golden-particles particle-1"></div>
              </div>
              <div className="absolute top-8 right-8 opacity-20">
                <div className="w-2 h-2 bg-amber-500 rounded-full golden-particles particle-3"></div>
              </div>

              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 animate-fade-in-up">
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={`text-amber-400 text-2xl animate-fade-in-up animation-delay-${
                        (i + 1) * 200
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="text-center space-y-8">
                <p className="text-2xl text-gray-100 leading-relaxed font-light italic luxury-text-reveal animation-delay-200">
                  "Chuyên gia chính thức đầu tiên ở Việt Nam hoạt động bởi
                  Golden Phoenix và Avanti, một nhà phân phối chính của The
                  Pacific Cigar và Habanos S.A. ở Việt Nam."
                </p>
                <p className="text-xl text-gray-300 leading-relaxed animate-fade-in-up animation-delay-400">
                  "Habanos Specialist có nhiều Xì gà Cuba hoàn hảo được ủy lưu
                  từ 24/7 chuyên nghiệp, để đảm bảo các điều kiện tối ưu chính
                  xác cho người yêu thích hút xì gà."
                </p>

                <div className="flex items-center justify-center space-x-6 pt-8 border-t border-amber-500/30 animate-fade-in-up animation-delay-600">
                  <div className="w-20 h-20 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full flex items-center justify-center cigar-glow premium-hover">
                    <span className="text-black font-bold text-2xl">MJ</span>
                  </div>
                  <div className="text-left">
                    <div className="text-amber-400 font-bold text-2xl luxury-shimmer">
                      Mr Joel
                    </div>
                    <div className="text-gray-400">Chuyên gia Habanos</div>
                    <div className="flex mt-2 items-center">
                      <FaShieldAlt className="text-amber-500 mr-2 cigar-ring" />
                      <span className="text-sm text-gray-300">
                        Chứng nhận chính thức
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative Cigar Smoke */}
              <div className="absolute bottom-4 right-4 opacity-10">
                <GiCigar className="text-6xl text-amber-500 floating-smoke" />
              </div>
            </div>

            {/* Feature Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <div className="group relative bg-gradient-to-br from-amber-900/20 to-black/50 backdrop-blur-sm rounded-2xl p-8 border border-amber-500/20 hover:border-amber-500/50 transition-all duration-300 hover:transform hover:scale-105 premium-card-entrance animation-delay-200 premium-hover cigar-glow">
                <div className="absolute top-4 right-4">
                  <FaShieldAlt className="text-amber-500 text-2xl" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  Chính Hãng 100%
                </h3>
                <p className="text-gray-300">
                  Nhà phân phối chính thức của Habanos S.A. tại Việt Nam với đầy
                  đủ giấy tờ chứng nhận
                </p>
                <div className="mt-6 w-full h-1 bg-gradient-to-r from-amber-500 to-transparent rounded-full"></div>
              </div>

              <div className="group relative bg-gradient-to-br from-amber-900/20 to-black/50 backdrop-blur-sm rounded-2xl p-8 border border-amber-500/20 hover:border-amber-500/50 transition-all duration-300 hover:transform hover:scale-105 premium-card-entrance animation-delay-400 premium-hover cigar-glow">
                <div className="absolute top-4 right-4">
                  <FaStar className="text-amber-500 text-2xl floating-smoke" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 luxury-shimmer">
                  Chất Lượng Đỉnh Cao
                </h3>
                <p className="text-gray-300">
                  Điều kiện bảo quản hoàn hảo 24/7 với công nghệ humidor hiện
                  đại nhất
                </p>
              </div>

              <div className="group relative bg-gradient-to-br from-amber-900/20 to-black/50 backdrop-blur-sm rounded-2xl p-8 border border-amber-500/20 hover:border-amber-500/50 transition-all duration-300 hover:transform hover:scale-105 premium-card-entrance animation-delay-600 premium-hover cigar-glow">
                <div className="absolute top-4 right-4">
                  <FaCrown className="text-amber-500 text-2xl cigar-ring" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 luxury-text-reveal">
                  Dịch Vụ Hoàng Gia
                </h3>
                <p className="text-gray-300">
                  Tư vấn cá nhân từ các chuyên gia hàng đầu với kinh nghiệm 20+
                  năm
                </p>
              </div>
            </div>

            {/* Blog Section with Elegant Cards */}
            <div className="text-center mb-12">
              <h3 className="text-4xl font-bold text-white mb-4">
                Bài Viết Đặc Sắc
              </h3>
              <p className="text-xl text-gray-400">
                Khám phá thế giới xì gà qua góc nhìn của các chuyên gia
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="group relative rounded-3xl overflow-hidden border border-amber-500/20 hover:border-amber-500/50 transition-all duration-500 premium-card-entrance animation-delay-800 premium-hover">
                <div className="relative h-96">
                  <img
                    src="/src/assets/images/BV/1.png"
                    alt="Gạt Tàn Xì Gà Cuba"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent luxury-shimmer"></div>
                  <div className="absolute top-6 left-6">
                    <span className="bg-gradient-to-r from-amber-500 to-amber-600 text-black px-4 py-2 rounded-full text-sm font-bold cigar-glow">
                      FEATURED
                    </span>
                  </div>
                  {/* Floating Smoke Effect */}
                  <div className="absolute top-20 right-10 opacity-20">
                    <div className="w-4 h-4 bg-gray-300 rounded-full floating-smoke floating-smoke-1"></div>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <h4 className="text-white text-2xl font-bold mb-4 leading-tight luxury-text-reveal">
                    Gạt Tàn Xì Gà Cuba: Nghệ Thuật & Đẳng Cấp
                  </h4>
                  <p className="text-gray-300 mb-6 line-clamp-2">
                    Khám phá lịch sử và giá trị sưu tập của những chiếc gạt tàn
                    xì gà Cuba đích thực
                  </p>
                  <button className="group/btn btn-luxury text-black px-8 py-3 rounded-full font-bold transition-all duration-300 transform group-hover:scale-105">
                    Khám Phá Ngay
                    <span className="ml-2 group-hover/btn:translate-x-1 transition-transform duration-300">
                      →
                    </span>
                  </button>
                </div>
              </div>

              <div className="group relative rounded-3xl overflow-hidden border border-amber-500/20 hover:border-amber-500/50 transition-all duration-500 premium-card-entrance animation-delay-1000 premium-hover">
                <div className="relative h-96">
                  <img
                    src="/src/assets/images/BV/2.png"
                    alt="Review Phụ Kiện Xì Gà"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent luxury-shimmer"></div>
                  <div className="absolute top-6 left-6">
                    <span className="bg-gradient-to-r from-amber-500 to-amber-600 text-black px-4 py-2 rounded-full text-sm font-bold cigar-glow">
                      REVIEW
                    </span>
                  </div>
                  {/* Golden Particles */}
                  <div className="absolute bottom-20 right-8 opacity-30">
                    <div className="w-2 h-2 bg-amber-400 rounded-full golden-particles particle-2"></div>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <h4 className="text-white text-2xl font-bold mb-4 leading-tight luxury-text-reveal">
                    Review Phụ Kiện: Cutter, Bật Lửa & Humidor
                  </h4>
                  <p className="text-gray-300 mb-6 line-clamp-2">
                    Đánh giá chi tiết những phụ kiện cao cấp không thể thiếu cho
                    người sành xì gà
                  </p>
                  <button className="group/btn btn-luxury text-black px-8 py-3 rounded-full font-bold transition-all duration-300 transform group-hover:scale-105">
                    Đọc Review
                    <span className="ml-2 group-hover/btn:translate-x-1 transition-transform duration-300">
                      →
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Logos Section */}
      <section className="py-24 bg-gradient-to-b from-white via-gray-50 to-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 transform rotate-45">
            <GiCigar className="text-6xl text-gray-400 floating-smoke floating-smoke-2" />
          </div>
          <div className="absolute bottom-20 right-20 transform -rotate-12">
            <GiCigar className="text-8xl text-gray-400 cigar-ring" />
          </div>
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-20">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-gray-400 to-gray-600 rounded-full mb-8 animate-fade-in-up">
              <FaShieldAlt className="text-2xl text-white" />
            </div>
            <h2 className="text-5xl font-bold text-gray-900 mb-6 tracking-tight luxury-text-reveal">
              Nhãn Hiệu Danh Tiếng
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-fade-in-up animation-delay-400">
              Đối tác chính thức của những thương hiệu xì gà hàng đầu thế giới
            </p>
            <div className="flex items-center justify-center space-x-2 mt-8 animate-fade-in-up animation-delay-600">
              <div className="w-16 h-1 bg-gray-400 rounded-full whisky-pour"></div>
              <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
              <div className="w-16 h-1 bg-gray-400 rounded-full whisky-pour animation-delay-200"></div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 max-w-6xl mx-auto">
            {[
              { name: "MONTECRISTO", icon: GiCigar },
              { name: "LAVA", icon: FaFire },
              { name: "HABANOS", icon: FaShieldAlt },
              { name: "AURORA", icon: FaStar },
              { name: "H.UPMANN", icon: FaCrown },
              { name: "PLASENCIA", icon: GiCigar },
            ].map((brand, index) => {
              const IconComponent = brand.icon;
              return (
                <div
                  key={index}
                  className={`group text-center cursor-pointer premium-card-entrance category-stagger-${
                    index + 1
                  } relative`}
                >
                  {/* Brand Card */}
                  <div className="relative bg-white p-6 rounded-2xl shadow-lg border border-gray-200 hover:border-amber-500/50 hover:shadow-2xl hover:shadow-amber-500/20 transition-all duration-500 premium-hover">
                    {/* Icon */}
                    <div className="relative mb-6">
                      <IconComponent className="text-5xl text-gray-400 group-hover:text-amber-600 mx-auto transition-all duration-500 transform group-hover:scale-110" />
                    </div>

                    {/* Brand Name */}
                    <div className="space-y-2 flex flex-col items-center">
                      <h3 className="text-sm font-bold text-gray-700 group-hover:text-amber-600 transition-colors duration-300 luxury-text-reveal text-center break-words leading-tight w-full">
                        {brand.name}
                      </h3>
                      <div className="w-12 h-px bg-gray-300 group-hover:bg-amber-500 transition-colors duration-500"></div>
                    </div>

                    {/* Shimmer Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl luxury-shimmer"></div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Partnership Statement */}
          <div className="text-center mt-16 animate-fade-in-up animation-delay-1000">
            <div className="max-w-4xl mx-auto bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-8 border border-gray-200">
              <p className="text-lg text-gray-700 font-medium leading-relaxed">
                "Là đối tác chính thức của những thương hiệu xì gà danh tiếng,
                chúng tôi cam kết mang đến những sản phẩm chính hãng với chất
                lượng vượt trội."
              </p>
              <div className="flex items-center justify-center mt-6 space-x-4">
                <div className="w-8 h-8 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full flex items-center justify-center">
                  <FaShieldAlt className="text-black text-sm" />
                </div>
                <span className="text-amber-600 font-bold">
                  Chứng nhận chính thức
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Whisky Collection Showcase - Responsive */}
      <section className="relative w-full h-[60vh] sm:h-[70vh] md:h-[80vh] overflow-hidden">
        {/* Background Image with Parallax */}
        <div className="absolute inset-0">
          <img
            src="/src/assets/images/banner3.png"
            alt="Whisky Collection Banner"
            className="w-full h-full object-cover transform scale-105 hover:scale-100 transition-transform duration-[10s] ease-out"
          />
        </div>

        {/* Animated Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent luxury-shimmer"></div>

        {/* Floating Whisky Drops - Responsive */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-16 sm:top-32 left-16 sm:left-32 w-2 h-2 sm:w-3 sm:h-3 bg-amber-600 rounded-full golden-particles particle-1"></div>
          <div className="absolute top-24 sm:top-48 right-20 sm:right-40 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-amber-500 rounded-full golden-particles particle-3"></div>
          <div className="absolute bottom-20 sm:bottom-40 left-1/4 w-3 h-3 sm:w-4 sm:h-4 bg-amber-400 rounded-full golden-particles particle-5"></div>
          <div className="absolute bottom-12 sm:bottom-24 right-1/3 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-amber-600 rounded-full golden-particles particle-2"></div>
        </div>

        {/* Content Overlay - Responsive */}
        <div className="absolute inset-0 flex items-end justify-center pb-10 sm:pb-20">
          <div className="text-center text-white max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-amber-600 to-amber-700 rounded-full mb-6 sm:mb-8 cigar-glow animate-fade-in-up">
              <div className="text-xl sm:text-2xl text-black font-bold">🥃</div>
            </div>

            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 tracking-wide luxury-text-reveal cigar-glow">
              WHISKY & CIGAR
            </h2>

            <h3 className="text-xl sm:text-2xl md:text-3xl font-light mb-6 sm:mb-8 text-amber-300 animate-fade-in-up animation-delay-400 luxury-shimmer">
              Bộ Sưu Tập Hoàn Hảo
            </h3>

            <p className="text-base sm:text-lg md:text-xl mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed animate-fade-in-up animation-delay-600 text-gray-200">
              Sự kết hợp tuyệt vời giữa whisky thượng hạng và xì gà Cuba chính
              hãng - Trải nghiệm đẳng cấp cho những người sành điệu
            </p>

            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-8 animate-fade-in-up animation-delay-800">
              <button className="btn-luxury text-black px-6 sm:px-8 md:px-12 py-3 sm:py-4 md:py-5 rounded-full font-bold text-base sm:text-lg md:text-xl transition-all duration-500 transform hover:scale-110 shadow-2xl">
                <span className="relative z-10">Khám Phá Bộ Sưu Tập</span>
              </button>
              <button className="border-3 border-amber-400 text-white px-6 sm:px-8 md:px-12 py-3 sm:py-4 md:py-5 rounded-full font-bold text-base sm:text-lg md:text-xl hover:bg-amber-400 hover:text-black transition-all duration-500 transform hover:scale-110 premium-hover">
                Tư Vấn Pairing
              </button>
            </div>
          </div>
        </div>

        {/* Whisky Glass Animation */}
        <div className="absolute bottom-10 left-10 opacity-20">
          <div className="w-16 h-20 border-2 border-amber-500 rounded-b-lg relative overflow-hidden">
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-amber-600 to-amber-400 whisky-pour"></div>
          </div>
        </div>

        {/* Rotating Decoration */}
        <div className="absolute top-20 right-20 opacity-10">
          <div className="w-40 h-40 border-2 border-amber-500 rounded-full cigar-ring"></div>
        </div>
      </section>

      {/* Map & Contact Section */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 right-20 transform rotate-45">
            <FaPhone className="text-6xl text-gray-400 floating-smoke floating-smoke-1" />
          </div>
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mb-8 animate-fade-in-up">
              <FaPhone className="text-2xl text-white" />
            </div>
            <h3 className="text-5xl font-bold text-gray-900 mb-6 luxury-text-reveal">
              Ghé Thăm Showroom
            </h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-fade-in-up animation-delay-400">
              Trải nghiệm không gian luxuy và tư vấn trực tiếp từ các chuyên gia
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Info */}
            <div className="space-y-8 premium-card-entrance animation-delay-600">
              <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-200 premium-hover">
                <div className="text-center space-y-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full cigar-glow">
                    <GiCigar className="text-2xl text-black" />
                  </div>

                  <h4 className="text-3xl font-bold text-gray-900 luxury-text-reveal">
                    BH Luxury Cigar
                  </h4>

                  <div className="space-y-4">
                    <p className="text-lg text-gray-700 flex items-center justify-center">
                      <span className="w-2 h-2 bg-amber-500 rounded-full mr-3"></span>
                      138 Bình Hàn, TP Hải Dương
                    </p>

                    <div className="flex items-center justify-center space-x-3 p-4 bg-amber-50 rounded-xl">
                      <div className="w-10 h-10 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full flex items-center justify-center cigar-glow">
                        <FaPhone className="text-white text-sm" />
                      </div>
                      <a
                        href="tel:0975224557"
                        className="text-xl font-bold text-amber-600 hover:text-amber-700 transition-colors"
                      >
                        0975224557
                      </a>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-gray-200">
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Giờ mở cửa: <strong>9:00 - 22:00</strong> (Tất cả các ngày
                      trong tuần)
                    </p>
                  </div>
                </div>
              </div>

              {/* Additional Info Cards */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 text-center premium-hover">
                  <FaShieldAlt className="text-3xl text-blue-600 mx-auto mb-3 cigar-glow" />
                  <h5 className="font-bold text-blue-800">Chính Hãng 100%</h5>
                  <p className="text-blue-600 text-sm">Cam kết chất lượng</p>
                </div>
                <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl p-6 text-center premium-hover">
                  <FaCrown className="text-3xl text-amber-600 mx-auto mb-3 cigar-glow" />
                  <h5 className="font-bold text-amber-800">Tư Vấn VIP</h5>
                  <p className="text-amber-600 text-sm">Dịch vụ cao cấp</p>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="premium-card-entrance animation-delay-800">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-200 premium-hover">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3742.969286!2d106.3178!3d20.9385!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjDCsDU2JzE4LjYiTiAxMDbCsDE5JzA0LjEiRQ!5e0!3m2!1svi!2s!4v1634567890123!5m2!1svi!2s"
                  width="100%"
                  height="500"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="BH Luxury Cigar Location"
                  className="hover:grayscale-0 grayscale transition-all duration-500"
                ></iframe>

                {/* Map Overlay */}
                <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                    <span className="font-bold text-gray-900">
                      BH Luxury Cigar
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
