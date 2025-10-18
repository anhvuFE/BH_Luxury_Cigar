import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  HiOutlineSearch,
  HiOutlineShoppingBag,
  HiMenu,
  HiX,
  HiOutlineLogin,
  HiOutlineLogout,
  HiOutlineUser,
} from "react-icons/hi";
import authService from "../../services/auth.service";

interface User {
  id: string;
  email: string;
  name: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  phone_number?: string;
  role: 'user' | 'customer' | 'staff' | 'admin';
  avatar?: string;
  created_at?: string;
  updated_at?: string;
}

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const navigation = [
    { name: "Trang chủ", href: "/" },
    { name: "Sản phẩm", href: "/collections" },
    { name: "New Arrival", href: "/new-arrival" },
    { name: "Tin tức", href: "/blog" },
    { name: "Về chúng tôi", href: "/about" },
    { name: "Liên hệ", href: "/contact" },
  ];

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    const isAuth = authService.isAuthenticated();
    setIsAuthenticated(isAuth);

    if (isAuth) {
      // Try API first, fallback to localStorage
      try {
        const response = await authService.getProfile();
        console.log('Full API response:', response);

        // Extract user data - handle both direct user object and wrapped response
        const profile = response.data || response;
        setUser(profile);

        // Update localStorage with fresh data
        localStorage.setItem('user', JSON.stringify(profile));
        localStorage.setItem('userRole', profile.role);
        console.log('Header user loaded from API:', profile);
        console.log('Available user fields:', Object.keys(profile));
        console.log('first_name:', profile.first_name);
        console.log('name:', profile.name);
      } catch (apiError) {
        console.warn('Header API fetch failed, using localStorage:', apiError);

        // Fallback to localStorage
        const userData = localStorage.getItem('user');
        if (userData) {
          try {
            const localUser = JSON.parse(userData);
            setUser(localUser);
            console.log('Header using localStorage:', localUser);
          } catch (parseError) {
            console.error('Error parsing user data:', parseError);
            // Don't logout immediately, just clear user data
            setUser(null);
            setIsAuthenticated(false);
          }
        } else {
          console.warn('No localStorage data available');
          setUser(null);
          setIsAuthenticated(false);
        }
      }
    } else {
      setUser(null);
    }
  };

  const handleLogout = async () => {
    try {
      await authService.logout();
      setUser(null);
      setIsAuthenticated(false);
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
      // Clear local storage even if API call fails
      localStorage.removeItem('user');
      localStorage.removeItem('userRole');
      setUser(null);
      setIsAuthenticated(false);
      navigate('/');
    }
  };

  return (
    <header className="bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white sticky top-0 z-50 shadow-2xl backdrop-blur-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

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
            {/* Mobile Cart & User - Visible on small screens */}
            <div className="flex lg:hidden items-center space-x-2">
              <button className="relative p-2 hover:bg-amber-500/10 rounded-lg transition-all duration-300 group">
                <HiOutlineShoppingBag className="w-5 h-5 text-amber-300/80 group-hover:text-amber-400" />
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-amber-400 to-amber-500 text-black text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
                  0
                </span>
              </button>

              {isAuthenticated ? (
                <Link
                  to="/profile"
                  className="flex items-center space-x-1 p-2 hover:bg-amber-500/10 rounded-lg transition-all duration-300 group"
                  title="Profile"
                >
                  <HiOutlineUser className="w-5 h-5 text-amber-300/80 group-hover:text-amber-400" />
                  <span className="text-xs text-amber-300/90 group-hover:text-amber-400 font-medium max-w-[60px] truncate">
                    {user?.first_name || user?.name || 'User'}
                  </span>
                </Link>
              ) : (
                <Link
                  to="/login"
                  className="p-2 hover:bg-amber-500/10 rounded-lg transition-all duration-300 group"
                  title="Đăng nhập"
                >
                  <HiOutlineLogin className="w-5 h-5 text-amber-300/80 group-hover:text-amber-400" />
                </Link>
              )}
            </div>

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

              {/* User Authentication Actions */}
              {isAuthenticated ? (
                <div className="flex items-center space-x-3">
                  {/* User Profile */}
                  <Link
                    to="/profile"
                    className="flex items-center space-x-2 p-2.5 hover:bg-amber-500/10 rounded-lg transition-all duration-300 group cursor-pointer"
                    title="Thông tin cá nhân"
                  >
                    <HiOutlineUser className="w-4 h-4 text-amber-300/80 group-hover:text-amber-400" />
                    <span className="text-sm text-amber-300/90 group-hover:text-amber-400 font-medium">
                      {user?.first_name || user?.name || 'User'}
                    </span>
                  </Link>
                  {/* Logout Button */}
                  <button
                    onClick={handleLogout}
                    className="p-2.5 hover:bg-amber-500/10 rounded-lg transition-all duration-300 group"
                    title="Đăng xuất"
                  >
                    <HiOutlineLogout className="w-4 h-4 text-amber-300/80 group-hover:text-amber-400" />
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="p-2.5 hover:bg-amber-500/10 rounded-lg transition-all duration-300 group"
                  title="Đăng nhập"
                >
                  <HiOutlineLogin className="w-4 h-4 text-amber-300/80 group-hover:text-amber-400" />
                </Link>
              )}
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

              {/* Mobile Authentication */}
              {isAuthenticated ? (
                <button
                  onClick={handleLogout}
                  className="p-2 hover:bg-amber-500/10 rounded-lg transition-all duration-300"
                  title="Đăng xuất"
                >
                  <HiOutlineLogout className="w-4 h-4 text-amber-300/80" />
                </button>
              ) : (
                <Link
                  to="/login"
                  className="p-2 hover:bg-amber-500/10 rounded-lg transition-all duration-300"
                  title="Đăng nhập"
                >
                  <HiOutlineLogin className="w-4 h-4 text-amber-300/80" />
                </Link>
              )}
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

              {/* User Authentication */}
              {isAuthenticated ? (
                <div className="mt-4 pt-4 border-t border-amber-500/20 px-4">
                  <div className="flex items-center justify-between">
                    <Link
                      to="/profile"
                      className="flex items-center text-amber-300 hover:text-amber-400 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <HiOutlineUser className="w-4 h-4 mr-3" />
                      <span className="font-medium">
                        Xin chào, {user?.first_name || user?.name || 'User'}
                      </span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="p-2 hover:bg-amber-500/10 rounded-lg transition-all duration-300"
                      title="Đăng xuất"
                    >
                      <HiOutlineLogout className="w-4 h-4 text-amber-300/80" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="mt-4 pt-4 border-t border-amber-500/20 px-4">
                  <Link
                    to="/login"
                    className="flex items-center text-amber-300 hover:text-amber-400 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <HiOutlineLogin className="w-4 h-4 mr-3" />
                    <span className="font-medium">Đăng nhập</span>
                  </Link>
                </div>
              )}

            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
