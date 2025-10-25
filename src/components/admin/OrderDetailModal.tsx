import React, { useState, useEffect } from 'react';
import Modal from '../common/Modal';
import orderService, { type Order, type User, type Product } from '../../services/order.service';
import {
  HiOutlineUser,
  HiOutlineLocationMarker,
  HiOutlineCreditCard,
  HiOutlineShoppingBag,
  HiOutlineCalendar,
  HiOutlineCurrencyDollar,
  HiOutlineTruck,
  HiOutlineDocumentText
} from 'react-icons/hi';

interface OrderDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderId: string | null;
}

const OrderDetailModal: React.FC<OrderDetailModalProps> = ({
  isOpen,
  onClose,
  orderId
}) => {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && orderId) {
      fetchOrderDetails();
    }
  }, [isOpen, orderId]);

  const fetchOrderDetails = async () => {
    if (!orderId) return;

    try {
      setLoading(true);
      setError(null);
      const response = await orderService.getById(orderId);
      setOrder(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Không thể tải chi tiết đơn hàng');
      console.error('Error fetching order details:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      case 'processing':
        return 'bg-purple-100 text-purple-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Chờ xử lý';
      case 'processing':
        return 'Đang xử lý';
      case 'shipped':
        return 'Đang giao';
      case 'delivered':
        return 'Đã giao';
      case 'cancelled':
        return 'Đã hủy';
      default:
        return status;
    }
  };

  const getPaymentStatusText = (isPaid: boolean, paymentStatus: string) => {
    if (isPaid) {
      return 'Đã thanh toán';
    }
    switch (paymentStatus) {
      case 'completed':
        return 'Đã thanh toán';
      case 'pending':
        return 'Chờ thanh toán';
      case 'failed':
        return 'Thanh toán thất bại';
      case 'refunded':
        return 'Đã hoàn tiền';
      default:
        return 'Chờ thanh toán';
    }
  };

  const getUser = (order: Order): User => {
    if (!order.user) {
      return {
        _id: '',
        name: order.shippingAddress?.name || 'Không có tên',
        email: 'N/A',
        phone: order.shippingAddress?.phone || 'N/A'
      };
    }

    if (typeof order.user === 'string') {
      return {
        _id: order.user,
        name: order.shippingAddress?.name || 'Không có tên',
        email: 'N/A',
        phone: order.shippingAddress?.phone || 'N/A'
      };
    }

    return {
      _id: order.user._id || '',
      name: order.user.name || order.shippingAddress?.name || 'Không có tên',
      email: order.user.email || 'N/A',
      phone: order.user.phone || order.shippingAddress?.phone
    };
  };

  const getProductName = (item: any): string => {
    if (!item) return 'Sản phẩm không xác định';
    if (typeof item.product === 'object' && item.product?.name) {
      return item.product.name;
    }
    return item.name || 'Sản phẩm không xác định';
  };

  if (loading) {
    return (
      <Modal isOpen={isOpen} onClose={onClose} title="Chi tiết đơn hàng" size="xl">
        <div className="p-6">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Đang tải chi tiết đơn hàng...</p>
          </div>
        </div>
      </Modal>
    );
  }

  if (error) {
    return (
      <Modal isOpen={isOpen} onClose={onClose} title="Lỗi" size="md">
        <div className="p-6">
          <div className="text-center">
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={fetchOrderDetails}
              className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
            >
              Thử lại
            </button>
          </div>
        </div>
      </Modal>
    );
  }

  if (!order) {
    return null;
  }

  const user = getUser(order);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Chi tiết đơn hàng #${order.orderNumber || order._id}`}
      size="xl"
    >
      <div className="p-6 max-h-[80vh] overflow-y-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Order Status */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <HiOutlineDocumentText className="mr-2" />
                  Trạng thái đơn hàng
                </h3>
                <span className={`inline-flex px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(order.orderStatus || 'pending')}`}>
                  {getStatusText(order.orderStatus || 'pending')}
                </span>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Ngày đặt hàng:</span>
                  <span className="font-medium">{formatDate(order.createdAt)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Thanh toán:</span>
                  <span className="font-medium">{getPaymentStatusText(order.isPaid, order.paymentStatus)}</span>
                </div>
                {order.paidAt && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Ngày thanh toán:</span>
                    <span className="font-medium">{formatDate(order.paidAt)}</span>
                  </div>
                )}
                {order.deliveredAt && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Ngày giao hàng:</span>
                    <span className="font-medium">{formatDate(order.deliveredAt)}</span>
                  </div>
                )}
                {order.trackingNumber && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Mã vận đơn:</span>
                    <span className="font-medium font-mono">{order.trackingNumber}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Customer Information */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <HiOutlineUser className="mr-2" />
                Thông tin khách hàng
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Tên:</span>
                  <span className="font-medium">{user.name}</span>
                </div>
                {user.email && user.email !== 'N/A' && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Email:</span>
                    <span className="font-medium">{user.email}</span>
                  </div>
                )}
                {user.phone && user.phone !== 'N/A' && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Điện thoại:</span>
                    <span className="font-medium">{user.phone}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <HiOutlineLocationMarker className="mr-2" />
                Địa chỉ giao hàng
              </h3>
              <div className="text-sm space-y-1">
                <p className="font-medium">{order.shippingAddress.name}</p>
                <p>{order.shippingAddress.street}</p>
                <p>
                  {order.shippingAddress.city}
                  {order.shippingAddress.state && `, ${order.shippingAddress.state}`}
                  {order.shippingAddress.zipCode && ` ${order.shippingAddress.zipCode}`}
                </p>
                <p>{order.shippingAddress.country}</p>
                <p className="font-medium">{order.shippingAddress.phone}</p>
              </div>
            </div>

            {/* Payment Information */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <HiOutlineCreditCard className="mr-2" />
                Thông tin thanh toán
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Phương thức:</span>
                  <span className="font-medium">
                    {order.paymentMethod === 'cash_on_delivery'
                      ? 'Thanh toán khi nhận hàng'
                      : order.paymentMethod === 'credit_card'
                      ? 'Thẻ tín dụng'
                      : order.paymentMethod === 'paypal'
                      ? 'PayPal'
                      : 'Khác'
                    }
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Trạng thái:</span>
                  <span className={`font-medium ${order.isPaid ? 'text-green-600' : 'text-yellow-600'}`}>
                    {getPaymentStatusText(order.isPaid, order.paymentStatus)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Order Items */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <HiOutlineShoppingBag className="mr-2" />
                Sản phẩm đã đặt
              </h3>
              <div className="space-y-3">
                {order.items && order.items.length > 0 ? (
                  order.items.map((item, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-white rounded border">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{getProductName(item)}</h4>
                        <p className="text-sm text-gray-600">Số lượng: {item.quantity}</p>
                        <p className="text-sm text-gray-600">Đơn giá: {formatPrice(item.price)}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-center py-4">Không có sản phẩm</p>
                )}
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <HiOutlineCurrencyDollar className="mr-2" />
                Tổng kết đơn hàng
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Tạm tính:</span>
                  <span>{formatPrice(order.itemsPrice || 0)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Phí vận chuyển:</span>
                  <span>{formatPrice(order.shippingPrice || 0)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Thuế:</span>
                  <span>{formatPrice(order.taxPrice || 0)}</span>
                </div>
                <hr className="my-2" />
                <div className="flex justify-between text-lg font-semibold">
                  <span>Tổng cộng:</span>
                  <span className="text-amber-600">{formatPrice(order.totalPrice || 0)}</span>
                </div>
              </div>
            </div>

            {/* Notes */}
            {order.notes && (
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Ghi chú</h3>
                <p className="text-sm text-gray-700">{order.notes}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default OrderDetailModal;