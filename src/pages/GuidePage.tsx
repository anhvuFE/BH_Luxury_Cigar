import React, { useState } from "react";
import {
  HiOutlineBookOpen,
  HiOutlineFire,
  HiOutlineSparkles,
  HiOutlineAcademicCap,
  HiOutlineLightBulb,
  HiOutlineGlobe,
  HiChevronRight,
} from "react-icons/hi";
import { FaStar, FaLeaf, FaTemperatureHigh, FaWineGlass } from "react-icons/fa";
import { GiCigar, GiCigarette, GiSmokeBomb } from "react-icons/gi";

const GuidePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("basics");

  const guideContent = {
    basics: {
      title: "Kiến Thức Cơ Bản",
      icon: <HiOutlineBookOpen className="w-6 h-6" />,
      sections: [
        {
          title: "Ba Thành Phần Cấu Tạo",
          content: [
            { label: "Wrapper (Lớp Da)", desc: "Lá bọc ngoài đắt giá nhất, phải hoàn hảo không tì vết, quyết định vẻ đẹp và 60% hương vị" },
            { label: "Binder (Lớp Thịt)", desc: "Lá kết dính làm cầu nối giữa da và xương, giúp điếu xì gà cháy đều và ổn định" },
            { label: "Filler (Phần Xương)", desc: "Phần lõi chủ chốt từ nhiều vùng khác nhau, tạo nên sự độc đáo của mỗi loại xì gà" },
          ],
        },
      ],
    },
    sizes: {
      title: "Kích Thước & Hình Dạng",
      icon: <GiCigar className="w-6 h-6" />,
      sections: [
        {
          title: "Các Kích Thước Phổ Biến",
          content: [
            { label: "Corona", desc: "42-44 ring x 5.5-6 inches - Cổ điển, cân bằng" },
            { label: "Robusto", desc: "50 ring x 5 inches - Phổ biến nhất hiện nay" },
            { label: "Churchill", desc: "47-48 ring x 7 inches - Dành cho thời gian thư giãn dài" },
            { label: "Torpedo", desc: "52-54 ring x 6-7 inches - Đầu nhọn độc đáo" },
            { label: "Petit Corona", desc: "40-42 ring x 4-5 inches - Ngắn gọn, nhanh" },
          ],
        },
        {
          title: "Ring Gauge là gì?",
          content: [
            { label: "Định nghĩa", desc: "Đường kính xì gà tính bằng 1/64 inch" },
            { label: "Ví dụ", desc: "Ring 50 = 50/64 inch = khoảng 2cm" },
            { label: "Ảnh hưởng", desc: "Ring lớn = hút mát hơn, cháy chậm hơn" },
          ],
        },
      ],
    },
    selection: {
      title: "Cách Chọn Xì Gà",
      icon: <HiOutlineLightBulb className="w-6 h-6" />,
      sections: [
        {
          title: "Theo Màu Lá Wrapper & Cường Độ",
          content: [
            { label: "Xanh/Vàng nhạt", desc: "Vị ngọt nhẹ, ít nicotine - Tốt cho người mới và phụ nữ" },
            { label: "Nâu vàng", desc: "Connecticut wrapper - Độ đậm trung bình, cân bằng" },
            { label: "Nâu đỏ", desc: "Habano wrapper - Vị mạnh với chút cay, cho người có kinh nghiệm" },
            { label: "Nâu sậm", desc: "Từ giống Cuba - Vị đậm đà và rất thơm" },
            { label: "Maduro (Nâu tối)", desc: "Qua quá trình ủ kỹ - Vị đậm đà, êm dịu" },
            { label: "Oscuro (Đen)", desc: "Từ lá ngọn, ủ kỹ nhất - Vị rất mạnh, chỉ cho người sành" },
          ],
        },
        {
          title: "Theo Thời Gian",
          content: [
            { label: "15-30 phút", desc: "Petit Corona, Cigarillo" },
            { label: "30-45 phút", desc: "Corona, Robusto" },
            { label: "45-60 phút", desc: "Toro, Grand Corona" },
            { label: "60-90 phút", desc: "Churchill, Double Corona" },
          ],
        },
        {
          title: "Theo Dịp",
          content: [
            { label: "Buổi sáng", desc: "Connecticut wrapper, nhẹ nhàng với cà phê" },
            { label: "Sau bữa trưa", desc: "Medium body, Habano wrapper" },
            { label: "Buổi tối", desc: "Full body, Maduro wrapper với whisky" },
          ],
        },
      ],
    },
    storage: {
      title: "Bảo Quản",
      icon: <FaTemperatureHigh className="w-6 h-6" />,
      sections: [
        {
          title: "Yếu Tố Ảnh Hưởng Màu Lá",
          content: [
            { label: "Vị trí trồng", desc: "Trong bóng mát cho lá sáng, ngoài nắng cho lá đậm" },
            { label: "Vị trí trên cây", desc: "Gần gốc màu sáng, phần ngọn màu tối do hấp thụ nhiều nắng" },
            { label: "Quá trình lên men", desc: "Lên men càng lâu, màu sắc càng tối và vị càng đậm" },
          ],
        },
        {
          title: "Điều Kiện Bảo Quản Lý Tưởng",
          content: [
            { label: "Nhiệt độ", desc: "18-21°C (65-70°F) - Ổn định, tránh dao động" },
            { label: "Độ ẩm", desc: "65-72% RH - Dùng hygrometer để theo dõi" },
            { label: "Thông gió", desc: "Xoay xì gà định kỳ, tránh để chồng lên nhau" },
          ],
        },
        {
          title: "Thiết Bị Cần Thiết",
          content: [
            { label: "Humidor", desc: "Hộp gỗ tuyết tùng Tây Ban Nha là tốt nhất" },
            { label: "Hygrometer", desc: "Đo độ ẩm - nên dùng loại digital" },
            { label: "Humidifier", desc: "Giữ ẩm - có thể dùng Boveda pack" },
          ],
        },
      ],
    },
    smoking: {
      title: "Kỹ Thuật Thưởng Thức",
      icon: <HiOutlineFire className="w-6 h-6" />,
      sections: [
        {
          title: "Cắt và Đốt",
          content: [
            { label: "Cắt đầu", desc: "Dùng guillotine cutter, cắt vừa đủ để hút" },
            { label: "Đốt chân", desc: "Dùng butane lighter, xoay đều để đốt cháy toàn bộ" },
            { label: "Khởi động", desc: "Hút nhẹ nhàng, không hít vào phổi" },
          ],
        },
        {
          title: "Nhịp Độ Hút",
          content: [
            { label: "Tần suất", desc: "1-2 hơi mỗi phút là lý tưởng" },
            { label: "Kỹ thuật", desc: "Hút nhẹ, giữ khói trong miệng để cảm nhận hương vị" },
            { label: "Tránh quá nóng", desc: "Hút chậm để xì gà không bị nóng và đắng" },
          ],
        },
      ],
    },
    pairing: {
      title: "Kết Hợp Đồ Uống",
      icon: <FaWineGlass className="w-6 h-6" />,
      sections: [
        {
          title: "Với Rượu Whisky",
          content: [
            { label: "Mild Cigar", desc: "Speyside Scotch, Irish Whiskey nhẹ nhàng" },
            { label: "Medium Cigar", desc: "Highland Scotch, Bourbon cân bằng" },
            { label: "Full Cigar", desc: "Islay Scotch khói, Rye Whiskey mạnh mẽ" },
          ],
        },
        {
          title: "Với Đồ Uống Khác",
          content: [
            { label: "Cà phê", desc: "Espresso hoặc Cuban Coffee cho buổi sáng" },
            { label: "Cognac", desc: "XO hoặc VSOP cho những dịp đặc biệt" },
            { label: "Rum", desc: "Aged Rum từ Caribbean, ngọt ngào và phức tạp" },
          ],
        },
      ],
    },
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Luxury Dark Banner */}
      <section className="relative h-[70vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/my-father-cigars.jpg"
            alt="My Father Luxury Cigars"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black"></div>
        </div>

        {/* Smoke Effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-amber-600 rounded-full blur-[250px] opacity-10 animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-amber-700 rounded-full blur-[200px] opacity-10 animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <GiCigar className="absolute top-20 right-20 text-8xl text-amber-600/5 rotate-45 animate-float" />
          <GiSmokeBomb className="absolute bottom-20 left-20 text-7xl text-amber-600/5 -rotate-12 animate-float" style={{ animationDelay: '1.5s' }} />
        </div>

        <div className="relative h-full flex flex-col items-center justify-center text-center px-4">
          <div className="mb-6 relative">
            <div className="absolute inset-0 bg-amber-500 blur-3xl opacity-30"></div>
            <HiOutlineAcademicCap className="w-20 h-20 text-amber-500 mx-auto relative z-10" />
          </div>
          <h1 className="text-5xl sm:text-7xl font-bold text-white mb-4 tracking-tight">
            Nghệ Thuật & <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">Thưởng Thức</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Hành trình khám phá thế giới xì gà cao cấp và rượu mạnh hảo hạng
          </p>
        </div>
      </section>

      {/* Main Content with Dark Theme */}
      <div className="container mx-auto px-4 py-16">
        {/* Tab Navigation - Dark Glass Style with Horizontal Scroll */}
        <div className="overflow-x-auto pb-4 mb-16 scrollbar-hide">
          <div className="flex gap-3 justify-start lg:justify-center min-w-max px-4">
            {Object.entries(guideContent).map(([key, section]) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-full font-medium transition-all duration-300 backdrop-blur-xl whitespace-nowrap ${
                  activeTab === key
                    ? "bg-gradient-to-r from-amber-600 to-amber-700 text-white shadow-lg shadow-amber-600/30 transform scale-105"
                    : "bg-gray-900/50 text-gray-300 hover:bg-gray-800/70 border border-gray-700 hover:border-amber-600/50"
                }`}
              >
                {section.icon}
                <span>{section.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content Display - Luxury Dark Cards */}
        <div className="max-w-6xl mx-auto">
          {guideContent[activeTab as keyof typeof guideContent].sections.map((section, idx) => (
            <div key={idx} className="mb-12 relative">
              {/* Glow Effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-amber-600/20 to-amber-800/20 rounded-3xl blur-lg opacity-50"></div>

              <div className="relative bg-gray-900/90 backdrop-blur-xl rounded-3xl border border-amber-500/20 p-10 hover:border-amber-500/40 transition-all duration-500">
                <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
                  <span className="w-14 h-14 bg-gradient-to-br from-amber-600 to-amber-700 rounded-full flex items-center justify-center mr-4 shadow-lg shadow-amber-600/30 animate-pulse">
                    <span className="text-white font-bold text-xl">{idx + 1}</span>
                  </span>
                  {section.title}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {section.content.map((item, itemIdx) => (
                    <div
                      key={itemIdx}
                      className="group relative bg-black/40 backdrop-blur border border-gray-800 rounded-2xl p-6 hover:border-amber-500/50 transition-all duration-500 hover:bg-black/60 hover:transform hover:scale-105 hover:-translate-y-1"
                      style={{ animationDelay: `${itemIdx * 100}ms` }}
                    >
                      {/* Glow effect on hover */}
                      <div className="absolute inset-0 bg-gradient-to-br from-amber-600/0 to-amber-800/0 group-hover:from-amber-600/10 group-hover:to-amber-800/10 rounded-2xl transition-all duration-500"></div>

                      {/* Shadow effect */}
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-600/0 to-amber-800/0 rounded-2xl opacity-0 group-hover:opacity-30 blur transition-all duration-500"></div>

                      <div className="relative">
                        <h3 className="font-bold text-lg text-amber-500 mb-3 flex items-center group-hover:text-amber-400 transition-colors duration-300">
                          <GiCigarette className="w-5 h-5 mr-2 text-amber-600 group-hover:text-amber-500 transition-colors duration-300 group-hover:rotate-12 transform" />
                          {item.label}
                        </h3>
                        <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Premium Tips Section */}
        <div className="mt-20 relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-amber-600/30 to-orange-600/30 rounded-3xl blur-xl"></div>
          <div className="relative bg-gradient-to-br from-gray-900 via-gray-900/95 to-black rounded-3xl p-12 border border-amber-500/30">
            <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600 mb-10 text-center">
              Lời Khuyên Từ Chuyên Gia
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-600 to-amber-700 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg shadow-amber-600/30">
                  <span className="text-white font-bold text-lg">1</span>
                </div>
                <div>
                  <h3 className="font-bold text-white mb-2 text-lg">Khởi Đầu Tinh Tế</h3>
                  <p className="text-gray-400">Tránh Oscuro và Maduro cho lần đầu. Chọn lá màu nhạt (xanh/vàng) để tránh say thuốc.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-600 to-amber-700 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg shadow-amber-600/30">
                  <span className="text-white font-bold text-lg">2</span>
                </div>
                <div>
                  <h3 className="font-bold text-white mb-2 text-lg">Nghệ Thuật Thưởng Thức</h3>
                  <p className="text-gray-400">Hút chậm rãi, 1-2 hơi mỗi phút. Đây là nghệ thuật, không phải cuộc đua.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-600 to-amber-700 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg shadow-amber-600/30">
                  <span className="text-white font-bold text-lg">3</span>
                </div>
                <div>
                  <h3 className="font-bold text-white mb-2 text-lg">Bảo Quản Chuyên Nghiệp</h3>
                  <p className="text-gray-400">Đầu tư một humidor chất lượng. Xì gà tốt cần được bảo quản đúng cách.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-600 to-amber-700 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg shadow-amber-600/30">
                  <span className="text-white font-bold text-lg">4</span>
                </div>
                <div>
                  <h3 className="font-bold text-white mb-2 text-lg">Hiểu Về Hương Vị</h3>
                  <p className="text-gray-400">Màu lá chỉ để tham khảo. Phần Filler (lõi) mới quyết định chính hương vị điếu xì gà.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Luxury CTA Section */}
        <div className="mt-20 relative">
          {/* Background Image */}
          <div className="absolute inset-0 rounded-3xl overflow-hidden">
            <img
              src="/images/guide-cta.jpg"
              alt="Premium Collection"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/80"></div>
          </div>

          <div className="relative text-center p-16 text-white">
            <h2 className="text-4xl font-bold mb-4">Sẵn Sàng Cho Trải Nghiệm Đẳng Cấp?</h2>
            <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
              Khám phá bộ sưu tập xì gà và rượu mạnh cao cấp được tuyển chọn kỹ lưỡng từ khắp nơi trên thế giới
            </p>
            <a
              href="/collections"
              className="inline-flex items-center bg-gradient-to-r from-amber-600 to-amber-700 text-white px-10 py-5 rounded-full font-bold text-lg hover:from-amber-700 hover:to-amber-800 transition-all duration-300 shadow-2xl hover:shadow-amber-600/50 transform hover:scale-105"
            >
              Khám Phá Bộ Sưu Tập
              <HiChevronRight className="ml-2 w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuidePage;