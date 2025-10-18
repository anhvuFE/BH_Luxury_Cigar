import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiOutlineSearch, HiOutlineEye, HiOutlineAdjustments, HiOutlineShoppingBag } from 'react-icons/hi';
import { HiChevronDown } from 'react-icons/hi2';
import { useToast } from '../hooks/useToast';
import authService from '../services/auth.service';
import { API_ENDPOINTS } from '../config/api';

const CollectionsPage: React.FC = () => {
  const navigate = useNavigate();
  const { showError, showSuccess } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('Date, new to old');
  const [showCount, setShowCount] = useState(12);
  const [showFilters, setShowFilters] = useState(false);

  // API data states
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [vendors, setVendors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalProducts, setTotalProducts] = useState(0);


  // Filter states
  // const [selectedCollections, setSelectedCollections] = useState<string[]>([]);
  // const [selectedVendors, setSelectedVendors] = useState<string[]>([]);
  // const [selectedProductTypes, setSelectedProductTypes] = useState<string[]>([]);
  // const [priceRange, setPriceRange] = useState([0, 1282501000]);
  // const [inStockOnly, setInStockOnly] = useState(false);

  // Load data from API
  useEffect(() => {
    loadData();
  }, []);


  const loadData = async () => {
    try {
      setLoading(true);

      // Load products and categories using proper API endpoints
      const [productsResponse, categoriesResponse] = await Promise.all([
        authService.request(API_ENDPOINTS.PRODUCTS.LIST + '?limit=50'),
        authService.request(API_ENDPOINTS.CATEGORIES.LIST)
      ]);

      // Handle products response
      const productsData = Array.isArray(productsResponse) ? productsResponse :
                          productsResponse.data || productsResponse.products || [];
      setProducts(productsData);
      setTotalProducts(productsData.length);

      // Handle categories response
      const categoriesData = Array.isArray(categoriesResponse) ? categoriesResponse :
                            categoriesResponse.data || categoriesResponse.categories || [];
      setCategories(categoriesData);

      // Extract unique vendors from products
      const uniqueVendors = [...new Set(productsData.map(p => p.brand || p.vendor).filter(Boolean))];
      setVendors(uniqueVendors.map(vendor => ({ name: vendor, count: productsData.filter(p => (p.brand || p.vendor) === vendor).length })));

    } catch (error) {
      console.error('Error loading data:', error);
      showError('Không thể tải dữ liệu từ API.');
      setProducts([]);
      setCategories([]);
      setVendors([]);
      setTotalProducts(0);
    } finally {
      setLoading(false);
    }
  };

  // Add to cart function
  const handleAddToCart = async (productId) => {
    try {
      await authService.request(API_ENDPOINTS.CART.ADD_ITEM, {
        method: 'POST',
        body: JSON.stringify({
          product_id: productId,
          quantity: 1
        })
      });
      showSuccess('Đã thêm vào giỏ hàng!');
    } catch (error) {
      console.error('Error adding to cart:', error);
      showError('Không thể thêm vào giỏ hàng');
    }
  };


  // All data now comes from API - no more mock data needed

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'decimal',
      minimumFractionDigits: 0
    }).format(price) + 'đ';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50/30 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Page Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light text-gray-900 mb-4">
            Bộ Sưu Tập <span className="font-bold text-amber-600">Đặc Biệt</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Khám phá những sản phẩm tinh túy được tuyển chọn từ các thương hiệu danh tiếng nhất thế giới
          </p>
        </div>

        {/* Mobile Filter Toggle Button */}
        <div className="lg:hidden mb-6">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-3 bg-white px-6 py-3 rounded-2xl shadow-lg border border-amber-100 w-full justify-center hover:shadow-xl transition-all duration-300"
          >
            <HiOutlineAdjustments className="w-5 h-5 text-amber-600" />
            <span className="font-medium text-gray-700">Bộ lọc</span>
            <HiChevronDown className={`w-5 h-5 text-amber-600 transition-transform duration-300 ${showFilters ? 'rotate-180' : ''}`} />
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
          {/* Sidebar Filters */}
          <div className={`w-full lg:w-1/4 bg-white p-6 sm:p-8 rounded-3xl shadow-lg border border-amber-100 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            {/* Collection Filter */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900 text-sm uppercase tracking-wide">COLLECTION</h3>
                <HiChevronDown className="w-4 h-4 text-gray-400" />
              </div>
              <div className="space-y-2">
                {categories.map((category, index) => (
                  <label key={index} className="flex items-center justify-between text-sm">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        className="mr-2 text-amber-600 border-gray-300 rounded focus:ring-amber-500"
                      />
                      <span className="text-amber-600">{category.name}</span>
                    </div>
                    <span className="text-gray-400">({category.product_count || 0})</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Vendor Filter */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900 text-sm uppercase tracking-wide">VENDOR</h3>
                <HiChevronDown className="w-4 h-4 text-gray-400" />
              </div>
              <div className="space-y-2">
                {vendors.map((vendor, index) => (
                  <label key={index} className="flex items-center justify-between text-sm">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        className="mr-2 text-amber-600 border-gray-300 rounded focus:ring-amber-500"
                      />
                      <span className="text-amber-600">{vendor.name}</span>
                    </div>
                    <span className="text-gray-400">({vendor.count})</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Product Type Filter */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900 text-sm uppercase tracking-wide">PRODUCT TYPE</h3>
                <HiChevronDown className="w-4 h-4 text-gray-400" />
              </div>
              <div className="space-y-2">
                {categories.map((type, index) => (
                  <label key={`type-${index}`} className="flex items-center justify-between text-sm">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        className="mr-2 text-amber-600 border-gray-300 rounded focus:ring-amber-500"
                      />
                      <span className="text-amber-600">{type.name}</span>
                    </div>
                    <span className="text-gray-400">({type.product_count || 0})</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900 text-sm uppercase tracking-wide">PRICE</h3>
                <HiChevronDown className="w-4 h-4 text-gray-400" />
              </div>
              <div className="space-y-4">
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                  />
                  <span className="px-2 py-2 text-gray-500">-</span>
                  <input
                    type="number"
                    placeholder="1,282,501,000"
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                  />
                </div>
                <div className="relative">
                  <input
                    type="range"
                    min="0"
                    max="1282501000"
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>0đ</span>
                  <span>1,282,501,000đ</span>
                </div>
              </div>
            </div>

            {/* Availability Filter */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900 text-sm uppercase tracking-wide">AVAILABILITY</h3>
                <HiChevronDown className="w-4 h-4 text-gray-400" />
              </div>
              <label className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2 text-amber-600 border-gray-300 rounded focus:ring-amber-500"
                  />
                  <span className="text-amber-600">In Stock</span>
                </div>
                <span className="text-gray-400">({totalProducts})</span>
              </label>
            </div>
          </div>

          {/* Main Content */}
          <div className="w-full lg:w-3/4">
            {/* Search and Sort Bar */}
            <div className="bg-white p-4 rounded-lg shadow-sm mb-4 sm:mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="relative">
                    <HiOutlineSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search products"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full sm:w-64 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                  <span className="text-gray-600 font-medium text-sm sm:text-base">Sản phẩm</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">Show</span>
                    <select
                      value={showCount}
                      onChange={(e) => setShowCount(Number(e.target.value))}
                      className="border border-gray-300 rounded px-2 py-1 text-sm"
                    >
                      <option value={12}>12</option>
                      <option value={24}>24</option>
                      <option value={48}>48</option>
                    </select>
                  </div>
                  <div className="flex items-center gap-2">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="border border-gray-300 rounded px-3 py-2 text-sm w-full sm:w-auto"
                    >
                      <option value="Date, new to old">Date, new to old</option>
                      <option value="Date, old to new">Date, old to new</option>
                      <option value="Price, low to high">Price, low to high</option>
                      <option value="Price, high to low">Price, high to low</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
                {[...Array(6)].map((_, index) => (
                  <div key={index} className="bg-white rounded-3xl shadow-lg border border-amber-100 overflow-hidden animate-pulse">
                    <div className="w-full h-48 sm:h-56 lg:h-64 bg-gray-300"></div>
                    <div className="p-5 sm:p-6">
                      <div className="h-4 bg-gray-300 rounded mb-2"></div>
                      <div className="h-6 bg-gray-300 rounded mb-3"></div>
                      <div className="h-8 bg-gray-300 rounded mb-4"></div>
                      <div className="h-10 bg-gray-300 rounded"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
                {products.map((product) => (
                <div key={product.id} className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-amber-100 hover:border-amber-200 overflow-hidden">
                  <div className="relative overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 sm:h-56 lg:h-64 object-contain bg-gradient-to-br from-gray-50 to-amber-50/30 group-hover:scale-110 transition-transform duration-700"
                    />

                    {/* Hover Actions */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                      <div className="absolute bottom-4 left-4 right-4 flex justify-center space-x-3">
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            if (!product.id) {
                              showError('ID sản phẩm không hợp lệ');
                              return;
                            }
                            navigate(`/products/${product.id}`);
                          }}
                          className="bg-white/90 backdrop-blur-sm text-gray-800 p-3 rounded-full hover:bg-white hover:scale-110 transition-all duration-300 shadow-lg"
                        >
                          <HiOutlineEye className="w-5 h-5" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleAddToCart(product.id);
                          }}
                          className="bg-amber-600 text-white p-3 rounded-full hover:bg-amber-700 hover:scale-110 transition-all duration-300 shadow-lg"
                        >
                          <HiOutlineShoppingBag className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 sm:p-6">
                    <div className="text-sm text-amber-600 font-medium mb-2 tracking-wide">{product.brand || product.vendor}</div>
                    <h3 className="font-semibold text-gray-900 mb-3 text-base sm:text-lg leading-snug line-clamp-2 group-hover:text-amber-700 transition-colors duration-300">
                      {product.name}
                    </h3>
                    <div className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
                      {formatPrice(product.price)}
                    </div>

                    <button
                      onClick={() => handleAddToCart(product.id)}
                      className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white py-3 px-6 rounded-2xl text-sm font-medium hover:from-amber-600 hover:to-amber-700 hover:shadow-lg hover:scale-105 transition-all duration-300"
                    >
                      Thêm vào giỏ
                    </button>
                  </div>
                </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionsPage;