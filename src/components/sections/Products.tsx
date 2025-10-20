import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineShoppingBag, HiOutlineEye } from "react-icons/hi";
import { GiCigar } from "react-icons/gi";
import { FaStar, FaShieldAlt } from "react-icons/fa";
import { useFeaturedProducts } from "../../hooks/useProducts";
import { useCart } from "../../contexts/CartContext";
import { useToast } from "../../hooks/useToast";
import "../../styles/animations.css";

const Products: React.FC = () => {
  const { products: featuredProducts, loading, error } = useFeaturedProducts(6);
  const navigate = useNavigate();
  const { addToCart, loading: cartLoading } = useCart();
  const { showError } = useToast();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  // View product details
  const handleViewProduct = (product: any) => {
    const productSlug = product.slug || product.id;
    if (!productSlug) {
      showError('ID sản phẩm không hợp lệ');
      return;
    }
    navigate(`/products/${productSlug}`);
  };


  // Add to cart
  const handleAddToCart = async (product: any) => {
    if (!product.id) {
      return;
    }

    await addToCart(product.id, 1, product);
  };

  if (loading) {
    return (
      <section className="py-24 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 transform rotate-45">
            <GiCigar className="text-8xl text-amber-500 floating-smoke floating-smoke-1" />
          </div>
          <div className="absolute bottom-20 right-20 transform -rotate-12">
            <GiCigar className="text-6xl text-amber-500 cigar-ring" />
          </div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full mb-8 cigar-glow animate-fade-in-up">
              <GiCigar className="text-2xl text-black" />
            </div>
            <h2 className="text-6xl font-bold text-white mb-6 tracking-tight luxury-text-reveal">
              Sản Phẩm Nổi Bật
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto animate-fade-in-up animation-delay-400">
              Đang tải những sản phẩm cao cấp...
            </p>
          </div>
          <div className="flex justify-center">
            <div className="relative">
              <div className="animate-spin rounded-full h-20 w-20 border-b-4 border-amber-500"></div>
              <div className="absolute inset-0 rounded-full border-4 border-amber-200"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 font-playfair">
              Sản Phẩm Nổi Bật
            </h2>
            <p className="text-base sm:text-lg text-red-600 max-w-2xl mx-auto px-4">
              {error}
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (!featuredProducts || featuredProducts.length === 0) {
    return (
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 font-playfair">
              Sản Phẩm Nổi Bật
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
              Chưa có sản phẩm nào
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 transform rotate-45">
          <GiCigar className="text-8xl text-amber-500 floating-smoke floating-smoke-1" />
        </div>
        <div className="absolute bottom-20 right-20 transform -rotate-12">
          <GiCigar className="text-6xl text-amber-500 cigar-ring" />
        </div>
        <div className="absolute top-1/2 left-1/4 transform -rotate-45">
          <FaStar className="text-4xl text-amber-500 floating-smoke floating-smoke-3" />
        </div>
      </div>

      {/* Static Decorative Dots */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-32 left-1/4 w-2 h-2 bg-amber-400 rounded-full"></div>
        <div className="absolute bottom-40 right-1/3 w-1 h-1 bg-amber-500 rounded-full"></div>
        <div className="absolute top-60 right-1/4 w-3 h-3 bg-amber-300 rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full mb-8 cigar-glow animate-fade-in-up">
            <GiCigar className="text-2xl text-black" />
          </div>
          <h2 className="text-6xl font-bold text-white mb-6 tracking-tight luxury-text-reveal">
            Sản Phẩm <span className="text-amber-400">Nổi Bật</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed animate-fade-in-up animation-delay-400">
            Khám phá những sản phẩm cao cấp được tuyển chọn kỹ lưỡng từ các thương hiệu danh tiếng nhất thế giới
          </p>
          <div className="flex items-center justify-center space-x-2 mt-8 animate-fade-in-up animation-delay-600">
            <div className="w-20 h-1 bg-amber-500 rounded-full"></div>
            <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
            <div className="w-20 h-1 bg-amber-500 rounded-full"></div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-16">
          {featuredProducts.map((product, index) => (
            <div
              key={product.id || `product-${index}`}
              className={`group relative bg-gradient-to-b from-white to-gray-50 rounded-3xl shadow-xl hover:shadow-2xl hover:shadow-amber-500/20 transition-all duration-500 border border-amber-500/20 hover:border-amber-500/50 premium-card-entrance category-stagger-${index + 1} premium-hover`}
            >
              {/* Premium Badge */}
              <div className="absolute top-6 right-6 z-10">
                <div className="bg-gradient-to-r from-amber-400 to-amber-600 text-black px-4 py-2 rounded-full text-xs font-bold cigar-glow">
                  PREMIUM
                </div>
              </div>

              <div className="relative overflow-hidden rounded-t-3xl">
                <img
                  src={
                    product.image || product.featured_image ||
                    "/assets/images/placeholder.png"
                  }
                  alt={product.name}
                  className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-700 filter group-hover:brightness-110"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/assets/images/placeholder.png';
                  }}
                />

                {/* Subtle Shimmer Overlay - Only on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Elegant Badges */}
                {(product.isNew || product.is_new) && (
                  <div className="absolute top-6 left-6">
                    <span className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-4 py-2 text-xs font-bold rounded-full shadow-lg cigar-glow">
                      MỚI
                    </span>
                  </div>
                )}
                {product.compare_price && (
                  <div className="absolute top-6 left-6" style={{marginTop: (product.isNew || product.is_new) ? '3rem' : '0'}}>
                    <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 text-xs font-bold rounded-full shadow-lg cigar-glow">
                      GIẢM GIÁ
                    </span>
                  </div>
                )}

                {/* Static Decorative Dot */}
                <div className="absolute top-20 right-10 opacity-20">
                  <div className="w-3 h-3 bg-amber-400 rounded-full"></div>
                </div>

                {/* Premium Hover Actions */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="absolute bottom-6 left-6 right-6 flex justify-center space-x-4">
                    <button
                      onClick={() => handleViewProduct(product)}
                      className="bg-white/95 backdrop-blur-sm text-gray-800 p-4 rounded-full hover:bg-white hover:scale-110 transition-all duration-300 shadow-xl premium-hover"
                      title="Xem chi tiết"
                    >
                      <HiOutlineEye className="w-6 h-6" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleAddToCart(product);
                      }}
                      className="bg-gradient-to-r from-amber-500 to-amber-600 text-white p-4 rounded-full hover:from-amber-600 hover:to-amber-700 hover:scale-110 transition-all duration-300 shadow-xl disabled:opacity-50 disabled:cursor-not-allowed btn-luxury"
                      disabled={product.inStock === false || product.stock === 0 || cartLoading}
                      title="Thêm vào giỏ hàng"
                    >
                      <HiOutlineShoppingBag className="w-6 h-6" />
                    </button>
                  </div>
                </div>

                {/* Decorative Cigar Icon */}
                <div className="absolute bottom-6 left-6 opacity-10 group-hover:opacity-30 transition-opacity duration-500">
                  <GiCigar className="text-4xl text-amber-500 transform rotate-12" />
                </div>
              </div>

              <div className="p-8 space-y-6">
                {/* Brand */}
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                  <span className="text-sm text-amber-600 font-bold tracking-wider uppercase">
                    {product.brand}
                  </span>
                  <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                </div>

                {/* Product Name */}
                <h3 className="text-xl font-bold text-gray-900 text-center leading-snug line-clamp-2 group-hover:text-amber-700 transition-colors duration-300 luxury-text-reveal animation-delay-200">
                  {product.name}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-sm text-center line-clamp-3 leading-relaxed">
                  {product.description}
                </p>

                {/* Premium Specifications */}
                {!!product.specifications && (
                  <div className="space-y-3 bg-amber-50/50 rounded-xl p-4">
                    <div className="text-center">
                      <span className="text-xs font-bold text-amber-800 tracking-wider uppercase">THÔNG SỐ</span>
                    </div>
                    {!!product.specifications.origin && (
                      <div className="flex items-center justify-center text-xs text-gray-600">
                        <FaStar className="text-amber-400 mr-2" />
                        Xuất xứ: <strong className="ml-1">{String(product.specifications.origin)}</strong>
                      </div>
                    )}
                    {!!product.specifications.material && (
                      <div className="flex items-center justify-center text-xs text-gray-600">
                        <FaShieldAlt className="text-amber-400 mr-2" />
                        Chất liệu: <strong className="ml-1">{String(product.specifications.material)}</strong>
                      </div>
                    )}
                    {!!product.specifications.age && (
                      <div className="flex items-center justify-center text-xs text-gray-600">
                        <GiCigar className="text-amber-400 mr-2" />
                        Tuổi: <strong className="ml-1">{String(product.specifications.age)}</strong>
                      </div>
                    )}
                  </div>
                )}

                {/* Price Section */}
                <div className="text-center space-y-3 pt-4 border-t border-amber-500/30">
                  <div className="space-y-1">
                    <div className="text-3xl font-bold text-gray-900">
                      {formatPrice(product.price)}
                    </div>
                    {product.compare_price && (
                      <div className="text-sm text-gray-400 line-through">
                        {formatPrice(product.compare_price)}
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => handleViewProduct(product)}
                    className={`w-full py-3 rounded-full font-bold text-sm transition-all duration-300 ${
                      (product.inStock !== false && product.stock !== 0)
                        ? "btn-luxury text-black hover:scale-105 shadow-lg"
                        : "bg-gray-200 text-gray-500 cursor-not-allowed"
                    }`}
                    disabled={product.inStock === false || product.stock === 0}
                  >
                    <span className="relative z-10">
                      {(product.inStock !== false && product.stock !== 0) ? "KHÁM PHÁ NGAY" : "HẾT HÀNG"}
                    </span>
                  </button>
                </div>

                {/* Decorative Line */}
                <div className="w-full h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent"></div>
              </div>

              {/* Hover Effect Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-amber-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mb-20 animate-fade-in-up animation-delay-800">
          <Link
            to="/collections"
            className="btn-luxury text-black px-12 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl inline-flex items-center"
          >
            <span className="relative z-10">Khám Phá Tất Cả Sản Phẩm</span>
            <svg
              className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300 relative z-10"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>

        {/* Stats Section */}
        <div className="relative animate-fade-in-up animation-delay-1000">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 via-transparent to-amber-500/10 rounded-3xl"></div>
          <div className="relative grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 py-16 text-center">
            <div className="group">
              <div className="text-5xl lg:text-6xl font-light text-amber-500 mb-3 group-hover:text-amber-600 transition-colors duration-300">
                100<span className="text-amber-400">+</span>
              </div>
              <div className="text-gray-300 text-base lg:text-lg font-medium">Sản phẩm chọn lọc</div>
            </div>
            <div className="group">
              <div className="text-5xl lg:text-6xl font-light text-amber-500 mb-3 group-hover:text-amber-600 transition-colors duration-300">
                50<span className="text-amber-400">+</span>
              </div>
              <div className="text-gray-300 text-base lg:text-lg font-medium">Thương hiệu danh tiếng</div>
            </div>
            <div className="group">
              <div className="text-5xl lg:text-6xl font-light text-amber-500 mb-3 group-hover:text-amber-600 transition-colors duration-300">
                1000<span className="text-amber-400">+</span>
              </div>
              <div className="text-gray-300 text-base lg:text-lg font-medium">Khách hàng tin tưởng</div>
            </div>
            <div className="group">
              <div className="text-5xl lg:text-6xl font-light text-amber-500 mb-3 group-hover:text-amber-600 transition-colors duration-300">
                5<span className="text-amber-400">+</span>
              </div>
              <div className="text-gray-300 text-base lg:text-lg font-medium">Năm kinh nghiệm</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Products;