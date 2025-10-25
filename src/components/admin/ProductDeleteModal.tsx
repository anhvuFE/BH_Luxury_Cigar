import React, { useState } from 'react';
import Modal from '../common/Modal';
import { type Product, adminService } from '../../services/admin.service';
import { HiOutlineExclamation } from 'react-icons/hi';
import { resolveImageUrl } from '../../utils/image';

interface ProductDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  onProductDeleted: (productId: string) => void;
}

const ProductDeleteModal: React.FC<ProductDeleteModalProps> = ({
  isOpen,
  onClose,
  product,
  onProductDeleted
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const handleDelete = async () => {
    if (!product) return;

    try {
      setLoading(true);
      setError('');

      const productIdentifier = product.id || product._id;
      if (!productIdentifier) {
        throw new Error('Product identifier is missing');
      }

      await adminService.deleteProduct(productIdentifier);
      onProductDeleted(productIdentifier);
      onClose();
    } catch (err) {
      console.error('Error deleting product:', err);
      setError('Không thể xóa sản phẩm. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setError('');
    onClose();
  };

  if (!product) return null;

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Xác nhận xóa sản phẩm" size="lg">
      <div className="p-6 space-y-6">
        {/* Warning Icon */}
        <div className="flex items-center justify-center w-16 h-16 mx-auto bg-red-100 rounded-full">
          <HiOutlineExclamation className="w-8 h-8 text-red-600" />
        </div>

        {/* Warning Message */}
        <div className="text-center">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Bạn có chắc chắn muốn xóa sản phẩm này không?
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            Hành động này không thể hoàn tác. Sản phẩm sẽ bị xóa vĩnh viễn khỏi hệ thống.
          </p>
        </div>

        {/* Product Info */}
        <div className="bg-gray-50 p-4 rounded-lg border">
          <div className="flex items-center space-x-4">
            <img
              src={resolveImageUrl(product.image)}
              alt={product.name}
              className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/images/default-product.svg';
              }}
            />
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-900 text-lg truncate">{product.name}</p>
              <p className="text-sm text-gray-600 mt-1">{product.brand}</p>
              <p className="text-base font-semibold text-amber-600 mt-2">
                {new Intl.NumberFormat('vi-VN', {
                  style: 'currency',
                  currency: 'VND'
                }).format(product.price)}
              </p>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
          <button
            type="button"
            onClick={handleClose}
            className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            disabled={loading}
          >
            Hủy
          </button>
          <button
            onClick={handleDelete}
            disabled={loading}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
          >
            {loading && (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            )}
            {loading ? 'Đang xóa...' : 'Xóa sản phẩm'}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ProductDeleteModal;
