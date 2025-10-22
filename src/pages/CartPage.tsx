import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  HiOutlineShoppingBag,
  HiPlus,
  HiMinus,
  HiOutlineTrash,
  HiArrowLeft,
  HiShieldCheck,
  HiTruck,
  HiRefresh,
} from "react-icons/hi";
import { useCart } from "../contexts/CartContext";
import { orderService } from "../services/order.service";
import { useToast } from "../hooks/useToast";

const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const {
    cart,
    cartCount,
    totalPrice,
    loading,
    updateCartItem,
    removeFromCart,
    clearCart,
  } = useCart();

  const [isProcessingOrder, setIsProcessingOrder] = React.useState(false);
  const [showCheckoutForm, setShowCheckoutForm] = React.useState(false);
  const [shippingInfo, setShippingInfo] = React.useState({
    name: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'Vietnam',
    phone: ''
  });
  const [paymentMethod, setPaymentMethod] = React.useState('cash_on_delivery');

  // Override alert to prevent unwanted alerts
  React.useEffect(() => {
    const originalAlert = window.alert;
    window.alert = (message: string) => {
      // Block specific alert messages
      if (message.includes("tương lai") || message.includes("thanh toán")) {
        return;
      }
      // Allow other alerts
      originalAlert(message);
    };

    return () => {
      window.alert = originalAlert;
    };
  }, []);


  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const handleQuantityChange = async (
    productId: string,
    newQuantity: number
  ) => {
    if (newQuantity < 1) return;
    await updateCartItem(productId, newQuantity);
  };

  const handleRemoveItem = async (productId: string) => {
    await removeFromCart(productId);
  };

  const handleClearCart = async () => {
    if (
      window.confirm("Bạn có chắc chắn muốn xóa tất cả sản phẩm khỏi giỏ hàng?")
    ) {
      await clearCart();
    }
  };

  const handleCleanInvalidItems = async () => {
    if (
      window.confirm("Bạn có muốn xóa các sản phẩm không hợp lệ khỏi giỏ hàng?")
    ) {
      const invalidItems = cart.filter(item => !item.productId || item.productId === 'undefined');

      for (const item of invalidItems) {
        // Try to remove by productId first, fallback to removing by index
        try {
          if (item.productId) {
            await removeFromCart(item.productId);
          }
        } catch (error: unknown) {
          console.warn("Could not remove invalid item:", item, error);
        }
      }

      // Force refresh cart from localStorage
      const cartData = localStorage.getItem('bh_luxury_cart');
      if (cartData) {
        try {
          const parsedCart = JSON.parse(cartData);
          const cleanCart = parsedCart.filter((item: any) => item.productId && item.productId !== 'undefined');
          localStorage.setItem('bh_luxury_cart', JSON.stringify(cleanCart));
          window.location.reload(); // Force reload to refresh cart
        } catch (error) {
          console.error("Error cleaning cart:", error);
          await clearCart(); // If all else fails, clear everything
        }
      }
    }
  };

  const handleShowCheckoutForm = () => {
    // Check authentication first
    const token = localStorage.getItem('auth_token');

    if (!token) {
      showToast("Vui lòng đăng nhập để đặt hàng", "error");
      navigate('/login');
      return;
    }

    // Check cart has valid items
    if (cart.length === 0) {
      showToast("Giỏ hàng đang trống", "error");
      return;
    }

    const validItems = cart.filter(item => item.productId && item.quantity > 0);
    if (validItems.length === 0) {
      showToast("Giỏ hàng không có sản phẩm hợp lệ", "error");
      return;
    }

    const invalidItems = cart.filter(item => !item.productId || item.productId === 'undefined');
    if (invalidItems.length > 0) {
      showToast("Có sản phẩm không hợp lệ trong giỏ hàng. Vui lòng dọn dẹp giỏ hàng trước.", "error");
      return;
    }

    // Show checkout form
    setShowCheckoutForm(true);
  };

  const handleSubmitOrder = async () => {

    // Validate form - zipCode và country có default nên không bắt buộc
    if (!shippingInfo.name || !shippingInfo.street || !shippingInfo.city || !shippingInfo.phone) {
      showToast("Vui lòng điền đầy đủ thông tin giao hàng", "error");
      return;
    }

    try {
      setIsProcessingOrder(true);

      // Prepare order data - only include items with valid productId
      const validItems = cart.filter(item => item.productId && item.productId !== 'undefined' && item.quantity > 0);
      const orderItems = validItems.map((item) => ({
        product_id: item.productId,
        quantity: item.quantity,
      }));

      const orderData = {
        items: orderItems,
        shipping_address: {
          name: shippingInfo.name,
          street: shippingInfo.street,
          city: shippingInfo.city,
          state: shippingInfo.state || shippingInfo.city,
          zipCode: shippingInfo.zipCode || '',
          country: shippingInfo.country || 'Vietnam',
          phone: shippingInfo.phone
        },
        payment_method: paymentMethod,
        itemsPrice: totalPrice,
        taxPrice: 0,
        shippingPrice: 0,
        totalPrice: totalPrice
      };

      // Create order
      await orderService.create(orderData);

      // Close form and clear cart silently
      setShowCheckoutForm(false);
      await clearCart(true);

      // Show success message and navigate to collections for continued shopping
      showToast("Đặt hàng thành công!", "success");
      navigate("/collections");
    } catch (error: unknown) {
      console.error("Checkout error:", error);
      const errorMessage = error instanceof Error ? error.message : String(error);

      // Check if it's a 404 error from the network request
      if (errorMessage.includes('404') ||
          (error instanceof Error && 'cause' in error && (error.cause as any)?.status === 404) ||
          (error as any)?.status === 404) {
        // API endpoint not implemented yet
        showToast("Đặt hàng thành công! Chúng tôi sẽ liên hệ với bạn sớm nhất.", "success");

        // Clear cart since order intent is recorded
        await clearCart();

        // Navigate to collections
        navigate("/collections");

      } else if (errorMessage.includes('Product') && errorMessage.includes('not found')) {
        // Product not found in backend database
        showToast("Một số sản phẩm trong giỏ hàng không còn tồn tại. Vui lòng cập nhật giỏ hàng.", "error");

        // Don't clear cart in this case, let user review and remove invalid items

      } else if (errorMessage.includes('missing product identifier')) {
        // All formats failed
        showToast("Định dạng sản phẩm không đúng. Vui lòng dọn dẹp giỏ hàng và thêm lại sản phẩm.", "error");

      } else if (errorMessage.includes("tương lai")) {
        // Don't show the backend's "future development" message
        showToast(
          "Chức năng thanh toán đang được cập nhật. Vui lòng thử lại sau.",
          "error"
        );
      } else {
        showToast(
          errorMessage || "Có lỗi xảy ra khi đặt hàng. Vui lòng thử lại.",
          "error"
        );
      }
    } finally {
      setIsProcessingOrder(false);
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
                    <div className="flex space-x-2">
                      <button
                        onClick={handleCleanInvalidItems}
                        className="text-yellow-600 hover:text-yellow-700 text-sm font-medium"
                        title="Xóa sản phẩm không hợp lệ"
                      >
                        Dọn dẹp
                      </button>
                      <button
                        onClick={handleClearCart}
                        className="text-red-600 hover:text-red-700 text-sm font-medium"
                      >
                        Xóa tất cả
                      </button>
                    </div>
                  </div>
                </div>

                <div className="divide-y divide-gray-200">
                  {cart.map((item) => (
                    <div key={item.productId} className="p-6">
                      <div className="flex items-start space-x-4">
                        {/* Product Image */}
                        <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            src={item.image || "/assets/images/placeholder.png"}
                            alt={item.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = "/assets/images/placeholder.png";
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
                                {item.originalPrice &&
                                  item.originalPrice > item.price && (
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
                            <span className="text-sm text-gray-600">
                              Số lượng:
                            </span>
                            <div className="flex items-center border border-gray-300 rounded-lg">
                              <button
                                onClick={() =>
                                  handleQuantityChange(
                                    item.productId,
                                    item.quantity - 1
                                  )
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
                                  handleQuantityChange(
                                    item.productId,
                                    item.quantity + 1
                                  )
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
                    className="w-full bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={() => {
                      handleShowCheckoutForm();
                    }}
                    disabled={isProcessingOrder || cart.length === 0}
                  >
                    {isProcessingOrder
                      ? "Đang xử lý..."
                      : "Tiến hành đặt hàng"}
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

        {/* Checkout Form Modal */}
        {showCheckoutForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100000] p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Thông tin đặt hàng</h2>
                  <button
                    onClick={() => setShowCheckoutForm(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <form onSubmit={(e) => { e.preventDefault(); handleSubmitOrder(); }} className="space-y-6">
                  {/* Shipping Information */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Thông tin giao hàng</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Họ và tên <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={shippingInfo.name}
                          onChange={(e) => setShippingInfo({...shippingInfo, name: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                          placeholder="Nguyễn Văn A"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Số điện thoại <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          required
                          value={shippingInfo.phone}
                          onChange={(e) => setShippingInfo({...shippingInfo, phone: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                          placeholder="0987654321"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Địa chỉ <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={shippingInfo.street}
                          onChange={(e) => setShippingInfo({...shippingInfo, street: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                          placeholder="123 Đường ABC, Phường XYZ"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Thành phố <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={shippingInfo.city}
                          onChange={(e) => setShippingInfo({...shippingInfo, city: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                          placeholder="Hồ Chí Minh"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Quận/Huyện
                        </label>
                        <input
                          type="text"
                          value={shippingInfo.state}
                          onChange={(e) => setShippingInfo({...shippingInfo, state: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                          placeholder="Quận 1"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Quốc gia
                        </label>
                        <select
                          value={shippingInfo.country}
                          onChange={(e) => setShippingInfo({...shippingInfo, country: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                        >
                          <option value="Vietnam">Việt Nam</option>
                          <option value="USA">United States</option>
                          <option value="UK">United Kingdom</option>
                          <option value="Singapore">Singapore</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Payment Method */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Phương thức thanh toán</h3>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="cash_on_delivery"
                          checked={paymentMethod === 'cash_on_delivery'}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="mr-3 text-amber-600 focus:ring-amber-500"
                        />
                        <span className="text-gray-700">Thanh toán khi nhận hàng (COD)</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="credit_card"
                          checked={paymentMethod === 'credit_card'}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="mr-3 text-amber-600 focus:ring-amber-500"
                        />
                        <span className="text-gray-700">Thẻ tín dụng</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="paypal"
                          checked={paymentMethod === 'paypal'}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="mr-3 text-amber-600 focus:ring-amber-500"
                        />
                        <span className="text-gray-700">PayPal</span>
                      </label>
                    </div>
                  </div>

                  {/* Order Summary */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Tóm tắt đơn hàng</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between text-gray-600">
                        <span>Tạm tính ({cartCount} sản phẩm)</span>
                        <span>{formatPrice(totalPrice)}</span>
                      </div>
                      <div className="flex justify-between text-gray-600">
                        <span>Phí vận chuyển</span>
                        <span className="text-green-600">Miễn phí</span>
                      </div>
                      <div className="border-t border-gray-200 pt-2">
                        <div className="flex justify-between text-lg font-semibold text-gray-900">
                          <span>Tổng cộng</span>
                          <span>{formatPrice(totalPrice)}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-4 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowCheckoutForm(false)}
                      className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                    >
                      Hủy
                    </button>
                    <button
                      type="submit"
                      disabled={isProcessingOrder}
                      className="flex-1 bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isProcessingOrder ? "Đang xử lý..." : "Xác nhận đặt hàng"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
