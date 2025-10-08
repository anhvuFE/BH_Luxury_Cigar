import React, { useState } from 'react';
import { FaSearch, FaEye } from 'react-icons/fa';
import { MdKeyboardArrowDown } from 'react-icons/md';

const CollectionsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('Date, new to old');
  const [showCount, setShowCount] = useState(12);

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
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <div className="w-1/4 bg-white p-6 rounded-lg shadow-sm">
            {/* Collection Filter */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900 text-sm uppercase tracking-wide">COLLECTION</h3>
                <MdKeyboardArrowDown className="w-4 h-4 text-gray-400" />
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
                <MdKeyboardArrowDown className="w-4 h-4 text-gray-400" />
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
                <MdKeyboardArrowDown className="w-4 h-4 text-gray-400" />
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
                <MdKeyboardArrowDown className="w-4 h-4 text-gray-400" />
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
                <MdKeyboardArrowDown className="w-4 h-4 text-gray-400" />
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
          <div className="w-3/4">
            {/* Search and Sort Bar */}
            <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search products"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-64 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                  <span className="text-gray-600 font-medium">973 Products</span>
                </div>
                <div className="flex items-center gap-4">
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
                      className="border border-gray-300 rounded px-3 py-2 text-sm"
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {mockProducts.map((product) => (
                <div key={product.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 group">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-contain bg-gray-50 transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <div className="text-sm text-gray-500 mb-1">{product.brand}</div>
                    <h3 className="font-semibold text-gray-900 mb-2 text-sm leading-tight">
                      {product.name}
                    </h3>
                    <div className="text-lg font-bold text-gray-900 mb-3">
                      {formatPrice(product.price)}
                    </div>
                    <div className="flex gap-2">
                      <button className="flex-1 bg-gray-800 text-white py-2 px-4 rounded text-sm hover:bg-gray-700 transition-colors">
                        ADD TO CART
                      </button>
                      <button className="p-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors">
                        <FaEye className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
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