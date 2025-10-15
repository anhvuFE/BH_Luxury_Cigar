import React from 'react';
import { Link } from 'react-router-dom';
import { HiOutlinePhone, HiOutlineMail, HiOutlineLocationMarker } from 'react-icons/hi';
import { HiOutlineHeart } from 'react-icons/hi2';
import { storeInfo } from '../../data/storeData';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 via-transparent to-amber-500/5"></div>
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Company Info */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="mb-6">
              <img
                src="/src/assets/images/logo.png"
                alt="BH Luxury Cigar Logo"
                className="h-16 w-auto mb-4 opacity-90"
              />
              <h3 className="text-xl sm:text-2xl font-light text-white mb-2">
                BH <span className="font-bold text-amber-400">Luxury Cigar</span>
              </h3>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed text-sm sm:text-base">
              Điểm đến uy tín cho những người yêu thích xì gà cao cấp tại Hải Dương.
              Chúng tôi cung cấp những sản phẩm chất lượng nhất từ khắp nơi trên thế giới.
            </p>

            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center text-gray-300 group">
                <HiOutlinePhone className="w-5 h-5 mr-3 text-amber-400 group-hover:text-amber-300 transition-colors" />
                <span className="text-sm group-hover:text-white transition-colors">0975 224 557</span>
              </div>
              <div className="flex items-center text-gray-300 group">
                <HiOutlineMail className="w-5 h-5 mr-3 text-amber-400 group-hover:text-amber-300 transition-colors" />
                <span className="text-sm group-hover:text-white transition-colors">contact@bhluxurycigar.com</span>
              </div>
              <div className="flex items-start text-gray-300 group">
                <HiOutlineLocationMarker className="w-5 h-5 mr-3 text-amber-400 group-hover:text-amber-300 transition-colors mt-0.5" />
                <span className="text-sm group-hover:text-white transition-colors">138 Bình Hàn, TP Hải Dương</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Liên Kết Nhanh</h3>
            <ul className="space-y-1.5 sm:space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-primary-500 transition-colors text-sm sm:text-base">
                  Trang chủ
                </Link>
              </li>
              <li>
                <Link to="/collections" className="text-gray-400 hover:text-primary-500 transition-colors text-sm sm:text-base">
                  Sản phẩm
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-primary-500 transition-colors text-sm sm:text-base">
                  Về chúng tôi
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-400 hover:text-primary-500 transition-colors text-sm sm:text-base">
                  Tin tức
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-primary-500 transition-colors text-sm sm:text-base">
                  Liên hệ
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Danh Mục</h3>
            <ul className="space-y-1.5 sm:space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-primary-500 transition-colors text-sm sm:text-base">
                  Xì gà Cuba
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-primary-500 transition-colors text-sm sm:text-base">
                  Xì gà Dominican
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-primary-500 transition-colors text-sm sm:text-base">
                  Xì gà Nicaragua
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-primary-500 transition-colors text-sm sm:text-base">
                  Phụ kiện
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-primary-500 transition-colors text-sm sm:text-base">
                  Hộp bảo quản
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Liên Hệ</h3>
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-start">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-primary-500 mt-0.5 sm:mt-1 mr-2 sm:mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-gray-400 text-sm sm:text-base">{storeInfo.address}</span>
              </div>
              <div className="flex items-center">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-primary-500 mr-2 sm:mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href={`tel:${storeInfo.phone}`} className="text-gray-400 hover:text-primary-500 transition-colors text-sm sm:text-base">
                  {storeInfo.phone}
                </a>
              </div>
              <div className="flex items-center">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-primary-500 mr-2 sm:mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href={`mailto:${storeInfo.email}`} className="text-gray-400 hover:text-primary-500 transition-colors text-sm sm:text-base break-all">
                  {storeInfo.email}
                </a>
              </div>
            </div>

            {/* Working Hours */}
            <div className="mt-4 sm:mt-6">
              <h4 className="text-xs sm:text-sm font-semibold text-primary-500 mb-2">Giờ Mở Cửa</h4>
              <div className="text-xs sm:text-sm text-gray-400 space-y-1">
                <div>T2 - T6: 9:00 - 18:00</div>
                <div>T7 - CN: 9:00 - 17:00</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-amber-500/20 mt-12 sm:mt-16 pt-8 sm:pt-12">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-6 sm:space-y-0">
            <div className="flex items-center space-x-2 text-gray-300 text-sm sm:text-base">
              <span>© 2024 BH Luxury Cigar. Được làm với</span>
              <HiOutlineHeart className="w-4 h-4 text-amber-400 animate-pulse" />
              <span>tại Hải Dương</span>
            </div>
            <div className="flex flex-wrap justify-center sm:justify-end items-center gap-4 lg:gap-6 text-sm text-gray-400">
              <a href="#" className="hover:text-amber-400 transition-all duration-300 hover:scale-105">
                Chính sách bảo mật
              </a>
              <a href="#" className="hover:text-amber-400 transition-all duration-300 hover:scale-105">
                Điều khoản sử dụng
              </a>
              <a href="#" className="hover:text-amber-400 transition-all duration-300 hover:scale-105">
                Chính sách đổi trả
              </a>
            </div>
          </div>

          {/* Legal Notice */}
          <div className="mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-gray-800">
            <div className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-2xl p-4 sm:p-6">
              <p className="text-xs sm:text-sm text-gray-400 text-center leading-relaxed">
                Tuân thủ Nghị định số 185/2013/NĐ-CP của Chính phủ và luật quảng cáo số 16/2012/QH13 về kinh doanh bán hàng qua mạng.
                BH Luxury Cigar là trang thông tin chia sẻ kiến thức về xì gà hoạt động phi lợi nhuận.
                <span className="text-amber-400 font-medium"> Vui lòng thưởng thức có trách nhiệm và tuân thủ quy định pháp luật địa phương.</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;