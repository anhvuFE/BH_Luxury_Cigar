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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
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
            <p className="text-gray-300 mb-6 leading-relaxed text-sm sm:text-base max-w-md">
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

            {/* Working Hours */}
            <div className="mt-6">
              <h4 className="text-sm font-semibold text-amber-400 mb-3">Giờ Mở Cửa</h4>
              <div className="text-sm text-gray-400 space-y-1">
                <div>Thứ 2 - Thứ 6: 9:00 - 18:00</div>
                <div>Thứ 7 - Chủ nhật: 9:00 - 17:00</div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-amber-400">Liên Kết Nhanh</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-amber-400 transition-colors text-sm">
                  Trang chủ
                </Link>
              </li>
              <li>
                <Link to="/collections" className="text-gray-400 hover:text-amber-400 transition-colors text-sm">
                  Sản phẩm
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-amber-400 transition-colors text-sm">
                  Về chúng tôi
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-400 hover:text-amber-400 transition-colors text-sm">
                  Tin tức
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-amber-400 transition-colors text-sm">
                  Liên hệ
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-amber-400">Danh Mục</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors text-sm">
                  Phụ kiện xì gà
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors text-sm">
                  Single Malts
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors text-sm">
                  Blended Scotch
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors text-sm">
                  Rượu mạnh
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors text-sm">
                  Rượu vang
                </a>
              </li>
            </ul>
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