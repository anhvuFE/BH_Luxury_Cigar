import React from 'react';
import { storeInfo } from '../../data/storeData';
import { FaAward, FaUserTie, FaStore, FaBoxOpen, FaMapMarkerAlt, FaPhone, FaClock, FaEnvelope, FaBullseye } from 'react-icons/fa';

const About: React.FC = () => {
  const features = [
    {
      icon: <FaAward className="text-4xl" />,
      title: 'Chất lượng cao cấp',
      description: 'Chỉ bán những sản phẩm cigar chính hãng từ các thương hiệu uy tín nhất thế giới'
    },
    {
      icon: <FaUserTie className="text-4xl" />,
      title: 'Tư vấn chuyên nghiệp',
      description: 'Đội ngũ nhân viên am hiểu sâu về cigar, sẵn sàng tư vấn cho mọi khách hàng'
    },
    {
      icon: <FaStore className="text-4xl" />,
      title: 'Không gian sang trọng',
      description: 'Cửa hàng được thiết kế với không gian thoải mái và sang trọng'
    },
    {
      icon: <FaBoxOpen className="text-4xl" />,
      title: 'Bảo quản hoàn hảo',
      description: 'Hệ thống humidor chuyên nghiệp đảm bảo cigar luôn trong điều kiện tốt nhất'
    }
  ];

  return (
    <section id="about" className="py-20 md:py-24 bg-transparent">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto animate-fadeInUp">
          <div className="divider-gold mb-8"></div>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Về {storeInfo.name}
          </h2>
          <p className="text-lg md:text-xl text-gold-light leading-relaxed font-light">
            {storeInfo.description}
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Store Information */}
          <div className="space-y-8 animate-slideInFromLeft">
            <div className="card-premium p-8 bg-gradient-luxury backdrop-blur-lg border border-gold border-opacity-20">
              <h3 className="font-serif text-2xl font-bold text-white mb-6 flex items-center">
                <FaStore className="text-gold mr-3 text-2xl" />
                Thông tin cửa hàng
              </h3>

              <div className="space-y-6">
                <div className="flex items-start space-x-4 group">
                  <FaMapMarkerAlt className="text-gold text-xl mt-1 group-hover:scale-110 transition-transform duration-300" />
                  <div>
                    <h4 className="font-semibold text-white mb-1">Địa chỉ</h4>
                    <p className="text-gray-300 leading-relaxed">{storeInfo.address}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 group">
                  <FaPhone className="text-gold text-xl mt-1 group-hover:scale-110 transition-transform duration-300" />
                  <div>
                    <h4 className="font-semibold text-white mb-1">Điện thoại</h4>
                    <a href={`tel:${storeInfo.phone}`} className="text-gray-300 hover:text-gold transition-colors duration-300">
                      {storeInfo.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4 group">
                  <FaClock className="text-gold text-xl mt-1 group-hover:scale-110 transition-transform duration-300" />
                  <div>
                    <h4 className="font-semibold text-white mb-1">Giờ mở cửa</h4>
                    <p className="text-gray-300">{storeInfo.openingHours}</p>
                  </div>
                </div>

                {storeInfo.email && (
                  <div className="flex items-start space-x-4 group">
                    <FaEnvelope className="text-gold text-xl mt-1 group-hover:scale-110 transition-transform duration-300" />
                    <div>
                      <h4 className="font-semibold text-white mb-1">Email</h4>
                      <a href={`mailto:${storeInfo.email}`} className="text-gray-300 hover:text-gold transition-colors duration-300">
                        {storeInfo.email}
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Mission Statement */}
            <div className="bg-gradient-luxury backdrop-blur-lg p-8 rounded-xl border-l-4 border-gold">
              <h3 className="font-serif text-xl font-bold text-white mb-4 flex items-center">
                <FaBullseye className="text-gold mr-3 text-xl" />
                Sứ mệnh của chúng tôi
              </h3>
              <p className="text-gray-300 leading-relaxed font-light">
                Mang đến cho khách hàng những trải nghiệm cigar tuyệt vời nhất với sự kết hợp hoàn hảo
                giữa chất lượng sản phẩm cao cấp, dịch vụ chuyên nghiệp và không gian thưởng thức đẳng cấp.
              </p>
            </div>
          </div>

          {/* Store Image and Features */}
          <div className="space-y-8">
            {/* Store Image Placeholder */}
            <div className="h-64 store-image-placeholder">
              <div className="store-icon text-gold"><FaStore className="text-8xl" /></div>
            </div>

            {/* Features Grid */}
            <div className="grid sm:grid-cols-2 gap-6 animate-fadeIn">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="card p-6 text-center hover:shadow-gold group cursor-pointer bg-gradient-luxury backdrop-blur-lg border border-gold border-opacity-20 interactive-card animate-bounceIn hover-glow morphing-shape"
                  style={{animationDelay: `${index * 200}ms`}}
                >
                  <div className="mb-4 group-hover:scale-110 transition-transform duration-300 text-gold">
                    {feature.icon}
                  </div>
                  <h3 className="font-semibold text-white mb-3 group-hover:text-gold transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed font-light">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Statistics Section */}
        <div className="text-white py-16 px-8">
          <div className="text-center mb-12">
            <h3 className="font-serif text-3xl font-bold mb-4">Thành tựu của chúng tôi</h3>
            <div className="divider-gold"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-12 text-center max-w-5xl mx-auto">
            <div className="group animate-bounceIn" style={{animationDelay: '0.2s'}}>
              <div className="relative">
                {/* Circular background with glow */}
                <div className="w-48 h-48 mx-auto bg-gradient-to-br from-gold via-gold-light to-gold rounded-full flex items-center justify-center relative overflow-hidden shadow-2xl shadow-gold group-hover:shadow-gold-lg transition-all duration-500 animate-breathe morphing-shape ring-4 ring-gold ring-opacity-30 group-hover:ring-opacity-60">
                  {/* Inner circle with shimmer effect */}
                  <div className="w-40 h-40 bg-gradient-to-br from-black/20 to-transparent rounded-full flex flex-col items-center justify-center relative z-10 animate-shimmer">
                    <div className="text-4xl font-bold text-black mb-2 animate-textGlow">10+</div>
                    <div className="text-black text-xs uppercase tracking-wider font-semibold">NĂM KINH NGHIỆM</div>
                  </div>
                  {/* Rotating border effect */}
                  <div className="absolute inset-0 rounded-full border-4 border-gold-light opacity-50 animate-rotateGradient"></div>
                  {/* Floating particles */}
                  <div className="absolute inset-0 animate-particleDance">
                    <div className="w-2 h-2 bg-white rounded-full absolute top-4 right-8 animate-sparkle"></div>
                    <div className="w-1 h-1 bg-gold-light rounded-full absolute bottom-6 left-6 animate-pulse"></div>
                    <div className="w-1.5 h-1.5 bg-white rounded-full absolute top-8 left-12 animate-bounce"></div>
                  </div>
                </div>
                <div className="mt-4 text-gold-light">Phục vụ khách hàng</div>
              </div>
            </div>

            <div className="group animate-bounceIn" style={{animationDelay: '0.4s'}}>
              <div className="relative">
                {/* Circular background with glow */}
                <div className="w-48 h-48 mx-auto bg-gradient-to-br from-gold via-gold-light to-gold rounded-full flex items-center justify-center relative overflow-hidden shadow-2xl shadow-gold group-hover:shadow-gold-lg transition-all duration-500 animate-breathe morphing-shape ring-4 ring-gold ring-opacity-30 group-hover:ring-opacity-60">
                  {/* Inner circle with shimmer effect */}
                  <div className="w-40 h-40 bg-gradient-to-br from-black/20 to-transparent rounded-full flex flex-col items-center justify-center relative z-10 animate-shimmer">
                    <div className="text-4xl font-bold text-black mb-2 animate-textGlow">500+</div>
                    <div className="text-black text-xs uppercase tracking-wider font-semibold">KHÁCH HÀNG HÀI LÒNG</div>
                  </div>
                  {/* Rotating border effect */}
                  <div className="absolute inset-0 rounded-full border-4 border-gold-light opacity-50 animate-rotateGradient"></div>
                  {/* Floating particles */}
                  <div className="absolute inset-0 animate-particleDance">
                    <div className="w-2 h-2 bg-white rounded-full absolute top-6 left-8 animate-sparkle" style={{animationDelay: '0.5s'}}></div>
                    <div className="w-1 h-1 bg-gold-light rounded-full absolute bottom-8 right-6 animate-pulse" style={{animationDelay: '0.3s'}}></div>
                    <div className="w-1.5 h-1.5 bg-white rounded-full absolute top-12 right-10 animate-bounce" style={{animationDelay: '0.7s'}}></div>
                  </div>
                </div>
                <div className="mt-4 text-gold-light">Tin tưởng và quay lại</div>
              </div>
            </div>

            <div className="group animate-bounceIn" style={{animationDelay: '0.6s'}}>
              <div className="relative">
                {/* Circular background with glow */}
                <div className="w-48 h-48 mx-auto bg-gradient-to-br from-gold via-gold-light to-gold rounded-full flex items-center justify-center relative overflow-hidden shadow-2xl shadow-gold group-hover:shadow-gold-lg transition-all duration-500 animate-breathe morphing-shape ring-4 ring-gold ring-opacity-30 group-hover:ring-opacity-60">
                  {/* Inner circle with shimmer effect */}
                  <div className="w-40 h-40 bg-gradient-to-br from-black/20 to-transparent rounded-full flex flex-col items-center justify-center relative z-10 animate-shimmer">
                    <div className="text-4xl font-bold text-black mb-2 animate-textGlow">50+</div>
                    <div className="text-black text-xs uppercase tracking-wider font-semibold">LOẠI CIGAR CAO CẤP</div>
                  </div>
                  {/* Rotating border effect */}
                  <div className="absolute inset-0 rounded-full border-4 border-gold-light opacity-50 animate-rotateGradient"></div>
                  {/* Floating particles */}
                  <div className="absolute inset-0 animate-particleDance">
                    <div className="w-2 h-2 bg-white rounded-full absolute top-8 right-6 animate-sparkle" style={{animationDelay: '1s'}}></div>
                    <div className="w-1 h-1 bg-gold-light rounded-full absolute bottom-4 left-8 animate-pulse" style={{animationDelay: '0.8s'}}></div>
                    <div className="w-1.5 h-1.5 bg-white rounded-full absolute top-6 left-10 animate-bounce" style={{animationDelay: '1.2s'}}></div>
                  </div>
                </div>
                <div className="mt-4 text-gold-light">Từ khắp thế giới</div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <h3 className="font-serif text-2xl font-bold text-white mb-4">
            Sẵn sàng khám phá thế giới cigar cao cấp?
          </h3>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Ghé thăm cửa hàng của chúng tôi để trải nghiệm bộ sưu tập cigar đẳng cấp và nhận được tư vấn chuyên nghiệp.
          </p>
          <button
            onClick={() => {
              const contactSection = document.querySelector('#contact');
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="btn btn-primary"
          >
            Liên hệ ngay
          </button>
        </div>
      </div>
    </section>
  );
};

export default About;