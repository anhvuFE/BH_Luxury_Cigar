import React from "react";
import {
  HiOutlinePhone,
  HiOutlineLocationMarker,
  HiOutlineHeart,
  HiOutlineCheck,
  HiOutlineBookOpen,
  HiChevronRight,
} from "react-icons/hi";

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-amber-50/20 to-white">
      {/* Banner Section */}
      <section className="relative w-full overflow-hidden">
        <img
          src="/src/assets/images/banner4.png"
          alt="BH Luxury Cigar About Banner"
          className="w-full h-auto object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent flex items-end justify-center pb-32 sm:pb-36 lg:pb-40">
          <div className="text-center text-white">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light mb-4">
              Về <span className="font-bold">Chúng Tôi</span>
            </h1>
            <p className="text-lg sm:text-xl opacity-90 max-w-2xl">
              Câu chuyện về niềm đam mê và sự tận tâm
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <div className="inline-block mb-6">
            <span className="text-amber-600 font-medium text-sm tracking-widest uppercase">
              Câu chuyện thương hiệu
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light text-gray-900 mb-8 font-heading">
            BH <span className="font-bold text-amber-600">Luxury Cigar</span>
          </h2>
          <p className="text-xl sm:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-body">
            Chúng tôi là điểm đến uy tín cho những người yêu thích xì gà cao cấp
            tại Hải Dương, mang đến những sản phẩm chất lượng nhất từ khắp nơi
            trên thế giới.
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
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Giá Trị Cốt Lõi
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <HiOutlineCheck className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Chất Lượng
              </h3>
              <p className="text-gray-600">
                Chúng tôi chỉ cung cấp những sản phẩm chính hãng, được nhập khẩu
                từ những nhà sản xuất uy tín nhất thế giới.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <HiOutlineBookOpen className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Kiến Thức
              </h3>
              <p className="text-gray-600">
                Đội ngũ của chúng tôi có kiến thức sâu rộng về xì gà, sẵn sàng
                tư vấn và chia sẻ với khách hàng.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <HiOutlineHeart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Đam Mê</h3>
              <p className="text-gray-600">
                Niềm đam mê với xì gà thúc đẩy chúng tôi không ngừng tìm kiếm và
                mang về những sản phẩm tốt nhất.
              </p>
            </div>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="text-center bg-gray-50 rounded-xl p-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ghé Thăm Cửa Hàng
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Hãy đến trực tiếp cửa hàng để trải nghiệm không gian sang trọng và
            nhận được tư vấn chuyên nghiệp từ đội ngũ của chúng tôi.
          </p>
          <div className="space-y-2 text-gray-700 mb-8">
            <p className="font-semibold flex items-center justify-center">
              <HiOutlineLocationMarker className="w-5 h-5 text-amber-600 mr-2" />
              138 Bình Hàn, TP Hải Dương
            </p>
            <p className="font-semibold flex items-center justify-center">
              <HiOutlinePhone className="w-5 h-5 text-amber-600 mr-2" />
              0975224557
            </p>
          </div>
          <a
            href="/contact"
            className="inline-flex items-center bg-gradient-to-r from-amber-500 to-amber-600 text-white px-8 py-3 rounded-xl hover:from-amber-600 hover:to-amber-700 transition-all duration-500 font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Liên Hệ Ngay
            <HiChevronRight className="ml-2 w-5 h-5" />
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
