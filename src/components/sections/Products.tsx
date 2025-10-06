import React, { useState, useEffect, useRef } from 'react';
import { cigarProducts, storeInfo } from '../../data/storeData';
import { FaSmoking, FaSearch } from 'react-icons/fa';

const Products: React.FC = () => {
  const [selectedStrength, setSelectedStrength] = useState<string>('All');
  const [selectedBrand, setSelectedBrand] = useState<string>('All');
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const strengths = ['All', 'Mild', 'Medium', 'Full'];
  const brands = ['All', ...Array.from(new Set(cigarProducts.map(product => product.brand)))];

  const filteredProducts = cigarProducts.filter(product => {
    const strengthMatch = selectedStrength === 'All' || product.strength === selectedStrength;
    const brandMatch = selectedBrand === 'All' || product.brand === selectedBrand;
    return strengthMatch && brandMatch;
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const getStrengthColor = (strength: string) => {
    switch (strength) {
      case 'Mild': return 'bg-green-100 text-green-700 border-green-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'Full': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <section id="products" className="py-20 md:py-24 bg-transparent">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 max-w-4xl mx-auto animate-fadeInUp">
          <div className="divider-gold mb-8"></div>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Bộ sưu tập Cigar cao cấp
          </h2>
          <p className="text-lg md:text-xl text-gold-light leading-relaxed font-light">
            Khám phá bộ sưu tập cigar đẳng cấp với các thương hiệu nổi tiếng từ khắp nơi trên thế giới
          </p>
        </div>

        {/* Filters */}
        <div className="mb-16">
          <div className="bg-gradient-luxury backdrop-blur-lg rounded-2xl shadow-2xl p-8 max-w-6xl mx-auto border border-gold border-opacity-20">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Strength Filter */}
              <div className="space-y-4">
                <label className="font-serif text-lg font-semibold text-gold block">Độ mạnh:</label>
                <div className="flex flex-wrap gap-3">
                  {strengths.map(strength => (
                    <button
                      key={strength}
                      onClick={() => setSelectedStrength(strength)}
                      className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 border-2 text-sm ${
                        selectedStrength === strength
                          ? 'bg-gold text-dark border-gold shadow-gold'
                          : 'bg-black bg-opacity-30 text-gold-light border-gold border-opacity-30 hover:border-gold hover:text-gold hover:bg-gold hover:bg-opacity-20 backdrop-blur-sm'
                      }`}
                    >
                      {strength === 'All' ? 'Tất cả' : strength}
                    </button>
                  ))}
                </div>
              </div>

              {/* Brand Filter - Custom Dropdown */}
              <div className="space-y-4 relative" ref={dropdownRef}>
                <label className="font-serif text-lg font-semibold text-gold block">Thương hiệu:</label>

                {/* Dropdown Trigger */}
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-full px-6 py-4 bg-black bg-opacity-30 backdrop-blur-sm border-2 border-gold border-opacity-30 rounded-lg text-left font-medium text-gold-light hover:border-gold hover:bg-opacity-50 transition-all duration-300 flex items-center justify-between group"
                >
                  <span>{selectedBrand === 'All' ? 'Tất cả thương hiệu' : selectedBrand}</span>
                  <svg
                    className={`w-5 h-5 text-gold transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-gradient-luxury backdrop-blur-lg border-2 border-gold border-opacity-30 rounded-xl shadow-2xl z-50 overflow-hidden animate-fadeIn">
                    <div className="max-h-64 overflow-y-auto">
                      {brands.map((brand, index) => (
                        <button
                          key={brand}
                          onClick={() => {
                            setSelectedBrand(brand);
                            setIsDropdownOpen(false);
                          }}
                          className={`w-full px-6 py-3 text-left transition-all duration-200 flex items-center justify-between group ${
                            selectedBrand === brand
                              ? 'bg-gold text-dark font-semibold'
                              : 'text-gold-light hover:bg-gold hover:bg-opacity-20 hover:text-gold'
                          }`}
                          style={{animationDelay: `${index * 50}ms`}}
                        >
                          <span>{brand === 'All' ? 'Tất cả thương hiệu' : brand}</span>
                          {selectedBrand === brand && (
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredProducts.map((product: any, index) => (
            <div
              key={product.id}
              className="card-product group bg-gradient-luxury backdrop-blur-lg border border-gold border-opacity-20"
            >
              {/* Product Image */}
              <div className="relative h-64 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                ) : (
                  <div className="product-image-placeholder h-full">
                    <div className="cigar-icon text-gold"><FaSmoking className="text-6xl" /></div>
                  </div>
                )}

                {/* Stock Badge */}
                {!product.inStock && (
                  <div className="badge bg-red-500 text-white">
                    Hết hàng
                  </div>
                )}

                {/* Strength Badge */}
                <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold border ${getStrengthColor(product.strength)}`}>
                  {product.strength}
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6 bg-black bg-opacity-30 backdrop-blur-sm">
                <div className="mb-4">
                  <h3 className="font-serif text-xl font-bold text-white mb-2 group-hover:text-gold transition-colors duration-300 line-clamp-2">
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gold font-semibold">{product.brand}</span>
                    <span className="text-sm text-gold-light">{product.size}</span>
                  </div>
                  <p className="text-sm text-gold-light mb-1">{product.origin}</p>
                </div>

                <p className="text-gray-300 text-sm mb-4 line-clamp-3 font-light leading-relaxed">
                  {product.description}
                </p>

                {/* Product Details */}
                <div className="space-y-2 mb-6 text-xs text-gray-400">
                  <div className="flex justify-between">
                    <span className="font-medium">Wrapper:</span>
                    <span>{product.wrapper}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Binder:</span>
                    <span>{product.binder}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Filler:</span>
                    <span className="truncate ml-2">{product.filler}</span>
                  </div>
                </div>

                {/* Price and Action */}
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-serif text-2xl font-bold text-gold">
                      {formatPrice(product.price)}
                    </div>
                    <div className={`text-sm flex items-center ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                      <div className={`w-2 h-2 rounded-full mr-2 ${product.inStock ? 'bg-green-500' : 'bg-red-500'}`}></div>
                      {product.inStock ? 'Còn hàng' : 'Hết hàng'}
                    </div>
                  </div>

                  <button
                    disabled={!product.inStock}
                    className={`btn ${product.inStock ? 'btn-primary' : 'btn-secondary opacity-50 cursor-not-allowed'}`}
                    onClick={() => {
                      const contactSection = document.querySelector('#contact');
                      if (contactSection) {
                        contactSection.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                  >
                    {product.inStock ? 'Liên hệ' : 'Hết hàng'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No products message */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-6 opacity-50 text-gold"><FaSearch /></div>
            <h3 className="font-serif text-2xl font-semibold text-gray-600 mb-4">
              Không tìm thấy sản phẩm
            </h3>
            <p className="text-gray-500 mb-8">
              Hãy thử thay đổi bộ lọc để xem các sản phẩm khác
            </p>
            <button
              onClick={() => {
                setSelectedStrength('All');
                setSelectedBrand('All');
              }}
              className="btn btn-secondary"
            >
              Xóa bộ lọc
            </button>
          </div>
        )}

        {/* Call to Action */}
        <div className="bg-gradient-luxury text-white p-12 rounded-2xl shadow-2xl text-center">
          <h3 className="font-serif text-3xl font-bold mb-4">
            Cần tư vấn chuyên nghiệp?
          </h3>
          <p className="text-gold-light mb-8 max-w-2xl mx-auto leading-relaxed">
            Đội ngũ chuyên gia của chúng tôi sẵn sàng hỗ trợ bạn chọn lựa sản phẩm phù hợp nhất với sở thích và ngân sách của bạn
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => {
                const contactSection = document.querySelector('#contact');
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="btn btn-primary"
            >
              Liên hệ tư vấn
            </button>
            <a
              href={`tel:${storeInfo.phone}`}
              className="btn btn-secondary"
            >
              Gọi ngay: {storeInfo.phone}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Products;