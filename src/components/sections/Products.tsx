import React from 'react';
import { Link } from 'react-router-dom';
import { featuredProducts } from '../../data/products';
import type { Product } from '../../types';

const Products: React.FC = () => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-playfair">
            Sản Phẩm Nổi Bật
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Khám phá bộ sưu tập những điếu xì gà cao cấp được tuyển chọn kỹ lưỡng
            từ các thương hiệu nổi tiếng nhất thế giới.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredProducts.map((product: Product) => (
            <div key={product.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
              <div className="relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {product.isNew && (
                  <span className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 text-sm rounded-full font-medium">
                    Mới
                  </span>
                )}
                {product.originalPrice && (
                  <span className="absolute top-4 right-4 bg-primary-500 text-white px-3 py-1 text-sm rounded-full font-medium">
                    Giảm giá
                  </span>
                )}

                {/* Quick View Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <button className="bg-white text-dark-900 px-6 py-2 rounded-md font-medium hover:bg-gray-100 transition-colors">
                    Xem Chi Tiết
                  </button>
                </div>
              </div>

              <div className="p-6">
                <div className="mb-2">
                  <span className="text-sm text-primary-600 font-medium">{product.brand}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                  {product.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {product.description}
                </p>

                {/* Specifications */}
                <div className="text-xs text-gray-500 mb-4 space-y-1">
                  <div>Xuất xứ: {product.specifications.origin}</div>
                  <div>Kích thước: {product.specifications.size}</div>
                  <div>Độ mạnh: {product.specifications.strength}</div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-xl font-bold text-primary-600">
                      {formatPrice(product.price)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-400 line-through">
                        {formatPrice(product.originalPrice)}
                      </span>
                    )}
                  </div>
                  <button
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      product.inStock
                        ? 'bg-primary-500 text-white hover:bg-primary-600'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                    disabled={!product.inStock}
                  >
                    {product.inStock ? 'Tìm hiểu' : 'Hết hàng'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Link
            to="/collections"
            className="inline-flex items-center bg-primary-500 text-white px-8 py-3 rounded-md hover:bg-primary-600 transition-colors font-medium text-lg"
          >
            Xem Tất Cả Sản Phẩm
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 text-center">
          <div>
            <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">100+</div>
            <div className="text-gray-600">Sản phẩm</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">50+</div>
            <div className="text-gray-600">Thương hiệu</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">1000+</div>
            <div className="text-gray-600">Khách hàng</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">5+</div>
            <div className="text-gray-600">Năm kinh nghiệm</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Products;