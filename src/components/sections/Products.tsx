import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineShoppingBag, HiOutlineEye } from "react-icons/hi";
import { useFeaturedProducts } from "../../hooks/useProducts";
import { useCart } from "../../contexts/CartContext";
import { useToast } from "../../hooks/useToast";

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
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 font-playfair">
              Sản Phẩm Nổi Bật
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
              Đang tải sản phẩm...
            </p>
          </div>
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-16 w-16 sm:h-24 sm:w-24 lg:h-32 lg:w-32 border-b-2 border-primary-500"></div>
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
    <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-white via-amber-50/30 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <div className="inline-block mb-4">
            <span className="text-amber-600 font-medium text-sm tracking-widest uppercase">Bộ sưu tập</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-gray-900 mb-6 leading-tight">
            Sản Phẩm <span className="font-bold text-amber-600">Nổi Bật</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Khám phá những sản phẩm cao cấp được tuyển chọn kỹ lưỡng
            từ các thương hiệu danh tiếng nhất thế giới
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 mb-12 sm:mb-16">
          {featuredProducts.map((product, index) => (
            <div
              key={product.id || `product-${index}`}
              className="group relative bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-500 border border-amber-100 hover:border-amber-200"
            >
              <div className="relative overflow-hidden rounded-t-2xl">
                <img
                  src={
                    product.image || product.featured_image ||
                    "/assets/images/placeholder.png"
                  }
                  alt={product.name}
                  className="w-full h-56 sm:h-64 lg:h-72 object-cover group-hover:scale-110 transition-transform duration-700"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/assets/images/placeholder.png';
                  }}
                />

                {/* Elegant Badges */}
                {(product.isNew || product.is_new) && (
                  <div className="absolute top-4 left-4">
                    <span className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-3 py-1 text-xs font-medium rounded-full shadow-lg">
                      Mới
                    </span>
                  </div>
                )}
                {product.compare_price && (
                  <div className="absolute top-4 right-4">
                    <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 text-xs font-medium rounded-full shadow-lg">
                      Giảm giá
                    </span>
                  </div>
                )}

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
                      disabled={product.inStock === false || product.stock === 0 || cartLoading}
                      title="Thêm vào giỏ hàng"
                    >
                      <HiOutlineShoppingBag className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-6 sm:p-7">
                <div className="mb-3">
                  <span className="text-sm text-amber-600 font-medium tracking-wide">
                    {product.brand}
                  </span>
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mb-3 leading-snug line-clamp-2 group-hover:text-amber-700 transition-colors duration-300">
                  {product.name}
                </h3>

                <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
                  {product.description}
                </p>

                {/* Elegant Specifications */}
                {!!product.specifications && (
                  <div className="mb-5 space-y-2">
                    {!!product.specifications.origin && (
                      <div className="flex items-center text-xs text-gray-500">
                        <span className="w-2 h-2 bg-amber-400 rounded-full mr-2"></span>
                        Xuất xứ: {String(product.specifications.origin)}
                      </div>
                    )}
                    {!!product.specifications.material && (
                      <div className="flex items-center text-xs text-gray-500">
                        <span className="w-2 h-2 bg-amber-400 rounded-full mr-2"></span>
                        Chất liệu: {String(product.specifications.material)}
                      </div>
                    )}
                    {!!product.specifications.age && (
                      <div className="flex items-center text-xs text-gray-500">
                        <span className="w-2 h-2 bg-amber-400 rounded-full mr-2"></span>
                        Tuổi: {String(product.specifications.age)}
                      </div>
                    )}
                  </div>
                )}

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex flex-col">
                    <span className="text-2xl font-bold text-gray-900">
                      {formatPrice(product.price)}
                    </span>
                    {product.compare_price && (
                      <span className="text-sm text-gray-400 line-through">
                        {formatPrice(product.compare_price)}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => handleViewProduct(product)}
                    className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                      (product.inStock !== false && product.stock !== 0)
                        ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white hover:from-amber-600 hover:to-amber-700 hover:shadow-lg hover:scale-105"
                        : "bg-gray-200 text-gray-500 cursor-not-allowed"
                    }`}
                    disabled={product.inStock === false || product.stock === 0}
                  >
                    {(product.inStock !== false && product.stock !== 0) ? "Khám phá" : "Hết hàng"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mb-16 sm:mb-20">
          <Link
            to="/collections"
            className="group inline-flex items-center bg-gradient-to-r from-amber-500 to-amber-600 text-white px-8 py-4 rounded-full hover:from-amber-600 hover:to-amber-700 transition-all duration-300 font-medium text-lg shadow-lg hover:shadow-xl hover:scale-105"
          >
            Khám Phá Tất Cả Sản Phẩm
            <svg
              className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
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

        {/* Stats */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 via-amber-600/5 to-amber-500/10 rounded-3xl"></div>
          <div className="relative grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 py-12 lg:py-16 text-center">
            <div className="group">
              <div className="text-4xl sm:text-5xl lg:text-6xl font-light text-amber-600 mb-3 group-hover:scale-110 transition-transform duration-300">
                100<span className="text-amber-500">+</span>
              </div>
              <div className="text-gray-700 text-base sm:text-lg font-medium">Sản phẩm chọn lọc</div>
            </div>
            <div className="group">
              <div className="text-4xl sm:text-5xl lg:text-6xl font-light text-amber-600 mb-3 group-hover:scale-110 transition-transform duration-300">
                50<span className="text-amber-500">+</span>
              </div>
              <div className="text-gray-700 text-base sm:text-lg font-medium">Thương hiệu danh tiếng</div>
            </div>
            <div className="group">
              <div className="text-4xl sm:text-5xl lg:text-6xl font-light text-amber-600 mb-3 group-hover:scale-110 transition-transform duration-300">
                1000<span className="text-amber-500">+</span>
              </div>
              <div className="text-gray-700 text-base sm:text-lg font-medium">Khách hàng tin tưởng</div>
            </div>
            <div className="group">
              <div className="text-4xl sm:text-5xl lg:text-6xl font-light text-amber-600 mb-3 group-hover:scale-110 transition-transform duration-300">
                5<span className="text-amber-500">+</span>
              </div>
              <div className="text-gray-700 text-base sm:text-lg font-medium">Năm kinh nghiệm</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Products;