import React, { useState } from 'react';
import { HiOutlineSearch, HiOutlineEye, HiOutlineAdjustments, HiOutlineHeart, HiOutlineShoppingBag } from 'react-icons/hi';
import { HiChevronDown } from 'react-icons/hi2';

const CollectionsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('Date, new to old');
  const [showCount, setShowCount] = useState(12);
  const [showFilters, setShowFilters] = useState(false);

  // Filter states
  const [selectedCollections, setSelectedCollections] = useState<string[]>([]);
  const [selectedVendors, setSelectedVendors] = useState<string[]>([]);
  const [selectedProductTypes, setSelectedProductTypes] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 1282501000]);
  const [inStockOnly, setInStockOnly] = useState(false);

  // Mock data based on reference
  const collections = [
    { name: 'Trang Chủ', count: 104 },
    { name: 'Whisky - Rượu Whisky', count: 95 },
    { name: 'Rượu Mạnh', count: 15 },
    { name: 'Phụ Kiện Xì Gà', count: 502 },
    { name: 'Vodka', count: 1 },
    { name: 'RUM', count: 4 },
    { name: 'Single Malts', count: 63 },
    { name: 'Blended Scotch', count: 17 }
  ];

  const vendors = [
    { name: 'AVANTI EXCLUSIVE', count: 4 },
    { name: 'Auchroisk', count: 1 },
    { name: 'BOVEDA', count: 10 },
    { name: 'Benrinnes', count: 1 },
    { name: 'Brora', count: 1 },
    { name: 'Bulleit', count: 1 },
    { name: 'CHAN DE ROSAS', count: 3 },
    { name: 'CLYNELISH', count: 3 }
  ];

  const productTypes = [
    { name: 'ACCESSORIES', count: 789 },
    { name: 'Humidors', count: 25 },
    { name: 'JW Whisky', count: 9 },
    { name: 'LIQUOR & SPIRITS', count: 7 },
    { name: 'LIQUORS-SPIRITS', count: 104 },
    { name: 'OTHER WHISKY', count: 2 },
    { name: 'PREMIUM WHISKY', count: 4 },
    { name: 'RUM', count: 1 },
    { name: 'TEQUILA', count: 2 },
    { name: 'WINES', count: 29 }
  ];

  // Mock products data
  const mockProducts = [
    {
      id: 1,
      name: 'RƯỢU MORTLACH SINGLE MALT SCOTCH WHISKY BECOME STARCK 55.4% 700ML',
      brand: 'Mortlach',
      price: 11000000,
      image: '/src/assets/images/PR/1.png'
    },
    {
      id: 2,
      name: 'BÚT LỬA CHĂM XÌ GÀ S.T. DUPONT SLIMMY | 028224',
      brand: 'S.T. DUPONT',
      price: 10494000,
      image: '/src/assets/images/PR/2.png'
    },
    {
      id: 3,
      name: 'BÚT LỬA CHĂM XÌ GÀ S.T. DUPONT MONOGRAM 1872 LE GRAND | C23180',
      brand: 'S.T. DUPONT',
      price: 49291000,
      image: '/src/assets/images/PR/3.png'
    },
    {
      id: 4,
      name: 'BÚT LỬA CHĂM XÌ GÀ S.T. DUPONT LIGNE 2 CNY SNAKE SKIN | C16078',
      brand: 'S.T. DUPONT',
      price: 46112000,
      image: '/src/assets/images/PR/4.png'
    },
    {
      id: 5,
      name: 'BÚT LỬA CHĂM XÌ GÀ S.T. DUPONT MONOGRAM 1872 LE GRAND | C23179',
      brand: 'S.T. DUPONT',
      price: 50875000,
      image: '/src/assets/images/PR/5.png'
    },
    {
      id: 6,
      name: 'BÚT LỬA CHĂM XÌ GÀ S.T. DUPONT BEHIKE LE GRAND | C23003CL',
      brand: 'S.T. DUPONT',
      price: 57244000,
      image: '/src/assets/images/PR/6.png'
    },
    {
      id: 7,
      name: 'GẠT TÀN XÌ GÀ BẰNG GỐM FLOR DE CASTILLO SNAKE ASHTRAY',
      brand: 'FLOR DE CASTILLO',
      price: 3348000,
      image: '/src/assets/images/PK/3.png'
    },
    {
      id: 8,
      name: 'GẠT TÀN XÌ GÀ BẰNG GỐM FLOR DE CASTILLO ART ASHTRAY',
      brand: 'FLOR DE CASTILLO',
      price: 3348000,
      image: '/src/assets/images/PK/4.png'
    },
    {
      id: 9,
      name: 'GẠT TÀN GỐM S.T. DUPONT FENDER | 006425',
      brand: 'S.T. DUPONT',
      price: 13996800,
      image: '/src/assets/images/PK/5.png'
    }
  ];

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
                {collections.map((collection, index) => (
                  <label key={index} className="flex items-center justify-between text-sm">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        className="mr-2 text-amber-600 border-gray-300 rounded focus:ring-amber-500"
                      />
                      <span className="text-amber-600">{collection.name}</span>
                    </div>
                    <span className="text-gray-400">({collection.count})</span>
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
                {productTypes.map((type, index) => (
                  <label key={index} className="flex items-center justify-between text-sm">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        className="mr-2 text-amber-600 border-gray-300 rounded focus:ring-amber-500"
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
                <span className="text-gray-400">(973)</span>
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
                  <span className="text-gray-600 font-medium text-sm sm:text-base">973 Products</span>
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
              {mockProducts.map((product) => (
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
                        <button className="bg-white/90 backdrop-blur-sm text-gray-800 p-3 rounded-full hover:bg-white hover:scale-110 transition-all duration-300 shadow-lg">
                          <HiOutlineEye className="w-5 h-5" />
                        </button>
                        <button className="bg-white/90 backdrop-blur-sm text-gray-800 p-3 rounded-full hover:bg-white hover:scale-110 transition-all duration-300 shadow-lg">
                          <HiOutlineHeart className="w-5 h-5" />
                        </button>
                        <button className="bg-amber-600 text-white p-3 rounded-full hover:bg-amber-700 hover:scale-110 transition-all duration-300 shadow-lg">
                          <HiOutlineShoppingBag className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 sm:p-6">
                    <div className="text-sm text-amber-600 font-medium mb-2 tracking-wide">{product.brand}</div>
                    <h3 className="font-semibold text-gray-900 mb-3 text-base sm:text-lg leading-snug line-clamp-2 group-hover:text-amber-700 transition-colors duration-300">
                      {product.name}
                    </h3>
                    <div className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
                      {formatPrice(product.price)}
                    </div>

                    <button className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white py-3 px-6 rounded-2xl text-sm font-medium hover:from-amber-600 hover:to-amber-700 hover:shadow-lg hover:scale-105 transition-all duration-300">
                      Thêm vào giỏ
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionsPage;