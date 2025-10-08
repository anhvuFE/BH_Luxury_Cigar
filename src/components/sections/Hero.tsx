import React from 'react';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  return (
    <section className="relative bg-gradient-to-r from-dark-900 to-gray-800 text-white overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('/src/assets/images/placeholder.svg')`,
        }}
      ></div>

      {/* Content */}
      <div className="relative container mx-auto px-4 py-24 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold font-playfair leading-tight">
                <span className="text-primary-500">BH Luxury Cigar</span>
                <br />
                Nghệ Thuật Thưởng Thức
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mt-6 leading-relaxed">
                Khám phá thế giới xì gà cao cấp với những điếu xì gà chính hãng
                từ những thương hiệu nổi tiếng nhất thế giới.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/collections"
                className="inline-flex items-center justify-center bg-primary-500 text-white px-8 py-4 rounded-md hover:bg-primary-600 transition-colors font-semibold text-lg"
              >
                Xem Bộ Sưu Tập
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center justify-center border-2 border-white text-white px-8 py-4 rounded-md hover:bg-white hover:text-dark-900 transition-colors font-semibold text-lg"
              >
                Tìm Hiểu Thêm
              </Link>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold">Chính Hãng 100%</h3>
                  <p className="text-gray-300 text-sm">Đảm bảo chất lượng</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold">Tư Vấn Chuyên Nghiệp</h3>
                  <p className="text-gray-300 text-sm">Kinh nghiệm nhiều năm</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold">Tại Hải Dương</h3>
                  <p className="text-gray-300 text-sm">138 Bình Hàn</p>
                </div>
              </div>
            </div>
          </div>

          {/* Image/Video Section */}
          <div className="relative">
            <div className="relative bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl p-8 shadow-2xl">
              <img
                src="/src/assets/images/placeholder.svg"
                alt="Premium Cigars"
                className="w-full h-96 object-cover rounded-xl"
              />

              {/* Floating Cards */}
              <div className="absolute -top-6 -left-6 bg-white text-dark-900 p-4 rounded-xl shadow-lg">
                <div className="text-2xl font-bold text-primary-500">100+</div>
                <div className="text-sm font-medium">Sản phẩm cao cấp</div>
              </div>

              <div className="absolute -bottom-6 -right-6 bg-white text-dark-900 p-4 rounded-xl shadow-lg">
                <div className="text-2xl font-bold text-primary-500">5+</div>
                <div className="text-sm font-medium">Năm kinh nghiệm</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
};

export default Hero;