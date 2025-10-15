import React, { useState } from "react";
import {
  HiOutlineSearch,
  HiOutlineEye,
  HiOutlineAdjustments,
  HiOutlineHeart,
  HiOutlineShoppingBag,
} from "react-icons/hi";
import { HiChevronDown } from "react-icons/hi2";

const NewArrivalPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("Date, new to old");
  const [showCount, setShowCount] = useState(12);
  const [showFilters, setShowFilters] = useState(false);

  // Filter states
  const [selectedCollections, setSelectedCollections] = useState<string[]>([]);
  const [selectedVendors, setSelectedVendors] = useState<string[]>([]);
  const [selectedProductTypes, setSelectedProductTypes] = useState<string[]>(
    []
  );
  const [priceRange, setPriceRange] = useState([0, 1282501000]);
  const [inStockOnly, setInStockOnly] = useState(false);

  // Mock data based on reference
  const collections = [
    { name: "Trang Chủ", count: 104 },
    { name: "Whisky - Rượu Whisky", count: 95 },
    { name: "Rượu Mạnh", count: 15 },
    { name: "Phụ Kiện Xì Gà", count: 502 },
    { name: "Vodka", count: 1 },
    { name: "RUM", count: 4 },
    { name: "Single Malts", count: 63 },
    { name: "Blended Scotch", count: 17 },
  ];

  const vendors = [
    { name: "AVANTI EXCLUSIVE", count: 4 },
    { name: "Auchroisk", count: 1 },
    { name: "BOVEDA", count: 10 },
    { name: "Benrinnes", count: 1 },
    { name: "Brora", count: 1 },
    { name: "Bulleit", count: 1 },
    { name: "CHAN DE ROSAS", count: 3 },
    { name: "CLYNELISH", count: 3 },
  ];

  const productTypes = [
    { name: "ACCESSORIES", count: 789 },
    { name: "Humidors", count: 25 },
    { name: "JW Whisky", count: 9 },
    { name: "LIQUOR & SPIRITS", count: 7 },
    { name: "LIQUORS-SPIRITS", count: 104 },
    { name: "OTHER WHISKY", count: 2 },
    { name: "PREMIUM WHISKY", count: 4 },
    { name: "RUM", count: 1 },
    { name: "TEQUILA", count: 2 },
    { name: "WINES", count: 29 },
  ];

  // Mock products data - New Arrivals
  const mockProducts = [
    {
      id: 1,
      name: "COHIBA BEHIKE 52 - HỘP 10 ĐIẾU",
      brand: "COHIBA",
      price: 45000000,
      image: "/src/assets/images/SP/1.png",
      isNew: true,
    },
    {
      id: 2,
      name: "MONTECRISTO OPEN EAGLE - HỘP 20 ĐIẾU",
      brand: "MONTECRISTO",
      price: 12500000,
      image: "/src/assets/images/SP/2.png",
      isNew: true,
    },
    {
      id: 3,
      name: "DAVIDOFF WINSTON CHURCHILL THE LATE HOUR",
      brand: "DAVIDOFF",
      price: 18900000,
      image: "/src/assets/images/SP/3.png",
      isNew: true,
    },
    {
      id: 4,
      name: "ROMEO Y JULIETA WIDE CHURCHILL",
      brand: "ROMEO Y JULIETA",
      price: 8500000,
      image: "/src/assets/images/SP/4.png",
      isNew: true,
    },
    {
      id: 5,
      name: "PARTAGAS SERIE D NO.4",
      brand: "PARTAGAS",
      price: 7200000,
      image: "/src/assets/images/SP/5.png",
      isNew: true,
    },
    {
      id: 6,
      name: "H.UPMANN MAGNUM 54",
      brand: "H.UPMANN",
      price: 9800000,
      image: "/src/assets/images/PR/1.png",
      isNew: true,
    },
    {
      id: 7,
      name: "HOYO DE MONTERREY EPICURE NO.2",
      brand: "HOYO DE MONTERREY",
      price: 6500000,
      image: "/src/assets/images/PR/2.png",
      isNew: true,
    },
    {
      id: 8,
      name: "TRINIDAD VIGIA",
      brand: "TRINIDAD",
      price: 15000000,
      image: "/src/assets/images/PR/3.png",
      isNew: true,
    },
    {
      id: 9,
      name: "BOLIVAR ROYAL CORONAS",
      brand: "BOLIVAR",
      price: 5800000,
      image: "/src/assets/images/PR/4.png",
      isNew: true,
    },
    {
      id: 10,
      name: "PUNCH PUNCH 48",
      brand: "PUNCH",
      price: 11200000,
      image: "/src/assets/images/PR/5.png",
      isNew: true,
    },
    {
      id: 11,
      name: "VEGAS ROBAINA UNICOS",
      brand: "VEGAS ROBAINA",
      price: 13500000,
      image: "/src/assets/images/PR/6.png",
      isNew: true,
    },
    {
      id: 12,
      name: "JUAN LOPEZ SELECCION NO.2",
      brand: "JUAN LOPEZ",
      price: 4800000,
      image: "/src/assets/images/PK/1.png",
      isNew: true,
    },
  ];

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
                {collections.map((collection, index) => (
                  <label
                    key={index}
                    className="flex items-center justify-between text-sm"
                  >
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
                <h3 className="font-semibold text-gray-900 text-sm uppercase tracking-wide">
                  VENDOR
                </h3>
                <HiChevronDown className="w-4 h-4 text-gray-400" />
              </div>
              <div className="space-y-2">
                {vendors.map((vendor, index) => (
                  <label
                    key={index}
                    className="flex items-center justify-between text-sm"
                  >
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
                <h3 className="font-semibold text-gray-900 text-sm uppercase tracking-wide">
                  PRODUCT TYPE
                </h3>
                <HiChevronDown className="w-4 h-4 text-gray-400" />
              </div>
              <div className="space-y-2">
                {productTypes.map((type, index) => (
                  <label
                    key={index}
                    className="flex items-center justify-between text-sm"
                  >
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
                  />
                  <span className="text-amber-600">In Stock</span>
                </div>
                <span className="text-gray-400">(973)</span>
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
                    12 Products
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

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {mockProducts.map((product) => (
                <div
                  key={product.id}
                  className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-amber-100 hover:border-amber-200 overflow-hidden"
                >
                  <div className="relative overflow-hidden">
                    {product.isNew && (
                      <div className="absolute top-4 left-4 z-10">
                        <span className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-3 py-1 text-xs font-medium rounded-full shadow-lg">
                          Mới
                        </span>
                      </div>
                    )}
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
                    <div className="text-sm text-amber-600 font-medium mb-2 tracking-wide">
                      {product.brand}
                    </div>
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

export default NewArrivalPage;
