import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  HiOutlineSearch,
  HiOutlineShoppingBag,
  HiMenu,
  HiX,
  HiOutlineLogin,
  HiOutlineLogout,
  HiOutlineUser,
  HiOutlineEye,
} from "react-icons/hi";
import authService, { type User as AuthUser } from "../../services/auth.service";
import { useCart } from "../../contexts/CartContext";
import apiService from "../../services/api";
import { resolveImageUrl } from "../../utils/image";

type HeaderUser = Partial<AuthUser>;

interface SearchProduct {
  _id: string;
  name: string;
  price: number;
  discountedPrice?: number;
  images?: string[];
  category?: string;
  image?: string;
}

type SearchApiNestedData = {
  data?: SearchProduct[];
  products?: SearchProduct[];
};

type SearchApiResponse = SearchProduct[] | {
  data?: SearchProduct[] | SearchApiNestedData;
  products?: SearchProduct[];
};

const extractProductsFromResponse = (payload: SearchApiResponse): SearchProduct[] => {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (payload.data) {
    if (Array.isArray(payload.data)) {
      return payload.data;
    }
    if (payload.data.data && Array.isArray(payload.data.data)) {
      return payload.data.data;
    }
    if (payload.data.products && Array.isArray(payload.data.products)) {
      return payload.data.products;
    }
  }

  if (payload.products && Array.isArray(payload.products)) {
    return payload.products;
  }

  return [];
};

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [user, setUser] = useState<HeaderUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchProduct[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();
  const { cartCount } = useCart();
  const searchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const searchResultsRef = useRef<HTMLDivElement>(null);

  const navigation = [
    { name: "Trang chủ", href: "/" },
    { name: "Sản phẩm", href: "/collections" },
    { name: "Hướng dẫn", href: "/guide" },
    { name: "Tin tức", href: "/blog" },
    { name: "Về chúng tôi", href: "/about" },
  ];

  useEffect(() => {
    checkAuthStatus();
  }, []);

  // Handle search query changes with debounce
  useEffect(() => {
    if (searchQuery.trim().length > 1) {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
      searchTimeoutRef.current = setTimeout(() => {
        performSearch(searchQuery.trim());
      }, 300);
    } else {
      setSearchResults([]);
      setShowResults(false);
    }
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [searchQuery]);

  // Handle click outside to close search results
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchResultsRef.current && !searchResultsRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const checkAuthStatus = async () => {
    const isAuth = authService.isAuthenticated();
    setIsAuthenticated(isAuth);

    if (isAuth) {
      // Try API first, fallback to localStorage
      try {
        const profileResponse = await authService.getProfile();
        const profile: HeaderUser = profileResponse;
        setUser(profile);

        // Update localStorage with fresh data
        localStorage.setItem('user', JSON.stringify(profile));
        localStorage.setItem('userRole', profile?.role || 'user');
      } catch {
        // Fallback to localStorage
        const userData = localStorage.getItem('user');

        if (userData) {
          try {
            const localUser = JSON.parse(userData);
            setUser(localUser);
          } catch {
            // Don't logout immediately, just clear user data
            setUser(null);
            setIsAuthenticated(false);
          }
        } else {
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

  const performSearch = async (query: string) => {
    setIsSearching(true);
    setShowResults(true); // Always show dropdown when searching
    try {
      const response = await apiService.get<SearchApiResponse>(`/products?search=${encodeURIComponent(query)}&limit=5`);
      const products = extractProductsFromResponse(response);
      setSearchResults(products.slice(0, 5));
      setShowResults(true);
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
      setShowResults(true); // Still show dropdown with "no results" message
    } finally {
      setIsSearching(false);
    }
  };

  const handleSearchToggle = () => {
    setIsSearchOpen(!isSearchOpen);
    if (isSearchOpen) {
      setSearchQuery('');
      setSearchResults([]);
      setShowResults(false);
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
      setSearchResults([]);
      setShowResults(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price) + 'đ';
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
                src="/images/logo.png"
                alt="BH Luxury Cigar Logo"
                className="h-20 w-auto"
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
              // Search input with dropdown - shown when search is opened
              <form onSubmit={handleSearchSubmit} className="flex items-center h-full">
                <div className="relative" ref={searchResultsRef}>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => searchQuery.trim().length > 1 && searchResults.length > 0 && setShowResults(true)}
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

                  {/* Search Results Dropdown */}
                  {showResults && searchQuery.trim().length > 1 && (
                    <div className="absolute top-full mt-2 left-0 right-0 bg-white rounded-lg shadow-2xl border border-gray-200 max-h-96 overflow-y-auto z-50">
                      {isSearching ? (
                        <div className="p-4 text-center text-gray-500">
                          <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-amber-500"></div>
                          <p className="mt-2 text-sm">Đang tìm kiếm...</p>
                        </div>
                      ) : searchResults.length > 0 ? (
                        <>
                          {searchResults.map((product) => (
                            <Link
                              key={product._id}
                              to={`/products/${product._id}`}
                              className="flex items-center p-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                              onClick={() => {
                                setIsSearchOpen(false);
                                setSearchQuery('');
                                setShowResults(false);
                              }}
                            >
                              <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                                {product.images && product.images[0] ? (
                                  <img
                                    src={resolveImageUrl(product.images[0], '/images/placeholder.png')}
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                      (e.target as HTMLImageElement).src = '/images/placeholder.png';
                                    }}
                                  />
                                ) : product.image ? (
                                  <img
                                    src={resolveImageUrl(product.image, '/images/placeholder.png')}
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                      (e.target as HTMLImageElement).src = '/images/placeholder.png';
                                    }}
                                  />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center">
                                    <HiOutlineEye className="w-6 h-6 text-gray-400" />
                                  </div>
                                )}
                              </div>
                              <div className="ml-3 flex-1">
                                <h4 className="text-sm font-medium text-gray-900 line-clamp-1">{product.name}</h4>
                                <div className="flex items-center space-x-2 mt-1">
                                  {product.discountedPrice ? (
                                    <>
                                      <span className="text-sm font-semibold text-amber-600">
                                        {formatPrice(product.discountedPrice)}
                                      </span>
                                      <span className="text-xs text-gray-400 line-through">
                                        {formatPrice(product.price)}
                                      </span>
                                    </>
                                  ) : (
                                    <span className="text-sm font-semibold text-gray-900">
                                      {formatPrice(product.price)}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </Link>
                          ))}
                          <Link
                            to={`/collections?search=${encodeURIComponent(searchQuery.trim())}`}
                            className="block p-3 text-center text-sm font-medium text-amber-600 hover:bg-amber-50 border-t border-gray-200"
                            onClick={() => {
                              setIsSearchOpen(false);
                              setSearchQuery('');
                              setShowResults(false);
                            }}
                          >
                            Xem tất cả kết quả cho "{searchQuery}"
                          </Link>
                        </>
                      ) : (
                        <div className="p-8 text-center">
                          <div className="text-gray-400 mb-2">
                            <HiOutlineSearch className="w-12 h-12 mx-auto" />
                          </div>
                          <p className="text-gray-600 font-medium">Không tìm thấy sản phẩm</p>
                          <p className="text-sm text-gray-400 mt-1">Thử tìm kiếm với từ khóa khác</p>
                        </div>
                      )}
                    </div>
                  )}
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
                    {user?.name || user?.email?.split('@')[0] || 'User'}
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
                      {user?.name || user?.email?.split('@')[0] || 'User'}
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
              <div className="relative flex-1" ref={searchResultsRef}>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => searchQuery.trim().length > 1 && searchResults.length > 0 && setShowResults(true)}
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

                {/* Mobile Search Results Dropdown */}
                {showResults && searchQuery.trim().length > 1 && (
                  <div className="absolute top-full mt-2 left-0 right-0 bg-white rounded-lg shadow-2xl border border-gray-200 max-h-96 overflow-y-auto z-50">
                    {isSearching ? (
                      <div className="p-4 text-center text-gray-500">
                        <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-amber-500"></div>
                        <p className="mt-2 text-sm">Đang tìm kiếm...</p>
                      </div>
                    ) : searchResults.length > 0 ? (
                      <>
                        {searchResults.map((product) => (
                          <Link
                            key={product._id}
                            to={`/products/${product._id}`}
                            className="flex items-center p-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                            onClick={() => {
                              setIsSearchOpen(false);
                              setSearchQuery('');
                              setShowResults(false);
                              setIsMenuOpen(false);
                            }}
                          >
                            <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                              {product.images && product.images[0] ? (
                                <img
                                  src={resolveImageUrl(product.images[0], '/images/placeholder.png')}
                                  alt={product.name}
                                  className="w-full h-full object-cover"
                                  onError={(e) => {
                                    (e.target as HTMLImageElement).src = '/images/placeholder.png';
                                  }}
                                />
                              ) : product.image ? (
                                <img
                                  src={resolveImageUrl(product.image, '/images/placeholder.png')}
                                  alt={product.name}
                                  className="w-full h-full object-cover"
                                  onError={(e) => {
                                    (e.target as HTMLImageElement).src = '/images/placeholder.png';
                                  }}
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                  <HiOutlineEye className="w-6 h-6 text-gray-400" />
                                </div>
                              )}
                            </div>
                            <div className="ml-3 flex-1">
                              <h4 className="text-sm font-medium text-gray-900 line-clamp-1">{product.name}</h4>
                              <div className="flex items-center space-x-2 mt-1">
                                {product.discountedPrice ? (
                                  <>
                                    <span className="text-sm font-semibold text-amber-600">
                                      {formatPrice(product.discountedPrice)}
                                    </span>
                                    <span className="text-xs text-gray-400 line-through">
                                      {formatPrice(product.price)}
                                    </span>
                                  </>
                                ) : (
                                  <span className="text-sm font-semibold text-gray-900">
                                    {formatPrice(product.price)}
                                  </span>
                                )}
                              </div>
                            </div>
                          </Link>
                        ))}
                        <Link
                          to={`/collections?search=${encodeURIComponent(searchQuery.trim())}`}
                          className="block p-3 text-center text-sm font-medium text-amber-600 hover:bg-amber-50 border-t border-gray-200"
                          onClick={() => {
                            setIsSearchOpen(false);
                            setSearchQuery('');
                            setShowResults(false);
                            setIsMenuOpen(false);
                          }}
                        >
                          Xem tất cả kết quả cho "{searchQuery}"
                        </Link>
                      </>
                    ) : (
                      <div className="p-8 text-center">
                        <div className="text-gray-400 mb-2">
                          <HiOutlineSearch className="w-12 h-12 mx-auto" />
                        </div>
                        <p className="text-gray-600 font-medium">Không tìm thấy sản phẩm</p>
                        <p className="text-sm text-gray-400 mt-1">Thử tìm kiếm với từ khóa khác</p>
                      </div>
                    )}
                  </div>
                )}
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
                        Xin chào, {user?.name || user?.email?.split('@')[0] || 'User'}
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
