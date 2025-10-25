import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiOutlineSearch, HiOutlineEye, HiOutlineAdjustments, HiOutlineShoppingBag } from 'react-icons/hi';
import { HiChevronDown } from 'react-icons/hi2';
import { useCart } from '../contexts/CartContext';
import { useToast } from '../hooks/useToast';
import { usePagination } from '../hooks/usePagination';
import Pagination from '../components/common/Pagination';
import Select from '../components/common/Select';
import { API_ENDPOINTS, API_CONFIG } from '../config/api';
import axios from 'axios';
import { resolveImageUrl } from '../utils/image';

const CollectionsPage: React.FC = () => {
  const navigate = useNavigate();
  const { addToCart, loading: cartLoading } = useCart();
  const { showError } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('Date, new to old');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000000]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100000000);
  const [inStockOnly, setInStockOnly] = useState(false);

  // Define interfaces for type safety
  interface Product {
    id: string;
    name: string;
    slug: string;
    price: number;
    original_price?: number;
    featured_image?: string;
    image?: string;
    category?: {
      id: string;
      name: string;
    };
    stock_quantity?: number;
    brand?: string;
    vendor?: string;
  }

  interface Category {
    id: string;
    name: string;
    slug: string;
  }

  // API data states
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [paginationLoading, setPaginationLoading] = useState(false);

  // Pagination
  const pagination = usePagination({
    initialLimit: 9
  });


  // Filter states
  // const [selectedCollections, setSelectedCollections] = useState<string[]>([]);
  // const [selectedVendors, setSelectedVendors] = useState<string[]>([]);
  // const [selectedProductTypes, setSelectedProductTypes] = useState<string[]>([]);
  // const [priceRange, setPriceRange] = useState([0, 1282501000]);
  // const [inStockOnly, setInStockOnly] = useState(false);

  // Load data from API
  useEffect(() => {
    loadCategories();
    loadAllProductsForPriceRange(); // Load all products to get price range
    loadProducts(1, 9); // Load first page
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);  // loadProducts is intentionally not included

  // Debounced filter function
  const debouncedFilter = useCallback(() => {
    const timeoutId = setTimeout(() => {
      pagination.setPage(1); // Reset to page 1 when search/sort/filter changes
      loadProducts(1, pagination.limit, selectedCategories, true);
    }, 300); // 300ms delay

    return () => clearTimeout(timeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, sortBy, selectedCategories, priceRange, inStockOnly, pagination.limit]);

  // Load products with search, sorting, and filtering (debounced for price range)
  useEffect(() => {
    const cleanup = debouncedFilter();
    return cleanup;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, sortBy, selectedCategories, priceRange, inStockOnly]);  // Re-run when filters change

  // Load products when pagination changes
  useEffect(() => {
    loadProducts(pagination.currentPage, pagination.limit);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination.currentPage, pagination.limit]);  // loadProducts is intentionally not included


  const loadProducts = async (page: number = 1, limit: number = 9, categories?: string[], isFilter = false) => {
    try {
      // Smart loading states:
      // - First load: show main loading
      // - Pagination: show pagination loading
      // - Filter: no loading state (instant)
      if (page === 1 && pagination.currentPage === 1 && !isFilter) {
        setLoading(true);
      } else if (!isFilter) {
        setPaginationLoading(true);
      }

      // Build query parameters
      const params = new URLSearchParams();
      params.append('page', page.toString());
      params.append('limit', limit.toString());

      if (searchQuery) {
        params.append('search', searchQuery);
      }

      // Add category filter
      const categoriesToUse = categories || selectedCategories;
      if (categoriesToUse.length > 0) {
        params.append('category', categoriesToUse.join(','));
      }

      // Add price range filter
      if (priceRange[0] > 0 || priceRange[1] < maxPrice) {
        params.append('minPrice', priceRange[0].toString());
        params.append('maxPrice', priceRange[1].toString());
      }

      // Add in stock filter
      if (inStockOnly) {
        params.append('inStock', 'true');
      }

      // Add sorting
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
        case 'Alphabetical, A-Z':
          params.append('sort', 'name');
          break;
        case 'Alphabetical, Z-A':
          params.append('sort', '-name');
          break;
      }

      // Use axios directly to get full response including pagination info
      const apiUrl = `${API_CONFIG.BASE_URL}${API_CONFIG.BASE_PATH}${API_ENDPOINTS.PRODUCTS.LIST}?${params.toString()}`;
      const response = await axios.get(apiUrl);

      // Handle response structure
      const responseData = response.data;
      const productsData = Array.isArray(responseData) ? responseData :
                          (responseData.data || responseData.products || []);
      const total = responseData.total || responseData.totalItems || productsData.length;

      setProducts(productsData);
      pagination.setTotalItems(total);

      // Don't recalculate price range here, it's already set from all products




    } catch (error) {
      console.error('Error loading products:', error);
      showError('Không thể tải dữ liệu sản phẩm');
      setProducts([]);
      pagination.setTotalItems(0);
    } finally {
      setLoading(false);
      if (!isFilter) {
        setPaginationLoading(false);
      }
    }
  };

  const loadCategories = async () => {
    try {
      const response = await axios.get(`${API_CONFIG.BASE_URL}${API_CONFIG.BASE_PATH}${API_ENDPOINTS.CATEGORIES.LIST}`);
      const responseData = response.data;
      const categoriesData = Array.isArray(responseData) ? responseData :
                            responseData.data || responseData.categories || [];

      setCategories(categoriesData);
    } catch (error) {
      console.error('Error loading categories:', error);
      setCategories([]);
    }
  };

  // Load all products just to get price range
  const loadAllProductsForPriceRange = async () => {
    try {
      const response = await axios.get(`${API_CONFIG.BASE_URL}${API_CONFIG.BASE_PATH}${API_ENDPOINTS.PRODUCTS.LIST}?limit=1000`);
      const responseData = response.data;
      const allProducts = Array.isArray(responseData) ? responseData :
                         (responseData.data || responseData.products || []);

      if (allProducts.length > 0) {
        const prices = allProducts.map((p: Product) => p.price || 0).filter(p => p > 0);
        if (prices.length > 0) {
          const minP = Math.floor(Math.min(...prices));
          const maxP = Math.ceil(Math.max(...prices));
          setMinPrice(minP);
          setMaxPrice(maxP);
          setPriceRange([minP, maxP]);
        }
      }
    } catch (error) {
      console.error('Error loading products for price range:', error);
    }
  };

  // Add to cart function
  const handleAddToCart = async (product: Product) => {
    if (!product || !product.id) return;
    await addToCart(product.id, 1, product);
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
          <div className={`w-full lg:w-1/4 h-fit bg-white p-6 sm:p-8 rounded-3xl shadow-lg border border-amber-100 ${showFilters ? 'block' : 'hidden lg:block'}`}>
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
                        checked={selectedCategories.includes(category.name)}
                        onChange={(e) => {
                          let newCategories;
                          if (e.target.checked) {
                            newCategories = [...selectedCategories, category.name];
                          } else {
                            newCategories = selectedCategories.filter(cat => cat !== category.name);
                          }
                          setSelectedCategories(newCategories);

                          // Instant filter - no loading effect
                          loadProducts(1, pagination.limit, newCategories, true);
                        }}
                        className="mr-2 text-amber-600 border-gray-300 rounded focus:ring-amber-500"
                      />
                      <span className="text-amber-600">{category.name}</span>
                    </div>
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
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                    min={minPrice}
                    max={maxPrice}
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                  />
                  <span className="px-2 py-2 text-gray-500">-</span>
                  <input
                    type="number"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                    min={minPrice}
                    max={maxPrice}
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                  />
                </div>
                <div className="relative">
                  <div className="mb-2">
                    <label className="text-xs text-gray-600 mb-1 block">Giá từ:</label>
                    <input
                      type="range"
                      min={minPrice}
                      max={maxPrice}
                      value={priceRange[0]}
                      onChange={(e) => {
                        const newMinPrice = Number(e.target.value);
                        // Ensure minPrice doesn't exceed maxPrice
                        if (newMinPrice <= priceRange[1]) {
                          setPriceRange([newMinPrice, priceRange[1]]);
                        }
                      }}
                      onMouseUp={() => {
                        // Trigger filter immediately on mouse release
                        loadProducts(1, pagination.limit, selectedCategories, true);
                      }}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-thumb"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-600 mb-1 block">Giá đến:</label>
                    <input
                      type="range"
                      min={minPrice}
                      max={maxPrice}
                      value={priceRange[1]}
                      onChange={(e) => {
                        const newMaxPrice = Number(e.target.value);
                        // Ensure maxPrice doesn't go below minPrice
                        if (newMaxPrice >= priceRange[0]) {
                          setPriceRange([priceRange[0], newMaxPrice]);
                        }
                      }}
                      onMouseUp={() => {
                        // Trigger filter immediately on mouse release
                        loadProducts(1, pagination.limit, selectedCategories, true);
                      }}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-thumb"
                    />
                  </div>
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>{minPrice.toLocaleString('vi-VN')}đ</span>
                  <span>{maxPrice.toLocaleString('vi-VN')}đ</span>
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
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                    className="mr-2 text-amber-600 border-gray-300 rounded focus:ring-amber-500"
                  />
                  <span className="text-amber-600">In Stock</span>
                </div>
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
                    <div className="w-20">
                      <Select
                        value={pagination.limit}
                        onChange={(value) => pagination.setLimit(Number(value))}
                        options={[
                          { value: 9, label: '9' },
                          { value: 12, label: '12' },
                          { value: 24, label: '24' }
                        ]}
                        size="sm"
                        variant="default"
                        className="border-amber-200 hover:border-amber-300 focus:border-amber-500"
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-full sm:w-48">
                      <Select
                        value={sortBy}
                        onChange={(value) => setSortBy(value as string)}
                        options={[
                          { value: 'Date, new to old', label: 'Mới nhất' },
                          { value: 'Date, old to new', label: 'Cũ nhất' },
                          { value: 'Price, low to high', label: 'Giá: Thấp → Cao' },
                          { value: 'Price, high to low', label: 'Giá: Cao → Thấp' }
                        ]}
                        size="md"
                        variant="default"
                        className="border-amber-200 hover:border-amber-300 focus:border-amber-500"
                      />
                    </div>
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
                <div key={product.id} className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border-0 overflow-hidden h-full flex flex-col transform hover:-translate-y-1">
                  <div className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                    <img
                      src={resolveImageUrl(
                        product.image || product.featured_image,
                        '/assets/images/placeholder.png'
                      )}
                      alt={product.name}
                      loading="lazy"
                      className="w-full h-48 sm:h-56 lg:h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/assets/images/placeholder.png';
                      }}
                    />

                    {/* Quick Actions */}
                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="flex space-x-2">
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
                          className="bg-white/90 backdrop-blur-sm text-gray-700 p-2 rounded-lg hover:bg-white hover:scale-105 transition-all duration-200 shadow-md"
                        >
                          <HiOutlineEye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleAddToCart(product);
                          }}
                          disabled={cartLoading}
                          className="bg-amber-500 text-white p-2 rounded-lg hover:bg-amber-600 hover:scale-105 transition-all duration-200 shadow-md disabled:opacity-50"
                        >
                          <HiOutlineShoppingBag className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 flex-1 flex flex-col">
                    <div className="text-xs text-amber-600 font-semibold mb-2 uppercase tracking-wider">{product.brand || product.vendor}</div>
                    <h3 className="font-bold text-gray-900 mb-3 text-sm leading-tight line-clamp-2 group-hover:text-amber-600 transition-colors duration-200 flex-1">
                      {product.name}
                    </h3>
                    <div className="flex items-center justify-between mb-3">
                      <div className="text-lg font-bold text-gray-900">
                        {formatPrice(product.price)}
                      </div>
                      <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                        Còn hàng
                      </div>
                    </div>

                    <button
                      onClick={() => handleAddToCart(product)}
                      disabled={cartLoading}
                      className="w-full bg-amber-500 text-white py-2.5 px-4 rounded-xl text-sm font-semibold hover:bg-amber-600 transition-colors duration-200 disabled:opacity-50 mt-auto"
                    >
                      Thêm vào giỏ
                    </button>
                  </div>
                </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            {!loading && pagination.totalItems > 0 && (
              <Pagination
                currentPage={pagination.currentPage}
                totalPages={pagination.totalPages}
                totalItems={pagination.totalItems}
                itemsPerPage={pagination.limit}
                onPageChange={pagination.setPage}
                loading={paginationLoading}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionsPage;
