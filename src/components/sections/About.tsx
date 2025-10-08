import React from 'react';
import { Link } from 'react-router-dom';

const About: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 font-playfair">
                Về BH Luxury Cigar
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                Chúng tôi là điểm đến uy tín cho những người yêu thích xì gà cao cấp tại Hải Dương.
                Với niềm đam mê mãnh liệt dành cho nghệ thuật thưởng thức xì gà, chúng tôi mang đến
                những sản phẩm chất lượng nhất từ khắp nơi trên thế giới.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Sứ mệnh của chúng tôi là chia sẻ niềm đam mê với xì gà và cung cấp những trải nghiệm
                tuyệt vời nhất cho khách hàng thông qua dịch vụ tư vấn chuyên nghiệp và sản phẩm
                chính hãng.
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Chính Hãng 100%</h3>
                  <p className="text-gray-600 text-sm">Đảm bảo chất lượng từ nhà sản xuất</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Kiến Thức Chuyên Sâu</h3>
                  <p className="text-gray-600 text-sm">Tư vấn từ những chuyên gia có kinh nghiệm</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Đam Mê Chân Thật</h3>
                  <p className="text-gray-600 text-sm">Chia sẻ niềm đam mê với xì gà cao cấp</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Vị Trí Thuận Lợi</h3>
                  <p className="text-gray-600 text-sm">Tại trung tâm thành phố Hải Dương</p>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <Link
                to="/about"
                className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
              >
                Tìm hiểu thêm về chúng tôi
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Images */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <img
                  src="/src/assets/images/about1.jpg"
                  alt="BH Luxury Cigar Store"
                  className="w-full h-48 object-cover rounded-lg shadow-lg"
                />
                <img
                  src="/src/assets/images/about2.jpg"
                  alt="Cigar Collection"
                  className="w-full h-32 object-cover rounded-lg shadow-lg"
                />
              </div>
              <div className="space-y-4 pt-8">
                <img
                  src="/src/assets/images/about3.jpg"
                  alt="Premium Cigars"
                  className="w-full h-32 object-cover rounded-lg shadow-lg"
                />
                <img
                  src="/src/assets/images/about4.jpg"
                  alt="Cigar Expert"
                  className="w-full h-48 object-cover rounded-lg shadow-lg"
                />
              </div>
            </div>

            {/* Floating Card */}
            <div className="absolute -bottom-6 -left-6 bg-primary-500 text-white p-6 rounded-xl shadow-xl">
              <div className="text-2xl font-bold">5+</div>
              <div className="text-sm">Năm Kinh Nghiệm</div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 font-playfair">
              Giá Trị Cốt Lõi
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Những giá trị mà chúng tôi luôn kiên trì và duy trì trong suốt quá trình phục vụ khách hàng.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">Chất Lượng</h4>
              <p className="text-gray-600">
                Cam kết cung cấp những sản phẩm chính hãng, chất lượng cao nhất
                từ các thương hiệu uy tín nhất thế giới.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">Kiến Thức</h4>
              <p className="text-gray-600">
                Đội ngũ chuyên gia với kiến thức sâu rộng về xì gà, sẵn sàng
                tư vấn và chia sẻ với khách hàng.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">Đam Mê</h4>
              <p className="text-gray-600">
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