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

    {/* Categories Grid - Using Product Images */}
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                className="relative h-80 rounded-lg overflow-hidden group cursor-pointer"
              >
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-20 transition-all duration-300"></div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/50 to-transparent p-6">
                  <h3 className="text-white text-2xl font-bold text-center tracking-wide">
                    {category.title}
                  </h3>
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
    <section className="py-16 bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-8">
            PHU KIỆN XÌ GÀ
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
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
                  <div className="w-full h-48 bg-gray-50 flex items-center justify-center p-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2 text-sm leading-tight min-h-[2.5rem]">
                    {item.name}
                  </h3>
                  <div className="text-sm text-amber-600 font-medium mb-2">
                    {item.brand}
                  </div>
                  <div className="text-lg font-bold text-amber-600 mb-2">
                    {item.price}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <button className="bg-amber-600 text-white px-8 py-3 rounded-md hover:bg-amber-700 transition-colors font-semibold">
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
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-8">
            Đánh Giá Của Khách Hàng
          </h2>
        </div>

        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <FaQuoteLeft className="text-4xl text-amber-500 mx-auto mb-6" />
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              "Chuyên gia chính thức đầu tiên ở Việt Nam hoạt động bởi Golden
              Phoenix và Avanti, một nhà phân phối chính của The Pacific Cigar
              và Habanos S.A. ở Việt Nam.
            </p>
            <p className="text-lg text-gray-700 mb-6">
              Habanos Specialist có nhiều Xì gà Cuba hoàn hảo được ủy lưu từ
              24/7 chuyên nghiệp, để đảm bảo các điều kiện tối ưu chính xác cho
              người yêu thích hút xì gà."
            </p>
            <div className="text-amber-600 font-bold text-xl">- Mr Joel -</div>
          </div>
        </div>

        {/* Blog Images with Text Overlay */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 max-w-4xl mx-auto">
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
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-8">Nhãn Hiệu</h2>
        </div>

        <div className="flex justify-center items-center space-x-12 opacity-60">
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
                <IconComponent className="text-3xl text-gray-400 group-hover:text-amber-600 mx-auto mb-2" />
                <span className="text-sm text-gray-400 group-hover:text-amber-600">
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

export default HomePage;