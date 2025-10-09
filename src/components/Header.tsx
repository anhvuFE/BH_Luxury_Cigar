import { Link } from "react-router-dom";
import {
  FaPhone,
  FaSearch,
  FaUser,
  FaShoppingCart,
  FaTwitter,
  FaFacebook,
  FaYoutube,
  FaInstagram,
  FaEnvelope,
} from "react-icons/fa";
import { MdLanguage, MdKeyboardArrowDown } from "react-icons/md";

const Header = () => (
  <header className="bg-black text-white sticky top-0 z-50">
    {/* Top bar */}
    <div className="bg-gray-800 border-b border-gray-700">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-2 text-sm">
          <div className="flex items-center space-x-4">
            {/* Social Icons */}
            <div className="flex items-center space-x-3">
              <FaTwitter className="w-4 h-4 text-gray-300 hover:text-white cursor-pointer" />
              <FaFacebook className="w-4 h-4 text-gray-300 hover:text-white cursor-pointer" />
              <FaYoutube className="w-4 h-4 text-gray-300 hover:text-white cursor-pointer" />
              <FaInstagram className="w-4 h-4 text-gray-300 hover:text-white cursor-pointer" />
              <FaEnvelope className="w-4 h-4 text-gray-300 hover:text-white cursor-pointer" />
            </div>
            <div className="text-gray-300">|</div>
            <span className="flex items-center text-white">
              +84 975 224 557
            </span>
          </div>
          <div className="flex items-center space-x-6">
            <div className="flex items-center cursor-pointer">
              <span className="text-white mr-1">TIẾNG VIỆT</span>
              <MdKeyboardArrowDown className="w-4 h-4 text-white" />
            </div>
            <div className="flex items-center cursor-pointer">
              <FaUser className="w-4 h-4 mr-2" />
              <span className="text-white">ĐĂNG NHẬP</span>
            </div>
            <div className="flex items-center">
              <FaShoppingCart className="w-4 h-4 mr-2" />
              <span className="text-white">0</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Main header */}
    <div className="bg-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src="/src/assets/images/logo.png"
              alt="BH Luxury Cigar Logo"
              className="h-24 w-auto"
            />
          </Link>

          {/* Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link
              to="/"
              className="text-black hover:text-amber-600 transition-colors font-medium uppercase text-sm tracking-wide border-b-2 border-transparent hover:border-amber-600 pb-1"
            >
              TRANG CHỦ
            </Link>
            <div className="relative group">
              <Link
                to="/collections"
                className="text-black hover:text-amber-600 transition-colors font-medium uppercase text-sm tracking-wide border-b-2 border-transparent hover:border-amber-600 pb-1 flex items-center"
              >
                SẢN PHẨM
                <MdKeyboardArrowDown className="w-4 h-4 ml-1" />
              </Link>
            </div>
            <Link
              to="/blog"
              className="text-black hover:text-amber-600 transition-colors font-medium uppercase text-sm tracking-wide border-b-2 border-transparent hover:border-amber-600 pb-1"
            >
              TIN TỨC
            </Link>
            <Link
              to="/about"
              className="text-black hover:text-amber-600 transition-colors font-medium uppercase text-sm tracking-wide border-b-2 border-transparent hover:border-amber-600 pb-1"
            >
              GIỚI THIỆU
            </Link>
            <Link
              to="/contact"
              className="text-black hover:text-amber-600 transition-colors font-medium uppercase text-sm tracking-wide border-b-2 border-transparent hover:border-amber-600 pb-1"
            >
              LIÊN HỆ
            </Link>
            <Link
              to="/new-arrival"
              className="text-black hover:text-amber-600 transition-colors font-medium uppercase text-sm tracking-wide border-b-2 border-transparent hover:border-amber-600 pb-1"
            >
              NEW ARRIVAL
            </Link>
            <span className="bg-amber-600 text-white px-4 py-2 rounded font-bold text-sm">
              BEST SELLER
            </span>
          </nav>

          {/* Search */}
          <div className="flex items-center">
            <div className="flex items-center border border-gray-300 rounded px-3 py-2">
              <input
                type="text"
                placeholder="Tìm kiếm..."
                className="text-sm text-black outline-none bg-transparent"
              />
              <FaSearch className="w-4 h-4 text-gray-400 ml-2" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
);

export default Header;
