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
import { useCart } from "../../contexts/CartContext";

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
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const { cartCount } = useCart();

  const navigation = [
    { name: "Trang chủ", href: "/" },
    { name: "Sản phẩm", href: "/collections" },
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

  const handleSearchToggle = () => {
    setIsSearchOpen(!isSearchOpen);
    if (isSearchOpen) {
      setSearchQuery('');
    } else {
      // Close mobile menu when opening search
      setIsMenuOpen(false);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/collections?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <header className="bg-gray-900 border-b border-gray-800 fixed top-0 left-0 right-0 z-[9999] w-full">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Main header - Clean Design */}
        <div className="flex lg:grid lg:grid-cols-3 items-center justify-between py-4">
          {/* Logo - Brand Image */}
          <div className="flex justify-start">
            <Link to="/" className="flex items-center">
              <img
                src="/src/assets/images/logo.png"
                alt="BH Luxury Cigar Logo"
                className="h-10 w-auto"
              />
            </Link>
          </div>

          {/* Desktop Navigation & Search - Clean */}
          <div className="hidden lg:flex justify-center items-center h-10">
            {!isSearchOpen ? (
              // Navigation tabs - shown when search is closed
              <nav className="flex items-center space-x-6 lg:space-x-8 xl:space-x-10 h-full">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="text-gray-300 hover:text-amber-400 transition-colors font-medium text-sm lg:text-base whitespace-nowrap h-full flex items-center"
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            ) : (
              // Search input - shown when search is opened
              <form onSubmit={handleSearchSubmit} className="flex items-center h-full">
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Tìm kiếm sản phẩm..."
                    className="w-80 h-10 px-4 bg-gray-800 border border-gray-700 rounded-lg text-gray-300 placeholder-gray-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-sm"
                    autoFocus
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-700 rounded"
                  >
                    <HiOutlineSearch className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
                <button
                  type="button"
                  onClick={handleSearchToggle}
                  className="ml-3 p-2 hover:bg-gray-800 rounded-lg transition-colors h-10 w-10 flex items-center justify-center"
                  title="Đóng tìm kiếm"
                >
                  <HiX className="w-5 h-5 text-gray-300" />
                </button>
              </form>
            )}
          </div>

          {/* Actions - Clean & Simple */}
          <div className="flex items-center space-x-3 lg:justify-end">
            {/* Mobile Cart & User - Visible on small screens */}
            <div className="flex lg:hidden items-center space-x-2">
              <button
                onClick={handleSearchToggle}
                className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                title="Tìm kiếm"
              >
                <HiOutlineSearch className="w-5 h-5 text-gray-300" />
              </button>
              <Link
                to="/cart"
                className="relative p-2 hover:bg-gray-800 rounded-lg transition-colors"
              >
                <HiOutlineShoppingBag className="w-5 h-5 text-gray-300" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-amber-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount > 99 ? '99+' : cartCount}
                  </span>
                )}
              </Link>

              {isAuthenticated ? (
                <Link
                  to="/profile"
                  className="flex items-center space-x-1 p-2 hover:bg-gray-800 rounded-lg transition-colors"
                  title="Profile"
                >
                  <HiOutlineUser className="w-5 h-5 text-gray-300" />
                  <span className="text-xs text-gray-300 font-medium max-w-[60px] truncate">
                    {user?.first_name || user?.name || 'User'}
                  </span>
                </Link>
              ) : (
                <Link
                  to="/login"
                  className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                  title="Đăng nhập"
                >
                  <HiOutlineLogin className="w-5 h-5 text-gray-300" />
                </Link>
              )}
            </div>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center space-x-2">
              <button
                onClick={handleSearchToggle}
                className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                title="Tìm kiếm"
              >
                <HiOutlineSearch className="w-5 h-5 text-gray-300" />
              </button>
              <Link
                to="/cart"
                className="relative p-2 hover:bg-gray-800 rounded-lg transition-colors"
              >
                <HiOutlineShoppingBag className="w-5 h-5 text-gray-300" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-amber-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount > 99 ? '99+' : cartCount}
                  </span>
                )}
              </Link>

              {/* User Authentication Actions */}
              {isAuthenticated ? (
                <div className="flex items-center space-x-2">
                  {/* User Profile */}
                  <Link
                    to="/profile"
                    className="flex items-center space-x-2 px-3 py-2 hover:bg-gray-800 rounded-lg transition-colors"
                    title="Thông tin cá nhân"
                  >
                    <HiOutlineUser className="w-4 h-4 text-gray-300" />
                    <span className="text-sm text-gray-300 font-medium">
                      {user?.first_name || user?.name || 'User'}
                    </span>
                  </Link>
                  {/* Logout Button */}
                  <button
                    onClick={handleLogout}
                    className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                    title="Đăng xuất"
                  >
                    <HiOutlineLogout className="w-4 h-4 text-gray-300" />
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors text-sm font-medium"
                  title="Đăng nhập"
                >
                  Đăng nhập
                </Link>
              )}
            </div>

            {/* Mobile menu button - Clean */}
            <button
              className="lg:hidden p-2 hover:bg-gray-800 rounded-lg transition-colors"
              onClick={() => {
                setIsMenuOpen(!isMenuOpen);
                // Close search when opening menu
                if (!isMenuOpen) {
                  setIsSearchOpen(false);
                }
              }}
            >
              {isMenuOpen ? (
                <HiX className="w-5 h-5 text-gray-300" />
              ) : (
                <HiMenu className="w-5 h-5 text-gray-300" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search Overlay */}
        {isSearchOpen && (
          <div className="lg:hidden bg-gray-800 border-t border-gray-700 py-4 px-4">
            <form onSubmit={handleSearchSubmit} className="flex items-center">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Tìm kiếm sản phẩm..."
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-300 placeholder-gray-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                  autoFocus
                />
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-600 rounded"
                >
                  <HiOutlineSearch className="w-5 h-5 text-gray-400" />
                </button>
              </div>
              <button
                type="button"
                onClick={handleSearchToggle}
                className="ml-3 p-2 hover:bg-gray-700 rounded-lg transition-colors"
                title="Đóng tìm kiếm"
              >
                <HiX className="w-6 h-6 text-gray-300" />
              </button>
            </form>
          </div>
        )}

        {/* Mobile Navigation - Clean & Simple */}
        {isMenuOpen && (
          <div className="lg:hidden">
            <div className="py-4 bg-gray-800 border-t border-gray-700">
              <nav className="flex flex-col space-y-1 px-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="text-gray-300 hover:text-amber-400 transition-colors font-medium text-base py-3 px-3 rounded-lg hover:bg-gray-700"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>

              {/* User Authentication */}
              {isAuthenticated ? (
                <div className="mt-4 pt-4 border-t border-gray-700 px-4">
                  <div className="flex items-center justify-between">
                    <Link
                      to="/profile"
                      className="flex items-center text-gray-300 hover:text-amber-400 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <HiOutlineUser className="w-4 h-4 mr-3" />
                      <span className="font-medium">
                        Xin chào, {user?.first_name || user?.name || 'User'}
                      </span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                      title="Đăng xuất"
                    >
                      <HiOutlineLogout className="w-4 h-4 text-gray-300" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="mt-4 pt-4 border-t border-gray-700 px-4">
                  <Link
                    to="/login"
                    className="flex items-center text-gray-300 hover:text-amber-400 transition-colors"
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
