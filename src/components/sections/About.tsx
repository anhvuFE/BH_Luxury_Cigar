import React from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineCheck, HiOutlineBookOpen, HiOutlineHeart, HiOutlineLocationMarker, HiChevronRight } from 'react-icons/hi';

const About: React.FC = () => {
  return (
    <section className="pt-24 pb-12 sm:pt-28 sm:pb-16 lg:pt-32 lg:pb-20 bg-gradient-to-br from-amber-50/30 via-white to-amber-50/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Content */}
          <div className="space-y-6 text-center lg:text-left">
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6 font-heading relative">
                <span className="relative">
                  Về <span className="text-amber-600 relative">
                    <span className="absolute inset-0 bg-amber-200/30 -skew-x-12 rounded-lg"></span>
                    <span className="relative">BH Luxury Cigar</span>
                  </span>
                </span>
              </h2>
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed mb-4 sm:mb-6 font-body">
                Chúng tôi là điểm đến uy tín cho những người yêu thích xì gà cao cấp tại Hải Dương.
                Với niềm đam mê mãnh liệt dành cho nghệ thuật thưởng thức xì gà, chúng tôi mang đến
                những sản phẩm chất lượng nhất từ khắp nơi trên thế giới.
              </p>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-body">
                Sứ mệnh của chúng tôi là chia sẻ niềm đam mê với xì gà và cung cấp những trải nghiệm
                tuyệt vời nhất cho khách hàng thông qua dịch vụ tư vấn chuyên nghiệp và sản phẩm
                chính hãng.
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="group flex items-start space-x-3 sm:space-x-4 justify-center lg:justify-start hover:scale-105 transition-transform duration-300">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-amber-400 to-amber-500 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:shadow-amber-400/50">
                  <HiOutlineCheck className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div className="text-center lg:text-left">
                  <h3 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">Chính Hãng 100%</h3>
                  <p className="text-gray-600 text-xs sm:text-sm">Đảm bảo chất lượng từ nhà sản xuất</p>
                </div>
              </div>

              <div className="group flex items-start space-x-3 sm:space-x-4 justify-center lg:justify-start hover:scale-105 transition-transform duration-300">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-amber-400 to-amber-500 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:shadow-amber-400/50">
                  <HiOutlineBookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div className="text-center lg:text-left">
                  <h3 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">Kiến Thức Chuyên Sâu</h3>
                  <p className="text-gray-600 text-xs sm:text-sm">Tư vấn từ những chuyên gia có kinh nghiệm</p>
                </div>
              </div>

              <div className="group flex items-start space-x-3 sm:space-x-4 justify-center lg:justify-start hover:scale-105 transition-transform duration-300">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-amber-400 to-amber-500 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:shadow-amber-400/50">
                  <HiOutlineHeart className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div className="text-center lg:text-left">
                  <h3 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">Đam Mê Chân Thật</h3>
                  <p className="text-gray-600 text-xs sm:text-sm">Chia sẻ niềm đam mê với xì gà cao cấp</p>
                </div>
              </div>

              <div className="group flex items-start space-x-3 sm:space-x-4 justify-center lg:justify-start sm:col-span-2 lg:col-span-1 hover:scale-105 transition-transform duration-300">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-amber-400 to-amber-500 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:shadow-amber-400/50">
                  <HiOutlineLocationMarker className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div className="text-center lg:text-left">
                  <h3 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">Vị Trí Thuận Lợi</h3>
                  <p className="text-gray-600 text-xs sm:text-sm">Tại trung tâm thành phố Hải Dương</p>
                </div>
              </div>
            </div>

            <div className="pt-4 sm:pt-6 text-center lg:text-left">
              <Link
                to="/about"
                className="group inline-flex items-center text-amber-600 hover:text-amber-700 font-medium text-sm sm:text-base bg-amber-50 hover:bg-amber-100 px-4 py-2 rounded-xl transition-all duration-300 hover:scale-105 shadow-sm hover:shadow-lg"
              >
                Tìm hiểu thêm về chúng tôi
                <HiChevronRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>
          </div>

          {/* Images */}
          <div className="relative mt-8 lg:mt-0 order-first lg:order-last">
            <div className="grid grid-cols-2 gap-2 sm:gap-4">
              <div className="space-y-2 sm:space-y-4">
                <img
                  src="/images/about1.jpg"
                  alt="BH Luxury Cigar Store"
                  className="w-full h-32 sm:h-40 lg:h-48 object-cover rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105"
                />
                <img
                  src="/images/about2.jpg"
                  alt="Cigar Collection"
                  className="w-full h-24 sm:h-28 lg:h-32 object-cover rounded-lg shadow-lg"
                />
              </div>
              <div className="space-y-2 sm:space-y-4 pt-4 sm:pt-6 lg:pt-8">
                <img
                  src="/images/about3.jpg"
                  alt="Premium Cigars"
                  className="w-full h-24 sm:h-28 lg:h-32 object-cover rounded-lg shadow-lg"
                />
                <img
                  src="/images/about4.jpg"
                  alt="Cigar Expert"
                  className="w-full h-32 sm:h-40 lg:h-48 object-cover rounded-lg shadow-lg"
                />
              </div>
            </div>

            {/* Floating Card */}
            <div className="absolute -bottom-3 -left-3 sm:-bottom-4 sm:-left-4 lg:-bottom-6 lg:-left-6 bg-gradient-to-br from-amber-500 to-amber-600 text-white p-3 sm:p-4 lg:p-6 rounded-2xl shadow-2xl hover:scale-110 transition-transform duration-300 border border-amber-400">
              <div className="text-lg sm:text-xl lg:text-2xl font-bold">5+</div>
              <div className="text-xs sm:text-sm">Năm Kinh Nghiệm</div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mt-12 sm:mt-16 lg:mt-20">
          <div className="text-center mb-8 sm:mb-12">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-3 sm:mb-4 font-heading">
              Giá Trị Cốt Lõi
            </h3>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto px-4">
              Những giá trị mà chúng tôi luôn kiên trì và duy trì trong suốt quá trình phục vụ khách hàng.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            <div className="group text-center hover:scale-105 transition-transform duration-300">
              <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-lg group-hover:shadow-amber-500/50">
                <HiOutlineCheck className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" />
              </div>
              <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">Chất Lượng</h4>
              <p className="text-sm sm:text-base text-gray-600">
                Cam kết cung cấp những sản phẩm chính hãng, chất lượng cao nhất
                từ các thương hiệu uy tín nhất thế giới.
              </p>
            </div>

            <div className="group text-center hover:scale-105 transition-transform duration-300">
              <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-lg group-hover:shadow-amber-500/50">
                <HiOutlineBookOpen className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" />
              </div>
              <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">Kiến Thức</h4>
              <p className="text-sm sm:text-base text-gray-600">
                Đội ngũ chuyên gia với kiến thức sâu rộng về xì gà, sẵn sàng
                tư vấn và chia sẻ với khách hàng.
              </p>
            </div>

            <div className="group text-center sm:col-span-2 lg:col-span-1 hover:scale-105 transition-transform duration-300">
              <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-lg group-hover:shadow-amber-500/50">
                <HiOutlineHeart className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" />
              </div>
              <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">Đam Mê</h4>
              <p className="text-sm sm:text-base text-gray-600">
                Niềm đam mê chân thật với xì gà thúc đẩy chúng tôi không ngừng
                tìm kiếm và mang về những sản phẩm tốt nhất.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;