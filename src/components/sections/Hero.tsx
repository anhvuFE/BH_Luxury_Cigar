import React from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineCheck, HiOutlineBookOpen, HiOutlineLocationMarker, HiChevronRight, HiChevronDown } from 'react-icons/hi';

const Hero: React.FC = () => {
  return (
    <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-amber-900 text-white overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-amber-900/30"></div>
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('/images/placeholder.png')`,
        }}
      ></div>
      {/* Floating particles */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-2 h-2 bg-amber-400 rounded-full animate-pulse opacity-60"></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-amber-300 rounded-full animate-bounce opacity-40"></div>
        <div className="absolute bottom-32 left-20 w-3 h-3 bg-amber-500 rounded-full animate-pulse opacity-30"></div>
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="space-y-6 sm:space-y-8 text-center lg:text-left">
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-br from-amber-500/20 to-amber-600/20 rounded-full blur-2xl"></div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-heading leading-tight relative z-10">
                <span className="text-amber-400 relative">
                  <span className="absolute inset-0 bg-gradient-to-r from-amber-500/30 to-amber-400/30 blur-lg rounded-lg"></span>
                  <span className="relative">BH Luxury Cigar</span>
                </span>
                <br />
                <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl bg-gradient-to-r from-white to-amber-100 bg-clip-text text-transparent font-luxury">
                  Nghệ Thuật Thưởng Thức
                </span>
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-amber-100 mt-4 sm:mt-6 leading-relaxed relative z-10 font-body">
                Khám phá thế giới xì gà cao cấp với những điếu xì gà chính hãng
                từ những thương hiệu nổi tiếng nhất thế giới.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
              <Link
                to="/collections"
                className="group inline-flex items-center justify-center bg-gradient-to-r from-amber-500 to-amber-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-2xl hover:from-amber-600 hover:to-amber-700 transition-all duration-500 font-semibold text-base sm:text-lg shadow-2xl hover:shadow-amber-500/25 transform hover:scale-105 relative overflow-hidden"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                <span className="relative z-10">Xem Bộ Sưu Tập</span>
                <HiChevronRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
              <Link
                to="/about"
                className="group inline-flex items-center justify-center border-2 border-amber-300 bg-white/10 backdrop-blur-sm text-white px-6 sm:px-8 py-3 sm:py-4 rounded-2xl hover:bg-white hover:text-gray-900 transition-all duration-500 font-semibold text-base sm:text-lg shadow-lg hover:shadow-2xl transform hover:scale-105"
              >
                <span className="group-hover:text-gray-900 transition-colors duration-300">Tìm Hiểu Thêm</span>
              </Link>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-8 sm:mt-12">
              <div className="group flex items-center space-x-3 justify-center lg:justify-start hover:scale-105 transition-transform duration-300">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg group-hover:shadow-amber-500/50">
                  <HiOutlineCheck className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div className="text-center lg:text-left">
                  <h3 className="font-semibold text-sm sm:text-base text-amber-100">Chính Hãng 100%</h3>
                  <p className="text-amber-200/80 text-xs sm:text-sm">Đảm bảo chất lượng</p>
                </div>
              </div>

              <div className="group flex items-center space-x-3 justify-center lg:justify-start hover:scale-105 transition-transform duration-300">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg group-hover:shadow-amber-500/50">
                  <HiOutlineBookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div className="text-center lg:text-left">
                  <h3 className="font-semibold text-sm sm:text-base text-amber-100">Tư Vấn Chuyên Nghiệp</h3>
                  <p className="text-amber-200/80 text-xs sm:text-sm">Kinh nghiệm nhiều năm</p>
                </div>
              </div>

              <div className="group flex items-center space-x-3 justify-center lg:justify-start sm:col-span-2 lg:col-span-1 hover:scale-105 transition-transform duration-300">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg group-hover:shadow-amber-500/50">
                  <HiOutlineLocationMarker className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div className="text-center lg:text-left">
                  <h3 className="font-semibold text-sm sm:text-base text-amber-100">Tại Hải Dương</h3>
                  <p className="text-amber-200/80 text-xs sm:text-sm">138 Bình Hàn</p>
                </div>
              </div>
            </div>
          </div>

          {/* Image/Video Section */}
          <div className="relative mt-8 lg:mt-0 order-first lg:order-last">
            <div className="relative bg-gradient-to-br from-amber-500 to-amber-600 rounded-3xl p-4 sm:p-6 lg:p-8 shadow-2xl hover:shadow-amber-500/30 transition-all duration-500 group">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-400/20 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <img
                src="/images/placeholder.png"
                alt="Premium Cigars"
                className="relative z-10 w-full h-64 sm:h-80 lg:h-96 object-cover rounded-2xl shadow-lg group-hover:scale-105 transition-transform duration-700"
              />

              {/* Floating Cards */}
              <div className="absolute -top-3 -left-3 sm:-top-4 sm:-left-4 lg:-top-6 lg:-left-6 bg-white/95 backdrop-blur-sm text-gray-900 p-2 sm:p-3 lg:p-4 rounded-2xl shadow-2xl border border-amber-100 hover:scale-110 transition-transform duration-300 z-20">
                <div className="text-lg sm:text-xl lg:text-2xl font-bold bg-gradient-to-r from-amber-500 to-amber-600 bg-clip-text text-transparent">100+</div>
                <div className="text-xs sm:text-sm font-medium text-gray-700">Sản phẩm cao cấp</div>
              </div>

              <div className="absolute -bottom-3 -right-3 sm:-bottom-4 sm:-right-4 lg:-bottom-6 lg:-right-6 bg-white/95 backdrop-blur-sm text-gray-900 p-2 sm:p-3 lg:p-4 rounded-2xl shadow-2xl border border-amber-100 hover:scale-110 transition-transform duration-300 z-20">
                <div className="text-lg sm:text-xl lg:text-2xl font-bold bg-gradient-to-r from-amber-500 to-amber-600 bg-clip-text text-transparent">5+</div>
                <div className="text-xs sm:text-sm font-medium text-gray-700">Năm kinh nghiệm</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-4 sm:bottom-6 lg:bottom-8 left-1/2 transform -translate-x-1/2 text-amber-300 animate-bounce group cursor-pointer">
        <div className="p-2 rounded-full bg-white/10 backdrop-blur-sm border border-amber-300/30 group-hover:bg-amber-500 group-hover:text-white transition-all duration-300">
          <HiChevronDown className="w-5 h-5 sm:w-6 sm:h-6" />
        </div>
      </div>
    </section>
  );
};

export default Hero;