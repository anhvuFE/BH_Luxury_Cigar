import React from 'react';
import { storeInfo, navigationItems } from '../../data/storeData';
import {
  FaPhone, FaMapMarkerAlt, FaClock, FaEnvelope, FaStore,
  FaFacebookF, FaInstagram, FaTiktok, FaTwitter, FaChevronUp,
  FaCrown, FaGem, FaStar, FaTrophy, FaAward
} from 'react-icons/fa';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative overflow-hidden">
      {/* Luxury Background with Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black">
        {/* Royal Pattern Overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 border border-gold rounded-full"></div>
          <div className="absolute bottom-20 right-16 w-24 h-24 border border-gold rounded-full"></div>
          <div className="absolute top-1/2 right-1/4 w-16 h-16 border border-gold rounded-full"></div>
          <div className="absolute bottom-32 left-1/4 w-8 h-8 bg-gold rounded-full opacity-60"></div>
        </div>
        {/* Luxury Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
      </div>

      {/* Royal Divider */}
      <div className="relative">
        <div className="h-1 bg-gradient-to-r from-transparent via-gold to-transparent"></div>
        <div className="flex justify-center -mt-2">
          <div className="w-8 h-4 bg-gold rounded-b-full shadow-lg"></div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="relative container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Store Information - Royal Style */}
          <div className="lg:col-span-2 space-y-8">
            <div className="relative">
              {/* Royal Crown Icon */}
              <div className="flex items-center mb-6">
                <FaCrown className="text-gold opacity-30 text-5xl mr-4" />
                <div className="flex-1">
                  <h3 className="font-serif text-4xl font-bold mb-2 text-white bg-gradient-to-r from-gold via-gold-light to-gold bg-clip-text text-transparent">
                    {storeInfo.name}
                  </h3>
                  <div className="w-24 h-1 bg-gradient-to-r from-gold to-transparent"></div>
                </div>
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed font-light text-lg italic">
                "{storeInfo.description}"
              </p>
            </div>

            {/* Royal Contact Information */}
            <div className="bg-gradient-luxury backdrop-blur-lg border border-gold border-opacity-20 rounded-2xl p-8 space-y-6">
              <h4 className="font-serif text-xl font-bold text-gold mb-6 text-center">Thông tin liên hệ</h4>

              <div className="grid gap-4">
                <div className="flex items-start space-x-4 group hover:bg-gold hover:bg-opacity-10 p-3 rounded-lg transition-all duration-300">
                  <div className="w-10 h-10 bg-gold bg-opacity-20 rounded-lg flex items-center justify-center group-hover:bg-opacity-30 transition-all duration-300">
                    <FaMapMarkerAlt className="text-white text-lg" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-white mb-1">Địa chỉ cửa hàng</h5>
                    <p className="text-gray-300 text-sm leading-relaxed">{storeInfo.address}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 group hover:bg-gold hover:bg-opacity-10 p-3 rounded-lg transition-all duration-300">
                  <div className="w-10 h-10 bg-gold bg-opacity-20 rounded-lg flex items-center justify-center group-hover:bg-opacity-30 transition-all duration-300">
                    <FaPhone className="text-white text-lg" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-white mb-1">Hotline</h5>
                    <a
                      href={`tel:${storeInfo.phone}`}
                      className="text-gray-300 text-sm hover:text-gold transition-colors duration-300"
                    >
                      {storeInfo.phone}
                    </a>
                  </div>
                </div>

                {storeInfo.email && (
                  <div className="flex items-start space-x-4 group hover:bg-gold hover:bg-opacity-10 p-3 rounded-lg transition-all duration-300">
                    <div className="w-10 h-10 bg-gold bg-opacity-20 rounded-lg flex items-center justify-center group-hover:bg-opacity-30 transition-all duration-300">
                      <FaEnvelope className="text-white text-lg" />
                    </div>
                    <div>
                      <h5 className="font-semibold text-white mb-1">Email</h5>
                      <a
                        href={`mailto:${storeInfo.email}`}
                        className="text-gray-300 text-sm hover:text-gold transition-colors duration-300"
                      >
                        {storeInfo.email}
                      </a>
                    </div>
                  </div>
                )}

                <div className="flex items-start space-x-4 group hover:bg-gold hover:bg-opacity-10 p-3 rounded-lg transition-all duration-300">
                  <div className="w-10 h-10 bg-gold bg-opacity-20 rounded-lg flex items-center justify-center group-hover:bg-opacity-30 transition-all duration-300">
                    <FaClock className="text-white text-lg" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-white mb-1">Giờ phục vụ</h5>
                    <p className="text-gray-300 text-sm">{storeInfo.openingHours}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Royal Navigation */}
          <div className="space-y-8">
            <div className="bg-gradient-luxury backdrop-blur-lg border border-gold border-opacity-20 rounded-2xl p-6">
              <h4 className="font-serif text-xl font-semibold mb-6 text-gold text-center flex items-center justify-center">
                <FaGem className="mr-2 text-lg" />
                Điều hướng
              </h4>
              <ul className="space-y-3">
                {navigationItems.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => handleNavClick(item.href)}
                      className="w-full text-left text-gray-300 hover:text-gold hover:bg-gold hover:bg-opacity-10 transition-all duration-300 text-sm font-medium p-2 rounded-lg border border-transparent hover:border-gold hover:border-opacity-30"
                    >
                      <span className="mr-2">▸</span>
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Royal Services */}
          <div className="space-y-8">
            <div className="bg-gradient-luxury backdrop-blur-lg border border-gold border-opacity-20 rounded-2xl p-6">
              <h4 className="font-serif text-xl font-semibold mb-6 text-gold text-center flex items-center justify-center">
                <FaTrophy className="mr-2 text-lg" />
                Dịch vụ cao cấp
              </h4>
              <ul className="space-y-3 text-sm">
                {[
                  'Cigar Cuban chính hãng',
                  'Tư vấn chuyên gia',
                  'Phụ kiện platinum',
                  'Humidor premium',
                  'Masterclass & Workshop',
                  'VIP Lounge Experience'
                ].map((service, index) => (
                  <li key={index}>
                    <span className="text-gray-300 hover:text-gold transition-colors duration-300 cursor-pointer flex items-center p-2 rounded-lg hover:bg-gold hover:bg-opacity-10">
                      <FaStar className="mr-2 text-gold text-xs" />
                      {service}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Royal Newsletter */}
        <div className="mt-20 pt-12 border-t border-gold border-opacity-30">
          <div className="bg-gradient-luxury backdrop-blur-lg border border-gold border-opacity-20 rounded-3xl p-12 text-center relative overflow-hidden">
            {/* Royal Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-4 left-4 w-16 h-16 border border-gold rounded-full"></div>
              <div className="absolute bottom-4 right-4 w-12 h-12 border border-gold rounded-full"></div>
              <div className="absolute top-1/2 left-8 w-8 h-8 bg-gold rounded-full"></div>
            </div>

            <div className="relative z-10">
              <div className="flex justify-center mb-6">
                <FaEnvelope className="text-6xl text-gold" />
              </div>
              <h4 className="font-serif text-3xl font-bold mb-4 text-white">
                Tham gia gia đình <span className="text-gold">BH Luxury</span>
              </h4>
              <p className="text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed text-lg">
                Trở thành thành viên VIP để nhận thông tin độc quyền về bộ sưu tập mới, sự kiện đặc biệt và kiến thức chuyên sâu về nghệ thuật cigar
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-lg mx-auto">
                <input
                  type="email"
                  placeholder="Email của quý khách hàng VIP"
                  className="w-full px-6 py-4 rounded-full bg-black bg-opacity-30 backdrop-blur-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold border-2 border-gold border-opacity-30 focus:border-gold"
                />
                <button className="w-full sm:w-auto btn btn-primary whitespace-nowrap px-8 py-4 rounded-full font-semibold">
                  Gia nhập VIP
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media & Stats */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Social Media */}
            <div>
              <h5 className="font-semibold text-gold mb-4">Theo dõi chúng tôi</h5>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gold transition-colors duration-300 group"
                >
                  <FaFacebookF className="text-gray-300 group-hover:text-dark" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gold transition-colors duration-300 group"
                >
                  <FaInstagram className="text-gray-300 group-hover:text-dark" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gold transition-colors duration-300 group"
                >
                  <FaTiktok className="text-gray-300 group-hover:text-dark" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gold transition-colors duration-300 group"
                >
                  <FaTwitter className="text-gray-300 group-hover:text-dark" />
                </a>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-gold">10+</div>
                <div className="text-xs text-gray-400 uppercase tracking-wider">Năm kinh nghiệm</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gold">500+</div>
                <div className="text-xs text-gray-400 uppercase tracking-wider">Khách hàng</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gold">50+</div>
                <div className="text-xs text-gray-400 uppercase tracking-wider">Dòng sản phẩm</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll to Top */}
        <div className="flex justify-center mt-8">
          <button
            onClick={scrollToTop}
            className="bg-gold hover:bg-gold-dark p-3 rounded-full transition-all duration-300 group hover:-translate-y-1"
            aria-label="Scroll to top"
          >
            <FaChevronUp className="w-5 h-5 text-dark group-hover:scale-110 transition-transform duration-300" />
          </button>
        </div>
      </div>

      {/* Royal Copyright */}
      <div className="relative bg-gradient-to-r from-black via-gray-900 to-black py-8 border-t border-gold border-opacity-30">
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-2 left-1/4 w-4 h-4 bg-gold rounded-full"></div>
          <div className="absolute bottom-2 right-1/4 w-3 h-3 bg-gold rounded-full"></div>
        </div>

        <div className="relative container mx-auto px-4">
          <div className="text-center mb-6">
            <div className="flex justify-center items-center space-x-4 mb-4">
              <div className="w-16 h-0.5 bg-gradient-to-r from-transparent to-gold"></div>
              <FaCrown className="text-2xl text-gold" />
              <div className="w-16 h-0.5 bg-gradient-to-l from-transparent to-gold"></div>
            </div>
            <p className="text-gray-400 text-sm italic">
              "Luxury is in each detail - Premium cigar experience since 2014"
            </p>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center text-sm">
            <div className="mb-4 md:mb-0 text-center md:text-left">
              <div className="text-gray-400">
                © {currentYear} <span className="text-gold font-bold text-lg">{storeInfo.name}</span>
              </div>
              <div className="text-gray-500 text-xs mt-1">
                Crafted with ❤️ for cigar connoisseurs
              </div>
            </div>

            <div className="flex flex-wrap justify-center md:justify-end gap-6 text-xs">
              <a href="#" className="text-gray-400 hover:text-gold transition-colors duration-300">
                🔒 Chính sách bảo mật
              </a>
              <a href="#" className="text-gray-400 hover:text-gold transition-colors duration-300">
                📋 Điều khoản dịch vụ
              </a>
              <a href="#" className="text-gray-400 hover:text-gold transition-colors duration-300">
                🔄 Chính sách đổi trả
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;