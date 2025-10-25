import React, { useState, useEffect } from 'react';
import Modal from '../common/Modal';
import orderService, { type Order } from '../../services/order.service';
import { HiOutlineCheck, HiOutlineTruck, HiOutlineCreditCard } from 'react-icons/hi';

interface OrderUpdateModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: Order | null;
  onOrderUpdated: () => void;
}

type OrderStatus = Order['orderStatus'];

const OrderUpdateModal: React.FC<OrderUpdateModalProps> = ({
  isOpen,
  onClose,
  order,
  onOrderUpdated
}) => {
  const [orderStatus, setOrderStatus] = useState<OrderStatus>('pending');
  const [trackingNumber, setTrackingNumber] = useState<string>('');
  const [isPaid, setIsPaid] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (order && isOpen) {
      setOrderStatus(order.orderStatus || 'pending');
      setTrackingNumber(order.trackingNumber || '');
      setIsPaid(order.isPaid || false);
      setError(null);
    }
  }, [order, isOpen]);

  const handleUpdateStatus = async () => {
    if (!order) return;

    try {
      setLoading(true);
      setError(null);

      await orderService.updateStatus(
        order._id || order.id || '',
        orderStatus,
        trackingNumber.trim() || undefined
      );

      // If marking as paid, also update payment status
      if (isPaid && !order.isPaid) {
        await orderService.updateToPaid(order._id || order.id || '', {
          id: `admin_payment_${Date.now()}`,
          status: 'completed',
          updateTime: new Date().toISOString(),
          emailAddress: 'admin@system.com'
        });
      }

      onOrderUpdated();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Không thể cập nhật đơn hàng');
      console.error('Error updating order:', err);
    } finally {
      setLoading(false);
    }
  };

  const orderStatusOptions: Array<{
    value: OrderStatus;
    label: string;
    color: string;
    bgColor: string;
    borderColor: string;
  }> = [
    { value: 'pending', label: 'Chờ xử lý', color: 'text-yellow-600', bgColor: 'bg-yellow-50', borderColor: 'border-yellow-200' },
    { value: 'processing', label: 'Đang xử lý', color: 'text-blue-600', bgColor: 'bg-blue-50', borderColor: 'border-blue-200' },
    { value: 'shipped', label: 'Đang giao', color: 'text-purple-600', bgColor: 'bg-purple-50', borderColor: 'border-purple-200' },
    { value: 'delivered', label: 'Đã giao', color: 'text-green-600', bgColor: 'bg-green-50', borderColor: 'border-green-200' },
    { value: 'cancelled', label: 'Đã hủy', color: 'text-red-600', bgColor: 'bg-red-50', borderColor: 'border-red-200' }
  ];

  // Logic for allowed next statuses
  const getAvailableStatuses = (currentStatus: OrderStatus): OrderStatus[] => {
    const statusFlow: Record<OrderStatus, OrderStatus[]> = {
      pending: ['pending', 'processing', 'cancelled'],
      processing: ['processing', 'shipped', 'cancelled'],
      shipped: ['shipped', 'delivered', 'cancelled'],
      delivered: ['delivered'], // Cannot change from delivered
      cancelled: ['cancelled'] // Cannot change from cancelled
    };

    return statusFlow[currentStatus] || ['pending'];
  };

  if (!order) return null;

  // Check if order is completed (delivered and paid)
  const isOrderCompleted = order.orderStatus === 'delivered' && order.isPaid;
  const isOrderCancelled = order.orderStatus === 'cancelled';
  const canUpdate = !isOrderCompleted && !isOrderCancelled;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Cập nhật đơn hàng #${order.orderNumber || order._id}`}
      size="md"
    >
      <div className="p-6">
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        {/* Completion Notice */}
        {isOrderCompleted && (
          <div className="mb-6 p-4 bg-green-50 border-2 border-green-200 rounded-lg">
            <div className="flex items-center">
              <HiOutlineCheck className="w-5 h-5 text-green-600 mr-2" />
              <div>
                <p className="text-green-700 font-medium">Đơn hàng đã hoàn tất</p>
                <p className="text-green-600 text-sm">Đơn hàng đã được giao và thanh toán thành công. Không thể thay đổi trạng thái.</p>
              </div>
            </div>
          </div>
        )}

        {/* Cancellation Notice */}
        {isOrderCancelled && (
          <div className="mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-lg">
            <div className="flex items-center">
              <div className="w-5 h-5 bg-red-600 rounded-full flex items-center justify-center mr-2">
                <span className="text-white text-xs font-bold">✕</span>
              </div>
              <div>
                <p className="text-red-700 font-medium">Đơn hàng đã bị hủy</p>
                <p className="text-red-600 text-sm">Đơn hàng này đã bị hủy và không thể thay đổi trạng thái.</p>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-6">
          {/* Order Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center">
              <HiOutlineTruck className="mr-2" />
              Trạng thái đơn hàng
            </label>
            <div className="space-y-2">
              {orderStatusOptions.map((option) => {
                const isAvailable = getAvailableStatuses(order.orderStatus || 'pending').includes(option.value);
                const isSelected = orderStatus === option.value;
                const isCurrent = (order.orderStatus || 'pending') === option.value;

                return (
                  <div
                    key={option.value}
                    onClick={() => {
                      if (isAvailable && !loading && canUpdate) {
                        setOrderStatus(option.value);
                      }
                    }}
                    className={`
                      relative p-3 rounded-lg border-2 transition-all duration-200
                      ${!canUpdate
                        ? 'bg-gray-50 border-gray-100 cursor-not-allowed opacity-50'
                        : isSelected
                        ? `${option.bgColor} ${option.borderColor} ${option.color} shadow-sm cursor-default`
                        : isAvailable
                        ? 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-sm cursor-pointer'
                        : 'bg-gray-50 border-gray-100 cursor-not-allowed opacity-50'}
                    `}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className={`
                          w-4 h-4 rounded-full border-2 mr-3 flex items-center justify-center
                          ${isSelected
                            ? `${option.borderColor.replace('border-', 'border-')} ${option.bgColor.replace('bg-', 'bg-')}`
                            : 'border-gray-300'}
                        `}>
                          {isSelected && (
                            <div className={`w-2 h-2 rounded-full ${option.color.replace('text-', 'bg-')}`} />
                          )}
                        </div>
                        <div>
                          <span className={`font-medium ${isSelected ? option.color : 'text-gray-700'}`}>
                            {option.label}
                          </span>
                          {isCurrent && !isSelected && (
                            <span className="ml-2 text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                              Hiện tại
                            </span>
                          )}
                        </div>
                      </div>

                      {!canUpdate ? (
                        <span className="text-xs text-gray-400">
                          Không thể thay đổi
                        </span>
                      ) : !isAvailable ? (
                        <span className="text-xs text-gray-400">
                          Không khả dụng
                        </span>
                      ) : null}
                    </div>
                  </div>
                );
              })}
            </div>
            <p className="text-xs text-gray-500 mt-2">
              💡 Trạng thái chỉ có thể tiến lên từng bước. Chọn "Đã giao" sẽ tự động đánh dấu đơn hàng hoàn tất.
            </p>
          </div>

          {/* Tracking Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mã vận đơn (tùy chọn)
            </label>
            <input
              type="text"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              placeholder="Nhập mã vận đơn..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 disabled:bg-gray-50 disabled:cursor-not-allowed"
              disabled={loading || !canUpdate}
            />
          </div>

          {/* Payment Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center">
              <HiOutlineCreditCard className="mr-2" />
              Trạng thái thanh toán
            </label>

            {order.isPaid ? (
              <div className="p-3 bg-green-50 border-2 border-green-200 rounded-lg">
                <div className="flex items-center">
                  <HiOutlineCheck className="w-5 h-5 text-green-600 mr-2" />
                  <span className="text-green-700 font-medium">Đã thanh toán</span>
                </div>
                {order.paidAt && (
                  <p className="text-xs text-green-600 mt-1">
                    Thanh toán vào: {new Date(order.paidAt).toLocaleDateString('vi-VN', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                )}
              </div>
            ) : (
              <div className="space-y-2">
                <div
                  onClick={() => {
                    if (!loading && canUpdate) {
                      setIsPaid(!isPaid);
                    }
                  }}
                  className={`
                    p-3 rounded-lg border-2 transition-all duration-200
                    ${!canUpdate
                      ? 'bg-gray-50 border-gray-100 cursor-not-allowed opacity-50'
                      : isPaid
                      ? 'bg-green-50 border-green-200 text-green-700 cursor-pointer'
                      : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-sm cursor-pointer'
                    }
                  `}
                >
                  <div className="flex items-center">
                    <div className={`
                      w-4 h-4 rounded border-2 mr-3 flex items-center justify-center
                      ${isPaid ? 'border-green-400 bg-green-50' : 'border-gray-300'}
                    `}>
                      {isPaid && <HiOutlineCheck className="w-3 h-3 text-green-600" />}
                    </div>
                    <span className={`font-medium ${isPaid ? 'text-green-700' : 'text-gray-700'}`}>
                      Đánh dấu đã thanh toán
                    </span>
                  </div>
                </div>

                <p className="text-xs text-gray-500">
                  💡 Đánh dấu khi khách hàng đã hoàn tất thanh toán đơn hàng
                </p>
              </div>
            )}
          </div>

          {/* Current Order Info */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Thông tin hiện tại:</h4>
            <div className="text-xs text-gray-600 space-y-1">
              <p>
                <span className="font-medium">Trạng thái:</span>{' '}
                <span className={orderStatusOptions.find(opt => opt.value === (order.orderStatus || 'pending'))?.color}>
                  {orderStatusOptions.find(opt => opt.value === (order.orderStatus || 'pending'))?.label}
                </span>
              </p>
              <p>
                <span className="font-medium">Thanh toán:</span>{' '}
                <span className={order.isPaid ? 'text-green-600' : 'text-yellow-600'}>
                  {order.isPaid ? 'Đã thanh toán' : 'Chưa thanh toán'}
                </span>
              </p>
              {order.trackingNumber && (
                <p>
                  <span className="font-medium">Mã vận đơn:</span> {order.trackingNumber}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            disabled={loading}
          >
            Hủy
          </button>
          <button
            onClick={handleUpdateStatus}
            disabled={loading || !canUpdate}
            className="px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Đang cập nhật...
              </>
            ) : !canUpdate ? (
              <>
                <HiOutlineCheck className="w-4 h-4 mr-2" />
                Đơn hàng đã hoàn tất
              </>
            ) : (
              <>
                <HiOutlineCheck className="w-4 h-4 mr-2" />
                Cập nhật đơn hàng
              </>
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default OrderUpdateModal;
