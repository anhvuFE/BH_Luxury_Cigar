import React, { useState, useEffect } from "react";
import {
  HiOutlineSearch,
  HiOutlineEye,
  HiOutlineAdjustments,
  HiOutlineShoppingBag,
} from "react-icons/hi";
import { HiChevronDown } from "react-icons/hi2";
import authService from '../services/auth.service';
import { useToast } from '../hooks/useToast';
import { API_CONFIG, API_ENDPOINTS } from '../config/api';
import { useNavigate } from 'react-router-dom';

// Types
interface Category {
  _id: string;
  id?: string;
  name: string;
  slug?: string;
  description?: string;
  image?: string;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

interface Product {
  _id: string;
  id?: string;
  name: string;
  slug?: string;
  description?: string;
  brand?: string;
  category?: Category | string;
  price: number;
  stock?: number;
  inStock?: boolean;
  image?: string;
  images?: string[];
  featured_image?: string;
  isNew?: boolean;
  is_new?: boolean;
  createdAt?: string;
  created_at?: string;
}

const NewArrivalPage: React.FC = () => {
  const { showError, showSuccess } = useToast();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("Date, new to old");
  const [showCount, setShowCount] = useState(12);
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [totalProducts, setTotalProducts] = useState(0);


  // Filter states
  const [selectedCollections, setSelectedCollections] = useState<string[]>([]);
  const [selectedVendors, setSelectedVendors] = useState<string[]>([]);
  const [selectedProductTypes, setSelectedProductTypes] = useState<string[]>(
    []
  );
  // const [priceRange, setPriceRange] = useState([0, 1282501000]);
  const [inStockOnly, setInStockOnly] = useState(false);

  // API data loading
  useEffect(() => {
    loadData();
  }, [searchQuery, sortBy, showCount]);


  const loadData = async () => {
    try {
      setLoading(true);
      await Promise.all([
        loadProducts(),
        loadCategories()
      ]);
    } catch (error) {
      console.error('Error loading data:', error);
      showError('Không thể tải dữ liệu từ API.');
      setProducts([]);
      setCategories([]);
      setTotalProducts(0);
    } finally {
      setLoading(false);
    }
  };

  const loadProducts = async () => {
    try {
      // Build query parameters
      const params = new URLSearchParams();
      if (searchQuery) params.append('search', searchQuery);
      params.append('limit', showCount.toString());
      params.append('page', '1');

      // Apply sorting
      switch (sortBy) {
        case 'Date, new to old':
          params.append('sort', '-createdAt');
          break;
        case 'Date, old to new':
          params.append('sort', 'createdAt');
          break;
        case 'Price, low to high':
          params.append('sort', 'price');
          break;
        case 'Price, high to low':
          params.append('sort', '-price');
          break;
      }

      // Filter for new arrivals (products created in last 30 days)
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      params.append('createdAt[gte]', thirtyDaysAgo.toISOString());

      const response = await authService.request(`/products?${params.toString()}`);
      const data = response.data || response;

      setProducts(data.products || data || []);
      setTotalProducts(data.total || data.length || 0);
    } catch (error) {
      console.error('Error loading products:', error);
      throw error;
    }
  };

  const loadCategories = async () => {
    try {
      const response = await authService.request('/categories');
      const data = response.data || response;
      setCategories(data.categories || data || []);
    } catch (error) {
      console.error('Error loading categories:', error);
      throw error;
    }
  };

  // Handler functions
  const handleViewProduct = (product: Product) => {
    const productSlug = product.slug || product.id;
    if (!productSlug) {
      showError('ID sản phẩm không hợp lệ');
      return;
    }
    navigate(`/products/${productSlug}`);
  };


  const handleAddToCart = async (product: Product) => {
    if (!product.id) {
      showError('ID sản phẩm không hợp lệ');
      return;
    }

    try {
      const productId = product.id;
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

  // Helper functions
  const getProductImage = (product: Product) => {
    if (product.images && product.images.length > 0) {
      const image = product.images[0];
      return image.startsWith('http') ? image : `${API_CONFIG.BASE_URL}${image}`;
    }
    if (product.image) {
      return product.image.startsWith('http') ? product.image : `${API_CONFIG.BASE_URL}${product.image}`;
    }
    if (product.featured_image) {
      return product.featured_image.startsWith('http') ? product.featured_image : `${API_CONFIG.BASE_URL}${product.featured_image}`;
    }
    return '/src/assets/images/SP/1.png'; // fallback image
  };

  const isNewProduct = (product: Product) => {
    if (product.isNew || product.is_new) return true;

    // Check if created within last 30 days
    const createdDate = new Date(product.createdAt || product.created_at || '');
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    return createdDate > thirtyDaysAgo;
  };

  // Get unique brands from products
  const getBrands = () => {
    const brands = products
      .map(product => product.brand)
      .filter((brand, index, self) => brand && self.indexOf(brand) === index)
      .map(brand => ({ name: brand, count: products.filter(p => p.brand === brand).length }));
    return brands;
  };


  const formatPrice = (price: number) => {
    return (
      new Intl.NumberFormat("vi-VN", {
        style: "decimal",
        minimumFractionDigits: 0,
      }).format(price) + "đ"
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50/30 to-white">
      {/* Banner Section */}
      <section className="relative w-full overflow-hidden">
        <img
          src="/src/assets/images/banner6.png"
          alt="New Arrival Banner"
          className="w-full h-auto object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent flex items-end justify-center pb-24 sm:pb-28 lg:pb-32"></div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Mobile Filter Toggle Button */}
        <div className="lg:hidden mb-6">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-3 bg-white px-6 py-3 rounded-2xl shadow-lg border border-amber-100 w-full justify-center hover:shadow-xl transition-all duration-300"
          >
            <HiOutlineAdjustments className="w-5 h-5 text-amber-600" />
            <span className="font-medium text-gray-700">Bộ lọc</span>
            <HiChevronDown
              className={`w-5 h-5 text-amber-600 transition-transform duration-300 ${
                showFilters ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
          {/* Sidebar Filters */}
          <div
            className={`w-full lg:w-1/4 bg-white p-4 sm:p-6 rounded-lg shadow-sm ${
              showFilters ? "block" : "hidden lg:block"
            }`}
          >
            {/* Collection Filter */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900 text-sm uppercase tracking-wide">
                  COLLECTION
                </h3>
                <HiChevronDown className="w-4 h-4 text-gray-400" />
              </div>
              <div className="space-y-2">
                {categories.map((category) => (
                  <label
                    key={category._id}
                    className="flex items-center justify-between text-sm"
                  >
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        className="mr-2 text-amber-600 border-gray-300 rounded focus:ring-amber-500"
                        checked={selectedCollections.includes(category._id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedCollections([...selectedCollections, category._id]);
                          } else {
                            setSelectedCollections(selectedCollections.filter(id => id !== category._id));
                          }
                        }}
                      />
                      <span className="text-amber-600">{category.name}</span>
                    </div>
                    <span className="text-gray-400">
                      ({products.filter(p => p.category === category._id || (typeof p.category === 'object' && p.category?._id === category._id)).length})
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Vendor Filter */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900 text-sm uppercase tracking-wide">
                  VENDOR
                </h3>
                <HiChevronDown className="w-4 h-4 text-gray-400" />
              </div>
              <div className="space-y-2">
                {getBrands().map((brand) => (
                  <label
                    key={brand.name}
                    className="flex items-center justify-between text-sm"
                  >
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        className="mr-2 text-amber-600 border-gray-300 rounded focus:ring-amber-500"
                        checked={selectedVendors.includes(brand.name || '')}
                        onChange={(e) => {
                          if (e.target.checked && brand.name) {
                            setSelectedVendors([...selectedVendors, brand.name]);
                          } else if (brand.name) {
                            setSelectedVendors(selectedVendors.filter(v => v !== brand.name));
                          }
                        }}
                      />
                      <span className="text-amber-600">{brand.name}</span>
                    </div>
                    <span className="text-gray-400">({brand.count})</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Product Type Filter */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900 text-sm uppercase tracking-wide">
                  PRODUCT TYPE
                </h3>
                <HiChevronDown className="w-4 h-4 text-gray-400" />
              </div>
              <div className="space-y-2">
                {[
                  { name: "PHU KIỆN XÌ GÀ", count: products.filter(p => p.name.toLowerCase().includes('phụ kiện') || p.name.toLowerCase().includes('phu kien')).length },
                  { name: "SINGLE MALTS", count: products.filter(p => p.name.toLowerCase().includes('single malt')).length },
                  { name: "BLENDED SCOTCH", count: products.filter(p => p.name.toLowerCase().includes('blended') || p.name.toLowerCase().includes('scotch')).length },
                  { name: "RƯỢU MẠNH", count: products.filter(p => p.name.toLowerCase().includes('rượu')).length },
                  { name: "XÌ GÀ", count: products.filter(p => p.name.toLowerCase().includes('xì gà') || p.name.toLowerCase().includes('cigar')).length },
                ].filter(type => type.count > 0).map((type) => (
                  <label
                    key={type.name}
                    className="flex items-center justify-between text-sm"
                  >
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        className="mr-2 text-amber-600 border-gray-300 rounded focus:ring-amber-500"
                        checked={selectedProductTypes.includes(type.name)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedProductTypes([...selectedProductTypes, type.name]);
                          } else {
                            setSelectedProductTypes(selectedProductTypes.filter(t => t !== type.name));
                          }
                        }}
                      />
                      <span className="text-amber-600">{type.name}</span>
                    </div>
                    <span className="text-gray-400">({type.count})</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900 text-sm uppercase tracking-wide">
                  PRICE
                </h3>
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
                <h3 className="font-semibold text-gray-900 text-sm uppercase tracking-wide">
                  AVAILABILITY
                </h3>
                <HiChevronDown className="w-4 h-4 text-gray-400" />
              </div>
              <label className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2 text-amber-600 border-gray-300 rounded focus:ring-amber-500"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                  />
                  <span className="text-amber-600">Còn hàng</span>
                </div>
                <span className="text-gray-400">({products.filter(p => p.inStock && (p.stock === undefined || p.stock > 0)).length})</span>
              </label>
            </div>
          </div>

          {/* Main Content */}
          <div className="w-full lg:w-3/4">
            {/* Page Title */}
            <div className="mb-4 sm:mb-6">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
                NEW ARRIVAL
              </h1>
              <p className="text-sm sm:text-base text-gray-600 mt-1 sm:mt-2">
                Khám phá những sản phẩm mới nhất của chúng tôi
              </p>
            </div>

            {/* Search and Sort Bar */}
            <div className="bg-white p-3 sm:p-4 rounded-lg shadow-sm mb-4 sm:mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
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
                  <span className="text-sm sm:text-base text-gray-600 font-medium">
                    {loading ? 'Đang tải...' : `${totalProducts} Sản phẩm`}
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">Show</span>
                    <select
                      value={showCount}
                      onChange={(e) => setShowCount(Number(e.target.value))}
                      className="border border-gray-300 rounded px-2 py-1 text-sm flex-1 sm:flex-none"
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
                      <option value="Price, low to high">
                        Price, low to high
                      </option>
                      <option value="Price, high to low">
                        Price, high to low
                      </option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Loading State */}
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {[...Array(6)].map((_, index) => (
                  <div key={index} className="bg-white rounded-3xl shadow-lg border border-amber-100 overflow-hidden animate-pulse">
                    <div className="h-48 sm:h-56 lg:h-64 bg-gray-200"></div>
                    <div className="p-5 sm:p-6">
                      <div className="h-4 bg-gray-200 rounded mb-2"></div>
                      <div className="h-6 bg-gray-200 rounded mb-3"></div>
                      <div className="h-8 bg-gray-200 rounded mb-4"></div>
                      <div className="h-10 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : products.length > 0 ? (
              /* Products Grid */
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-amber-100 hover:border-amber-200 overflow-hidden"
                  >
                    <div className="relative overflow-hidden">
                      {isNewProduct(product) && (
                        <div className="absolute top-4 left-4 z-10">
                          <span className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-3 py-1 text-xs font-medium rounded-full shadow-lg">
                            Mới
                          </span>
                        </div>
                      )}
                      {(!product.inStock || (product.stock !== undefined && product.stock <= 0)) && (
                        <div className="absolute top-4 right-4 z-10">
                          <span className="bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1 text-xs font-medium rounded-full shadow-lg">
                            Hết hàng
                          </span>
                        </div>
                      )}
                      <img
                        src={getProductImage(product)}
                        alt={product.name}
                        className="w-full h-48 sm:h-56 lg:h-64 object-contain bg-gradient-to-br from-gray-50 to-amber-50/30 group-hover:scale-110 transition-transform duration-700"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = '/src/assets/images/SP/1.png';
                        }}
                      />

                      {/* Hover Actions */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                        <div className="absolute bottom-4 left-4 right-4 flex justify-center space-x-3">
                          <button
                            onClick={() => handleViewProduct(product)}
                            className="bg-white/90 backdrop-blur-sm text-gray-800 p-3 rounded-full hover:bg-white hover:scale-110 transition-all duration-300 shadow-lg"
                            title="Xem chi tiết"
                          >
                            <HiOutlineEye className="w-5 h-5" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              handleAddToCart(product);
                            }}
                            className="bg-amber-600 text-white p-3 rounded-full hover:bg-amber-700 hover:scale-110 transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={!product.inStock || (product.stock !== undefined && product.stock <= 0)}
                            title="Thêm vào giỏ"
                          >
                            <HiOutlineShoppingBag className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="p-5 sm:p-6">
                      <div className="text-sm text-amber-600 font-medium mb-2 tracking-wide">
                        {product.brand || 'Không có thương hiệu'}
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-3 text-base sm:text-lg leading-snug line-clamp-2 group-hover:text-amber-700 transition-colors duration-300">
                        {product.name}
                      </h3>
                      <div className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
                        {formatPrice(product.price)}
                      </div>

                      {product.inStock && (product.stock === undefined || product.stock > 0) ? (
                        <button
                          onClick={() => handleAddToCart(product)}
                          className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white py-3 px-6 rounded-2xl text-sm font-medium hover:from-amber-600 hover:to-amber-700 hover:shadow-lg hover:scale-105 transition-all duration-300"
                        >
                          Thêm vào giỏ
                        </button>
                      ) : (
                        <button disabled className="w-full bg-gray-400 text-white py-3 px-6 rounded-2xl text-sm font-medium cursor-not-allowed">
                          Hết hàng
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* No Products State */
              <div className="text-center py-20">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <HiOutlineShoppingBag className="w-10 h-10 text-gray-400" />
                </div>
                <p className="text-gray-600 text-lg mb-6">Không tìm thấy sản phẩm mới nào</p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCollections([]);
                    setSelectedVendors([]);
                    setSelectedProductTypes([]);
                  }}
                  className="inline-block px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-lg hover:from-amber-600 hover:to-amber-700 transition-all duration-300 font-medium"
                >
                  Xóa bộ lọc
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewArrivalPage;
