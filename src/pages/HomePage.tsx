import { Link } from "react-router-dom";
import {
  FaWineGlass,
  FaFire,
  FaCrown,
  FaStar,
  FaShieldAlt,
  FaMapMarkerAlt,
  FaPhone,
  FaPalette,
  FaQuoteLeft,
} from "react-icons/fa";
import {
  GiCigar,
  GiBottleVapors,
  GiWineBottle,
  GiTreasureMap,
  GiCrossedSwords,
} from "react-icons/gi";
import Products from "../components/sections/Products";

const HomePage = () => (
  <div>
    {/* Hero Section - Banner 1 */}
    <section className="w-full">
      <img
        src="/src/assets/images/banner1.png"
        alt="BH Luxury Cigar Hero Banner"
        className="w-full h-auto object-cover"
      />
    </section>

    {/* Categories Grid - Natural Layout */}
    <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-gray-900 mb-6">
            Danh Mục <span className="font-bold text-amber-600">Sản Phẩm</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Tìm hiểu các bộ sưu tập đặc biệt được tuyển chọn từ những thương hiệu hàng đầu thế giới
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {[
            {
              title: "PHU KIỆN XÌ GÀ",
              image: "/src/assets/images/pro1.png",
            },
            {
              title: "SINGLE MALTS",
              image: "/src/assets/images/pro2.png",
            },
            {
              title: "BLENDED SCOTCH",
              image: "/src/assets/images/pro3.png",
            },
            {
              title: "RƯỢU MẠNH",
              image: "/src/assets/images/pro4.png",
            },
            {
              title: "RƯỢU VANG",
              image: "/src/assets/images/pro5.png",
            },
            {
              title: "HAMPER TẾT COLLECTION",
              image: "/src/assets/images/pro6.png",
            },
          ].map((category, index) => {
            return (
              <div
                key={index}
                className="group relative h-72 sm:h-80 lg:h-96 rounded-3xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500"
              >
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent group-hover:from-black/60 transition-all duration-500"></div>

                {/* Category Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8">
                  <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="text-white text-xl sm:text-2xl lg:text-3xl font-light mb-3 leading-tight">
                      {category.title}
                    </h3>
                    <div className="w-16 h-1 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full mb-4 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 delay-100"></div>
                    <button className="text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200 flex items-center">
                      Khám phá ngay
                      <svg className="ml-2 w-4 h-4 transform translate-x-0 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>

    {/* Products Section - Firebase + Static Products */}
    <Products />


    {/* PHU KIỆN XÌ GÀ Section */}
    <section className="py-12 sm:py-16 lg:py-20 bg-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-6 sm:mb-8">
            PHU KIỆN XÌ GÀ
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
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
                className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 group text-center"
              >
                <div className="relative">
                  <div className="w-full h-40 sm:h-44 lg:h-48 bg-gray-50 flex items-center justify-center p-3 sm:p-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                </div>
                <div className="p-3 sm:p-4">
                  <h3 className="font-semibold text-gray-900 mb-2 text-xs sm:text-sm leading-tight min-h-[2.5rem] line-clamp-2">
                    {item.name}
                  </h3>
                  <div className="text-xs sm:text-sm text-amber-600 font-medium mb-2">
                    {item.brand}
                  </div>
                  <div className="text-base sm:text-lg font-bold text-amber-600 mb-2">
                    {item.price}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-8 sm:mt-12">
          <button className="bg-amber-600 text-white px-6 py-3 sm:px-8 rounded-md hover:bg-amber-700 transition-colors font-semibold text-sm sm:text-base">
            XEM TẤT CẢ
          </button>
        </div>
      </div>
    </section>

    {/* Banner 2 Section */}
    <section className="w-full">
      <img
        src="/src/assets/images/banner2.png"
        alt="ATELIER HAUTE CREATION Banner"
        className="w-full h-auto object-cover"
      />
    </section>

    {/* Testimonial Section */}
    <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-6 sm:mb-8">
            Đánh Giá Của Khách Hàng
          </h2>
        </div>

        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md">
            <FaQuoteLeft className="text-3xl sm:text-4xl text-amber-500 mx-auto mb-4 sm:mb-6" />
            <p className="text-base sm:text-lg text-gray-700 mb-4 sm:mb-6 leading-relaxed">
              "Chuyên gia chính thức đầu tiên ở Việt Nam hoạt động bởi Golden
              Phoenix và Avanti, một nhà phân phối chính của The Pacific Cigar
              và Habanos S.A. ở Việt Nam.
            </p>
            <p className="text-base sm:text-lg text-gray-700 mb-4 sm:mb-6">
              Habanos Specialist có nhiều Xì gà Cuba hoàn hảo được ủy lưu từ
              24/7 chuyên nghiệp, để đảm bảo các điều kiện tối ưu chính xác cho
              người yêu thích hút xì gà."
            </p>
            <div className="text-amber-600 font-bold text-lg sm:text-xl">- Mr Joel -</div>
          </div>
        </div>

        {/* Blog Images with Text Overlay */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mt-8 sm:mt-12 max-w-4xl mx-auto">
          <div className="relative rounded-lg overflow-hidden">
            <img
              src="/src/assets/images/BV/1.png"
              alt="Gạt Tàn Xì Gà Cuba"
              className="w-full h-auto object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-center p-8">
              <h3 className="text-white text-xl font-bold mb-4">
                GẠT TÀN XÌ GÀ CUBA: MÔN ĐỒ SƯU TẦM ĐẮT LỊCH SỬ VÀ ĐẲNG CẤP TRẦM MỸ
              </h3>
              <button className="bg-amber-600 text-black px-6 py-2 rounded font-semibold hover:bg-amber-500 transition-colors">
                Xem thêm
              </button>
            </div>
          </div>
          <div className="relative rounded-lg overflow-hidden">
            <img
              src="/src/assets/images/BV/2.png"
              alt="Review Phụ Kiện Xì Gà"
              className="w-full h-auto object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-center p-8">
              <h3 className="text-white text-xl font-bold mb-4">
                REVIEW PHU KIỆN XÌ GÀ: CUTTER, BẬT LỬA VÀ HUMIDOR
              </h3>
              <button className="bg-amber-600 text-black px-6 py-2 rounded font-semibold hover:bg-amber-500 transition-colors">
                Xem thêm
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Brand Logos Section */}
    <section className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-6 sm:mb-8">Nhãn Hiệu</h2>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-8 lg:gap-12 opacity-60">
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
                className="text-center hover:text-amber-600 transition-colors cursor-pointer group"
              >
                <IconComponent className="text-2xl sm:text-3xl text-gray-400 group-hover:text-amber-600 mx-auto mb-2" />
                <span className="text-xs sm:text-sm text-gray-400 group-hover:text-amber-600">
                  {brand.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>

    {/* Whisky Bottles Showcase */}
    <section className="w-full">
      <img
        src="/src/assets/images/banner3.png"
        alt="Whisky Collection Banner"
        className="w-full h-auto object-cover"
      />
    </section>

    {/* Map Section */}
    <section className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6 sm:mb-8">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-700 mb-2">
            BH Luxury Cigar
          </h3>
          <p className="text-sm sm:text-base text-gray-600">138 Bình Hàn, TP Hải Dương</p>
          <p className="text-sm sm:text-base text-gray-600 flex items-center justify-center mt-2">
            <FaPhone className="mr-2" />
            0975224557
          </p>
        </div>
        <div className="rounded-lg overflow-hidden shadow-lg">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3742.969286!2d106.3178!3d20.9385!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjDCsDU2JzE4LjYiTiAxMDbCsDE5JzA0LjEiRQ!5e0!3m2!1svi!2s!4v1634567890123!5m2!1svi!2s"
            width="100%"
            height="300"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="BH Luxury Cigar Location"
            className="sm:h-96 lg:h-[400px]"
          ></iframe>
        </div>
      </div>
    </section>
  </div>
);

export default HomePage;
