import React from 'react';
import Modal from '../common/Modal';
import { type Product } from '../../services/admin.service';
import { resolveImageUrl } from '../../utils/image';

interface ProductDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
}

const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  isOpen,
  onClose,
  product
}) => {
  if (!product) return null;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Chi tiết sản phẩm" size="xl">
      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Product Image */}
          <div className="flex justify-center lg:justify-start">
            <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
              <img
                src={resolveImageUrl(product.image)}
                alt={product.name}
                className="w-48 h-48 object-cover rounded-lg shadow-sm"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/images/default-product.svg';
                }}
              />
            </div>
          </div>

          {/* Right Column - Product Details */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tên sản phẩm
              </label>
              <p className="text-gray-900 font-semibold">{product.name}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Thương hiệu
              </label>
              <p className="text-gray-900">{product.brand}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Giá
              </label>
              <p className="text-gray-900 font-semibold text-lg text-amber-600">
                {formatPrice(product.price)}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Danh mục
              </label>
              <p className="text-gray-900">{product.category || 'Chưa phân loại'}</p>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Trạng thái
                </label>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                  product.inStock
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {product.inStock ? 'Còn hàng' : 'Hết hàng'}
                </span>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Sản phẩm mới
                </label>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                  product.isNew
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {product.isNew ? 'Có' : 'Không'}
                </span>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nổi bật
                </label>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                  product.isFeatured
                    ? 'bg-purple-100 text-purple-800'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {product.isFeatured ? 'Có' : 'Không'}
                </span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ID sản phẩm
              </label>
              <p className="text-gray-900 font-mono text-sm">{product._id}</p>
            </div>
          </div>
        </div>

        {/* Description and Specifications */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
          {/* Description */}
          {product.description && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mô tả
              </label>
              <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                <p className="text-gray-900 text-sm whitespace-pre-wrap">{product.description}</p>
              </div>
            </div>
          )}

          {/* Specifications */}
          {product.specifications && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Thông số kỹ thuật
              </label>
              <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                {typeof product.specifications === 'string' ? (
                  <p className="text-gray-900 text-sm whitespace-pre-wrap">{product.specifications}</p>
                ) : (
                  <div className="space-y-1">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between text-sm">
                        <span className="font-medium text-gray-700 capitalize">{key}:</span>
                        <span className="text-gray-900">{String(value)}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Đóng
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ProductDetailModal;
