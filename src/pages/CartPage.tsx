import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  HiOutlineShoppingBag,
  HiPlus,
  HiMinus,
  HiOutlineTrash,
  HiArrowLeft,
  HiShieldCheck,
  HiTruck,
  HiRefresh,
} from 'react-icons/hi';
import { useCart } from '../contexts/CartContext';

const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    cart,
    cartCount,
    totalPrice,
    loading,
    updateCartItem,
    removeFromCart,
    clearCart,
  } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);
  };

  const handleQuantityChange = async (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    await updateCartItem(productId, newQuantity);
  };

  const handleRemoveItem = async (productId: string) => {
    await removeFromCart(productId);
  };

  const handleClearCart = async () => {
    if (window.confirm('Bạn có chắc chắn muốn xóa tất cả sản phẩm khỏi giỏ hàng?')) {
      await clearCart();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-amber-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải giỏ hàng...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-amber-600 transition-colors mr-4"
          >
            <HiArrowLeft className="w-5 h-5 mr-2" />
            Quay lại
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Giỏ hàng của bạn</h1>
        </div>

        {cart.length === 0 ? (
          // Empty Cart
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <HiOutlineShoppingBag className="w-12 h-12 text-gray-400" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Giỏ hàng trống
            </h2>
            <p className="text-gray-600 mb-8">
              Bạn chưa thêm sản phẩm nào vào giỏ hàng
            </p>
            <Link
              to="/collections"
              className="inline-flex items-center bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition-colors font-medium"
            >
              Tiếp tục mua sắm
            </Link>
          </div>
        ) : (
          // Cart with Items
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-900">
                      Sản phẩm ({cartCount} sản phẩm)
                    </h2>
                    <button
                      onClick={handleClearCart}
                      className="text-red-600 hover:text-red-700 text-sm font-medium"
                    >
                      Xóa tất cả
                    </button>
                  </div>
                </div>

                <div className="divide-y divide-gray-200">
                  {cart.map((item) => (
                    <div key={item.productId} className="p-6">
                      <div className="flex items-start space-x-4">
                        {/* Product Image */}
                        <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            src={item.image || '/assets/images/placeholder.png'}
                            alt={item.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = '/assets/images/placeholder.png';
                            }}
                          />
                        </div>

                        {/* Product Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="text-lg font-medium text-gray-900 line-clamp-2">
                                {item.name}
                              </h3>
                              {item.brand && (
                                <p className="text-sm text-amber-600 mt-1">
                                  {item.brand}
                                </p>
                              )}
                              <div className="flex items-center mt-2">
                                <span className="text-lg font-bold text-gray-900">
                                  {formatPrice(item.price)}
                                </span>
                                {item.originalPrice && item.originalPrice > item.price && (
                                  <span className="text-sm text-gray-400 line-through ml-2">
                                    {formatPrice(item.originalPrice)}
                                  </span>
                                )}
                              </div>
                            </div>

                            {/* Remove Button */}
                            <button
                              onClick={() => handleRemoveItem(item.productId)}
                              className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                              title="Xóa sản phẩm"
                            >
                              <HiOutlineTrash className="w-5 h-5" />
                            </button>
                          </div>

                          {/* Quantity Controls */}
                          <div className="flex items-center mt-4 space-x-3">
                            <span className="text-sm text-gray-600">Số lượng:</span>
                            <div className="flex items-center border border-gray-300 rounded-lg">
                              <button
                                onClick={() =>
                                  handleQuantityChange(item.productId, item.quantity - 1)
                                }
                                disabled={item.quantity <= 1 || loading}
                                className="p-2 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                <HiMinus className="w-4 h-4" />
                              </button>
                              <span className="px-4 py-2 font-medium min-w-[3rem] text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  handleQuantityChange(item.productId, item.quantity + 1)
                                }
                                disabled={loading}
                                className="p-2 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                <HiPlus className="w-4 h-4" />
                              </button>
                            </div>
                            <span className="text-sm text-gray-600">
                              = {formatPrice(item.price * item.quantity)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  Tóm tắt đơn hàng
                </h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Tạm tính ({cartCount} sản phẩm)</span>
                    <span>{formatPrice(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Phí vận chuyển</span>
                    <span className="text-green-600">Miễn phí</span>
                  </div>
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between text-lg font-semibold text-gray-900">
                      <span>Tổng cộng</span>
                      <span>{formatPrice(totalPrice)}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <button
                    className="w-full bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition-colors font-medium"
                    onClick={() => {
                      // TODO: Navigate to checkout page
                      alert('Chức năng thanh toán sẽ được phát triển trong tương lai');
                    }}
                  >
                    Tiến hành thanh toán
                  </button>
                  <Link
                    to="/collections"
                    className="w-full border border-amber-600 text-amber-600 px-6 py-3 rounded-lg hover:bg-amber-50 transition-colors font-medium text-center block"
                  >
                    Tiếp tục mua sắm
                  </Link>
                </div>

                {/* Security Info */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="space-y-3">
                    <div className="flex items-center justify-center text-sm text-gray-600">
                      <HiShieldCheck className="w-5 h-5 text-green-500 mr-2" />
                      <span>Thông tin thanh toán được bảo mật</span>
                    </div>
                    <div className="flex items-center justify-center text-sm text-gray-600">
                      <HiTruck className="w-5 h-5 text-blue-500 mr-2" />
                      <span>Miễn phí vận chuyển toàn quốc</span>
                    </div>
                    <div className="flex items-center justify-center text-sm text-gray-600">
                      <HiRefresh className="w-5 h-5 text-amber-500 mr-2" />
                      <span>Hỗ trợ đổi trả trong 7 ngày</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;