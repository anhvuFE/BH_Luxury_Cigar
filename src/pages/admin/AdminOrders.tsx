import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import {
  HiOutlineSearch,
  HiOutlineFilter,
  HiOutlineEye,
  HiOutlinePencil,
  HiOutlineDownload,
  HiOutlineCalendar,
  HiOutlineCurrencyDollar
} from 'react-icons/hi';
import Select from '../../components/common/Select';
import OrderDetailModal from '../../components/admin/OrderDetailModal';
import OrderUpdateModal from '../../components/admin/OrderUpdateModal';
import orderService, { type Order, type OrderStats, type User, type Product } from '../../services/order.service';
import analyticsService from '../../services/analytics.service';

const AdminOrders: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedDate, setSelectedDate] = useState('all');
  const [orders, setOrders] = useState<Order[]>([]);
  const [stats, setStats] = useState<OrderStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  // Fetch orders and stats
  useEffect(() => {
    fetchOrders();
    fetchStats();
  }, [page, selectedStatus]);

  // Reset to page 1 when status filter changes
  useEffect(() => {
    setPage(1);
  }, [selectedStatus]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      const params: { page: number; limit: number; status?: string } = {
        page,
        limit: 10
      };

      if (selectedStatus !== 'all') {
        params.status = selectedStatus;
      }

      const response = await orderService.getAll(params);
      setOrders(response.data);
      setTotalPages(response.pages || 1);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch orders');
      console.error('Error fetching orders:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await orderService.getStats();
      setStats(response.data);
    } catch (err) {
      console.error('Error fetching stats:', err);
    }
  };

  // Export functionality
  const handleExportOrders = async () => {
    try {
      setIsExporting(true);
      await analyticsService.exportReport({
        period: 'month',
        format: 'xlsx'
      });
    } catch (error) {
      console.error('Export failed:', error);
      alert('Không thể xuất báo cáo. Vui lòng thử lại.');
    } finally {
      setIsExporting(false);
    }
  };

  // Modal handlers
  const handleViewOrder = (orderId: string) => {
    setSelectedOrderId(orderId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrderId(null);
  };

  const handleUpdateOrder = (order: Order) => {
    setSelectedOrder(order);
    setIsUpdateModalOpen(true);
  };

  const handleCloseUpdateModal = () => {
    setIsUpdateModalOpen(false);
    setSelectedOrder(null);
  };

  const handleOrderUpdated = () => {
    fetchOrders(); // Refresh the orders list
    fetchStats(); // Refresh the stats
  };

  const statuses = ['all', 'pending', 'processing', 'shipped', 'delivered', 'cancelled'];

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

  const getPaymentStatusColor = (isPaid: boolean, paymentStatus: string) => {
    if (isPaid) {
      return 'bg-green-100 text-green-800';
    }
    switch (paymentStatus) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      case 'refunded':
        return 'bg-gray-100 text-gray-800';
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

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN');
  };

  const filteredOrders = orders.filter(order => {
    if (!searchQuery.trim()) return true;

    const user = getUser(order);
    const orderNumber = order.orderNumber || order._id || '';
    const matchesSearch =
      orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (user.name && user.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (user.email && user.email.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesSearch;
  });

  // Get user object helper
  const getUser = (order: Order): User => {
    // If user is null or undefined, try to get name from shippingAddress
    if (!order.user) {
      return {
        _id: '',
        name: order.shippingAddress?.name || 'No Customer Name',
        email: 'N/A',
        phone: order.shippingAddress?.phone || 'N/A'
      };
    }

    if (typeof order.user === 'string') {
      return {
        _id: order.user,
        name: order.shippingAddress?.name || 'User ID: ' + order.user,
        email: 'N/A',
        phone: order.shippingAddress?.phone || 'N/A'
      };
    }

    // If user is an object, return it
    return {
      _id: order.user._id || '',
      name: order.user.name || order.shippingAddress?.name || 'Unknown User',
      email: order.user.email || 'N/A',
      phone: order.user.phone || order.shippingAddress?.phone
    };
  };

  // Get product name helper
  const getProductName = (item: any): string => {
    if (!item) return 'Unknown Product';
    if (typeof item.product === 'object' && item.product?.name) {
      return item.product.name;
    }
    return item.name || 'Unknown Product';
  };

  // Check if order can be updated
  const canUpdateOrder = (order: Order): boolean => {
    const isOrderCompleted = order.orderStatus === 'delivered' && order.isPaid;
    const isOrderCancelled = order.orderStatus === 'cancelled';
    return !isOrderCompleted && !isOrderCancelled;
  };

  return (
    <AdminLayout>
      <div className="p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Quản lý đơn hàng</h1>
            <p className="mt-2 text-gray-600">Theo dõi và xử lý tất cả đơn hàng</p>
          </div>
          <div className="mt-4 sm:mt-0 flex space-x-3">
            <button
              onClick={handleExportOrders}
              disabled={isExporting}
              className="inline-flex items-center px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isExporting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-700 mr-2"></div>
                  Đang xuất...
                </>
              ) : (
                <>
                  <HiOutlineDownload className="w-5 h-5 mr-2" />
                  Xuất báo cáo
                </>
              )}
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
            <div className="bg-white rounded-lg border border-amber-100 p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                  <HiOutlineCurrencyDollar className="w-6 h-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Tổng doanh thu</p>
                  <p className="text-xl font-bold text-gray-900">{formatPrice(stats.totalRevenue)}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-amber-100 p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                  <HiOutlineCalendar className="w-6 h-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Tổng đơn hàng</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalOrders}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-amber-100 p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-yellow-600 rounded-lg flex items-center justify-center">
                  <HiOutlineCalendar className="w-6 h-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Chờ xử lý</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.pendingOrders || 0}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-amber-100 p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                  <HiOutlineCalendar className="w-6 h-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Đang xử lý</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.processingOrders || 0}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-amber-100 p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
                  <HiOutlineCalendar className="w-6 h-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Đã hoàn thành</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.deliveredOrders || 0}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="bg-white rounded-lg border border-amber-100 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <HiOutlineSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Tìm kiếm đơn hàng..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Status Filter */}
            <Select
              value={selectedStatus}
              onChange={(value) => setSelectedStatus(value as string)}
              options={statuses.map(status => ({
                value: status,
                label: status === 'all' ? 'Tất cả trạng thái' : getStatusText(status)
              }))}
              variant="filled"
              size="md"
            />

            {/* Date Filter */}
            <Select
              value={selectedDate}
              onChange={(value) => setSelectedDate(value as string)}
              options={[
                { value: 'all', label: 'Tất cả thời gian' },
                { value: 'today', label: 'Hôm nay' },
                { value: 'week', label: 'Tuần này' },
                { value: 'month', label: 'Tháng này' },
                { value: 'quarter', label: 'Quý này' }
              ]}
              variant="filled"
              size="md"
            />

            {/* Advanced Filter Button */}
            <button className="inline-flex items-center px-4 py-2 border border-gray-200 rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-colors">
              <HiOutlineFilter className="w-5 h-5 mr-2" />
              Lọc nâng cao
            </button>
          </div>
        </div>

        {/* Loading state */}
        {loading && (
          <div className="bg-white rounded-lg border border-amber-100 p-8">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Đang tải dữ liệu...</p>
            </div>
          </div>
        )}

        {/* Error state */}
        {error && (
          <div className="bg-white rounded-lg border border-red-200 p-6 mb-8">
            <div className="text-center">
              <p className="text-red-600">{error}</p>
              <button
                onClick={fetchOrders}
                className="mt-4 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
              >
                Thử lại
              </button>
            </div>
          </div>
        )}

        {/* Orders Table */}
        {!loading && !error && (
          <div className="bg-white rounded-lg border border-amber-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-amber-50 border-b border-amber-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Đơn hàng
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Khách hàng
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Sản phẩm
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Tổng tiền
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Trạng thái
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Thanh toán
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Thao tác
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredOrders && filteredOrders.length > 0 ? filteredOrders.map((order) => {
                    if (!order) return null;
                    const user = getUser(order);
                    const orderNumber = order.orderNumber || order._id;
                    return (
                      <tr key={order._id || Math.random()} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">#{orderNumber}</div>
                            <div className="text-sm text-gray-500">{formatDate(order.createdAt)}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{user.name}</div>
                            {user.email && user.email !== 'N/A' && (
                              <div className="text-sm text-gray-500">{user.email}</div>
                            )}
                            {user.phone && user.phone !== 'N/A' && (
                              <div className="text-sm text-gray-500">{user.phone}</div>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">
                            {order.items && order.items.length > 0 ? (
                              order.items.map((item, index) => (
                                <div key={index}>
                                  {getProductName(item)} (x{item?.quantity || 0})
                                </div>
                              ))
                            ) : (
                              <div>No items</div>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{formatPrice(order.totalPrice || 0)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.orderStatus || 'pending')}`}>
                            {getStatusText(order.orderStatus || 'pending')}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getPaymentStatusColor(order.isPaid || false, order.paymentStatus || 'pending')}`}>
                            {getPaymentStatusText(order.isPaid || false, order.paymentStatus || 'pending')}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex items-center justify-end space-x-2">
                            <button
                              onClick={() => handleViewOrder(order._id || order.id || order.orderNumber)}
                              className="text-amber-600 hover:text-amber-700 p-1 hover:bg-amber-50 rounded transition-colors"
                              title="Xem chi tiết"
                            >
                              <HiOutlineEye className="w-4 h-4" />
                            </button>
                            {canUpdateOrder(order) ? (
                              <button
                                onClick={() => handleUpdateOrder(order)}
                                className="text-blue-600 hover:text-blue-700 p-1 hover:bg-blue-50 rounded transition-colors"
                                title="Cập nhật trạng thái"
                              >
                                <HiOutlinePencil className="w-4 h-4" />
                              </button>
                            ) : (
                              <div
                                className="text-gray-400 p-1 cursor-not-allowed"
                                title={
                                  order.orderStatus === 'cancelled'
                                    ? 'Đơn hàng đã bị hủy'
                                    : 'Đơn hàng đã hoàn tất'
                                }
                              >
                                <HiOutlinePencil className="w-4 h-4" />
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  }) : (
                    <tr>
                      <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                        {loading ? 'Đang tải...' : 'Không có đơn hàng nào'}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {!loading && !error && (
              <div className="bg-gray-50 px-6 py-3 flex items-center justify-between border-t border-gray-200">
                <div className="flex-1 flex justify-between sm:hidden">
                  <button
                    onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                    disabled={page === 1}
                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Trước
                  </button>
                  <button
                    onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={page === totalPages}
                    className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Sau
                  </button>
                </div>
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-gray-700">
                      Hiển thị trang <span className="font-medium">{page}</span> / <span className="font-medium">{totalPages}</span> - Tổng <span className="font-medium">{filteredOrders.length}</span> đơn hàng
                    </p>
                  </div>
                  <div>
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                      <button
                        onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                        disabled={page === 1}
                        className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Trước
                      </button>
                      <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-amber-600 text-sm font-medium text-white">
                        {page}
                      </span>
                      <button
                        onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={page === totalPages}
                        className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Sau
                      </button>
                    </nav>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Order Detail Modal */}
        <OrderDetailModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          orderId={selectedOrderId}
        />

        {/* Order Update Modal */}
        <OrderUpdateModal
          isOpen={isUpdateModalOpen}
          onClose={handleCloseUpdateModal}
          order={selectedOrder}
          onOrderUpdated={handleOrderUpdated}
        />
      </div>
    </AdminLayout>
  );
};

export default AdminOrders;