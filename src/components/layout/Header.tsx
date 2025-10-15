import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  HiOutlinePhone,
  HiOutlineMail,
  HiOutlineSearch,
  HiOutlineShoppingBag,
  HiMenu,
  HiX,
  HiOutlineGlobeAlt,
} from "react-icons/hi";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: "Trang chủ", href: "/" },
    { name: "Sản phẩm", href: "/collections" },
    { name: "New Arrival", href: "/new-arrival" },
    { name: "Tin tức", href: "/blog" },
    { name: "Về chúng tôi", href: "/about" },
    { name: "Liên hệ", href: "/contact" },
  ];

  return (
    <header className="bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white sticky top-0 z-50 shadow-2xl backdrop-blur-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top bar - Clean & Minimal */}
        <div className="hidden lg:flex justify-between items-center py-2 text-sm border-b border-amber-500/20">
          <div className="flex items-center space-x-8">
            <div className="flex items-center text-amber-300/90 hover:text-amber-400 transition-colors cursor-pointer">
              <HiOutlinePhone className="w-3 h-3 mr-2" />
              <span className="font-medium">0975 224 557</span>
            </div>
            <div className="flex items-center text-amber-300/90 hover:text-amber-400 transition-colors cursor-pointer">
              <HiOutlineMail className="w-3 h-3 mr-2" />
              <span className="font-medium">contact@bhluxurycigar.com</span>
            </div>
          </div>
          <div className="flex items-center space-x-6 text-amber-300/90">
            <span className="text-xs tracking-wide">🇻🇳 VN</span>
          </div>
        </div>

        {/* Main header - Premium Design */}
        <div className="flex justify-between items-center py-4 lg:py-6">
          {/* Logo - Brand Image */}
          <Link to="/" className="flex items-center group">
            <div className="relative">
              <img
                src="/src/assets/images/logo.png"
                alt="BH Luxury Cigar Logo"
                className="h-12 sm:h-14 lg:h-16 w-auto group-hover:scale-105 transition-all duration-300 filter drop-shadow-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-amber-400/20 to-amber-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg blur-xl"></div>
            </div>
          </Link>

          {/* Desktop Navigation - Elegant */}
          <nav className="hidden lg:flex items-center space-x-8 xl:space-x-10">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="relative text-white/90 hover:text-amber-300 transition-all duration-500 font-medium text-sm xl:text-base tracking-wide group py-3 px-2 font-inter"
              >
                <span className="relative z-10">{item.name}</span>
                <span className="absolute bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-400 to-amber-600 group-hover:w-full transition-all duration-500 rounded-full"></span>
                <span className="absolute inset-0 bg-amber-500/10 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-lg blur-sm"></span>
              </Link>
            ))}
          </nav>

          {/* Actions - Clean & Simple */}
          <div className="flex items-center space-x-2 lg:space-x-3">
            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center space-x-3">
              <button className="p-2.5 hover:bg-amber-500/10 rounded-lg transition-all duration-300 group">
                <HiOutlineSearch className="w-4 h-4 text-amber-300/80 group-hover:text-amber-400" />
              </button>
              <button className="relative p-2.5 hover:bg-amber-500/10 rounded-lg transition-all duration-300 group">
                <HiOutlineShoppingBag className="w-4 h-4 text-amber-300/80 group-hover:text-amber-400" />
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-amber-400 to-amber-500 text-black text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  0
                </span>
              </button>
            </div>

            {/* Mobile Actions */}
            <div className="flex items-center space-x-1 lg:hidden">
              <button className="p-2 hover:bg-amber-500/10 rounded-lg transition-all duration-300">
                <HiOutlineSearch className="w-4 h-4 text-amber-300/80" />
              </button>
              <button className="relative p-2 hover:bg-amber-500/10 rounded-lg transition-all duration-300">
                <HiOutlineShoppingBag className="w-4 h-4 text-amber-300/80" />
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-amber-400 to-amber-500 text-black text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
                  0
                </span>
              </button>
            </div>

            {/* Mobile menu button - Clean */}
            <button
              className="lg:hidden p-2 hover:bg-amber-500/10 rounded-lg transition-all duration-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <HiX className="w-5 h-5 text-amber-300/80" />
              ) : (
                <HiMenu className="w-5 h-5 text-amber-300/80" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation - Clean & Simple */}
        {isMenuOpen && (
          <div className="lg:hidden">
            <div className="py-4 bg-gray-900/95 backdrop-blur-sm border-t border-amber-500/30">
              <nav className="flex flex-col space-y-1 px-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="text-white hover:text-amber-400 transition-colors duration-200 font-medium text-base py-3 px-3 rounded-lg hover:bg-amber-500/10 font-inter"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>

              {/* Contact info */}
              <div className="mt-6 pt-4 border-t border-amber-500/20 px-4">
                <div className="flex flex-col space-y-3">
                  <div className="flex items-center text-amber-300">
                    <HiOutlinePhone className="w-4 h-4 mr-3" />
                    <span className="font-medium">0975224557</span>
                  </div>
                  <div className="flex items-center text-amber-300">
                    <HiOutlineMail className="w-4 h-4 mr-3" />
                    <span className="font-medium text-sm">
                      contact@bhluxurycigar.com
                    </span>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-amber-500/20">
                    <div className="flex items-center text-amber-300">
                      <HiOutlineGlobeAlt className="w-4 h-4 mr-2" />
                      <span className="font-medium">Tiếng Việt</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
