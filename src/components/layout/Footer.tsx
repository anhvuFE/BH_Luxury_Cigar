import React from 'react';
import { Link } from 'react-router-dom';
import { HiOutlinePhone, HiOutlineMail, HiOutlineLocationMarker } from 'react-icons/hi';
import { HiOutlineHeart } from 'react-icons/hi2';
// import { storeInfo } from '../../data/storeData';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">
                BH <span className="text-amber-400">Luxury Cigar</span>
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Điểm đến uy tín cho những người yêu thích xì gà cao cấp tại Hải Dương.
                Chúng tôi cung cấp những sản phẩm chất lượng nhất từ khắp nơi trên thế giới.
              </p>
            </div>

            {/* Contact Info */}
            <div className="space-y-2">
              <div className="flex items-center text-gray-400">
                <HiOutlinePhone className="w-4 h-4 mr-3 text-amber-400" />
                <span className="text-sm">0975 224 557</span>
              </div>
              <div className="flex items-center text-gray-400">
                <HiOutlineMail className="w-4 h-4 mr-3 text-amber-400" />
                <span className="text-sm">contact@bhluxurycigar.com</span>
              </div>
              <div className="flex items-start text-gray-400">
                <HiOutlineLocationMarker className="w-4 h-4 mr-3 text-amber-400 mt-0.5" />
                <span className="text-sm">138 Bình Hàn, TP Hải Dương</span>
              </div>
            </div>

            {/* Working Hours */}
            <div>
              <h4 className="font-medium text-white mb-2">Giờ Mở Cửa</h4>
              <div className="text-sm text-gray-400 space-y-1">
                <div>Thứ 2 - Thứ 6: 9:00 - 18:00</div>
                <div>Thứ 7 - Chủ nhật: 9:00 - 17:00</div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-medium text-white mb-4">Liên Kết Nhanh</h3>
            <ul className="space-y-3">
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
                <Link to="/guide" className="text-gray-400 hover:text-amber-400 transition-colors text-sm">
                  Hướng dẫn
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-medium text-white mb-4">Danh Mục</h3>
            <ul className="space-y-3">
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
        <div className="border-t border-gray-800 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-1 text-gray-400 text-sm">
              <span>© 2024 BH Luxury Cigar. Được làm với</span>
              <HiOutlineHeart className="w-4 h-4 text-amber-400" />
              <span>tại Hải Dương</span>
            </div>
            <div className="flex flex-wrap justify-center md:justify-end items-center gap-6 text-sm text-gray-400">
              <a href="#" className="hover:text-amber-400 transition-colors">
                Chính sách bảo mật
              </a>
              <a href="#" className="hover:text-amber-400 transition-colors">
                Điều khoản sử dụng
              </a>
              <a href="#" className="hover:text-amber-400 transition-colors">
                Chính sách đổi trả
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;