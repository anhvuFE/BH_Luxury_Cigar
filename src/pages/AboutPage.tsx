import React from "react";
import {
  HiOutlinePhone,
  HiOutlineLocationMarker,
  HiOutlineHeart,
  HiOutlineCheck,
  HiOutlineBookOpen,
  HiChevronRight,
} from "../components/ui/OptimizedIcons";

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Banner Section */}
      <section className="relative h-[60vh] sm:h-[70vh] overflow-hidden bg-gradient-to-b from-gray-900 to-gray-800">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1519802772250-a52a9af0eacb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            alt="Premium Cigars Collection"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent"></div>
        </div>

        {/* Content */}
        <div className="relative h-full flex flex-col items-center justify-center text-center px-4">
          <div className="mb-6 animate-fade-in-up">
            <span className="text-amber-500 text-sm font-medium tracking-[0.3em] uppercase">Về Chúng Tôi</span>
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 animate-fade-in-up animation-delay-200">
            BH Luxury Cigar
          </h1>
          <p className="text-xl sm:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed animate-fade-in-up animation-delay-400">
            Hơn 10 năm kinh nghiệm trong ngành xì gà cao cấp
          </p>
          <div className="flex items-center space-x-2 mt-8 animate-fade-in-up animation-delay-600">
            <div className="w-20 h-[2px] bg-amber-500"></div>
            <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
            <div className="w-20 h-[2px] bg-amber-500"></div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        {/* Introduction Section */}
        <div className="max-w-4xl mx-auto text-center py-20">
          <div className="mb-8">
            <span className="inline-block px-6 py-2 bg-amber-100 text-amber-700 rounded-full text-sm font-medium tracking-wider uppercase">
              Câu Chuyện Thương Hiệu
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-8">
            BH <span className="text-amber-600">Luxury Cigar</span>
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            Chúng tôi là điểm đến uy tín cho những người yêu thích xì gà cao cấp tại Hải Dương,
            mang đến những sản phẩm chất lượng nhất từ khắp nơi trên thế giới.
          </p>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20">
          <div className="relative">
            <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 rounded-3xl p-8 lg:p-10">
              <h3 className="text-3xl sm:text-4xl font-light text-gray-900 mb-8 font-heading">
                Câu Chuyện{" "}
                <span className="font-bold text-amber-600">Của Chúng Tôi</span>
              </h3>
              <div className="space-y-6 text-gray-700 leading-relaxed text-lg font-body">
                <p>
                  BH Luxury Cigar được thành lập với niềm đam mê mãnh liệt dành
                  cho nghệ thuật thưởng thức xì gà. Chúng tôi hiểu rằng mỗi điếu
                  xì gà không chỉ là một sản phẩm, mà là một tác phẩm nghệ thuật
                  được tạo ra từ sự tỉ mỉ và kinh nghiệm của những nghệ nhân tài
                  ba.
                </p>
                <p>
                  Với nhiều năm kinh nghiệm trong ngành, chúng tôi tự hào là nơi
                  cung cấp những điếu xì gà chính hãng, chất lượng cao từ các
                  thương hiệu nổi tiếng nhất thế giới như Cohiba, Montecristo,
                  Davidoff, và nhiều thương hiệu khác.
                </p>
                <p>
                  Sứ mệnh của chúng tôi là mang đến cho khách hàng những trải
                  nghiệm tuyệt vời nhất, từ việc lựa chọn sản phẩm đến dịch vụ
                  tư vấn chuyên nghiệp.
                </p>
              </div>
            </div>
          </div>
          <div className="relative group">
            <img
              src="https://images.unsplash.com/photo-1617128734662-66da6c1d3505?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
              alt="Premium Cigar Selection"
              className="w-full h-[500px] object-cover rounded-3xl shadow-2xl"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/images/xu-huong-cigar.webp';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>
        </div>

        {/* Values Section - Enhanced Design */}
        <div className="py-20 bg-gradient-to-b from-white to-amber-50/30">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Giá Trị Cốt Lõi
            </h2>
            <div className="w-24 h-1 bg-amber-500 mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-6 transform hover:rotate-6 transition-transform duration-300">
                <HiOutlineCheck className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                Chất Lượng
              </h3>
              <p className="text-gray-600 text-center leading-relaxed">
                Chúng tôi chỉ cung cấp những sản phẩm chính hãng, được nhập khẩu
                từ những nhà sản xuất uy tín nhất thế giới.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-6 transform hover:rotate-6 transition-transform duration-300">
                <HiOutlineBookOpen className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                Kiến Thức
              </h3>
              <p className="text-gray-600 text-center leading-relaxed">
                Đội ngũ của chúng tôi có kiến thức sâu rộng về xì gà, sẵn sàng
                tư vấn và chia sẻ với khách hàng.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-6 transform hover:rotate-6 transition-transform duration-300">
                <HiOutlineHeart className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">Đam Mê</h3>
              <p className="text-gray-600 text-center leading-relaxed">
                Niềm đam mê với xì gà thúc đẩy chúng tôi không ngừng tìm kiếm và
                mang về những sản phẩm tốt nhất.
              </p>
            </div>
          </div>
        </div>

        {/* Contact CTA - Premium Design */}
        <div className="relative overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-16">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-600 rounded-full blur-3xl"></div>
          </div>

          <div className="relative text-center">
            <h2 className="text-4xl font-bold text-white mb-6">
              Ghé Thăm Cửa Hàng
            </h2>
            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
              Hãy đến trực tiếp cửa hàng để trải nghiệm không gian sang trọng và
              nhận được tư vấn chuyên nghiệp từ đội ngũ của chúng tôi.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 text-white mb-10">
              <div className="flex items-center">
                <HiOutlineLocationMarker className="w-6 h-6 text-amber-500 mr-3" />
                <span className="text-lg">138 Bình Hàn, TP Hải Dương</span>
              </div>
              <div className="flex items-center">
                <HiOutlinePhone className="w-6 h-6 text-amber-500 mr-3" />
                <span className="text-lg">0975224557</span>
              </div>
            </div>
            <a
              href="/contact"
              className="inline-flex items-center bg-gradient-to-r from-amber-500 to-amber-600 text-white px-8 py-4 rounded-full hover:from-amber-600 hover:to-amber-700 transition-all duration-300 font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105"
            >
              Liên Hệ Ngay
              <HiChevronRight className="ml-2 w-5 h-5" />
            </a>
          </div>
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
              <HiOutlinePhone className="mr-2" />
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
