import React from "react";
import { Link } from "react-router-dom";
import { HiOutlineHeart, HiOutlineShoppingBag, HiOutlineEye } from "react-icons/hi";
import type { Product } from "../../types/database";

const Products: React.FC = () => {
  // Mock data for featured products
  const featuredProducts: Product[] = [
    {
      id: "1",
      name: "Cohiba Behike 56",
      slug: "cohiba-behike-56",
      brand: "Cohiba",
      description: "Xì gà cao cấp nhất của thương hiệu Cohiba, với hương vị đặc biệt và độ mạnh vừa phải.",
      price: 2500000,
      compare_price: 3000000,
      stock: 10,
      category_id: "premium-cigars",
      featured_image: "/src/assets/images/placeholder.jpg",
      specifications: {
        origin: "Cuba",
        material: "Tobacco",
        age: "5 years"
      },
      is_new: true,
      is_featured: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: "2",
      name: "Montecristo No. 2",
      slug: "montecristo-no-2",
      brand: "Montecristo",
      description: "Xì gà kinh điển với hương vị phong phú và cân bằng hoàn hảo.",
      price: 1800000,
      stock: 15,
      category_id: "premium-cigars",
      featured_image: "/src/assets/images/placeholder.jpg",
      specifications: {
        origin: "Cuba",
        material: "Tobacco",
        age: "3 years"
      },
      is_new: false,
      is_featured: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: "3",
      name: "Romeo y Julieta Churchill",
      slug: "romeo-julieta-churchill",
      brand: "Romeo y Julieta",
      description: "Xì gà danh tiếng với hương vị nhẹ nhàng và tinh tế.",
      price: 1500000,
      compare_price: 1800000,
      stock: 20,
      category_id: "premium-cigars",
      featured_image: "/src/assets/images/placeholder.jpg",
      specifications: {
        origin: "Cuba",
        material: "Tobacco",
        age: "4 years"
      },
      is_new: false,
      is_featured: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: "4",
      name: "Partagas Serie D No. 4",
      slug: "partagas-serie-d-4",
      brand: "Partagas",
      description: "Xì gà mạnh mẽ với hương vị đất và gia vị đặc trưng.",
      price: 1200000,
      stock: 25,
      category_id: "premium-cigars",
      featured_image: "/src/assets/images/placeholder.jpg",
      specifications: {
        origin: "Cuba",
        material: "Tobacco",
        age: "2 years"
      },
      is_new: true,
      is_featured: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: "5",
      name: "H. Upmann Magnum 50",
      slug: "h-upmann-magnum-50",
      brand: "H. Upmann",
      description: "Xì gà cân bằng với hương vị mộc và ngọt ngào tự nhiên.",
      price: 1400000,
      stock: 18,
      category_id: "premium-cigars",
      featured_image: "/src/assets/images/placeholder.jpg",
      specifications: {
        origin: "Cuba",
        material: "Tobacco",
        age: "3 years"
      },
      is_new: false,
      is_featured: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: "6",
      name: "Hoyo de Monterrey Epicure No. 2",
      slug: "hoyo-monterrey-epicure-2",
      brand: "Hoyo de Monterrey",
      description: "Xì gà nhẹ nhàng với hương vị kem và hạt dẻ.",
      price: 1100000,
      compare_price: 1300000,
      stock: 0,
      category_id: "premium-cigars",
      featured_image: "/src/assets/images/placeholder.jpg",
      specifications: {
        origin: "Cuba",
        material: "Tobacco",
        age: "2 years"
      },
      is_new: false,
      is_featured: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };


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
          {featuredProducts.map((product: Product) => (
            <div
              key={product.id}
              className="group relative bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-500 border border-amber-100 hover:border-amber-200"
            >
              <div className="relative overflow-hidden rounded-t-2xl">
                <img
                  src={
                    product.featured_image ||
                    "/src/assets/images/placeholder.jpg"
                  }
                  alt={product.name}
                  className="w-full h-56 sm:h-64 lg:h-72 object-cover group-hover:scale-110 transition-transform duration-700"
                />

                {/* Elegant Badges */}
                {product.is_new && (
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
                    className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                      product.stock > 0
                        ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white hover:from-amber-600 hover:to-amber-700 hover:shadow-lg hover:scale-105"
                        : "bg-gray-200 text-gray-500 cursor-not-allowed"
                    }`}
                    disabled={product.stock <= 0}
                  >
                    {product.stock > 0 ? "Khám phá" : "Hết hàng"}
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
