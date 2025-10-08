import React from 'react';
import { FaPhone } from 'react-icons/fa';

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Banner Section */}
      <section className="w-full">
        <img
          src="/src/assets/images/banner4.png"
          alt="BH Luxury Cigar About Banner"
          className="w-full h-auto object-cover"
        />
      </section>

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Về BH Luxury Cigar
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Chúng tôi là điểm đến uy tín cho những người yêu thích xì gà cao cấp tại Hải Dương,
            mang đến những sản phẩm chất lượng nhất từ khắp nơi trên thế giới.
          </p>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Câu Chuyện Của Chúng Tôi</h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                BH Luxury Cigar được thành lập với niềm đam mê mãnh liệt dành cho nghệ thuật
                thưởng thức xì gà. Chúng tôi hiểu rằng mỗi điếu xì gà không chỉ là một sản phẩm,
                mà là một tác phẩm nghệ thuật được tạo ra từ sự tỉ mỉ và kinh nghiệm của những
                nghệ nhân tài ba.
              </p>
              <p>
                Với nhiều năm kinh nghiệm trong ngành, chúng tôi tự hào là nơi cung cấp những
                điếu xì gà chính hãng, chất lượng cao từ các thương hiệu nổi tiếng nhất thế giới
                như Cohiba, Montecristo, Davidoff, và nhiều thương hiệu khác.
              </p>
              <p>
                Sứ mệnh của chúng tôi là mang đến cho khách hàng những trải nghiệm tuyệt vời nhất,
                từ việc lựa chọn sản phẩm đến dịch vụ tư vấn chuyên nghiệp.
              </p>
            </div>
          </div>
          <div>
            <img
              src="/src/assets/images/banner5.png"
              alt="BH Luxury Cigar Story"
              className="w-full h-96 object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Giá Trị Cốt Lõi</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Chất Lượng</h3>
              <p className="text-gray-600">
                Chúng tôi chỉ cung cấp những sản phẩm chính hãng, được nhập khẩu từ những
                nhà sản xuất uy tín nhất thế giới.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Kiến Thức</h3>
              <p className="text-gray-600">
                Đội ngũ của chúng tôi có kiến thức sâu rộng về xì gà, sẵn sàng tư vấn
                và chia sẻ với khách hàng.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Đam Mê</h3>
              <p className="text-gray-600">
                Niềm đam mê với xì gà thúc đẩy chúng tôi không ngừng tìm kiếm và mang về
                những sản phẩm tốt nhất.
              </p>
            </div>
          </div>
        </div>


        {/* Contact CTA */}
        <div className="text-center bg-gray-50 rounded-xl p-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ghé Thăm Cửa Hàng</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Hãy đến trực tiếp cửa hàng để trải nghiệm không gian sang trọng và nhận được
            tư vấn chuyên nghiệp từ đội ngũ của chúng tôi.
          </p>
          <div className="space-y-2 text-gray-700 mb-8">
            <p className="font-semibold">📍 138 Bình Hàn, TP Hải Dương</p>
            <p className="font-semibold">📞 0975224557</p>
          </div>
          <a
            href="/contact"
            className="inline-flex items-center bg-primary-500 text-white px-8 py-3 rounded-md hover:bg-primary-600 transition-colors font-medium"
          >
            Liên Hệ Ngay
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>

      {/* Map Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-700 mb-2">
              BH Luxury Cigar
            </h3>
            <p className="text-gray-600">138 Bình Hàn, TP Hải Dương</p>
            <p className="text-gray-600 flex items-center justify-center mt-2">
              <FaPhone className="mr-2" />
              0975224557
            </p>
          </div>
          <div className="rounded-lg overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3742.969286!2d106.3178!3d20.9385!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjDCsDU2JzE4LjYiTiAxMDbCsDE5JzA0LjEiRQ!5e0!3m2!1svi!2s!4v1634567890123!5m2!1svi!2s"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="BH Luxury Cigar Location"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;